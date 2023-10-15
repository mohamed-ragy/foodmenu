<?php

namespace App\Console;

use App\Models\activityLog;
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
                $now = new DateTime('now',new DateTimeZone($job->timeZone));
                if($now->format('G') == 0){
                    $yesterday = new DateTime('now',new DateTimeZone($job->timeZone));
                    $yesterday->modify('-1 day');
                    $thisDayOrders = order::
                    where(function($q) use ($yesterday, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('dinein_at',[Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 00:00:00',$job->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 23:59:59',$job->timeZone)->setTimezone('UTC')]);
                    })
                    ->orWhere(function($q) use ($yesterday, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('canceled_at',[Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 00:00:00',$job->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 23:59:59',$job->timeZone)->setTimezone('UTC')]);
                    })
                    ->orWhere(function($q) use ($yesterday, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('delivered_at',[Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 00:00:00',$job->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 23:59:59',$job->timeZone)->setTimezone('UTC')]);
                    })
                    ->orWhere(function($q) use ($yesterday, $job){
                        $q->where('website_id',$job->website_id)->whereBetween('pickedUp_at',[Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 00:00:00',$job->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 23:59:59',$job->timeZone)->setTimezone('UTC')]);
                    })
                    ->whereIn('status',[2,5,6,7])
                    ->with('order_items')->get();
                    $reviews = product_review::
                    where('website_id',$job->website_id)
                    ->whereBetween('posted_at',[Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 00:00:00',$job->timeZone)->setTimezone('UTC')->timestamp, Carbon::createFromFormat('Y-m-d H:i:s',$yesterday->format('Y').'-'.$yesterday->format('n').'-'.$yesterday->format('j').' 23:59:59',$job->timeZone)->setTimezone('UTC')->timestamp])
                    ->get();
                    foodmenuFunctions::archiveStatistice($thisDayOrders,$reviews,(int)$job->website_id,(int)$yesterday->format('j'),(int)$yesterday->format('n'),(int)$yesterday->format('Y'),$job->timeZone);
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
                product_review::where(['website_id' => $job->website_id])->where('created_at','>',Carbon::now()->subDays(1))->delete();
                // order::where('website_id',$job->website_id)->delete();
                // liveChat::where('website_id',$job->website_id)->delete();
                // notification::where('website_id',$job->website_id)->delete();
                // activityLog::where('website_id',$job->website_id)->delete();
                // guest::where('website_id',$job->website_id)->delete();
            }

        })->dailyAt('9:19');
        // $schedule->command('websocket:restart')->dailyAt('11:00');

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
