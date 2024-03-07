<?php

namespace Database\Seeders\articles_en;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;

class article_3 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $article_id = 3;
        $cpanel = env('CPANEL_URL');
        $helpCenter = env('HELP_CENTER_URL');
        $domain = env('APP_DOMAIN');
        help_en_articles::where('id',$article_id)->delete();
        help_en_sections::where('article_id',$article_id)->delete();

        $sections = [];

        help_en_articles::create([
            'id' => $article_id,
            'sort' => 3,
            'title_id' => 'The-Share-Tool',
            'title' => 'The Share Tool',
            'description' => 'The share tool allows you to promote your restaurant’s products on your social media platforms, which can lead to growth in your website audience. This guide will assist you with how to use the tool.',
            'icon' => 'ico-share',
            'category' => 'basics',
            'keyWords' => 'cpanel',
            'rating' => 0,
        ]);

        $sort = 0;

        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article_id,
            'title' => 'What is the share tool?',
            'keyWords' => '',
            'html' => <<<string
            The share tool enables you to quickly promote your restaurant's products or categories on social media. By sharing on platforms like Facebook or Twitter, you can attract more visitors to your website, inform customers about new offerings, and highlight specific product categories.
            string,
        ]);
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article_id,
            'title' => 'How to share products?',
            'keyWords' => '',
            'html' => <<<string
                If you want to share a specific product, go to ‘Product’ in the control panel menu, then ‘Manage products’.

                ////////image of CP menu////////

                A page will open displaying products on your account. To search for a product, type in its name in the provided input box.

                ////image of page and input list/////////////

                The product will be displayed in the form of a card that contains action buttons, among them locate and tab on the ‘Share’ *insert icon* button.


                ///////image of product card////////////

                When you click the button, a Share pop-up window appears, allowing you to select the language to share the product in and displaying the icons for the social media platforms where your product(s) can be shared.

            string,
        ]);
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article_id,
            'title' => 'How to share a category?',
            'keyWords' => '',
            'html' => <<<string
                If you want to share a specific category, go to ‘Product’ in the control panel menu, then ‘Product categories’.

                ///////image of CP menu/////

                A page will open containing all the product categories you created. Each category is displayed in the form of a card.

                /////image of page/////////

                Click on the ‘Share’ button to select the social media platform where you want to share your category, and then select the language for the text.

            string,
        ]);
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article_id,
            'title' => 'Share Reminder',
            'keyWords' => '',
            'html' => <<<string
                You have the option to receive popup reminders with random products and product categories to share by switching on the Enable Share Reminder switch button in the control panel settings. To learn more about this option, check out this article.

                Green lamp: Only the main account can use the sharing tool and sub-accounts with the authority to manage categories and products.
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
