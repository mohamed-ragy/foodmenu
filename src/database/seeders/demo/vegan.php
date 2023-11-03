<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class vegan extends Seeder
{

    public function run()
    {
        $vegan = new stdClass();
        $vegan->domainName = 'vegan';
        $vegan->template = 12;
        $vegan->website_names = [
            'en' => 'Vegan Restaurant',
            'ar' => 'مطعم نباتي',
            'fr' => 'Restaurant végétalien',
            'de' => 'Veganes Restaurant',
            'it' => 'Ristorante vegano',
            'es' => 'Restaurante vegano',
            'ua' => 'Веганський ресторан',
            'ru' => '',
        ];
        $vegan->intro = [
            'en' => 'All plant-based, all made in health',
            'ar' => 'كلها نباتية ، كلها مصنوعة في الصحة',
            'fr' => 'Tout végétal, tout made in health',
            'de' => 'Alles pflanzlich, alles gesund gemacht',
            'it' => 'Tutto vegetale, tutto made in health',
            'es' => 'Todo a base de plantas, todo hecho en salud',
            'ua' => 'Все на рослинній основі, все зроблено здоровим',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'breakfast',
                'imgUrl' => 'imgs/demo/vegan/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/vegan/cat1_thumbnail.webp',
                'name_en' => 'Breakfast',
                'name_ar' => 'إفطار',
                'name_fr' => 'Déjeuner',
                'name_it' => 'Prima colazione',
                'name_de' => 'Frühstück',
                'name_es' => 'Desayuno',
                'name_ua' => 'Сніданок',
                'products' => [
                    [
                        'name' => 'tofu-scramble-toast',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/vegan/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Tofu Scramble Toast',
                        'name_ar' => 'توست التوفو التدافع',
                        'name_fr' => 'Toast brouillé au tofu',
                        'name_it' => 'Pane tostato al tofu',
                        'name_de' => 'Tofu-Rührei-Toast',
                        'name_es' => 'Tostadas Revueltas De Tofu',
                        'name_ua' => 'Тофу Скрембл Тост',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'avocado-toast',
                        'price' => 5.5,
                        'imgUrl' => 'imgs/demo/vegan/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Avocado Toast',
                        'name_ar' => 'توست الأفوكادو',
                        'name_fr' => 'Toast à l\'avocat',
                        'name_it' => 'Toast all\'avocado',
                        'name_de' => 'Avocado Toast',
                        'name_es' => 'tostada de aguacate',
                        'name_ua' => 'Тост з авокадо',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'vegan-mixed-berry-pancakes',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/vegan/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Vegan Mixed Berry Pancakes ',
                        'name_ar' => 'فطائر بان كيك نباتية مشكلة بالتوت',
                        'name_fr' => 'Crêpes végétaliennes aux baies mélangées',
                        'name_it' => 'Pancake vegani ai frutti di bosco',
                        'name_de' => 'Vegane gemischte Beerenpfannkuchen',
                        'name_es' => 'Panqueques veganos de bayas mixtas',
                        'name_ua' => 'Веганські млинці зі змішаними ягодами',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'vegan-potato-waffle',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/vegan/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Vegan Potato Waffle',
                        'name_ar' => 'وافل البطاطا النباتية',
                        'name_fr' => 'Gaufre végétalienne aux pommes de terre',
                        'name_it' => 'Waffle di patate vegano',
                        'name_de' => 'Vegane Kartoffelwaffel',
                        'name_es' => 'Waffle De Patata Vegano',
                        'name_ua' => 'Веганські картопляні вафлі',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'veggie-burgers',
                'imgUrl' => 'imgs/demo/vegan/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/vegan/cat2_thumbnail.webp',
                'name_en' => 'Veggie Burgers',
                'name_ar' => 'البرغر الخضروات',
                'name_fr' => 'burgers végétariens',
                'name_it' => 'Hamburger vegani',
                'name_de' => 'Vegetarische Burger',
                'name_es' => 'Hamburguesas vegetarianas',
                'name_ua' => 'Овочеві бургери',
                'products' => [
                    [
                        'name' => 'classic-veggie-burger',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/vegan/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Classic Veggie Burger',
                        'name_ar' => 'كلاسيك فيجي برجر',
                        'name_fr' => 'Burger Végé Classique',
                        'name_it' => 'Hamburger vegetariano classico',
                        'name_de' => 'Klassischer Veggie-Burger',
                        'name_es' => 'Hamburguesa vegetariana clásica',
                        'name_ua' => 'Класичний вегетаріанський бургер',
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
                                        'price' => 3,
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
                        'name' => 'sauteed-mushroom-burger',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/vegan/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Sauteed Mushroom Burger',
                        'name_ar' => 'برجر مشروم سوتيه',
                        'name_fr' => 'Burger aux champignons sautés',
                        'name_it' => 'Hamburger di funghi saltati',
                        'name_de' => 'Gebratener Champignon-Burger',
                        'name_es' => 'Hamburguesa De Champiñones Salteados',
                        'name_ua' => 'Бургер з смаженими грибами',
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
                                        'price' => 2.5,
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
                        'name' => 'beet-burger',
                        'price' => 6,
                        'imgUrl' => 'imgs/demo/vegan/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Beet Burger',
                        'name_ar' => 'برجر بنجر',
                        'name_fr' => 'Burger de betterave',
                        'name_it' => 'Hamburger di barbabietola',
                        'name_de' => 'Rüben-Burger',
                        'name_es' => 'Hamburguesa De Remolacha',
                        'name_ua' => 'Бургер з буряка',
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
                                        'price' => 2.5,
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
            [
                'name' => 'veggie-dishes',
                'imgUrl' => 'imgs/demo/vegan/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/vegan/cat3_thumbnail.webp',
                'name_en' => 'Veggie Dishes',
                'name_ar' => 'أطباق الخضار',
                'name_fr' => 'Plats végétariens',
                'name_it' => 'Piatti vegetariani',
                'name_de' => 'Vegetarische Gerichte',
                'name_es' => 'Platos vegetarianos',
                'name_ua' => 'Овочеві страви',
                'products' => [
                    [
                        'name' => 'veggie-pasta',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/vegan/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Veggie Pasta',
                        'name_ar' => 'باستا نباتية',
                        'name_fr' => 'Pâtes aux légumes',
                        'name_it' => 'Pasta Vegetale',
                        'name_de' => 'Vegetarische Nudeln',
                        'name_es' => 'Pasta vegetariana',
                        'name_ua' => 'Овочева паста',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'chili-bowl',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/vegan/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Chili Bowl',
                        'name_ar' => 'وعاء الفلفل الحار',
                        'name_fr' => 'Bol de chili',
                        'name_it' => 'Ciotola di peperoncino',
                        'name_de' => 'Chili-Bowl',
                        'name_es' => 'Tazón de Chile',
                        'name_ua' => 'Чаша чилі',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'black-bean-rice',
                        'price' => 7,
                        'imgUrl' => 'imgs/demo/vegan/cat3_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat3_prod3_thumbnail.webp',
                        'name_en' => 'Black Bean Rice',
                        'name_ar' => 'أرز الفاصوليا السوداء',
                        'name_fr' => 'Riz aux haricots noirs',
                        'name_it' => 'Riso ai fagioli neri',
                        'name_de' => 'Reis mit schwarzen Bohnen',
                        'name_es' => 'Arroz De Frijoles Negros',
                        'name_ua' => 'Чорний бобовий рис',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'salads',
                'imgUrl' => 'imgs/demo/vegan/cat4.webp',
                'thumbnailUrl' => 'imgs/demo/vegan/cat4_thumbnail.webp',
                'name_en' => 'Salads',
                'name_ar' => 'سلطة',
                'name_fr' => 'Salades',
                'name_it' => 'Insalate',
                'name_de' => 'Salate',
                'name_es' => 'ensaladas',
                'name_ua' => 'Салати',
                'products' => [
                    [
                        'name' => 'pumpkin-salad',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/vegan/cat4_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat4_prod1_thumbnail.webp',
                        'name_en' => 'Pumpkin Salad',
                        'name_ar' => 'سلطة اليقطين',
                        'name_fr' => 'Salade de potiron',
                        'name_it' => 'Insalata Di Zucca',
                        'name_de' => 'Kürbissalat',
                        'name_es' => 'Ensalada De Calabaza',
                        'name_ua' => 'Салат з гарбуза',
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
                                        'name' => 'small-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Small ',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeña',
                                        'name_ua' => 'Маленький',
                                    ],
                                    [
                                        'name' => 'medium',
                                        'price' => 2.5,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'caesar-salad',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/vegan/cat4_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat4_prod2_thumbnail.webp',
                        'name_en' => 'Caesar Salad',
                        'name_ar' => 'سلطة سيزر',
                        'name_fr' => 'Salade César',
                        'name_it' => 'Insalata Cesare',
                        'name_de' => 'Caesar Salat',
                        'name_es' => 'Ensalada César',
                        'name_ua' => 'Салат Цезар',
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
                                        'name' => 'small-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Small ',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeña',
                                        'name_ua' => 'Маленький',
                                    ],
                                    [
                                        'name' => 'medium',
                                        'price' => 2,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'greek-salad',
                        'price' => 4,
                        'imgUrl' => 'imgs/demo/vegan/cat4_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat4_prod3_thumbnail.webp',
                        'name_en' => 'Greek salad',
                        'name_ar' => 'سلطة يونانية',
                        'name_fr' => 'salade grecque',
                        'name_it' => 'Insalata greca',
                        'name_de' => 'griechischer Salat',
                        'name_es' => 'ensalada griega',
                        'name_ua' => 'Грецький салат',
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
                                        'name' => 'small-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Small ',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeña',
                                        'name_ua' => 'Маленький',
                                    ],
                                    [
                                        'name' => 'medium',
                                        'price' => 2,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'name' => 'kale-salad',
                        'price' => 5,
                        'imgUrl' => 'imgs/demo/vegan/cat4_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/vegan/cat4_prod4_thumbnail.webp',
                        'name_en' => 'Kale salad',
                        'name_ar' => 'سلطة الكرنب',
                        'name_fr' => 'Salade de chou frisé',
                        'name_it' => 'Insalata di cavolo',
                        'name_de' => 'Grünkohl Salat',
                        'name_es' => 'Ensalada de col rizada',
                        'name_ua' => 'Салат з капусти',
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
                                        'name' => 'small-',
                                        'price' => 0,
                                        'isDefault' => true,
                                        'name_en' => 'Small ',
                                        'name_ar' => 'صغير',
                                        'name_fr' => 'Petit',
                                        'name_it' => 'Piccolo',
                                        'name_de' => 'Klein',
                                        'name_es' => 'Pequeña',
                                        'name_ua' => 'Маленький',
                                    ],
                                    [
                                        'name' => 'medium',
                                        'price' => 2.5,
                                        'isDefault' => false,
                                        'name_en' => 'Medium',
                                        'name_ar' => 'متوسط',
                                        'name_fr' => 'Moyen',
                                        'name_it' => 'medio',
                                        'name_de' => 'Mittel',
                                        'name_es' => 'Medio',
                                        'name_ua' => 'Середній',
                                    ],
                                ]
                            ],
                        ]
                    ],
                ]
            ],
        ];
        demo::website($vegan,$categories);
    }

}
