<?php

namespace Database\Seeders\articles_en\settings;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;


class adjusting_the_control_panel_view extends Seeder // please replace the article_id with the article title_id
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $title_id = 'adjusting_the_control_panel_view';// make sure that the article id is unique
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
            'title' => "Adjusting the control panel view",
            'description' => "Enhance your comfort while managing your account by customizing your control panel view with view settings.",
            'icon' => "ico-menu1",// i will set the icon unit i will provide you a list of all the icons
            'category' => "system-and-settings",//['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
            'keyWords' => "control_panel.view_settings",//the article keywords spreat them using .
            'rating' => 0,
        ]);
        $sort = 0;

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'View settings',
            'keyWords' => 'control panel view settings',
            'html' => <<<string
            <p>The control panel view settings enable you to manage the appearance of certain elements within your account.</p>
            <p>To go to <b>View settings</b>, click on <b>Settings</b> in the control panel menu, then select <a>Control panel settings</a>.</p>
            <p>A page will open containing several tabs. Among these tabs, locate and tap on <b>View settings</b>.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/settings_page_tabs.png" />
            <p>In this section of the control panel settings, you will be able to adjust a few settings by enabling or disabling these buttons.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/view_settings.png" />
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Navigation side menu',
            'keyWords' => 'navigation bar menu',
            'html' => <<<string
            <p>The navigation side menu found on the left side of the screen, helps you navigate to all sections of the control panel.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/navigation_bar.png" />
            <p>When you switch on the <b>Expand navigation side menu</b> button, the side menu will be expanded enough to display each section title.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/expanded_navigation_bar.png" />
            <p> If you switch off the button, the width of the side menu is minimized to show only the descriptive icon for each section.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/minimzed_navigation_bar.png" />
            <p>If your screen width is less than 720 pixels, the side menu completely disappears. Instead, you'll see a button displaying navigation bar icons. When you click this button, a drop-down menu with all of the control panel's sections appears.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/navbar_mobileview.png" />
            <p>You can also switch the button on or off using the hotkey (ctrl+M).</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>You won't be able to expand the navigation side menu if the screen width is less than 1024 pixels.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Status bar',
            'keyWords' => 'status bar alert messages',
            'html' => <<<string
            <p>The status bar, located at the bottom of the control panel, is a horizontal bar that displays alert messages. Each message remains in the status bar until a new one replaces it.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/status_bar.png" />
            <p>When you switch on the <b>Show status bar</b> button, the bar will appear with every alert message, or you can choose to disable this feature by switching off the button.</p>
            <p>You can also switch on or off the button using the hotkey shortcut (ctrl+S).</p>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Hotkey shortcuts',
            'keyWords' => 'hotkey',
            'html' => <<<string
            <p>Hotkey shortcuts are key combinations on your computer's keyboard that you can use to quickly perform control panel actions. </p>
            <p>However, only some of the control panel actions can be performed using the keyboard shortcuts, and these actions will show their corresponding shortcuts as small text beside them. </p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>To view all hotkey shortcuts for actions on the control panel, press ‘F1' on your keyboard.</span>
            </div>
            <p>The hotkey shortcut text will be visible on the control panel when you switch on the <b>Show hotkey shortcuts</b> button. </p>
            <img class="articleImg" src="/storage/imgs/help/articles/hotkey_shortcut.png" />
            <p>Or, you can disable the visibility of the shortcut text when you switch off the button. You can also switch on or off the button using the hotkey shortcut (ctrl+S).</p>
            <div class="tipContainer tipContainer_orange">
            <span class="ico-lamp"></span>
            <span>Keep in mind that you can still use the hotkey shortcuts even if you have the <b>Show hotkey shortcuts</b> button switched off.</span>
            </div>
            string,
        ]);

        //
        $sort++;
        array_push($sections,[
            'sort'=>$sort,
            'article_id' => $article->id,
            'title' => 'Dark mode',
            'keyWords' => 'dark mode theme',
            'html' => <<<string
            <p>You can change the control panel theme to a darker appearance by switching on the <b>Enable dark mode</b> button.</p>
            <img class="articleImg" src="/storage/imgs/help/articles/dark_mode.png" />
            <p>
            To disable the dark mode and return to the light mode switch off the button.
            You can also use the hotkey shortcut (ctrl+D) to switch the <b>Enable dark mode</b> button on and off.
            </p>
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
            <p>After making any changes to the view settings, click on <b>Save</b> to avoid losing the changes, or click on <b>Cancel</b> to restore the last saved changes.</p>
            <div class="tipContainer tipContainer_green">
            <span class="ico-lamp"></span>
            <span>Any changes you apply to the view settings only affect your main account, or if you're using a sub-account, the changes only apply to that account.</span>
            </div>
            string,
        ]);

        help_en_sections::insert($sections);
    }
}
