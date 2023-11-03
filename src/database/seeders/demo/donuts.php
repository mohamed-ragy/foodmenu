<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class donuts extends Seeder
{

    public function run()
    {
        $donuts = new stdClass();
        $donuts->domainName = 'donuts';
        $donuts->template = 8;
        $donuts->website_names = [
            'en' => 'Donuts Shop',
            'ar' => 'محل دوناتس',
            'fr' => 'Boutique de beignets',
            'de' => 'Donuts-Shop',
            'it' => 'Negozio di ciambelle',
            'es' => 'Tienda de donas',
            'ua' => 'Магазин пончиків',
            'ru' => '',
        ];
        $donuts->intro = [
            'en' => 'Your little sweet retreat',
            'ar' => 'ملاذك الصغير الجميل',
            'fr' => 'Votre petite retraite douce',
            'de' => 'Ihr kleiner süßer Rückzugsort',
            'it' => 'Il tuo piccolo dolce rifugio',
            'es' => 'Tu pequeño y dulce retiro',
            'ua' => 'Ваш маленький солодкий відступ',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'filled-donuts',
                'imgUrl' => 'imgs/demo/donuts/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/donuts/cat1_thumbnail.webp',
                'name_en' => 'Filled Donuts',
                'name_ar' => 'دونات محشو',
                'name_fr' => 'Beignets remplis',
                'name_it' => 'Ciambelle Ripiene',
                'name_de' => 'Gefüllte Donuts',
                'name_es' => 'Rosquillas Rellenas',
                'name_ua' => 'Пончики з начинкою',
                'products' => [
                    [
                        'name' => 'boston-crème',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/donuts/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Boston Crème',
                        'name_ar' => 'بوسطن كريم',
                        'name_fr' => 'Crème de Boston',
                        'name_it' => 'Crema Boston',
                        'name_de' => 'Boston Crème',
                        'name_es' => 'Crema de Boston',
                        'name_ua' => 'Бостонський крем',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'lotus-crème',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/donuts/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Lotus crème',
                        'name_ar' => 'لوتس كريم',
                        'name_fr' => 'Crème de lotus',
                        'name_it' => 'Crema di loto',
                        'name_de' => 'Lotuscreme',
                        'name_es' => 'crema de loto',
                        'name_ua' => 'Лотосовий крем',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'donut-rings',
                'imgUrl' => 'imgs/demo/donuts/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/donuts/cat2_thumbnail.webp',
                'name_en' => 'Donut Rings',
                'name_ar' => 'حلقات دونات',
                'name_fr' => 'Anneaux de beignet',
                'name_it' => 'Anelli di ciambella',
                'name_de' => 'Donut-Ringe',
                'name_es' => 'anillos de donas',
                'name_ua' => 'Кільця для пончиків',
                'products' => [
                    [
                        'name' => 'glazed',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/donuts/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Glazed',
                        'name_ar' => 'المزجج',
                        'name_fr' => 'Vitré',
                        'name_it' => 'Smaltato',
                        'name_de' => 'Glasiert',
                        'name_es' => 'Vidriado',
                        'name_ua' => 'Засклені',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chocolate',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/donuts/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Chocolate',
                        'name_ar' => 'شوكولاتة',
                        'name_fr' => 'Chocolat',
                        'name_it' => 'Cioccolato',
                        'name_de' => 'Schokolade',
                        'name_es' => 'Chocolate',
                        'name_ua' => 'Шоколад',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'strawberry',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/donuts/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Strawberry',
                        'name_ar' => 'الفراولة',
                        'name_fr' => 'Fraise',
                        'name_it' => 'Fragola',
                        'name_de' => 'Erdbeere',
                        'name_es' => 'Fresa',
                        'name_ua' => 'Полуниця',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'blueberry',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/donuts/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Blueberry',
                        'name_ar' => 'توت',
                        'name_fr' => 'Myrtille',
                        'name_it' => 'Mirtillo',
                        'name_de' => 'Blaubeere',
                        'name_es' => 'Arándano',
                        'name_ua' => 'Чорниця',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'milkshakes',
                'imgUrl' => 'imgs/demo/donuts/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/donuts/cat3_thumbnail.webp',
                'name_en' => 'Milkshakes',
                'name_ar' => 'ميلك شيك',
                'name_fr' => 'Milkshakes',
                'name_it' => 'Frappè',
                'name_de' => 'Milchshakes',
                'name_es' => 'batidos',
                'name_ua' => 'молочні коктейлі',
                'products' => [
                    [
                        'name' => 'vanilla-special-milkshake',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/donuts/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Vanilla Special Milkshake',
                        'name_ar' => 'ميلك شيك الفانيليا الخاص',
                        'name_fr' => 'Milkshake Spécial Vanille',
                        'name_it' => 'Frappè speciale alla vaniglia',
                        'name_de' => 'Vanille-Spezial-Milchshake',
                        'name_es' => 'Malteada especial de vainilla',
                        'name_ua' => 'Ванільний спеціальний молочний коктейль',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'بحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'regular',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large',
                                        'price' => 4,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grande',
                                        'name_it' => 'Di grandi dimensioni',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'chocolate-milkshake',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/donuts/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Chocolate Milkshake',
                        'name_ar' => 'ميلك شيك شوكولاتة',
                        'name_fr' => 'Milkshake au chocolat',
                        'name_it' => 'Frappè Al Cioccolato',
                        'name_de' => 'Schokoladenmilchshake',
                        'name_es' => 'Malteada de chocolate',
                        'name_ua' => 'Шоколадний молочний коктейль',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'بحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'regular',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large',
                                        'price' => 4.5,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grande',
                                        'name_it' => 'Di grandi dimensioni',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'strawberry-milkshake',
                        'price' => 5.5,
                        'imgUrl' => 'imgs/demo/donuts/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Strawberry Milkshake',
                        'name_ar' => 'مخفوق الحليب بالفرواله',
                        'name_fr' => 'Milkshake à la fraise',
                        'name_it' => 'Frullato alla fragola',
                        'name_de' => 'Erdbeer Milchshake',
                        'name_es' => 'Batido de fresa',
                        'name_ua' => 'Полуничний молочний коктейль',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'بحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'regular',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large',
                                        'price' => 3.5,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grande',
                                        'name_it' => 'Di grandi dimensioni',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'buttermilk-banana-milkshake',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/donuts/cat3_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/donuts/cat3_prod4_thumbnail.webp',
                        'name_en' => 'Buttermilk Banana Milkshake',
                        'name_ar' => 'اللبن والموز ميلك شيك',
                        'name_fr' => 'Milkshake aux bananes et au babeurre',
                        'name_it' => 'Frappè alla banana e latticello',
                        'name_de' => 'Buttermilch-Bananen-Milchshake',
                        'name_es' => 'Batido De Plátano Y Suero De Mantequilla',
                        'name_ua' => 'Пахта банановий молочний коктейль',
                        'options' => [
                            [
                                'name' => 'size',
                                'name_en' => 'Size',
                                'name_ar' => 'بحجم',
                                'name_fr' => 'Taille',
                                'name_it' => 'Taglia',
                                'name_de' => 'Größe',
                                'name_es' => 'Tamaño',
                                'name_ua' => 'Розмір',
                                'selections' => [
                                    [
                                        'name' => 'regular',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large',
                                        'price' => 4.5,
                                        'isDefault' => false,
                                        'name_en' => 'Large',
                                        'name_ar' => 'كبير',
                                        'name_fr' => 'Grande',
                                        'name_it' => 'Di grandi dimensioni',
                                        'name_de' => 'Groß',
                                        'name_es' => 'Largo',
                                        'name_ua' => 'Великий',
                                    ],
                                ]
                            ],
                        ]
                    ],
                ]
            ],
        ];
        demo::website($donuts,$categories);
    }

}
