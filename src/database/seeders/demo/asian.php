<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class asian extends Seeder
{

    public function run()
    {
        $asian = new stdClass();
        $asian->domainName = 'asian';
        $asian->template = 16;
        $asian->website_names = [
            'en' => 'Asian',
            'ar' => 'آسيا',
            'fr' => 'asiatique',
            'de' => 'asiatisch',
            'it' => 'asiatico',
            'es' => 'asiático',
            'ua' => 'Азіатський',
            'ru' => '',
        ];
        $asian->intro = [
            'en' => 'Spice up your day',
            'ar' => 'قم بتوابل يومك',
            'fr' => 'Pimentez votre journée',
            'de' => 'Peppen Sie Ihren Tag auf',
            'it' => 'Ravviva la tua giornata',
            'es' => 'Dale sabor a tu día',
            'ua' => 'Прикрасьте свій день',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'noodles',
                'imgUrl' => 'imgs/demo/asian/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/asian/cat1_thumbnail.webp',
                'name_en' => 'Noodles',
                'name_ar' => 'المعكرونة',
                'name_fr' => 'Nouilles',
                'name_it' => 'Tagliatelle',
                'name_de' => 'Nudeln',
                'name_es' => 'Fideos',
                'name_ua' => 'локшина',
                'products' => [
                    [
                        'name' => 'chicken-ramen-bowl',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/asian/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Chicken Ramen Bowl',
                        'name_ar' => 'صحن دجاج رامين',
                        'name_fr' => 'Bol de ramen au poulet',
                        'name_it' => 'Ciotola Di Ramen Di Pollo',
                        'name_de' => 'Hühnchen-Ramen-Schüssel',
                        'name_es' => 'Cuenco de ramen de pollo',
                        'name_ua' => 'Куряча рамен чаша',
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
                        'name' => 'garlic-chicken-noodles',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/asian/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Garlic chicken noodles',
                        'name_ar' => 'نودلز الدجاج بالثوم',
                        'name_fr' => 'Nouilles au poulet à l\'ail',
                        'name_it' => 'Tagliatelle di pollo all\'aglio',
                        'name_de' => 'Knoblauch-Huhn-Nudeln',
                        'name_es' => 'Fideos de pollo al ajillo',
                        'name_ua' => 'Часникова куряча локшина',
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
                        'name' => 'traditional-beef-pho',
                        'price' => 14,
                        'imgUrl' => 'imgs/demo/asian/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Traditional beef pho',
                        'name_ar' => 'طبق لحم بقري تقليدي',
                        'name_fr' => 'Pho de boeuf traditionnel',
                        'name_it' => 'Pho di manzo tradizionale',
                        'name_de' => 'Traditionelles Rindfleisch Pho',
                        'name_es' => 'Pho de ternera tradicional',
                        'name_ua' => 'Традиційна яловичина фо',
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
                        'name' => 'tonkotsu-ramen',
                        'price' => 12,
                        'imgUrl' => 'imgs/demo/asian/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Tonkotsu Ramen',
                        'name_ar' => 'تونكوتسو رامين',
                        'name_fr' => 'Tonkotsu Ramen',
                        'name_it' => 'Tonkotsu Ramen',
                        'name_de' => 'Tonkotsu-Ramen',
                        'name_es' => 'ramen tonkotsu',
                        'name_ua' => 'Рамен Тонкоцу',
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
                'name' => 'main-plates',
                'imgUrl' => 'imgs/demo/asian/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/asian/cat2_thumbnail.webp',
                'name_en' => 'Main Plates',
                'name_ar' => 'اللوحات الرئيسية',
                'name_fr' => 'Plaques principales',
                'name_it' => 'Piatti principali',
                'name_de' => 'Hauptplatten',
                'name_es' => 'Platos Principales',
                'name_ua' => 'Основні плити',
                'products' => [
                    [
                        'name' => 'roasted-beef-with-broccoli-and-rice',
                        'price' => 15,
                        'imgUrl' => 'imgs/demo/asian/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Roasted beef with broccoli and rice',
                        'name_ar' => 'لحم بقري محمص مع بروكلي و أرز',
                        'name_fr' => 'Rôti de boeuf avec brocoli et riz',
                        'name_it' => 'Manzo arrosto con broccoli e riso',
                        'name_de' => 'Gebratenes Rindfleisch mit Brokkoli und Reis',
                        'name_es' => 'Ternera asada con brócoli y arroz',
                        'name_ua' => 'Смажена яловичина з брокколі та рисом',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'honey-sesame-chicken',
                        'price' => 13,
                        'imgUrl' => 'imgs/demo/asian/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Honey sesame chicken',
                        'name_ar' => 'دجاج بالسمسم بالعسل',
                        'name_fr' => 'Poulet miel et sésame',
                        'name_it' => 'Pollo al sesamo al miele',
                        'name_de' => 'Honig-Sesam-Huhn',
                        'name_es' => 'Pollo con sésamo y miel',
                        'name_ua' => 'Курка з медовим кунжутом',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'asian-meatballs',
                        'price' => 14,
                        'imgUrl' => 'imgs/demo/asian/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Asian Meatballs',
                        'name_ar' => 'كرات اللحم الآسيوية',
                        'name_fr' => 'Boulettes de viande asiatiques',
                        'name_it' => 'Polpette asiatiche',
                        'name_de' => 'Asiatische Fleischbällchen',
                        'name_es' => 'Albóndigas Asiáticas',
                        'name_ua' => 'Азіатські тефтелі',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'hot-and-spicy-tteokbokki',
                        'price' => 13.5,
                        'imgUrl' => 'imgs/demo/asian/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Hot and spicy tteokbokki',
                        'name_ar' => 'تتيوك بوكي حار وحار',
                        'name_fr' => 'Tteokbokki chaud et épicé',
                        'name_it' => 'Tteokbokki piccante e speziato',
                        'name_de' => 'Scharfes und würziges Tteokbokki',
                        'name_es' => 'Tteokbokki caliente y picante',
                        'name_ua' => 'Гострий і пряний ттеокбоккі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'beverages',
                'imgUrl' => 'imgs/demo/asian/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/asian/cat3_thumbnail.webp',
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
                        'imgUrl' => 'imgs/demo/asian/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat3_prod1_thumbnail.webp',
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
                        'name' => 'soda-',
                        'price' => 0,
                        'imgUrl' => 'imgs/demo/asian/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Soda ',
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
                        'name' => 'lemonade-',
                        'price' => 0,
                        'imgUrl' => 'imgs/demo/asian/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Lemonade ',
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
                        'imgUrl' => 'imgs/demo/asian/cat3_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/asian/cat3_prod4_thumbnail.webp',
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
        demo::website($asian,$categories);
    }

}
