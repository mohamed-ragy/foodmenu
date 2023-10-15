<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class seafood extends Seeder
{

    public function run()
    {
        $seafood = new stdClass();
        $seafood->domainName = 'seafood';
        $seafood->website_names = [
            'en' => 'Seafood',
            'ar' => 'مأكولات بحرية',
            'fr' => 'Fruits de mer',
            'de' => 'Meeresfrüchte',
            'it' => 'Frutti di mare',
            'es' => 'Mariscos',
            'ua' => 'Морепродукти',
            'ru' => '',
        ];
        $seafood->intro = [
            'en' => 'Deep from the sea Freshly cooked onto your plate',
            'ar' => 'في أعماق البحر مطبوخ طازجًا على طبقك',
            'fr' => 'Au plus profond de la mer Fraîchement cuit dans votre assiette',
            'de' => 'Tief aus dem Meer Frisch gekocht auf Ihren Teller',
            'it' => 'Profondo dal mare Appena cucinato nel piatto',
            'es' => 'Profundo del mar Recién cocinado en tu plato',
            'ua' => 'Глибоко з моря. Щойно приготований на вашій тарілці',
            'ru' => '',
        ];
        $categories = [
            [
                'name' => 'fried',
                'imgUrl' => 'imgs/demo/seafood/cat1.webp',
                'thumbnailUrl' => 'imgs/demo/seafood/cat1_thumbnail.webp',
                'name_en' => 'Fried',
                'name_ar' => 'المقلية',
                'name_fr' => 'Frit',
                'name_it' => 'Fritto',
                'name_de' => 'Gebraten',
                'name_es' => 'Frito',
                'name_ua' => 'Смажені',
                'products' => [
                    [
                        'name' => 'fried-shrimp',
                        'price' => 9,
                        'imgUrl' => 'imgs/demo/seafood/cat1_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat1_prod1_thumbnail.webp',
                        'name_en' => 'Fried Shrimp',
                        'name_ar' => 'جمبري مقلي',
                        'name_fr' => 'Crevette frite',
                        'name_it' => 'Gamberetto fritto',
                        'name_de' => 'Gebratene Garnelen',
                        'name_es' => 'Camarón frito',
                        'name_ua' => 'Смажені креветки',
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
                        'name' => 'fried-fish-filet',
                        'price' => 7.5,
                        'imgUrl' => 'imgs/demo/seafood/cat1_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat1_prod2_thumbnail.webp',
                        'name_en' => 'Fried Fish Filet',
                        'name_ar' => 'فيليه سمك مقلي',
                        'name_fr' => 'Filet de poisson frit',
                        'name_it' => 'Filetto Di Pesce Fritto',
                        'name_de' => 'Gebratenes Fischfilet',
                        'name_es' => 'Filete De Pescado Frito',
                        'name_ua' => 'Смажене рибне філе',
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
                        'name' => 'fried-lemon-garlic-salmon',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/seafood/cat1_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat1_prod3_thumbnail.webp',
                        'name_en' => 'Fried Lemon-Garlic Salmon',
                        'name_ar' => 'سلمون مقلي بالليمون والثوم',
                        'name_fr' => 'Saumon frit au citron et à l\'ail',
                        'name_it' => 'Salmone fritto al limone e aglio',
                        'name_de' => 'Gebratener Zitronen-Knoblauch-Lachs',
                        'name_es' => 'Salmón frito con limón y ajo',
                        'name_ua' => 'Смажена лимонно-часникова сьомга',
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
                        'name' => 'fried-scallops',
                        'price' => 8.5,
                        'imgUrl' => 'imgs/demo/seafood/cat1_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat1_prod4_thumbnail.webp',
                        'name_en' => 'Fried Scallops',
                        'name_ar' => 'اسقلوب مقلي',
                        'name_fr' => 'Pétoncles frits',
                        'name_it' => 'Capesante Fritte',
                        'name_de' => 'Gebratene Jakobsmuscheln',
                        'name_es' => 'Vieiras Fritas',
                        'name_ua' => 'Смажені гребінці',
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
                'name' => 'grilled',
                'imgUrl' => 'imgs/demo/seafood/cat2.webp',
                'thumbnailUrl' => 'imgs/demo/seafood/cat2_thumbnail.webp',
                'name_en' => 'Grilled',
                'name_ar' => 'مشوي',
                'name_fr' => 'Grillé',
                'name_it' => 'Alla griglia',
                'name_de' => 'Gegrillt',
                'name_es' => 'A la parrilla',
                'name_ua' => 'на грилі',
                'products' => [
                    [
                        'name' => 'grilled-oysters-with-chorizo-butter',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/seafood/cat2_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat2_prod1_thumbnail.webp',
                        'name_en' => 'Grilled Oysters with Chorizo Butter',
                        'name_ar' => 'محار مشوي بزبدة تشوريزو',
                        'name_fr' => 'Huîtres grillées au beurre de chorizo',
                        'name_it' => 'Ostriche alla griglia con burro di chorizo',
                        'name_de' => 'Gegrillte Austern mit Chorizo-Butter',
                        'name_es' => 'Ostras a la Plancha con Mantequilla de Chorizo',
                        'name_ua' => 'Устриці на грилі з маслом чорізо',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'jerk-grilled-lobster',
                        'price' => 11,
                        'imgUrl' => 'imgs/demo/seafood/cat2_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat2_prod2_thumbnail.webp',
                        'name_en' => 'Jerk-Grilled Lobster',
                        'name_ar' => 'لوبستر مشوي',
                        'name_fr' => 'Homard grillé à la jerk',
                        'name_it' => 'Aragosta alla griglia',
                        'name_de' => 'Gegrillter Hummer',
                        'name_es' => 'Langosta a la parrilla',
                        'name_ua' => 'Лобстер на грилі',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'grilled-salmon',
                        'price' => 13,
                        'imgUrl' => 'imgs/demo/seafood/cat2_prod3.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat2_prod3_thumbnail.webp',
                        'name_en' => 'Grilled Salmon',
                        'name_ar' => 'سلمون مشوي',
                        'name_fr' => 'Saumon grillé',
                        'name_it' => 'Salmone grigliato',
                        'name_de' => 'Gegrillter Lachs',
                        'name_es' => 'Salmón a la parrilla',
                        'name_ua' => 'Лосось на грилі',
                        'options' => [
                        ]
                    ],
                    [
                        'name' => 'snow-crab-with-garlic-butter-sauce',
                        'price' => 10,
                        'imgUrl' => 'imgs/demo/seafood/cat2_prod4.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat2_prod4_thumbnail.webp',
                        'name_en' => 'Snow Crab with Garlic-Butter Sauce',
                        'name_ar' => 'سلطعون الثلج بصلصة الزبدة بالثوم',
                        'name_fr' => 'Crabe des neiges avec sauce au beurre à l\'ail',
                        'name_it' => 'Granchio delle nevi con salsa al burro e aglio',
                        'name_de' => 'Schneekrabbe mit Knoblauch-Butter-Sauce',
                        'name_es' => 'Cangrejo de las nieves con salsa de ajo y mantequilla',
                        'name_ua' => 'Сніжний краб з часниково-масляним соусом',
                        'options' => [
                        ]
                    ],
                ]
            ],
            [
                'name' => 'soups',
                'imgUrl' => 'imgs/demo/seafood/cat3.webp',
                'thumbnailUrl' => 'imgs/demo/seafood/cat3_thumbnail.webp',
                'name_en' => 'Soups',
                'name_ar' => 'الحساء',
                'name_fr' => 'Soupes',
                'name_it' => 'Zuppe',
                'name_de' => 'Suppen',
                'name_es' => 'sopas',
                'name_ua' => 'Супи',
                'products' => [
                    [
                        'name' => 'creamy-shrimp-bisque',
                        'price' => 8,
                        'imgUrl' => 'imgs/demo/seafood/cat3_prod1.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat3_prod1_thumbnail.webp',
                        'name_en' => 'Creamy Shrimp Bisque',
                        'name_ar' => 'كريمة الجمبري بيسك',
                        'name_fr' => 'Bisque de crevettes crémeuse',
                        'name_it' => 'Biscotto cremoso di gamberi',
                        'name_de' => 'Cremige Garnelencremesuppe',
                        'name_es' => 'Sopa cremosa de camarones',
                        'name_ua' => 'Вершковий креветковий бісквіт',
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
                        'name' => 'thai-seafood-soup',
                        'price' => 12,
                        'imgUrl' => 'imgs/demo/seafood/cat3_prod2.webp',
                        'thumbnailUrl' => 'imgs/demo/seafood/cat3_prod2_thumbnail.webp',
                        'name_en' => 'Thai Seafood Soup',
                        'name_ar' => 'شوربة المأكولات البحرية التايلاندية',
                        'name_fr' => 'Soupe aux fruits de mer thaïlandaise',
                        'name_it' => 'Zuppa Di Pesce Tailandese',
                        'name_de' => 'Thailändische Meeresfrüchtesuppe',
                        'name_es' => 'Sopa Tailandesa De Mariscos',
                        'name_ua' => 'Тайський суп з морепродуктів',
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
                                        'name' => 'large',
                                        'price' => 6,
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
        demo::website($seafood,$categories);
    }

}
