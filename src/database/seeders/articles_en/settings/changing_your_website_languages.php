<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class changing_your_website_languages extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'changing_your_website_languages';// make sure that the article id is unique
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
            'title' => "Changing your website languages",
            'description' => "In this article, you will get to know how to manage and modify some of the languages you have added to your website.",
            'icon' => "ico-langCode",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "website_languages.browsing_language",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Managing language details',
            'keyWords' => 'website language details',
            'html' => <<<string
            <p>You can manage each language you have added to your website by modifying its use, primary details, and text. To access your website languages, go to the <b>Settings</b> section of the control panel menu, then <a>Languages</a>.</p>
            <p>Upon opening the page, you'll find all the languages you have added to your website in a list. Each language is sorted into a row, showing primary info about the language with a few action buttons.</P>
            <img class="articleImg" src="/storage/imgs/help/articles/languages.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Setting your primary browsing language',
            'keyWords' => 'browsing language',
            'html' => <<<string
            <p>To set a default browsing language for your website, check the <b>Default</b> box. Your website visitors can still switch the browsing language to any of the other options you've made available, allowing them to view content in their preferred language.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/languages_default_box.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Order receipt primary language',
            'keyWords' => 'order receipt language',
            'html' => <<<string
            <p>You can also set a default language for your order receipts, which will be used for printing until you decide to change it. To make a language the default, simply check the <b>Receipt</b> box.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/languages_order_receipt.png" />
            string,
        ]);


        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => "Modifying a language's primary info",
            'keyWords' => 'language settings',
            'html' => <<<string
            <p>You can change the primary details of a language by clicking on the <b>Edit language options</b> button.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/edit_languages_button.png" />
            <p>You can then change the language display name and language code.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/edit_language_window.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
                'sort'=>$sort,
                'article_id' => $article->id,
                'title' => "Adjust a language's text",
                'keyWords' => 'website text',
                'html' => <<<string
                <p>You can change the basic text on your website that is added by default when you install a new language. Some basic text examples include "Email", "Register", error/success alerts, etc.</p>
                <p>To modify this text, click on the <b>Edit language text</b> button.</p>
                <img class="articleImg" src="/storage/imgs/help/articles/edit_language_window.png" />
                <p> A window will then appear, displaying all of the website's basic text, with an input box for each text that you can edit.</p>
                <img class="articleImg" src="/storage/imgs/help/articles/website_basic_text.png" />
                <p>
                <div>These texts are divided into five categories:</div>
                <div>
                <ul>
                <li><b>Authentication:</b> Content related to your website's login, signup, email address, and password is included in this category.</li>
                <li><b>Orders:</b> This category covers all aspects of visitors' orders, including the different types of orders, the order receipt, and the order number.</li>
                <li><b>Reviews:</b> Here, you can include all text everything related to product reviews and ratings.</li>
                <li><b>Live chat:</b> The text you add here appear in your website's live chat window.</li>
                <li><b>Receipt:</b> This category includes text in your order receipt.</li>
                <li><b>Others:</b> This category includes text that do not fit into any of the other categories.</li>
                </ul>
                </div>
                </p>
                <div class="tipContainer tipContainer_green">
                <span class="ico-lamp"></span>
                <span>Make sure to click on <b>Save</b> after making any modifications to avoid losing the changes.</span>
                </div>
                string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Removing a language from your website',
            'keyWords' => 'uninstall language',
            'html' => <<<string
            <p>By clicking on the <b>Uninstall</b> button, you can remove a language completely from your website languages.</p>
            string,
        ]);

        help_en_sections::insert($sections);
    }

}
