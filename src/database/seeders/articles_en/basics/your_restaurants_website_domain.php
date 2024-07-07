<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class your_restaurants_website_domain extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'your_restaurants_website_domain';// make sure that the article id is unique
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
            'title' => "Your restaurant's website domain",
            'description' => "Your website's domain name is an essential part of your website. This article will show you how to set up your domain name and your options based on your subscription plan.",
            'icon' => "ico-link",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "website.domain",//the article keywords spreat them using . 
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is a domain name?',
            'keyWords' => 'website domain subscription plans',
            'html' => <<<string
            <p>A domain name is a special address that uniquely identifies your website and appears in the URL bar. It's what users type in to visit your site. Typically, a domain name consists of your restaurant's name and an extension.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/url_components.png" />
            <p>When you sign up for the <a>premium plan</a> with Foodmenu, you get the choice to have your very own domain name. However, with <a>other plans</a>, your website will be set up as a subdomain.</p>
            <p>Also, if you already have an existing sub-domain, you'll be able to attach it to your Foodmenu account.</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Your free subdomain',
            'keyWords' => 'website free domain name',
            'html' => <<<string
            <p>When you create a Foodmenu account, you'll immediately get a subdomain for your restaurant's website that is linked to our food-menu.net domain name. Here are a few examples of what your website URL might look like:</p>
            <p>
            <ul>
            <li>pizza.food-menu.net</li>
            <li>burger.food-menu.net</li>
            <li>seafood.food-menu.net</li>
            </ul>
            </p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Get a full-fledged domain name',
            'keyWords' => 'website domain name',
            'html' => <<<string
            <p>You can get a separate domain name for your restaurant's website when you subscribe to our premium plan. Below are a few examples of how your website URL will look when you get your own domain name:</p>
            <p>
            <ul>
            <li>www.yourRestaurantName.com</li>
            <li>www.yourRestaurantName.net</li>
            <li>www.yourRestaurantName.io</li>
            <li>www.yourRestaurantName.app</li>
            <li>www.yourRestaurantName.shop</li>
            </ul>
            </p>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}