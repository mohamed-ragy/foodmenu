<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut55 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $upRates;
    protected $downRates;

    public function run()
    {
        $helpTut = help_en_tut::where('id',55)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',55)->delete();
        help_en_tut::where('id',55)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>55,
            'sort' => 9,
            'title_id' => 'Your-website-colors',
            'title' => 'Your website colors',
            'description' => 'Using our coloring system, you can create a polished and professional website that reflects your brand’s theme. Check this article to learn how to adjust your website colors.',
            'icon' => 'ico-website_colors',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>55,
            'title' => 'Your website coloring system',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The design and coloring of your website are important for creating a cohesive and visually appealing website. At foodmenu, we've made it easy for you to choose your website colors by offering several ready-made color sets designed to complement one another flawlessly.</div>
                <div class=\"sectionP\">To adjust your website colors, go to the <b>Design</b> section of the control panel menu, then <b>Website Colors</b>. A page will open displaying all the color sets you can apply to your website template.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>55,
            'title' => 'Website Color Sets',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Website Colors</b> window, you can find a list of color sets you can apply to your website. To select a color set, check the box next to the desired set.</div>
                <div class=\"sectionP\">A color set consists of eight distinct colors, each of which serves a specific function, as follows:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Color 1 is the primary color.</li>
                    <li style=\"margin-bottom:.5em;\">Color 2 serves as the secondary color.</li>
                    <li style=\"margin-bottom:.5em;\">Color 3 is typically used as the background color for page elements, while also functioning as the text color when text overlays color 1, making it necessary for color 1 and color 3 to be in contrasting shades from one another.</li>
                    <li style=\"margin-bottom:.5em;\">Color 4 is the text color over color 3, requiring the two colors to be in contrasting shades.</li>
                    <li style=\"margin-bottom:.5em;\">Color 5 is the text color over color 2, making it also necessary for the two colors to be in contrasting shades.</li>
                    <li style=\"margin-bottom:.5em;\">Colors 6, 7, and 8 are used as the text colors for error, success, and warning messages, respectively.</li>
                    <li style=\"margin-bottom:.5em;\">Color 9 is reserved for the product rating stars.</li>
                </ul>
                <div class=\"sectionP\">After choosing the color set that matches your restaurant’s theme, click on the <b>Save</b> button to successfully apply the color set to your website template. To restore the last saved color set, click on <b>Cancel</b>.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>55,
            'title' => 'Customizing your own color set',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Using the <b>Custom Colors</b> window, you can create your very own color set, taking into consideration each color’s function on your website as mentioned above. To select a color for one of the website colors, click on the color type (i.e. color 1, color 2, etc.) to open a color picker where you can select a color shade or enter a color's hex code.</div>
                <div class=\"sectionP\">To create a dark theme for your website, you can make color 3 dark and color 4 light, whereas for a light theme, color 3 should be light and color 4 should be dark. To ensure an attractive appearance for your website, it's important to have a strong contrast between colors 3 and 4.</div>
                <div class=\"sectionP\">To apply the custom colors to your website template instead of a color set, switch on the <b>Use Custom Colors</b> button. If you change your mind and want to use the last color set instead of the custom colors, switch off the <b>Use Custom Colors</b> button.</div>
                <div class=\"sectionP\">To apply any changes you have made in the <b>Custom Colors</b> settings, click on the <b>Save</b> button, or click on <b>Cancel</b> to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the website color settings, and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
