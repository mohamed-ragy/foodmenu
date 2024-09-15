<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class configuring_your_website_languages extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'configuring_your_website_languages';// make sure that the article id is unique
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
            'title' => "Configuring your website languages",
            'description' => "Learn how to set up your website languages in this guide, make it multilingual, and even create your own custom language.",
            'icon' => "ico-languages",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "website_languages",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Your website browsing languages',
            'keyWords' => 'website browsing language',
            'html' => <<<string
            <p>Using the control panel, you can choose which browsing languages your website supports. By making your website available in multiple languages, you can reach a wider audience and expand your customer base.</p>
            <p>To do so, go to the <b>Settings</b> section in the control panel menu, then to <a>Languages</a>.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Selecting your website languages',
            'keyWords' => 'website install change languages',
            'html' => <<<string
            <p>
            On the <b>Languages</b> page, you'll see a list of languages you've already added to your website. To add a new language, click on the <b>Install new language</b> button.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/languages_page.png" />
            <p>A popup window will open displaying all languages supported by Foodmenu. Click on the <b>Install</b> button beside a language to add it to your website.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/install_popup.png" />
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Creating a custom language',
            'keyWords' => 'custom language',
            'html' => <<<string
            <p>
            If you haven't found the language you want for your website among the languages Foodmenu supports, you can create a custom language. A custom language allows you to create a new language with all its details.
            </p>
            <p>
            To create a custom language, click on <b>Install new language</b>, then <b>Create custom language</b> in the popup window.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/install_popup_zoomedtocustom.png" />
            <p>A new window will then open, where you'll be required to fill in the new custom language primary info.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/create_custom_language.png" />
            <p>
            <div>The custom language primary details are as follows:</div>
            <div>
            <ul>
            <li><b>Language name:</b> This is the language name that appears to your customers on your website.</li>
            <li><b>Language code:</b> A language code consists of two English letters that will be used as identifiers for the custom language in the URL of your website page.</li>
            <li><b>Language flag:</b> A country flag represents its corresponding language. For instance, if you're creating a custom language for "Canadian French," you can choose between the 'Canada' and 'France' flags.</li>
            <li><b>Language text:</b> A language text is the script used for the new custom language such as the Latin script.</li>
            </ul>
            </div>
            </p>
            <p>After filling in all the needed details, click on <b>Create</b> to successfully add the new language to your website.</p>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}

