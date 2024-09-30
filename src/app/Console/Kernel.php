<?php

namespace App\Console;

use App\Events\cpanelChannel;
use App\Models\activityLog;
use App\Models\cloudflare;
use App\Models\cron_jobs;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\foodmenuFunctions;
use App\Models\guest;
use App\Models\liveChat;
use App\Models\notification;
use DateTime;
use App\Models\order;
use App\Models\product_review;
use App\Models\User;
use App\Models\website;
use DateTimeZone;
use stdClass;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function(){
            $jobs = cron_jobs::where('type','0')->get();
            foreach($jobs as $job){
                // $now = new DateTime('now',new DateTimeZone($job->timeZone));
                $now = Carbon::now($job->timeZone);
                if($now->hour == 0){
                    // $yesterday = Carbon::yesterday($job->timeZone);
                    // $yesterday->modify('-1 day');
                    $yesterday_start = Carbon::yesterday($job->timeZone)->setTimezone('UTC');
                    $yesterday_end = Carbon::yesterday($job->timeZone)->addHours(23)->addMinutes(59)->addSeconds(59)->setTimezone('UTC');
                    $thisDayOrders = order::
                    where(function($q) use ($yesterday_start, $yesterday_end, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('dinedin_at',[$yesterday_start->timestamp, $yesterday_end->timestamp]);
                    })
                    ->orWhere(function($q) use ($yesterday_start, $yesterday_end, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('canceled_at',[$yesterday_start->timestamp, $yesterday_end->timestamp]);
                    })
                    ->orWhere(function($q) use ($yesterday_start, $yesterday_end, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('delivered_at',[$yesterday_start->timestamp, $yesterday_end->timestamp]);
                    })
                    ->orWhere(function($q) use ($yesterday_start, $yesterday_end, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('pickedUp_at',[$yesterday_start->timestamp, $yesterday_end->timestamp]);
                    })
                    ->whereIn('status',[2,5,6,7])
                    ->with('order_items')->get();
                    $reviews = product_review::
                    where('website_id',$job->website_id)
                    ->whereBetween('posted_at',[$yesterday_start->timestamp, $yesterday_end->timestamp])
                    ->get();

                    foodmenuFunctions::archiveStatistice($thisDayOrders,$reviews,(int)$job->website_id,(int)$yesterday_end->day,(int)$yesterday_end->month,(int)$yesterday_end->year,$job->timeZone);
                    //////////
                }
                $cart_lifeTime = website::where('id',$job->website_id)->pluck('cart_lifeTime')->first();
                User::where('website_id',$job->website_id)
                ->where('cart_lastUpdate','<',Carbon::now()->subMinutes($cart_lifeTime)->timestamp)
                ->where('cart_lastUpdate','!=',null)
                ->update(['lastSeen' => Carbon::now()->timestamp ,'cart'=>'{}','cart_lastUpdate'=>Carbon::now()->timestamp]);
            }

        })->hourly();

        $schedule->call(function(){

            $guestsToDelete = guest::where('lastSeen','<' , Carbon::now()->subDays(7)->timestamp)->get();
            $guestsToDeleteIds = [];
            foreach($guestsToDelete as $guest){
                array_push($guestsToDeleteIds,$guest->id);
            }
            guest::where('lastSeen','<' , Carbon::now()->subDays(7)->timestamp)->delete();
            liveChat::whereIn('guest_id',$guestsToDeleteIds)->delete();


            $jobs = cron_jobs::where('type','1')->get();
            foreach($jobs as $job){
                product_review::where(['website_id' => $job->website_id])->where('created_at','>',Carbon::now()->subDays(1)->timestamp)->delete();
                // order::where('website_id',$job->website_id)->delete();
                // liveChat::where('website_id',$job->website_id)->delete();
                // notification::where('website_id',$job->website_id)->delete();
                // activityLog::where('website_id',$job->website_id)->delete();
                // guest::where('website_id',$job->website_id)->delete();
            }

        })->dailyAt('9:19');
        // $schedule->command('websocket:restart')->dailyAt('11:00');
        $schedule->call(function(){
            return true;
            $jobs = cron_jobs::where('type','2')->get();
            foreach($jobs as $job){
                $website = website::where('id',$job->website_id)->select(['user_domainName','user_domainName_data'])->first();
                $cloudflare = new cloudflare($website->user_domainName_data['id']);
                $cloudflare->setup_domain();




            }
        })->everyMinute();
        // })->everyFiveMinutes();
    }


    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
