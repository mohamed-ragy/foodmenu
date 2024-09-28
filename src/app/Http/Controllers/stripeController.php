<?php

namespace App\Http\Controllers;

use App\Models\foodmenuFunctions;
use App\Models\invoice;
use App\Models\invoice_item;
use App\Models\payment_method;
use App\Models\website;
use Carbon\Carbon;


class stripeController extends Controller
{
    public function invoices(){
        $stripe = new \Stripe\StripeClient(env('STRIPE_KEY'));
        $endpoint_secret = 'whsec_7Znbefwo22w9AIhLfHQ1yi93llUdYCm5';
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
        $event = \Stripe\Webhook::constructEvent(
            $payload, $sig_header, $endpoint_secret
        );
        } catch(\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);

        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);

        }

        // Handle the event
        if($event->type == 'invoice.created'){
            $invoice = $event->data->object;
            if($invoice->starting_balance == null){$invoice->starting_balance = 0;}
            if($invoice->ending_balance == null){$invoice->ending_balance = 0;}
            $website_id = website::where('customer_id',$invoice->customer)->pluck('id')->first();
                $invoiceCreated = invoice::create([
                    'website_id'=>$website_id,
                    'invoice_id' => $invoice->id,
                    'status' => $invoice->status,
                    'period_start' => $invoice->period_start,
                    'period_end' => $invoice->period_end,
                    'currency' => $invoice->currency,
                    'total' => $invoice->total,
                    'amount_due' => $invoice->amount_due,
                    'amount_paid' => $invoice->amount_paid,
                    'amount_remaining' => $invoice->amount_remaining,
                    'starting_balance' => $invoice->starting_balance,
                    'ending_balance' => $invoice->ending_balance,
                    'paid_at' => null,
                    'created' => $invoice->created,
                ]);
                if($invoiceCreated){
                    $invoiceItems = [];
                    foreach($invoice->lines->data as $invoiceItem){
                        array_push($invoiceItems,[
                            'invoice_id' => $invoiceCreated->id,
                            'period_start' => $invoiceItem->period->start,
                            'period_end' => $invoiceItem->period->end,
                            'description' => $invoiceItem->description,
                            'currency' => $invoiceItem->currency,
                            'amount' => $invoiceItem->amount,
                        ]);
                    }
                    invoice_item::insert($invoiceItems);
                }

        }
        else if($event->type == 'invoice.paid'){
            $invoice = $event->data->object;
            if($invoice->starting_balance == null){$invoice->starting_balance = 0;}
            if($invoice->ending_balance == null){$invoice->ending_balance = 0;}
            invoice::where('invoice_id',$invoice->id)->update([
                'status' => $invoice->status,
                'total' => $invoice->total,
                'amount_due' => $invoice->amount_due,
                'amount_paid' => $invoice->amount_paid,
                'amount_remaining' => $invoice->amount_remaining,
                'starting_balance' => $invoice->starting_balance,
                'ending_balance' => $invoice->ending_balance,
                'paid_at' => $invoice->status_transitions->paid_at,
            ]);
            $customer = $stripe->customers->retrieve(
                $invoice->customer,
                []
            );
            website::where('customer_id',$customer->id)->update(['balance' => $customer->balance]);
            ///create receipt
        }
        else if($event->type == 'invoice.updated'){
            $invoice = $event->data->object;
            if($invoice->starting_balance == null){$invoice->starting_balance = 0;}
            if($invoice->ending_balance == null){$invoice->ending_balance = 0;}
            invoice::where('invoice_id',$invoice->id)->update([
                'status' => $invoice->status,
                'total' => $invoice->total,
                'amount_due' => $invoice->amount_due,
                'amount_paid' => $invoice->amount_paid,
                'amount_remaining' => $invoice->amount_remaining,
                'starting_balance' => $invoice->starting_balance,
                'ending_balance' => $invoice->ending_balance,
            ]);
            $customer = $stripe->customers->retrieve(
                $invoice->customer,
                []
            );
            website::where('customer_id',$customer->id)->update(['balance' => $customer->balance]);
        }

        else if($event->type == 'invoice.voided'){
            $invoice = $event->data->object;
            if($invoice->starting_balance == null){$invoice->starting_balance = 0;}
            if($invoice->ending_balance == null){$invoice->ending_balance = 0;}
            invoice::where('invoice_id',$invoice->id)->update([
                'status' => $invoice->status,
                'total' => $invoice->total,
                'amount_due' => $invoice->amount_due,
                'amount_paid' => $invoice->amount_paid,
                'amount_remaining' => $invoice->amount_remaining,
                'starting_balance' => $invoice->starting_balance,
                'ending_balance' => $invoice->ending_balance,
            ]);
        }
        else if($event->type == 'invoice.payment_succeeded'){
            $invoice = $event->data->object;
            // send email to $invoice->customer_email that his payment successed
        }
        else if($event->type == 'invoice.payment_failed'){
            $invoice = $event->data->object;
            // send email to $invoice->customer_email that his payment failed
        }
        else if($event->type == 'charge.refunded'){
            $data = $event->data->object;
            // $invoice = $stripe->invoices->retrieve(
            //     $data->invoice,
            //     ['expand' => ['charge']]
            // );
            // invoice::where('invoice_id',$invoice->id)->update([
            //     'amount_refunded' => $invoice->charge->amount_refunded,
            // ]);
        }
        else if($event->type == 'charge.refund.updated'){
            $data = $event->data->object;
            $payment_intent = $stripe->paymentIntents->retrieve($data->payment_intent,[]);

            if($data->status == 'failed'){
                $website_id = website::where('customer_id',$payment_intent->customer)->pluck('id')->first();
                $stripe->customers->update(
                    $payment_intent->customer,
                    ['balance' => $data->amount]
                );
                website::where('id',$website_id)->update(['balance'=>$data->amount]);
            }else if($data->status == 'succeeded'){
                $invoice = $stripe->invoices->retrieve(
                    $payment_intent->invoice,
                    ['expand' => ['charge']]
                );
                invoice::where('invoice_id',$invoice->id)->update([
                    'amount_refunded' => $invoice->charge->amount_refunded,
                ]);
            }
        }

    }

    public function subscriptions(){
        $stripe = new \Stripe\StripeClient(env('STRIPE_KEY'));
        $endpoint_secret = 'whsec_KH9qwSOiChMLfvRogu8kmuQEecCKCArN';
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
        $event = \Stripe\Webhook::constructEvent(
            $payload, $sig_header, $endpoint_secret
        );
        } catch(\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }

        $data = $event->data->object;
        if($event->type == 'customer.subscription.created'){
            $website = website::where(['subscription_id'=>$data->id])->first();
            if($website != null){
                if(website::where(['subscription_id'=>$data->id])->update([
                    'subscription_status' => $data->status,
                    'subscription_start_period' => $data->current_period_start,
                    'subscription_end_period' => $data->current_period_end,
                ])){
                    return response('', 200);
                }
            }else{
                return response('', 400);
            }
        }
        else if($event->type == 'customer.subscription.updated'){
            $website = website::where(['subscription_id'=>$data->id])->select('id')->first();
            if($website != null){
                $subscription = $stripe->subscriptions->retrieve($data->id);
                $plans = collect(foodmenuFunctions::plans());
                $plan = $plans->where('id',$subscription->plan->product)->first();
                if(website::where(['subscription_id'=>$data->id])->update([
                    'plan' => $plan['name'],
                    'billingPeriod' => $data->plan->interval,
                    'subscription_status' => $data->status,
                    'subscription_start_period' => $data->current_period_start,
                    'subscription_end_period' => $data->current_period_end,
                    'updated_at' => Carbon::now()->timestamp
                    
                ])){
                    payment_method::where('website_id',$website->id)
                    ->where('paymentMethod_id','!=', $data->default_payment_method)
                    ->update(['is_default'=>false]);
                    payment_method::where(['website_id'=>$website->id,'paymentMethod_id' => $data->default_payment_method])->update([
                        'is_default'=>true,
                    ]);

                    foodmenuFunctions::notification('00',null,[
                        'website_id' => $website->id,
                    ]);
                    return response('', 200);
                }
            }else{
                return response('', 400);
            }
        }
        else if($event->type == 'customer.subscription.deleted'){
            $website = website::where(['subscription_id'=>$data->id])->select('id')->first();
            if($website != null){
                if(website::where(['subscription_id'=>$data->id])->update([
                    'subscription_status' => $data->status,
                ])){
                    payment_method::where('website_id',$website->id)->update(['is_default'=>false]);
                    foodmenuFunctions::notification('00',null,[
                        'website_id' => $website->id,
                    ]);
                    return response('', 200);
                }
            }else{
                return response('', 400);
            }
        }
        else if($event->type == 'customer.subscription.trial_will_end'){
            //send email if no payment method has added (dont forget to test it)
        }
    }

    public function paymentmethods(){
        $stripe = new \Stripe\StripeClient(env('STRIPE_KEY'));
        $endpoint_secret = 'whsec_SX0M8NneLWdyRCCkt6ov6YW8vkHnbdf7';
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
        $event = \Stripe\Webhook::constructEvent(
            $payload, $sig_header, $endpoint_secret
        );
        } catch(\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }

        $data = $event->data->object;
        if($event->type == 'payment_method.attached'){
            $website = website::where('customer_id',$data->customer)->select(['id','subscription_id','subscription_status'])->first();
            $paymentMethodsCount = payment_method::where('website_id',$website->id)->count();
            $is_default = false;
            if($paymentMethodsCount == 0 && $website->subscription_status != 'canceled' && $website->subscription_status != 'incomplete_expired'){
                $is_default = true;
                $stripe->subscriptions->update(
                    $website->subscription_id,
                    ['default_payment_method'=>$data->id]
                );
            }
            $createPaymentMethod = payment_method::create([
                'website_id' => $website->id,
                'paymentMethod_id' => $data->id,
                'country' => $data->card->country,
                'fingerprint' => $data->card->fingerprint,
                'brand' => $data->card->brand,
                'exp_month' => $data->card->exp_month,
                'exp_year' => $data->card->exp_year,
                'last4' => $data->card->last4,
                'is_default' => $is_default,
            ]);
            if($createPaymentMethod){
                $paymentmethodsCount = payment_method::where('website_id',$website->id)->count();
                foodmenuFunctions::notification('system.paymentMethod_update',null,[
                    'website_id' => $website->id,
                    'paymentmethodsCount' => $paymentmethodsCount,
                ]);
                return response('', 200);
            }else{
                return response('', 200);
            }
        }
        else if($event->type == 'payment_method.detached'){
            $website_id = payment_method::where(['paymentMethod_id'=>$data->id])->pluck('website_id')->first();
            $deletePaymentMethod = payment_method::where(['paymentMethod_id'=>$data->id])->delete();
            if($deletePaymentMethod){
                $paymentmethodsCount = payment_method::where('website_id',$website_id)->count();
                foodmenuFunctions::notification('system.paymentMethod_update',null,[
                    'website_id' => $website_id,
                    'paymentmethodsCount' => $paymentmethodsCount,
                ]);
                return response('', 200);
            }else{
                return response('', 400);
            }
        }
    }
}
