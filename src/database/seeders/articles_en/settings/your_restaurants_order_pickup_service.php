<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_restaurants_order_pickup_service extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_restaurants_order_pickup_service';// make sure that the article id is unique
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
            'title' => "Your restaurant's order pickup service",
            'description' => "One of the services you can provide to make your restaurant more convenient is order pickup. This article will help you to know how to adjust the service's settings.",
            'icon' => "ico-pickup",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "pickup order service",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the order pickup service?',
            'keyWords' => 'order pickup',
            'html' => <<<string
            <p>
            <div>The order pickup option allows customers to place orders on your website and then pick up their orders directly at your restaurant. Providing this service, in addition to delivery, offers your customers multiple convenient ways to receive orders from your restaurant.</div>
            <div>This versatility can help make your restaurant more accessible for a wider range of customers.</div>
            </p>
            <p>To adjust your order pickup settings, go to <b>Settings</b> in the control panel menu then <a>Order pickup settings</a>.</p>
            <p>After opening the page, you'll find a number of tabs, each containing adjustable settings for the order pickup service.</p>
            <img class="articleImg" src="/storage/imgs/help/order_pickup_settings/.png" />
            string,
        ]);


        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Working days',
            'keyWords' => 'working days availability',
            'html' => <<<string
            <p>Through the provided list, you can choose the working days and hours for your order pickup service, which will be displayed on your website.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>Each day of the week is sorted in a row from which you adjust its settings from the <b>Manage</b> <span class="ico-settings"></span> button. Check out the <a>working days and hours</a> and the <a>scheduled discount</a> articles for more information on how to adjust these settings.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Average time to prepare an order',
            'keyWords' => 'order preparation',
            'html' => <<<string
            <p>
            Once a customer places a pickup order, they will be notified when it is ready for collection. You can use the number picker provided to determine how long it takes to prepare pickup orders.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>If you don't want to specify a time for when your order gets ready, set the number picker to 0.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Payment methods',
            'keyWords' => 'payment pay cash credit',
            'html' => <<<string
            <p>Payment methods are the payment options that will appear to your customers while they place their orders. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>
            <div>The following payment options are available for the order pickup service:</div>
            <div>
            <ul>
            <li>Cash at the restaurant</li>
            <li>Credit card at the restaurant</li>
            </ul>
            </div>
            </p>
            <p>You can enable both or just one method by checking the box next to the method(s) you want your customers to use. If you select neither, your customers will not be required to select a payment method while they're placing their order.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Minimum charge',
            'keyWords' => 'minimum charge order cost',
            'html' => <<<string
            <p>A minimum charge is the lowest amount of an order's total allowed to place a pickup order, which means that if a customer places an order and the total order amount is less than the minimum charge you set, they will be unable to place the order.</p>
            <p>You can enter the desired minimum charge for your pickup orders in the <b>Minimum charge</b> input box.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>
            <div>When you switch on the <b>Include tax</b> button, the total order's amount that is compared to the minimum charge will include the order's items and tax value. </div>
            <div>If you switch off the button, only the value of the order's items will be compared to the minimum charge.</div>
            </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>If you don't wish to apply a minimum charge on your orders, set the minimum charge as 0.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Tax settings',
            'keyWords' => 'tax cost',
            'html' => <<<string
            <p>You can choose to include a tax value on your pickup orders. The tax value added will be based on your selection of one of the following options:</p>
            <img class="articleImg" src="/storage/imgs/help/articles/.png" />
            <p>The first option is to set a fixed cost for your tax value by checking the <b>Fixed cost</b> box and entering the value in the input box. For example, if you set your tax fixed cost to be $10, this will be the added tax cost on the order no matter the total amount.</p>
            <p>The second option is to set a tax percentage that will be calculated from the sum of the items included in the home delivery order. You can select this option by checking the <b>Percentage</b> box and then entering the tax percentage in the input box.</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>If you prefer not to include any taxes on your pickup orders, set the tax fixed cost or percentage to 0.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Saving changes',
            'keyWords' => 'save changes',
            'html' => <<<string
            <p>After adjusting any of the order pickup settings, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the order pickup settings, and sub-accounts that have permission to manage system and settings.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
