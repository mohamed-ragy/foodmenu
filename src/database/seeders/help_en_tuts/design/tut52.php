<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut52 extends Seeder
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
        $helpTut = help_en_tut::where('id',52)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',52)->delete();
        help_en_tut::where('id',52)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>52,
            'sort' => 6,
            'title_id' => 'Our-story-section',
            'title' => 'Our story section',
            'description' => 'The "Our Story" section of a website’s homepage is a dedicated area that gives visitors information about the restaurant’s journey and values. In this article, you’ll learn more about this section’s importance and how to add content to it.',
            'icon' => 'ico-description ',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>52,
            'title' => 'What is an “our story” section?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The ”Our Story” section of your homepage is where visitors can learn more about your restaurant's history, founders, and the story behind establishing it. It's a great way to connect with customers and build a connection that goes beyond the food and service by showing the human side of the business. By sharing the restaurant's story, customers can gain a better understanding of what makes your restaurant unique and why they should choose to dine there.</div>
                <div class=\"sectionP\">The placement and design of the “Our Story” section on your homepage vary depending on the website template you have chosen. The section includes an image and accompanying text. Carefully choose text that allows your restaurant to distinguish itself from competitors and show off its values and brand identity.</div>
                <div class=\"sectionP\">To add the content to your “our story” section, go to the <b>Design</b> section of the control panel menu, then <b>Homepage sections</b>. A page will open displaying a number of blocks including <b>Our Story</b>, by clicking on it, a window will open where you can add the text and image of the <b>Our Story</b> section.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>52,
            'title' => 'Adding the “Our Story” section content',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Our Story</b> window, you can find an image card, and a couple of entry fields where you can enter the section's text.</div>
                <div class=\"sectionP\">When you click on the image card, a pop-up window will appear in which you can choose an image from the ones you've previously added to your account or upload a new one. This image will be used for the ”Our Story” section, so carefully choose an image that represents your restaurant in a positive light.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Keep in mind that some templates support images with transparent backgrounds, while others support images with non-transparent backgrounds. Make sure the image you're uploading is the correct image type for the template you've chosen.</div>
                </div>
                <div class=\"sectionP\">In the <b>Our story Title</b> and <b>Our story Description</b> entry boxes, you can enter the title and description of your section in the languages you've chosen before for your website. Simply enter the text into the corresponding input boxes for each language.</div>
                <div class=\"sectionP\">After adding the image and text or making any modifications, click on the <b>Save</b> button to successfully apply the content to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can add the homepage “our story” content and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
