<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use stdClass;

class pizzeria extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $pizzeria = new stdClass();
        $pizzeria->domainName = 'pizzeria';
        $pizzeria->website_names = [
            'en' => 'Pizzeria',
            'ar' => 'مطعم بيتزا',
            'fr' => 'Pizzeria',
            'de' => 'Pizzeria',
            'it' => 'Pizzeria',
            'es' => 'Pizzería',
            'ua' => 'Піцерія',
            'ru' => '',
        ];
        $pizzeria->intro = [
            'en' => 'Did someone say pizza?',
            'ar' => 'هل قال أحدهم بيتزا؟',
            'fr' => 'Quelqu\'un a dit pizza?',
            'de' => 'Hat jemand Pizza gesagt?',
            'it' => 'Qualcuno ha detto pizza?',
            'es' => '¿Alguien dijo pizza?',
            'ua' => 'Хтось сказав піцу?',
            'ru' => '',
        ];

        $categories = [
            [
                'name' => 'pizza',
                'imgUrl' => 'imgs/demo/pizzeria/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_thumbnail.webp',
                'name_en' => 'Pizza',
                'name_ar' => 'بيتزا',
                'name_fr' => 'Pizza',
                'name_it' => 'Pizza',
                'name_de' => 'Pizza',
                'name_es' => 'Pizza',
                'name_ua' => 'піца',
                'products' => [
                    [
                        'name' => 'bocconcini-salami-pizza',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Bocconcini Salami Pizza',
                        'name_ar' => 'بيتزا بوكونسيني سلامي',
                        'name_fr' => 'Pizza au salami bocconcini',
                        'name_it' => 'Bocconcini Salame Pizza',
                        'name_de' => 'Bocconcini-Salami-Pizza',
                        'name_es' => 'Pizza de Salami Bocconcini',
                        'name_ua' => 'Піца салямі Боккончіні',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ],[
                                'name' => 'extra-salami',
                                'name_en' => 'Extra Salami',
                                'name_ar' => 'إضافة سلامي',
                                'name_fr' => 'Extra Salami',
                                'name_it' => 'Salame Extra',
                                'name_de' => 'Zusätzliche Salami',
                                'name_es' => 'Salame extra',
                                'name_ua' => 'Екстра салямі',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 4,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'pizza-carbonara',
                        'price' => 8.50,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Pizza Carbonara',
                        'name_ar' => 'بيتزا كاربونارا',
                        'name_fr' => 'Pizza Carbonara',
                        'name_it' => 'Pizze alla Carbonara',
                        'name_de' => 'Pizza Carbonara',
                        'name_es' => 'pizza carbonara',
                        'name_ua' => 'Піца Карбонара',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'pizza-diavola',
                        'price' => 11,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Pizza Diavola',
                        'name_ar' => 'بيتزا ديافولا',
                        'name_fr' => 'Pizza Diavola',
                        'name_it' => 'Pizza Diavolo',
                        'name_de' => 'Pizza Diavola',
                        'name_es' => 'Pizza Diavola',
                        'name_ua' => 'Піца Діавола',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'pizza-marinara',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Pizza Marinara',
                        'name_ar' => 'بيتزا مارينارا',
                        'name_fr' => 'Pizza Marinara',
                        'name_it' => 'Pizza Marinara',
                        'name_de' => 'Pizza Marinara',
                        'name_es' => 'pizza marinera',
                        'name_ua' => 'Піца Маринара',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'veggie-pizza',
                        'price' => 5.50,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod5_thumbnail.webp',
                        'name_en' => 'Veggie Pizza',
                        'name_ar' => 'بيتزا خضار',
                        'name_fr' => 'Pizza Végétarienne',
                        'name_it' => 'Pizza vegetariana',
                        'name_de' => 'Vegetarische Pizza',
                        'name_es' => 'pizza vegetariana',
                        'name_ua' => 'Овочева піца',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'cheese-pizza',
                        'price' => 8.50,
                        'imgUrl' => 'imgs/demo/pizzeria/cat1_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat1_prod6_thumbnail.webp',
                        'name_en' => 'Cheese Pizza',
                        'name_ar' => 'بيتزا الجبن',
                        'name_fr' => 'Pizza au fromage',
                        'name_it' => 'Pizza al formaggio',
                        'name_de' => 'Käse-Pizza',
                        'name_es' => 'Pizza de queso',
                        'name_ua' => 'сирна піца',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'medium',
                                        'price' => 3.00,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],[
                                        'name' => 'large',
                                        'price' => 5.00,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],[
                                'name' => 'extra-cheese',
                                'name_en' => 'Extra Cheese',
                                'name_ar' => 'إضافة جبن',
                                'name_fr' => 'Extra Fromage',
                                'name_it' => 'Formaggio extra',
                                'name_de' => 'Extra Käse',
                                'name_es' => 'Extra queso',
                                'name_ua' => 'Екстра сир',
                                'selections' => [
                                    [
                                        'name' => 'yes',
                                        'price' => 1.50,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            [
                'name' => 'salads',
                'imgUrl' => 'imgs/demo/pizzeria/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/pizzeria/cat2_thumbnail.webp',
                'name_en' => 'Salads',
                'name_ar' => 'سلطات',
                'name_fr' => 'Salades',
                'name_it' => 'Insalate',
                'name_de' => 'Salate',
                'name_es' => 'ensaladas',
                'name_ua' => 'Салати',
                'products' => [
                    [
                        'name' => 'caesar-salad',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/pizzeria/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Caesar Salad',
                        'name_ar' => 'سلطة سيزر',
                        'name_fr' => 'Salade César',
                        'name_it' => 'Insalata Cesare',
                        'name_de' => 'Caesar Salat',
                        'name_es' => 'Ensalada César',
                        'name_ua' => 'Салат Цезар',
                        'options' => [

                        ]
                    ],
                    [
                        'name' => 'greek-salad',
                        'price' => 2.5,
                        'imgUrl' => 'imgs/demo/pizzeria/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Greek Salad',
                        'name_ar' => 'السلطة اليونانية',
                        'name_fr' => 'Salade grecque',
                        'name_it' => 'Insalata greca',
                        'name_de' => 'Griechischer Salat',
                        'name_es' => 'Ensalada griega',
                        'name_ua' => 'Грецький салат',
                        'options' => [

                        ]
                    ],
                    [
                        'name' => 'pasta-salad',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/pizzeria/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Pasta Salad',
                        'name_ar' => 'سلطة الباستا',
                        'name_fr' => 'Salade de pâtes',
                        'name_it' => 'Insalata di pasta',
                        'name_de' => 'Nudelsalat',
                        'name_es' => 'Ensalada de pasta',
                        'name_ua' => 'Салат з макаронів',
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
                                        'price' => 0.00,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'tuna-salad',
                        'price' => 4.5,
                        'imgUrl' => 'imgs/demo/pizzeria/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Tuna Salad',
                        'name_ar' => 'سلطة التونة',
                        'name_fr' => 'Salade de thon',
                        'name_it' => 'Insalata di tonno',
                        'name_de' => 'Thunfischsalat',
                        'name_es' => 'Ensalada de atún',
                        'name_ua' => 'Салат з тунцем',
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
                                        'price' => 0.00,
                                        'isDefault' => false,
                                        'name_en' => 'Yes',
                                        'name_ar' => 'نعم',
                                        'name_fr' => 'Oui',
                                        'name_it' => 'sì',
                                        'name_de' => 'Ja',
                                        'name_es' => 'Sí',
                                        'name_ua' => 'Так',
                                    ],[
                                        'name' => 'no',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'No',
                                        'name_ar' => 'لا',
                                        'name_fr' => 'Non',
                                        'name_it' => 'No',
                                        'name_de' => 'Nein',
                                        'name_es' => 'No',
                                        'name_ua' => 'Ні',
                                    ]
                                ]
                            ]
                        ]
                    ],
                ]
            ],
            [
                'name' => 'beverages',
                'imgUrl' => 'imgs/demo/pizzeria/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/pizzeria/cat3_thumbnail.webp',
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
                        'imgUrl' => 'imgs/demo/pizzeria/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Water',
                        'name_ar' => 'مياه',
                        'name_fr' => 'L\'eau',
                        'name_it' => 'Acqua',
                        'name_de' => 'Wasser',
                        'name_es' => 'Agua',
                        'name_ua' => 'вода',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'الحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'small',
                                        'price' => 0.00,
                                        'isDefault' => true,
                                        'name_en' => 'Small',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeño',
                                        'name_ua' => 'Маленький',
                                    ],[
                                        'name' => 'large',
                                        'price' => 0.50,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grand',
                                        'name_it' => 'Larga',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'soda',
                        'price' => 0,
                        'imgUrl' => 'imgs/demo/pizzeria/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Soda',
                        'name_ar' => 'مشروب غازي',
                        'name_fr' => 'Un soda',
                        'name_it' => 'Soda',
                        'name_de' => 'Soda',
                        'name_es' => 'soda',
                        'name_ua' => 'Сода',
                        'options' => [
                            [
                                'name' => 'coke',
                                'name_en' => 'Coke',
                                'name_ar' => 'كولا',
                                'name_fr' => 'Coke',
                                'name_it' => 'Coke',
                                'name_de' => 'Koks',
                                'name_es' => 'Coca',
                                'name_ua' => 'Кокс',
                                'selections' => [
                                    [
                                        'name' => 'coca-cola',
                                        'price' => 1.50,
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
                                        'price' => 2.00,
                                        'isDefault' => false,
                                        'name_en' => 'Cherry Coke',
                                        'name_ar' => 'كولا الكرز',
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
                                        'name_ar' => 'فانيلا كولا',
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
                                        'name_ar' => 'دايت كولا',
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
                        'imgUrl' => 'imgs/demo/pizzeria/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat3_prod3_thumbnail.webp',
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
                                'name_ar' => 'النكهة',
                                'name_fr' => 'Saveur',
                                'name_it' => 'Gusto',
                                'name_de' => 'Geschmack',
                                'name_es' => 'Sabor',
                                'name_ua' => 'Смак',
                                'selections' => [
                                    [
                                        'name' => 'plain',
                                        'price' => 1.50,
                                        'isDefault' => true,
                                        'name_en' => 'Plain',
                                        'name_ar' => 'ليموناضة سادة',
                                        'name_fr' => 'Limonade nature',
                                        'name_it' => 'semplice limonata',
                                        'name_de' => 'einfache Limonade',
                                        'name_es' => 'limonada simple',
                                        'name_ua' => 'звичайний лимонад',
                                    ],
                                    [
                                        'name' => 'strawberry-lemonade',
                                        'price' => 3.00,
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
                                        'price' => 4.50,
                                        'isDefault' => false,
                                        'name_en' => 'Raspberry Lemonade',
                                        'name_ar' => 'ليموناضة توت بري',
                                        'name_fr' => 'Limonade à la framboise',
                                        'name_it' => 'Limonata al lampone',
                                        'name_de' => 'Himbeer Limonade',
                                        'name_es' => 'Limonada de frambuesa',
                                        'name_ua' => 'Малиновий лимонад',
                                    ],
                                ]
                            ]
                        ]
                    ],
                    [
                        'name' => 'iced-tea',
                        'price' => 3,
                        'imgUrl' => 'imgs/demo/pizzeria/cat3_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/pizzeria/cat3_prod4_thumbnail.webp',
                        'name_en' => 'Iced Tea',
                        'name_ar' => 'شاي مثلج',
                        'name_fr' => 'Thé glacé',
                        'name_it' => 'Tè freddo',
                        'name_de' => 'Iced Tea',
                        'name_es' => 'Te helado',
                        'name_ua' => 'Чай із льодом',
                        'options' => [

                        ]
                    ]
                ]

            ],
        ];

        demo::website($pizzeria,$categories);

    }
}
