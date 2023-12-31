<?php

namespace Database\Factories;

use App\Models\order;
use Illuminate\Database\Eloquent\Factories\Factory;

class orderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
       
        return [
            'notice'=>$this->faker->sentences(1,true),

        ];
    }
}
