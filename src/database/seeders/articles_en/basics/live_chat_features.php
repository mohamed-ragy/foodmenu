<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class live_chat_features extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'live_chat_features';// make sure that the article id is unique
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('live_chat_features');
        $domain = env('APP_DOMAIN');
        $old_article_id = help_en_articles::where('title_id',$title_id)->pluck('id')->first();
        help_en_articles::where('id',$old_article_id)->delete();
        help_en_sections::where('article_id',$old_article_id)->delete();

        $sections = [];
        
        $article = help_en_articles::create([
            'sort' => 0,//change this to the number of the article sort
            'title_id' => $title_id,
            'title' => "Live chat features",
            'description' => " This article provides a step-by-step guide on utilizing the live chat features for convenient communication with your website visitors.",
            'icon' => "ico-chat",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "live.chat.features",//the article keywords spreat them using . 
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Live chat',
            'keyWords' => 'live chat orders user profile',
            'html' => <<<string
            <p>Using the live chat, you can connect with your website visitors efficiently. In the live chat window, we provide some features that enable you to quickly locate a user's profile and instantly find the information you need. This smooth connection between chat and user data helps you offer personalized and quick support.</p>
            <p>
            <div>The features provided in the chat window when you're chatting with a website <a>user</a> are as follows:</div>
            <div>
            <ul>
            <li>View orders placed by user <span class="ico-orders"></span></li>
            <li>See reviews posted by user <span class="ico-product_reviews"></span></li>
            <li>Manage user's profile <span class="ico-settings"></span></li>
            <li>Share a product with user <span class="ico-products"></span></li>
            </ul>
            </div>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/chat_window_icons.png" />
            string,
        ]);
//
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Sharing via live chat',
            'keyWords' => 'share sharing product order chat',
            'html' => <<<string
            <p>Sharing a product via chat is handy because it serves as a shortcut for quickly finding a product whenever a customer inquires about a specific product. You can share and send a product by using the shortcut "p@product identifier" instead of clicking the share a product icon. </p>
            <div class="tipContainer tipContainer_orange">
                <span class="ico-lamp"></span>
                <span>You can also share and send an order while you're chatting with a user by using the shortcut "o@order number" to quickly fetch an order and share it with the user.</span>
            </div>
            <p>Also, from the users' side, they can share with you an order they placed through a button provided in the <a>order tracker</a> of orders they have placed, allowing them to quickly address any concerns.</p>
            string,
        ]);

    //
    $sort++; 
    array_push($sections,[
        'sort'=>$sort,
        'article_id' => $article->id,
        'title' => 'How can your customers use the live chat feature?',
        'keyWords' => 'live chat',
        'html' => <<<string
        <p>Your website visitors will see a live chat icon in the bottom right corner of their screen. When they click on it, a live chat window opens, displaying your restaurant's name, active status, chat history, and an input box where they can type their question.</p>
        <img class="articleImg" src="/storage/imgs/help/articles/live_chat_users_side.png" />
        <p>You have the option to prevent guests (visitors who aren't logged in to an account on your website) from chatting with you by switching off the <a>enable guest live chat</a> button.</p>
        <div class="tipContainer tipContainer_orange">
                <span class="ico-lamp"></span>
                <span>If you have the live chat function (hc: disabled) from your account's system, the chat icon won't appear for any of your website visitors.</span>
            </div>
        <p>You can easily enable or disable the live chat function in the system settings.</p>
        string,
    ]);
        help_en_sections::insert($sections);
    }
}