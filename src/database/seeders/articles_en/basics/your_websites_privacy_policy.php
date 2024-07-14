<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_websites_privacy_policy extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_websites_privacy_policy';// make sure that the article id is unique
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
            'title' => "Your website’s privacy policy",
            'description' => "A privacy policy is necessary to safeguard your customers’ rights and increase your company’s transparency. This article will guide you through creating a privacy policy for your website.",
            'icon' => "ico-releaseNotes",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "privacy_policy",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is a privacy policy?',
            'keyWords' => 'privacy policy',
            'html' => <<<string
            <p>A privacy policy is a statement or legal document created by a party (for example, a company) that explains what information is collected, used, and shared.</p>
            <p>Having a privacy policy in place is a legal requirement to protect customers' rights and inform them about the data collected about them. Including a privacy policy is not only a legal necessity but also provides transparency and trust to your customers.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What information should you gather?',
            'keyWords' => 'business information',
            'html' => <<<string
            <p>The information your website collects depends mainly on the type of business you run, but there is some personal information that commonly gets collected, including first and last name, email address, address, and phone number.</p>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
