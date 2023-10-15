<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class mediterranean extends Seeder
{

    public function run()
    {
        $mediterranean = new stdClass();
        $mediterranean->domainName = 'mediterranean';
        $mediterranean->website_names = [
            'en' => 'Mediterranean',
            'ar' => 'البحر المتوسط',
            'fr' => 'méditerranéen',
            'de' => 'Mittelmeer-',
            'it' => 'mediterraneo',
            'es' => 'Mediterráneo',
            'ua' => 'середземноморський',
            'ru' => '',
        ];
        $mediterranean->intro = [
            'en' => 'A touch of modernity with authenticity',
            'ar' => 'لمسة من الحداثة والأصالة',
            'fr' => 'Une touche de modernité avec authenticité',
            'de' => 'Ein Hauch von Modernität mit Authentizität',
            'it' => 'Un tocco di modernità con autenticità',
            'es' => 'Un toque de modernidad con autenticidad',
            'ua' => 'Дотик сучасності з автентичністю',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'breakfast',
                'imgUrl' => 'imgs/demo/mediterranean/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/mediterranean/cat1_thumbnail.webp',
                'name_en' => 'Breakfast',
                'name_ar' => 'إفطار',
                'name_fr' => 'Déjeuner',
                'name_it' => 'Prima colazione',
                'name_de' => 'Frühstück',
                'name_es' => 'Desayuno',
                'name_ua' => 'Сніданок',
                'products' => [
                    [
                        'name' => 'shakshouka',
                        'price' => 2,
                        'imgUrl' => 'imgs/demo/mediterranean/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Shakshouka',
                        'name_ar' => 'شكشوكة',
                        'name_fr' => 'Shakshouka',
                        'name_it' => 'Shakshouka',
                        'name_de' => 'Shakshouka',
                        'name_es' => 'Shakshouka',
                        'name_ua' => 'Шакшовка',
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
                        'name' => 'egg-muffins',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/mediterranean/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Egg Muffins',
                        'name_ar' => 'فطائر البيض',
                        'name_fr' => 'Muffins aux œufs',
                        'name_it' => 'Muffin all\'uovo',
                        'name_de' => 'Ei-Muffins',
                        'name_es' => 'Magdalenas De Huevo',
                        'name_ua' => 'Яєчні кекси',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'tomato-and-cheese-frittata',
                        'price' => 1.5,
                        'imgUrl' => 'imgs/demo/mediterranean/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Tomato and Cheese Frittata',
                        'name_ar' => 'فريتاتا الطماطم والجبن',
                        'name_fr' => 'Frittata aux tomates et au fromage',
                        'name_it' => 'Frittata di pomodoro e formaggio',
                        'name_de' => 'Tomaten-Käse-Frittata',
                        'name_es' => 'Frittata De Tomate Y Queso',
                        'name_ua' => 'Фрітата з помідорів і сиру',
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
                'name' => 'main-dishes',
                'imgUrl' => 'imgs/demo/mediterranean/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_thumbnail.webp',
                'name_en' => 'Main Dishes',
                'name_ar' => 'الأطباق الرئيسية',
                'name_fr' => 'Plats principaux',
                'name_it' => 'Piatti principali',
                'name_de' => 'Hauptgang',
                'name_es' => 'Platos principales',
                'name_ua' => 'Основні страви',
                'products' => [
                    [
                        'name' => 'moussaka',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Moussaka',
                        'name_ar' => 'مسقعة',
                        'name_fr' => 'Moussaka',
                        'name_it' => 'moussaka',
                        'name_de' => 'Moussaka',
                        'name_es' => 'Musaca',
                        'name_ua' => 'Мусака',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'beef-stifado',
                        'price' => 13,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Beef Stifado',
                        'name_ar' => 'بيف ستيفادو',
                        'name_fr' => 'Stifado de boeuf',
                        'name_it' => 'Stifado di manzo',
                        'name_de' => 'Rindfleisch-Stifado',
                        'name_es' => 'Stifado de ternera',
                        'name_ua' => 'Стіфадо з яловичини',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'dolmades',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Dolmades',
                        'name_ar' => 'دولماديس',
                        'name_fr' => 'Dolmades',
                        'name_it' => 'Dolmades',
                        'name_de' => 'Dolmades',
                        'name_es' => 'Dolmades',
                        'name_ua' => 'Долмадес',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'spanakopita',
                        'price' => 9,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Spanakopita',
                        'name_ar' => 'سباناكوبيتا',
                        'name_fr' => 'spanakopita',
                        'name_it' => 'spanakopita',
                        'name_de' => 'Spanakopita',
                        'name_es' => 'Spanakopita',
                        'name_ua' => 'Спанакопіта',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'greek-lemon-chicken',
                        'price' => 11,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod5_thumbnail.webp',
                        'name_en' => 'Greek Lemon Chicken',
                        'name_ar' => 'دجاج بالليمون اليوناني',
                        'name_fr' => 'Poulet au citron grec',
                        'name_it' => 'pollo al limone Greco',
                        'name_de' => 'griechisches Zitronenhähnchen',
                        'name_es' => 'Pollo griego al limón',
                        'name_ua' => 'Грецька лимонна курка',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'grilled-chicken-souvlaki',
                        'price' => 12,
                        'imgUrl' => 'imgs/demo/mediterranean/cat2_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat2_prod6_thumbnail.webp',
                        'name_en' => 'Grilled Chicken Souvlaki',
                        'name_ar' => 'سوفلاكي الدجاج المشوي',
                        'name_fr' => 'Souvlaki au poulet grillé',
                        'name_it' => 'Souvlaki di pollo alla griglia',
                        'name_de' => 'Gegrilltes Hühner-Souvlaki',
                        'name_es' => 'Souvlaki de pollo a la parrilla',
                        'name_ua' => 'Курячий сувлакі на грилі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'starters',
                'imgUrl' => 'imgs/demo/mediterranean/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/mediterranean/cat3_thumbnail.webp',
                'name_en' => 'Starters',
                'name_ar' => 'المقبلات',
                'name_fr' => 'Entrées',
                'name_it' => 'Antipasti',
                'name_de' => 'Vorspeisen',
                'name_es' => 'Entrantes',
                'name_ua' => 'Стартери',
                'products' => [
                    [
                        'name' => 'greek-salad',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/mediterranean/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Greek Salad',
                        'name_ar' => 'سلطة يونانية',
                        'name_fr' => 'Salade grecque',
                        'name_it' => 'Insalata greca',
                        'name_de' => 'Griechischer Salat',
                        'name_es' => 'Ensalada griega',
                        'name_ua' => 'Грецький салат',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'hummus-dip',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/mediterranean/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Hummus Dip',
                        'name_ar' => 'صوص الحمص',
                        'name_fr' => 'Trempette à l\'houmous',
                        'name_it' => 'Salsa Hummus',
                        'name_de' => 'Hummus-Dip',
                        'name_es' => 'Salsa de hummus',
                        'name_ua' => 'Хумус Dip',
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
                        'name' => 'fried-cheese-balls',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/mediterranean/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Fried Cheese Balls',
                        'name_ar' => 'كرات الجبن المقلية',
                        'name_fr' => 'Boulettes de Fromage Frites',
                        'name_it' => 'Palline Di Formaggio Fritte',
                        'name_de' => 'Gebratene Käsebällchen',
                        'name_es' => 'Bolas De Queso Fritas',
                        'name_ua' => 'Смажені сирні кульки',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'desserts',
                'imgUrl' => 'imgs/demo/mediterranean/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/mediterranean/cat4_thumbnail.webp',
                'name_en' => 'Desserts',
                'name_ar' => 'حلويات',
                'name_fr' => 'Desserts',
                'name_it' => 'Dolci',
                'name_de' => 'Nachspeisen',
                'name_es' => 'Postres',
                'name_ua' => 'Десерти',
                'products' => [
                    [
                        'name' => 'baklava',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/mediterranean/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat4_prod1_thumbnail.webp',
                        'name_en' => 'Baklava',
                        'name_ar' => 'البقلاوة',
                        'name_fr' => 'Baklava',
                        'name_it' => 'baklava',
                        'name_de' => 'Baklava',
                        'name_es' => 'baklava',
                        'name_ua' => 'Пахлава',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'melomakarona',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/mediterranean/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/mediterranean/cat4_prod2_thumbnail.webp',
                        'name_en' => 'Melomakarona',
                        'name_ar' => 'ميلوماكارونا',
                        'name_fr' => 'Melomakarona',
                        'name_it' => 'Melomakarona',
                        'name_de' => 'Melomakarona',
                        'name_es' => 'Melomakarona',
                        'name_ua' => 'Меломакарона',
                        'options' => [
                        ]
                    ],
                ]
            ],
        ];
        demo::website($mediterranean,$categories);
    }

}
