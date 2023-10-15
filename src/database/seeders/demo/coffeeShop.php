<?php

namespace Database\Seeders\demo;

use App\Models\demo;
use Illuminate\Database\Seeder;
use stdClass;

class coffeeShop extends Seeder
{

    public function run()
    {

        // $coffeeShop = new stdClass();
        // $coffeeShop->domainName = 'coffeeshop';
        // $coffeeShop->website_names = [
        //     'en' => 'Coffee Shop',
        //     'ar' => 'مقهى',
        //     'fr' => 'Café',
        //     'de' => 'Café',
        //     'it' => 'Caffetteria',
        //     'es' => 'Cafetería',
        //     'ua' => 'Кав\'ярня',
        //     'ru' => '',
        // ];
        // $coffeeShop->intro = [
        //     'en' => 'A culture of coffee-loving',
        //     'ar' => 'ثقافة محبة للقهوة',
        //     'fr' => 'Une culture d\'amateurs de café',
        //     'de' => 'Eine Kultur der Kaffeeliebe',
        //     'it' => 'Una cultura dell\'amore per il caffè',
        //     'es' => 'Una cultura de amantes del café',
        //     'ua' => 'Культура каволюбства',
        //     'ru' => '',
        // ];
        // $categories = [
        //     [
        //         'name' => 'espresso',
        //         'imgUrl' => 'imgs/demo/coffeeShop/cat1.webp',
        //         'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_thumbnail.webp',
        //         'name_en' => 'Espresso',
        //         'name_ar' => 'إسبرسو',
        //         'name_fr' => 'Expresso',
        //         'name_it' => 'Caffè espresso',
        //         'name_de' => 'Espresso',
        //         'name_es' => 'Café exprés',
        //         'name_ua' => 'Еспресо',
        //         'products' => [
        //             [
        //                 'name' => 'macchiato',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod1.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod1_thumbnail.webp',
        //                 'name_en' => 'Macchiato',
        //                 'name_ar' => 'ماكياتو',
        //                 'name_fr' => 'Macchiato',
        //                 'name_it' => 'Macchiato',
        //                 'name_de' => 'Macchiato',
        //                 'name_es' => 'Macchiato',
        //                 'name_ua' => 'Макіато',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 3,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //             [
        //                 'name' => 'flat-white',
        //                 'price' => 3.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod2.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod2_thumbnail.webp',
        //                 'name_en' => 'Flat White',
        //                 'name_ar' => 'فلات وايت',
        //                 'name_fr' => 'Blanc plat',
        //                 'name_it' => 'Bianco uniforme',
        //                 'name_de' => 'Flaches Weiß',
        //                 'name_es' => 'Blanco plano',
        //                 'name_ua' => 'Flat White',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 2,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //             [
        //                 'name' => 'cortado',
        //                 'price' => 3,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod3.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod3_thumbnail.webp',
        //                 'name_en' => 'Cortado',
        //                 'name_ar' => 'كورتادو',
        //                 'name_fr' => 'Cortado',
        //                 'name_it' => 'Cortado',
        //                 'name_de' => 'Cortado',
        //                 'name_es' => 'cortado',
        //                 'name_ua' => 'Кортадо',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 2,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //             [
        //                 'name' => 'cuban-affogato',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod4.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod4_thumbnail.webp',
        //                 'name_en' => 'Cuban Affogato',
        //                 'name_ar' => 'أفوجاتو الكوبي',
        //                 'name_fr' => 'Affogato cubain',
        //                 'name_it' => 'Affogato cubano',
        //                 'name_de' => 'Kubanisches Affogato',
        //                 'name_es' => 'Afhogato cubano',
        //                 'name_ua' => 'Кубинський аффогато',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 2.5,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //             [
        //                 'name' => 'americano',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod5.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod5_thumbnail.webp',
        //                 'name_en' => 'Americano',
        //                 'name_ar' => 'أمريكانو',
        //                 'name_fr' => 'américain',
        //                 'name_it' => 'Americano',
        //                 'name_de' => 'Amerikaner',
        //                 'name_es' => 'americano',
        //                 'name_ua' => 'Американо',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 3,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //             [
        //                 'name' => 'cappuccino',
        //                 'price' => 3.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat1_prod6.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat1_prod6_thumbnail.webp',
        //                 'name_en' => 'Cappuccino',
        //                 'name_ar' => 'كابتشينو',
        //                 'name_fr' => 'Cappuccino',
        //                 'name_it' => 'Cappuccino',
        //                 'name_de' => 'Cappuccino',
        //                 'name_es' => 'Capuchino',
        //                 'name_ua' => 'Капучіно',
        //                 'options' => [
        //                     [
        //                         'name' => 'shot',
        //                         'name_en' => 'Shot',
        //                         'name_ar' => 'اطلاق النار',
        //                         'name_fr' => 'Tir',
        //                         'name_it' => 'Sparo',
        //                         'name_de' => 'Schuss',
        //                         'name_es' => 'Disparo',
        //                         'name_ua' => 'Постріл',
        //                         'selections' => [
        //                             [
        //                                 'name' => 'single',
        //                                 'price' => 0,
        //                                 'isDefault' => true,
        //                                 'name_en' => 'Single',
        //                                 'name_ar' => 'أعزب',
        //                                 'name_fr' => 'Seul',
        //                                 'name_it' => 'Separare',
        //                                 'name_de' => 'Einzel',
        //                                 'name_es' => 'Único',
        //                                 'name_ua' => 'неодружений',
        //                             ],
        //                             [
        //                                 'name' => 'double',
        //                                 'price' => 2,
        //                                 'isDefault' => false,
        //                                 'name_en' => 'Double',
        //                                 'name_ar' => 'مزدوج',
        //                                 'name_fr' => 'Double',
        //                                 'name_it' => 'Doppio',
        //                                 'name_de' => 'Doppelt',
        //                                 'name_es' => 'Doble',
        //                                 'name_ua' => 'Двомісний',
        //                             ],
        //                         ]
        //                     ],
        //                 ]
        //             ],
        //         ]
        //     ],
        //     [
        //         'name' => 'frappuccinos',
        //         'imgUrl' => 'imgs/demo/coffeeShop/cat2.webp',
        //         'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_thumbnail.webp',
        //         'name_en' => 'Frappuccinos',
        //         'name_ar' => 'فرابتشينو',
        //         'name_fr' => 'Frappuccinos',
        //         'name_it' => 'Frappuccini',
        //         'name_de' => 'Frappuccinos',
        //         'name_es' => 'Frappuccinos',
        //         'name_ua' => 'Фрапучино',
        //         'products' => [
        //             [
        //                 'name' => 'espresso-frappe',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat2_prod1.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_prod1_thumbnail.webp',
        //                 'name_en' => 'Espresso Frappe',
        //                 'name_ar' => 'اسبريسو فرابيه',
        //                 'name_fr' => 'Espresso Frappé',
        //                 'name_it' => 'Frappe all\'espresso',
        //                 'name_de' => 'Espresso-Frappé',
        //                 'name_es' => 'Espresso Frappé',
        //                 'name_ua' => 'Еспресо Фраппе',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'mocha-frappe',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat2_prod2.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_prod2_thumbnail.webp',
        //                 'name_en' => 'Mocha Frappe',
        //                 'name_ar' => 'موكا فرابيه',
        //                 'name_fr' => 'Moka Frappé',
        //                 'name_it' => 'Frappe alla moka',
        //                 'name_de' => 'Mokka Frappe',
        //                 'name_es' => 'Frapé de moca',
        //                 'name_ua' => 'Мокко Фраппе',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'vanilla-frappe',
        //                 'price' => 5.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat2_prod3.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_prod3_thumbnail.webp',
        //                 'name_en' => 'Vanilla Frappe',
        //                 'name_ar' => 'فانيلا فرابيه',
        //                 'name_fr' => 'Frappé à la vanille',
        //                 'name_it' => 'Frappe alla vaniglia',
        //                 'name_de' => 'Vanille Frappe',
        //                 'name_es' => 'Frappé de vainilla',
        //                 'name_ua' => 'Ванільний фраппе',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'caramel-frappe',
        //                 'price' => 4.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat2_prod4.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_prod4_thumbnail.webp',
        //                 'name_en' => 'Caramel Frappe',
        //                 'name_ar' => 'كراميل فرابيه',
        //                 'name_fr' => 'Frappé au caramel',
        //                 'name_it' => 'Frappe al caramello',
        //                 'name_de' => 'Caramel Frappe',
        //                 'name_es' => 'Licuado de caramelo',
        //                 'name_ua' => 'Карамельне фраппе',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'white-chocolate-mocha-frappe',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat2_prod5.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat2_prod5_thumbnail.webp',
        //                 'name_en' => 'White chocolate mocha frappe',
        //                 'name_ar' => 'موكا شوكولاتة بيضاء فرابيه',
        //                 'name_fr' => 'Frappé moka au chocolat blanc',
        //                 'name_it' => 'Frappe moka al cioccolato bianco',
        //                 'name_de' => 'Mokka-Frappé mit weißer Schokolade',
        //                 'name_es' => 'Frappé de moca con chocolate blanco',
        //                 'name_ua' => 'Мокко фраппе з білого шоколаду',
        //                 'options' => [
        //                 ]
        //             ],
        //         ]
        //     ],
        //     [
        //         'name' => 'brewed-coffee',
        //         'imgUrl' => 'imgs/demo/coffeeShop/cat3.webp',
        //         'thumbnailUrl' => 'imgs/demo/coffeeShop/cat3_thumbnail.webp',
        //         'name_en' => 'Brewed Coffee',
        //         'name_ar' => 'القهوة المعتقة',
        //         'name_fr' => 'Café infusé',
        //         'name_it' => 'Caffè preparato',
        //         'name_de' => 'Gebrühter Kaffee',
        //         'name_es' => 'Café preparado',
        //         'name_ua' => 'Зварена кава',
        //         'products' => [
        //             [
        //                 'name' => 'cold-brew-',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat3_prod1.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat3_prod1_thumbnail.webp',
        //                 'name_en' => 'Cold Brew ',
        //                 'name_ar' => 'مشروب بارد',
        //                 'name_fr' => 'Infusion à froid',
        //                 'name_it' => 'Birra Fredda',
        //                 'name_de' => 'Kaltes Gebräu',
        //                 'name_es' => 'cerveza fría',
        //                 'name_ua' => 'Cold Brew',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'coffee-with-a-shot',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat3_prod2.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat3_prod2_thumbnail.webp',
        //                 'name_en' => 'Coffee with a shot',
        //                 'name_ar' => 'قهوة بجرعة واحدة',
        //                 'name_fr' => 'Café avec un coup',
        //                 'name_it' => 'Caffè con un bicchierino',
        //                 'name_de' => 'Kaffee mit Schuss',
        //                 'name_es' => 'Café con un tiro',
        //                 'name_ua' => 'Кава з шотом',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'chocolate-au-lait',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat3_prod3.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat3_prod3_thumbnail.webp',
        //                 'name_en' => 'Chocolate Au lait',
        //                 'name_ar' => 'الشوكولاته Au lait',
        //                 'name_fr' => 'Chocolat au lait',
        //                 'name_it' => 'Cioccolato Au lait',
        //                 'name_de' => 'Schoko-Au-Lait',
        //                 'name_es' => 'Chocolate con leche',
        //                 'name_ua' => 'Шоколад з молоком',
        //                 'options' => [
        //                 ]
        //             ],
        //         ]
        //     ],
        //     [
        //         'name' => 'hot-specialities',
        //         'imgUrl' => 'imgs/demo/coffeeShop/cat4.webp',
        //         'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_thumbnail.webp',
        //         'name_en' => 'Hot Specialities',
        //         'name_ar' => 'التخصصات الساخنة',
        //         'name_fr' => 'Spécialités chaudes',
        //         'name_it' => 'Specialità calde',
        //         'name_de' => 'Heiße Spezialitäten',
        //         'name_es' => 'Especialidades Calientes',
        //         'name_ua' => 'Гарячі страви',
        //         'products' => [
        //             [
        //                 'name' => 'hot-chocolate',
        //                 'price' => 6,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat4_prod1.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_prod1_thumbnail.webp',
        //                 'name_en' => 'Hot Chocolate',
        //                 'name_ar' => 'شكولاته ساخنة',
        //                 'name_fr' => 'Chocolat chaud',
        //                 'name_it' => 'Cioccolata calda',
        //                 'name_de' => 'Heiße Schokolade',
        //                 'name_es' => 'Chocolate caliente',
        //                 'name_ua' => 'Гарячий шоколад',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'classic-milk-tea',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat4_prod2.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_prod2_thumbnail.webp',
        //                 'name_en' => 'Classic Milk Tea',
        //                 'name_ar' => 'شاي حليب كلاسيكي',
        //                 'name_fr' => 'Thé au lait classique',
        //                 'name_it' => 'Tè al latte classico',
        //                 'name_de' => 'Klassischer Milchtee',
        //                 'name_es' => 'Té con leche clásico',
        //                 'name_ua' => 'Класичний молочний чай',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'pumpkin-spice-latte',
        //                 'price' => 5.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat4_prod3.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_prod3_thumbnail.webp',
        //                 'name_en' => 'Pumpkin Spice latte',
        //                 'name_ar' => 'قهوة لاتيه برائحه اليقطين',
        //                 'name_fr' => 'Latte à la citrouille et aux épices',
        //                 'name_it' => 'Latte speziato alla zucca',
        //                 'name_de' => 'Kürbisgewürz Latte',
        //                 'name_es' => 'Latte de especias de calabaza',
        //                 'name_ua' => 'Гарбузове латте',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'cinnamon-latte',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat4_prod4.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_prod4_thumbnail.webp',
        //                 'name_en' => 'Cinnamon latte',
        //                 'name_ar' => 'سينامون لاتيه',
        //                 'name_fr' => 'Latte à la cannelle',
        //                 'name_it' => 'Latte alla cannella',
        //                 'name_de' => 'Zimt Latte',
        //                 'name_es' => 'Latte de canela',
        //                 'name_ua' => 'Латте з корицею',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'matcha-milk-tea',
        //                 'price' => 5.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat4_prod5.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat4_prod5_thumbnail.webp',
        //                 'name_en' => 'Matcha Milk tea',
        //                 'name_ar' => 'شاي ماتشا بالحليب',
        //                 'name_fr' => 'Thé au lait matcha',
        //                 'name_it' => 'Tè al latte Matcha',
        //                 'name_de' => 'Matcha-Milchtee',
        //                 'name_es' => 'Té Matcha con leche',
        //                 'name_ua' => 'Молочний чай матча',
        //                 'options' => [
        //                 ]
        //             ],
        //         ]
        //     ],
        //     [
        //         'name' => 'blended-tea',
        //         'imgUrl' => 'imgs/demo/coffeeShop/cat5.webp',
        //         'thumbnailUrl' => 'imgs/demo/coffeeShop/cat5_thumbnail.webp',
        //         'name_en' => 'Blended Tea',
        //         'name_ar' => 'شاي مخلوط',
        //         'name_fr' => 'Thé mélangé',
        //         'name_it' => 'Tè Miscelato',
        //         'name_de' => 'Gemischter Tee',
        //         'name_es' => 'Té Mezclado',
        //         'name_ua' => 'Купажований чай',
        //         'products' => [
        //             [
        //                 'name' => 'green-tea',
        //                 'price' => 3.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat5_prod1.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat5_prod1_thumbnail.webp',
        //                 'name_en' => 'Green Tea',
        //                 'name_ar' => 'شاي أخضر',
        //                 'name_fr' => 'Thé vert',
        //                 'name_it' => 'Tè verde',
        //                 'name_de' => 'Grüner Tee',
        //                 'name_es' => 'Té verde',
        //                 'name_ua' => 'Зелений чай',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'mixed-berry-tea',
        //                 'price' => 4,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat5_prod2.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat5_prod2_thumbnail.webp',
        //                 'name_en' => 'Mixed Berry Tea',
        //                 'name_ar' => 'شاي التوت المختلط',
        //                 'name_fr' => 'Thé aux baies mélangées',
        //                 'name_it' => 'Tè ai frutti di bosco',
        //                 'name_de' => 'Gemischter Beerentee',
        //                 'name_es' => 'Té de bayas mixtas',
        //                 'name_ua' => 'Змішаний ягідний чай',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'grapefruit-tea',
        //                 'price' => 5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat5_prod3.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat5_prod3_thumbnail.webp',
        //                 'name_en' => 'Grapefruit Tea',
        //                 'name_ar' => 'شاي الجريب فروت',
        //                 'name_fr' => 'Thé au Pamplemousse',
        //                 'name_it' => 'Tè al pompelmo',
        //                 'name_de' => 'Grapefruit-Tee',
        //                 'name_es' => 'Té de pomelo',
        //                 'name_ua' => 'Грейпфрутовий чай',
        //                 'options' => [
        //                 ]
        //             ],
        //             [
        //                 'name' => 'kiwi-green-tea',
        //                 'price' => 4.5,
        //                 'imgUrl' => 'imgs/demo/coffeeShop/cat5_prod4.webp',
        //                 'thumbnailUrl' => 'imgs/demo/coffeeShop/cat5_prod4_thumbnail.webp',
        //                 'name_en' => 'Kiwi Green Tea',
        //                 'name_ar' => 'شاي أخضر كيوي',
        //                 'name_fr' => 'Thé Vert Kiwi',
        //                 'name_it' => 'Tè verde al kiwi',
        //                 'name_de' => 'Kiwi-Grüntee',
        //                 'name_es' => 'Té verde kiwi',
        //                 'name_ua' => 'Зелений чай ківі',
        //                 'options' => [
        //                 ]
        //             ],
        //         ]
        //     ],
        // ];
        // demo::website($coffeeShop,$categories);
    }

}
