<?php

namespace Database\Factories;

use App\Models\product;
use App\Models\product_review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class product_reviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = product_review::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $products_count = product::where('website_id',1)->count();
        $usersCount = User::where('website_id',1)->count();
        return [
            'website_id'=>1,
            'product_id' => random_int(1,$products_count),
            'user_id' => random_int(1,$usersCount),
            'rate'=> random_int(1,5),
            'title' => $this->faker->sentences(1,true),
            'review'=> $this->faker->sentences(random_int(1,5),true),
            'posted_at' => $this->faker->dateTimeBetween('-4 months'),
        ];
    }
}
