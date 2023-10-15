<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\guest;
use Illuminate\Database\Seeder;
use App\Models\liveChat;
use App\Models\User;
use App\Models\website;
use Carbon\Carbon;
use Faker\Generator;
use Illuminate\Container\Container;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class liveChats extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $faker;
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }
    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }
    public function run()
    {

        $website = website::where('domainName','americandiner')->first();
        liveChat::where('website_id',$website->id)->delete();
        User::where('website_id',$website->id)->update(['lastChat'=>null,'lastMsg_id'=>null]);
        guest::where('website_id',$website->id)->update(['lastChat'=>null,'lastMsg_id'=>null]);
        $usersForChat = User::where('website_id',$website->id)->inRandomOrder()->limit(40)->get();
        $accountsFodChat = Account::where('website_id',$website->id)->get();
        foreach($usersForChat as $user){
            $account = $accountsFodChat->random();
            $randomDays = rand(1,90);
            $randomMins =  rand(1,500);
            $randomMins2 =  rand(1,10);
            $msgAuthorSwitch = 1;
            $maxX = rand(10,50);
            for($x = 0; $x <=  $maxX ; $x++){
                $msgSentAt = Carbon::create(2022, 5, 7, 22, 0, 0, 'UTC')->addMinutes($randomMins2)->addSeconds($x * 10)->timestamp;
                $msgSeenAt= Carbon::create(2022, 5, 7, 22, 0, 0, 'UTC')->addMinutes($randomMins2)->addSeconds(($x*10)+ rand(1,10))->timestamp;
                if($x ==  $maxX ){$msg = $this->faker->sentence();}
                else if($x == 0){$msg = $this->faker->sentence();}
                else{$msg = $this->faker->sentence();}
                if($msgAuthorSwitch == 1){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'account_id' => null,
                        'guest_id' => null,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'is_seen' => true,
                        'seen_at'=>$msgSeenAt,
                    ]);
                    $msgAuthorSwitch = 0;
                }
                else if($msgAuthorSwitch == 0){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'guest_id' => null,
                        'account_id' => $account->id,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 1;
                }
                User::where('id',$user->id)->update(['lastChat' => $msgSeenAt,'lastMsg_id' => $createChatMsg->id]);
            }
        }
        foreach($usersForChat as $user){
            $account = $accountsFodChat->random();
            $randomDays = rand(1,90);
            $randomMins =  rand(1,500);
            $msgAuthorSwitch = 1;
            $maxX = rand(10,50);
            for($x = 0; $x <=  $maxX ; $x++){
                $msgSentAt = Carbon::now()->subDay()->addMinutes($randomMins)->addSeconds($x * 10)->timestamp;
                $msgSeenAt= Carbon::now()->subDay()->addMinutes($randomMins)->addSeconds(($x*10)+ rand(1,10))->timestamp;
                if($x ==  $maxX ){$msg = $this->faker->sentence();}
                else if($x == 0){$msg = $this->faker->sentence();}
                else{$msg = $this->faker->sentence();}
                if($msgAuthorSwitch == 1){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'account_id' => null,
                        'guest_id' => null,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 0;
                }
                else if($msgAuthorSwitch == 0){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'guest_id' => null,
                        'account_id' => $account->id,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 1;
                }
                User::where('id',$user->id)->update(['lastChat' => $msgSeenAt,'lastMsg_id' => $createChatMsg->id]);
            }
        }
        foreach($usersForChat as $user){
            $account = $accountsFodChat->random();
            $randomDays = rand(1,90);
            $randomMins =  rand(1,500);
            $msgAuthorSwitch = 1;
            $maxX = rand(10,50);
            for($x = 0; $x <=  $maxX ; $x++){
                $msgSentAt = Carbon::now('UTC')->subDays($randomDays)->addMinutes($randomMins)->addSeconds($x * 10)->timestamp;
                $msgSeenAt= Carbon::now('UTC')->subDays($randomDays)->addMinutes($randomMins)->addSeconds(($x*10)+ rand(1,10))->timestamp;
                if($x ==  $maxX ){$msg = $this->faker->sentence();}
                else if($x == 0){$msg = $this->faker->sentence();}
                else{$msg = $this->faker->sentence();}
                if($msgAuthorSwitch == 1){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'account_id' => null,
                        'guest_id' => null,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 0;
                }
                else if($msgAuthorSwitch == 0){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'guest_id' => null,
                        'account_id' => $account->id,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 1;
                }
                User::where('id',$user->id)->update(['lastChat' => $msgSeenAt,'lastMsg_id' => $createChatMsg->id]);
            }

            $randomDays = rand(1,90);
            $randomMins =  rand(1,500);
            $msgAuthorSwitch = 1;
            $maxX = rand(10,50);
            for($x = 0; $x <=  $maxX ; $x++){
                $msgSentAt = Carbon::now()->subDays($randomDays)->addMinutes($randomMins)->addSeconds($x * 10)->timestamp;
                $msgSeenAt= Carbon::now()->subDays($randomDays)->addMinutes($randomMins)->addSeconds(($x*10)+ rand(1,10))->timestamp;
                if($x ==  $maxX ){$msg = $this->faker->sentence();}
                else if($x == 0){$msg = $this->faker->sentence();}
                else{$msg = $this->faker->sentence();}
                if($msgAuthorSwitch == 1){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'account_id' => null,
                        'guest_id' => null,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 0;
                }
                else if($msgAuthorSwitch == 0){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'guest_id' => null,
                        'account_id' => $account->id,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 1;
                }
                User::where('id',$user->id)->update(['lastChat' => $msgSeenAt,'lastMsg_id' => $createChatMsg->id]);
            }
            $randomDays = rand(1,90);
            $randomMins =  rand(1,500);
            $msgAuthorSwitch = 1;
            $maxX = rand(10,50);
            for($x = 0; $x <=  $maxX ; $x++){
                $msgSentAt = Carbon::now()->subDays($randomDays)->addMinutes($randomMins)->addSeconds($x * 10)->timestamp;
                $msgSeenAt= Carbon::now()->subDays($randomDays)->addMinutes($randomMins)->addSeconds(($x*10)+ rand(1,10))->timestamp;
                if($x ==  $maxX ){$msg = $this->faker->sentence();}
                else if($x == 0){$msg = $this->faker->sentence();}
                else{$msg = $this->faker->sentence();}
                if($msgAuthorSwitch == 1){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'account_id' => null,
                        'guest_id' => null,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 0;
                }
                else if($msgAuthorSwitch == 0){
                    $createChatMsg = liveChat::create([
                        'website_id'=>$website->id,
                        'user_id'=>$user->id,
                        'guest_id' => null,
                        'account_id' => $account->id,
                        'author'=>$msgAuthorSwitch,
                        'message'=> $msg,
                        'sent_at'=>$msgSentAt,
                        'seen_at'=>$msgSeenAt,
                        'is_seen' => true,
                    ]);
                    $msgAuthorSwitch = 1;
                }
                User::where('id',$user->id)->update(['lastChat' => $msgSeenAt,'lastMsg_id' => $createChatMsg->id]);
            }
        }
        $hamody = $usersForChat->random();
        $createChatMsg = liveChat::create([
            'website_id'=>$website->id,
            'user_id'=>$hamody->id,
            'account_id' => null,
            'guest_id' => null,
            'author'=>1,
            'message'=> $this->faker->sentence(),
            'sent_at'=> Carbon::now()->timestamp,
            'is_seen' => false,
            'seen_at'=>null,
        ]);
        User::where('id',$hamody->id)->update(['lastChat' => Carbon::now()->timestamp,'lastMsg_id' => $createChatMsg->id]);

    }
}
