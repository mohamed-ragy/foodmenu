<?php
namespace App\Models;

class templates_data
{
    public static function colors(){
        $color_palettes = [];
        for($x=0;$x<=100;$x++){
            array_push($color_palettes,[
                'c1' => ['r'=>random_int(0,255), 'g'=>random_int(0,255), 'b'=>random_int(0,255)],
                'c2' => ['r'=>random_int(0,255), 'g'=>random_int(0,255), 'b'=>random_int(0,255)],
                'c3' => ['r'=>random_int(0,255), 'g'=>random_int(0,255), 'b'=>random_int(0,255)],
                'c4' => ['r'=>random_int(0,255), 'g'=>random_int(0,255), 'b'=>random_int(0,255)],
            ]);
        }
        return $color_palettes;
    }

    public static function fonts(){
        return [
            '0' => ['title'=>'inter','paragraph'=>'Nunito'],
            '1' => ['title'=>'rubik','paragraph'=>'signikaNegative'],
            '2' => ['title'=>'playfairDisplay','paragraph'=>'Nunito'],
        ];
    }
}
