<?php

namespace Database\Seeders;

use App\Models\help_en_tut;
use Database\Seeders\help_en_tuts\basics\tut17;
use Database\Seeders\help_en_tuts\basics\tut18;
use Database\Seeders\help_en_tuts\basics\tut19;
// use Database\Seeders\help_en_tuts\basics\tut20;
use Database\Seeders\help_en_tuts\basics\tut21;
use Database\Seeders\help_en_tuts\basics\tut22;
use Database\Seeders\help_en_tuts\basics\tut23;
use Database\Seeders\help_en_tuts\basics\tut24;
use Database\Seeders\help_en_tuts\basics\tut25;
use Database\Seeders\help_en_tuts\basics\tut26;
use Database\Seeders\help_en_tuts\basics\tut27;
use Database\Seeders\help_en_tuts\basics\tut28;
use Database\Seeders\help_en_tuts\basics\tut29;
use Database\Seeders\help_en_tuts\basics\tut46;

use Database\Seeders\help_en_tuts\statistics\tut62;
use Database\Seeders\help_en_tuts\statistics\tut63;
use Database\Seeders\help_en_tuts\statistics\tut64;
use Database\Seeders\help_en_tuts\statistics\tut65;
use Database\Seeders\help_en_tuts\statistics\tut66;
use Database\Seeders\help_en_tuts\statistics\tut67;
use Database\Seeders\help_en_tuts\statistics\tut68;
use Database\Seeders\help_en_tuts\statistics\tut69;
use Database\Seeders\help_en_tuts\statistics\tut70;

use Database\Seeders\help_en_tuts\orders\tut40;
use Database\Seeders\help_en_tuts\orders\tut56;
use Database\Seeders\help_en_tuts\orders\tut57;
use Database\Seeders\help_en_tuts\orders\tut58;
use Database\Seeders\help_en_tuts\orders\tut59;
use Database\Seeders\help_en_tuts\orders\tut60;
use Database\Seeders\help_en_tuts\orders\tut61;

use Database\Seeders\help_en_tuts\productsCategories\tut30;
use Database\Seeders\help_en_tuts\productsCategories\tut31;
use Database\Seeders\help_en_tuts\productsCategories\tut32;
use Database\Seeders\help_en_tuts\productsCategories\tut33;
use Database\Seeders\help_en_tuts\productsCategories\tut34;
use Database\Seeders\help_en_tuts\productsCategories\tut35;
use Database\Seeders\help_en_tuts\productsCategories\tut36;
use Database\Seeders\help_en_tuts\productsCategories\tut38;
use Database\Seeders\help_en_tuts\productsCategories\tut39;

use Database\Seeders\help_en_tuts\users\tut41;
use Database\Seeders\help_en_tuts\users\tut42;
use Database\Seeders\help_en_tuts\users\tut43;
use Database\Seeders\help_en_tuts\users\tut44;
use Database\Seeders\help_en_tuts\users\tut45;

use Database\Seeders\help_en_tuts\design\tut47;
use Database\Seeders\help_en_tuts\design\tut48;
use Database\Seeders\help_en_tuts\design\tut49;
use Database\Seeders\help_en_tuts\design\tut50;
use Database\Seeders\help_en_tuts\design\tut51;
use Database\Seeders\help_en_tuts\design\tut52;
use Database\Seeders\help_en_tuts\design\tut53;
use Database\Seeders\help_en_tuts\design\tut54;
use Database\Seeders\help_en_tuts\design\tut55;

use Database\Seeders\help_en_tuts\settings\tut1;
use Database\Seeders\help_en_tuts\settings\tut2;
use Database\Seeders\help_en_tuts\settings\tut3;
// use Database\Seeders\help_en_tuts\settings\tut4;
use Database\Seeders\help_en_tuts\settings\tut5;
use Database\Seeders\help_en_tuts\settings\tut6;
use Database\Seeders\help_en_tuts\settings\tut7;
use Database\Seeders\help_en_tuts\settings\tut8;
use Database\Seeders\help_en_tuts\settings\tut9;
use Database\Seeders\help_en_tuts\settings\tut10;
use Database\Seeders\help_en_tuts\settings\tut11;
use Database\Seeders\help_en_tuts\settings\tut12;
use Database\Seeders\help_en_tuts\settings\tut13;
use Database\Seeders\help_en_tuts\settings\tut14;
use Database\Seeders\help_en_tuts\settings\tut15;
use Database\Seeders\help_en_tuts\settings\tut16;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class help_en_tuts extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    //
    //keywords => ['website','support','websiteLangs','customLang,'receipt'.'langTexts','cpanel','deliveryMan','alert,'guidemode','system','timeZone','country','cart','liveChat','orders','reviews','orderPickup','homeDelivery','dinein','restaurant','websiteDesign','workingTimes','discount','products','categories','promocode','placeOrder','users'];

    // <div class=\"tipContainer\">
    // <div class=\"ico-lamp tutTipIcon\"></div>
    // <div class=\"tutTipText\">text here.</div>
    // </div>
    // <img alt=\"\" src=\"/storage/imgs/help/helpTickets/1.PNG\" class=\"sectionImg-50\"/>

    //0 => get-started
    //1 => basics
    //2 => security
    //3 => orders
    //4 => statistics
    //5 => Billing
    //6 => products-categories
    //8 => users
    //9 => design
    //10 => settings
    public function run()
    {
        //////basics
        $this->call([tut17::class]);
        $this->call([tut18::class]);
        $this->call([tut19::class]);
        // $this->call([tut20::class]); => canceled
        $this->call([tut21::class]);
        $this->call([tut22::class]);
        $this->call([tut23::class]);
        $this->call([tut24::class]);
        $this->call([tut25::class]);
        $this->call([tut26::class]);
        $this->call([tut27::class]);
        $this->call([tut28::class]);
        $this->call([tut29::class]);
        $this->call([tut46::class]);
        ////////statistics
        $this->call([tut62::class]);
        $this->call([tut63::class]);
        $this->call([tut64::class]);
        $this->call([tut65::class]);
        $this->call([tut66::class]);
        $this->call([tut67::class]);
        $this->call([tut68::class]);
        $this->call([tut69::class]);
        $this->call([tut70::class]);
        /////////orders
        $this->call([tut40::class]);
        $this->call([tut56::class]);
        $this->call([tut57::class]);
        $this->call([tut58::class]);
        $this->call([tut59::class]);
        $this->call([tut60::class]);
        $this->call([tut61::class]);
        //////productsCategories
        $this->call([tut30::class]);
        $this->call([tut31::class]);
        $this->call([tut32::class]);
        $this->call([tut33::class]);
        $this->call([tut34::class]);
        $this->call([tut35::class]);
        $this->call([tut36::class]);
        $this->call([tut38::class]);
        $this->call([tut39::class]);
        /////////users
        $this->call([tut41::class]);
        $this->call([tut42::class]);
        $this->call([tut43::class]);
        $this->call([tut44::class]);
        $this->call([tut45::class]);
        ////////design
        $this->call([tut47::class]);
        $this->call([tut48::class]);
        $this->call([tut49::class]);
        $this->call([tut50::class]);
        $this->call([tut51::class]);
        $this->call([tut52::class]);
        $this->call([tut53::class]);
        $this->call([tut54::class]);
        $this->call([tut55::class]);
        //////settings
        $this->call([tut1::class]);
        $this->call([tut2::class]);
        $this->call([tut3::class]);
        // $this->call([tut4::class]); => hidden until add another langs for the cpanel
        $this->call([tut5::class]);
        $this->call([tut6::class]);
        $this->call([tut7::class]);
        $this->call([tut8::class]);
        $this->call([tut9::class]);
        $this->call([tut10::class]);
        $this->call([tut11::class]);
        $this->call([tut12::class]);
        $this->call([tut13::class]);
        $this->call([tut14::class]);
        $this->call([tut15::class]);
        $this->call([tut16::class]);

    }
}



// array_push($tutsTexts,[
//     'sort'=> 0,
//     'help_en_tut_id' => 0,
//     'title' => '',
//     'html' => "<div class=\"SectionContainer\">

//     </div>
//     ",
// ]);


// <div class="tipContainer tipContainer_orange">
// <span class="ico-lamp"></span>
// <span class="tutTipText">Take into consideration that if you have the <b>Guide Mode</b> disabled, you won’t be able to enable the <b>Auto Help</b>.</span>
// </div>
