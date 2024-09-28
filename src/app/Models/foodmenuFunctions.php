<?php
namespace App\Models;

use App\Events\cpanelChannel;
use App\Events\websiteChannel;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Lang;
use stdClass;


class foodmenuFunctions
{
    public static function sendVeryficationSMS($to,$code,$msg=1){
        return true;
        $account_sid = "AC13d8b990e66aede7bfd582685e7925eb";
        $auth_token = "63aa324a95837d01b3773845ea2e9c25";
        $twilio_number = "+13203993791";
        if($msg == 1){
            try{
                $client = new Client($account_sid, $auth_token);
                $client->messages->create($to,
                ['from' => $twilio_number, 'body' => Lang::get("mails/sms.foodMenu").' '.$code.' '.Lang::get("mails/sms.verificationCode") ]);
                return true;
            }catch (\Exception $e){
                return false;

            }
        }else if($msg == 2){
            try{
                $client = new Client($account_sid, $auth_token);
                $client->messages->create($to,
                ['from' => $twilio_number, 'body' => Lang::get("mails/sms.foodMenu").' '.$code.' '.Lang::get("mails/sms.resetPasswordCode") ] );
                return true;
            }catch (\Exception $e){
                return false;

            }
        }


    }

    public static function websiteColors(){
        return [
            '1' => ['id'=>'1','color1'=> '#8d3030','color2'=>'#a85d1f','color3'=>'#FFF9F9','color4'=>'#270802','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#1c9c1c','colorWarning'=>'#f07c0f','colorStar'=>'#e3c816'],
            '2' => ['id'=>'2','color1'=> '#8d1132','color2'=>'#0A3161','color3'=>'#f6f7fe','color4'=>'#04172f','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d5a30b','colorStar'=>'#ffc824'],
            '3' => ['id'=>'3','color1'=> '#EA5151','color2'=>'#596C76','color3'=>'#F3F5F6','color4'=>'#1A2023','color5'=>'#ffffff','colorError'=>'#d23333','colorSuccess'=>'#087419','colorWarning'=>'#d78f33','colorStar'=>'#ffc824'],
            '4' => ['id'=>'4','color1'=> '#9d5c20','color2'=>'#d08d4e','color3'=>'#fefaf6','color4'=>'#784b21','color5'=>'#FFFFFF','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#dfb316','colorStar'=>'#ffc824'],
            '5' => ['id'=>'5','color1'=> '#008c45','color2'=>'#cd212a','color3'=>'#f4f5f0','color4'=>'#5e0d11','color5'=>'#f4f5f0','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '6' => ['id'=>'6','color1'=> '#db920a','color2'=>'#B81821','color3'=>'#FFF3DE','color4'=>'#5c0f13','color5'=>'#FFF3DE','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d6a205','colorStar'=>'#ffc824'],
            '7' => ['id'=>'7','color1'=> '#9d1f1f','color2'=>'#43AA72','color3'=>'#f6fef6','color4'=>'#50433a','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '8' => ['id'=>'8','color1'=> '#dc5078','color2'=>'#f54275','color3'=>'#FDF6F2','color4'=>'#715041','color5'=>'#FDF6F2','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#e3ae09','colorStar'=>'#ff2965'],
            '9' => ['id'=>'9','color1'=> '#603f29','color2'=>'#997d56','color3'=>'#f7efe3','color4'=>'#432f23','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d1a010','colorStar'=>'#deab12'],
            '10' => ['id'=>'10','color1'=> '#f24a7a','color2'=>'#e82c2c','color3'=>'#fefcf1','color4'=>'#493a31','color5'=>'#fefcf1','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '11' => ['id'=>'11','color1'=> '#363636','color2'=>'#be1313','color3'=>'#ffffff','color4'=>'#363636','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d2770f','colorStar'=>'#ffc824'],
            '12' => ['id'=>'12','color1'=> '#206c1e','color2'=>'#31842e','color3'=>'#f1fef1','color4'=>'#354134','color5'=>'#f1fef1','colorError'=>'#d10000','colorSuccess'=>'#247f24','colorWarning'=>'#d2a10f','colorStar'=>'#ffc824'],
            '13' => ['id'=>'13','color1'=> '#ce1126','color2'=>'#006847','color3'=>'#f0fffa','color4'=>'#344b44','color5'=>'#f0fffa','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c69910','colorStar'=>'#ffc824'],
            '14' => ['id'=>'14','color1'=> '#09939a','color2'=>'#07696e','color3'=>'#f0feff','color4'=>'#385a5c','color5'=>'#f0feff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#b07a1c','colorStar'=>'#ffc824'],
            '15' => ['id'=>'15','color1'=> '#B81212','color2'=>'#d1921f','color3'=>'#fff8f0','color4'=>'#3c2020','color5'=>'#fff8f0','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#cea21c','colorStar'=>'#ebb81e'],
            '16' => ['id'=>'16','color1'=> '#FF9933','color2'=>'#138808','color3'=>'#FFFFFF','color4'=>'#231f1a','color5'=>'#FFFFFF','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c49812','colorStar'=>'#FF9933'],
            '17' => ['id'=>'17','color1'=> '#DD721A','color2'=>'#DD721A','color3'=>'#1e1e1e','color4'=>'#ffffff','color5'=>'#ffffff','colorError'=>'#e91616','colorSuccess'=>'#2caf2c','colorWarning'=>'#efbc25','colorStar'=>'#ffc824'],
            '18' => ['id'=>'18','color1'=> '#BC1823','color2'=>'#d1333e','color3'=>'#171616','color4'=>'#ffffff','color5'=>'#ffffff','colorError'=>'#e91616','colorSuccess'=>'#2caf2c','colorWarning'=>'#efbc25','colorStar'=>'#ffc824'],
            '19' => ['id'=>'19','color1'=> '#294047','color2'=>'#327285','color3'=>'#f0fbff','color4'=>'#32474d','color5'=>'#f0fbff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '20' => ['id'=>'20','color1'=> '#F44F2F','color2'=>'#F44F2F','color3'=>'#0d0d0d','color4'=>'#fffafa','color5'=>'#fffafa','colorError'=>'#d93030','colorSuccess'=>'#329a32','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '21' => ['id'=>'21','color1'=> '#f05f42','color2'=>'#F14624','color3'=>'#282120','color4'=>'#FFF6EA','color5'=>'#FFF6EA','colorError'=>'#d93030','colorSuccess'=>'#329a32','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '22' => ['id'=>'22','color1'=> '#d3b20d','color2'=>'#2cb3ce','color3'=>'#ffffff','color4'=>'#4b4a48','color5'=>'#e5fbff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '23' => ['id'=>'23','color1'=> '#eb7000','color2'=>'#4b4a48','color3'=>'#fff7f0','color4'=>'#4b4a48','color5'=>'#fff7f0','colorError'=>'#d62929','colorSuccess'=>'#2aac2a','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '24' => ['id'=>'24','color1'=> '#9d5c20','color2'=>'#4b3a2a','color3'=>'#fff7f0','color4'=>'#4b4a48','color5'=>'#fff7f0','colorError'=>'#d62929','colorSuccess'=>'#2aac2a','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '25' => ['id'=>'25','color1'=> '#cd212a','color2'=>'#2f2728','color3'=>'#f4f5f0','color4'=>'#2c1b1c','color5'=>'#f4f5f0','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '26' => ['id'=>'26','color1'=> '#E25100','color2'=>'#dfd6c8','color3'=>'#180c0c','color4'=>'#dfd6c8','color5'=>'#180c0c','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#e3ae09','colorStar'=>'#ffc824'],
            '27' => ['id'=>'27','color1'=> '#9d1f1f','color2'=>'#50433a','color3'=>'#f6fef6','color4'=>'#50433a','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '28' => ['id'=>'28','color1'=> '#f54275','color2'=>'#5e463b','color3'=>'#FDF6F2','color4'=>'#5e463b','color5'=>'#FDF6F2','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d3a20d','colorStar'=>'#ffc824'],
            '29' => ['id'=>'29','color1'=> '#997d56','color2'=>'#603f29','color3'=>'#fef9f1','color4'=>'#432f23','color5'=>'#ffffff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#d1a010','colorStar'=>'#deab12'],
            '30' => ['id'=>'30','color1'=> '#ec224b','color2'=>'#2f1919','color3'=>'#fffafb','color4'=>'#302727','color5'=>'#fffafb','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '31' => ['id'=>'31','color1'=> '#F2891D','color2'=>'#1b2b36','color3'=>'#fff7f5','color4'=>'#1b2b36','color5'=>'#fff7f5','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '32' => ['id'=>'32','color1'=> '#2ba027','color2'=>'#294828','color3'=>'#f6fef6','color4'=>'#354134','color5'=>'#f6fef6','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '33' => ['id'=>'33','color1'=> '#006847','color2'=>'#344b44','color3'=>'#f6fef6','color4'=>'#344b44','color5'=>'#f6fef6','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '34' => ['id'=>'34','color1'=> '#09939a','color2'=>'#385a5c','color3'=>'#f0feff','color4'=>'#385a5c','color5'=>'#f0feff','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '35' => ['id'=>'35','color1'=> '#B81212','color2'=>'#3c2020','color3'=>'#fff8f0','color4'=>'#3c2020','color5'=>'#fff8f0','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '36' => ['id'=>'36','color1'=> '#FF9933','color2'=>'#192b17','color3'=>'#fff7f0','color4'=>'#192b17','color5'=>'#fff7f0','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '37' => ['id'=>'37','color1'=> '#DD721A','color2'=>'#fff0f0','color3'=>'#100e0e','color4'=>'#ffffff','color5'=>'#100e0e','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '38' => ['id'=>'38','color1'=> '#DB4941','color2'=>'#342323','color3'=>'#fffafb','color4'=>'#201d1d','color5'=>'#fffafb','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '39' => ['id'=>'39','color1'=> '#099a6a','color2'=>'#9aaca7','color3'=>'#000503','color4'=>'#9aaca7','color5'=>'#0d452d','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '40' => ['id'=>'40','color1'=> '#F14624','color2'=>'#392f2d','color3'=>'#fef9f1','color4'=>'#3c3939','color5'=>'#FFF6EA','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],
            '41' => ['id'=>'41','color1'=> '#FF327A','color2'=>'#462531','color3'=>'#fff0f5','color4'=>'#200911','color5'=>'#fff0f5','colorError'=>'#d10000','colorSuccess'=>'#228b22','colorWarning'=>'#c79605','colorStar'=>'#ffc824'],

        ];
    }

    public static function templates(){
        return [
            '1' => ['id'=>'1', 'restaurantType'=>'pizzeria','colors'=>'1','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '2' => ['id'=>'2', 'restaurantType'=>'americanDiner','colors'=>'2','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '3' => ['id'=>'3', 'restaurantType'=>'casualDining','colors'=>'3','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '4' => ['id'=>'4', 'restaurantType'=>'fineDining','colors'=>'4','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '5' => ['id'=>'5', 'restaurantType'=>'italian','colors'=>'5','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '6' => ['id'=>'6', 'restaurantType'=>'burgers','colors'=>'6','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '7' => ['id'=>'7', 'restaurantType'=>'sandwiches','colors'=>'7','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '8' => ['id'=>'8', 'restaurantType'=>'donuts','colors'=>'8','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '9' => ['id'=>'9', 'restaurantType'=>'patisserie','colors'=>'9','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '10' => ['id'=>'10', 'restaurantType'=>'desserts','colors'=>'10','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '11' => ['id'=>'11', 'restaurantType'=>'fastFood','colors'=>'11','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '12' => ['id'=>'12', 'restaurantType'=>'vegan','colors'=>'12','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '13' => ['id'=>'13', 'restaurantType'=>'mexican','colors'=>'13','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '14' => ['id'=>'14', 'restaurantType'=>'vegetarian','colors'=>'12','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '15' => ['id'=>'15', 'restaurantType'=>'mediterranean','colors'=>'14','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '16' => ['id'=>'16', 'restaurantType'=>'asian','colors'=>'15','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '17' => ['id'=>'17', 'restaurantType'=>'indian','colors'=>'16','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '18' => ['id'=>'18', 'restaurantType'=>'steakhouse','colors'=>'17','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '19' => ['id'=>'19', 'restaurantType'=>'chinese','colors'=>'18','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '20' => ['id'=>'20', 'restaurantType'=>'sushiBar','colors'=>'20','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '21' => ['id'=>'21', 'restaurantType'=>'friedChicken','colors'=>'21','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '22' => ['id'=>'22', 'restaurantType'=>'seafood','colors'=>'19','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],
            '23' => ['id'=>'23', 'restaurantType'=>'icecream','colors'=>'22','imgsType'=>'normal','view'=> '1', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => true],

            '24' => ['id'=>'24', 'restaurantType'=>'pizzeria','colors'=>'23','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '25' => ['id'=>'25', 'restaurantType'=>'americanDiner','colors'=>'2','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '26' => ['id'=>'26', 'restaurantType'=>'casualDining','colors'=>'3','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '27' => ['id'=>'27', 'restaurantType'=>'fineDining','colors'=>'24','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '28' => ['id'=>'28', 'restaurantType'=>'italian','colors'=>'25','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '29' => ['id'=>'29', 'restaurantType'=>'burgers','colors'=>'26','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '30' => ['id'=>'30', 'restaurantType'=>'sandwiches','colors'=>'27','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '31' => ['id'=>'31', 'restaurantType'=>'donuts','colors'=>'28','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '32' => ['id'=>'32', 'restaurantType'=>'patisserie','colors'=>'29','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '33' => ['id'=>'33', 'restaurantType'=>'desserts','colors'=>'30','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '34' => ['id'=>'34', 'restaurantType'=>'fastFood','colors'=>'31','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '35' => ['id'=>'35', 'restaurantType'=>'vegan','colors'=>'32','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '36' => ['id'=>'36', 'restaurantType'=>'mexican','colors'=>'33','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '37' => ['id'=>'37', 'restaurantType'=>'vegetarian','colors'=>'32','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '38' => ['id'=>'38', 'restaurantType'=>'mediterranean','colors'=>'34','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '39' => ['id'=>'39', 'restaurantType'=>'asian','colors'=>'35','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '40' => ['id'=>'40', 'restaurantType'=>'indian','colors'=>'36','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '41' => ['id'=>'41', 'restaurantType'=>'steakhouse','colors'=>'37','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '42' => ['id'=>'42', 'restaurantType'=>'chinese','colors'=>'38','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '43' => ['id'=>'43', 'restaurantType'=>'sushiBar','colors'=>'39','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '44' => ['id'=>'44', 'restaurantType'=>'friedChicken','colors'=>'40','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '45' => ['id'=>'45', 'restaurantType'=>'seafood','colors'=>'19','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
            '46' => ['id'=>'46', 'restaurantType'=>'icecream','colors'=>'41','imgsType'=>'trans','view'=> '2', 'intro' => true, 'slideShow' => false, 'info' => true, 'ourStory' => true, 'gallery' => false],
        ];
    }

    public static function languages(){
        $langs = new stdClass();
        $langs = [
            'en'=>[
                'name'=>'English',
                'flag'=>'USA',
                'code' => 'en',
            ],
            "fr" => [
                'name'=>'français',
                'flag'=>'FRA',
                'code' => 'fr',
            ],
            "ua" => [
                'name'=>'українська',
                'flag'=>'UKR',
                'code' => 'ua',
            ],
            "de" => [
                'name'=>'Deutsche',
                'flag'=>'DEU',
                'code' => 'de',
            ],
            "it" => [
                'name'=>'Italiana',
                'flag'=>'ITA',
                'code' => 'it',
            ],
            "es" => [
                'name'=>'Española',
                'flag'=>'ESP',
                'code' => 'es',
            ],
            "ar" => [
                'name'=>'العربية',
                'flag'=>'SAU',
                'code' => 'ar',
            ]
        ];
        return $langs;
    }

    public static function defaultLanguageText($lang){
        if($lang == 'en'){
            return [
                'authentication' => [
                    'login' => 'Login',
                    'signup' => 'Sign up',
                    'logout' => 'Logout',
                    'email' => 'Email Address',
                    'password' => 'Password',
                    'confirm_password' => 'Confirm password',
                    'current_password' => 'Current password',
                    'new_password' => 'New password',
                    'new_password_confirm' => 'New password confirm',
                    'name' => 'Name',
                    'phone_number' => 'Phone Number',
                    'remember_me' => 'Remember me',
                    'forget_password_q' => 'Forgot Password?',  
                    'reset_password'=>'Reset Password',
                    'dont_have_account_q' => "Don't have an account?",
                    'login_description' => 'Please enter your email and password.',
                    'login_fail' => 'Incorrect email or password.',
                    'user_banned' => 'This account has been banned.',
                    // 'logged_in' => 'You have been successfully logged in',
                    'have_account_login' => 'Already have an account?',
                    'email_unique' => 'The email you entered already exists.',
                    'email_required' => 'Please enter a valid email.',
                    'email_email' => 'The email address you entered is incorrect.',
                    'name_required' => 'Please enter your name.',
                    'name_max' => "The name must be maximum 20 characters.",
                    'name_min' => "The name must be at least 3 characters.",
                    'password_required' => 'Please enter a valid password.',
                    'password_min' => "The password must be at least 8 characters.",
                    'password_max' => "The password must be maximum 50 characters.",
                    'password_confirm_required' => 'Please confirm your password',
                    'password_confirm_same' => 'The password and the password confirm must be the same.',
                    'privacy_policy_error' => 'To signup, you must agree with our privacy policy.',
                    'phone_number_required' => 'Please enter your valid phone number.',
                    'phone_number_regex' => 'The phone number you entered is incorrect.',
                    'phone_number_unique' => 'The phone number you entered is already used by another user.',
                    'accountCreated'=>'You have successfully registered. You can now log in.',
                    'profile_saved'=>'Data saved successfully.',
                    'change_password_saved'=>'Your password has been changed successfully.',
                    'wrong_password' => 'Wrong password!',

                    'reset_password_code' => 'Reset password code',
                    'reset_password_send_code' => 'Send reset code',
                    'reset_password_email_incorrect' => 'The email you entered is not registered.',
                    'reset_password_description' => 'Please enter your registered email address.',
                    'reset_password_wait'=> 'We already sent a password reset message to your email. If you do not find the message in your inbox, please check your spam folder.',
                    'reset_password_sent'=>'Please enter the code we sent to your email. If you do not find the message in your inbox, please check your spam folder.',
                    
                    'reset_password_expired_code'=>'The password reset code you used has expired.',
                    'reset_password_wrong_code'=>'Invalid password reset code.',
                    'reset_password_enter_new_password' => 'Please enter and confirm your new password',
                    'reset_password_changed' => 'The password has been changed successfully. You can now log in to your account with your new password.',

                    'account_information' => 'Account information',
                    'my_addresses' => 'My addresses',
                    'my_orders' => 'My orders',
                    'change_account_password' => 'Change account password',
                    // 'address' => 'Address',
                    // 'mylocation' => 'My Location',
                    // 'currentLocation' => 'Set my current location',
                    // 'unsetLocation' => 'Unset location',
                    // 'createNewPassword' => 'Create new password',
                    // 'newPassword' => 'Enter a new password',
                    // 'profile' => 'My Profile',
                    // 'changeEmail'=> 'Change My Email',
                    // 'newEmail' => 'Enter your new email',
                    // 'changePassword'=>'Change My Password',




                    // 'addressRequired' => 'Please enter your address.',
                    // 'wrongEmail'=>'The email address you entered is incorrect.',
                    // 'profileSaveFail'=>'Unknown Error! The data was not saved.',
                    // 'changeEmailSaved'=>'Your email address has been changed successfully.',
                    // 'changeEmailSaveFail'=>'Unknown Error! The email address was not changed.',
                    // 'changePasswordSaveFail'=>'Unknown Error! The password was not changed.',
                ],
                'orders' => [
                    'track_your_order' => 'Track Your Order',
                    // 'noOnlineOrdering' => 'Our online ordering service is currently unavailable.',
                    // 'trackOrder' => 'Track Order',
                    // 'orderNumber' => 'Order Number',
                    // 'orderToChat' => 'Tell us something about this order.',
                    // 'findOrder' => 'Find My Order',
                    // 'wrongOrderNumber' => 'Invalid order number.',
                    // 'orderCanceled' => 'Your order has been canceled successfully.',
                    // 'orderCencelFail' => 'Unable to cancel your order. Your order has been received.',
                    // 'deliveryOrderPlaced'=>'Your order has been placed successfully and will be delivered to you',
                    // 'pickupOrderPlaced' =>'Your order has been placed successfully and will be ready for pickup',
                    // 'orderPlacedSuccessfully' => 'Your order has been placed successfully',
                    // 'orderPlaceFail' => 'Failed to place your order. Please reload the page and try again.',
                    // 'ordersHistory' => 'Orders History',
                    // 'cart' => 'My Cart',
                    // 'placeOrder' => 'Place Order',
                    // 'addToCart'=>'Add To Cart',
                    // 'itemNotice' => 'Tell us here a special request for this item.',
                    // 'specialRequest' => 'Special request',
                    // 'removeItem' => 'Remove item',
                    // 'howReceiveOrder'=>'How would you like to receive your order?',
                    // 'homeDelivery'=>'Home Delivery',
                    // 'orderPickup' =>'Order Pickup',
                    // 'deliverTo' => 'Deliver To',
                    // 'yourAddress' => 'Your Address',
                    // 'youPhoneNumber' => 'Your Phone Number',
                    // 'orderLocation' => 'Location (optional)',
                    // 'orderNotice' => 'Addtional comments',
                    // 'orderNoticePlaceholder' => 'Write your comment here...',
                    // 'phoneNumberValidation' => 'Please enter your phone number.',
                    // 'addressValidation' => 'Please enter your address.',
                    // 'orderReceipt' => 'Order Receipt',
                    // 'havePromocode' => 'Have a promo code?',
                    // 'removePromocode' => 'Remove',
                    // 'discountCap' => 'Discount cap',
                    // 'promoCode' => 'Promo Code',
                    // 'apply' => 'Apply',
                    // 'promocodeRequired' => 'Please enter the promo code.',
                    // 'promocodeNotExist' => 'Wrong promo code',
                    // 'promocodeGuest' => 'The promo code u have entered is only available for logged in users.',
                    // 'promocodeExpired' => 'The promo code u have entered has expired.',
                    // 'promocodeUsed' => 'You have already used this promo code before.',
                    // 'promocodeNoPickup' => 'The promo code u have entered is not available for pickup orders.',
                    // 'promocodeNoDelivery' => 'The promo code u have entered is not available for home delivery orders.',
                    // 'promocodeOrderTotalLimit' => 'Your order total is less than the promo code\'s minimum. The promo code minimum order total is',
                    // 'discountCap' => 'Discount cap',
                    // 'cartTotal'=>'Subtotal',
                    // 'Tax'=> 'TAX',
                    // 'deliveryCost'=> 'Delivery Service',
                    // 'service' => 'Service',
                    // 'discount' => 'Discount',
                    // 'orderTotal' =>'Total',
                    // 'orderMinimumCharge' =>'The minimum charge is',
                    // 'subtotalMinimumCharge' => 'Your order subtotal is less than the minimum charge.',
                    // 'totalMinimumCharge' => 'Your order total is less than the minimum charge.',
                    // 'placeOrderFail' => 'Unknown Error! Failed to place the order.',
                    // 'quantity' => 'Quantity',
                    // 'total'=> 'Total',
                    // 'cartEmpty' => 'Your cart is empty.',
                    // 'notAvailable'=>'Not Available',
                    // 'price' => 'Price',
                    // 'cancelOrder' => 'Cancel Order',
                    // 'pickupOutOfWorkingTimesCantOrder'=>'Receiving pickup orders is outside of working hours at the moment and will be back',
                    // 'deliveryOutOfWorkingTimesCantOrder'=>'Our delivery service is outside of working hours at the moment and will be back',
                    // 'pickupOutOfWorkingTimesCanOrder'=>'Receiving pickup orders is outside of working hours at the moment, but You can still place your order and we will pick it up',
                    // 'deliveryOutOfWorkingTimesCanOrder'=>'Our delivery service is outside of working hours at the moment, but You can still place your order and we will pick it up',
                    // 'nextsaturday'=>'next Saturday at',
                    // 'nextsunday'=>'next Sunday at',
                    // 'nextmonday'=>'next Monday at',
                    // 'nexttuesday'=>'next Tuesday at',
                    // 'nextwednesday'=>'next Wednesday at',
                    // 'nextthursday'=>'next Thursday at',
                    // 'nextfriday'=>'next Friday at',
                    // 'todayAt' => 'today at',
                    // 'tomorrowAt' => 'tomorrow at',
                    // 'am'=>'AM',
                    // 'pm'=>'PM',
                    // 'orderItems' => 'Order Items',
                    // 'copyItemsToCart' => 'Order Again',
                    // 'orderStatus' => 'Status',
                    // 'pending' => 'Pending',
                    // 'accepted' => 'Accepted',
                    // 'canceled' => 'Canceled',
                    // 'withDelivery' => 'On the way to you',
                    // 'readyToPickup' => 'Ready for pickup',
                    // 'readyForPickup' => 'Ready for pickup',
                    // 'delivered' => 'Delivered',
                    // 'pickedUp' => 'Picked Up',
                    // 'dinein' => 'Dine-in',
                    // 'diningin' => 'Dining-in',
                    // 'orderPlaced'=>'Placed',
                    // 'orderType' => 'Receiving Method',
                    // 'deliverTo' => 'Deliver to',
                    // 'min' => 'minute',
                    // 'mins' => 'minutes',
                    // 'hour' => 'hour',
                    // 'hours' => 'hours',
                    // 'day' => 'day',
                    // 'days' => 'days',
                    // 'asSoonAsPossible'=> 'as soon as possible',
                    // 'in'=> 'in',
                    // 'noOrdersInHistory' => "You haven't placed any orders yet.",
                    // 'deliveryCostCanBeChanged' =>"Please note that delivery cost can be changed based on your location.",
                    // 'contactInfo' => 'Contact Information',
                    // 'paymentMethod' => 'Payment Method',
                    // 'cash_on_delivery' => 'Cash on delivery',
                    // 'card_on_delivery' => 'Credit card to delivery man',
                    // 'cash_at_restaurant' => 'Cash at the restaurant',
                    // 'card_at_restaurant' => 'Credit card at the restaurant',
                    // 'paymentMethodMissing' => 'Please select the payment method.',
                    // 'paymentMethodValidation' => 'Please select a payment method.',

                    // 'availableNow' => 'Available now',
                    // 'discountDeliveryUntil' => 'discount for home delivery orders until',
                    // 'discountPickupUntil' => 'discount for Pickup orders until',
                    // 'discountDineinUntil' => 'discount for Dine-in orders until',
                    // 'discountDeliverySoon' => 'discount for home delivery orders will be available soon from',
                    // 'discountPickupSoon' => 'discount for Pickup orders will be available soon from',
                    // 'discountDineinSoon' => 'discount for Dine-in orders will be available soon from',
                    // 'to' => 'to',
                    // 'loginToOrder' => 'To be able to place an order, you must be logged in.',
                ],
                'reviews' => [
                    // 'collectReviewsTitle' => 'Your opinion matters',
                    // 'collectReviewsPosted' => 'Thank you for sharing your opinion with us.',
                    // 'collectReviewsReviewRequired' => 'Please rate and write a review on at least one product.',
                    // 'postReviewFails' => 'Unknown Error! Failed to post your review.',
                    // 'postReviewPosted' => 'Your review has been posted successfully.',
                    // 'reviews' => 'Reviews',
                    // 'review' => 'Review',
                    // 'lastUpdate' => 'Last update',
                    // 'postedBy' => 'Posted by',
                    // 'aGuest' => 'a guest',
                    // 'guest' => 'Guest',
                    // 'loginRequiredToReview' => 'To be able to review this product you must login.',
                    // 'loginRequiredToReview2' => 'login',
                    // 'reviewTitleRequired' => 'Please enter the review title.',
                    // 'reviewRateRequired' => 'Please rate the product.',
                    // 'reviewReviewRequired' => 'Please type your review.',
                    // 'collectReviewRate' => 'Rate',
                    // 'collectReviewReview' => 'Write a review',
                    // 'reviewTitle' => 'Review title',
                    // 'enterYourReview' => 'Enter your review here...',
                    // 'postReview' => 'Post',
                    // 'customersReviews'=> 'Reviews',
                    // 'seeMoreReviews' => 'More Reviews',
                    // 'postNewReview' => 'Post a new review',
                    // 'reviewRating' => 'Rating',
                    // 'noReviews' => 'This product has no any reviews yet',
                    // 'ourCustomersReviews' => 'Our Customers Reviews',
                ],
                'liveChat' =>[
                    // 'msgSent' => 'Sent',
                    // 'msgDelivered' => 'Delivered',
                    // 'msgSeen' => 'Seen',
                    // 'msgDeleted' => 'Deleted',
                    // 'msgToday' => 'Today',
                    // 'msgYesterday' => 'Yesterday',
                    // 'liveChat' => 'Chat with us',
                    // 'online' => 'Online',
                    // 'offline' => 'Offline',
                    // 'YourMessage' => 'Message...',
                    // 'send'=>'Send',
                    // 'msgInfo'=> 'Message Info',
                    // 'deleteMsg' => 'Delete',
                    // 'cancelDeleteMsg' => 'Cancel',
                    // 'deleteConfirmMsg' => 'Are you sure you want to delete this message?',
                    // 'deletedmsg' => 'Deleted message!',
                    // 'msgSendFail' => 'Failed to send this message.',
                    // 'resendMsg' => 'Resend',
                    // 'sendMessageCoolDown' => 'Too many messages. Please wait!',
                    // 'loginToChat' => 'To be able to chat with us, you must be logged in.',
                ],
                'other' => [
                    'home' => 'Home',
                    'foodmenu' => 'Food Menu',
                    'about_us' => 'About Us',
                    'our_products' => 'Our Products',
                    'see_more' => 'See more',
                    'unknown_error' => 'Unknown Error! Please try again.',
                    'agree_with' => 'I agree with the',
                    'privacy_policy' => 'Privacy Policy',
                    'ok' => 'OK',
                    'save' => 'Save',
                    'confirm' => 'Confirm',
                    // 'new' => 'New',
                    // 'scrollToTop' => 'Scroll To Top',
                    // 'selectLanguage' => 'Choose a language',
                    // 'more'=>'More',
                    // 'announcement' => 'Announcement',
                    // 'contactUs' => 'Contact us',
                    // 'deliveryWorkingHours' => 'Home Delivery Opening Hours',
                    // 'pickupWorkingHours' => 'Order Pickup Opening Hours',
                    // 'dineinWorkingHours' => 'Dine-in Opening Hours',
                    // 'happyHour' => 'Happy Hour',
                    // 'discount' => 'discount',
                    // 'from' => 'From',
                    // 'to' => 'To',
                    // 'hours24' => '24 hours',
                    // 'account' => 'Account',
                    // 'otherLinks' => 'Quick links',
                    // 'language' => 'Language',
                    // 'moreProducts' => 'Similar Products',
                    // 'topRated' => 'Top Rated',
                    // 'mostPopular' => 'Most Popular',
                    // 'popular' => 'Popular',
                    // 'trending' => 'Trending',
                    // 'followUsOn' => 'Follow us on',
                    // 'phone' => 'Phone',
                    // 'address' => 'Address',
                    // 'restaurantEmail' => 'Email',
                    // 'before' => 'more than',
                    // 'after' => 'ago',
                    // 'lessThanMin'=> 'less than one minute ago',
                    // 'min' => 'minute',
                    // 'mins' => 'minutes',
                    // 'hour' => 'hour',
                    // 'hours' => 'hours',
                    // 'day' => 'day',
                    // 'days' => 'days',
                    // 'month' => 'month',
                    // 'months' => 'months',
                    // 'year' => 'year',
                    // 'years' => 'years',
                    // 'sunday' => 'Sunday',
                    // 'monday' => 'Monday',
                    // 'tuesday' => 'Tuesday',
                    // 'wednesday' => 'Wednesday',
                    // 'thursday'=> 'Thursday',
                    // 'friday' => 'Friday',
                    // 'saturday' => 'Saturday',
                    // 'ourLocation' => 'Our Location',
                    // 'cookiesMsg' => 'By continuing browsing our site, you agree to store the cookies on your device to enable us remember your identity, your preferred language, and your cart.',
                    // 'cookiesMsgBtn' => 'I AGREE',

                    // 'discoverMore' => 'Discover More',
                    // 'seeLess' => 'See Less',
                    // 'ourStory' => 'Our Story',
                    // 'orderNow' => 'Order Now',
                    // 'gallery' => 'Gallery',
                    // 'productToChat' => 'Tell us something about this product.',
                    // 'close' => 'Close',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]
            ];
        }else if($lang == 'ar'){
            return [
                'authentication' => [
                    'login' => 'Login',
                    'signup' => 'Sign up',
                    'logout' => 'Logout',
                    'email' => 'Email Address',
                    'password' => 'Password',
                    'confirm_password' => 'Confirm password',
                    'current_password' => 'Current password',
                    'new_password' => 'New password',
                    'new_password_confirm' => 'New password confirm',
                    'name' => 'Name',
                    'phone_number' => 'Phone Number',
                    'remember_me' => 'Remember me',
                    'forget_password_q' => 'Forgot Password?',  
                    'reset_password'=>'Reset Password',
                    'dont_have_account_q' => "Don't have an account?",
                    'login_description' => 'Please enter your email and password.',
                    'login_fail' => 'Incorrect email or password.',
                    'user_banned' => 'This account has been banned.',
                    // 'logged_in' => 'You have been successfully logged in',
                    'have_account_login' => 'Already have an account?',
                    'email_unique' => 'The email you entered already exists.',
                    'email_required' => 'Please enter a valid email.',
                    'email_email' => 'The email address you entered is incorrect.',
                    'name_required' => 'Please enter your name.',
                    'name_max' => "The name must be maximum 100 characters.",
                    'name_min' => "The name must be at least 3 characters.",
                    'password_required' => 'Please enter a valid password.',
                    'password_min' => "The password must be at least 8 characters.",
                    'password_max' => "The password must be maximum 50 characters.",
                    'password_confirm_required' => 'Please confirm your password',
                    'password_confirm_same' => 'The password and the password confirm must be the same.',
                    'privacy_policy_error' => 'To signup, you must agree with our privacy policy.',
                    'phone_number_required' => 'Please enter your valid phone number.',
                    'phone_number_regex' => 'The phone number you entered is incorrect.',
                    'phone_number_unique' => 'The phone number you entered is already used by another user.',
                    'accountCreated'=> 'You have successfully registered. You can now log in.',
                    'profile_saved' => 'Data saved successfully.',
                    'change_password_saved'=>'Your password has been changed successfully.',
                    'wrong_password' => 'Wrong password!',
                    
                    'reset_password_code' => 'Reset password code',
                    'reset_password_send_code' => 'Send reset code',
                    'reset_password_email_incorrect' => 'The email you entered is not registered.',
                    'reset_password_description' => 'Please enter your registered email address.',
                    'reset_password_wait'=> 'We already sent a password reset message to your email. If you do not find the message in your inbox, please check your spam folder.',
                    'reset_password_sent'=>'Please enter the code we sent to your email. If you do not find the message in your inbox, please check your spam folder.',
                    
                    'reset_password_expired_code'=>'The password reset code you used has expired.',
                    'reset_password_wrong_code'=>'Invalid password reset code.',
                    'reset_password_enter_new_password' => 'Please enter and confirm your new password',
                    'reset_password_changed' => 'The password has been changed successfully. You can now log in to your account with your new password.',

                    'account_information' => 'Account information',
                    'my_addresses' => 'My addresses',
                    'my_orders' => 'My orders',
                    'change_account_password' => 'Change account password',
                ],
                'orders' => [
                    'track_your_order' => 'Track Your Order',
                ],
                'reviews' => [

                ],
                'liveChat' =>[

                ],
                'other' => [
                    'home' => 'Home',
                    'foodmenu' => 'Food Menu',
                    'about_us' => 'About Us',
                    'our_products' => 'Our Products',
                    'see_more' => 'See more',
                    'unknown_error' => 'Unknown Error! Please try again.',
                    'agree_with' => 'I agree with the',
                    'privacy_policy' => 'Privacy Policy',
                    'ok' => 'OK',
                    'save' => 'Save',
                    'confirm' => 'Confirm',
                ],
                'receipt' => [
                    'tel' => 'هاتف',
                    'cash_on_delivery' => 'الدفع عند الاستلام',
                    'card_on_delivery' => 'بطاقة الدفع لموظف التوصيل',
                    'cash_at_restaurant' => 'نقدا في المطعم',
                    'card_at_restaurant' => 'بطاقة الدفع في المطعم',
                    'tax' => 'ضريبة',
                    'service' => 'خدمة',
                    'deliveryCost' => 'رسوم التوصيل',
                    'discount' => 'خصم',
                    'subTotal' => 'المجموع الفرعي',
                    'total' => 'المجموع',
                    'pickup' => 'طلب الاستلام',
                    'delivery' => 'توصيل منزلي',
                    'dineIn' => 'الأكل فى المطعم',
                    'qty2' => 'الكمية',
                    'item' => 'سلعة',
                    'price' => 'سعر',
                ]
            ];
        }else if($lang == 'fr'){
            return  [
                'authentication' => [
                    'login' => 'se connecter',
                    'logout' => 'Se déconnecter',
                    'email' => 'Adresse e-mail',
                    'password' => 'Mot de passe',
                    'rememberMe' => 'Se souvenir de moi',
                    'forgetPasswordQ' => 'Mot de passe oublié ?',
                    'dontHaveAccountQ' => "Vous n'avez pas de compte ? Inscrivez-vous",
                    'haveAccountLogin' => 'Vous avez déjà un compte? Connexion',
                    'signup' => "S'inscrire",
                    'name' => 'Nom',
                    'phoneNumber' => 'Numéro de téléphone',
                    'address' => 'Adresse',
                    'mylocation' => 'ma position',
                    'currentLocation' => 'Définir ma position actuelle',
                    'unsetLocation' => 'Lieu non défini',
                    'savedLocation' => 'Définir ma position enregistrée',
                    'resetPassword'=>'Réinitialiser le mot de passe',
                    'emailForResetPassword'=>'Entrez votre adresse e-mail enregistrée.',
                    'createNewPassword' => 'Créer un nouveau mot de passe',
                    'newPassword' => 'Entrez un nouveau mot de passe',
                    'profile' => 'Mon profil',
                    'save' => 'Enregistrer',
                    'changeEmail'=> 'Modifier mon e-mail',
                    'newEmail' => 'Entrez votre nouvel email',
                    'changePassword'=>'Modifier mon mot de passe',
                    'userBanned' => 'Ce compte a été banni.',
                    'loginFail' => 'Email ou mot de passe incorrect.',
                    'emailUnique' => "L'email que vous avez saisi a déjà un compte.",
                    'emailRequired' =>'Veuillez entrer un email valide.',
                    'emailEmail' => "L'adresse e-mail que vous avez saisie est incorrecte.",
                    'nameRequired' => 'S\'il vous plaît entrez votre nom.',
                    'nameMax' => "Le nom ne peut pas contenir plus de 20 caractères.",
                    'nameMin' => "Le nom ne peut pas être inférieur à 5 caractères.",
                    'passwordRequired' => 'Veuillez entrer un mot de passe valide.',
                    'passwordMin' => "Le mot de passe ne peut pas être inférieur à 8 caractères.",
                    'passwordMax' =>"Le mot de passe ne peut pas dépasser 20 caractères.",
                    'phoneNumberRequired' => 'Veuillez entrer votre numéro de téléphone valide.',
                    'phoneNumberRegex' => 'Le numéro de téléphone que vous avez entré est incorrect.',
                    'phoneNumberUnique' => 'Le numéro de téléphone que vous avez entré est déjà utilisé par un autre utilisateur.',
                    'addressRequired' => 'Veuillez entrer votre adresse.',
                    'accountCreated'=>'Vous vous êtes inscrit avec succès. Vous pouvez maintenant vous connecter.',
                    'wait10mins'=> 'Nous avons déjà envoyé un message de réinitialisation de mot de passe à votre adresse e-mail il y a moins de 10 minutes. Vous pouvez envoyer un message de réinitialisation de mot de passe toutes les dix minutes.',
                    'wrongEmail'=>"L'adresse e-mail que vous avez saisie est incorrecte.",
                    'resetPasswordemailSent'=>'Un e-mail a été envoyé à votre adresse e-mail contenant un lien pour réinitialiser votre mot de passe. Si vous ne trouvez pas le message dans votre boîte de réception, veuillez vérifier votre dossier spam.',
                    'expiredRecoverPasswordToken'=>'Le lien de réinitialisation de mot de passe que vous avez utilisé a expiré.',
                    'wrongRecoverPasswordToken'=>'Lien de réinitialisation de mot de passe invalide.',
                    'passwordChanged' => 'Le mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter à votre compte avec votre nouveau mot de passe.',
                    'profileSaved'=>'Données enregistrées avec succès.',
                    'profileSaveFail'=>"Erreur inconnue, les données n'ont pas été enregistrées.",
                    'changeEmailSaved'=>'Votre adresse e-mail a été modifiée avec succès.',
                    'changeEmailSaveFail'=>"Erreur inconnue, l'adresse e-mail n'a pas été modifiée.",
                    'changePasswordSaved'=>'Votre mot de passe a été modifié avec succès.',
                    'changePasswordSaveFail'=>"Erreur inconnue, le mot de passe n'a pas été modifié.",
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'Notre service de commande en ligne est actuellement indisponible.',
                    'track_your_order' => 'Suivre ma commande',
                    'trackOrder' => 'Suivi de commande',
                    'orderNumber' => 'Numéro de commande',
                    'orderToChat' => '',
                    'findOrder' =>'Rechercher ma commande',
                    'wrongOrderNumber' => 'Numéro de commande incorrect.',
                    'orderCanceled' => 'Votre commande a été annulée avec succès.',
                    'orderCencelFail' => "Impossible d'annuler votre commande. Votre commande a déjà été reçue.",
                    'deliveryOrderPlaced'=>'Votre commande a été passée avec succès et elle vous sera livrée',
                    'pickupOrderPlaced' =>'Votre commande a été passée avec succès et sera prête à être ramassée',
                    'orderPlacedSuccessfully' => 'Votre commande a été passée avec succès',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'Historique des commandes',
                    'cart' => 'Mon panier',
                    'placeOrder' => 'Passer la commande',
                    'addToCart'=>'Ajouter au panier',
                    'itemNotice' => 'Dites-nous ici une demande spéciale pour cet article',
                    'specialRequest' => '',
                    'removeItem' => 'Retirer l\'objet',
                    'howReceiveOrder'=>'Comment souhaitez-vous recevoir votre commande?',
                    'homeDelivery'=>'Livraison à domicile',
                    'orderPickup' =>'Retrait de la commande',
                    'deliverTo' => 'Liver To',
                    'yourAddress' =>'Votre Adresse',
                    'youPhoneNumber' =>'Votre numéro de téléphone',
                    'orderLocation' => 'Lieu (facultatif)',
                    'orderNotice' => 'Laissez-nous un avis',
                    'orderNoticePlaceholder' =>'Écrivez votre avis ici...',
                    'phoneNumberValidation' => 'Veuillez entrer votre numéro de téléphone.',
                    'addressValidation' => 'Veuillez saisir votre adresse.',
                    'orderReceipt' => 'Récépissé de commande',
                    'cartTotal'=>'sous-total',
                    'Tax'=> 'TAXE',
                    'deliveryCost'=> 'Service de livraison',
                    'service' => '',
                    'orderTotal' =>'Le total',
                    'discount' => 'Remise',
                    'orderMinimumCharge' =>'Les frais minimum sont de',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' =>'Erreur inconnue, échec de la commande.',
                    'quantity' =>'Quantité',
                    'total'=>'Le total',
                    'cartEmpty' =>'Votre panier est vide.',
                    'notAvailable'=>'Non disponible',
                    'price' => 'Prix',
                    'cancelOrder' => 'annuler la commande',
                    'pickupOutOfWorkingTimesCantOrder'=>'La réception des commandes de ramassage est en dehors des heures de travail pour le moment et sera de retour',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Notre service de livraison est en dehors des heures de travail pour le moment et sera de retour',
                    'pickupOutOfWorkingTimesCanOrder'=>'La réception des commandes de ramassage est en dehors des heures de travail pour le moment, mais vous pouvez toujours passer votre commande et nous la ramasserons',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Notre service de livraison est en dehors des heures de travail pour le moment, mais vous pouvez toujours passer votre commande et nous la récupérerons',
                    'nextsaturday'=>'samedi prochain à',
                    'nextsunday'=>'dimanche prochain à',
                    'nextmonday'=>'lundi prochain à',
                    'nexttuesday'=>'mardi prochain à',
                    'nextwednesday'=>'mercredi prochain à',
                    'nextthursday'=>'jeudi prochain à',
                    'nextfriday'=>'vendredi prochain à',
                    'todayAt' =>"aujourd'hui à",
                    'tomorrowAt' =>'demain à',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Commander des articles',
                    'copyItemsToCart' =>'Copier dans le panier',
                    'orderStatus' =>'Statut',
                    'pending' => 'En attente',
                    'accepted' =>'Accepté',
                    'canceled' => 'Annulé',
                    'withDelivery' =>'En route pour vous',
                    'readyToPickup' => 'Prêt pour le ramassage',
                    'delivered' => 'Livré',
                    'pickedUp' => 'Récupéré',
                    'dinein' => 'dîner dans',
                    'orderPlaced'=>'Commande passée',
                    'orderType' => 'Méthode de réception',
                    'deliverTo' =>'Liver to',
                    'min' => 'minute',
                    'mins' =>'minutes',
                    'hour' =>'heure',
                    'hours' =>'heures',
                    'day' => 'jour',
                    'days' => 'jours',
                    'asSoonAsPossible'=>'dès que possible',
                    'in'=> 'Dans',
                    'noOrdersInHistory' => "Vous n'avez pas encore passé de commande.",
                    'deliveryCostCanBeChanged' =>"Veuillez noter que les frais de livraison peuvent être modifiés en fonction de votre emplacement.",
                    'contactInfo' => 'Coordonnées',
                    'paymentMethod' => 'Mode de paiement',
                    'cash_on_delivery' => 'Paiement à la livraison',
                    'card_on_delivery' => 'Carte de crédit au livreur',
                    'cash_at_restaurant' => 'Espèces au restaurant',
                    'card_at_restaurant' => 'Carte de crédit au restaurant',
                    'paymentMethodValidation' => 'Veuillez choisir un moyen de paiement.',

                    'availableNow' => 'Disponible dès maintenant',
                    'discountDeliveryUntil' => 'remise pour les commandes en livraison à domicile jusqu\'au',
                    'discountPickupUntil' => 'réduction pour les commandes de ramassage jusqu\'à',
                    'discountDineinUntil' => 'réduction pour les commandes au restaurant jusqu\'au',
                    'discountDeliverySoon' => 'la réduction pour les commandes de livraison à domicile sera bientôt disponible à partir de',
                    'discountPickupSoon' => 'la réduction pour les commandes de ramassage sera bientôt disponible à partir de',
                    'discountDineinSoon' => 'la réduction pour les commandes au restaurant sera bientôt disponible à partir de',
                    'to' => 'à',
                    'loginToOrder' => 'Pour pouvoir passer une commande, vous devez être connecté.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'Votre opinion compte',
                    'postReviewFails' => 'Erreur inconnue, échec de la publication de votre avis.',
                    'postReviewPosted' => 'Votre avis a été posté avec succès.',
                    'reviews' => 'Avis',
                    'postedBy' => 'Publié par',
                    'aGuest' => 'un invité non enregistré',
                    'guest' => 'invité',
                    'loginRequiredToReview' => 'Pour pouvoir évaluer ce produit, vous devez',
                    'loginRequiredToReview2' => 'se connecter',
                    'reviewTitleRequired' => "Veuillez saisir le titre de l'avis.",
                    'reviewRateRequired' =>'Veuillez noter le produit.',
                    'reviewReviewRequired' => 'Veuillez saisir votre avis.',
                    'collectReviewRate' => 'Notes',
                    'collectReviewReview' => 'Écrire un avis',
                    'reviewTitle' => 'Titre de la revue',
                    'enterYourReview' => 'Entrez votre avis ici...',
                    'postReview' => 'Publier',
                    'customersReviews'=> 'Nos avis clients',
                    'seeMoreReviews' => "Plus d'avis",
                    'postNewReview' =>'Poster un nouvel avis.',
                    'reviewRating' => 'Notation',
                    'noReviews' => 'Ce produit n\'a pas encore d\'avis',
                    'ourCustomersReviews' => 'Our Customers Reviews',

                ],
                'liveChat' =>[
                    'msgSent' => 'Envoyée',
                    'msgDelivered' => 'Livré',
                    'msgSeen' => 'Vue',
                    'msgDeleted' => 'Supprimé',
                    'msgToday' => "Aujourd'hui",
                    'msgYesterday' => 'Hier',
                    'liveChat' => 'Discute avec nous',
                    'online' => 'En ligne',
                    'offline' => 'Hors ligne',
                    'YourMessage' => 'Un message...',
                    'send'=>'Envoyer',
                    'msgInfo'=> 'Informations sur les messages',
                    'deleteMsg' => 'Supprimer',
                    'cancelDeleteMsg' => 'Annuler',
                    'deleteConfirmMsg' => 'Eêtes-vous sûr de vouloir supprimer ce message?',
                    'deletedmsg' => 'Message supprimé !',
                    'msgSendFail' => "Impossible d'envoyer le message",
                    'resendMsg' => 'Renvoyer',
                    'sendMessageCoolDown' => 'Trop de messages. Merci de patienter!',
                    'loginToChat' => 'Pour pouvoir discuter avec nous, vous devez être connecté.',
                ],
                'other' => [
                    'new' => 'NOUVELLE',
                    'lastUpdate' => 'Dernière mise à jour',
                    'scrollToTop' => 'Faire défiler vers le haut',
                    'selectLanguage' => 'Choisir une langue',
                    'unknownError' =>'Erreur inconnue, veuillez réessayer.',
                    'our_products' =>'Tous les produits',
                    'more'=>'Plus',
                    'announcement' =>'Annonce',
                    'foodmenu' =>'le menu',
                    'contactUs' => 'Contactez-nous',
                    'deliveryWorkingHours' => 'Heures d\'ouverture de la livraison à domicile',
                    'pickupWorkingHours' => 'Heures d\'ouverture de la cueillette des commandes',
                    'dineinWorkingHours' => 'Dîner aux heures d\'ouverture',
                    'about_us' => 'À propos de nous',
                    'account' => 'Compte',
                    'otherLinks' =>'Autres liens',
                    'home' =>"Page d'accueil",
                    'language' => 'Langue',
                    'moreProducts' => 'Plus de produits',
                    'topRatedProducts' =>'Produits les mieux notés',
                    'mostPopularProducts' =>'Produits les plus populaires',
                    'trendingProducts' =>'Tendance',
                    'followUsOn' => 'Suivez-nous sur',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    "before" => "plus que",
                    "after" => "depuis",
                    "lessThanMin"=> "il y a moins d'une minute",
                    "min" => "minute",
                    "mins" => "minutes",
                    "hour" => "heure",
                    "hours" => "les heures",
                    "day" => "journée",
                    "days" => "journées",
                    "month" => "mois",
                    "months" => "mois",
                    "year" => "année",
                    "years" => "ans",
                    'sunday' => 'Dimanche',
                    'monday' => 'Lundi',
                    'tuesday' => 'Mardi',
                    'wednesday' => 'Mercredi',
                    'thursday'=> 'Jeudi',
                    'friday' => 'Vendredi',
                    'saturday' => 'Samedi',
                    'ourLocation' => 'Notre emplacement',
                    'cookiesMsg' => 'En poursuivant votre navigation sur notre site, vous acceptez le stockage de cookies sur votre appareil pour nous aider à mémoriser votre Identité, Votre langue préférée, et votre panier.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]
            ];
        }else if($lang == 'de'){
            return [
                'authentication' => [
                    'login' => 'Anmeldung',
                    'logout' => 'Ausloggen',
                    'email' => 'E-Mail-Addresse',
                    'password' => 'Passwort',
                    'rememberMe' => 'Erinnere dich an mich',
                    'forgetPasswordQ' => 'Passwort vergessen?',
                    'dontHaveAccountQ' => "Sie haben kein Konto? Anmeldung",
                    'haveAccountLogin' => 'Sie haben bereits ein Konto? Anmeldung',
                    'signup' => 'Anmelden',
                    'name' => 'Name',
                    'phoneNumber' => 'Telefonnummer',
                    'address' => 'Die Anschrift',
                    'mylocation' => 'mein Standort',
                    'currentLocation' => 'Stellen Sie meinen aktuellen Standort ein',
                    'unsetLocation' => 'Standort aufheben',
                    'savedLocation' => 'Meinen gespeicherten Standort festlegen',
                    'resetPassword'=>'Passwort zurücksetzen',
                    'emailForResetPassword'=>'Geben Sie Ihre registrierte E-Mail-Adresse ein',
                    'createNewPassword' => 'Neues Passwort erstellen',
                    'newPassword' => 'Geben Sie ein neues Kennwort ein',
                    'profile' => 'Mein Profil',
                    'save' => 'Speichern',
                    'changeEmail'=> 'Meine E-Mail ändern',
                    'newEmail' => 'Geben Sie Ihre neue E-Mail ein',
                    'changePassword'=>'Ändere mein Passwort',
                    'userBanned' => 'Dieses Konto wurde gesperrt',
                    'loginFail' => 'falsche Email oder Passwort',
                    'emailUnique' => 'Die eingegebene E-Mail hat bereits ein Konto!',
                    'emailRequired' => 'Bitte geben Sie eine gültige Email-Adresse ein.',
                    'emailEmail' => 'Die eingegebene E-Mail-Adresse ist falsch',
                    'nameRequired' => 'Bitte geben Sie Ihren Namen ein.',
                    'nameMax' => "Der Name darf nicht mehr als :max Zeichen umfassen.",
                    'nameMin' => "Der Name darf nicht weniger als :min Zeichen enthalten.",
                    'passwordRequired' => 'Bitte geben Sie ein gültiges Passwort ein.',
                    'passwordMin' => "Das Passwort darf nicht weniger als :min Zeichen umfassen.",
                    'passwordMax' => "Das Passwort darf nicht mehr als :max Zeichen umfassen.",
                    'phoneNumberRequired' => 'Bitte geben Sie Ihre gültige Telefonnummer ein.',
                    'phoneNumberRegex' => 'Die von Ihnen eingegebene Telefonnummer ist falsch.',
                    'phoneNumberUnique' => 'Die von Ihnen eingegebene Telefonnummer wird bereits von einem anderen Benutzer verwendet',
                    'addressRequired' => 'Bitte geben Sie Ihre Adresse ein',
                    'accountCreated'=>'Sie haben sich erfolgreich registriert. Sie können sich jetzt einloggen',
                    'wait10mins'=> 'Wir haben bereits vor weniger als 10 Minuten eine Nachricht zum Zurücksetzen des Passworts an Ihre E-Mail gesendet. Sie können alle zehn Minuten eine Nachricht zum Zurücksetzen des Passworts senden.',
                    'wrongEmail'=>'Die eingegebene E-Mail-Adresse ist falsch',
                    'resetPasswordemailSent'=>'An Ihre E-Mail-Adresse wurde eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts gesendet. Wenn Sie die Nachricht nicht in Ihrem Posteingang finden, überprüfen Sie bitte Ihren Spam-Ordner.',
                    'expiredRecoverPasswordToken'=>'Der von Ihnen verwendete Link zum Zurücksetzen des Passworts ist abgelaufen',
                    'wrongRecoverPasswordToken'=>'Ungültiger Link zum Zurücksetzen des Passworts',
                    'passwordChanged' => 'Das Passwort wurde erfolgreich geändert. Sie können sich jetzt mit Ihrem neuen Passwort in Ihr Konto einloggen',
                    'profileSaved'=>'Daten erfolgreich gespeichert',
                    'profileSaveFail'=>'Unbekannter Fehler, die Daten wurden nicht gespeichert',
                    'changeEmailSaved'=>'Ihre E-Mail-Adresse wurde erfolgreich geändert',
                    'changeEmailSaveFail'=>'Unbekannter Fehler, die E-Mail-Adresse wurde nicht geändert',
                    'changePasswordSaved'=>'Ihr Passwort wurde erfolgreich geändert',
                    'changePasswordSaveFail'=>'Unbekannter Fehler, das Passwort wurde nicht geändert',
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'Unser Online-Bestellservice ist derzeit nicht verfügbar.',
                    'track_your_order' => 'Meine Bestellung verfolgen',
                    'trackOrder' => 'Bestellung verfolgen',
                    'orderNumber' => 'Bestellnummer',
                    'orderToChat' => '',
                    'findOrder' => 'Meine Bestellung finden',
                    'wrongOrderNumber' => 'Falsche Bestellnummer',
                    'orderCanceled' => 'Ihre Bestellung wurde erfolgreich storniert.',
                    'orderCencelFail' => 'Ihre Bestellung kann nicht storniert werden. Ihre Bestellung ist bereits eingegangen.',
                    'deliveryOrderPlaced'=>'Ihre Bestellung wurde erfolgreich aufgegeben und wird Ihnen zugestellt',
                    'pickupOrderPlaced' =>'Ihre Bestellung wurde erfolgreich aufgegeben und steht zur Abholung bereit',
                    'orderPlacedSuccessfully' => 'Ihre Bestellung wurde erfolgreich aufgegeben',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'Bestellhistorie',
                    'cart' => 'Mein Warenkorb',
                    'placeOrder' => 'Die Bestellung platzieren',
                    'addToCart'=>'In den Warenkorb legen',
                    'itemNotice' => 'Teilen Sie uns hier einen Sonderwunsch zu diesem Artikel mit',
                    'specialRequest' => '',
                    'removeItem' => 'Gegenstand entfernen',
                    'howReceiveOrder'=>'Wie möchten Sie Ihre Bestellung erhalten?',
                    'homeDelivery'=>'Hauslieferung',
                    'orderPickup' =>'Abholung der Bestellung',
                    'deliverTo' => 'Liefern an',
                    'yourAddress' => 'Deine Adresse',
                    'youPhoneNumber' => 'Deine Telefonnummer',
                    'orderLocation' => 'Standort (wahlweise)',
                    'orderNotice' => 'Hinterlassen Sie uns eine Nachricht',
                    'orderNoticePlaceholder' => 'Schreiben Sie hier Ihre Mitteilung...',
                    'phoneNumberValidation' => 'Bitte geben sie ihre Telefonnummer ein',
                    'addressValidation' => 'Bitte geben Sie Ihre Adresse ein',
                    'orderReceipt' => 'Bestellquittung',
                    'cartTotal'=>'Zwischensumme',
                    'Tax'=> 'MWST',
                    'deliveryCost'=> 'Lieferservice',
                    'service' => '',
                    'orderTotal' =>'Gesamt',
                    'discount' => 'Rabatt',
                    'orderMinimumCharge' =>'Die Mindestgebühr beträgt',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' => 'Unbekannter Fehler, die Bestellung konnte nicht aufgegeben werden',
                    'quantity' => 'Menge',
                    'total'=> 'Gesamt',
                    'cartEmpty' => 'Ihr Warenkorb ist leer',
                    'notAvailable'=>'Nicht verfügbar',
                    'price' => 'Preis',
                    'cancelOrder' => 'Bestellung stornieren',
                    'pickupOutOfWorkingTimesCantOrder'=>'Der Empfang von Abholaufträgen ist derzeit außerhalb der Arbeitszeit und wird zurückkommen',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Unser Lieferservice ist derzeit außerhalb der Arbeitszeiten und gerne wieder für Sie da',
                    'pickupOutOfWorkingTimesCanOrder'=>'Der Empfang von Abholaufträgen ist derzeit außerhalb der Arbeitszeiten, aber Sie können Ihre Bestellung trotzdem aufgeben und wir holen sie ab',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Unser Lieferservice ist derzeit außerhalb der Arbeitszeiten, aber Sie können Ihre Bestellung trotzdem aufgeben und wir holen sie ab',
                    'nextsaturday'=>'nächsten Samstag um',
                    'nextsunday'=>'nächsten Sonntag um',
                    'nextmonday'=>'nächsten Montag um',
                    'nexttuesday'=>'nächsten Dienstag um',
                    'nextwednesday'=>'nächsten Mittwoch um',
                    'nextthursday'=>'nächsten Donnerstag um',
                    'nextfriday'=>'nächsten Freitag um',
                    'todayAt' => 'heute um',
                    'tomorrowAt' => 'Morgen um',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Auftragspositionen',
                    'copyItemsToCart' => 'In den Warenkorb kopieren',
                    'orderStatus' => 'Status',
                    'pending' => 'Ausstehend',
                    'accepted' => 'Empfangen',
                    'canceled' => 'Abgesagt',
                    'withDelivery' => 'Auf dem Weg zu dir',
                    'readyToPickup' => 'Abholbereit',
                    'delivered' => 'Geliefert',
                    'pickedUp' => 'Abgeholt',
                    'dinein' => 'Speisen in',
                    'orderPlaced'=>'Bestellung aufgegeben',
                    'orderType' => 'Empfangsmethode',
                    'deliverTo' => 'Liefern an',
                    'min' => 'Minute',
                    'mins' => 'Protokoll',
                    'hour' => 'Stunde',
                    'hours' => 'Std',
                    'day' => 'Tag',
                    'days' => 'Tage',
                    'asSoonAsPossible'=> 'so schnell wie möglich',
                    'in'=> 'In',
                    'noOrdersInHistory' => "Sie haben noch keine Bestellungen aufgegeben",
                    'deliveryCostCanBeChanged' =>"Bitte beachten Sie, dass die Lieferkosten je nach Standort geändert werden können.",
                    'contactInfo' => 'Kontaktinformationen',
                    'paymentMethod' => 'Zahlungsmethode',
                    'cash_on_delivery' => 'Barzahlung bei Lieferung',
                    'card_on_delivery' => 'Kreditkarte an Zusteller',
                    'cash_at_restaurant' => 'Bargeld im Restaurant',
                    'card_at_restaurant' => 'Kreditkarte im Restaurant',
                    'paymentMethodValidation' => 'Bitte Zahlungsart wählen.',

                    'availableNow' => 'Jetzt verfügbar',
                    'discountDeliveryUntil' => 'Rabatt für Hauslieferaufträge bis',
                    'discountPickupUntil' => 'Rabatt für Abholaufträge bis',
                    'discountDineinUntil' => 'Rabatt für Dine-in-Bestellungen bis',
                    'discountDeliverySoon' => 'Rabatt für Lieferungen nach Hause wird in Kürze verfügbar sein',
                    'discountPickupSoon' => 'Rabatt für Abholaufträge wird in Kürze verfügbar sein',
                    'discountDineinSoon' => 'Der Rabatt für Dine-in-Bestellungen ist in Kürze verfügbar ab',
                    'to' => 'zu',
                    'loginToOrder' => 'Um eine Bestellung aufgeben zu können, müssen Sie eingeloggt sein.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'Deine Meinung zählt',
                    'postReviewFails' => 'Unbekannter Fehler, Ihre Bewertung konnte nicht veröffentlicht werden!',
                    'postReviewPosted' => 'Ihre Bewertung wurde erfolgreich veröffentlicht!',
                    'reviews' => 'Bewertungen',
                    'postedBy' => 'Geschrieben von',
                    'aGuest' => 'ein Gast',
                    'guest' => 'Gast',
                    'loginRequiredToReview' => 'Um dieses Produkt bewerten zu können, müssen Sie',
                    'loginRequiredToReview2' => 'Anmeldung',
                    'reviewTitleRequired' => 'Bitte geben Sie den Titel der Bewertung ein',
                    'reviewRateRequired' => 'Bitte bewerten Sie das Produkt',
                    'reviewReviewRequired' => 'Bitte geben Sie Ihre Bewertung ein',
                    'collectReviewRate' => 'Rate',
                    'collectReviewReview' => 'Eine Rezension schreiben',
                    'reviewTitle' => 'Titel der Bewertung',
                    'enterYourReview' => 'Geben Sie hier Ihre Bewertung ein...',
                    'postReview' => 'veröffentlichen',
                    'customersReviews'=> 'Unsere Kundenbewertungen',
                    'seeMoreReviews' => 'Mehr Bewertungen',
                    'postNewReview' => 'Post a new review',
                    'reviewRating' => 'Bewertung',
                    'noReviews' => 'Dieses Produkt hat noch keine Bewertungen',
                    'ourCustomersReviews' => 'Our Customers Reviews',

                ],
                'liveChat' =>[
                    'msgSent' => 'Geschickt',
                    'msgDelivered' => 'Geliefert',
                    'msgSeen' => 'Gesehen',
                    'msgDeleted' => 'Gelöscht',
                    'msgToday' => 'Heute',
                    'msgYesterday' => 'Gestern',
                    'liveChat' => 'chatte mit uns',
                    'online' => 'Online',
                    'offline' => 'Offline',
                    'YourMessage' => 'Nachricht...',
                    'send'=>'Schicken',
                    'msgInfo'=> 'Nachrichteninfo',
                    'deleteMsg' => 'Löschen',
                    'cancelDeleteMsg' => 'Stornieren',
                    'deleteConfirmMsg' => 'Möchten Sie diese Nachricht wirklich löschen?',
                    'deletedmsg' => 'Nachricht gelöscht!',
                    'msgSendFail' => 'Die Nachricht konnte nicht gesendet werden',
                    'resendMsg' => 'Erneut senden',
                    'sendMessageCoolDown' => 'Zu viele Nachrichten bitte warten!',
                    'loginToChat' => 'Um mit uns chatten zu können, müssen Sie eingeloggt sein.',
                ],
                'other' => [
                    'new' => 'NEU',
                    'lastUpdate' => 'Letztes Update',
                    'scrollToTop' => 'Nach oben scrollen',
                    'selectLanguage' => 'Wähle eine Sprache',
                    'unknownError' => 'Unbekannter Fehler, bitte versuchen Sie es erneut',
                    'our_products' => 'Alle Produkte',
                    'more'=>'Mehr',
                    'announcement' => 'Bekanntmachung',
                    'foodmenu' => 'Menü',
                    'contactUs' => 'Kontaktiere uns',
                    'deliveryWorkingHours' => 'Öffnungszeiten Hauszustellung',
                    'pickupWorkingHours' => 'Öffnungszeiten der Auftragsabholung',
                    'dineinWorkingHours' => 'Speisen Sie während der Öffnungszeiten',
                    'about_us' => 'Über uns',
                    'account' => 'Konto',
                    'otherLinks' => 'Andere Links',
                    'home' => 'Startseite',
                    'language' => 'Sprache',
                    'moreProducts' => 'Mehr Produkte',
                    'topRatedProducts' => 'Am besten bewertete Produkte',
                    'mostPopularProducts' => 'Beliebteste Produkte',
                    'trendingProducts' => 'Im Trend',
                    'followUsOn' => 'Folge uns auf',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    'before' => 'mehr als',
                    'after' => 'vor',
                    'lessThanMin'=> 'vor weniger als einer Minute',
                    'min' => 'Minute',
                    'mins' => 'Protokoll',
                    'hour' => 'Stunde',
                    'hours' => 'Std',
                    'day' => 'Tag',
                    'days' => 'Tage',
                    'month' => 'Monat',
                    'months' => 'Monate',
                    'year' => 'Jahr',
                    'years' => 'Jahre',
                    'sunday' => 'Sonntag',
                    'monday' => 'Montag',
                    'tuesday' => 'Dienstag',
                    'wednesday' => 'Mittwoch',
                    'thursday'=> 'Donnerstag',
                    'friday' => 'Freitag',
                    'saturday' => 'Samstag',
                    'ourLocation' => 'unsere Position',
                    'cookiesMsg' => 'Indem Sie weiterhin auf unserer Website surfen, stimmen Sie der Speicherung von Cookies auf Ihrem Gerät zu, damit wir uns an Ihre Identität, Ihre bevorzugte Sprache und Ihren Warenkorb erinnern können.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]
            ];
        }else if($lang == 'es'){
            return  [
                'authentication' => [
                    'login' => 'inicio de sesión',
                    'logout' => 'Cerrar sesión',
                    'email' => 'Dirección de correo electrónico',
                    'password' => 'Contraseña',
                    'rememberMe' => 'Recuérdame',
                    'forgetPasswordQ' => '¿Has olvidado tu contraseña?',
                    'dontHaveAccountQ' => "¿No tienes una cuenta? Inscribirse",
                    'haveAccountLogin' => 'S¿Ya tienes una cuenta? Acceso',
                    'signup' => 'Inscribirse',
                    'name' => 'Nombre',
                    'phoneNumber' => 'Número de teléfono',
                    'address' => 'Dirección',
                    'mylocation' => 'mi ubicacion',
                    'currentLocation' => 'Establecer mi ubicación actual',
                    'unsetLocation' => 'Ubicación no establecida',
                    'savedLocation' => 'Establecer mi ubicación guardada',
                    'resetPassword'=>'Restablecer la contraseña',
                    'emailForResetPassword'=>'Ingrese su dirección de correo electrónico registrada',
                    'createNewPassword' => 'Crear nueva contraseña',
                    'newPassword' => 'Introduzca una nueva contraseña',
                    'profile' => 'Mi perfil',
                    'save' => 'Ahorrar',
                    'changeEmail'=> 'Cambiar mi correo electrónico',
                    'newEmail' => 'Enter your new email',
                    'changePassword'=>'Cambiar mi contraseña',
                    'userBanned' => 'Esta cuenta ha sido prohibida',
                    'loginFail' => 'Correo o contraseña incorrectos',
                    'emailUnique' => '¡El correo electrónico que ingresó ya tiene una cuenta!',
                    'emailRequired' => 'Por favor introduzca una dirección de correo electrónico válida.',
                    'emailEmail' => 'La dirección de correo electrónico que ha introducido es incorrecta',
                    'nameRequired' => 'Por favor, escriba su nombre.',
                    'nameMax' => "El nombre no puede tener más de :max caracteres.",
                    'nameMin' => "El nombre no puede tener menos :min caracteres.",
                    'passwordRequired' => 'Por favor introduce una contraseña válida.',
                    'passwordMin' => "La contraseña no puede tener menos de :min caracteres.",
                    'passwordMax' => "La contraseña no puede tener más de :max caracteres.",
                    'phoneNumberRequired' => 'Ingrese su número de teléfono válido.',
                    'phoneNumberRegex' => 'El número de teléfono que ingresaste es incorrecto.',
                    'phoneNumberUnique' => 'El número de teléfono que ingresó ya lo está usando otro usuario',
                    'addressRequired' => 'Por favor ingrese su direccion',
                    'accountCreated'=>'Se ha registrado exitosamente. Ahora puede iniciar sesión',
                    'wait10mins'=> 'Ya le enviamos un mensaje de restablecimiento de contraseña a su correo electrónico hace menos de 10 minutos. Puede enviar un mensaje de restablecimiento de contraseña una vez cada diez minutos.',
                    'wrongEmail'=>'La dirección de correo electrónico que ha introducido es incorrecta',
                    'resetPasswordemailSent'=>'Se ha enviado un correo electrónico a su dirección de correo electrónico que contiene un enlace para restablecer su contraseña. Si no encuentra el mensaje en su bandeja de entrada, verifique su carpeta de correo no deseado.',
                    'expiredRecoverPasswordToken'=>'El enlace de restablecimiento de contraseña que usó ha caducado',
                    'wrongRecoverPasswordToken'=>'Enlace de restablecimiento de contraseña no válido',
                    'passwordChanged' => 'La contraseña ha sido cambiada con éxito. Ahora puede iniciar sesión en su cuenta con su nueva contraseña',
                    'profileSaved'=>'Datos guardados exitosamente',
                    'profileSaveFail'=>'Error desconocido, los datos no se guardaron',
                    'changeEmailSaved'=>'Your email address has been changed successfully',
                    'changeEmailSaveFail'=>'Error desconocido, la dirección de correo electrónico no se modificó',
                    'changePasswordSaved'=>'tu contraseña ha sido cambiada exitosamente',
                    'changePasswordSaveFail'=>'Error desconocido, la contraseña no se cambió',
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'Nuestro servicio de pedidos en línea no está disponible actualmente.',
                    'track_your_order' => 'Seguimiento de mi pedido',
                    'trackOrder' => 'Orden de pista',
                    'orderNumber' => 'Número de orden',
                    'orderToChat' => '',
                    'findOrder' => 'Encuentra mi pedido',
                    'wrongOrderNumber' => 'Número de orden incorrecto',
                    'orderCanceled' => 'Tu pedido ha sido cancelado correctamente.',
                    'orderCencelFail' => 'No se puede cancelar su pedido. Tu pedido ya ha sido recibido.',
                    'deliveryOrderPlaced'=>'Su pedido se ha realizado con éxito y se le entregará',
                    'pickupOrderPlaced' =>'Su pedido se ha realizado con éxito y estará listo para su recogida.',
                    'orderPlacedSuccessfully' => 'Tu pedido ha sido realizado con éxito',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'Historial de pedidos',
                    'cart' => 'Mi carrito',
                    'placeOrder' => 'Hacer el pedido',
                    'addToCart'=>'Añadir al carrito',
                    'itemNotice' => 'Cuéntanos aquí un pedido especial para este artículo',
                    'specialRequest' => '',
                    'removeItem' => 'Remover el artículo',
                    'howReceiveOrder'=>'¿Cómo le gustaría recibir su pedido?',
                    'homeDelivery'=>'Entrega a domicilio',
                    'orderPickup' =>'Recogida de pedidos',
                    'deliverTo' => 'Entregar a',
                    'yourAddress' => 'Su dirección',
                    'youPhoneNumber' => 'Su número de teléfono',
                    'orderLocation' => 'Ubicación (opcional)',
                    'orderNotice' => 'Déjanos un aviso',
                    'orderNoticePlaceholder' => 'Escriba su aviso aquí ...',
                    'phoneNumberValidation' => 'Por favor, introduzca su número de teléfono',
                    'addressValidation' => 'Por favor ingrese su direccion',
                    'orderReceipt' => 'Recibo de pedido',
                    'cartTotal'=>'Total parcial',
                    'Tax'=> 'IMPUESTO',
                    'deliveryCost'=> 'Servicio de entrega',
                    'service' => '',
                    'orderTotal' =>'Total',
                    'discount' => 'Descuento',
                    'orderMinimumCharge' =>'El cargo mínimo es',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' => 'Error desconocido, no se pudo realizar el pedido',
                    'quantity' => 'Cantidad',
                    'total'=> 'Total',
                    'cartEmpty' => 'Tu carrito esta vacío',
                    'notAvailable'=>'No disponible',
                    'price' => 'Precio',
                    'cancelOrder' => 'cancelar orden',
                    'pickupOutOfWorkingTimesCantOrder'=>'La recepción de pedidos de recogida está fuera del horario laboral en este momento y volverá',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Nuestro servicio de entrega está fuera del horario laboral en este momento y volverá',
                    'pickupOutOfWorkingTimesCanOrder'=>'La recepción de pedidos para recoger está fuera del horario laboral en este momento, pero aún puede realizar su pedido y lo recogeremos',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Nuestro servicio de entrega está fuera del horario laboral en este momento, pero aún puede hacer su pedido y lo recogeremos',
                    'nextsaturday'=>'el próximo sábado a las',
                    'nextsunday'=>'el próximo domingo a las',
                    'nextmonday'=>'el próximo lunes a las',
                    'nexttuesday'=>'el próximo martes a las',
                    'nextwednesday'=>'el próximo miércoles a las',
                    'nextthursday'=>'el próximo jueves a las',
                    'nextfriday'=>'el próximo viernes a las',
                    'todayAt' => 'hoy a las',
                    'tomorrowAt' => 'mañana a',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Encargar artículos',
                    'copyItemsToCart' => 'Copiar al carrito',
                    'orderStatus' => 'Estado',
                    'pending' => 'Pendiente',
                    'accepted' => 'Recibida',
                    'canceled' => 'Cancelada',
                    'withDelivery' => 'De camino a ti',
                    'readyToPickup' => 'Lista para recoger',
                    'delivered' => 'Entregada',
                    'pickedUp' => 'Recogido',
                    'dinein' => 'Cenar en',
                    'orderPlaced'=>'Pedido realizado',
                    'orderType' => 'Método de recepción',
                    'deliverTo' => 'Entregar a',
                    'min' => 'minuto',
                    'mins' => 'minutos',
                    'hour' => 'hora',
                    'hours' => 'horas',
                    'day' => 'día',
                    'days' => 'daysdias',
                    'asSoonAsPossible'=> 'tan pronto como sea posible',
                    'in'=> 'En',
                    'noOrdersInHistory' => "Aún no has realizado ningún pedido.",
                    'deliveryCostCanBeChanged' =>"Tenga en cuenta que el costo de envío se puede cambiar según su ubicación.",
                    'contactInfo' => 'Información del contacto',
                    'paymentMethod' => 'Método de pago',
                    'cash_on_delivery' => 'contra reembolso',
                    'card_on_delivery' => 'Tarjeta de crédito al repartidor',
                    'cash_at_restaurant' => 'efectivo en el restaurante',
                    'card_at_restaurant' => 'Tarjeta de crédito en el restaurante',
                    'paymentMethodValidation' => 'Por favor seleccione un método de pago.',

                    'availableNow' => 'Disponible ahora',
                    'discountDeliveryUntil' => 'descuento para pedidos a domicilio hasta',
                    'discountPickupUntil' => 'descuento para pedidos de recogida hasta',
                    'discountDineinUntil' => 'descuento para pedidos para cenar hasta',
                    'discountDeliverySoon' => 'El descuento para pedidos a domicilio estará disponible pronto desde',
                    'discountPickupSoon' => 'El descuento para pedidos de recogida estará disponible pronto desde',
                    'discountDineinSoon' => 'El descuento para pedidos para cenar estará disponible pronto desde',
                    'to' => 'a',
                    'loginToOrder' => 'Para poder realizar un pedido, debe iniciar sesión.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'Tu opinion importa',
                    'postReviewFails' => 'Error desconocido, no se pudo publicar su reseña.',
                    'postReviewPosted' => '¡Tu reseña se ha publicado correctamente!',
                    'reviews' => 'Reseñas',
                    'postedBy' => 'publicado por',
                    'aGuest' => 'Una invitada',
                    'guest' => 'invitada',
                    'loginRequiredToReview' => 'a Para poder opinar sobre este producto debe',
                    'loginRequiredToReview2' => 'iniciar sesión',
                    'reviewTitleRequired' => 'Ingrese el título de la reseña',
                    'reviewRateRequired' => 'Califica el producto',
                    'reviewReviewRequired' => 'Por favor escriba su reseña',
                    'collectReviewRate' => 'Índice',
                    'collectReviewReview' => 'Escribe una reseña',
                    'reviewTitle' => 'Título de Revisión',
                    'enterYourReview' => 'Ingrese su reseña aquí ...',
                    'postReview' => 'Correo',
                    'customersReviews'=> 'Opiniones de nuestras clientes',
                    'seeMoreReviews' => 'Más Reseñas',
                    'postNewReview' => 'Publica una nueva reseña',
                    'reviewRating' => 'Clasificación',
                    'noReviews' => 'Este producto aún no tiene reseñas',
                    'ourCustomersReviews' => 'Our Customers Reviews',

                ],
                'liveChat' =>[
                    'msgSent' => 'Enviada',
                    'msgDelivered' => 'Entregada',
                    'msgSeen' => 'Vista',
                    'msgDeleted' => 'Eliminado',
                    'msgToday' => 'Hoy dia',
                    'msgYesterday' => 'Ayer',
                    'liveChat' => 'habla con nosotros',
                    'online' => 'En línea',
                    'offline' => 'Desconectada',
                    'YourMessage' => 'Mensaje...',
                    'send'=>'Enviar',
                    'msgInfo'=> 'Información del mensaje',
                    'deleteMsg' => 'Borrar',
                    'cancelDeleteMsg' => 'Cancelar',
                    'deleteConfirmMsg' => '¿Seguro que quieres borrar este mensaje?',
                    'deletedmsg' => 'Mensaje eliminado!',
                    'msgSendFail' => 'Error al enviar el mensaje',
                    'resendMsg' => 'reenviar',
                    'sendMessageCoolDown' => 'Demasiados mensajes por favor espere!',
                    'loginToChat' => 'Para poder chatear con nosotros, debe iniciar sesión.',
                ],
                'other' => [
                    'new' => 'NUEVA',
                    'lastUpdate' => 'Última actualización',
                    'scrollToTop' => 'Vuelve al comienzo',
                    'selectLanguage' => 'Elige un idioma',
                    'unknownError' => 'Error desconocido, inténtalo de nuevo.',
                    'our_products' => 'Todos los productos',
                    'more'=>'Más',
                    'announcement' => 'Anuncio',
                    'foodmenu' => 'menú de comida',
                    'contactUs' => 'Contacta con nosotras',
                    'deliveryWorkingHours' => 'Horario de entrega a domicilio',
                    'pickupWorkingHours' => 'Horario de apertura de recogida de pedidos',
                    'dineinWorkingHours' => 'Cenar en horario de apertura',
                    'about_us' => 'Sobre nosotros',
                    'account' => 'Cuenta',
                    'otherLinks' => 'Otros enlaces',
                    'home' => 'Pagina de inicio',
                    'language' => 'Idioma',
                    'moreProducts' => 'Más productos',
                    'topRatedProducts' => 'Productos mejor valorados',
                    'mostPopularProducts' => 'Productos más populares',
                    'trendingProducts' => 'Tendencias',
                    'followUsOn' => 'Siga con nosotros',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    "before" => "mas que",
                    "after" => "atrás",
                    "lessThanMin"=> "hace menos de un minuto",
                    "min" => "minuto",
                    "mins" => "minutos",
                    "hour" => "hora",
                    "hours" => "horas",
                    "day" => "día",
                    "days" => "dias",
                    "month" => "mes",
                    "months" => "meses",
                    "year" => "año",
                    "years" => "años",
                    'sunday' => 'Domingo',
                    'monday' => 'Lunes',
                    'tuesday' => 'martes',
                    'wednesday' => 'miércoles',
                    'thursday'=> 'jueves',
                    'friday' => 'Viernes',
                    'saturday' => 'sábado',
                    'ourLocation' => 'nuestra ubicación',
                    'cookiesMsg' => 'Al continuar navegando por nuestro sitio, acepta el almacenamiento de cookies en su dispositivo para ayudarnos a recordar su identidad, su idioma preferido y su carrito.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]
            ];
        }else if($lang == 'it'){
            return [
                'authentication' => [
                    'login' => 'Accesso',
                    'logout' => 'Disconnettersi',
                    'email' => 'Indirizzo email',
                    'password' => "Parola d'ordine",
                    'rememberMe' => 'Ricordati di me',
                    'forgetPasswordQ' => 'Ha dimenticato la password?',
                    'dontHaveAccountQ' => "Non hai un account? Registrati",
                    'haveAccountLogin' => 'Hai già un account? Accesso',
                    'signup' => 'Registrati',
                    'name' => 'Nome',
                    'phoneNumber' => 'Numero di telefono',
                    'address' => 'Indirizzo',
                    'mylocation' => 'la mia posizione',
                    'currentLocation' => 'Imposta la mia posizione attuale',
                    'unsetLocation' => 'Posizione non impostata',
                    'savedLocation' => 'Imposta la mia posizione salvata',
                    'resetPassword'=>'Resetta la password',
                    'emailForResetPassword'=>'Inserisci il tuo indirizzo email registrato',
                    'createNewPassword' => 'Crea nuova password',
                    'newPassword' => 'Inserisci una nuova password',
                    'profile' => 'Il mio profilo',
                    'save' => 'Salva',
                    'changeEmail'=> 'Cambia la mia email',
                    'newEmail' => 'Inserisci la tua nuova email',
                    'changePassword'=>'Cambia la mia password',
                    'userBanned' => 'Questo account è stato bannato',
                    'loginFail' => 'Email o password sbagliate',
                    'emailUnique' => "L'email che hai inserito ha già un account!",
                    'emailRequired' => 'Inserisci una email valida.',
                    'emailEmail' => "L'indirizzo email che hai inserito non è corretto",
                    'nameRequired' => 'Per favore inserisci il tuo nome.',
                    'nameMax' => "Il nome non può contenere più di :max caratteri.",
                    'nameMin' => "Il nome non può essere inferiore a :min caratteri.",
                    'passwordRequired' => 'Per cortesia inserire una password valida.',
                    'passwordMin' => "La Password non può essere inferiore a :min caratteri.",
                    'passwordMax' => "La Password non può contenere più di :max caratteri.",
                    'phoneNumberRequired' => 'Inserisci il tuo numero di telefono valido.',
                    'phoneNumberRegex' => 'Il numero di telefono che hai inserito non è corretto.',
                    'phoneNumberUnique' => 'Il numero di telefono che hai inserito è già utilizzato da un altro utente',
                    'addressRequired' => 'Per favore inserisci il tuo indirizzo',
                    'accountCreated'=>'Ti sei registrato con successo. Ora puoi accedere',
                    'wait10mins'=> 'Abbiamo già inviato un messaggio di reimpostazione della password alla tua e-mail meno di 10 minuti fa. Puoi inviare un messaggio di reimpostazione della password una volta ogni dieci minuti.',
                    'wrongEmail'=>"L'indirizzo email che hai inserito non è corretto",
                    'resetPasswordemailSent'=>"È stata inviata un'e-mail al tuo indirizzo e-mail contenente un collegamento per reimpostare la password. Se non trovi il messaggio nella tua casella di posta, controlla la cartella della posta indesiderata.",
                    'expiredRecoverPasswordToken'=>'Il link per la reimpostazione della password che hai utilizzato è scaduto',
                    'wrongRecoverPasswordToken'=>'Link per reimpostare la password non valido',
                    'passwordChanged' => 'La password è stata modificata con successo. Ora puoi accedere al tuo account con la tua nuova password',
                    'profileSaved'=>'Dati salvati con successo',
                    'profileSaveFail'=>'Errore sconosciuto, i dati non sono stati salvati',
                    'changeEmailSaved'=>'Il tuo indirizzo email è stato modificato con successo',
                    'changeEmailSaveFail'=>"Errore sconosciuto, l'indirizzo email non è stato modificato",
                    'changePasswordSaved'=>'La tua password è stata cambiata con successo',
                    'changePasswordSaveFail'=>'Errore sconosciuto, la password non è stata modificata',
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'Il nostro servizio di ordinazione online non è attualmente disponibile.',
                    'track_your_order' => 'Traccia il mio ordine',
                    'trackOrder' => 'Ordine dei brani',
                    'orderNumber' => "Numero d'ordine",
                    'orderToChat' => '',
                    'findOrder' => "Trova il mio ordine",
                    'wrongOrderNumber' => "Numero d'ordine errato",
                    'orderCanceled' => 'Il tuo ordine è stato annullato con successo.',
                    'orderCencelFail' => "Impossibile annullare l'ordine. Il tuo ordine è già stato ricevuto.",
                    'deliveryOrderPlaced'=>'Il tuo ordine è stato effettuato con successo e ti sarà consegnato',
                    'pickupOrderPlaced' =>'Il tuo ordine è stato effettuato con successo e sarà pronto per il ritiro',
                    'orderPlacedSuccessfully' => 'Il tuo ordine è stato effettuato con successo',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'Cronologia degli ordini',
                    'cart' => 'La mia carta',
                    'placeOrder' => "Effettua l'ordine",
                    'addToCart'=>'Aggiungi al carrello',
                    'itemNotice' => 'Comunicaci qui una richiesta speciale per questo articolo',
                    'specialRequest' => '',
                    'removeItem' => 'Rimuovi oggetto',
                    'howReceiveOrder'=>'Come desideri ricevere il tuo ordine?',
                    'homeDelivery'=>'Consegna a domicilio',
                    'orderPickup' =>'ordine di ritiro',
                    'deliverTo' => 'Spedire a',
                    'yourAddress' => 'Il tuo indirizzo',
                    'youPhoneNumber' => 'Il tuo numero di telefono',
                    'orderLocation' => 'Posizione (opzionale)',
                    'orderNotice' => 'Lasciaci un avviso',
                    'orderNoticePlaceholder' => 'Scrivi qui il tuo avviso...',
                    'phoneNumberValidation' => 'Per favore inserisci il tuo numero di telefono',
                    'addressValidation' => 'Per favore inserisci il tuo indirizzo',
                    'orderReceipt' => 'Ricevuta d\'ordine',
                    'cartTotal'=>'totale parziale',
                    'Tax'=> 'IMPOSTA',
                    'deliveryCost'=> 'Servizio di consegna',
                    'service' => '',
                    'orderTotal' =>'Totale',
                    'discount' => 'Sconto',
                    'orderMinimumCharge' =>'La tariffa minima è',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' => "Errore sconosciuto, impossibile effettuare l'ordine",
                    'quantity' => 'Quantità',
                    'total'=> 'Totale',
                    'cartEmpty' => 'il tuo carrello è vuoto',
                    'notAvailable'=>'Non disponibile',
                    'price' => 'Prezzo',
                    'cancelOrder' => 'Annulla Ordine',
                    'pickupOutOfWorkingTimesCantOrder'=>'La ricezione degli ordini di ritiro al momento è al di fuori dell\'orario di lavoro e tornerà',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Il nostro servizio di consegna al momento è al di fuori dell\'orario di lavoro e tornerà',
                    'pickupOutOfWorkingTimesCanOrder'=>'Al momento la ricezione degli ordini di ritiro è al di fuori dell\'orario di lavoro, ma puoi comunque effettuare l\'ordine e noi lo ritireremo',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Il nostro servizio di consegna al momento è al di fuori dell\'orario di lavoro, ma puoi comunque effettuare l\'ordine e noi lo ritireremo',
                    'nextsaturday'=>'sabato prossimo alle',
                    'nextsunday'=>'domenica prossima alle',
                    'nextmonday'=>'lunedì prossimo alle',
                    'nexttuesday'=>'martedì prossimo alle',
                    'nextwednesday'=>'mercoledì prossimo alle',
                    'nextthursday'=>'giovedì prossimo alle',
                    'nextfriday'=>'venerdì prossimo alle',
                    'todayAt' => 'oggi alle',
                    'tomorrowAt' => 'domani alle',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Ordina articoli',
                    'copyItemsToCart' => 'Copia nel carrello',
                    'orderStatus' => 'Stato',
                    'pending' => 'In attesa di',
                    'accepted' => 'Ricevuto',
                    'canceled' => 'Annullata',
                    'withDelivery' => 'Sulla strada per te',
                    'readyToPickup' => 'Pronto per il ritiro',
                    'delivered' => 'Consegnato',
                    'pickedUp' => 'Raccolto',
                    'dinein' => 'cenare in',
                    'orderPlaced'=>'Ordine effettuato',
                    'orderType' => 'Metodo di ricezione',
                    'deliverTo' => 'Spedire a',
                    'min' => 'minuta',
                    'mins' => 'minuti',
                    'hour' => 'ora',
                    'hours' => 'ore',
                    'day' => 'giorno',
                    'days' => 'giorni',
                    'asSoonAsPossible'=> 'appena possibile',
                    'in'=> 'tra',
                    'noOrdersInHistory' => "Non hai ancora effettuato alcun ordine",
                    'deliveryCostCanBeChanged' =>"Tieni presente che il costo di consegna può essere modificato in base alla tua posizione.",
                    'contactInfo' => 'Informazioni sui contatti',
                    'paymentMethod' => 'Metodo di pagamento',
                    'cash_on_delivery' => 'Pagamento alla consegna',
                    'card_on_delivery' => 'Carta di credito al fattorino',
                    'cash_at_restaurant' => 'Contanti al ristorante',
                    'card_at_restaurant' => 'Carta di credito al ristorante',
                    'paymentMethodValidation' => 'Seleziona un metodo di pagamento.',

                    'availableNow' => 'Disponibile ora',
                    'discountDeliveryUntil' => 'sconto per ordini consegna a domicilio fino al',
                    'discountPickupUntil' => 'sconto per ordini di ritiro fino al',
                    'discountDineinUntil' => 'sconto per ordini al ristorante fino al',
                    'discountDeliverySoon' => 'lo sconto per gli ordini con consegna a domicilio sarà presto disponibile da',
                    'discountPickupSoon' => 'lo sconto per gli ordini di ritiro sarà disponibile a breve da',
                    'discountDineinSoon' => 'lo sconto per gli ordini al ristorante sarà presto disponibile da',
                    'to' => 'a',
                    'loginToOrder' => 'Per poter effettuare un ordine, devi essere loggato.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'La tua opinione conta',
                    'postReviewFails' => 'Errore sconosciuto, impossibile pubblicare la tua recensione!',
                    'postReviewPosted' => 'La tua recensione è stata pubblicata con successo!',
                    'reviews' => 'Recensioni',
                    'postedBy' => 'Pubblicato da',
                    'aGuest' => 'un ospite',
                    'guest' => 'ospite',
                    'loginRequiredToReview' => 'Per poter recensire questo prodotto devi',
                    'loginRequiredToReview2' => 'Accesso',
                    'reviewTitleRequired' => 'Inserisci il titolo della recensione',
                    'reviewRateRequired' => 'Si prega di valutare il prodotto',
                    'reviewReviewRequired' => 'Per favore digita la tua recensione',
                    'collectReviewRate' => 'Valutare',
                    'collectReviewReview' => 'Scrivere una recensione',
                    'reviewTitle' => 'Titolo della recensione',
                    'enterYourReview' => 'Inserisci qui la tua recensione...',
                    'postReview' => 'pubblicare',
                    'customersReviews'=> 'Le recensioni dei nostri clienti',
                    'seeMoreReviews' => 'Altre recensioni',
                    'postNewReview' => 'Pubblica una nuova recensione',
                    'reviewRating' => 'Valutazione',
                    'noReviews' => 'Questo prodotto non ha ancora recensioni',
                    'ourCustomersReviews' => 'Our Customers Reviews',
                ],
                'liveChat' =>[
                    'msgSent' => 'Spedito',
                    'msgDelivered' => 'Consegnato',
                    'msgSeen' => 'Visto',
                    'msgDeleted' => 'Eliminato',
                    'msgToday' => 'In data odierna',
                    'msgYesterday' => 'Ieri',
                    'liveChat' => 'chatta con noi',
                    'online' => 'in linea',
                    'offline' => 'Disconnessa',
                    'YourMessage' => 'Messaggio...',
                    'send'=>'Spedire',
                    'msgInfo'=> 'Informazioni sul messaggio',
                    'deleteMsg' => 'Eliminare',
                    'cancelDeleteMsg' => 'Annulla',
                    'deleteConfirmMsg' => 'Sei sicuro di voler eliminare questo messaggio?',
                    'deletedmsg' => 'Messaggio cancellato!',
                    'msgSendFail' => 'Impossibile inviare il messaggio',
                    'resendMsg' => 'Rinviare',
                    'sendMessageCoolDown' => 'Troppi messaggi per favore aspetta!',
                    'loginToChat' => 'Per poter chattare con noi, devi essere loggato.',
                ],
                'other' => [
                    'new' => 'NUOVA',
                    'lastUpdate' => 'Ultimo aggiornamento',
                    'scrollToTop' => "Scorri verso l'alto",
                    'selectLanguage' => 'Scegli una lingua',
                    'unknownError' => 'Errore sconosciuto, riprovare',
                    'our_products' => 'Tutti i prodotti',
                    'more'=>'Di più',
                    'announcement' => 'Annuncio',
                    'foodmenu' => 'menù di cibo',
                    'contactUs' => 'Contattaci',
                    'deliveryWorkingHours' => 'Orari di apertura consegna a domicilio',
                    'pickupWorkingHours' => 'Orari di apertura per il ritiro dell\'ordine',
                    'dineinWorkingHours' => 'Cenare negli orari di apertura',
                    'about_us' => 'Chi siamo',
                    'account' => 'Account',
                    'otherLinks' => 'Altri link',
                    'home' => 'Pagina iniziale',
                    'language' => 'Lingua',
                    'moreProducts' => 'Altri prodotti',
                    'topRatedProducts' => 'Prodotti più votati',
                    'mostPopularProducts' => 'Prodotti più popolari',
                    'trendingProducts' => 'Tendenza',
                    'followUsOn' => 'Seguici su',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    "before" => "più di",
                    "after" => "fa",
                    "lessThanMin"=> "meno di un minuto fa",
                    "min" => "minuta",
                    "mins" => "minuti",
                    "hour" => "ora",
                    "hours" => "ore",
                    "day" => "giorno",
                    "days" => "giorni",
                    "month" => "mese",
                    "months" => "mesi",
                    "year" => "anno",
                    "years" => "anni",
                    'sunday' => 'Domenica',
                    'monday' => 'Lunedi',
                    'tuesday' => 'Martedì',
                    'wednesday' => 'Mercoledì',
                    'thursday'=> 'Giovedì',
                    'friday' => 'Venerdì',
                    'saturday' => 'Sabato',
                    'ourLocation' => 'Nostra posizione',
                    'cookiesMsg' => 'Continuando la navigazione nel nostro sito, accetti la memorizzazione dei cookie sul tuo dispositivo per aiutarci a ricordare la tua identità, la tua lingua preferita e il tuo carrello.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]
            ];
        }else if($lang == 'ru'){
            return [

                'authentication' => [
                    'login' => 'Авторизоваться',
                    'logout' => 'Выйти',
                    'email' => 'Адрес электронной почты',
                    'password' => 'Пароль',
                    'rememberMe' => 'Запомнить меня',
                    'forgetPasswordQ' => 'Забыли пароль?',
                    'dontHaveAccountQ' => "Нет учетной записи? Зарегистрироваться",
                    'haveAccountLogin' => 'У вас уже есть аккаунт? Авторизоваться',
                    'signup' => 'Зарегистрироваться',
                    'name' => 'Имя',
                    'phoneNumber' => 'Номер телефона',
                    'address' => 'Адрес',
                    'mylocation' => 'мое местонахождение',
                    'currentLocation' => 'Установити моє поточне місцезнаходження',
                    'unsetLocation' => 'Скасувати місцезнаходження',
                    'savedLocation' => 'Установити моє збережене місцезнаходження',
                    'resetPassword'=>'Сбросить пароль',
                    'emailForResetPassword'=>'Введите свой зарегистрированный адрес электронной почты.',
                    'createNewPassword' => 'Создать новый пароль',
                    'newPassword' => 'Введите новый пароль',
                    'profile' => 'Мой профиль',
                    'save' => 'Сохранить',
                    'changeEmail'=> 'Изменить мой адрес электронной почты',
                    'newEmail' => 'Введите ваш новый адрес электронной почты',
                    'changePassword'=>'Изменить пароль',
                    'userBanned' => 'Этот аккаунт заблокирован.',
                    'loginFail' => 'Неправильный адрес электронной почты или пароль.',
                    'emailUnique' => 'На введенный вами адрес электронной почты уже есть учетная запись.',
                    'emailRequired' => 'Введите, пожалуйста, действительный адрес электронной почты.',
                    'emailEmail' => 'Введенный вами адрес электронной почты неверен.',
                    'nameRequired' => 'Пожалуйста, введите Ваше имя.',
                    'nameMax' => "Имя не может содержать более 20 знаков.",
                    'nameMin' => "Имя не может быть меньше 5 знаков.",
                    'passwordRequired' => 'Пожалуйста, введите правильный пароль.',
                    'passwordMin' => "Пароль не может быть меньше 8 знаков.",
                    'passwordMax' => "Пароль не может быть более 20 символов.",
                    'phoneNumberRequired' => 'Пожалуйста, введите ваш действующий номер телефона.',
                    'phoneNumberRegex' => 'Вы ввели неверный номер телефона.',
                    'phoneNumberUnique' => 'Введенный вами номер телефона уже используется другим пользователем.',
                    'addressRequired' => 'Пожалуйста, введите ваш адрес.',
                    'accountCreated'=>'Вы успешно зарегистрировались. Теперь вы можете войти в систему.',
                    'wait10mins'=> 'Мы уже отправили сообщение для сброса пароля на вашу электронную почту менее 10 минут назад. Вы можете отправлять сообщение для сброса пароля каждые десять минут.',
                    'wrongEmail'=>'Введенный вами адрес электронной почты неверен.',
                    'resetPasswordemailSent'=>'На ваш адрес электронной почты было отправлено письмо со ссылкой для сброса пароля. Если вы не нашли сообщение в папке «Входящие», проверьте папку со спамом.',
                    'expiredRecoverPasswordToken'=>'Срок действия ссылки для сброса пароля истек.',
                    'wrongRecoverPasswordToken'=>'Неверная ссылка для сброса пароля.',
                    'passwordChanged' => 'Пароль успешно изменен. Теперь вы можете войти в свою учетную запись, используя новый пароль.',
                    'profileSaved'=>'Данные успешно сохранены.',
                    'profileSaveFail'=>'Неизвестная ошибка, данные не были сохранены.',
                    'changeEmailSaved'=>'Ваш адрес электронной почты был успешно изменен.',
                    'changeEmailSaveFail'=>'Неизвестная ошибка, адрес электронной почты не был изменен.',
                    'changePasswordSaved'=>'Ваш пароль был успешно изменен.',
                    'changePasswordSaveFail'=>'Неизвестная ошибка, пароль не был изменен.',
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'В настоящее время наша служба онлайн-заказов недоступна.',
                    'track_your_order' => 'Отслеживать свой заказ',
                    'trackOrder' => 'Отследить заказ',
                    'orderNumber' => 'Номер заказа',
                    'orderToChat' => '',
                    'findOrder' => 'Найти мой заказ',
                    'wrongOrderNumber' => 'Неверный номер заказа.',
                    'orderCanceled' => 'Ваш заказ был отменен.',
                    'orderCencelFail' => 'Невозможно отменить ваш заказ. Ваш заказ уже принят.',
                    'deliveryOrderPlaced'=>'Ваш заказ успешно создан и будет доставлен вам',
                    'pickupOrderPlaced' =>'Ваш заказ успешно создан и готов к самовывозу',
                    'orderPlacedSuccessfully' => 'Ваш заказ успешно размещен',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'История заказов',
                    'cart' => 'Моя корзина',
                    'placeOrder' => 'Сделайте заказ',
                    'addToCart'=>'Добавить в корзину',
                    'itemNotice' => 'Сообщите нам здесь специальный запрос на этот товар',
                    'specialRequest' => '',
                    'removeItem' => 'Удалить объект',
                    'howReceiveOrder'=>'Как бы вы хотели получить свой заказ?',
                    'homeDelivery'=>'Доставка на дом',
                    'orderPickup' =>'Самовывоз',
                    'deliverTo' => 'Доставить',
                    'yourAddress' => 'Ваш адресс',
                    'youPhoneNumber' => 'Ваш номер телефона',
                    'orderLocation' => 'Местоположение (необязательно)',
                    'orderNotice' => 'Оставьте нам комментарий',
                    'orderNoticePlaceholder' => 'Напишите здесь свой комментарий ...',
                    'phoneNumberValidation' => 'пожалуйста введите ваш номер телефона.',
                    'addressValidation' => 'Пожалуйста, введите ваш адрес.',
                    'orderReceipt' => 'Получение заказа',
                    'cartTotal'=>'Промежуточный итог',
                    'Tax'=> 'НАЛОГ',
                    'deliveryCost'=> 'Стоимость доставки',
                    'service' => '',
                    'orderTotal' =>'Итого',
                    'discount' => 'Скидка',
                    'orderMinimumCharge' =>'Минимальная сумма заказа',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' => 'Неизвестная ошибка, не удалось разместить заказ.',
                    'quantity' => 'Количество',
                    'total'=> 'Итого',
                    'cartEmpty' => 'Ваша корзина пуста.',
                    'notAvailable'=>'Нет в наличии',
                    'price' => 'Цена',
                    'cancelOrder' => 'отменить заказ',
                    'pickupOutOfWorkingTimesCantOrder'=>'Прием заказов на самовывоз в данный момент не в рабочее время и вернется',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Наша служба доставки в данный момент не работает и вернется',
                    'pickupOutOfWorkingTimesCanOrder'=>'Прием заказов на самовывоз в данный момент не в рабочее время, но Вы все равно можете оформить заказ и мы его заберем',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Наша служба доставки в данный момент не работает, но Вы все равно можете оформить заказ и мы его заберем',
                    'nextsaturday'=>'в субботу',
                    'nextsunday'=>'в воскресенье',
                    'nextmonday'=>'в понедельник',
                    'nexttuesday'=>'во вторник',
                    'nextwednesday'=>'в среду',
                    'nextthursday'=>'в четверг',
                    'nextfriday'=>'в пятницу',
                    'todayAt' => 'сегодня в',
                    'tomorrowAt' => 'завтра в',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Заказать продукцию',
                    'copyItemsToCart' => 'Копировать в корзину',
                    'orderStatus' => 'Статус',
                    'pending' => 'В ожидании',
                    'accepted' => 'Принято',
                    'canceled' => 'Аннулировано',
                    'withDelivery' => 'По дороге к вам',
                    'readyToPickup' => 'Готов к вывозу',
                    'delivered' => 'Доставленный',
                    'pickedUp' => 'Забрано',
                    'dinein' => 'пообедать в',
                    'orderPlaced'=>'Заказ размещен',
                    'orderType' => 'Способ получения',
                    'deliverTo' => 'Доставить в',
                    'min' => 'минута',
                    'mins' => 'минут',
                    'hour' => 'час',
                    'hours' => 'часов',
                    'day' => 'день',
                    'days' => 'дней',
                    'asSoonAsPossible'=> 'как можно скорее',
                    'in'=> 'в течении',
                    'noOrdersInHistory' => "Вы еще не делали заказов.",
                    'deliveryCostCanBeChanged' =>"Обратите внимание, что стоимость доставки может быть изменена в зависимости от вашего местоположения.",
                    'contactInfo' => 'Контакты',
                    'paymentMethod' => 'Метод оплаты',
                    'cash_on_delivery' => 'Оплата при доставке',
                    'card_on_delivery' => 'Кредитная карта курьеру',
                    'cash_at_restaurant' => 'Наличные в ресторане',
                    'card_at_restaurant' => 'Кредитная карта в ресторане',
                    'paymentMethodValidation' => 'Пожалуйста, выберите способ оплаты.',

                    'availableNow' => 'Доступен сейчас',
                    'discountDeliveryUntil' => 'скидка на заказы с доставкой на дом до',
                    'discountPickupUntil' => 'скидка на самовывоз до',
                    'discountDineinUntil' => 'скидка на заказы Dine-in до',
                    'discountDeliverySoon' => 'скидка на заказы с доставкой на дом скоро будет доступна от',
                    'discountPickupSoon' => 'скидка на заказы самовывоза будет доступна в ближайшее время от',
                    'discountDineinSoon' => 'скидка на заказы Dine-in скоро будет доступна от',
                    'to' => 'к',
                    'loginToOrder' => 'Чтобы иметь возможность сделать заказ, вы должны авторизоваться.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'Ваше мнение важно для нас',
                    'postReviewFails' => 'Неизвестная ошибка, не удалось опубликовать ваш отзыв.',
                    'postReviewPosted' => 'Ваш отзыв был успешно опубликован.',
                    'reviews' => 'Отзывы',
                    'postedBy' => 'Сообщение от',
                    'aGuest' => 'Гость',
                    'guest' => 'гость',
                    'loginRequiredToReview' => 'Чтобы иметь возможность оставить отзыв об этом продукте, вы должны',
                    'loginRequiredToReview2' => 'Авторизоваться',
                    'reviewTitleRequired' => 'Пожалуйста, напишите название отзыва.',
                    'reviewRateRequired' => 'Оцените товар.',
                    'reviewReviewRequired' => 'Пожалуйста, напишите свой отзыв.',
                    'collectReviewRate' => 'Оценивать',
                    'collectReviewReview' => 'Напишите отзыв',
                    'reviewTitle' => 'Заголовок отзыва',
                    'enterYourReview' => 'Оставьте свой отзыв здесь...',
                    'postReview' => 'Публиковать',
                    'customersReviews'=> 'Отзывы наших клиентов',
                    'seeMoreReviews' => 'Больше отзывов',
                    'postNewReview' => 'Опубликовать новый отзыв',
                    'reviewRating' => 'Рейтинг',
                    'noReviews' => 'Этот товар еще не имеет отзывов',
                    'ourCustomersReviews' => 'Our Customers Reviews',
                ],
                'liveChat' =>[
                    'msgSent' => 'Отправил',
                    'msgDelivered' => 'Доставленный',
                    'msgSeen' => 'Просмотренный',
                    'msgDeleted' => 'Удалено',
                    'msgToday' => 'Сегодня',
                    'msgYesterday' => 'Вчера',
                    'liveChat' => 'Общайтесь с нами',
                    'online' => 'онлайн',
                    'offline' => 'Не в сети',
                    'YourMessage' => 'Сообщение...',
                    'send'=>'Отправлять',
                    'msgInfo'=> 'Информация о сообщении',
                    'deleteMsg' => 'Удалить',
                    'cancelDeleteMsg' => 'Отмена',
                    'deleteConfirmMsg' => 'Вы уверены, что хотите удалить это сообщение?',
                    'deletedmsg' => 'Сообщение удалено!',
                    'msgSendFail' => 'Не удалось отправить сообщение.',
                    'resendMsg' => 'Отправить повторно',
                    'sendMessageCoolDown' => 'Слишком много сообщений. Пожалуйста, подождите!',
                    'loginToChat' => 'Чтобы иметь возможность общаться с нами, вы должны войти в систему.',
                ],
                'other' => [
                    'new' => 'НОВЫЙ',
                    'lastUpdate' => 'Последнее обновление',
                    'scrollToTop' => 'Пролистать наверх',
                    'selectLanguage' => 'Выберите язык',
                    'unknownError' => 'Неизвестная ошибка, попробуйте еще раз.',
                    'our_products' => 'Все продукты',
                    'more'=>'Больше',
                    'announcement' => 'Объявление',
                    'foodmenu' => 'Меню',
                    'contactUs' => 'Связаться с нами',
                    'deliveryWorkingHours' => 'Доставка на дом Часы работы',
                    'pickupWorkingHours' => 'Часы работы выдачи заказов',
                    'dineinWorkingHours' => 'Пообедать в часы работы',
                    'about_us' => 'О нас',
                    'account' => 'Аккаунт',
                    'otherLinks' => 'Прочие ссылки',
                    'home' => 'Домашняя страница',
                    'language' => 'Язык',
                    'moreProducts' => 'другие блюда',
                    'topRatedProducts' => 'Лучшие блюда',
                    'mostPopularProducts' => 'Самые популярные блюда',
                    'trendingProducts' => 'В тренде',
                    'followUsOn' => 'Подпишитесь на нас в',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    'before' => 'больше, чем',
                    'after' => 'тому назад',
                    'lessThanMin'=> 'менее минуты назад',
                    'min' => 'минута',
                    'mins' => 'минут',
                    'hour' => 'час',
                    'hours' => 'часы',
                    'day' => 'день',
                    'days' => 'дней',
                    'month' => 'месяц',
                    'months' => 'месяцы',
                    'year' => 'год',
                    'years' => 'годы',
                    'sunday' => 'Воскресенье',
                    'monday' => 'Понедельник',
                    'tuesday' => 'Вторник',
                    'wednesday' => 'Среда',
                    'thursday'=> 'Четверг',
                    'friday' => 'Пятница',
                    'saturday' => 'Суббота',
                    'ourLocation' => 'наше местоположение',
                    'cookiesMsg' => 'Продолжая просматривать наш сайт, вы соглашаетесь на хранение файлов cookie на вашем устройстве, чтобы помочь нам запомнить вашу личность, предпочитаемый язык и вашу корзину.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]

            ];
        }else if($lang == 'ua'){
            return [
                'authentication' => [
                    'login' => 'Увійти',
                    'logout' => 'Вийти',
                    'email' => 'Електронна адреса',
                    'password' => 'Пароль',
                    'rememberMe' => "Запам'ятати мене",
                    'forgetPasswordQ' => 'Забули пароль?',
                    'dontHaveAccountQ' => "Немає акаунта? Зареєструватися",
                    'haveAccountLogin' => 'Вже є аккаунт? Логін',
                    'signup' => 'Зареєструватися',
                    'name' => "Назва",
                    'phoneNumber' => 'Номер телефону',
                    'address' => 'Адреса',
                    'mylocation' => 'моє місцезнаходження',
                    'currentLocation' => 'Установить мое текущее местоположение',
                    'unsetLocation' => 'Удалить местоположение',
                    'savedLocation' => 'Установить мое сохраненное местоположение',
                    'resetPassword'=>'Скинути пароль',
                    'emailForResetPassword'=>'Введіть зареєстровану адресу електронної пошти.',
                    'createNewPassword' => 'Створіть новий пароль',
                    'newPassword' => 'Введіть новий пароль',
                    'profile' => 'Мій профіль',
                    'save' => 'Зберегти',
                    'changeEmail'=> 'Змінити мою електронну адресу',
                    'newEmail' => 'Введіть нову електронну адресу',
                    'changePassword'=>'Змінити мій пароль',
                    'userBanned' => 'Цей обліковий запис заблоковано.',
                    'loginFail' => 'Невірна електронна адреса або пароль.',
                    'emailUnique' => 'Електронна адреса, яку ви ввели, уже має обліковий запис.',
                    'emailRequired' => 'Введіть дійсну адресу електронної пошти.',
                    'emailEmail' => 'Адреса електронної пошти, яку ви ввели, неправильна.',
                    'nameRequired' => "Будь ласка, введіть своє ім'я.",
                    'nameMax' => "Ім’я не може містити більше 20 символів.",
                    'nameMin' => "Ім’я не може містити менше 5 символів.",
                    'passwordRequired' => 'Введіть дійсний пароль.',
                    'passwordMin' => "Пароль не може містити менше 8 символів.",
                    'passwordMax' => "Пароль не може містити більше 20 символів.",
                    'phoneNumberRequired' => 'Введіть дійсний номер телефону.',
                    'phoneNumberRegex' => 'Номер телефону, який ви ввели, неправильний.',
                    'phoneNumberUnique' => 'Введений вами номер телефону вже використовується іншим користувачем.',
                    'addressRequired' => 'Будь ласка, введіть свою адресу.',
                    'accountCreated'=>'Ви успішно зареєструвалися. Тепер ви можете увійти.',
                    'wait10mins'=> 'Ми вже надіслали повідомлення про зміну пароля на вашу електронну пошту менше 10 хвилин тому. Ви можете надсилати повідомлення про зміну пароля кожні десять хвилин.',
                    'wrongEmail'=>'Адреса електронної пошти, яку ви ввели, неправильна.',
                    'resetPasswordemailSent'=>'На вашу електронну адресу було надіслано лист із посиланням для відновлення пароля. Якщо ви не знайшли повідомлення у своїй папці «Вхідні», перевірте папку «Спам».',
                    'expiredRecoverPasswordToken'=>'Термін дії посилання для скидання пароля, який ви використали, закінчився.',
                    'wrongRecoverPasswordToken'=>'Недійсне посилання для скидання пароля.',
                    'passwordChanged' => 'Пароль успішно змінено. Тепер ви можете увійти у свій обліковий запис за допомогою нового пароля.',
                    'profileSaved'=>'Дані успішно збережено.',
                    'profileSaveFail'=>'Невідома помилка, дані не були збережені.',
                    'changeEmailSaved'=>'Вашу адресу електронної пошти було успішно змінено.',
                    'changeEmailSaveFail'=>'Невідома помилка, адресу електронної пошти не змінено.',
                    'changePasswordSaved'=>'Ваш пароль успішно змінено.',
                    'changePasswordSaveFail'=>'Невідома помилка, пароль не змінено.',
                    'privacypolicyError' => 'To signup, you must agree with our privacy policy.',
                ],
                'orders' => [
                    'noOnlineOrdering' => 'Наша служба онлайн-замовлень наразі недоступна.',
                    'track_your_order' => 'Відстежуйте своє замовлення',
                    'trackOrder' => 'Відстежити замовлення',
                    'orderNumber' => 'Номер замовлення',
                    'orderToChat' => '',
                    'findOrder' => 'Знайдіть своє замовлення',
                    'wrongOrderNumber' => 'Неправильний номер замовлення.',
                    'orderCanceled' => 'Ваше замовлення успішно скасовано.',
                    'orderCencelFail' => 'Неможливо скасувати ваше замовлення. Ваше замовлення вже отримано.',
                    'deliveryOrderPlaced'=>'Ваше замовлення успішно розміщено і воно буде доставлено вам',
                    'pickupOrderPlaced' =>'Ваше замовлення успішно розміщено і воно буде готове до самовивезення',
                    'orderPlacedSuccessfully' => 'Ваше замовлення успішно розміщено',
                    'orderPlaceFail' => '',
                    'ordersHistory' => 'Історія замовлень',
                    'cart' => 'Мій кошик',
                    'placeOrder' => 'Розмістіть замовлення',
                    'addToCart'=>'Додати в кошик',
                    'itemNotice' => 'Повідомте нам про спеціальний запит щодо цього товару',
                    'specialRequest' => '',
                    'removeItem' => 'Видалити товар',
                    'howReceiveOrder'=>'Як би ви хотіли отримати своє замовлення?',
                    'homeDelivery'=>'Доставка додому',
                    'orderPickup' =>'Замовлення Самовивіз',
                    'deliverTo' => 'Доставити до',
                    'yourAddress' => 'Ваша адреса',
                    'youPhoneNumber' => 'Ваш номер телефону',
                    'orderLocation' => 'Розташування (необов\'язково)',
                    'orderNotice' => 'Залиште нам повідомлення',
                    'orderNoticePlaceholder' => 'Напишіть своє повідомлення тут...',
                    'phoneNumberValidation' => 'Будь ласка, введіть свій номер телефону.',
                    'addressValidation' => 'Будь ласка, введіть свою адресу.',
                    'orderReceipt' => 'Квитанція замовлення',
                    'cartTotal'=>'Проміжний підсумок',
                    'Tax'=> 'ПОДАТОК',
                    'deliveryCost'=> 'Сервіс доставки',
                    'service' => '',
                    'orderTotal' =>'Всього',
                    'discount' => 'Знижка',
                    'orderMinimumCharge' =>'Мінімальна плата становить',
                    'subtotalMinimumCharge' => '',
                    'totalMinimumCharge' => '',
                    'placeOrderFail' => 'Невідома помилка, не вдалося розмістити замовлення.',
                    'quantity' => 'Кількість',
                    'total'=> 'Всього',
                    'cartEmpty' => 'Ваш кошик порожній.',
                    'notAvailable'=>'Недоступний',
                    'price' => 'Ціна',
                    'cancelOrder' => 'відмінити замовлення',
                    'pickupOutOfWorkingTimesCantOrder'=>'Отримання замовлень на самовивіз наразі відбувається в неробочий час і буде відновлено',
                    'deliveryOutOfWorkingTimesCantOrder'=>'Наша служба доставки зараз працює в неробочий час і повернеться',
                    'pickupOutOfWorkingTimesCanOrder'=>'Отримання замовлень на самовивіз на даний момент здійснюється в неробочий час, але ви все ще можете розмістити замовлення, і ми його заберемо',
                    'deliveryOutOfWorkingTimesCanOrder'=>'Наша служба доставки зараз працює в неробочий час, але ви все ще можете зробити замовлення, і ми його заберемо',
                    'nextsaturday'=>'наступної суботи о ',
                    'nextsunday'=>'наступної неділі о',
                    'nextmonday'=>'наступного понеділка о',
                    'nexttuesday'=>'наступного вівторка о',
                    'nextwednesday'=>'наступної середи о',
                    'nextthursday'=>'наступного четверга о',
                    'nextfriday'=>"наступної п'ятниці о",
                    'todayAt' => 'сьогодні о',
                    'tomorrowAt' => 'завтра о',
                    'am'=>'AM',
                    'pm'=>'PM',
                    'orderItems' => 'Замовити страви',
                    'copyItemsToCart' => 'Копіювати в кошик',
                    'orderStatus' => 'Статус',
                    'pending' => 'Очікується',
                    'accepted' => 'Прийнято',
                    'canceled' => 'Скасовано',
                    'withDelivery' => 'По дорозі до вас',
                    'readyToPickup' => 'Готовий до самовивезення',
                    'delivered' => 'Доставлений',
                    'pickedUp' => 'Забрано',
                    'dinein' => 'пообідати в',
                    'orderPlaced'=>'Замовлення розміщено',
                    'orderType' => 'Спосіб отримання',
                    'deliverTo' => 'Доставити до',
                    'min' => 'хв',
                    'mins' => 'хв',
                    'hour' => 'год',
                    'hours' => 'год',
                    'day' => 'день',
                    'days' => 'днів',
                    'asSoonAsPossible'=> 'якнайшвидше',
                    'in'=> 'через',
                    'noOrdersInHistory' => "Ви ще не зробили жодного замовлення.",
                    'deliveryCostCanBeChanged' =>"Зверніть увагу, що вартість доставки може змінюватися залежно від вашого місцезнаходження.",
                    'contactInfo' => 'Контактна інформація',
                    'paymentMethod' => 'Спосіб оплати',
                    'cash_on_delivery' => 'Накладений платіж',
                    'card_on_delivery' => 'Кредитна картка кур\'єру',
                    'cash_at_restaurant' => 'Готівка в ресторані',
                    'card_at_restaurant' => 'Кредитна картка в ресторані',
                    'paymentMethodValidation' => 'Виберіть спосіб оплати.',

                    'availableNow' => 'Наявний зараз',
                    'discountDeliveryUntil' => 'знижка на замовлення з доставкою додому до',
                    'discountPickupUntil' => 'знижка на замовлення на самовивіз до',
                    'discountDineinUntil' => 'знижка на замовлення Dine-in до',
                    'discountDeliverySoon' => 'знижка на замовлення з доставкою додому незабаром буде доступна з',
                    'discountPickupSoon' => 'знижка на замовлення на самовивіз незабаром буде доступна з',
                    'discountDineinSoon' => 'знижка для замовлень у ресторані незабаром буде доступна з',
                    'to' => 'до',
                    'loginToOrder' => 'Щоб мати можливість зробити замовлення, ви повинні авторизуватися.',
                ],
                'reviews' => [
                    'collectReviewsTitle' => 'Залиште вашу думку',
                    'postReviewFails' => 'Невідома помилка, не вдалося опублікувати ваш відгук.',
                    'postReviewPosted' => 'Ваш відгук успішно опубліковано.',
                    'reviews' => 'Відгуки',
                    'postedBy' => 'Опублікував',
                    'aGuest' => 'гість',
                    'guest' => 'гість',
                    'loginRequiredToReview' => 'Щоб мати можливість написати відгук, ви повинні',
                    'loginRequiredToReview2' => 'увійти',
                    'reviewTitleRequired' => 'Будь ласка, введіть назву відгуку.',
                    'reviewRateRequired' => 'Будь ласка, оцініть страву.',
                    'reviewReviewRequired' => 'Будь ласка, введіть свій відгук.',
                    'collectReviewRate' => 'Оцінити',
                    'collectReviewReview' => 'Написати відгук',
                    'reviewTitle' => 'Заголовок',
                    'enterYourReview' => 'Введіть свій відгук тут...',
                    'postReview' => 'опублікувати',
                    'customersReviews'=> 'Відгуки наших клієнтів',
                    'seeMoreReviews' => 'більше відгуків',
                    'postNewReview' => 'Опублікувати новий відгук',
                    'reviewRating' => 'Рейтинг',
                    'noReviews' => 'Цей продукт ще не має відгуків',
                    'ourCustomersReviews' => 'Our Customers Reviews',
                ],
                'liveChat' =>[
                    'msgSent' => 'Надісланo',
                    'msgDelivered' => 'Доставлено',
                    'msgSeen' => 'Побачено',
                    'msgDeleted' => 'Видалено',
                    'msgToday' => 'Сьогодні',
                    'msgYesterday' => 'Вчора',
                    'liveChat' => 'Спілкуйтеся з нами',
                    'online' => 'Онлайн',
                    'offline' => 'Офлайн',
                    'YourMessage' => 'повідомлення...',
                    'send'=>'Надіслати',
                    'msgInfo'=> 'Інформація про повідомлення',
                    'deleteMsg' => 'Видалити',
                    'cancelDeleteMsg' => 'Скасувати',
                    'deleteConfirmMsg' => 'Ви впевнені, що хочете видалити це повідомлення?',
                    'deletedmsg' => 'Повідомлення видалено!',
                    'msgSendFail' => 'Не вдалося надіслати повідомлення.',
                    'resendMsg' => 'Надіслати повторно',
                    'sendMessageCoolDown' => 'Забагато повідомлень. Будь ласка, зачекайте!',
                    'loginToChat' => 'Щоб мати можливість спілкуватися з нами, ви повинні увійти в систему.',
                ],
                'other' => [
                    'new' => 'НОВИНКА',
                    'lastUpdate' => 'Останнє оновлення',
                    'scrollToTop' => 'вгору',
                    'selectLanguage' => 'Виберіть мову',
                    'unknownError' => 'Невідома помилка, спробуйте ще раз.',
                    'our_products' => 'Всі страви',
                    'more'=>'Більше',
                    'announcement' => 'Оголошення',
                    'foodmenu' => 'Меню',
                    'contactUs' => "Зв'яжіться з нами",
                    'deliveryWorkingHours' => 'Години роботи доставки додому',
                    'pickupWorkingHours' => 'Години роботи самовивозу замовлення',
                    'dineinWorkingHours' => 'Обідати в години роботи',
                    'about_us' => 'Про нас',
                    'account' => 'Акаунт',
                    'otherLinks' => 'Інші посилання',
                    'home' => 'Домашня сторінка',
                    'language' => 'Мова',
                    'moreProducts' => 'Більше страв',
                    'topRatedProducts' => 'Страви з найвищими рейтингами',
                    'mostPopularProducts' => 'Найпопулярніші страви',
                    'trendingProducts' => 'У тренді',
                    'followUsOn' => 'Слідкуй за нами на',
                    'phone' => 'Phone',
                    'address' => 'Address',
                    'before' => 'більше ніж',
                    'after' => 'тому назад',
                    'lessThanMin'=> 'менше хвилини тому',
                    'min' => 'хвилина',
                    'mins' => 'хвилин',
                    'hour' => 'година',
                    'hours' => 'годин',
                    'day' => 'день',
                    'days' => 'днів',
                    'month' => 'місяць',
                    'months' => 'місяці',
                    'year' => 'рік',
                    'years' => 'роки',
                    'sunday' => 'неділя',
                    'monday' => 'понеділок',
                    'tuesday' => 'вівторок',
                    'wednesday' => 'Середа',
                    'thursday'=> 'четвер',
                    'friday' => 'П\'ятниця',
                    'saturday' => 'Субота',
                    'ourLocation' => 'Наше розташування',
                    'cookiesMsg' => 'Продовжуючи переглядати наш сайт, ви погоджуєтеся на зберігання файлів cookie на вашому пристрої, щоб допомогти нам запам’ятати вашу особу, бажану мову та ваш кошик.',
                    'agreeWith' => 'I agree with the',
                    'privacypolicy' => 'Privacy Policy',
                    'see_more' => 'Discover More',
                ],
                'receipt' => [
                    'tel' => 'tel',
                    'cash_on_delivery' => 'Cash on delivery',
                    'card_on_delivery' => 'Payment card to the delivery man',
                    'cash_at_restaurant' => 'Cash at the restaurant',
                    'card_at_restaurant' => 'Payment card at the restaurant',
                    'tax' => 'Tax',
                    'service' => 'Service',
                    'deliveryCost' => 'Delivery Fees',
                    'discount' => 'Discount',
                    'subTotal' => 'Subtotal',
                    'total' => 'Total',
                    'pickup' => 'Pickup Order',
                    'delivery' => 'Home Delivery',
                    'dineIn' => 'Dine-in',
                    'qty2' => 'Qty',
                    'item' => 'Item',
                    'price' => 'Price',
                ]

            ];
        }
    }

    public static function plans(){
        return [
            'small' => ['id' =>'prod_OIP4IZZBx8m5mK', 'monthlyId'=>'price_1NVoGgIYxD8tIsOHrDMmGqy4', 'yearlyId'=>'price_1NVoGhIYxD8tIsOHQ3RjuaaZ', 'monthlyCost'=>29, 'yearlyCost'=> 299, 'name'=>'small', 'subAccounts'=> 1, 'categories'=> 3, 'products'=> 15, 'productOptions'=>1, 'storage'=>100, 'deliveryAccounts'=>2, 'websiteLangs' =>1, 'promocodes'=>1,'templates'=>1],
            'standard' => ['id' =>'prod_OIPX9hjzTOzh4D', 'monthlyId'=>'price_1NVoieIYxD8tIsOHVI61xEFV', 'yearlyId'=>'price_1NVoieIYxD8tIsOHpW6c29T9', 'monthlyCost'=>39, 'yearlyCost'=> 399, 'name'=>'standard', 'subAccounts'=> 4, 'categories'=> 6, 'products'=> 40, 'productOptions'=>4, 'storage'=>300, 'deliveryAccounts'=>5, 'websiteLangs' =>2, 'promocodes'=>3,'templates'=>2],
            'large' => ['id' =>'prod_OIPZFTbddjU1Rh', 'monthlyId'=>'price_1NVokBIYxD8tIsOHrpHzox0p', 'yearlyId'=>'price_1NVokBIYxD8tIsOHBmkjlma0', 'monthlyCost'=>69, 'yearlyCost'=> 699, 'name'=>'large', 'subAccounts'=> 6, 'categories'=> 8, 'products'=> 100, 'productOptions'=>8, 'storage'=>400, 'deliveryAccounts'=>10, 'websiteLangs' =>3, 'promocodes'=>5,'templates'=>3],
            'premium' => ['id' =>'prod_OIPa2clUfeg7KN', 'monthlyId'=>'price_1NVolUIYxD8tIsOHh0EA2OB4', 'yearlyId'=>'price_1NVolUIYxD8tIsOHDI6Hx2E8', 'monthlyCost'=>99, 'yearlyCost'=> 999, 'name'=>'premium', 'subAccounts'=> 10, 'categories'=> 15, 'products'=> 300, 'productOptions'=>10, 'storage'=>500, 'deliveryAccounts'=>20, 'websiteLangs' =>4, 'promocodes'=>10,'templates'=>5],

        ];
    }

    public static function archiveStatistice($orders,$reviews,$website_id,$day,$month,$year,$timeZone){

        $successful_orders = 0;$so_items_total = 0;$so_delivery = 0;$so_tax = 0;$so_service = 0;$so_total = 0;$so_guestOrders = 0;$so_userOrders = 0;
        $delivered_orders = 0;$do_items_total = 0;$do_delivery = 0;$do_tax = 0;$do_total = 0;$do_guestOrders = 0;$do_userOrders = 0;
        $pickedup_orders = 0;$po_items_total = 0;$po_tax = 0;$po_total = 0;$po_guestOrders = 0;$po_userOrders = 0;
        $canceled_orders = 0;$co_items_total = 0;$co_delivery = 0;$co_tax = 0;$co_service = 0;$co_total = 0;$co_guestOrders = 0;$co_userOrders = 0;
        $dinedin_orders = 0;$di_items_total = 0;$di_tax = 0;$di_service = 0;$di_total = 0;$di_guestOrders = 0;$di_userOrders = 0;
        $users = [];
        $products = [];
        $deliveries = [];
        foreach($orders as $order){
            if(!empty($order->order_items) && $order->status != 2){
                foreach($order->order_items as $item){
                    if(!isset($products[$item->productName])){
                        $o_product = product::where(['website_id' => $website_id,'name' => $item->productName])->with(['product_options'=> function($q){
                            $q->with('product_option_selections');
                        }])->first();
                        $products[$item->productName] = ['sum'=>0,'total'=>0,'options'=>[],'reviews'=>['rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0]];
                        if(!empty($o_product->product_options)){
                            foreach($o_product->product_options as $o_option){
                                $products[$item->productName]['options'][$o_option->name] = [];
                                if(!empty($o_option->product_option_selections)){
                                    foreach($o_option->product_option_selections as $o_selection){
                                        $products[$item->productName]['options'][$o_option->name][$o_selection->name] = 0;
                                    }
                                }
                            }
                        }
                    }
                    $thisItemTotal = $item->total;
                    if($order->discount > 0){
                        $thisItemTotal = $thisItemTotal - (($thisItemTotal * $order->discount)/100);
                    }
                    $products[$item->productName]['sum'] = $item->qty + $products[$item->productName]['sum'];
                    $products[$item->productName]['total'] = $thisItemTotal + $products[$item->productName]['total'];
                    if(!empty($item->order_item_option_selections)){
                        foreach($item->order_item_option_selections as $option){
                            if(!isset($products[$item->productName]['options'][$option['optionName']])){$products[$item->productName]['options'][$option['optionName']] = [];}
                            if(!isset($products[$item->productName]['options'][$option['optionName']][$option['selectionName']])){$products[$item->productName]['options'][$option['optionName']][$option['selectionName']] = 0;}
                            $products[$item->productName]['options'][$option['optionName']][$option['selectionName']] = $products[$item->productName]['options'][$option['optionName']][$option['selectionName']] + $item->qty;
                        }
                    }
                }
            }
            if($order->delivered_by == 1){
                if(!isset($deliveries[$order->deliveryName])){$deliveries[$order->deliveryName] = ['id'=>$order->delivery_id,'orders'=>0,'time'=>0,'avgPerOrder'=>0];}
                $deliveries[$order->deliveryName]['orders'] = $deliveries[$order->deliveryName]['orders'] + 1;
                $time = $order->delivered_at - $order->out_for_delivery_at;
                $deliveries[$order->deliveryName]['time'] = $deliveries[$order->deliveryName]['time'] + $time;
                $deliveries[$order->deliveryName]['avgPerOrder'] = $deliveries[$order->deliveryName]['time'] / $deliveries[$order->deliveryName]['orders'];
                // $time = date_diff(new DateTime($order->out_for_delivery_at),new DateTime($order->delivered_at));
                // $deliveries[$order->deliveryName]['time'] = $deliveries[$order->deliveryName]['time'] + ($time->y * 525948 ) + ($time->m * 43829 ) + ($time->d * 1440 ) + ($time->h * 60 ) + $time->i;
            }
            if(!isset($users[$order->user_id]) && $order->isGuest == false){
                $users[$order->user_id] = [
                    'userName' => $order->userName,
                    'so'=>0,'so_itemsTotal'=>0,'so_delivery'=>0,'so_tax'=>0,'so_service'=>0,'so_total'=>0,
                    'do'=>0,'do_itemsTotal'=>0,'do_delivery'=>0,'do_tax'=>0,'do_total'=>0,
                    'po'=>0,'po_itemsTotal'=>0,'po_tax'=>0,'po_total'=>0,
                    'di'=>0,'di_itemsTotal'=>0,'di_tax'=>0,'di_service'=>0,'di_total'=>0,
                    'co'=>0,'co_itemsTotal'=>0,'co_delivery'=>0,'co_tax'=>0,'co_service'=>0,'co_total'=>0,
                    'rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0,
                ];
            }
            if($order->status != 2){
                $successful_orders = $successful_orders + 1;$so_items_total = $so_items_total + $order->discount_itemsTotal;$so_delivery = $so_delivery + $order->deliveryCost;$so_tax = $so_tax + $order->tax;$so_service = $so_service + $order->service;$so_total = $so_total + $order->total;
                if($order->isGuest){$so_guestOrders = $so_guestOrders + 1;}else{
                    $so_userOrders = $so_userOrders + 1;
                    $users[$order->user_id]['so'] = $users[$order->user_id]['so'] + 1;
                    $users[$order->user_id]['so_itemsTotal'] = $users[$order->user_id]['so_itemsTotal'] + $order->discount_itemsTotal;
                    $users[$order->user_id]['so_delivery'] = $users[$order->user_id]['so_delivery'] + $order->deliveryCost;
                    $users[$order->user_id]['so_tax'] = $users[$order->user_id]['so_tax'] + $order->tax;
                    $users[$order->user_id]['so_service'] = $users[$order->user_id]['so_service'] + $order->service;
                    $users[$order->user_id]['so_total'] = $users[$order->user_id]['so_total'] + $order->total;
                }
            }
            if($order->status == 5){
                $delivered_orders = $delivered_orders + 1;$do_items_total = $do_items_total + $order->discount_itemsTotal;$do_delivery = $do_delivery + $order->deliveryCost;$do_tax = $do_tax + $order->tax;$do_total = $do_total + $order->total;
                if($order->isGuest){$do_guestOrders = $do_guestOrders + 1;}else{
                    $do_userOrders = $do_userOrders + 1;
                    $users[$order->user_id]['do'] = $users[$order->user_id]['do'] + 1;
                    $users[$order->user_id]['do_itemsTotal'] = $users[$order->user_id]['do_itemsTotal'] + $order->discount_itemsTotal;
                    $users[$order->user_id]['do_delivery'] = $users[$order->user_id]['do_delivery'] + $order->deliveryCost;
                    $users[$order->user_id]['do_tax'] = $users[$order->user_id]['do_tax'] + $order->tax;
                    $users[$order->user_id]['do_total'] = $users[$order->user_id]['do_total'] + $order->total;
                }
            }else if($order->status == 6){
                $pickedup_orders = $pickedup_orders + 1;$po_items_total = $po_items_total + $order->discount_itemsTotal;$po_tax = $po_tax + $order->tax;$po_total = $po_total + $order->total;
                if($order->isGuest){$po_guestOrders = $po_guestOrders + 1;}else{
                    $po_userOrders = $po_userOrders + 1;
                    $users[$order->user_id]['po'] = $users[$order->user_id]['po'] + 1;
                    $users[$order->user_id]['po_itemsTotal'] = $users[$order->user_id]['po_itemsTotal'] + $order->discount_itemsTotal;
                    $users[$order->user_id]['po_tax'] = $users[$order->user_id]['po_tax'] + $order->tax;
                    $users[$order->user_id]['po_total'] = $users[$order->user_id]['po_total'] + $order->total;
                }
            }else if($order->status == 2){
                $canceled_orders = $canceled_orders + 1;$co_items_total = $co_items_total + $order->discount_itemsTotal;$co_delivery = $co_delivery + $order->deliveryCost;$co_tax = $co_tax + $order->tax;$co_service = $co_service + $order->service;$co_total = $co_total + $order->total;
                if($order->isGuest){$co_guestOrders = $co_guestOrders + 1;}else{
                    $co_userOrders = $co_userOrders + 1;
                    $users[$order->user_id]['co'] = $users[$order->user_id]['co'] + 1;
                    $users[$order->user_id]['co_itemsTotal'] = $users[$order->user_id]['co_itemsTotal'] + $order->discount_itemsTotal;
                    $users[$order->user_id]['co_delivery'] = $users[$order->user_id]['co_delivery'] + $order->deliveryCost;
                    $users[$order->user_id]['co_tax'] = $users[$order->user_id]['co_tax'] + $order->tax;
                    $users[$order->user_id]['co_service'] = $users[$order->user_id]['co_service'] + $order->service;
                    $users[$order->user_id]['co_total'] = $users[$order->user_id]['co_total'] + $order->total;
                }
            }else if($order->status == 7){
                $dinedin_orders = $dinedin_orders + 1;$di_items_total = $di_items_total + $order->discount_itemsTotal;$di_tax = $di_tax + $order->tax;$di_service = $di_service + $order->service;$di_total = $di_total + $order->total;
                if($order->isGuest){$di_guestOrders = $di_guestOrders + 1;}else{
                    $di_userOrders = $di_userOrders + 1;
                    $users[$order->user_id]['di'] = $users[$order->user_id]['di'] + 1;
                    $users[$order->user_id]['di_itemsTotal'] = $users[$order->user_id]['di_itemsTotal'] + $order->discount_itemsTotal;
                    $users[$order->user_id]['di_tax'] = $users[$order->user_id]['di_tax'] + $order->tax;
                    $users[$order->user_id]['di_service'] = $users[$order->user_id]['di_service'] + $order->service;
                    $users[$order->user_id]['di_total'] = $users[$order->user_id]['di_total'] + $order->total;
                }
            }
        }
        foreach($reviews as $review){
            if($review->user_id != null){
                if(!isset($users[$review->user_id])){
                    $users[$review->user_id] = [
                        'userName' => $review->userName,
                        'so'=>0,'so_itemsTotal'=>0,'so_delivery'=>0,'so_tax'=>0,'so_service'=>0,'so_total'=>0,
                        'do'=>0,'do_itemsTotal'=>0,'do_delivery'=>0,'do_tax'=>0,'do_total'=>0,
                        'po'=>0,'po_itemsTotal'=>0,'po_tax'=>0,'po_total'=>0,
                        'di'=>0,'di_itemsTotal'=>0,'di_tax'=>0,'di_service'=>0,'di_total'=>0,
                        'co'=>0,'co_itemsTotal'=>0,'co_delivery'=>0,'co_tax'=>0,'co_service'=>0,'co_total'=>0,
                        'rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0,
                    ];
                }
                $users[$review->user_id]['rv'] = $users[$review->user_id]['rv'] + 1;
                if($review->rate == 1){
                    $users[$review->user_id]['rv1'] = $users[$review->user_id]['rv1'] + 1;
                }else if($review->rate == 2){
                    $users[$review->user_id]['rv2'] = $users[$review->user_id]['rv2'] + 1;
                }else if($review->rate == 3){
                    $users[$review->user_id]['rv3'] = $users[$review->user_id]['rv3'] + 1;
                }else if($review->rate == 4){
                    $users[$review->user_id]['rv4'] = $users[$review->user_id]['rv4'] + 1;
                }else if($review->rate == 5){
                    $users[$review->user_id]['rv5'] = $users[$review->user_id]['rv5'] + 1;
                }
            }
            if(!isset($products[$review->product_name])){$products[$review->product_name] = ['sum'=>0,'total'=>0,'options'=>[],'reviews'=>['rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0]];}
            $products[$review->product_name]['reviews']['rv'] = $products[$review->product_name]['reviews']['rv'] + 1;
            if($review->rate == 1){
                $products[$review->product_name]['reviews']['rv1'] = $products[$review->product_name]['reviews']['rv1'] + 1;
            }else if($review->rate == 2){
                $products[$review->product_name]['reviews']['rv2'] = $products[$review->product_name]['reviews']['rv2'] + 1;
            }else if($review->rate == 3){
                $products[$review->product_name]['reviews']['rv3'] = $products[$review->product_name]['reviews']['rv3'] + 1;
            }else if($review->rate == 4){
                $products[$review->product_name]['reviews']['rv4'] = $products[$review->product_name]['reviews']['rv4'] + 1;
            }else if($review->rate == 5){
                $products[$review->product_name]['reviews']['rv5'] = $products[$review->product_name]['reviews']['rv5'] + 1;
            }

        }
        $so = ['orders' => $successful_orders,'items_total' => $so_items_total,'delivery' => $so_delivery,'tax' => $so_tax,'service' => $so_service,'total' => $so_total,'guestOrders' => $so_guestOrders,'userOrders' =>$so_userOrders];
        $do = ['orders' => $delivered_orders,'items_total' => $do_items_total,'delivery' => $do_delivery,'tax' => $do_tax,'total' => $do_total,'guestOrders' => $do_guestOrders,'userOrders' =>$do_userOrders];
        $po = ['orders' => $pickedup_orders,'items_total' => $po_items_total,'tax' => $po_tax,'total' => $po_total,'guestOrders' => $po_guestOrders,'userOrders' =>$po_userOrders];
        $co = ['orders' => $canceled_orders,'items_total' => $co_items_total,'delivery' => $co_delivery,'tax' => $co_tax,'service' => $co_service,'total' => $co_total,'guestOrders' =>$co_guestOrders ,'userOrders' =>$co_userOrders];
        $di = ['orders' => $dinedin_orders,'items_total' => $di_items_total,'tax' => $di_tax,'service' => $di_service,'total' => $di_total,'guestOrders' => $di_guestOrders ,'userOrders' =>$di_userOrders];

        if(statistics_day::where(['website_id'=>$website_id,'day'=>$day,'month'=>$month,'year'=>$year])->count() == 0){
            if(!empty($products)){
                foreach($products as $key => $product){
                    product::where(['name'=>$key,'website_id'=>$website_id])->increment('ordered_sum',$product['sum']);
                    $thisProductReviews = product_review::where('product_name',$key)->select('rate')->get();
                    if($thisProductReviews->count() > 0){
                        $thisProductRateAvg =  $thisProductReviews->sum('rate') / $thisProductReviews->count();
                        product::where(['name'=>$key,'website_id'=>$website_id])->update(['rating'=>$thisProductRateAvg,'ratings_sum'=>$thisProductReviews->count()]);
                    }
                }
            }

            $createstatistics_day = statistics_day::create(['website_id' => $website_id,'day' => $day,'month' => $month,'year' => $year,'so' => $so,'co' => $co,'do' => $do,'po' => $po,'di' => $di,'users'=>$users,'products'=>$products,'deliveries'=>$deliveries]);
            $notification = notification::create([
                'website_id'=>$website_id,
                'code'=>'system.statistics_day.created',
                'seen' => false,
                'statistics_id'=>$createstatistics_day->_id,
                'day'=>$day,
                'month'=>$month,
                'year'=>$year
            ]);
            if($createstatistics_day){
                foodmenuFunctions::notification('system.statistics_day.created',null,[
                    'notification' => $notification
                ],$website_id);
            }
            $last10DaysStatistics = statistics_day::where(['website_id'=>$website_id])->where('created_at','>',new DateTime('-10 days',new DateTimeZone($timeZone)))->get();
            $trendingProducts = [];
            foreach($last10DaysStatistics as $thisDay){
                if(!empty($thisDay->products)){
                    foreach($thisDay->products as $key => $product){
                        if(!isset($trendingProducts[$key])){
                            $trendingProducts[$key] = 0;
                        }
                        $trendingProducts[$key] = $trendingProducts[$key] + $product['sum'];
                    }
                }
            }
            arsort($trendingProducts);
            $trendingProducts = array_slice($trendingProducts,0,10);
            website::where('id',$website_id)->update(['trendingProducts'=>$trendingProducts]);

        }

        for($h = 0; $h <= 23; $h++){
            $so = [];$do = [];$po = [];$co = [];$di = [];
            $successful_orders = 0;$so_items_total = 0;$so_delivery = 0;$so_tax = 0;$so_service = 0;$so_total = 0;$so_guestOrders = 0;$so_userOrders = 0;
            $delivered_orders = 0;$do_items_total = 0;$do_delivery = 0;$do_tax = 0;$do_total = 0;$do_guestOrders = 0;$do_userOrders = 0;
            $pickedup_orders = 0;$po_items_total = 0;$po_tax = 0;$po_total = 0;$po_guestOrders = 0;$po_userOrders = 0;
            $canceled_orders = 0;$co_items_total = 0;$co_delivery = 0;$co_tax = 0;$co_service = 0;$co_total = 0;$co_guestOrders = 0;$co_userOrders = 0;
            $dinedin_orders = 0;$di_items_total = 0;$di_tax = 0;$di_service = 0;$di_total = 0;$di_guestOrders = 0;$di_userOrders = 0;
            $users = [];
            $products = [];
            $deliveries = [];
            foreach($orders as $order){
                $placed_at = Carbon::parse($order->placed_at)->setTimezone($timeZone);
                if($placed_at->format('H') == $h){
                    if(!empty($order->order_items) && $order->status != 2){
                        foreach($order->order_items as $item){
                            if(!isset($products[$item->productName])){
                                $o_product = product::where(['website_id' => $website_id,'name' => $item->productName])->with(['product_options'=> function($q){
                                    $q->with('product_option_selections');
                                }])->first();
                                $products[$item->productName] = ['sum'=>0,'total'=>0,'options'=>[],'reviews'=>['rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0]];
                                if(!empty($o_product->product_options)){
                                    foreach($o_product->product_options as $o_option){
                                        $products[$item->productName]['options'][$o_option->name] = [];
                                        if(!empty($o_option->product_option_selections)){
                                            foreach($o_option->product_option_selections as $o_selection){
                                                $products[$item->productName]['options'][$o_option->name][$o_selection->name] = 0;
                                            }
                                        }
                                    }
                                }
                            }
                            $thisItemTotal = $item->total;
                            if($order->discount > 0){
                                $thisItemTotal = $thisItemTotal - (($thisItemTotal * $order->discount)/100);
                            }
                            $products[$item->productName]['sum'] = $item->qty + $products[$item->productName]['sum'];
                            $products[$item->productName]['total'] = $thisItemTotal + $products[$item->productName]['total'];
                            if(!empty($item->order_item_option_selections)){
                                foreach($item->order_item_option_selections as $option){
                                    if(!isset($products[$item->productName]['options'][$option['optionName']])){$products[$item->productName]['options'][$option['optionName']] = [];}
                                    if(!isset($products[$item->productName]['options'][$option['optionName']][$option['selectionName']])){$products[$item->productName]['options'][$option['optionName']][$option['selectionName']] = 0;}
                                    $products[$item->productName]['options'][$option['optionName']][$option['selectionName']] = $products[$item->productName]['options'][$option['optionName']][$option['selectionName']] + $item->qty;
                                }
                            }
                        }
                    }
                    if($order->delivered_by == 1){
                    if(!isset($deliveries[$order->deliveryName])){$deliveries[$order->deliveryName] = ['id'=>$order->delivery_id,'orders'=>0,'time'=>0,'avgPerOrder'=>0];}
                        $deliveries[$order->deliveryName]['orders'] = $deliveries[$order->deliveryName]['orders'] + 1;
                        $time = $order->delivered_at - $order->out_for_delivery_at;
                        $deliveries[$order->deliveryName]['time'] = $deliveries[$order->deliveryName]['time'] + $time;
                        $deliveries[$order->deliveryName]['avgPerOrder'] = $deliveries[$order->deliveryName]['time'] / $deliveries[$order->deliveryName]['orders'];
                        // $time = date_diff(new DateTime($order->out_for_delivery_at),new DateTime($order->delivered_at));
                        // $deliveries[$order->deliveryName]['time'] = $deliveries[$order->deliveryName]['time'] + ($time->y * 525948 ) + ($time->m * 43829 ) + ($time->d * 1440 )+ ($time->h * 60 ) + $time->i;
                    }
                    if(!isset($users[$order->user_id]) && $order->isGuest == false){
                        $users[$order->user_id] = [
                            'userName' => $order->userName,
                            'so'=>0,'so_itemsTotal'=>0,'so_delivery'=>0,'so_tax'=>0,'so_service'=>0,'so_total'=>0,
                            'do'=>0,'do_itemsTotal'=>0,'do_delivery'=>0,'do_tax'=>0,'do_total'=>0,
                            'po'=>0,'po_itemsTotal'=>0,'po_tax'=>0,'po_total'=>0,
                            'di'=>0,'di_itemsTotal'=>0,'di_tax'=>0,'di_service'=>0,'di_total'=>0,
                            'co'=>0,'co_itemsTotal'=>0,'co_delivery'=>0,'co_tax'=>0,'co_service'=>0,'co_total'=>0,
                            'rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0,
                        ];
                    }
                    if($order->status != 2){
                        $successful_orders = $successful_orders + 1;$so_items_total = $so_items_total + $order->discount_itemsTotal;$so_delivery = $so_delivery + $order->deliveryCost;$so_tax = $so_tax + $order->tax;$so_service = $so_service + $order->service;$so_total = $so_total + $order->total;
                        if($order->isGuest){$so_guestOrders = $so_guestOrders + 1;}else{
                            $so_userOrders = $so_userOrders + 1;
                            $users[$order->user_id]['so'] = $users[$order->user_id]['so'] + 1;
                            $users[$order->user_id]['so_itemsTotal'] = $users[$order->user_id]['so_itemsTotal'] + $order->discount_itemsTotal;
                            $users[$order->user_id]['so_delivery'] = $users[$order->user_id]['so_delivery'] + $order->deliveryCost;
                            $users[$order->user_id]['so_tax'] = $users[$order->user_id]['so_tax'] + $order->tax;
                            $users[$order->user_id]['so_service'] = $users[$order->user_id]['so_service'] + $order->service;
                            $users[$order->user_id]['so_total'] = $users[$order->user_id]['so_total'] + $order->total;
                        }
                    }
                    if($order->status == 5){
                        $delivered_orders = $delivered_orders + 1;$do_items_total = $do_items_total + $order->discount_itemsTotal;$do_delivery = $do_delivery + $order->deliveryCost;$do_tax = $do_tax + $order->tax;$do_total = $do_total + $order->total;
                        if($order->isGuest){$do_guestOrders = $do_guestOrders + 1;}else{
                            $do_userOrders = $do_userOrders + 1;
                            $users[$order->user_id]['do'] = $users[$order->user_id]['do'] + 1;
                            $users[$order->user_id]['do_itemsTotal'] = $users[$order->user_id]['do_itemsTotal'] + $order->discount_itemsTotal;
                            $users[$order->user_id]['do_delivery'] = $users[$order->user_id]['do_delivery'] + $order->deliveryCost;
                            $users[$order->user_id]['do_tax'] = $users[$order->user_id]['do_tax'] + $order->tax;
                            $users[$order->user_id]['do_total'] = $users[$order->user_id]['do_total'] + $order->total;
                        }
                    }else if($order->status == 6){
                        $pickedup_orders = $pickedup_orders + 1;$po_items_total = $po_items_total + $order->discount_itemsTotal;$po_tax = $po_tax + $order->tax;$po_total = $po_total + $order->total;
                        if($order->isGuest){$po_guestOrders = $po_guestOrders + 1;}else{
                            $po_userOrders = $po_userOrders + 1;
                            $users[$order->user_id]['po'] = $users[$order->user_id]['po'] + 1;
                            $users[$order->user_id]['po_itemsTotal'] = $users[$order->user_id]['po_itemsTotal'] + $order->discount_itemsTotal;
                            $users[$order->user_id]['po_tax'] = $users[$order->user_id]['po_tax'] + $order->tax;
                            $users[$order->user_id]['po_total'] = $users[$order->user_id]['po_total'] + $order->total;
                        }
                    }else if($order->status == 2){
                        $canceled_orders = $canceled_orders + 1;$co_items_total = $co_items_total + $order->discount_itemsTotal;$co_delivery = $co_delivery + $order->deliveryCost;$co_tax = $co_tax + $order->tax;$co_service = $co_service + $order->service;$co_total = $co_total + $order->total;
                        if($order->isGuest){$co_guestOrders = $co_guestOrders + 1;}else{
                            $co_userOrders = $co_userOrders + 1;
                            $users[$order->user_id]['co'] = $users[$order->user_id]['co'] + 1;
                            $users[$order->user_id]['co_itemsTotal'] = $users[$order->user_id]['co_itemsTotal'] + $order->discount_itemsTotal;
                            $users[$order->user_id]['co_delivery'] = $users[$order->user_id]['co_delivery'] + $order->deliveryCost;
                            $users[$order->user_id]['co_tax'] = $users[$order->user_id]['co_tax'] + $order->tax;
                            $users[$order->user_id]['co_service'] = $users[$order->user_id]['co_service'] + $order->service;
                            $users[$order->user_id]['co_total'] = $users[$order->user_id]['co_total'] + $order->total;
                        }
                    }else if($order->status == 7){
                        $dinedin_orders = $dinedin_orders + 1;$di_items_total = $di_items_total + $order->discount_itemsTotal;$di_tax = $di_tax + $order->tax;$di_service = $di_service + $order->service;$di_total = $di_total + $order->total;
                        if($order->isGuest){$di_guestOrders = $di_guestOrders + 1;}else{
                            $di_userOrders = $di_userOrders + 1;
                            $users[$order->user_id]['di'] = $users[$order->user_id]['di'] + 1;
                            $users[$order->user_id]['di_itemsTotal'] = $users[$order->user_id]['di_itemsTotal'] + $order->discount_itemsTotal;
                            $users[$order->user_id]['di_tax'] = $users[$order->user_id]['di_tax'] + $order->tax;
                            $users[$order->user_id]['di_service'] = $users[$order->user_id]['di_service'] + $order->service;
                            $users[$order->user_id]['di_total'] = $users[$order->user_id]['di_total'] + $order->total;
                        }
                    }
                }
            }
            foreach($reviews as $review){
                $posted_at = Carbon::parse($review->posted_at)->setTimezone($timeZone);
                if($posted_at->format('H') == $h){
                    if($review->user_id != null){
                        if(!isset($users[$review->user_id])){
                            $users[$review->user_id] = [
                                'userName' => $review->userName,
                                'so'=>0,'so_itemsTotal'=>0,'so_delivery'=>0,'so_tax'=>0,'so_service'=>0,'so_total'=>0,
                                'do'=>0,'do_itemsTotal'=>0,'do_delivery'=>0,'do_tax'=>0,'do_total'=>0,
                                'po'=>0,'po_itemsTotal'=>0,'po_tax'=>0,'po_total'=>0,
                                'di'=>0,'di_itemsTotal'=>0,'di_tax'=>0,'di_service'=>0,'di_total'=>0,
                                'co'=>0,'co_itemsTotal'=>0,'co_delivery'=>0,'co_tax'=>0,'co_service'=>0,'co_total'=>0,
                                'rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0,
                            ];
                        }
                        $users[$review->user_id]['rv'] = $users[$review->user_id]['rv'] + 1;
                        if($review->rate == 1){
                            $users[$review->user_id]['rv1'] = $users[$review->user_id]['rv1'] + 1;
                        }else if($review->rate == 2){
                            $users[$review->user_id]['rv2'] = $users[$review->user_id]['rv2'] + 1;
                        }else if($review->rate == 3){
                            $users[$review->user_id]['rv3'] = $users[$review->user_id]['rv3'] + 1;
                        }else if($review->rate == 4){
                            $users[$review->user_id]['rv4'] = $users[$review->user_id]['rv4'] + 1;
                        }else if($review->rate == 5){
                            $users[$review->user_id]['rv5'] = $users[$review->user_id]['rv5'] + 1;
                        }
                    }
                    if(!isset($products[$review->product_name])){$products[$review->product_name] = ['sum'=>0,'total'=>0,'options'=>[],'reviews'=>['rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0]];}
                    $products[$review->product_name]['reviews']['rv'] = $products[$review->product_name]['reviews']['rv'] + 1;
                    if($review->rate == 1){
                        $products[$review->product_name]['reviews']['rv1'] = $products[$review->product_name]['reviews']['rv1'] + 1;
                    }else if($review->rate == 2){
                        $products[$review->product_name]['reviews']['rv2'] = $products[$review->product_name]['reviews']['rv2'] + 1;
                    }else if($review->rate == 3){
                        $products[$review->product_name]['reviews']['rv3'] = $products[$review->product_name]['reviews']['rv3'] + 1;
                    }else if($review->rate == 4){
                        $products[$review->product_name]['reviews']['rv4'] = $products[$review->product_name]['reviews']['rv4'] + 1;
                    }else if($review->rate == 5){
                        $products[$review->product_name]['reviews']['rv5'] = $products[$review->product_name]['reviews']['rv5'] + 1;
                    }
                }
            }
            $so = ['orders' => $successful_orders,'items_total' => $so_items_total,'delivery' => $so_delivery,'tax' => $so_tax,'service' => $so_service,'total' => $so_total,'guestOrders' => $so_guestOrders,'userOrders' =>$so_userOrders];
            $do = ['orders' => $delivered_orders,'items_total' => $do_items_total,'delivery' => $do_delivery,'tax' => $do_tax,'total' => $do_total,'guestOrders' => $do_guestOrders,'userOrders' =>$do_userOrders];
            $po = ['orders' => $pickedup_orders,'items_total' => $po_items_total,'tax' => $po_tax,'total' => $po_total,'guestOrders' => $po_guestOrders,'userOrders' =>$po_userOrders];
            $co = ['orders' => $canceled_orders,'items_total' => $co_items_total,'delivery' => $co_delivery,'tax' => $co_tax,'service' => $co_service,'total' => $co_total,'guestOrders' =>$co_guestOrders ,'userOrders' =>$co_userOrders];
            $di = ['orders' => $dinedin_orders,'items_total' => $di_items_total,'tax' => $di_tax,'service' => $di_service,'total' => $di_total,'guestOrders' => $di_guestOrders ,'userOrders' =>$di_userOrders];
            if(statistics_hour::where(['website_id'=>$website_id,'hour'=>$h,'day'=>$day,'month'=>$month,'year'=>$year])->count() == 0){

                statistics_hour::create(['website_id' => $website_id,'hour'=>$h, 'day' => $day,'month' => $month,'year' => $year,'so' => $so,'co' => $co,'do' => $do,'po' => $po,'di' => $di,'users'=>$users,'products'=>$products,'deliveries'=>$deliveries]);
            }
        }

        if(Carbon::createFromFormat('Y-m',$year.'-'.$month)->endOfMonth()->format('j') == $day && statistics_day::where(['website_id'=>$website_id,$year=>'year','month'=> $month])->count() == 0 ){

            // $thisMonthStatisticsCount = statistics_day::where(['website_id' => $website_id ,'year'=>$year, 'month'=> $month])->count();

            // if($thisMonthStatisticsCount < Carbon::createFromFormat('Y-m-d',$year.'-'.($month+1).'-0')->day){
            //     $daysToCreateNum = (Carbon::createFromFormat('Y-m-d',$year.'-'.($month+1).'-0')->day) - $thisMonthStatisticsCount;
            //     $daysToCreate = [];
            //     for($d=1;$d<=$daysToCreateNum;$d++){
            //         array_push($daysToCreate,[
            //             'website_id'=>$website_id,
            //             'day' => (int)$d,
            //             'month' => (int)$month,
            //             'year' => (int)$year,
            //             'so' => ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' =>0,'userOrders' =>0],
            //             'do' => ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'total' => 0,'guestOrders' => 0,'userOrders' =>0],
            //             'po' => ['orders' => 0,'items_total' => 0,'tax' => 0,'total' => 0,'guestOrders' => 0,'userOrders' =>0],
            //             'co' => ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' =>0 ,'userOrders' =>0],
            //             'di' => ['orders' => 0,'items_total' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' => 0 ,'userOrders' =>0],
            //             'users' => [],
            //             'products' => [],
            //             'deliveries' => [],
            //         ]);
            //     }
            //     statistics_day::insert($daysToCreate);
            // }
            $thisMonthStatistics = statistics_day::where(['website_id' => $website_id ,'year'=>$year, 'month'=> $month])->get();
            $so = ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' =>0,'userOrders' =>0];
            $do = ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'total' => 0,'guestOrders' => 0,'userOrders' =>0];
            $po = ['orders' => 0,'items_total' => 0,'tax' => 0,'total' => 0,'guestOrders' => 0,'userOrders' =>0];
            $co = ['orders' => 0,'items_total' => 0,'delivery' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' =>0 ,'userOrders' =>0];
            $di = ['orders' => 0,'items_total' => 0,'tax' => 0,'service' => 0,'total' => 0,'guestOrders' => 0 ,'userOrders' =>0];
            $users = [];
            $products = [];
            $deliveries = [];
            foreach($thisMonthStatistics as $thisDay){
                $so['orders'] = $so['orders'] + $thisDay->so['orders'];
                $so['items_total'] = $so['items_total'] + $thisDay->so['items_total'];
                $so['delivery'] = $so['delivery'] + $thisDay->so['delivery'];
                $so['tax'] = $so['tax'] + $thisDay->so['tax'];
                $so['service'] = $so['service'] + $thisDay->so['service'];
                $so['total'] = $so['total'] + $thisDay->so['total'];
                $so['guestOrders'] = $so['guestOrders'] + $thisDay->so['guestOrders'];
                $so['userOrders'] = $so['userOrders'] + $thisDay->so['userOrders'];

                $do['orders'] = $do['orders'] + $thisDay->do['orders'];
                $do['items_total'] = $do['items_total'] + $thisDay->do['items_total'];
                $do['delivery'] = $do['delivery'] + $thisDay->do['delivery'];
                $do['tax'] = $do['tax'] + $thisDay->do['tax'];
                $do['total'] = $do['total'] + $thisDay->do['total'];
                $do['guestOrders'] = $do['guestOrders'] + $thisDay->do['guestOrders'];
                $do['userOrders'] = $do['userOrders'] + $thisDay->do['userOrders'];

                $po['orders'] = $po['orders'] + $thisDay->po['orders'];
                $po['items_total'] = $po['items_total'] + $thisDay->po['items_total'];
                $po['tax'] = $po['tax'] + $thisDay->po['tax'];
                $po['total'] = $po['total'] + $thisDay->po['total'];
                $po['guestOrders'] = $po['guestOrders'] + $thisDay->po['guestOrders'];
                $po['userOrders'] = $po['userOrders'] + $thisDay->po['userOrders'];

                $co['orders'] = $co['orders'] + $thisDay->co['orders'];
                $co['items_total'] = $co['items_total'] + $thisDay->co['items_total'];
                $co['delivery'] = $co['delivery'] + $thisDay->co['delivery'];
                $co['tax'] = $co['tax'] + $thisDay->co['tax'];
                $co['service'] = $co['service'] + $thisDay->co['service'];
                $co['total'] = $co['total'] + $thisDay->co['total'];
                $co['guestOrders'] = $co['guestOrders'] + $thisDay->co['guestOrders'];
                $co['userOrders'] = $co['userOrders'] + $thisDay->co['userOrders'];

                $di['orders'] = $di['orders'] + $thisDay->di['orders'];
                $di['items_total'] = $di['items_total'] + $thisDay->di['items_total'];
                $di['tax'] = $di['tax'] + $thisDay->di['tax'];
                $di['service'] = $di['service'] + $thisDay->di['service'];
                $di['total'] = $di['total'] + $thisDay->di['total'];
                $di['guestOrders'] = $di['guestOrders'] + $thisDay->di['guestOrders'];
                $di['userOrders'] = $di['userOrders'] + $thisDay->di['userOrders'];
                if(!empty($thisDay->users)){
                    foreach($thisDay->users as $key => $user){
                        if(!isset($users[$key])){
                            $users[$key] = [
                                'userName' => $user['userName'],
                                'so'=>0,'so_itemsTotal'=>0,'so_delivery'=>0,'so_tax'=>0,'so_service'=>0,'so_total'=>0,
                                'do'=>0,'do_itemsTotal'=>0,'do_delivery'=>0,'do_tax'=>0,'do_total'=>0,
                                'po'=>0,'po_itemsTotal'=>0,'po_tax'=>0,'po_total'=>0,
                                'di'=>0,'di_itemsTotal'=>0,'di_tax'=>0,'di_service'=>0,'di_total'=>0,
                                'co'=>0,'co_itemsTotal'=>0,'co_delivery'=>0,'co_tax'=>0,'co_service'=>0,'co_total'=>0,
                                'rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0,
                            ];
                        }
                        $users[$key]['so'] = $users[$key]['so'] + $user['so'];
                        $users[$key]['so_itemsTotal'] = $users[$key]['so_itemsTotal'] + $user['so_itemsTotal'];
                        $users[$key]['so_delivery'] = $users[$key]['so_delivery'] + $user['so_delivery'];
                        $users[$key]['so_tax'] = $users[$key]['so_tax'] + $user['so_tax'];
                        $users[$key]['so_service'] = $users[$key]['so_service'] + $user['so_service'];
                        $users[$key]['so_total'] = $users[$key]['so_total'] + $user['so_total'];

                        $users[$key]['do'] = $users[$key]['do'] + $user['do'];
                        $users[$key]['do_itemsTotal'] = $users[$key]['do_itemsTotal'] + $user['do_itemsTotal'];
                        $users[$key]['do_delivery'] = $users[$key]['do_delivery'] + $user['do_delivery'];
                        $users[$key]['do_tax'] = $users[$key]['do_tax'] + $user['do_tax'];
                        $users[$key]['do_total'] = $users[$key]['do_total'] + $user['do_total'];

                        $users[$key]['po'] = $users[$key]['po'] + $user['po'];
                        $users[$key]['po_itemsTotal'] = $users[$key]['po_itemsTotal'] + $user['po_itemsTotal'];
                        $users[$key]['po_tax'] = $users[$key]['po_tax'] + $user['po_tax'];
                        $users[$key]['po_total'] = $users[$key]['po_total'] + $user['po_total'];

                        $users[$key]['di'] = $users[$key]['di'] + $user['di'];
                        $users[$key]['di_itemsTotal'] = $users[$key]['di_itemsTotal'] + $user['di_itemsTotal'];
                        $users[$key]['di_tax'] = $users[$key]['di_tax'] + $user['di_tax'];
                        $users[$key]['di_service'] = $users[$key]['di_service'] + $user['di_service'];
                        $users[$key]['di_total'] = $users[$key]['di_total'] + $user['di_total'];

                        $users[$key]['co'] = $users[$key]['co'] + $user['co'];
                        $users[$key]['co_itemsTotal'] = $users[$key]['co_itemsTotal'] + $user['co_itemsTotal'];
                        $users[$key]['co_delivery'] = $users[$key]['co_delivery'] + $user['co_delivery'];
                        $users[$key]['co_tax'] = $users[$key]['co_tax'] + $user['co_tax'];
                        $users[$key]['co_service'] = $users[$key]['co_service'] + $user['co_service'];
                        $users[$key]['co_total'] = $users[$key]['co_total'] + $user['co_total'];

                        $users[$key]['rv'] = $users[$key]['rv'] + $user['rv'];
                        $users[$key]['rv1'] = $users[$key]['rv1'] + $user['rv1'];
                        $users[$key]['rv2'] = $users[$key]['rv2'] + $user['rv2'];
                        $users[$key]['rv3'] = $users[$key]['rv3'] + $user['rv3'];
                        $users[$key]['rv4'] = $users[$key]['rv4'] + $user['rv4'];
                        $users[$key]['rv5'] = $users[$key]['rv5'] + $user['rv5'];
                    }
                }
                if(!empty($thisDay->products)){
                    foreach($thisDay->products as $key => $product){
                        if(!isset($products[$key])){$products[$key] = ['sum'=>0,'total'=>0,'options'=>[],'reviews'=>['rv'=>0,'rv1'=>0,'rv2'=>0,'rv3'=>0,'rv4'=>0,'rv5'=>0]];}
                        $products[$key]['sum'] = $products[$key]['sum'] + $product['sum'];
                        $products[$key]['total'] = $products[$key]['total'] + $product['total'];
                        $products[$key]['reviews']['rv'] = $products[$key]['reviews']['rv'] + $product['reviews']['rv'];
                        $products[$key]['reviews']['rv1'] = $products[$key]['reviews']['rv1'] + $product['reviews']['rv1'];
                        $products[$key]['reviews']['rv2'] = $products[$key]['reviews']['rv2'] + $product['reviews']['rv2'];
                        $products[$key]['reviews']['rv3'] = $products[$key]['reviews']['rv3'] + $product['reviews']['rv3'];
                        $products[$key]['reviews']['rv4'] = $products[$key]['reviews']['rv4'] + $product['reviews']['rv4'];
                        $products[$key]['reviews']['rv5'] = $products[$key]['reviews']['rv5'] + $product['reviews']['rv5'];
                        if(!empty($product['options'])){
                            foreach($product['options'] as $option => $selections){
                                if(!isset($products[$key]['options'][$option])){$products[$key]['options'][$option] = [];}
                                if(!empty($selections)){
                                    foreach($selections as $selection => $selectionVal){
                                        if(!isset($products[$key]['options'][$option][$selection])){$products[$key]['options'][$option][$selection] = 0;}
                                        $products[$key]['options'][$option][$selection] = $products[$key]['options'][$option][$selection] + $selectionVal;
                                    }
                                }
                            }
                        }
                    }
                }
                if(!empty($thisDay->deliveries)){
                    foreach($thisDay->deliveries as $key => $delivery){
                        if(!isset($deliveries[$key])){
                            $deliveries[$key] = ['id'=>$delivery['id'],'orders'=>0,'time'=>0,'avgPerOrder'=>0];
                        }
                        $deliveries[$key]['orders'] = $deliveries[$key]['orders'] + $delivery['orders'];
                        $deliveries[$key]['time'] = $deliveries[$key]['time'] + $delivery['time'];
                        $deliveries[$key]['avgPerOrder'] = $deliveries[$key]['time'] / $deliveries[$key]['orders'];
                    }
                }

            }
            if(statistics_month::where(['website_id'=>$website_id,'month'=>$month,'year'=>$year])->count() == 0){
                $createThisMonthStatistics = statistics_month::create(['website_id' => $website_id,'month' => $month,'year' => $year,'so' => $so,'co' => $co,'do' => $do,'po' => $po,'di' => $di,'users'=>$users,'products'=>$products,'deliveries'=>$deliveries]);
                $thisMonthExpenses__ = website::where('id',$website_id)->select(['month_expenses','expenses'])->first();
                $thisMonthExpenses = $thisMonthExpenses__->expenses;
                $thisMonthExpenses_fixed = $thisMonthExpenses__->month_expenses;

                $thisFinancialReport = financial_reports::create([
                    'website_id' => $website_id,
                    'expenses' => $thisMonthExpenses_fixed,
                    'month_expenses' => $thisMonthExpenses,
                    'total' => $createThisMonthStatistics->so['total'],
                    'tax' => $createThisMonthStatistics->so['tax'],
                    'service' => $createThisMonthStatistics->so['service'],
                    'items_total' => $createThisMonthStatistics->so['items_total'],
                    'delivery' => $createThisMonthStatistics->so['delivery'],
                    'month'=>$month,
                    'year' =>$year,
                ]);
                $notification = notification::create([
                    'code' => 'system.financial_report',
                    'seen' => false,
                    'month' => $month,
                    'year' => $year,
                    'created_at' => $thisFinancialReport->created_at,
                    'financialReport_id' => $thisFinancialReport->id,
                    'website_id'=> $website_id,
                ]);
                //send monthly report email

                self::notification('system.financial_report',null,[
                    'notification' => $notification,
                ],$website_id);
                website::where('id',$website_id)->update(['month_expenses' => []]);

            }
        }
    }

    public static function checkOrderTimesAvailability($times, $now, $yesterday){
        $nowTime = $now->format('G').'.'.$now->format('i');
        $nowTime = (double)$nowTime;
        $today = strtolower($now->format('l'));
        $yesterday = strtolower($yesterday->format('l'));

        if($times[$today]['working24'] == true){return true;}

        $todayFrom = (double)$times[$today]['from'];
        $todayTo = (double)$times[$today]['to'];

        $yesterdayFrom = (double)$times[$yesterday]['from'];
        $yesterdayTo = (double)$times[$yesterday]['to'];

        $todayStat = $times[$today]['working'];
        $yesterdayStat =$times[$yesterday]['working'];

        if($todayStat && $todayFrom < $todayTo){
            if($nowTime >= $todayFrom && $nowTime <= $todayTo){
                return true;
            }
        }else if($todayStat && $todayFrom > $todayTo){
            if($nowTime >= $todayFrom){
                return true;
            }
        }
        if($yesterdayStat && $yesterdayFrom > $yesterdayTo){
            if($nowTime <= $yesterdayTo){
                return true;
            }
        }
        return false;
    }

    public static function getDiscount($times, $now, $yesterday){
        $nowTime = $now->format('G').'.'.$now->format('i');
        $nowTime = (double)$nowTime;
        $today = strtolower($now->format('l'));
        $yesterday = strtolower($yesterday->format('l'));

        $todayDiscount = (double)$times[$today]['discount'];
        $yesterdayDiscount = (double)$times[$yesterday]['discount'];

        $todayFrom = (double)$times[$today]['Dfrom'];
        $todayTo = (double)$times[$today]['Dto'];

        $yesterdayFrom = (double)$times[$yesterday]['Dfrom'];
        $yesterdayTo = (double)$times[$yesterday]['Dto'];

        if($todayDiscount > 0 && $todayFrom < $todayTo){
            if($nowTime >= $todayFrom && $nowTime <= $todayTo){
                return $todayDiscount;
            }
        }else if($todayDiscount > 0 && $todayFrom > $todayTo){
            if($nowTime >= $todayFrom){
                return $todayDiscount;
            }
        }

        if($yesterdayDiscount > 0 && $yesterdayFrom > $yesterdayTo){
            if($nowTime <= $yesterdayTo){
                return $yesterdayDiscount;
            }
        }
        return 0;
    }

    public static function checkOrderId($website_id,$order_id){
        $order = order::where(['website_id'=>(int)$website_id,'id'=>$order_id])->orderBy('placed_at','DESC')->first();
        while(order::where(['website_id'=>(int)$website_id,'id'=>$order->id])->count() > 1){
            $order->update(['id' => order::where('website_id',(int)$website_id )->max('id') + 1]);
        }
        return $order;
    }

    public static function notification($code,$activity,$notification,$websiteId=null){
        try{
            if(Auth::guard('account')->check()){
                $website_id = Auth::guard('account')->user()->website_id;
            }else if(Auth::guard('user')->check()){
                $website_id = Auth::guard('user')->user()->website_id;
            }else if(Auth::guard('guest')->check()){
                $website_id = Auth::guard('guest')->user()->website_id;
            }else{
                $website_id = $websiteId;
            }
            $cpanel = new stdClass();
            $cpanel->website_id = $website_id;
            $cpanel->code = $code;
            $cpanel->notification = $notification;
            if($activity != null){
                $cpanel->activity = activityLog::create($activity);
            }
            if($code != null){
                broadcast(new cpanelChannel($cpanel))->toOthers();
            }
        }catch(\Exception $e){}
    }
    public static function notification_website($code,$website_id,$user_type,$user_id,$notification){
        try{
            $website = new stdClass();
            $website->code = $code;
            $website->website_id = $website_id;
            $website->user_type = $user_type;
            $website->user_id = $user_id;
            $website->notification = $notification;
            broadcast(new websiteChannel($website))->toOthers();
        }catch(\Exeption $e){}
    }
}

// foodmenuFunctions::notification('settings.',[

// ],[

// ]);
