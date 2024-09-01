<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class the_guide_mode extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'the_guide_mode';// make sure that the article id is unique
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
            'title' => "The guide mode",
            'description' => "New to the control panel? The guide mode will assist you in learning how to use the control panel's different features with ease.",
            'icon' => "ico-support",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "guide_mode.auto_help.help",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'What is the guide mode?',
            'keyWords' => 'guide mode guidance control panel',
            'html' => <<<string
            <p>If you are new to the control panel, the guide mode feature provides the ultimate guidance for you on how to use all the control panel features and tools. Once you become fully aware of how to use the control panel, you can disable the guide mode.</p>
            <p>To go to guide mode settings, click on <b>Settings</b> in the control panel menu, then select <a>Control panel settings</a>.</p>
            <p>A page will open containing several tabs. Among these tabs, locate and tap on <b>Guide mode settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/settings_page_tabs.png" />
            <p>In this section of the control panel settings, you can modify certain aspects of the guide mode for your account by enabling or disabling these buttons.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/guide_mode_settings.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'How to enable the guide mode?',
            'keyWords' => 'auto help guide mode alert',
            'html' => <<<string
            <p>The guide mode is enabled by default to assist you while first navigating the control panel. When it's enabled, a window called <b>Guide tip</b> appears on the right side of the screen, displaying the guide mode responses.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/guide_tip.png" />
            <p>
            <div>There are three main tools in the guide mode:</div>
            <div>
            <ul>
            <li>Auto help</li>
            <li>Help icons</li>
            <li>Guide alerts</li>
            </ul>
            </div>
            </p>
            <p>To disable the guide mode, switch off the <b>Enable guide mode</b> button, or you can switch on the button to enable it again. You can also switch the guide mode button on or off by using the hotkey shortcut (ctrl+G). </p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>If your screen width is less than 1360 pixels, the guide mode will be disabled automatically.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Auto help',
            'keyWords' => 'auto help instructions guide tip',
            'html' => <<<string
            <p>One of the guide mode features is the <b>Auto help</b>. When enabled, guide tips or instructions will appear in the guide tip area when you hover your mouse over something that may need additional clarification. These tips are there to explain how to use the different control panel features and tools.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/auto_help.png" />
            <p>To enable the auto help, switch on the <b>Enable auto help</b> button, or you can disable it by switching off the button. You can also switch the button on or off by using the hotkey shortcut (ctrl+H).</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>You can temporarily disable the Auto Help by holding down the 'S' key on your keyboard to remain on a specific guide tip and not have other guide tips appear as you hover above other objects randomly.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Help icons',
            'keyWords' => 'help getting started',
            'html' => <<<string
            <p>Help Icons are the question marks that appear beside various sections of the control panel. When you tap the help icon, a brief description of a specific section appears in the guide tip area.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/help_icon.png" />
            <p>To enable the help icons feature, switch on the <b>Show help icons</b> button, or switch off the button to disable it. You can also use the hotkey shortcut (ctrl+I) to switch the button on and off.</p>
            <div class="tipContainer tipContainer_red">
            <span class="ico-lamp"></span>
            <span>Note that if you have the guide mode disabled, you won't be able to enable the help icons and auto help.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Guide alerts',
            'keyWords' => 'guide alert notification',
            'html' => <<<string
            <p>The guide alerts warn you of any missing information or actions required to complete the next steps on your account or website. </p>
            <p>When guide alerts are enabled, an icon <span class="ico-warning"></span> will appear in the top-right corner of your screen's navigation bar. Tapping on this icon will open a drop-down menu displaying the alerts.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/guide_alert.png" />
            <p>To enable the guide alerts, switch on the <b>Enable guide alerts</b> button, or you can disable it by switching off the button. You can also switch the button on or off by using the hotkey shortcut (ctrl+A).</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Having the guide mode disabled doesn't switch off the guide alerts. The guide alerts have to be disabled separately.</span>
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
            <p>After making any changes, make sure to click on <b>Save</b> to avoid losing the changes, or click on <b>Cancel</b> to restore the last saved changes.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Any changes you make in the guide mode only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);


        help_en_sections::insert($sections);
    }
}
