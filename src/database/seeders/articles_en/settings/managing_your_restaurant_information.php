<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class managing_your_restaurant_information extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'managing_your_restaurant_information';// make sure that the article id is unique
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
            'title' => "Managing your restaurant information",
            'description' => "This guide will walk you through the process of updating or setting up your restaurant's information if you're new to Foodmenu.",
            'icon' => "ico-restaurant_information",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "restaurant_information",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Managing your restaurant information',
            'keyWords' => 'restaurant information',
            'html' => <<<string
            <p>
            Using the control panel, you can set up and adjust your restaurant's primary information that is displayed on your website
            </p>
            <p>To do so, go to <b>Settings</b> in the control panel menu, then <a>Restaurant information</a>. A page will open showing several tabs, each dedicated to a different section of your adjustable restaurant information.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_information.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Logo and icon',
            'keyWords' => 'restaurant logo icon',
            'html' => <<<string
            <p>
            In the <b>Website icon</b> image card, upload or select a favicon, which is your website icon that appears on browser taps next to the page's title, bookmark lists, and other places.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_logo.png" />
            <p>By clicking on the <b>Restaurant logo</b> image card, you will be able to upload your restaurant's logo, a key element of your brand identity. Consider having the image format in WebP or PNG with a transparent background.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/logo_and_icon.png" />
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Remember to select an image that is square in size, such as 32x32 pixels, and not larger than 180x180 pixels.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant name',
            'keyWords' => 'restaurant name',
            'html' => <<<string
            <p>
            In the entry boxes provided, enter your restaurant's name in the languages you have selected for your website. When you leave a language-specific box blank, the restaurant identifier will be used instead.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_name.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant description',
            'keyWords' => 'restaurant description',
            'html' => <<<string
            <p>
            The restaurant description is used for your website's meta description. Enter the description in your chosen website languages in the entry boxes provided. Each language has a character limit of 150 characters.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_description.png" />
            string,
        ]);

            //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant email',
            'keyWords' => 'restaurant email address',
            'html' => <<<string
            <p>
            You can enter your email address in the input box provided, which is part of your contact information on your website. It appears in the “Contact us” area and may also appear on other parts of your website depending on the website template you have selected.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_email_box.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant phone numbers',
            'keyWords' => 'restaurant phone numbers',
            'html' => <<<string
            <p>
            Add and manage contact numbers displayed on your website and receipts. To enter a new contact number, click on the <b>Add a new phone number</b> button. You can remove numbers by clicking on the <b>Delete<b> <span class="ico-delete"></span> icon.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_numbers.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant address',
            'keyWords' => 'restaurant address',
            'html' => <<<string
            <p>
            Enter your restaurant's address in the designated input boxes for the languages you've chosen for your website.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_address.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Restaurant location',
            'keyWords' => 'restaurant location map',
            'html' => <<<string
            <p>
            Optionally, you can set your restaurant's location on the map by either detecting your current location automatically by clicking on the <b>My current location</b> button or by selecting your location manually by zooming and panning around the map.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/restaurant_location.png" />
            <p>In case you don't want your restaurant's location to be set on the map, simply click on the <b>Unset restaurant location</b> button.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Keep in mind that your internet connection may affect the accuracy of your location so make sure that the location detected matches your restaurant location. </span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Currency symbols',
            'keyWords' => 'currency symbol',
            'html' => <<<string
            <p>
            Enter the currency symbols for your restaurant in the provided input boxes, and the currency symbol will appear alongside the prices of the items. The currency symbol displayed will be determined by the visitors' browsing language.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/currency_symbol.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Social media links',
            'keyWords' => 'social media links',
            'html' => <<<string
            <p>
            <div>Displaying links to your social profiles ensures more people can reach you across multiple channels. </div>
            <div>You can enter your social media links in the provided entry boxes, which will appear as clickable graphic icons. When clicked, they act as links, redirecting website visitors to your social media profiles.</div>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/social_media_links.png" />
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Make sure that the links start with "https://".</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Website announcement',
            'keyWords' => 'website announcement',
            'html' => <<<string
            <p>
            Adding announcements to your website helps you communicate important information to your customers. Whether you're informing them about new updates, offering special discounts, or promoting a new product.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/website_announcement.png" />
            <p>
            Enter the announcements in the languages of your website in their respective entry boxes. You can use the HTML <a> tag to hyperlink to a page in your announcement bar.
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/website_announcement_box.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Receipt footer message',
            'keyWords' => 'order receipt',
            'html' => <<<string
            <p>
            <div>In the provided entry boxes, you can add a message to your printable order receipts in the different languages of your website.</div>
            <div>If you prefer not to include a message in your receipts, leave the boxes blank.</div>
            </p>
            <img class="articleImg" src="/storage/imgs/help/articles/receipt_footer.png" />
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
            Remember to click <b>Save</b> after changing any of your restaurant information to apply the changes, or click on <b>Cancel</b> to restore the last saved settings.
            </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Note that only the main account can make changes to the restaurant information settings, and sub-accounts that have permission to manage system and settings. </span>
            </div>
            string,
        ]);


        help_en_sections::insert($sections);
    }
}
