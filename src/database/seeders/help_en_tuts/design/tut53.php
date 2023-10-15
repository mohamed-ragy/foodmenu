<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut53 extends Seeder
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
        $helpTut = help_en_tut::where('id',53)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',53)->delete();
        help_en_tut::where('id',53)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>53,
            'sort' => 7,
            'title_id' => 'Your-homepages-slideshow-section',
            'title' => 'Your homepage’s slideshow section',
            'description' => 'The slideshow section on your website’s homepage can be a powerful tool for capturing your visitors’ attention and highlighting your best food items and services. Check out this article to learn more about adding content to a slideshow on your website.',
            'icon' => 'ico-slideshow',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>53,
            'title' => 'What is the slideshow feature and how to use it?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The Slideshow is a useful section on your website's homepage that allows you to display a series of images that you choose and switch between them in a way that only displays one image at a time. Having a slideshow section can be a great way to showcase your food items or even the atmosphere of your restaurant while also providing an engaging user experience for your visitors.</div>
                <div class=\"sectionP\">The layout and appearance of the slideshow on your homepage may differ, depending on the website template you have chosen for your restaurant.</div>
                <div class=\"sectionP\">To add images to the slideshow section, go to the <b>Design</b> section of the control panel menu, then <b>Homepage sections</b>. A page will open displaying a number of blocks including <b>Slideshow</b>, by clicking on it, a window will open where you can add the desired images and adjust the slideshow settings.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>53,
            'title' => 'Adding images to the slideshow',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">In the <b>Slideshow</b> window, the images you add to your slideshow will appear in the form of cards.</div>
                <div class=\"sectionP\">To add a new image, click on the <b>Add New Image</b> button to open a pop-up window where you'll find a couple of entry fields for adding an image and its details to the slideshow.</div>
                <div class=\"sectionP\">First, you’ll want to choose the slideshow image. By clicking on the image card, you can either select an image from the ones you have previously added to your account or upload a new one.</div>
                <div class=\"sectionP\">Next, you'll want to add some details about the image. In the <b>Image Title</b> and <b>Image Description</b> entry boxes, enter the title and description of the image in the languages you have selected for your website. This can be used to provide additional information or highlight specific features of the image.</div>
                <div class=\"sectionP\">Then, you’ll have the option to include a link related to the image by adding the link in the <b>Image Links</b> entry fields in the languages you have selected for your website. This link opens when a website visitor clicks on the slideshow image. </div>
                <div class=\"sectionP\">By using the <b>Open the link in a new tab</b> switch button, you can choose whether you want the link to open in a new tab or the same tab. When you switch on the button, the link will open in a new tab; when you switch off the button, the opposite happens.</div>
                <div class=\"sectionP\">Alternatively, you can choose an existing product on your account to be displayed on your slideshow. To do this, you can use the input list provided in the <b>Add from a product</b> section. Once you choose a product from the list, all the relevant information and images associated with the product will automatically be filled in the necessary fields.</div>
                <div class=\"sectionP\">After choosing the slideshow image and creating its details, click on the <b>Add</b> button to successfully add the image to your homepage’s slideshow.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Following the above steps and adding an image to the slideshow, the changes will not be applied to your website until you click on the <b>Save</b> button in the <b>Slideshow</b> window.</div>
                </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>53,
            'title' => 'Slideshow Image Cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When you add images to the slideshow, they will appear as image cards. Each image card includes three icons for managing each image in the slideshow.</div>
                <div class=\"sectionP\">The <b>Drag and Drop</b> icon <span class='ico-move'></span> is used to arrange the images in the slideshow in the order they will appear on your website. The <b>Edit</b> icon <span class='ico-edit'></span> lets you change the image's details, whereas the <b>Remove</b> icon <span class='ico-close'></span> lets you remove an image from the slideshow.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>4,
            'help_en_tut_id' =>53,
            'title' => 'Slideshow Interval',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The <b>Slideshow</b> Interval number picker allows you to adjust the time interval between each image displayed. With this feature, you can easily set the time interval in seconds to your desired length and create a slideshow that flows smoothly and captures your audience's attention. </div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>5,
            'help_en_tut_id' =>53,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Once you have made any changes to the Slideshow settings, click on the<b>Save</b> button to save the changes to your website template. If you want to go back to the last saved settings, simply click on the <b>Cancel</b> button.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can make changes to the homepage slideshow settings, and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
