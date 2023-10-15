<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class middleEastern extends Seeder
{

    public function run()
    {
        $middleEastern = new stdClass();
        $middleEastern->domainName = 'middleeastern';
        $middleEastern->website_names = [
            'en' => 'Middle Eastern',
            'ar' => 'شرق اوسطي',
            'fr' => 'Moyen-Orient',
            'de' => 'Mittlerer Osten',
            'it' => 'Medio orientale',
            'es' => 'Medio este',
            'ua' => 'близькосхідний',
            'ru' => '',
        ];
        $middleEastern->intro = [
            'en' => 'Truly Authentic Tastes',
            'ar' => 'أذواق أصلية حقًا',
            'fr' => 'Des goûts vraiment authentiques',
            'de' => 'Wirklich authentischer Geschmack',
            'it' => 'Sapori veramente autentici',
            'es' => 'Sabores verdaderamente auténticos',
            'ua' => 'Справді автентичні смаки',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'breakfast',
                'imgUrl' => 'imgs/demo/middleEastern/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_thumbnail.webp',
                'name_en' => 'Breakfast',
                'name_ar' => 'إفطار',
                'name_fr' => 'Déjeuner',
                'name_it' => 'Prima colazione',
                'name_de' => 'Frühstück',
                'name_es' => 'Desayuno',
                'name_ua' => 'Сніданок',
                'products' => [
                    [
                        'name' => 'falafel',
                        'price' => 1,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Falafel',
                        'name_ar' => 'فلافل',
                        'name_fr' => 'Falafel',
                        'name_it' => 'Falafel',
                        'name_de' => 'Falafel',
                        'name_es' => 'Falafel',
                        'name_ua' => 'Фалафель',
                        'options' => [
                            [
                                'name' => 'pieces',
                                'name_en' => 'Pieces',
                                'name_ar' => 'قِطَع',
                                'name_fr' => 'Pièces',
                                'name_it' => 'Pezzi',
                                'name_de' => 'Stücke',
                                'name_es' => 'Piezas',
                                'name_ua' => 'штук',
                                'selections' => [
                                    [
                                        'name' => '3-pieces',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => '3 pieces',
                                        'name_ar' => '3 قطع',
                                        'name_fr' => '3 pièces',
                                        'name_it' => '3 pezzi',
                                        'name_de' => '3 Stück',
                                        'name_es' => '3 piezas',
                                        'name_ua' => '3 шт',
                                    ],
                                    [
                                        'name' => '5-pieces',
                                        'price' => 0.5,
                                        'isDefault' => false,
                                        'name_en' => '5 pieces',
                                        'name_ar' => '5 قطع',
                                        'name_fr' => '5 pièces',
                                        'name_it' => '5 pezzi',
                                        'name_de' => '5 Stücke',
                                        'name_es' => '5 piezas',
                                        'name_ua' => '5 шт',
                                    ],
                                    [
                                        'name' => '10-pieces',
                                        'price' => 1.5,
                                        'isDefault' => false,
                                        'name_en' => '10 pieces',
                                        'name_ar' => '10 قطع',
                                        'name_fr' => '10 morceaux',
                                        'name_it' => '10 pezzi',
                                        'name_de' => '10 Stück',
                                        'name_es' => '10 piezas',
                                        'name_ua' => '10 шт',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'shakshuka',
                        'price' => 2,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Shakshuka',
                        'name_ar' => 'شكشوكة',
                        'name_fr' => 'Shakshuka',
                        'name_it' => 'Shakshuka',
                        'name_de' => 'Shakshuka',
                        'name_es' => 'shakshuka',
                        'name_ua' => 'Шакшука',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'zaatar-manouche',
                        'price' => 2.5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Zaatar Manouche',
                        'name_ar' => 'منقوشة زعتر',
                        'name_fr' => 'Zaatar Manouche',
                        'name_it' => 'Zaatar Manouche',
                        'name_de' => 'Zaatar Manouche',
                        'name_es' => 'Manouche Zaatar',
                        'name_ua' => 'Заатар Мануш',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'medames',
                        'price' => 2,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Medames',
                        'name_ar' => 'مدامس',
                        'name_fr' => 'Médames',
                        'name_it' => 'Medames',
                        'name_de' => 'Medamen',
                        'name_es' => 'señoras',
                        'name_ua' => 'Медамес',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'hummus',
                        'price' => 2.5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod5_thumbnail.webp',
                        'name_en' => 'Hummus',
                        'name_ar' => 'الحمص',
                        'name_fr' => 'Hoummous',
                        'name_it' => 'hummus',
                        'name_de' => 'Hummus',
                        'name_es' => 'hummus',
                        'name_ua' => 'Хумус',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'grilled-halloumi',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/middleEastern/cat1_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat1_prod6_thumbnail.webp',
                        'name_en' => 'Grilled Halloumi',
                        'name_ar' => 'حلومي مشوي',
                        'name_fr' => 'Halloumi grillé',
                        'name_it' => 'Hallumi alla griglia',
                        'name_de' => 'Gegrillter Halloumi',
                        'name_es' => 'Halloumi a la parrilla',
                        'name_ua' => 'Халлумі на грилі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'main-course',
                'imgUrl' => 'imgs/demo/middleEastern/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_thumbnail.webp',
                'name_en' => 'Main Course',
                'name_ar' => 'الطبق الرئيسي',
                'name_fr' => 'Plat principal',
                'name_it' => 'Portata principale',
                'name_de' => 'Hauptkurs',
                'name_es' => 'Plato principal',
                'name_ua' => 'Головна страва',
                'products' => [
                    [
                        'name' => 'mujaddara',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Mujaddara',
                        'name_ar' => 'مجدرة',
                        'name_fr' => 'Mujadara',
                        'name_it' => 'Mujaddara',
                        'name_de' => 'Mujaddara',
                        'name_es' => 'Mujaddara',
                        'name_ua' => 'Муджаддара',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'maqluba',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Maqluba',
                        'name_ar' => 'مقلوبة',
                        'name_fr' => 'Maqluba',
                        'name_it' => 'Maqluba',
                        'name_de' => 'Maqluba',
                        'name_es' => 'Maqluba',
                        'name_ua' => 'Маклюба',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'musakhan',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Musakhan',
                        'name_ar' => 'مسخن',
                        'name_fr' => 'Musakhan',
                        'name_it' => 'Musakhan',
                        'name_de' => 'Musakhan',
                        'name_es' => 'Musakhán',
                        'name_ua' => 'Мусахан',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chicken-mandy',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Chicken Mandy',
                        'name_ar' => 'مندي دجاج',
                        'name_fr' => 'Poulet Mandy',
                        'name_it' => 'Pollo Mandy',
                        'name_de' => 'Hühnchen Mandy',
                        'name_es' => 'Pollo Mandy',
                        'name_ua' => 'Курка Менді',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chicken-zubrian',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod5_thumbnail.webp',
                        'name_en' => 'Chicken Zubrian',
                        'name_ar' => 'دجاج زبريان',
                        'name_fr' => 'Poulet Zubrien',
                        'name_it' => 'Pollo zubriano',
                        'name_de' => 'Huhn Zubrian',
                        'name_es' => 'pollo zubriano',
                        'name_ua' => 'Курка Зубрян',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'kebab-karaz',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod6_thumbnail.webp',
                        'name_en' => 'Kebab karaz',
                        'name_ar' => 'كباب كرز',
                        'name_fr' => 'Kebab karaz',
                        'name_it' => 'Karaz kebab',
                        'name_de' => 'Kebab karaz',
                        'name_es' => 'Karaz de kebab',
                        'name_ua' => 'Кебаб карась',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chicken-couscous',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod7.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod7_thumbnail.webp',
                        'name_en' => 'Chicken Couscous',
                        'name_ar' => 'كسكس الدجاج',
                        'name_fr' => 'Couscous au Poulet',
                        'name_it' => 'Cous cous di pollo',
                        'name_de' => 'Hähnchen-Couscous',
                        'name_es' => 'Cuscús De Pollo',
                        'name_ua' => 'Курячий кускус',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'okra-stew-with-beef-and-tomatoes',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/middleEastern/cat2_prod8.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat2_prod8_thumbnail.webp',
                        'name_en' => 'Okra stew with beef and tomatoes',
                        'name_ar' => 'يخنة البامية باللحم البقري والطماطم',
                        'name_fr' => 'Ragoût de gombo au boeuf et tomates',
                        'name_it' => 'Stufato di gombo con manzo e pomodori',
                        'name_de' => 'Okra-Eintopf mit Rindfleisch und Tomaten',
                        'name_es' => 'Estofado de okra con ternera y tomates',
                        'name_ua' => 'Бамія тушкована з яловичиною та помідорами',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'sides',
                'imgUrl' => 'imgs/demo/middleEastern/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/middleEastern/cat3_thumbnail.webp',
                'name_en' => 'Sides',
                'name_ar' => 'الجانبين',
                'name_fr' => 'Côtés',
                'name_it' => 'Lati',
                'name_de' => 'Seiten',
                'name_es' => 'Lados',
                'name_ua' => 'сторони',
                'products' => [
                    [
                        'name' => 'fattoush-salad',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/middleEastern/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Fattoush salad',
                        'name_ar' => 'سلطة فتوش',
                        'name_fr' => 'Salade Fatouche',
                        'name_it' => 'Insalata Fattous',
                        'name_de' => 'Fattoush-Salat',
                        'name_es' => 'Ensalada Fattoush',
                        'name_ua' => 'Салат Фатуш',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'dolmas',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/middleEastern/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Dolmas',
                        'name_ar' => 'دولماس',
                        'name_fr' => 'Dolmas',
                        'name_it' => 'Dolmas',
                        'name_de' => 'Dolmas',
                        'name_es' => 'dolmas',
                        'name_ua' => 'Долмас',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'tabbouleh',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/middleEastern/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Tabbouleh',
                        'name_ar' => 'تبولة',
                        'name_fr' => 'taboule',
                        'name_it' => 'Tabulè',
                        'name_de' => 'Tabouleh',
                        'name_es' => 'tabulé',
                        'name_ua' => 'Табуле',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'tzatziki',
                        'price' => 3.5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat3_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat3_prod4_thumbnail.webp',
                        'name_en' => 'Tzatziki',
                        'name_ar' => 'تزاتزيكي',
                        'name_fr' => 'Tzatziki',
                        'name_it' => 'Zatziki',
                        'name_de' => 'Tzatziki',
                        'name_es' => 'Tzatziki',
                        'name_ua' => 'Дзацікі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'beverages',
                'imgUrl' => 'imgs/demo/middleEastern/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/middleEastern/cat4_thumbnail.webp',
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
                        'price' => 1,
                        'imgUrl' => 'imgs/demo/middleEastern/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat4_prod1_thumbnail.webp',
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
                        'imgUrl' => 'imgs/demo/middleEastern/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat4_prod2_thumbnail.webp',
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
                                        'name_it' => 'Coca Ciliegia',
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
                        'imgUrl' => 'imgs/demo/middleEastern/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat4_prod3_thumbnail.webp',
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
                        'price' => 1.5,
                        'imgUrl' => 'imgs/demo/middleEastern/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/middleEastern/cat4_prod4_thumbnail.webp',
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
        demo::website($middleEastern,$categories);
    }

}
