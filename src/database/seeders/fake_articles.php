<?php

namespace Database\Seeders;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use Illuminate\Database\Seeder;
use Faker\Generator;
use Illuminate\Container\Container;

class fake_articles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $faker;
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }
    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }
    public function run()
    {
        help_en_articles::where('id','!=',null)->delete();
        help_en_sections::where('id','!=',null)->delete();
        $categories = ['getting-started','basics','security','ordering-system','statistics-and-analytics','products-and-categories','website-users','website-design','system-and-settings','my-staff','billing-center'];
        $icons = ['dashboard','home','activity_log','statistics_and_analytics','restaurant_expenses','financial_reports','security','password','email_address','phone_number','sub_accounts','orders','categories','products','product_reviews','users','website_colors','home_page_sections','languages','home_delivery_settings','control_panel_settings','order_pickup_settings','dine_in_settings','promo_codes','support','submit_a_help_ticket','billing','logout','print','share','edit','star','address','card'];
        $keywords = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
        foreach($categories as $category){
            for($x = 1; $x <= random_int(5,15); $x++){
                $random_keywords = array_rand($keywords,3);
                $title = $this->faker->sentence();
                $title_id = str_replace(' ','_',$title);
                $title_id = str_replace('.','',$title_id);
                $article = help_en_articles::create([
                    'sort' => $x,
                    'title' => $title,
                    'title_id' => $title_id,
                    'description' => $this->faker->paragraph(1),
                    'icon' => 'ico-'.$icons[array_rand($icons, 1)],
                    'category' => $categories[array_rand($categories, 1)],
                    'keyWords' => $keywords[$random_keywords[0]].'.'.$keywords[$random_keywords[1]].'.'.$keywords[$random_keywords[2]],
                    'rating' => 0,
                ]);
                for($y=1;$y<=random_int(3,7);$y++){
                    $random_keywords = array_rand($keywords,3);
                    help_en_sections::create([
                        'sort'=>$y,
                        'article_id' => $article->id,
                        'title' => $this->faker->sentence(),
                        'keyWords' => $keywords[$random_keywords[0]].' '.$keywords[$random_keywords[1]].' '.$keywords[$random_keywords[2]],
                        'html' => $this->faker->text(random_int(100,1000)),
                    ]);
                }
            }
        }
    }
}
