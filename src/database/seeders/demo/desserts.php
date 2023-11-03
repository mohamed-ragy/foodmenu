<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class desserts extends Seeder
{

    public function run()
    {
        $desserts = new stdClass();
        $desserts->domainName = 'desserts';
        $desserts->template = 10;
        $desserts->website_names = [
            'en' => 'Desserts Shop',
            'ar' => 'محل حلويات',
            'fr' => 'Boutique de desserts',
            'de' => 'Desserts Shop',
            'it' => 'Negozio di dolci',
            'es' => 'Tienda de postres',
            'ua' => 'Магазин десертів',
            'ru' => '',
        ];
        $desserts->intro = [
            'en' => 'Your secret spot for sugarcoated goodies',
            'ar' => 'مكانك السري للحصول على الأشياء الجيدة المكسوة بالسكر',
            'fr' => 'Votre endroit secret pour les friandises enrobées de sucre',
            'de' => 'Ihr Geheimtipp für zuckerüberzogene Leckereien',
            'it' => 'Il tuo posto segreto per chicche ricoperte di zucchero',
            'es' => 'Tu lugar secreto para golosinas azucaradas',
            'ua' => 'Ваше секретне місце для смаколиків із цукром',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'cake',
                'imgUrl' => 'imgs/demo/desserts/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/desserts/cat1_thumbnail.webp',
                'name_en' => 'Cake',
                'name_ar' => 'كيك',
                'name_fr' => 'Gâteau',
                'name_it' => 'Torta',
                'name_de' => 'Kuchen',
                'name_es' => 'Pastel',
                'name_ua' => 'Торт',
                'products' => [
                    [
                        'name' => 'honey-cake',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/desserts/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Honey cake',
                        'name_ar' => 'كيكة العسل',
                        'name_fr' => 'Gâteau au miel',
                        'name_it' => 'Torta al miele',
                        'name_de' => 'Honigkuchen',
                        'name_es' => 'Pastel de miel',
                        'name_ua' => 'Медовий торт',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'san-sebastian',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/desserts/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat1_prod2_thumbnail.webp',
                        'name_en' => 'San Sebastian',
                        'name_ar' => 'سان سيباستيان',
                        'name_fr' => 'Saint-Sébastien',
                        'name_it' => 'San Sebastiano',
                        'name_de' => 'San Sebastián',
                        'name_es' => 'San Sebastian',
                        'name_ua' => 'Сан-Себастьян',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'red-velvet-',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/desserts/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Red velvet ',
                        'name_ar' => 'ريد فلفيت',
                        'name_fr' => 'velours rouge',
                        'name_it' => 'velluto rosso',
                        'name_de' => 'roter Samt',
                        'name_es' => 'terciopelo rojo',
                        'name_ua' => 'червоний оксамит',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cheesecake',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/desserts/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Cheesecake',
                        'name_ar' => 'تشيز كيك',
                        'name_fr' => 'cheesecake',
                        'name_it' => 'Torta di formaggio',
                        'name_de' => 'Käsekuchen',
                        'name_es' => 'Tarta de queso',
                        'name_ua' => 'Чізкейк',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chocolate-fudge',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/desserts/cat1_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat1_prod5_thumbnail.webp',
                        'name_en' => 'Chocolate fudge',
                        'name_ar' => 'حلوى الشوكولاتة',
                        'name_fr' => 'Fondant au chocolat',
                        'name_it' => 'Fondente al cioccolato',
                        'name_de' => 'Schokoladen Toffee',
                        'name_es' => 'Dulce de chocolate',
                        'name_ua' => 'Шоколадна помадка',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'doughnuts',
                'imgUrl' => 'imgs/demo/desserts/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/desserts/cat2_thumbnail.webp',
                'name_en' => 'Doughnuts',
                'name_ar' => 'دونات',
                'name_fr' => 'Beignets',
                'name_it' => 'Ciambelle',
                'name_de' => 'Donuts',
                'name_es' => 'donas',
                'name_ua' => 'Пончики',
                'products' => [
                    [
                        'name' => 'boston-crème',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod1_thumbnail.webp',
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
                        'name' => 'strawberry',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod2_thumbnail.webp',
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
                        'name' => 'lotus-crème',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod3_thumbnail.webp',
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
                    [
                        'name' => 'blueberry',
                        'price' => 5.5,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod4_thumbnail.webp',
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
                    [
                        'name' => 'glazed',
                        'price' => 3.5,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod5_thumbnail.webp',
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
                        'price' => 4.5,
                        'imgUrl' => 'imgs/demo/desserts/cat2_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat2_prod6_thumbnail.webp',
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
                ]
            ],
            [
                'name' => 'pies',
                'imgUrl' => 'imgs/demo/desserts/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/desserts/cat3_thumbnail.webp',
                'name_en' => 'Pies',
                'name_ar' => 'الفطائر',
                'name_fr' => 'Tartes',
                'name_it' => 'Torte',
                'name_de' => 'Kuchen',
                'name_es' => 'empanadas',
                'name_ua' => 'Пироги',
                'products' => [
                    [
                        'name' => 'pumpkin-pie',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/desserts/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Pumpkin pie',
                        'name_ar' => 'فطيرة اليقطين',
                        'name_fr' => 'Tarte à la citrouille',
                        'name_it' => 'Torta di zucca',
                        'name_de' => 'Kürbiskuchen',
                        'name_es' => 'Pastel de calabaza',
                        'name_ua' => 'Гарбузовий пиріг',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'apple-pie',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/desserts/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Apple pie',
                        'name_ar' => 'فطيرة تفاح',
                        'name_fr' => 'tarte aux pommes',
                        'name_it' => 'torta di mele',
                        'name_de' => 'Apfelkuchen',
                        'name_es' => 'Tarta de manzana',
                        'name_ua' => 'яблучний пиріг',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cherry-pie',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/desserts/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Cherry pie',
                        'name_ar' => 'فطيرة الكرز',
                        'name_fr' => 'Tarte aux cerises',
                        'name_it' => 'torta di ciliegie',
                        'name_de' => 'Kirschkuchen',
                        'name_es' => 'pastel de cerezas',
                        'name_ua' => 'Вишневий пиріг',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'milkshakes',
                'imgUrl' => 'imgs/demo/desserts/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/desserts/cat4_thumbnail.webp',
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
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/desserts/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat4_prod1_thumbnail.webp',
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
                                        'name' => 'regular-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular ',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large-',
                                        'price' => 2.5,
                                        'isDefault' => false,
                                        'name_en' => 'Large ',
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
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/desserts/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat4_prod2_thumbnail.webp',
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
                                        'name' => 'regular-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular ',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large-',
                                        'price' => 2,
                                        'isDefault' => false,
                                        'name_en' => 'Large ',
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
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/desserts/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat4_prod3_thumbnail.webp',
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
                                        'name' => 'regular-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular ',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large-',
                                        'price' => 2.25,
                                        'isDefault' => false,
                                        'name_en' => 'Large ',
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
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/desserts/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/desserts/cat4_prod4_thumbnail.webp',
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
                                        'name' => 'regular-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Regular ',
                                        'name_ar' => 'عادي',
                                        'name_fr' => 'Ordinaire',
                                        'name_it' => 'Regolare',
                                        'name_de' => 'Regulär',
                                        'name_es' => 'Regular',
                                        'name_ua' => 'Регулярний',
                                    ],
                                    [
                                        'name' => 'large-',
                                        'price' => 2.75,
                                        'isDefault' => false,
                                        'name_en' => 'Large ',
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
        demo::website($desserts,$categories);
    }

}
