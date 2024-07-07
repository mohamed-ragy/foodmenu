<?php

namespace Database\Seeders\articles_en\basics;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class guide_tips extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'guide_tips';// make sure that the article id is unique
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
            'title' => "Guide tips",
            'description' => "Understanding the tools and features of the control panel is the key to utilizing them most efficiently. Guide tips will assist you in understanding how to use all the tools.",
            'icon' => "ico-lamp",// i will set the icon unit i will provide you a list of all the icons
            'category' => "basics",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "guide.tips",//the article keywords spreat them using . 
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What are the guide tips?',
            'keyWords' => 'guide tips control panel guidance',
            'html' => <<<string
            <p>Guide tips are helpful instructions that teach you how to use the different features and functions of the control panel. You can access these guide tips in two ways: through <a>Auto help</a> and <a>Help icons</a>. </p>
            <p>Guide tips are presented in the form of cards. The area where you can find guide tips is found on the right pane of the control panel when the <a>guide mode</a> is activated.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/guide_tips.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Guide tip features',
            'keyWords' => 'control panel guide tip',
            'html' => <<<string
            <p>
            <div>Each guide tip card has icons located on it that help you manage a guide tip easily. The icons are as follows:</div>
            <div>
            <ul>
            <li>Minimize/Maximize: This icon <span class="ico-minimize"></span> minimizes the guide tip. Alternatively, You can maximize it by clicking on this icon <span class="ico-maximize"></span>.</li>
            <li>Close: You can close a guide tip by clicking on this icon <span class="ico-close"></span>. Closing a guide tip will unpin it if it was already pinned.</li>
            <li>Full screen: This icon  <span class="ico-fullScreen"></span> opens the selected tip in a bigger window.</li>
            <li>Pin/Unpin: The Pin icon <span class="ico-pin"></span>  pins the guide tip so that it remains in the guide tip area every time you log into your control panel account. You can click on the same icon  <span class="ico-unbin"></span> again to unpin the tip.</li>
            <li>Helpful/Unhelpful: These icons <span class="ico-thumbsUp"></span> <span class="ico-thumbsDown"></span> allow you to assess a guide tip as helpful or unhelpful by clicking on the thumbs-up or thumbs-down icon. This helps us to improve our services constantly.</li>
            </ul>
            </div>
            </p>
            <p>When you hover your mouse over an element in the control panel that has a guide tip, this guide tip will be highlighted. You can pin/unpin a highlighted Guide Tip using the keyboard shortcut (ctrl+B).</p>
            <div class="tipContainer tipContainer_green">
                <span class="ico-lamp"></span>
                <span>Pinning/Unpinning guide tip in a particular account will take place in that account only, whether it is the main account or a sub-account. This action won't have any effect on the other accounts.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Guide tip area controls',
            'keyWords' => 'guide tip guidance control panel',
            'html' => <<<string
            <p>
            <div>Each guide tip card has icons located on it that help you manage a guide tip easily. The icons are as follows:</div>
            <div>
            <ul>
            <li>Minimize all: You can minimize all the guide tips by clicking on this icon <span class="ico-minimize"></span> or using this shortcut instead (alt+N).</li>
            <li>Maximize all: You can maximize all the guide tips by clicking on this icon <span class="ico-maximize"></span> or using this shortcut instead (alt+M).</li>
            <li>Clear unpinned guide tips: You can clear all the unpinned guide tips by clicking on this icon <span class="ico-eraser"></span> or using this shortcut instead (alt+C).</li>
            <li>Clear all: You can clear all the guide tips by clicking on this icon <span class="ico-delete"></span> or using this shortcut instead (alt+X).</li>
            </ul>
            </div>
            </p>
            string,
        ]);
        help_en_sections::insert($sections);
    }
}