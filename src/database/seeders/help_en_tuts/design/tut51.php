<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut51 extends Seeder
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
        $helpTut = help_en_tut::where('id',51)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',51)->delete();
        help_en_tut::where('id',51)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>51,
            'sort' => 5,
            'title_id' => 'Your-homepage-info-section',
            'title' => 'Your homepage info section',
            'description' => 'An info section that is well-written and visually pleasing can be a valuable tool for informing website visitors about you and promoting your restaurant’s brand. This article will show you how to add content to your homepage’s info section.',
            'icon' => 'ico-info',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>51,
            'title' => 'What is an info section?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Your homepage info section serves as the primary area for visitors to quickly learn about your restaurant and its offerings. This section typically includes an image and accompanying brief text. You may want to include your restaurant's key features, such as your cuisine, atmosphere, and unique qualities. </div>
                <div class=\"sectionP\">The Info section is one or more sections on your homepage; the number of sections available and their layout differ depending on the website template you've chosen.</div>
                <div class=\"sectionP\">To add the content to your homepage info section, go to the <b>Design</b> section of the control panel menu, then <b>Homepage sections</b>. A page will open displaying a number of blocks including <b>Info</b>, by clicking on it, a window will open where you can add the text and image of your intro section.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>51,
            'title' => 'Adding the info section content',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Info</b> window, you can find an image card, and a couple of entry fields where you can enter the section's text.</div>
                <div class=\"sectionP\">When you click on the image card, a pop-up window will appear in which you can select an image from those you've previously added to your account or upload a new one. This image will be used for the homepage info section, so make sure it corresponds to what you're discussing in the accompanying text.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that some templates support images with transparent backgrounds, while others support images with non-transparent backgrounds. Make sure the image you're uploading is the correct image type for the template you've chosen.</div>
                </div>
                <div class=\"sectionP\">In the  <b>Info Title</b> and <b>Info Description</b> entry boxes, you can enter the title and description of your info section in the languages you've chosen for your website. Simply enter the text into the corresponding input boxes for each language. </div>
                <div class=\"sectionP\">After adding the image and text or making any modifications, click on the <b>Save</b> button to successfully apply the content to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can add the homepage info content and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);


        help_en_text::insert($tutsTexts);
    }
}
