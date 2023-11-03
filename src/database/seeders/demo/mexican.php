<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class mexican extends Seeder
{

    public function run()
    {
        $mexican = new stdClass();
        $mexican->domainName = 'mexican';
        $mexican->template = 13;
        $mexican->website_names = [
            'en' => 'Mexican Restaurant',
            'ar' => 'مطعم مكسيكي',
            'fr' => 'Restaurant mexicain',
            'de' => 'Mexikanisches Restaurant',
            'it' => 'Ristorante messicano',
            'es' => 'Restaurante mexicano',
            'ua' => 'мексиканський ресторан',
            'ru' => '',
        ];
        $mexican->intro = [
            'en' => 'Street-style savory, homely freshness',
            'ar' => 'مالح على طراز الشارع ، ونضارة منزلية',
            'fr' => 'Savoureuse street-style, fraîcheur familiale',
            'de' => 'Straßentypische, wohlschmeckende, heimelige Frische',
            'it' => 'Sapore street, freschezza casalinga',
            'es' => 'Frescura hogareña y sabrosa al estilo de la calle.',
            'ua' => 'Вулична пікантність, домашня свіжість',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'tacos',
                'imgUrl' => 'imgs/demo/mexican/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/mexican/cat1_thumbnail.webp',
                'name_en' => 'Tacos',
                'name_ar' => 'تاكو',
                'name_fr' => 'Tacos',
                'name_it' => 'Tacos',
                'name_de' => 'Tacos',
                'name_es' => 'tacos',
                'name_ua' => 'Тако',
                'products' => [
                    [
                        'name' => 'barbeque-beef-taco',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/mexican/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Barbeque Beef Taco',
                        'name_ar' => 'باربيكيو بيف تاكو',
                        'name_fr' => 'Taco au boeuf barbecue',
                        'name_it' => 'Taco di manzo alla griglia',
                        'name_de' => 'Grill-Rindfleisch-Taco',
                        'name_es' => 'Taco de carne a la barbacoa',
                        'name_ua' => 'Барбекю з яловичини Тако',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'lime-chicken-taco',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/mexican/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Lime Chicken Taco',
                        'name_ar' => 'تاكو دجاج لايم',
                        'name_fr' => 'Taco au poulet à la lime',
                        'name_it' => 'Taco Di Pollo Al Lime',
                        'name_de' => 'Limetten-Hähnchen-Taco',
                        'name_es' => 'Taco de pollo con lima',
                        'name_ua' => 'Лаймове куряче тако',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'ground-beef-taco',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/mexican/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Ground Beef Taco',
                        'name_ar' => 'تاكو لحم مفروم',
                        'name_fr' => 'Tacos au bœuf haché',
                        'name_it' => 'Tacos Di Manzo Macinato',
                        'name_de' => 'Hackfleisch-Taco',
                        'name_es' => 'Taco de carne molida',
                        'name_ua' => 'Тако з яловичого фаршу',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                ]
            ],
            [
                'name' => 'quesadillas',
                'imgUrl' => 'imgs/demo/mexican/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/mexican/cat2_thumbnail.webp',
                'name_en' => 'Quesadillas',
                'name_ar' => 'كاساديا',
                'name_fr' => 'Quesadillas',
                'name_it' => 'quesadillas',
                'name_de' => 'Quesadillas',
                'name_es' => 'quesadillas',
                'name_ua' => 'Кесаділья',
                'products' => [
                    [
                        'name' => 'beef-crunchwrap-quesadilla',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/mexican/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Beef Crunchwrap Quesadilla',
                        'name_ar' => 'كاساديا لحم كرنشراب',
                        'name_fr' => 'Quesadilla au boeuf croustillant',
                        'name_it' => 'Quesadilla croccante di manzo',
                        'name_de' => 'Rindfleisch Crunchwrap Quesadilla',
                        'name_es' => 'Quesadilla Crunchwrap De Res',
                        'name_ua' => 'Яловичина Crunchwrap Quesadilla',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'paprika-chicken-quesadilla',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/mexican/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Paprika Chicken Quesadilla',
                        'name_ar' => 'كاساديا دجاج بابريكا',
                        'name_fr' => 'Quesadilla au poulet paprika',
                        'name_it' => 'Quesadilla di pollo alla paprika',
                        'name_de' => 'Paprika-Hähnchen-Quesadilla',
                        'name_es' => 'Quesadilla de pollo con pimentón',
                        'name_ua' => 'Куряча кесаділья з перцем',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'burritos',
                'imgUrl' => 'imgs/demo/mexican/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/mexican/cat3_thumbnail.webp',
                'name_en' => 'Burritos',
                'name_ar' => 'بوريتوس',
                'name_fr' => 'Burrito',
                'name_it' => 'Burrito',
                'name_de' => 'Burritos',
                'name_es' => 'burritos',
                'name_ua' => 'Буріто',
                'products' => [
                    [
                        'name' => 'beef-burrito',
                        'price' => 11,
                        'imgUrl' => 'imgs/demo/mexican/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Beef Burrito',
                        'name_ar' => 'لحم البقر بوريتو',
                        'name_fr' => 'Burrito au boeuf',
                        'name_it' => 'Burrito Di Manzo',
                        'name_de' => 'Rindfleisch Burrito',
                        'name_es' => 'Burrito de carne',
                        'name_ua' => 'Буріто з яловичини',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'spicy',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Spicy',
                                        'name_ar' => 'حار',
                                        'name_fr' => 'Épicé',
                                        'name_it' => 'Speziato',
                                        'name_de' => 'Würzig',
                                        'name_es' => 'Picante',
                                        'name_ua' => 'Пряний',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'chicken-burrito-',
                        'price' => 9,
                        'imgUrl' => 'imgs/demo/mexican/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Chicken Burrito ',
                        'name_ar' => 'دجاج بوريتو',
                        'name_fr' => 'Burrito au poulet',
                        'name_it' => 'Burrito Di Pollo',
                        'name_de' => 'Hähnchen-Burrito',
                        'name_es' => 'Burrito de pollo',
                        'name_ua' => 'Буріто з куркою',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'spicy',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Spicy',
                                        'name_ar' => 'حار',
                                        'name_fr' => 'Épicé',
                                        'name_it' => 'Speziato',
                                        'name_de' => 'Würzig',
                                        'name_es' => 'Picante',
                                        'name_ua' => 'Пряний',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'sausage-and-egg-breakfast-burrito',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/mexican/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Sausage and Egg Breakfast Burrito',
                        'name_ar' => 'إفطار بوريتو السجق والبيض',
                        'name_fr' => 'Burrito petit-déjeuner à la saucisse et aux œufs',
                        'name_it' => 'Burrito per la colazione con uova e salsiccia',
                        'name_de' => 'Wurst und Ei Frühstück Burrito',
                        'name_es' => 'Burrito de Desayuno con Salchicha y Huevo',
                        'name_ua' => 'Буріто на сніданок із ковбасою та яйцем',
                        'options' => [
                            [
                                'name' => 'spicy',
                                'name_en' => 'Spicy',
                                'name_ar' => 'حار',
                                'name_fr' => 'Épicé',
                                'name_it' => 'Speziato',
                                'name_de' => 'Würzig',
                                'name_es' => 'Picante',
                                'name_ua' => 'Пряний',
                                'selections' => [
                                    [
                                        'name' => 'spicy',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Spicy',
                                        'name_ar' => 'حار',
                                        'name_fr' => 'Épicé',
                                        'name_it' => 'Speziato',
                                        'name_de' => 'Würzig',
                                        'name_es' => 'Picante',
                                        'name_ua' => 'Пряний',
                                    ],
                                    [
                                        'name' => 'no',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Немає',
                                    ],
                                ]
                            ],
                        ]
                    ],
                ]
            ],
            [
                'name' => 'beverages',
                'imgUrl' => 'imgs/demo/mexican/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/mexican/cat4_thumbnail.webp',
                'name_en' => 'Beverages',
                'name_ar' => 'المشروبات',
                'name_fr' => 'Breuvages',
                'name_it' => 'Bevande',
                'name_de' => 'Getränke',
                'name_es' => 'Bebidas',
                'name_ua' => 'Напої',
                'products' => [
                    [
                        'name' => 'water',
                        'price' => 1.5,
                        'imgUrl' => 'imgs/demo/mexican/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat4_prod1_thumbnail.webp',
                        'name_en' => 'Water',
                        'name_ar' => 'ماء',
                        'name_fr' => 'L\'eau',
                        'name_it' => 'Acqua',
                        'name_de' => 'Wasser',
                        'name_es' => 'Agua',
                        'name_ua' => 'вода',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'soda',
                        'price' => 0,
                        'imgUrl' => 'imgs/demo/mexican/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat4_prod2_thumbnail.webp',
                        'name_en' => 'Soda',
                        'name_ar' => 'مشروب غازي',
                        'name_fr' => 'Un soda',
                        'name_it' => 'Bibita',
                        'name_de' => 'Limonade',
                        'name_es' => 'soda',
                        'name_ua' => 'Сода',
                        'options' => [
                            [
                                'name' => 'coke',
                                'name_en' => 'Coke',
                                'name_ar' => 'فحم الكوك',
                                'name_fr' => 'du Coca',
                                'name_it' => 'Coca Cola',
                                'name_de' => 'Koks',
                                'name_es' => 'Coca',
                                'name_ua' => 'Кокс',
                                'selections' => [
                                    [
                                        'name' => 'coca-cola',
                                        'price' => 1.5,
                                        'isDefault' => true,
                                        'name_en' => 'Coca Cola',
                                        'name_ar' => 'كوكا كولا',
                                        'name_fr' => 'Coca Cola',
                                        'name_it' => 'Coca Cola',
                                        'name_de' => 'Coca Cola',
                                        'name_es' => 'Coca Cola',
                                        'name_ua' => 'Кока-Кола',
                                    ],
                                    [
                                        'name' => 'cherry-coke',
                                        'price' => 2,
                                        'isDefault' => false,
                                        'name_en' => 'Cherry Coke',
                                        'name_ar' => 'فحم الكوك الكرز',
                                        'name_fr' => 'Coca Cerise',
                                        'name_it' => 'Coca-Cola alla ciliegia',
                                        'name_de' => 'Kirsch Cola',
                                        'name_es' => 'Coca-Cola de cereza',
                                        'name_ua' => 'Вишнева кола',
                                    ],
                                    [
                                        'name' => 'vanilla-coke',
                                        'price' => 2.25,
                                        'isDefault' => false,
                                        'name_en' => 'Vanilla Coke',
                                        'name_ar' => 'فانيلا كوك',
                                        'name_fr' => 'Coca Vanille',
                                        'name_it' => 'coca cola alla vaniglia',
                                        'name_de' => 'Vanille-Cola',
                                        'name_es' => 'Coca-Cola De Vainilla',
                                        'name_ua' => 'Ванільна кола',
                                    ],
                                    [
                                        'name' => 'diet-coke',
                                        'price' => 1.75,
                                        'isDefault' => false,
                                        'name_en' => 'Diet Coke',
                                        'name_ar' => 'كولا للحمية',
                                        'name_fr' => 'Coca light',
                                        'name_it' => 'Diet Coke',
                                        'name_de' => 'Diät-Cola',
                                        'name_es' => 'Coca-Cola Light',
                                        'name_ua' => 'Дієтична кола',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'lemonade',
                        'price' => 0,
                        'imgUrl' => 'imgs/demo/mexican/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat4_prod3_thumbnail.webp',
                        'name_en' => 'Lemonade',
                        'name_ar' => 'عصير الليمون',
                        'name_fr' => 'Limonade',
                        'name_it' => 'Limonata',
                        'name_de' => 'Limonade',
                        'name_es' => 'Limonada',
                        'name_ua' => 'Лимонад',
                        'options' => [
                            [
                                'name' => 'flavor',
                                'name_en' => 'Flavor',
                                'name_ar' => 'نكهة',
                                'name_fr' => 'Saveur',
                                'name_it' => 'Gusto',
                                'name_de' => 'Geschmack',
                                'name_es' => 'Sabor',
                                'name_ua' => 'Смак',
                                'selections' => [
                                    [
                                        'name' => 'plain',
                                        'price' => 1.5,
                                        'isDefault' => true,
                                        'name_en' => 'Plain',
                                        'name_ar' => 'سهل',
                                        'name_fr' => 'Plaine',
                                        'name_it' => 'Pianura',
                                        'name_de' => 'Schmucklos',
                                        'name_es' => 'Llanura',
                                        'name_ua' => 'Рівнина',
                                    ],
                                    [
                                        'name' => 'strawberry-lemonade',
                                        'price' => 3,
                                        'isDefault' => false,
                                        'name_en' => 'Strawberry Lemonade',
                                        'name_ar' => 'ليموناضة الفراولة',
                                        'name_fr' => 'Limonade de fraise',
                                        'name_it' => 'Limonata alla fragola',
                                        'name_de' => 'Erdbeerlimonade',
                                        'name_es' => 'Limonada de fresa',
                                        'name_ua' => 'Полуничний лимонад',
                                    ],
                                    [
                                        'name' => 'raspberry-lemonade',
                                        'price' => 4.5,
                                        'isDefault' => false,
                                        'name_en' => 'Raspberry Lemonade',
                                        'name_ar' => 'التوت عصير الليمون',
                                        'name_fr' => 'Limonade à la framboise',
                                        'name_it' => 'Limonata al lampone',
                                        'name_de' => 'Himbeer Limonade',
                                        'name_es' => 'Limonada de frambuesa',
                                        'name_ua' => 'Малиновий лимонад',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'iced-tea',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/mexican/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/mexican/cat4_prod4_thumbnail.webp',
                        'name_en' => 'Iced Tea',
                        'name_ar' => 'شاي مثلج',
                        'name_fr' => 'Thé glacé',
                        'name_it' => 'Tè freddo',
                        'name_de' => 'Eistee',
                        'name_es' => 'Te helado',
                        'name_ua' => 'Холодний чай',
                        'options' => [
                        ]
                    ],
                ]
            ],
        ];
        demo::website($mexican,$categories);
    }

}
