<?php

namespace Database\Seeders\help_en_tuts\design;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut49 extends Seeder
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
        $helpTut = help_en_tut::where('id',49)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',49)->delete();
        help_en_tut::where('id',49)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>49,
            'sort' => 3,
            'title_id' => 'Your-website-homepage-sections',
            'title' => 'Your website homepage sections',
            'description' => 'Homepage sections that are well-structured and properly managed help visitors find what they’re looking for quickly and efficiently.',
            'icon' => 'ico-home_page_sections',
            'helpCat' => 'website-design',
            'keyWords' => 'design',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);
        array_push($tutsTexts,[
            'sort'=>1,
            'help_en_tut_id' =>49,
            'title' => 'Why are website homepage sections important?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">Homepage sections allow for a more organized and visually appealing website layout, making it easier for website visitors to navigate the website and remain engaged with your homepage content.</div>
                <div class=\"sectionP\">At Foodmenu, website templates come with ready-made homepage sections that require no further designing or structuring, allowing you to simply add your text and images to the homepage sections to create a custom website that looks and functions great.</div>
                <div class=\"sectionP\">The homepage sections contained within the (hc: website templates) we provide are:</div>
                <ul>
                    <li style=\"margin-bottom:.5em;\">(hc: Homepage Intro)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Slideshow)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Info)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Our Story)</li>
                    <li style=\"margin-bottom:.5em;\">(hc: Gallery)</li>
                </ul>
                <div class=\"sectionP\">Keep in mind that the placement and design of each homepage section may vary depending on the chosen template. Also, not all templates may have all the sections mentioned above. Hence, you should carefully choose the website template that suits your needs and contains the desired homepage sections.</div>
            </div>
            ",
        ]);



        help_en_text::insert($tutsTexts);
    }
}
