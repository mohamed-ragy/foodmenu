<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut54 extends Seeder
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
        $helpTut = help_en_tut::where('id',54)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',54)->delete();
        help_en_tut::where('id',54)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>54,
            'sort' => 8,
            'title_id' => 'Your-Website-Gallery',
            'title' => 'Your Website Gallery',
            'description' => 'An appealing image gallery on your website will easily draw your visitors attention and create an engaging experience for them. This article will teach you how to add images to your homepage’s gallery section.',
            'icon' => 'ico-images',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>54,
            'title' => 'The Importance of an Image Gallery on your Website',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The image gallery section of your website can be a powerful tool for showcasing your products, services, and brand personality by uploading your best-captured images. Using the gallery feature, you can create an experience that helps your website visitors envision themselves enjoying your food and the overall atmosphere of your restaurant.</div>
                <div class=\"sectionP\">The placement and layout of the <b>Gallery</b> section on your homepage vary depending on the website template you have chosen. </div>
                <div class=\"sectionP\">To add images to your homepage gallery section, go to the <b>Design</b> section of the control panel menu, then <b>Homepage sections</b>. A page will open displaying a number of blocks including <b>Gallery</b>. By clicking on it, a window will open where you can add and choose the images that will get displayed on your website's gallery.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>54,
            'title' => 'Your Gallery Images',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Gallery</b> window, you will be able to add images by clicking on the image card. When you click on the image card, a pop-up window will appear in which you can choose an image from the ones you've previously added to your account or upload a new one. After choosing an image, click on the <b>Add</b> button.</div>
                <div class=\"sectionP\">After adding an image or more, they will be displayed in the <b>Gallery Images</b> area as image cards. Each card contains a <b>Drag and Drop</b> icon <span class='ico-move'></span> for sorting the images in the order they will appear on your website and a <b>Remove</b> icon <span class='ico-close'></span> for permanently deleting an image from your website's gallery.</div>
                <div class=\"sectionP\">When you have added the desired gallery images and adjusted them, click on the <b>Save</b> button to apply the changes to your website, or click on <b>Cancel</b> to restore the last saved settings.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the homepage Gallery settings, and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
