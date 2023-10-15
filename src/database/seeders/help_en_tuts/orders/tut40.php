<?php

namespace Database\Seeders\help_en_tuts\orders;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut40 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $upRates;
    protected $downRates;

    public function run()
    {
        $helpTut = help_en_tut::where('id',40)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',40)->delete();
        help_en_tut::where('id',40)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>40,
            'sort' => 1,
            'title_id' => 'How-to-create-a-promo-code',
            'title' => 'How to create a promo code',
            'description' => 'Promo codes are one of the most valuable tools for your restaurant business; they help increase sales and improve customer satisfaction. This article will assist you in learning how to create a promo code to be used on your website.',
            'icon' => 'ico-promo_codes',
            'helpCat' => 'ordering-system',
            'keyWords' => 'promocode.placeOrder',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);



        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 40,
            'title' => 'What are promo codes?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Promo codes, or promotional codes, are discount codes that you can offer your customers, so they can receive a specified discount on their purchases. It's a valuable tool for businesses and can be a powerful way to drive traffic to your website, increase product exposure, and boost sales.</div>
                <div class=\"sectionP\">At Foodmenu, we provide you with a promo code generator system that you can use to generate promo codes for your customers to use on your website. This gives you the ability to freely generate promo codes and customize them with different expiration dates, different discount amounts, and more options.</div>
                <div class=\"sectionP\">To go to the promo code generator section, go to <b>Settings</b> in the control panel, then click on <a href=\"https://cpanel.food-menu.net/?tab=Promocodes\" target=\"_blank\">Promo Codes</a>. A page will open displaying a <b>Create new promo code</b> button, and a list of promo codes if you already have some created.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 40,
            'title' => 'Creating a new promo code',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To create a new promo code, click on the <b>Create new promo code</b> button, which will display a window where you can enter all your new promo code details.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 40,
            'title' => 'Promo code basic info',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You’ll first be provided with an input box where you can enter the promo code name. This promo code name is the code that your customers will enter to receive the discount.</div>
                <div class=\"sectionP\">To set the discount value for the promo code, use the <b>Discount</b> number picker provided to set the desired discount percentage.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 40,
            'title' => 'Promo Code Expiration',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">You can choose whether or not to set an expiration date for your promo code by using the <b>Has Expiration Date</b> switch button. If you prefer not to have an expiration date for your promo code right now, you can switch off the button.</div>
                <div class=\"sectionP\">If you want to set an expiration date for your promo code, switch on the button and set your desired expiration date in the provided date picker.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 40,
            'title' => 'Promo Code Limitations',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you can manage and limit the value of your promo code discount so that you have complete control over the promo code's consumption while not negatively impacting your sales.</div>
                <div class=\"sectionP\">In the <b>Minimum order total</b> input box, enter the minimum amount of the total order value allowed for promo code usage.</div>
                <div class=\"sectionP\">In the <b>Discounted value cap</b> input box, you can enter a cap for your promo code's discount value, which is the maximum amount of discounted value allowed in the promo code consumption.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 40,
            'title' => 'Promo Code Settings',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In this area, you are provided with a number of switch buttons that help you adjust some of your promo code usage settings.</div>
                <div class=\"sectionP\">If you prefer to set your promo code's usage frequency to a single-time use only, switch on the <b>One-time Use</b> switch button. If you switch off the button, you enable your promo code to be used by your customers more than once.</div>
                <div class=\"sectionP\">You can enable the promo code to be applied to delivery orders when you switch on the <b>Apply for delivery orders</b> switch button. The contrary happens when you switch off the button.</div>
                <div class=\"sectionP\">When you switch on the <b>Apply for pickup orders</b> switch button, you allow for the promo code to be applied to pickup orders. The contrary happens when you switch off the button.</div>
                <div class=\"sectionP\">When you switch on the <b>Allow for guests</b> switch button, you choose to allow the promo code to be used by website visitors who are not logged in to an account on your website. You can limit the promo code's usage to only registered website visitors when you switch off the button. Note that you can’t enable the <b>Allow for Guests</b> switch button if you set your promo code usage to one-time use only.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">After setting all the promo code details, click on the <b>Create</b> button, and the promo code will be instantly ready to use.</div>
                </div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 7,
            'help_en_tut_id' => 40,
            'title' => 'Managing your promo codes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After creating a promo code or more, you'll find the list of created promo codes in the form of cards. Each promo code card has three main buttons.</div>
                <div class=\"sectionP\">The <b>Promo Code Validity</b> switch button allows you to control your promo code's validity status. When you switch on the button, the selected promo code will be valid for customers' usage. If you switch off the button, the promo code will no longer be valid until you switch on the button again.</div>
                <div class=\"sectionP\">The <b>Edit</b> button <span class=\"ico-edit\"></span> allows you to modify all the promo code details. When you click the button, a window appears with all the editable promo code details. After modifying any of the promo code details, click on the <b>Save</b> button, or click on the <b>Cancel</b> button to restore the last saved changes.</div>
                <div class=\"sectionP\">The <b>Delete</b> button <span class=\"ico-delete\"></span> allows you to permanently delete the selected promo code.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">It's important to note that only the main account can create or edit a promo code, and sub-accounts that have the authority to <b>manage system and settings</b>.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
