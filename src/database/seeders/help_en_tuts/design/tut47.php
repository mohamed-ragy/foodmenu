<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut47 extends Seeder
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
        $helpTut = help_en_tut::where('id',47)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',47)->delete();
        help_en_tut::where('id',47)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>47,
            'sort' => 1,
            'title_id' => 'Website-Templates',
            'title' => 'Website Templates',
            'description' => 'Website templates are pre-built websites to which you can directly add your restaurant content to create a professionally structured and well-designed website in minutes.',
            'icon' => 'ico-templates',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>47,
            'title' => 'What is a website template?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Website templates are pre-designed websites that are complete in terms of website layout and sections. All you have to do is add text and images to the template to create your own well-designed website. Using templates relieves you of the burden of dealing with coding when building a website because our templates are built and coded in a way that allows you to have the website and add your content instantaneously without the use of coding.</div>
                <div class=\"sectionP\">At Foodmenu, we dedicate our services to restaurants solely to have everything customized to restaurant owners' needs. Hence, our website templates are customized to include services that cater to the needs of restaurants.</div>
                <div class=\"sectionP\">To select a template for your website, go to the <b>Design</b> section of the control panel menu, then <a target=\"_blank\" href=\"https://cpanel.food-menu.net/?page=Templates\">Templates</a>. </div>
                <div class=\"sectionP\">A page will open, displaying first a <b>Current Template</b> window that shows the template you currently have in place in the form of a template card.</div>
                <div class=\"sectionP\">Then, you’ll find another window labeled <b>Templates</b> where you can browse and search for all of the templates we provide.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>47,
            'title' => 'How to use a website template?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Templates</b> window, you’re provided with a <b>Templates Categories</b> input list that contains all the restaurant templates categorized based on cuisines or restaurant types. By selecting a category, all templates within it will be displayed as cards where you can select a template to use for your website.</div>
                <div class=\"sectionP\">Template categories don't imply that you need to choose a template with the same restaurant type as yours, as you can change the template's images, visuals, and text. However, they are suggested themes for various restaurant types to make the template selection process easier.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>47,
            'title' => 'Template Cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A template card shows a small preview of the template theme so you can see how it looks as an interactive website. Below the template preview, you'll notice a number of icons that represent website homepage sections. These icons are used to indicate which homepage sections are included or not in that template. The icons are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">(hc: Homepage Intro <span class='ico-basics'></span>)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Slideshow <span class='ico-slideshow'></span>)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Info <span class='ico-info'></span>)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Our Story <span class='ico-description'></span>)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Gallery <span class='ico-images'></span>)</li>
                </ul>
                <div class=\"sectionP\">When a checkmark appears next to an icon, it indicates that the website section represented by that icon is part of the template. A cross mark next to an icon indicates that the website section represented by that icon is not included in the template.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Some templates support images with non-transparent backgrounds while others only support images with transparent backgrounds. If a template only supports images with transparent backgrounds, this will be noted on the template card.</div>
                </div>
                <div class=\"sectionP\">On the template cards, you’re provided with two vital buttons, which are the <b>Live Preview</b> and <b>Apply</b> buttons. When you click on the <b>Live Preview</b> button, you will be able to preview the website template as a dynamic website and interact with the website components.</div>
                <div class=\"sectionP\">After browsing and finding a template that suits what you're looking for, click on the <b>Apply</b> button to use the template on your website.</div>
                <div class=\"sectionP\">You can also follow the same steps if you already have a template in place, and all of the text, images, and content you included in the old template will be reflected on the new template without any additional steps.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can apply website templates and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);



        help_en_text::insert($tutsTexts);
    }
}
