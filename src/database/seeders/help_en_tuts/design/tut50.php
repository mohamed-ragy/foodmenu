<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut50 extends Seeder
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
        $helpTut = help_en_tut::where('id',50)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',50)->delete();
        help_en_tut::where('id',50)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>50,
            'sort' => 4,
            'title_id' => 'Homepage-Intro',
            'title' => 'Homepage Intro',
            'description' => 'Your website’s homepage intro section creates the first impression about your restaurant. This article will show you how to add content to your homepage’s intro.',
            'icon' => 'ico-basics',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>50,
            'title' => 'What is a homepage intro?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The homepage intro section gives a brief overview of the restaurant, its offerings, and the qualities that set it apart from others. It is the section that establishes the tone for the rest of the website and can make a difference in a visitor's decision to stay and explore the site, as it's the first piece of content your visitors will see when they visit your website.</div>
                <div class=\"sectionP\">To add the content to your homepage intro, go to the <b>Design</b> section of the control panel menu, then <b>Homepage sections</b>. A page will open displaying a number of blocks including <b>Homepage Intro</b>, by clicking on it, a window will open where you can add the text and image of your homepage intro.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>50,
            'title' => 'Adding the homepage intro content',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Homepage Intro</b> window, you can find an image card, and a couple of entry fields where you can enter the section's text.</div>
                <div class=\"sectionP\">When you click on the image card, a pop-up window will appear in which you can choose an image from the ones you've previously added to your account or upload a new one. This image will be used for the homepage intro section and will be displayed in a large size, so carefully choose a visually appealing image that matches your restaurant's theme and brand image.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that some templates support images with transparent backgrounds, while others support images with non-transparent backgrounds. Make sure the image you're uploading is the correct image type for the template you've chosen.</div>
                </div>
                <div class=\"sectionP\">You can enter the title and description of your homepage intro section in the <b>Intro Title</b>  and <b>Intro Description</b> entry boxes in the languages you've chosen for your website. Simply enter the text into the corresponding input boxes for each language. </div>
                <div class=\"sectionP\">After adding the image and text or making any modifications, click on the <b>Save</b> button to successfully apply the content to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can add the homepage intro content and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);



        help_en_text::insert($tutsTexts);
    }
}
