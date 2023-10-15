<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut48 extends Seeder
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
        $helpTut = help_en_tut::where('id',48)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',48)->delete();
        help_en_tut::where('id',48)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>48,
            'sort' => 2,
            'title_id' => 'Your-Account-Images',
            'title' => 'Your Account Images',
            'description' => 'In this article, you’ll understand how to upload new images to your account and manage your account images to enhance your restaurant’s online presence.',
            'icon' => 'ico-images',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>48,
            'title' => 'Your Account Images',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Having high-quality images of the food you serve, restaurant space, and other offerings is important for attracting customers. Uploading these images to your account serves as a photo library for your restaurant, which allows you to easily access and add images to various parts of your website, such as (hc: product images), (hc: a restaurant gallery), (hc: a slideshow), and more. Even if you don't need the images right away, it's always a good idea to have them available in your account for future use. By doing so, you can avoid the hassle of having to search for the images on a specific device, and you can quickly upload them to your website at any time.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>2,
            'help_en_tut_id' =>48,
            'title' => 'How to upload new images?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To upload images to your account, go to the <b>Design</b> section of the control panel menu, then <b>Images</b>. A page will open displaying all images you have previously added to your account in the form of image cards.</div>
                <div class=\"sectionP\">By clicking on the <b>Upload New image</b> button, you will be able to add images from your device to your account right away.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Please keep in mind that images larger than 10 megabytes cannot be uploaded. Additionally, the types of images that can be uploaded are only png, jpg, jpeg, gif, bmp, and webp.</div>
                </div>
                <div class=\"sectionP\">You can see how much space you're taking up from the image's storage size so far at the top of the window, as well as how much storage space you have left for images. Keep an eye on your storage space and consider deleting older images that are no longer relevant to make room for new ones.</div>
            </div>
            ",
        ]);

        array_push($tutsTexts,[
            'sort'=>3,
            'help_en_tut_id' =>48,
            'title' => 'Image Cards',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Upon uploading new images, they appear as image cards. Each image card contains the main information about the image, which is the following:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">Image name</li>
                    <li style=\"margin-bottom:.5em;\">Image file type</li>
                    <li style=\"margin-bottom:.5em;\">Image size and dimensions</li>
                    <li style=\"margin-bottom:.5em;\">Image upload date</li>
                </ul>
                <div class=\"sectionP\">When you hover your mouse over an image card, four buttons appear, which are:</div>
                <ol>
                    <li style=\"margin-bottom:.5em;\"><b>Preview</b>: this button allows you to see the image in full size. This is helpful when you want to have a closer look at an image before deciding whether to use it or not on your website.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Download</b>: through this button, you can instantly save the image to your device. </li>
                    <li style=\"margin-bottom:.5em;\"><b>Copy Link</b>: this button copies the image link to the clipboard. This means you can paste it wherever you want, whether on your social media platforms or anywhere else. It's a useful feature when you want to share an image quickly and easily.</li>
                    <li style=\"margin-bottom:.5em;\"><b>Delete</b>: you can permanently delete an image from your account using this button. It's worth noting, however, that attempting to delete an image used anywhere on your website will result in a failure to delete the image.</li>
                </ol>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Note that only the main account can upload images and sub-accounts that have the authority to manage images and website design.</div>
                </div>
            </div>
            ",
        ]);

        help_en_text::insert($tutsTexts);
    }
}
