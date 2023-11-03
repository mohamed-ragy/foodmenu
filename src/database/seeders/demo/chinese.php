<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class chinese extends Seeder
{

    public function run()
    {
        $chinese = new stdClass();
        $chinese->domainName = 'chinese';
        $chinese->template = 19;
        $chinese->website_names = [
            'en' => 'Chinese',
            'ar' => 'صينى',
            'fr' => 'Chinois',
            'de' => 'Chinesisch',
            'it' => 'Cinese',
            'es' => 'Chino',
            'ua' => 'китайський',
            'ru' => '',
        ];
        $chinese->intro = [
            'en' => 'The Chinese experience you’re craving for',
            'ar' => 'التجربة الصينية التي تتوق إليها',
            'fr' => 'L\'expérience chinoise dont vous rêvez',
            'de' => 'Die chinesische Erfahrung, nach der Sie sich sehnen',
            'it' => 'L\'esperienza cinese che desideri',
            'es' => 'La experiencia china que anhelas',
            'ua' => 'Китайський досвід, якого ви прагнете',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'main-course',
                'imgUrl' => 'imgs/demo/chinese/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat1_thumbnail.webp',
                'name_en' => 'Main Course',
                'name_ar' => 'الطبق الرئيسي',
                'name_fr' => 'Plat principal',
                'name_it' => 'Portata principale',
                'name_de' => 'Hauptkurs',
                'name_es' => 'Plato principal',
                'name_ua' => 'Головна страва',
                'products' => [
                    [
                        'name' => 'chow-mein',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Chow Mein',
                        'name_ar' => 'تشاو مين',
                        'name_fr' => 'Chow Mein',
                        'name_it' => 'Chow Mein',
                        'name_de' => 'Chow Mein',
                        'name_es' => 'Chow mein',
                        'name_ua' => 'Чоу Майн',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'zha-jiang-mian',
                        'price' => 12,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Zha Jiang Mian',
                        'name_ar' => 'تشا جيانغ ميان',
                        'name_fr' => 'Zha Jiang Mian',
                        'name_it' => 'Zha Jiang Mian',
                        'name_de' => 'Zha Jiang Mian',
                        'name_es' => 'Zha Jiang Mian',
                        'name_ua' => 'Чжа Цзян Міан',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'kung-pao-chicken',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Kung Pao Chicken',
                        'name_ar' => 'دجاج كونغ باو',
                        'name_fr' => 'Poulet Kung Pao',
                        'name_it' => 'Pollo Kung Pao',
                        'name_de' => 'Kung Pao Hühnerfleisch',
                        'name_es' => 'Pollo kung pao',
                        'name_ua' => 'Курка Кунг Пао',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'peking-duck',
                        'price' => 11,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Peking Duck',
                        'name_ar' => 'بطة بكين',
                        'name_fr' => 'Canard laqué',
                        'name_it' => 'Anatra pechinese',
                        'name_de' => 'Pekingente',
                        'name_es' => 'Pato Pekín',
                        'name_ua' => 'Пекінська качка',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'mapotofu',
                        'price' => 12,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod5.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod5_thumbnail.webp',
                        'name_en' => 'MapoTofu',
                        'name_ar' => 'مابوتوفو',
                        'name_fr' => 'MapoTofu',
                        'name_it' => 'MapoTofu',
                        'name_de' => 'MapoTofu',
                        'name_es' => 'MapoTofu',
                        'name_ua' => 'МапоТофу',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'char-siu',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod6.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod6_thumbnail.webp',
                        'name_en' => 'Char Siu',
                        'name_ar' => 'شار سيو',
                        'name_fr' => 'Char Siu',
                        'name_it' => 'Char Siu',
                        'name_de' => 'Char Siu',
                        'name_es' => 'Char siu',
                        'name_ua' => 'Чар Сіу',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'sweet-and-sour-pork',
                        'price' => 9.5,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod7.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod7_thumbnail.webp',
                        'name_en' => 'Sweet and sour pork',
                        'name_ar' => 'لحم الخنزير الحلو والمر',
                        'name_fr' => 'Porc aigre-doux',
                        'name_it' => 'Maiale in agrodolce',
                        'name_de' => 'Schweinefleisch süß-sauer',
                        'name_es' => 'Cerdo agridulce',
                        'name_ua' => 'Кисло-солодка свинина',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'hot-pot',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/chinese/cat1_prod8.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat1_prod8_thumbnail.webp',
                        'name_en' => 'Hot pot',
                        'name_ar' => 'وعاء ساخن',
                        'name_fr' => 'Pot chaud',
                        'name_it' => 'Pentola calda',
                        'name_de' => 'Heißer Topf',
                        'name_es' => 'olla caliente',
                        'name_ua' => 'Гарячий горщик',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'noodles',
                'imgUrl' => 'imgs/demo/chinese/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat2_thumbnail.webp',
                'name_en' => 'Noodles',
                'name_ar' => 'المعكرونة',
                'name_fr' => 'Nouilles',
                'name_it' => 'Tagliatelle',
                'name_de' => 'Nudeln',
                'name_es' => 'Fideos',
                'name_ua' => 'локшина',
                'products' => [
                    [
                        'name' => 'wonton-&-noodles',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/chinese/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Wonton & Noodles',
                        'name_ar' => 'فطيرة باللحم و النودلز',
                        'name_fr' => 'Wonton & Nouilles',
                        'name_it' => 'Wonton e tagliatelle',
                        'name_de' => 'Wan-Tan & Nudeln',
                        'name_es' => 'wonton y fideos',
                        'name_ua' => 'Wonton & Noodles',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'sliced-noodles',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/chinese/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Sliced Noodles',
                        'name_ar' => 'نودلز شرائح',
                        'name_fr' => 'Nouilles tranchées',
                        'name_it' => 'Tagliatelle Affettate',
                        'name_de' => 'Geschnittene Nudeln',
                        'name_es' => 'Fideos Rebanados',
                        'name_ua' => 'Нарізана локшина',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'spicy-hot-noodles',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/chinese/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Spicy Hot Noodles',
                        'name_ar' => 'نودلز حارة حارة',
                        'name_fr' => 'Nouilles chaudes épicées',
                        'name_it' => 'Tagliatelle calde piccanti',
                        'name_de' => 'Würzige heiße Nudeln',
                        'name_es' => 'Fideos calientes picantes',
                        'name_ua' => 'Пряна гаряча локшина',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'seafood-noodles',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/chinese/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Seafood Noodles',
                        'name_ar' => 'نودلز المأكولات البحرية',
                        'name_fr' => 'Nouilles Aux Fruits De Mer',
                        'name_it' => 'Tagliatelle ai frutti di mare',
                        'name_de' => 'Meeresfrüchte-Nudeln',
                        'name_es' => 'Fideos De Mariscos',
                        'name_ua' => 'Локшина з морепродуктів',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'rice',
                'imgUrl' => 'imgs/demo/chinese/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat3_thumbnail.webp',
                'name_en' => 'Rice',
                'name_ar' => 'أرز',
                'name_fr' => 'Riz',
                'name_it' => 'Riso',
                'name_de' => 'Reis',
                'name_es' => 'Arroz',
                'name_ua' => 'Рис',
                'products' => [
                    [
                        'name' => 'rice-porridge',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/chinese/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Rice Porridge',
                        'name_ar' => 'عصيدة الأرز',
                        'name_fr' => 'Bouillie de riz',
                        'name_it' => 'Farinata Di Riso',
                        'name_de' => 'Reisbrei',
                        'name_es' => 'Gachas De Arroz',
                        'name_ua' => 'Рисова каша',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'plain-white-rice',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/chinese/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Plain White Rice',
                        'name_ar' => 'أرز أبيض سادة',
                        'name_fr' => 'Riz Blanc Nature',
                        'name_it' => 'Riso bianco normale',
                        'name_de' => 'Einfacher weißer Reis',
                        'name_es' => 'Arroz Blanco Natural',
                        'name_ua' => 'Звичайний білий рис',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'fried-rice',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/chinese/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Fried rice',
                        'name_ar' => 'أرز مقلي',
                        'name_fr' => 'Riz sauté',
                        'name_it' => 'Riso fritto',
                        'name_de' => 'Gebratener Reis',
                        'name_es' => 'Arroz frito',
                        'name_ua' => 'Смажений рис',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'sides',
                'imgUrl' => 'imgs/demo/chinese/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat4_thumbnail.webp',
                'name_en' => 'Sides',
                'name_ar' => 'الجانبين',
                'name_fr' => 'Côtés',
                'name_it' => 'Lati',
                'name_de' => 'Seiten',
                'name_es' => 'Lados',
                'name_ua' => 'сторони',
                'products' => [
                    [
                        'name' => 'spring-rolls',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/chinese/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat4_prod1_thumbnail.webp',
                        'name_en' => 'Spring rolls',
                        'name_ar' => 'ملفوفات الربيع "أكلة',
                        'name_fr' => 'Rouleaux de printemps',
                        'name_it' => 'Involtini primavera',
                        'name_de' => 'Frühlingsrollen',
                        'name_es' => 'Rollitos de primavera',
                        'name_ua' => 'Рулети',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'egg-rolls',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/chinese/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat4_prod2_thumbnail.webp',
                        'name_en' => 'Egg rolls',
                        'name_ar' => 'لفات بيض',
                        'name_fr' => 'Des nems',
                        'name_it' => 'Involtini',
                        'name_de' => 'Eierbrötchen',
                        'name_es' => 'Rollos de huevo',
                        'name_ua' => 'Яєчні рулетики',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'tofu-pudding',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/chinese/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat4_prod3_thumbnail.webp',
                        'name_en' => 'Tofu Pudding',
                        'name_ar' => 'بودنغ التوفو',
                        'name_fr' => 'Pouding au tofu',
                        'name_it' => 'Budino Di Tofu',
                        'name_de' => 'Tofu-Pudding',
                        'name_es' => 'Pudín de tofu',
                        'name_ua' => 'Пудинг з тофу',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'rice-tube-pudding',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/chinese/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat4_prod4_thumbnail.webp',
                        'name_en' => 'Rice Tube Pudding',
                        'name_ar' => 'أرز باللبن',
                        'name_fr' => 'Pouding au riz en tube',
                        'name_it' => 'Budino Di Tubo Di Riso',
                        'name_de' => 'Reisrohrpudding',
                        'name_es' => 'Budín de tubo de arroz',
                        'name_ua' => 'Рисовий трубочковий пудинг',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'soups',
                'imgUrl' => 'imgs/demo/chinese/cat5.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat5_thumbnail.webp',
                'name_en' => 'Soups',
                'name_ar' => 'الحساء',
                'name_fr' => 'Soupes',
                'name_it' => 'Zuppe',
                'name_de' => 'Suppen',
                'name_es' => 'sopas',
                'name_ua' => 'Супи',
                'products' => [
                    [
                        'name' => 'wonton-soup',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/chinese/cat5_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat5_prod1_thumbnail.webp',
                        'name_en' => 'Wonton Soup',
                        'name_ar' => 'شوربة وانتون',
                        'name_fr' => 'Soupe wonton',
                        'name_it' => 'Zuppa di wonton',
                        'name_de' => 'Wonton Suppe',
                        'name_es' => 'Sopa wonton',
                        'name_ua' => 'Суп Вонтон',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'oyster-soup',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/chinese/cat5_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat5_prod2_thumbnail.webp',
                        'name_en' => 'Oyster Soup',
                        'name_ar' => 'شوربة المحار',
                        'name_fr' => 'Soupe aux huîtres',
                        'name_it' => 'Zuppa Di Ostriche',
                        'name_de' => 'Austernsuppe',
                        'name_es' => 'sopa de ostras',
                        'name_ua' => 'Устричний суп',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'meatball-soup',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/chinese/cat5_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat5_prod3_thumbnail.webp',
                        'name_en' => 'Meatball Soup',
                        'name_ar' => 'حساء اللحم المفروم',
                        'name_fr' => 'Soupe aux boulettes de viande',
                        'name_it' => 'Zuppa Di Polpette',
                        'name_de' => 'Fleischbällchensuppe',
                        'name_es' => 'Sopa De Albóndigas',
                        'name_ua' => 'Суп з фрикадельками',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'potato-and-mushroom-soup',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/chinese/cat5_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat5_prod4_thumbnail.webp',
                        'name_en' => 'Potato and Mushroom Soup',
                        'name_ar' => 'شوربة البطاطس والفطر',
                        'name_fr' => 'Soupe de pommes de terre et champignons',
                        'name_it' => 'Zuppa di patate e funghi',
                        'name_de' => 'Kartoffel- und Pilzsuppe',
                        'name_es' => 'Sopa De Patatas Y Champiñones',
                        'name_ua' => 'Картопляно-грибний суп',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'dumplings',
                'imgUrl' => 'imgs/demo/chinese/cat6.webp',
                'thumbnailUrl' => 'imgs/demo/chinese/cat6_thumbnail.webp',
                'name_en' => 'Dumplings',
                'name_ar' => 'الزلابية',
                'name_fr' => 'Dumplings',
                'name_it' => 'Ravioli',
                'name_de' => 'Knödel',
                'name_es' => 'albóndigas',
                'name_ua' => 'пельмені',
                'products' => [
                    [
                        'name' => 'fried-dumplings',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/chinese/cat6_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat6_prod1_thumbnail.webp',
                        'name_en' => 'Fried Dumplings',
                        'name_ar' => 'الزلابية المقلية',
                        'name_fr' => 'Raviolis Frits',
                        'name_it' => 'Gnocchi Fritti',
                        'name_de' => 'Gebratene Knödel',
                        'name_es' => 'albóndigas fritas',
                        'name_ua' => 'Смажені вареники',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'dumplings-in-broth',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/chinese/cat6_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat6_prod2_thumbnail.webp',
                        'name_en' => 'Dumplings in Broth',
                        'name_ar' => 'الزلابية في مرق',
                        'name_fr' => 'Boulettes au Bouillon',
                        'name_it' => 'Gnocchi in Brodo',
                        'name_de' => 'Knödel in Brühe',
                        'name_es' => 'Albóndigas En Caldo',
                        'name_ua' => 'Пельмені в бульйоні',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'steamed-dumplings',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/chinese/cat6_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat6_prod3_thumbnail.webp',
                        'name_en' => 'Steamed Dumplings',
                        'name_ar' => 'الزلابية على البخار',
                        'name_fr' => 'Raviolis à la vapeur',
                        'name_it' => 'Gnocchi Al Vapore',
                        'name_de' => 'Dampfnudeln',
                        'name_es' => 'Empanadillas al vapor',
                        'name_ua' => 'Вареники на пару',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'cabbage-dumplings',
                        'price' => 6.5,
                        'imgUrl' => 'imgs/demo/chinese/cat6_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/chinese/cat6_prod4_thumbnail.webp',
                        'name_en' => 'Cabbage Dumplings',
                        'name_ar' => 'زلابية الملفوف',
                        'name_fr' => 'Quenelles de chou',
                        'name_it' => 'Gnocchi Di Cavolo',
                        'name_de' => 'Kohlknödel',
                        'name_es' => 'Albóndigas De Repollo',
                        'name_ua' => 'Вареники з капусти',
                        'options' => [
                        ]
                    ],
                ]
            ],
        ];
        demo::website($chinese,$categories);
    }

}
