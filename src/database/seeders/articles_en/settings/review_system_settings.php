<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class review_system_settings extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'review_system_settings';// make sure that the article id is unique
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
            'title' => "Review system settings",
            'description' => "Customize and enhance the rating and review experience on your website using the control panel settings.  Learn more in this article.",
            'icon' => "ico-product_reviews",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "review.ratings",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to adjust your review system settings?',
            'keyWords' => 'product review ratings',
            'html' => <<<string
            <p>Collecting feedback from customers through ratings and reviews of your food items is advantageous for measuring customer satisfaction. </p>
            <p>
            <div>You can modify certain settings within the review system using the control panel by going to <b>Settings</b> in the control panel menu, then <a>System</a>.</div>
            <div>A page will open containing several tabs. Among these tabs, locate and tap on <b>System settings</b>.</div>
            <img class="articleImg" src="/storage/imgs/help/articles/system_settings.png" />
            </p>
            <p>After opening the system settings, navigate to the <b>Review system settings</b> subsection where you will be able to adjust a few settings using the switch buttons.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/review_system_settings.png" />

            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Enable product ratings and reviews',
            'keyWords' => 'enable reviews',
            'html' => <<<string
            <p>
            When you switch on the <b>Enable product ratings and reviews</b> button, the reviews posted by your visitors will be visible on your website. If you wish to not have any ratings or reviews appear, you can switch off the button.
            </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Keep in mind that when you switch off this button, your website visitors won't have the option to rate or review your products.</span>
            </div>

            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Accept guest reviews',
            'keyWords' => 'guest reviews',
            'html' => <<<string
            <p>
            Visitors who are not signed in to your website will have the option to rate or review your products when you switch on the <b>Accept guest reviews</b> button. You can switch off the button to limit this option to registered users only.
            </p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Display post-purchase surveys for users',
            'keyWords' => 'post-purchase survey order review',
            'html' => <<<string
            <p>
            Users will be asked to rate and review recently purchased items after each completed order when you switch on the <b>Display post-purchase surveys for users</b> button. If you prefer to disable this feature, switch off the button.
            </p>
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that the survey appears only once per every successful order.</span>
            </div>
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
            <p>
            After making any changes to the review system settings, click <b>Save</b> at the bottom of the page to avoid losing the changes, or click <b>Cancel</b> to restore the last saved changes.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Any changes you apply to the system settings only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
