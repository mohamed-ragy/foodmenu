<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class website_system_settings extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'website_system_settings';// make sure that the article id is unique
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
            'title' => "Website system settings",
            'description' => "In this guide, you will pick up on the various settings you can adjust for your website.",
            'icon' => "ico-system",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "website_system_settings",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'System settings',
            'keyWords' => 'website settings',
            'html' => <<<string
            <p>Using the control panel, you will be able to adjust some of your website important system settings.To do so, go to <b>Settings</b> in the control panel menu, then <a>System</a>.</p>
            <p>A page will open with several tabs, locate and tap on <b>System settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/system_settings.png" />
            <p>You'll then find several subsections for configuring website settings, including <b>Other system settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/other_system_settings.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Website quick load mode',
            'keyWords' => 'quick load mode',
            'html' => <<<string
            <p>Page load time is how long it takes for a webpage to fully open. Factors like media content and the user's internet connection can slow it down, especially if large files or images are involved.</p>
            <p>When you switch on the <b>Website quick load mode</b>, you allow for the removal of the loading screen for visitors, allowing pages to load as they navigate. However, using this feature is discouraged due to its negative impact on the user experience.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/website_quickload_button.png" />
            <p>The switch button is disabled by default, requiring the page to fully load before display.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>To optimize load times, you can use smaller images on your website and consider using the WebP format for high-quality images with reduced file sizes.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Displaying dine-in working hours',
            'keyWords' => 'dine-in dining working hours',
            'html' => <<<string
            <p>When you switch on the <b>Show dine-in working hours</b> button, your dine-in service's working hours that you <a>have set</a> appear on your website along with your other services' working hours.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/show_dinein_hours_button.png" />
            <p>You can switch off this button if you prefer not to inform your customers of your dine-in availability times or if your restaurant doesn't offer dine-in service.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Language selection message',
            'keyWords' => 'browsing language',
            'html' => <<<string
            <p>When you switch on the <b>Display a select language message on the first visit</b> button, a popup message will appear to your website visitors when they visit your website for the first time.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/select_language_button.png" />
            <p> The popup message allows them to choose their preferred browsing language from the list of languages you have selected for your website.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/browsing_language_popup.png" />
            <p>If you switch off the button, no popup message will appear to your website visitors, and their browsing language will be set to the website's default language.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Happy hour announcements',
            'keyWords' => 'happy hour',
            'html' => <<<string
            <p>When you switch on the <b>Show happy hour announcement</b> button, any happy hour you have scheduled for the day will be displayed as an announcement on your website. If you switch off the button, no announcements will appear.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/happyhour_announcement_button.png" />
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Disabling this button has no effect on the validity of the happy hour.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Cookies notification message',
            'keyWords' => 'website cookies',
            'html' => <<<string
            <p>A cookies notification message is a pop-up notice that will continue to appear to your website's visitors until they close it, informing them of the use of cookies on your website. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/cookies_notification.png" />
            <p>When you switch on the <b>Display cookies notification message</b> button, the cookies notification message will appear. Or, if you prefer to not have the message appear to your visitors, you can switch off the button.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>The cookies notification message is text that you can edit to match your policy requirements.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Cart lifetime',
            'keyWords' => 'cart lifetime',
            'html' => <<<string
            <p>
            <div>When your website's users add products to their cart while signed in, the items will remain in their cart as long as they use their registered account.</div>
            <div>Using the <b>Cart lifetime</b> number picker allows you to specify how long items can be left in the cart.</div>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/cart_lifetime_picker.png" />
            <p>Note that any modifications your website visitors make to their cart reset the cart's lifetime.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Receipt width',
            'keyWords' => 'order receipt size',
            'html' => <<<string
            <p>You have the option of printing your order receipts through Foodmenu. Using the <b>Receipt width</b> number picker, you can customize the width of your receipts in millimeters to the exact width of your printer.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Saving changes',
            'keyWords' => '',
            'html' => <<<string
            <p>After adjusting the system settings, make sure to click on <b>Save</b> to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.</p>
            string,
        ]);



        help_en_sections::insert($sections);
    }
}
