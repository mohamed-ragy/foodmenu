<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class cafe extends Seeder
{

    public function run()
    {
        $cafe = new stdClass();
        $cafe->domainName = 'cafe';
        $cafe->website_names = [
            'en' => 'Cafe',
            'ar' => 'كافيه',
            'fr' => 'Café',
            'de' => 'Cafe',
            'it' => 'bar',
            'es' => 'Cafetería',
            'ua' => 'кафе',
            'ru' => '',
        ];
        $cafe->intro = [
            'en' => 'We are always in a brew mood',
            'ar' => 'نحن دائما في حالة مزاجية',
            'fr' => 'Nous sommes toujours d\'humeur à brasser',
            'de' => 'Wir sind immer in Braulaune',
            'it' => 'Siamo sempre in vena di birra',
            'es' => 'Siempre estamos en un estado de ánimo cervecero',
            'ua' => 'Ми завжди в пивному настрої',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'coffee',
                'imgUrl' => 'imgs/demo/cafe/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/cafe/cat1_thumbnail.webp',
                'name_en' => 'Coffee',
                'name_ar' => 'قهوة',
                'name_fr' => 'Café',
                'name_it' => 'Caffè',
                'name_de' => 'Kaffee',
                'name_es' => 'Café',
                'name_ua' => 'кава',
                'products' => [
                    [
                        'name' => 'macchiato',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Macchiato',
                        'name_ar' => 'ماكياتو',
                        'name_fr' => 'Macchiato',
                        'name_it' => 'Macchiato',
                        'name_de' => 'Macchiato',
                        'name_es' => 'Macchiato',
                        'name_ua' => 'Макіато',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'flat-white',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Flat White',
                        'name_ar' => 'فلات وايت',
                        'name_fr' => 'Blanc plat',
                        'name_it' => 'Bianco uniforme',
                        'name_de' => 'Flaches Weiß',
                        'name_es' => 'Blanco plano',
                        'name_ua' => 'Flat White',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cortado',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Cortado',
                        'name_ar' => 'كورتادو',
                        'name_fr' => 'Cortado',
                        'name_it' => 'Cortado',
                        'name_de' => 'Cortado',
                        'name_es' => 'cortado',
                        'name_ua' => 'Кортадо',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cuban-affogato',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Cuban Affogato',
                        'name_ar' => 'أفوجاتو الكوبي',
                        'name_fr' => 'Affogato cubain',
                        'name_it' => 'Affogato cubano',
                        'name_de' => 'Kubanisches Affogato',
                        'name_es' => 'Afhogato cubano',
                        'name_ua' => 'Кубинський аффогато',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'americano',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod5_thumbnail.webp',
                        'name_en' => 'Americano',
                        'name_ar' => 'أمريكانو',
                        'name_fr' => 'américain',
                        'name_it' => 'Americano',
                        'name_de' => 'Amerikaner',
                        'name_es' => 'americano',
                        'name_ua' => 'Американо',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cappuccino',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod6_thumbnail.webp',
                        'name_en' => 'Cappuccino',
                        'name_ar' => 'كابتشينو',
                        'name_fr' => 'Cappuccino',
                        'name_it' => 'Cappuccino',
                        'name_de' => 'Cappuccino',
                        'name_es' => 'Capuchino',
                        'name_ua' => 'Капучіно',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'espresso-frappe',
                        'price' => 5.5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod7.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod7_thumbnail.webp',
                        'name_en' => 'Espresso Frappe',
                        'name_ar' => 'اسبريسو فرابيه',
                        'name_fr' => 'Espresso Frappé',
                        'name_it' => 'Frappe all\'espresso',
                        'name_de' => 'Espresso-Frappé',
                        'name_es' => 'Espresso Frappé',
                        'name_ua' => 'Еспресо Фраппе',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'mocha-frappe',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod8.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod8_thumbnail.webp',
                        'name_en' => 'Mocha Frappe',
                        'name_ar' => 'موكا فرابيه',
                        'name_fr' => 'Moka Frappé',
                        'name_it' => 'Frappe alla moka',
                        'name_de' => 'Mokka Frappe',
                        'name_es' => 'Frapé de moca',
                        'name_ua' => 'Мокко Фраппе',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'vanilla-frappe',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod9.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod9_thumbnail.webp',
                        'name_en' => 'Vanilla Frappe',
                        'name_ar' => 'فانيلا فرابيه',
                        'name_fr' => 'Frappé à la vanille',
                        'name_it' => 'Frappe alla vaniglia',
                        'name_de' => 'Vanille Frappe',
                        'name_es' => 'Frappé de vainilla',
                        'name_ua' => 'Ванільний фраппе',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'caramel-frappe',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod10.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod10_thumbnail.webp',
                        'name_en' => 'Caramel Frappe',
                        'name_ar' => 'كراميل فرابيه',
                        'name_fr' => 'Frappé au caramel',
                        'name_it' => 'Frappe al caramello',
                        'name_de' => 'Caramel Frappe',
                        'name_es' => 'Licuado de caramelo',
                        'name_ua' => 'Карамельне фраппе',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'white-chocolate-mocha-frappe',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/cafe/cat1_prod11.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat1_prod11_thumbnail.webp',
                        'name_en' => 'White chocolate mocha frappe',
                        'name_ar' => 'موكا شوكولاتة بيضاء فرابيه',
                        'name_fr' => 'Frappé moka au chocolat blanc',
                        'name_it' => 'Frappe moka al cioccolato bianco',
                        'name_de' => 'Mokka-Frappé mit weißer Schokolade',
                        'name_es' => 'Frappé de moca con chocolate blanco',
                        'name_ua' => 'Мокко фраппе з білого шоколаду',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'hot-specialities',
                'imgUrl' => 'imgs/demo/cafe/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/cafe/cat2_thumbnail.webp',
                'name_en' => 'Hot Specialities',
                'name_ar' => 'التخصصات الساخنة',
                'name_fr' => 'Spécialités chaudes',
                'name_it' => 'Specialità calde',
                'name_de' => 'Heiße Spezialitäten',
                'name_es' => 'Especialidades Calientes',
                'name_ua' => 'Гарячі страви',
                'products' => [
                    [
                        'name' => 'hot-chocolate',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Hot Chocolate',
                        'name_ar' => 'شكولاته ساخنة',
                        'name_fr' => 'Chocolat chaud',
                        'name_it' => 'Cioccolata calda',
                        'name_de' => 'Heiße Schokolade',
                        'name_es' => 'Chocolate caliente',
                        'name_ua' => 'Гарячий шоколад',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'classic-milk-tea',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/cafe/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Classic Milk Tea',
                        'name_ar' => 'شاي حليب كلاسيكي',
                        'name_fr' => 'Thé au lait classique',
                        'name_it' => 'Tè al latte classico',
                        'name_de' => 'Klassischer Milchtee',
                        'name_es' => 'Té con leche clásico',
                        'name_ua' => 'Класичний молочний чай',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'pumpkin-spice-latte',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/cafe/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Pumpkin Spice latte',
                        'name_ar' => 'قهوة لاتيه برائحه اليقطين',
                        'name_fr' => 'Latte à la citrouille et aux épices',
                        'name_it' => 'Latte speziato alla zucca',
                        'name_de' => 'Kürbisgewürz Latte',
                        'name_es' => 'Latte de especias de calabaza',
                        'name_ua' => 'Гарбузове латте',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cinnamon-latte',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/cafe/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Cinnamon latte',
                        'name_ar' => 'سينامون لاتيه',
                        'name_fr' => 'Latte à la cannelle',
                        'name_it' => 'Latte alla cannella',
                        'name_de' => 'Zimt Latte',
                        'name_es' => 'Latte de canela',
                        'name_ua' => 'Латте з корицею',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'matcha-milk-tea',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/cafe/cat2_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat2_prod5_thumbnail.webp',
                        'name_en' => 'Matcha Milk tea',
                        'name_ar' => 'شاي ماتشا بالحليب',
                        'name_fr' => 'Thé au lait matcha',
                        'name_it' => 'Tè al latte Matcha',
                        'name_de' => 'Matcha-Milchtee',
                        'name_es' => 'Té Matcha con leche',
                        'name_ua' => 'Молочний чай матча',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'blended-tea',
                'imgUrl' => 'imgs/demo/cafe/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/cafe/cat3_thumbnail.webp',
                'name_en' => 'Blended Tea',
                'name_ar' => 'شاي مخلوط',
                'name_fr' => 'Thé mélangé',
                'name_it' => 'Tè Miscelato',
                'name_de' => 'Gemischter Tee',
                'name_es' => 'Té Mezclado',
                'name_ua' => 'Купажований чай',
                'products' => [
                    [
                        'name' => 'green-tea',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/cafe/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Green Tea',
                        'name_ar' => 'شاي أخضر',
                        'name_fr' => 'Thé vert',
                        'name_it' => 'Tè verde',
                        'name_de' => 'Grüner Tee',
                        'name_es' => 'Té verde',
                        'name_ua' => 'Зелений чай',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'mixed-berry-tea',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/cafe/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Mixed Berry Tea',
                        'name_ar' => 'شاي التوت المختلط',
                        'name_fr' => 'Thé aux baies mélangées',
                        'name_it' => 'Tè ai frutti di bosco',
                        'name_de' => 'Gemischter Beerentee',
                        'name_es' => 'Té de bayas mixtas',
                        'name_ua' => 'Змішаний ягідний чай',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'grapefruit-tea',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/cafe/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Grapefruit Tea',
                        'name_ar' => 'شاي الجريب فروت',
                        'name_fr' => 'Thé au Pamplemousse',
                        'name_it' => 'Tè al pompelmo',
                        'name_de' => 'Grapefruit-Tee',
                        'name_es' => 'Té de pomelo',
                        'name_ua' => 'Грейпфрутовий чай',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'kiwi-green-tea',
                        'price' => 5.5,
                        'imgUrl' => 'imgs/demo/cafe/cat3_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat3_prod4_thumbnail.webp',
                        'name_en' => 'Kiwi Green Tea',
                        'name_ar' => 'شاي أخضر كيوي',
                        'name_fr' => 'Thé Vert Kiwi',
                        'name_it' => 'Tè verde al kiwi',
                        'name_de' => 'Kiwi-Grüntee',
                        'name_es' => 'Té verde kiwi',
                        'name_ua' => 'Зелений чай ківі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'milkshakes',
                'imgUrl' => 'imgs/demo/cafe/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/cafe/cat4_thumbnail.webp',
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
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/cafe/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat4_prod1_thumbnail.webp',
                        'name_en' => 'Vanilla Special Milkshake',
                        'name_ar' => 'ميلك شيك الفانيليا الخاص',
                        'name_fr' => 'Milkshake Spécial Vanille',
                        'name_it' => 'Frappè speciale alla vaniglia',
                        'name_de' => 'Vanille-Spezial-Milchshake',
                        'name_es' => 'Malteada especial de vainilla',
                        'name_ua' => 'Ванільний спеціальний молочний коктейль',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chocolate-milkshake',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/cafe/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat4_prod2_thumbnail.webp',
                        'name_en' => 'Chocolate Milkshake',
                        'name_ar' => 'ميلك شيك شوكولاتة',
                        'name_fr' => 'Milkshake au chocolat',
                        'name_it' => 'Frappè Al Cioccolato',
                        'name_de' => 'Schokoladenmilchshake',
                        'name_es' => 'Malteada de chocolate',
                        'name_ua' => 'Шоколадний молочний коктейль',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'strawberry-milkshake',
                        'price' => 8.5,
                        'imgUrl' => 'imgs/demo/cafe/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat4_prod3_thumbnail.webp',
                        'name_en' => 'Strawberry Milkshake',
                        'name_ar' => 'مخفوق الحليب بالفرواله',
                        'name_fr' => 'Milkshake à la fraise',
                        'name_it' => 'Frullato alla fragola',
                        'name_de' => 'Erdbeer Milchshake',
                        'name_es' => 'Batido de fresa',
                        'name_ua' => 'Полуничний молочний коктейль',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'buttermilk-banana-milkshake',
                        'price' => 9,
                        'imgUrl' => 'imgs/demo/cafe/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat4_prod4_thumbnail.webp',
                        'name_en' => 'Buttermilk Banana Milkshake',
                        'name_ar' => 'اللبن والموز ميلك شيك',
                        'name_fr' => 'Milkshake aux bananes et au babeurre',
                        'name_it' => 'Frappè alla banana e latticello',
                        'name_de' => 'Buttermilch-Bananen-Milchshake',
                        'name_es' => 'Batido De Plátano Y Suero De Mantequilla',
                        'name_ua' => 'Пахта банановий молочний коктейль',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'cake',
                'imgUrl' => 'imgs/demo/cafe/cat5.webp',
                'thumbnailUrl' => 'imgs/demo/cafe/cat5_thumbnail.webp',
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
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat5_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat5_prod1_thumbnail.webp',
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
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/cafe/cat5_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat5_prod2_thumbnail.webp',
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
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/cafe/cat5_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat5_prod3_thumbnail.webp',
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
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/cafe/cat5_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat5_prod4_thumbnail.webp',
                        'name_en' => 'Cheesecake',
                        'name_ar' => 'تشيز كيك',
                        'name_fr' => 'cheesecake',
                        'name_it' => 'Torta di formaggio',
                        'name_de' => 'Käsekuchen',
                        'name_es' => 'Tarta de queso',
                        'name_ua' => 'Чізкейк',
                        'options' => [
                            [
                                'name' => 'syrup',
                                'name_en' => 'Syrup',
                                'name_ar' => 'شراب مركز',
                                'name_fr' => 'Sirop',
                                'name_it' => 'Sciroppo',
                                'name_de' => 'Sirup',
                                'name_es' => 'Jarabe',
                                'name_ua' => 'Сироп',
                                'selections' => [
                                    [
                                        'name' => 'strawberry',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Strawberry',
                                        'name_ar' => 'الفراولة',
                                        'name_fr' => 'Fraise',
                                        'name_it' => 'Fragola',
                                        'name_de' => 'Erdbeere',
                                        'name_es' => 'Fresa',
                                        'name_ua' => 'Полуниця',
                                    ],
                                    [
                                        'name' => 'chocolate',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Chocolate',
                                        'name_ar' => 'شوكولاتة',
                                        'name_fr' => 'Chocolat',
                                        'name_it' => 'Cioccolato',
                                        'name_de' => 'Schokolade',
                                        'name_es' => 'Chocolate',
                                        'name_ua' => 'Шоколад',
                                    ],
                                    [
                                        'name' => 'caramel',
                                        'price' => 0,
                                        'isDefault' => false,
                                        'name_en' => 'Caramel',
                                        'name_ar' => 'الكراميل',
                                        'name_fr' => 'Caramel',
                                        'name_it' => 'Caramello',
                                        'name_de' => 'Karamell',
                                        'name_es' => 'Caramelo',
                                        'name_ua' => 'Карамель',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'chocolate-fudge',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/cafe/cat5_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/cafe/cat5_prod5_thumbnail.webp',
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
        ];
        demo::website($cafe,$categories);
    }

}
