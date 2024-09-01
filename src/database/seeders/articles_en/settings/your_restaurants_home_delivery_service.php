<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_restaurants_home_delivery_service extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_restaurants_home_delivery_service';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];

        $article = help_en_articles::create([
            'sort' => 0,//change this to the number of the article sort
            'title_id' => $title_id,
            'title' => "Your restaurant's home delivery service",
            'description' => "Operating a successful home delivery service will certainly add to your restaurant's profitability. Check out this article to learn how to adjust its settings.",
            'icon' => "ico-home_delivery_settings",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "order delivery service",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the home delivery service?',
            'keyWords' => 'home order delivery service',
            'html' => <<<string
            <p>The home delivery service allows your customers to place orders on your website and have them delivered to their homes. This service is a primary sales channel and a growing revenue stream that you should not overlook.</p>
            <p>You can adjust your home delivery service by going to <b>Settings</b> in the control panel menu and then clicking on <a>Home delivery settings</a>.</p>
            <p>After opening the intended page, you'll find a series of tabs, each of which contains adjustable settings for the home delivery service.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/settings_page.png" />
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>You can directly place home delivery orders from the control panel, which you may need if you receive orders over the phone.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Working days',
            'keyWords' => 'working days houry availability',
            'html' => <<<string
            <p>Through the provided list, you can choose the working days and hours for your home delivery service, which will be displayed on your website.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/settings_page.png" />
            <p>Each day of the week is sorted in a row from which you adjust its settings from the <b>Manage</b> <span class="ico-settings"></span> button.  Check out the <a>working days and hours</a> and the <a>scheduled discount</a> articles for more information on how to adjust these settings.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Delivery cost',
            'keyWords' => 'delivery cost expenses',
            'html' => <<<string
            <p>You can choose to add delivery costs on your home delivery orders by entering the delivery fee you want to charge your customers in the <b>Delivery cost</b> input box.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/delivery_cost.png" />
            <p>This fee will be added to the total of the delivery order. If you wish not to charge your customers any delivery fees, set the delivery cost as 0.</p>
            <p>You will still be provided with an option to modify the delivery cost for any incomplete order from the control panel. If you want to possibly opt for this option, we recommend you switch on the <b>Inform customers of possible cost changes</b> button. This will notify your customers that the delivery fees can be changed while they are placing their orders.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Average delivery time',
            'keyWords' => 'delivery time',
            'html' => <<<string
            <p>You can set an average delivery time for your orders, which your customers will be notified of after they place an order.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            string,
        ]);


        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Payment methods',
            'keyWords' => 'payment method card cash',
            'html' => <<<string
            <p>Payment methods are the payment options that will appear to your customers while they place their orders. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>
            <div>The following payment options are available for the home delivery service:</div>
            <div>
            <ul>
            <li>Cash on delivery</li>
            <li>Card on delivery</li>
            </ul>
            </div>
            </p>
            <p>You can enable both or just one method by checking the box next to the method(s) you want your customers to use. If you select neither, your customers will not be required to select a payment method while they're placing their order.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Minimum charge',
            'keyWords' => 'order minimum charge',
            'html' => <<<string
            <p>A minimum charge is the lowest amount of an order's total allowed to place an order, which means that if a customer places an order and the total order amount is less than the minimum charge you set, they will be unable to proceed with the order.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>You can enter the desired minimum charge for your orders in the <b>Minimum charge</b> input box.</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>If you don't wish to apply a minimum charge on your orders, set the minimum charge as 0.</span>
            </div>
            <p>
            <div>When you switch on the <b>Include tax and delivery cost</b> button, the total order's amount that is compared to the minimum charge will include the order's items, tax value, and delivery fees on the order. </div>
            <div>If you switch off the button, only the value of the order's items will be compared to the minimum charge.</div>
            </p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Tax settings',
            'keyWords' => 'tax cost',
            'html' => <<<string
            <p>You can choose to include a tax value on your home delivery orders as an added cost to the orders. The tax value added will be based on your selection of one of the following options:</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>
            <div>The first option is to set a fixed cost for your tax value by checking the <b>Fixed cost</b> box and entering the value in the input box. </div>
            <div>For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount.</div>
            </p>
            <p>The second option is to set a tax percentage that will be calculated from the sum of the items included in the home delivery order. You can select this option by checking the <b>Percentage</b> box and then entering the tax percentage in the input box.</p>
            <p>If you prefer not to include any taxes on your home delivery orders, set the tax fixed cost or percentage to 0.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Saving changes',
            'keyWords' => 'saving changes',
            'html' => <<<string
            <p>After adjusting any of the home delivery settings, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the Home delivery settings, and sub-accounts that have permission to manage system and settings.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
