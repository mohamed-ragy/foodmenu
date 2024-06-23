<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class the_share_tool extends Seeder//change the article_ to article_(the article id)
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'the_share_tool';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $old_article_id = help_en_articles::where('title_id','the-share-tool')->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];

        $article = help_en_articles::create([
            'sort' => 3,//change this to the number of the article sort
            'title_id' => $title_id,
            'title' => "The share tool",
            'description' => "The share tool allows you to promote your restaurant’s products on your social media platforms, driving growth to your website. This guide will assist you in using the tool.",
            'icon' => "ico-share",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "share_tool",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the share tool?',
            'keyWords' => 'share tool marketing facebook twitter website visitors',
            'html' => <<<string
            <p>
              The share tool enables you to quickly promote your restaurant's products or categories on social media. By sharing on platforms like Facebook or Twitter, you can attract more visitors to your website, inform customers about new offerings, and highlight specific product categories.
            </p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to share products?',
            'keyWords' => 'share manage products social media',
            'html' => <<<string
            <p>If you want to share a specific product, go to <b>Product</b> in the control panel menu, then <a href="{$cpanel}/?page=manage_products" target="_blank">Manage products</a>.</p>
            <p>A page will open displaying products on your account. To search for a product, type in its name in the provided input box.</P>
            <img class="articleImg" src="/storage/imgs/help/articles/product_input_list.png" />
            <p>The product will be displayed as a card containing action buttons, among them locate and tab on the <b>Share</b> <span class="ico-share"></span> button.</p>
            <img class="articleImg mxw300" src="/storage/imgs/help/articles/product_card.png" />
            <p>When you click the ccbutton, a Share pop-up window appears, allowing you to select the language to share the product in and displaying the icons for the social media platforms where your product(s) can be shared.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to share a category?',
            'keyWords' => 'share manage category categories social media',
            'html' => <<<string
            <p>If you want to share a specific category, go to <b>Product</b> in the control panel menu, then <b>Product categories</b>.</p>
            <p>A page will open containing all the product categories you created. Each category is displayed in the form of a card.</p>
            <img class="articleImg mxw300" src="/storage/imgs/help/articles/category_card.png" />
            <p>Click on the <b>Share</b> button to select the social media platform where you want to share your category, and then select the language for the text.</p>
            string,
        ]);

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Share reminder',
            'keyWords' => 'share reminder',
            'html' => <<<string
            <p>You can receive pop-up reminders with random products and product categories to share by switching on the <a href="{$helpCenter}/en/articles/system-and-settings/adjusting-the-control-settings" class="openPage" page="article" cat="system-and-settings" article="adjusting-the-control-settings"> Enable share reminder</a> switch button in the control panel settings.</p>
            <div class="tipContainer tipContainer_green">
                    <span class="ico-lamp"></span>
                    <span>Only the main account can use the sharing tool and sub-accounts with the permission to manage categories and products.</span>
                </div>
            string,

        ]);
        help_en_sections::insert($sections);
    }
}
