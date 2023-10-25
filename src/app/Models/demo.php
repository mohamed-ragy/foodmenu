<?php

namespace App\Models;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Account;
use App\Models\activityLog;
use App\Models\cpanelSettings;
use App\Models\cron_jobs;
use App\Models\foodmenuFunctions;
use App\Models\liveChat;
use App\Models\notification;
use App\Models\order;
use App\Models\product_review;
use App\Models\statistics_day;
use App\Models\statistics_hour;
use App\Models\statistics_month;
use App\Models\ticket;
use App\Models\ticket_msg;
use App\Models\website;
use App\Models\websiteText;
use Carbon\Carbon;
use Faker\Generator;
use Illuminate\Container\Container;

class demo
{

    // protected $faker;
    // public function __construct()
    // {
    //     $this->faker = Container::getInstance()->make(Generator::class);
    // }
    // public static function faker()
    // {
    //     return Container::getInstance()->make(Generator::class);
    // }


    public static function website($website,$categories,$OrdersSeed=0){
        ///////
        ///////
        // slideShow need to be created after creating a template with slideshow and test it
        ///////

        ///////
        $faker = Container::getInstance()->make(Generator::class);
        error_log('');
        error_log('');
        $website_start = hrtime(true);

        $start = hrtime(true);
        error_log(" \e[30m\e[43m CLEAN \e[0m Cleaning ".$website->website_names['en']." data.");
        $deleteWebsite = website::where('domainName',$website->domainName)->first();
        if($deleteWebsite){
            order::where('website_id',$deleteWebsite->id)->delete();
            liveChat::where('website_id',$deleteWebsite->id)->delete();
            notification::where('website_id',$deleteWebsite->id)->delete();
            activityLog::where('website_id',$deleteWebsite->id)->delete();
            statistics_hour::where('website_id',$deleteWebsite->id)->delete();
            statistics_day::where('website_id',$deleteWebsite->id)->delete();
            statistics_month::where('website_id',$deleteWebsite->id)->delete();
            ticket::where('website_id',$deleteWebsite->id)->delete();
            ticket_msg::where('website_id',$deleteWebsite->id)->delete();
            website::where('domainName',$deleteWebsite->domainName)->delete();
            // Storage::deleteDirectory('/imgs/accounts/'.$deleteWebsite->id);
        }
        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']." data Cleaned successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");
        error_log('');
        $start = hrtime(true);
        error_log(" \e[44m CREATE \e[0m Creating new data for ".$website->website_names['en'].".");

        $emptyLangs = json_encode(['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => '']);

        $demoWebsite = new website();
        $demoWebsite->plan = 'standard';
        $demoWebsite->subscription_status = 'active';
        $demoWebsite->subscription_start_period = Carbon::now()->addYears(10)->timestamp;
        $demoWebsite->subscription_end_period = Carbon::now()->addYears(10)->timestamp;


        $demoWebsite->active = true;
        $demoWebsite->domainName = $website->domainName;
        $demoWebsite->url = $website->domainName.'.'.env('APP_DOMAIN');
        $demoWebsite->lat = '40.1987535946463';
        $demoWebsite->lng = '-74.30637861990314';
        $demoWebsite->restaurantEmail = $website->domainName.'@example.com';
        $demoWebsite->phoneNumbers = [0 => '+1-098-765-4321', 1 => '+1-123-456-7890'];
        $demoWebsite->addresses = [
            'en' => '16 San Pasquale Avenue NW, Albuquerque,nm, 83104  United States',
            'ar' => '16 شارع سان باسكوال NW ، البوكيرك ، نانومتر ، 83104 الولايات المتحدة',
            'eg' => '16 San Pasquale Avenue NW, Albuquerque,nm, 83104  United States',
            'fr' => '16 San Pasquale Avenue NW, Albuquerque,nm, 83104 États-Unis',
            'de' => '16 San Pasquale Avenue NW, Albuquerque, nm, 83104 USA',
            'it' => '16 San Pasquale Avenue NW, Albuquerque,nm, 83104 Stati Uniti',
            'es' => '16 San Pasquale Avenue NW, Albuquerque,nm, 83104 Estados Unidos',
            'ua' => '16 San Pasquale Avenue NW, Альбукерке, nm, 83104 Сполучені Штати',
            'ru' => '',
        ];


        $demoWebsite->timeZone = 'America/New_York';
        $demoWebsite->country_code = 'USA';
        $demoWebsite->currencies = ['en' => '$','ar' => '$','eg' => '$','fr' => '$','de' => '$','it' => '$','es' => '$','ua' => '$','ru' => '$',];

        $demoWebsite->websiteNames = [
            'en' => $website->website_names['en'],
            'ar' => $website->website_names['ar'],
            'fr' => $website->website_names['fr'],
            'it' => $website->website_names['it'],
            'de' => $website->website_names['de'],
            'es' => $website->website_names['es'],
            'eg' => $website->website_names['en'],
            'ru' => $website->website_names['ru'],
            'ua' => $website->website_names['ua'],
        ];

        $demoWebsite->websiteDescriptions = [
            'en' => 'Welcome to Foodmenu! Here is a description of your restaurant, where you can let your customers know more about you and what you serve.',
            'ar' => 'مرحبا بكم في فودمينيو! فيما يلي وصف لمطعمك ، حيث يمكنك السماح لعملائك بمعرفة المزيد عنك وما تخدمه.',
            'eg' => 'Welcome to Foodmenu! Here is a description of your restaurant, where you can let your customers know more about you and what you serve.',
            'fr' => 'Bienvenue sur Foodmenu ! Voici une description de votre restaurant, où vous pouvez informer vos clients sur vous et sur ce que vous servez.',
            'de' => 'Willkommen bei Foodmenu! Hier ist eine Beschreibung Ihres Restaurants, in der Sie Ihren Kunden mehr über Sie und Ihr Angebot mitteilen können.',
            'it' => 'Benvenuti in Foodmenù! Ecco una descrizione del tuo ristorante, dove puoi far sapere ai tuoi clienti di più su di te e su cosa servi.',
            'es' => '¡Bienvenidos a Foodmenú! Aquí hay una descripción de su restaurante, donde puede dejar que sus clientes sepan más sobre usted y lo que sirve.',
            'ua' => 'Ласкаво просимо до Foodmenu! Ось опис вашого ресторану, де ви можете повідомити клієнтам більше про вас і про те, що ви подаєте.',
            'ru' => '',
        ];


        $demoWebsite->website_announcements = [
            'en' => 'The product images and prices displayed are only for template preview purposes and do not represent the products in real life. You can use this bar to inform your customers about an upcoming event or an important announcement.',
            'ar' => 'صور المنتج والأسعار المعروضة هي فقط لأغراض معاينة النموذج ولا تمثل المنتجات في الواقع. يمكنك استخدام هذا الشريط لإعلام عملائك بحدث قادم أو إعلان مهم.',
            'eg' => 'The product images and prices displayed are only for template preview purposes and do not represent the products in real life. You can use this bar to inform your customers about an upcoming event or an important announcement.',
            'fr' => 'Les images de produits et les prix affichés sont uniquement à des fins de prévisualisation des modèles et ne représentent pas les produits dans la vie réelle. Vous pouvez utiliser cette barre pour informer vos clients d\'un événement à venir ou d\'une annonce importante.',
            'de' => 'Die angezeigten Produktbilder und Preise dienen nur der Vorlagenvorschau und repräsentieren nicht die Produkte im wirklichen Leben. Sie können diese Leiste verwenden, um Ihre Kunden über eine bevorstehende Veranstaltung oder eine wichtige Ankündigung zu informieren.',
            'it' => 'Le immagini dei prodotti e i prezzi visualizzati sono solo a scopo di anteprima del modello e non rappresentano i prodotti nella vita reale. Puoi utilizzare questa barra per informare i tuoi clienti su un evento imminente o un annuncio importante.',
            'es' => 'Las imágenes y los precios de los productos que se muestran son solo para fines de vista previa de la plantilla y no representan los productos en la vida real. Puede usar esta barra para informar a sus clientes sobre un próximo evento o un anuncio importante.',
            'ua' => 'Відображені зображення продуктів і ціни призначені лише для попереднього перегляду шаблонів і не відображають продукти в реальному житті. Ви можете використовувати цю панель, щоб повідомити своїх клієнтів про майбутню подію або важливе оголошення.',
            'ru' => '',
        ];


        $demoWebsite->expenses = [];
        $demoWebsite->month_expenses = [];
        $demoWebsite->website_receiptMsgs = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];


        $demoWebsite->facebookLink =  'https://www.facebook.com/foodmenu.net';
        $demoWebsite->youtubeLink =  'https://www.youtube.com/';
        $demoWebsite->linkedinLink =  'https://www.linkedin.com/';
        $demoWebsite->twitterLink =  'https://twitter.com/foodmenu_';
        $demoWebsite->instagramLink =  'https://www.instagram.com/foodmenu.us/';
        $demoWebsite->website_privacyPolicy = [
            'en' => '<p style="max-width:1000px;">This is where you can add your company\'s privacy policy and inform website visitors about the data you collect and why you collect it. By including your privacy policy on your website, you show your visitors that you value their privacy. Use the allowed HTML tags to classify your privacy policy text into the structure you prefer.</p>',
            'ar' => '<p style="max-width:1000px;">هذا هو المكان الذي يمكنك فيه إضافة سياسة الخصوصية لشركتك وإبلاغ زوار الموقع عن البيانات التي تجمعها وسبب جمعها. من خلال تضمين سياسة الخصوصية الخاصة بك على موقع الويب الخاص بك ، فإنك تُظهر للزائرين أنك تقدر خصوصيتهم. استخدم علامات HTML المسموح بها لتصنيف نص سياسة الخصوصية إلى الهيكل الذي تفضله.</p>',
            'eg' => '<p style="max-width:1000px;">This is where you can add your company\'s privacy policy and inform website visitors about the data you collect and why you collect it. By including your privacy policy on your website, you show your visitors that you value their privacy. Use the allowed HTML tags to classify your privacy policy text into the structure you prefer.</p>',
            'fr' => '<p style="max-width:1000px;">C\'est ici que vous pouvez ajouter la politique de confidentialité de votre entreprise et informer les visiteurs du site Web des données que vous collectez et pourquoi vous les collectez. En incluant votre politique de confidentialité sur votre site Web, vous montrez à vos visiteurs que vous tenez à leur vie privée. Utilisez les balises HTML autorisées pour classer le texte de votre politique de confidentialité dans la structure que vous préférez.</p>',
            'de' => '<p style="max-width:1000px;">Hier können Sie die Datenschutzrichtlinie Ihres Unternehmens hinzufügen und Website-Besucher darüber informieren, welche Daten Sie sammeln und warum Sie sie sammeln. Indem Sie Ihre Datenschutzrichtlinie auf Ihrer Website einfügen, zeigen Sie Ihren Besuchern, dass Sie ihre Privatsphäre schätzen. Verwenden Sie die zulässigen HTML-Tags, um Ihren Datenschutzrichtlinientext in der von Ihnen bevorzugten Struktur zu klassifizieren.</p>',
            'it' => '<p style="max-width:1000px;">Qui è dove puoi aggiungere l\'informativa sulla privacy della tua azienda e informare i visitatori del sito web sui dati che raccogli e sul motivo per cui li raccogli. Includendo la tua politica sulla privacy nel tuo sito web, mostri ai tuoi visitatori che apprezzi la loro privacy. Utilizza i tag HTML consentiti per classificare il testo della tua informativa sulla privacy nella struttura che preferisci.</p>',
            'ru' => '<p style="max-width:1000px;"></p>',
            'ua' => '<p style="max-width:1000px;">Тут ви можете додати політику конфіденційності вашої компанії та повідомити відвідувачам веб-сайту про дані, які ви збираєте, і чому ви їх збираєте. Розміщуючи свою політику конфіденційності на своєму веб-сайті, ви показуєте відвідувачам, що цінуєте їх конфіденційність. Використовуйте дозволені HTML-теги, щоб класифікувати текст вашої політики конфіденційності за потрібною структурою.</p>',
            'es' => '<p style="max-width:1000px;">Aquí es donde puede agregar la política de privacidad de su empresa e informar a los visitantes del sitio web sobre los datos que recopila y por qué los recopila. Al incluir su política de privacidad en su sitio web, muestra a sus visitantes que valora su privacidad. Utilice las etiquetas HTML permitidas para clasificar el texto de su política de privacidad en la estructura que prefiera.</p>'
        ];
        $demoWebsite->languages = [
            'en' => ['code'=>'en','name'=>'English','direction'=>'ltr','flag'=>'USA','websiteDefault'=>1,'receiptDefault'=>1],
            'es' => ['code'=>'es','name'=>'Española','direction'=>'ltr','flag'=>'ESP','websiteDefault'=>0,'receiptDefault'=>0],
            'fr' => ['code'=>'fr','name'=>'français','direction'=>'ltr','flag'=>'FRA','websiteDefault'=>0,'receiptDefault'=>0],
            'de' => ['code'=>'de','name'=>'Deutsche','direction'=>'ltr','flag'=>'DEU','websiteDefault'=>0,'receiptDefault'=>0],
            'ar' => ['code'=>'ar','name'=>'العربية','direction'=>'rtl','flag'=>'SAU','websiteDefault'=>0,'receiptDefault'=>0],
            'ua' => ['code'=>'ua','name'=>'українська','direction'=>'ltr','flag'=>'UKR','websiteDefault'=>0,'receiptDefault'=>0],
            'it' => ['code'=>'it','name'=>'Italiana','direction'=>'ltr','flag'=>'ITA','websiteDefault'=>0,'receiptDefault'=>0],
        ];

        $demoWebsite->website_colors = 1;
        $demoWebsite->customColorsHexCode = ['color1'=>'#F5F5F5','color2'=>'#EBEBEB','color3'=>'#E0E0E0','color4'=>'#D6D6D6','color5'=>'#CCCCCC','colorError'=>'#D10000','colorSuccess'=>'#228B22','colorWarning'=>'#E3AE09','colorStar'=>'#ffc824'];
        $demoWebsite->template = 'demo';

        $demoWebsite->gallery = '';
        $demoWebsite->slideShow = [
            'interval' => 15,
            'content' => [],
        ];
        $demoWebsite->intro = [
            'img' => 'template',
            'title_en' => $website->intro['en'],
            'title_ar' => $website->intro['ar'],
            'title_eg' => $website->intro['en'],
            'title_fr' => $website->intro['fr'],
            'title_de' => $website->intro['de'],
            'title_it' => $website->intro['it'],
            'title_es' => $website->intro['es'],
            'title_ua' => $website->intro['ua'],
            'title_ru' => $website->intro['ru'],
            'des_en' => 'Let your customers know a little about your restaurant through this restaurant\'s brief introduction.',
            'des_ar' => 'دع عملائك يعرفون القليل عن مطعمك من خلال مقدمة موجزة عن هذا المطعم.',
            'des_eg' => 'Let your customers know a little about your restaurant through this restaurant\'s brief introduction.',
            'des_fr' => 'Faites connaître votre restaurant à vos clients grâce à la brève présentation de ce restaurant.',
            'des_de' => 'Lassen Sie Ihre Kunden durch die kurze Einführung dieses Restaurants ein wenig über Ihr Restaurant wissen.',
            'des_it' => 'Fai conoscere ai tuoi clienti qualcosa del tuo ristorante attraverso la breve introduzione di questo ristorante.',
            'des_es' => 'Deja que tus clientes conozcan un poco sobre tu restaurante a través de una breve introducción de este restaurante.',
            'des_ua' => 'Розкажіть своїм клієнтам трохи про ваш ресторан за допомогою цього короткого вступу.',
            'des_ru' => '',
        ];
        $demoWebsite->info = [
            'img' => 'template',
            'title_en' => 'Section Title',
            'title_ar' => 'عنوان القسم',
            'title_eg' => 'Section Title',
            'title_fr' => 'Section titre',
            'title_de' => 'Abschnittsüberschrift',
            'title_it' => 'Titolo della sezione',
            'title_es' => 'Sección de título',
            'title_ua' => 'Назва розділу',
            'title_ru' => '',
            'des_en' => 'In this section, you can tell your customers anything you want them to know. Share your areas of expertise or signature products with your customers. Here you can add the section text and an image.',
            'des_ar' => 'في هذا القسم ، يمكنك إخبار عملائك بأي شيء تريدهم أن يعرفوه. شارك مجالات خبرتك أو منتجاتك المميزة مع عملائك. هنا يمكنك إضافة نص القسم وصورة.',
            'des_eg' => 'In this section, you can tell your customers anything you want them to know. Share your areas of expertise or signature products with your customers. Here you can add the section text and an image.',
            'des_fr' => 'Dans cette section, vous pouvez dire à vos clients tout ce que vous voulez qu\'ils sachent. Partagez vos domaines d\'expertise ou produits signatures avec vos clients. Ici, vous pouvez ajouter le texte de la section et une image.',
            'des_de' => 'In diesem Abschnitt können Sie Ihren Kunden alles mitteilen, was sie wissen sollen. Teilen Sie Ihre Fachgebiete oder Signaturprodukte mit Ihren Kunden. Hier können Sie den Abschnittstext und ein Bild hinzufügen.',
            'des_it' => 'In questa sezione puoi dire ai tuoi clienti tutto ciò che vuoi che sappiano. Condividi le tue aree di competenza o firma i prodotti con i tuoi clienti. Qui puoi aggiungere il testo della sezione e un\'immagine.',
            'des_es' => 'En esta sección, puedes decirles a tus clientes todo lo que quieras que sepan. Comparta sus áreas de especialización o productos exclusivos con sus clientes. Aquí puede agregar el texto de la sección y una imagen.',
            'des_ua' => 'У цьому розділі ви можете повідомити своїм клієнтам усе, що забажаєте. Поділіться своїми знаннями або фірмовими продуктами зі своїми клієнтами. Тут ви можете додати текст розділу та зображення.',
            'des_ru' => '',
        ];
        $demoWebsite->ourStory = [
            'img' => 'template',
            'title_en' => 'Section Title',
            'title_ar' => 'عنوان القسم',
            'title_eg' => 'Section Title',
            'title_fr' => 'Section titre',
            'title_de' => 'Abschnittsüberschrift',
            'title_it' => 'Titolo della sezione',
            'title_es' => 'Sección de título',
            'title_ua' => 'Назва розділу',
            'title_ru' => '',
            'des_en' => 'In this section, you can tell the inspiring story behind your restaurant. Sharing your journey details with your customers will make them feel more connected to you. Here you can add text and an image.',
            'des_ar' => 'في هذا القسم ، يمكنك سرد القصة الملهمة وراء مطعمك. ستجعل مشاركة تفاصيل رحلتك مع عملائك يشعرون بأنهم أكثر ارتباطًا بك. هنا يمكنك إضافة نص وصورة.',
            'des_eg' => 'In this section, you can tell the inspiring story behind your restaurant. Sharing your journey details with your customers will make them feel more connected to you. Here you can add text and an image.',
            'des_fr' => 'Dans cette section, vous pouvez raconter l\'histoire inspirante de votre restaurant. En partageant les détails de votre voyage avec vos clients, ils se sentiront plus connectés à vous. Ici, vous pouvez ajouter du texte et une image.',
            'des_de' => 'In diesem Abschnitt können Sie die inspirierende Geschichte hinter Ihrem Restaurant erzählen. Wenn Sie Ihre Reisedetails mit Ihren Kunden teilen, fühlen sie sich Ihnen stärker verbunden. Hier können Sie Text und ein Bild hinzufügen.',
            'des_it' => 'In questa sezione puoi raccontare la storia ispiratrice del tuo ristorante. Condividere i dettagli del tuo viaggio con i tuoi clienti li farà sentire più legati a te. Qui puoi aggiungere testo e un\'immagine.',
            'des_es' => 'En esta sección, puede contar la historia inspiradora detrás de su restaurante. Compartir los detalles de su viaje con sus clientes hará que se sientan más conectados con usted. Aquí puede agregar texto y una imagen.',
            'des_ua' => 'У цьому розділі ви можете розповісти надихаючу історію свого ресторану. Поділіться деталями своєї подорожі з вашими клієнтами, щоб вони відчули більше зв’язку з вами. Тут ви можете додати текст і зображення.',
            'des_ru' => '',
        ];
        $demoWebsite->guestReviews = true;
        $demoWebsite->guestOrders = true;
        $demoWebsite->cookies_msg = false;
        $demoWebsite->workingDays_delivery = [
            'sunday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '22.00',
                'discount' =>  '10',
                'Dfrom' =>  '14.00',
                'Dto' =>  '16.00',
            ],
            'monday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'tuesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'wednesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'thursday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'friday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '13.00',
                'to' =>  '02.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'saturday' => [
                'working' =>  true,
                'working24' => true,
                'from' =>  '13.00',
                'to' =>  '02.00',
                'discount' =>  '10',
                'Dfrom' =>  '14.00',
                'Dto' =>  '16.00',
            ],
        ];

        $demoWebsite->workingDays_pickup = [
            'sunday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'monday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '15',
                'Dfrom' =>  '15.00',
                'Dto' =>  '16.00',
            ],
            'tuesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '15',
                'Dfrom' =>  '15.00',
                'Dto' =>  '16.00',
            ],
            'wednesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'thursday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'friday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '02.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'saturday' => [
                'working' =>  true,
                'working24' => true,
                'from' =>  '09.00',
                'to' =>  '02.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
        ];

        $demoWebsite->workingDays_dinein = [
            'sunday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'monday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'tuesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
            'wednesday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '10',
                'Dfrom' =>  '10.00',
                'Dto' =>  '11.00',
            ],
            'thursday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '22.00',
                'discount' =>  '10',
                'Dfrom' =>  '10.00',
                'Dto' =>  '11.00',
            ],
            'friday' => [
                'working' =>  true,
                'working24' => false,
                'from' =>  '09.00',
                'to' =>  '02.00',
                'discount' =>  '10',
                'Dfrom' =>  '10.00',
                'Dto' =>  '11.00',
            ],
            'saturday' => [
                'working' =>  true,
                'working24' => true,
                'from' =>  '09.00',
                'to' =>  '02.00',
                'discount' =>  '0',
                'Dfrom' =>  '00.00',
                'Dto' =>  '00.00',
            ],
        ];

        $demoWebsite->deliveryCost = 5.00;
        $demoWebsite->showDeliveryCostChangable = true;
        $demoWebsite->deliveryTaxPercentage = 2.50;
        $demoWebsite->averageDeliveryTime = 40;
        $demoWebsite->deliveryMinimumCharge = 20;

        $demoWebsite->pickupTaxPercentage = 3.50;
        $demoWebsite->averagePickupTime = 30;
        $demoWebsite->pickupMinimumCharge = 15;

        $demoWebsite->dineInTaxPercentage = 5;
        $demoWebsite->dineInServicePercentage = 10;

        $demoWebsite->save();
        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']." new data Created successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");

        error_log('');
        $start = hrtime(true);
        error_log(" \e[44m SETTING \e[0m Setting cron jobs for ".$website->website_names['en'].".");

        cron_jobs::create([
            'website_id' => $demoWebsite->id,
            'type' => 1,
            'timeZone' => $demoWebsite->timeZone,
        ]);
        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']." cron jobs have been set successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");

        error_log('');
        $start = hrtime(true);
        error_log(" \e[44m CREATE \e[0m Creating $website->domainName@".env('APP_DOMAIN')." account.");

        $demoWebsiteAccount = Account::create([
            'is_master' => true,
            'register' => 2,
            'authorities' => '111111',
            'website_id' => $demoWebsite->id,
            'name' => $website->domainName.' Demo',
            'email' => $website->domainName.'@'.env('APP_DOMAIN'),
            'email_verification_code' => Str::random(6),
            'email_verified_at' => Carbon::now()->timestamp,
            'email_verification_code_sent_at' => Carbon::now()->timestamp,
            'phone' => $faker->e164PhoneNumber(),
            'phone_verified_at' => Carbon::now()->timestamp,
            'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
            // 'password' => bcrypt('1'),
        ]);
        cpanelSettings::create(['account_id'=> $demoWebsiteAccount->id]);

        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m $website->domainName@".env('APP_DOMAIN')." account has been created successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");

        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'en','text'=>foodmenuFunctions::defaultLanguageText('en')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'ar','text'=>foodmenuFunctions::defaultLanguageText('ar')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'eg','text'=>foodmenuFunctions::defaultLanguageText('eg')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'fr','text'=>foodmenuFunctions::defaultLanguageText('fr')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'de','text'=>foodmenuFunctions::defaultLanguageText('de')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'es','text'=>foodmenuFunctions::defaultLanguageText('es')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'it','text'=>foodmenuFunctions::defaultLanguageText('it')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'ru','text'=>foodmenuFunctions::defaultLanguageText('ru')]);
        websiteText::create(['website_id'=>$demoWebsite->id,'lang'=>'ua','text'=>foodmenuFunctions::defaultLanguageText('ua')]);
        error_log('');
        $start = hrtime(true);
        error_log(" \e[44m CREATE \e[0m Creating fake users accounts for $website->domainName.".env('APP_DOMAIN'));

        self::users($demoWebsite->id);

        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m $website->domainName.".env('APP_DOMAIN')." fake users have been created successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");

        error_log('');
        $start = hrtime(true);
        error_log(" \e[44m CREATE \e[0m  Creating categories And Products for ".$website->website_names['en'].".");

        $catSort = 0;
        foreach($categories as $category){
            $catSort = $catSort + 1;
            self::category($demoWebsite,$category,$catSort,);
        }
        $trendingProducts = product::where('website_id',$demoWebsite->id)->limit(10)->inRandomOrder()->get();
        $trending = [];
        foreach($trendingProducts as $product){
            $trending[$product->name] = $product->ordered_sum;
        }
        arsort($trending);
        website::where('id',$demoWebsite->id)->update(['trendingProducts' => $trending]);
        $randomProduct = product::where('website_id',$demoWebsite->id)->inRandomOrder()->first();
        if($randomProduct){
            $randomProduct->update(['availability'=>false]);
        }
        $end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']."'s categories and products have been created successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");



        if($OrdersSeed > 0){
            $start = hrtime(true);
            error_log('');
            error_log(" \e[30m\e[43m PREPARE \e[0m Preparing some date to create fake order history for ".$website->website_names['en']." data.");
            /////////
            $restaurant_Expenses = [
                0 => ["name"=>"restaurant rent","amount"=>"10000.00"],
                1 => ["name"=>"employee salaries","amount"=>"7000.00"]
            ];
            $restaurant_Month_Expenses = [
                0 =>["name"=>"electricity","amount"=>random_int(1000,2500).".00"],
                1 =>["name"=>"food ingredients","amount"=>random_int(10000,15000).".00"],
                2 =>["name"=>"advertising","amount"=>random_int(1000,2000).".00"]
            ];
            website::where('id',$demoWebsite->id)->update([
                'expenses' => $restaurant_Expenses,
                'month_expenses' => $restaurant_Month_Expenses,
            ]);
            ////////
            $demoWebsiteAccount1Name = strtolower($faker->firstName());
            $demoWebsiteAccount2Name = strtolower($faker->firstName());
            $demoWebsiteAccount3Name = strtolower($faker->firstName());
            $demoWebsiteAccount1 = Account::create([
                'is_master' => false,
                'register' => 2,
                'authorities' => '111111',
                'website_id' => $demoWebsite->id,
                'name' => $demoWebsiteAccount1Name,
                'email' => $demoWebsiteAccount1Name.'@'.$demoWebsite->domainName,
                'email_verification_code' => Str::random(6),
                'email_verified_at' => Carbon::now()->timestamp,
                'email_verification_code_sent_at' => Carbon::now()->timestamp,
                'phone' => $faker->e164PhoneNumber(),
                'phone_verified_at' => Carbon::now()->timestamp,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
            ]);
            cpanelSettings::create(['account_id'=> $demoWebsiteAccount1->id]);
            $demoWebsiteAccount2 = Account::create([
                'is_master' => false,
                'register' => 2,
                'authorities' => '111111',
                'website_id' => $demoWebsite->id,
                'name' => $demoWebsiteAccount2Name,
                'email' => $demoWebsiteAccount2Name.'@'.$demoWebsite->domainName,
                'email_verification_code' => Str::random(6),
                'email_verified_at' => Carbon::now()->timestamp,
                'email_verification_code_sent_at' => Carbon::now()->timestamp,
                'phone' => $faker->e164PhoneNumber(),
                'phone_verified_at' => Carbon::now()->timestamp,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
            ]);
            cpanelSettings::create(['account_id'=> $demoWebsiteAccount2->id]);
            $demoWebsiteAccount3 = Account::create([
                'is_master' => false,
                'register' => 2,
                'authorities' => '111111',
                'website_id' => $demoWebsite->id,
                'name' => $demoWebsiteAccount3Name,
                'email' => $demoWebsiteAccount3Name.'@'.$demoWebsite->domainName,
                'email_verification_code' => Str::random(6),
                'email_verified_at' => Carbon::now()->timestamp,
                'email_verification_code_sent_at' => Carbon::now()->timestamp,
                'phone' => $faker->e164PhoneNumber(),
                'phone_verified_at' => Carbon::now()->timestamp,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
            ]);
            cpanelSettings::create(['account_id'=> $demoWebsiteAccount3->id]);
            //////
            $deliveries = [];
            array_push($deliveries,[
                'website_id' => $demoWebsite->id,
                'deliveryName' => strtolower($faker->firstName()).'@'.$demoWebsite->domainName,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
                'created_at' => Carbon::now()->timestamp
            ]);
            array_push($deliveries,[
                'website_id' => $demoWebsite->id,
                'deliveryName' => strtolower($faker->firstName()).'@'.$demoWebsite->domainName,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
                'created_at' => Carbon::now()->timestamp
            ]);

            array_push($deliveries,[
                'website_id' => $demoWebsite->id,
                'deliveryName' => strtolower($faker->firstName()).'@'.$demoWebsite->domainName,
                'password' => bcrypt('lh;idulg,dfshdjuk]t,,]lkd,'),
                'created_at' => Carbon::now()->timestamp
            ]);
            delivery::insert($deliveries);
            ///////
            promocode::create([
                'website_id' => $demoWebsite->id,
                'code' => 'fm-25',
                'is_active' => true,
                'is_delivery' => true,
                'is_pickup' => true,
                'is_guest' => true,
                'is_oneUse' => false,
                'is_expires' => false,
                'expires_at' => null,
                'discount' => 20,
                'minimum' => 0,
                'cap' => 0,
            ]);
            $end = hrtime(true);
            error_log('');
            error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']." ready for creating fake order history........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");


            self::orders($demoWebsite,$OrdersSeed,$demoWebsite->timeZone);
        }

        $website_end = hrtime(true);
        error_log('');
        error_log('');
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m ".$website->website_names['en']." all set........... \e[32m".number_format(($website_end - $website_start) / 60000000000 , 2,'.','')." Minutes\e[0m");
        error_log('');
        error_log('');
        error_log('');
    }

    public static function category($demoWebsite,$category,$catSort){

        $catImg = img::create([
            'website_id' => $demoWebsite->id,
            'name' => $category['name'],
            'url' => $category['imgUrl'],
            'thumbnailUrl' => $category['thumbnailUrl'],
            'extension' => 'webp',
            'size' => 104857,
            'height' => 1200,
            'width' => 1200,
        ]);
        $createCat = categories::create([
            'website_id' => $demoWebsite->id,
            'sort' => $catSort,
            'name' => $category['name'],
            'img_id' => $catImg->id,
            'names' => [
                'en' => $category['name_en'],
                'ar' => $category['name_ar'],
                'eg' => $category['name_en'],
                'fr' => $category['name_fr'],
                'it' => $category['name_it'],
                'de' => $category['name_de'],
                'es' => $category['name_es'],
                'ua' => $category['name_ua'],
            ],
            'descriptions' => [
                'en' => 'Here you can add a catchy description of your category. Tell your customers what they find therein!',
                'ar' => 'هنا يمكنك إضافة وصف جذاب لفئتك. أخبر عملائك بما وجدوه هناك!',
                'eg' => 'Here you can add a catchy description of your category. Tell your customers what they find therein!',
                'fr' => 'Ici, vous pouvez ajouter une description accrocheuse de votre catégorie. Dites à vos clients ce qu\'ils y trouvent !',
                'de' => 'Hier können Sie eine einprägsame Beschreibung Ihrer Kategorie hinzufügen. Sagen Sie Ihren Kunden, was sie darin finden!',
                'it' => 'Qui puoi aggiungere una descrizione accattivante della tua categoria. Dì ai tuoi clienti cosa trovano lì!',
                'es' => 'Aquí puede agregar una descripción pegadiza de su categoría. ¡Dile a tus clientes lo que encuentran allí!',
                'ua' => 'Тут ви можете додати яскравий опис вашої категорії. Розкажіть своїм клієнтам, що вони там знаходять!',
            ],

        ]);
        $prodSort = 0;
        foreach($category['products'] as $product){
            $prodSort = $prodSort + 1 ;
            if(rand(1,3) == 1){
                $created_at = Carbon::now()->addYears(10)->timestamp;
            }else{
                $created_at = Carbon::now()->subDays(20)->timestamp;
            }
            self::product($demoWebsite,$createCat,$product,$prodSort,$created_at);
        }
    }

    public static function product($demoWebsite,$createCat,$product,$prodSort,$created_at){
        $prodDescriptions = [
            [
                'en' => 'Here you can add a catchy description of your product. Tell your customers about the delicious ingredients included in your food item, and showcase it with an image for this product.',
                'ar' => 'هنا يمكنك إضافة وصف جذاب لمنتجك. أخبر عملائك عن المكونات اللذيذة المضمنة في عنصر طعامك ، واعرضها مع صورة لهذا المنتج.',
                'eg' => 'Here you can add a catchy description of your product. Tell your customers about the delicious ingredients included in your food item, and showcase it with an image for this product.',
                'fr' => 'Ici, vous pouvez ajouter une description accrocheuse de votre produit. Parlez à vos clients des délicieux ingrédients inclus dans votre aliment et présentez-le avec une image pour ce produit.',
                'de' => 'Hier können Sie eine einprägsame Beschreibung Ihres Produkts hinzufügen. Informieren Sie Ihre Kunden über die köstlichen Zutaten, die in Ihrem Lebensmittel enthalten sind, und präsentieren Sie es mit einem Bild für dieses Produkt.',
                'it' => 'Qui puoi aggiungere una descrizione accattivante del tuo prodotto. Parla ai tuoi clienti dei deliziosi ingredienti inclusi nel tuo alimento e mostralo con un\'immagine per questo prodotto.',
                'es' => 'Aquí puede agregar una descripción pegadiza de su producto. Informe a sus clientes sobre los deliciosos ingredientes incluidos en su alimento y muéstrelo con una imagen para este producto.',
                'ua' => 'Тут ви можете додати яскравий опис свого продукту. Розкажіть своїм клієнтам про смачні інгредієнти, які містяться у вашій страві, і продемонструйте це за допомогою зображення цього продукту.',
                'ru' => '',
            ],
            [
                'en' => 'Here you can add your product description and inspire your customers to add your food item(s) to their carts.',
                'ar' => 'هنا يمكنك إضافة وصف منتجك وإلهام عملائك لإضافة مواد غذائية إلى عرباتهم.',
                'eg' => 'Here you can add your product description and inspire your customers to add your food item(s) to their carts.',
                'fr' => 'Ici, vous pouvez ajouter la description de votre produit et inspirer vos clients à ajouter vos produits alimentaires à leurs paniers.',
                'de' => 'Hier können Sie Ihre Produktbeschreibung hinzufügen und Ihre Kunden dazu inspirieren, Ihre Lebensmittel in ihren Einkaufswagen zu legen.',
                'it' => 'Qui puoi aggiungere la descrizione del tuo prodotto e ispirare i tuoi clienti ad aggiungere i tuoi prodotti alimentari ai loro carrelli.',
                'es' => 'Aquí puede agregar la descripción de su producto e inspirar a sus clientes a agregar sus alimentos a sus carritos.',
                'ua' => 'Тут ви можете додати опис свого продукту та надихнути своїх клієнтів додати ваші продукти харчування до своїх кошиків.',
                'ru' => '',
            ],
            [
                'en' => 'Here you can add an appealing description of your product to entice your customers to try the product.',
                'ar' => 'يمكنك هنا إضافة وصف جذاب لمنتجك لإغراء عملائك بتجربة المنتج.',
                'eg' => 'Here you can add an appealing description of your product to entice your customers to try the product.',
                'fr' => 'Ici, vous pouvez ajouter une description attrayante de votre produit pour inciter vos clients à essayer le produit.',
                'de' => 'Hier können Sie eine ansprechende Produktbeschreibung hinzufügen, um Ihre Kunden zum Probieren anzuregen.',
                'it' => 'Qui puoi aggiungere una descrizione accattivante del tuo prodotto per invogliare i tuoi clienti a provarlo.',
                'es' => 'Aquí puede agregar una descripción atractiva de su producto para atraer a sus clientes a probar el producto.',
                'ua' => 'Тут ви можете додати привабливий опис продукту, щоб спонукати клієнтів спробувати продукт.',
                'ru' => '',
            ],
            [
                'en' => 'Here you can add an enticing product description. Tell your customers about the delicious ingredients included in your food item, and encourage them to try it!',
                'ar' => 'هنا يمكنك إضافة وصف جذاب للمنتج. أخبر عملائك عن المكونات اللذيذة المضمنة في طعامك ، وشجعهم على تجربتها!',
                'eg' => 'Here you can add an enticing product description. Tell your customers about the delicious ingredients included in your food item, and encourage them to try it!',
                'fr' => 'Ici, vous pouvez ajouter une description attrayante du produit. Parlez à vos clients des délicieux ingrédients inclus dans votre aliment et encouragez-les à l\'essayer!',
                'de' => 'Hier können Sie eine ansprechende Produktbeschreibung hinzufügen. Informieren Sie Ihre Kunden über die köstlichen Zutaten, die in Ihrem Lebensmittel enthalten sind, und ermutigen Sie sie, es zu probieren!',
                'it' => 'Qui puoi aggiungere una descrizione del prodotto allettante. Parla ai tuoi clienti dei deliziosi ingredienti inclusi nel tuo alimento e incoraggiali a provarlo!',
                'es' => 'Aquí puede agregar una atractiva descripción del producto. ¡Cuénteles a sus clientes sobre los deliciosos ingredientes incluidos en su alimento y anímelos a probarlo!',
                'ua' => 'Тут ви можете додати привабливий опис продукту. Розкажіть своїм клієнтам про смачні інгредієнти, які містяться у вашій страві, і заохочуйте їх спробувати це!',
                'ru' => '',
            ],
        ];
        $prodDes = $prodDescriptions[array_rand($prodDescriptions)];
        $prodImg = img::create([
            'website_id' => $demoWebsite->id,
            'name' => $product['name'],
            'url' => $product['imgUrl'],
            'thumbnailUrl' => $product['thumbnailUrl'],
            'extension' => 'webp',
            'size' => 104857,
            'height' => 1200,
            'width' => 1200,
        ]);
        $createProd = product::create([
            'website_id' => $demoWebsite->id,
            'category_id' => $createCat->id,
            'sort' => $prodSort,
            'name' => $product['name'],
            'price' => $product['price'],
            'ordered_sum' => rand(10,100),
            'img_id' => $prodImg->id,
            'names' => [
                'en' => $product['name_en'],
                'ar' => $product['name_ar'],
                'eg' => $product['name_en'],
                'fr' => $product['name_fr'],
                'it' => $product['name_it'],
                'de' => $product['name_de'],
                'es' => $product['name_es'],
                'ua' => $product['name_ua'],
            ],
            'descriptions' => [
                'en' => $prodDes['en'],
                'ar' => $prodDes['ar'],
                'eg' => $prodDes['eg'],
                'fr' => $prodDes['fr'],
                'de' => $prodDes['de'],
                'it' => $prodDes['it'],
                'es' => $prodDes['es'],
                'ua' => $prodDes['ua'],
            ],


            'created_at' => $created_at,
        ]);

        $optionSort = 0;
        foreach($product['options'] as $option){
            $optionSort = $optionSort + 1;
            self::options($createProd,$option,$optionSort,$demoWebsite->id);

        }
        self::reviews($createProd);
    }

    public static function options($product,$option,$optionSort,$websiteId){
        $createOption = product_option::create([
            'website_id' => $websiteId,
            'product_id' => $product->id,
            'sort' => $optionSort,
            'name' => $option['name'],
            'name_en' => $option['name_en'],
            'name_ar' => $option['name_ar'],
            'name_eg' => $option['name_en'],
            'name_fr' => $option['name_fr'],
            'name_it' => $option['name_it'],
            'name_de' => $option['name_de'],
            'name_es' => $option['name_es'],
            'name_ru' => '',
            'name_ua' => $option['name_ua'],
        ]);
        $selectionsArr = [];
        $selectionSort = 0;
        foreach($option['selections'] as $selection){
            $selectionSort = $selectionSort + 1;
            array_push($selectionsArr,[
                'website_id' => $websiteId,
                'product_option_id' => $createOption->id,
                'sort' => $selectionSort,
                'price' => $selection['price'],
                'isDefault' => $selection['isDefault'],
                'name' => $selection['name'],
                'name_en' => $selection['name_en'],
                'name_ar' => $selection['name_ar'],
                'name_eg' => $selection['name_en'],
                'name_fr' => $selection['name_fr'],
                'name_it' => $selection['name_it'],
                'name_de' => $selection['name_de'],
                'name_es' => $selection['name_es'],
                'name_ru' => '',
                'name_ua' => $selection['name_ua'],
                'created_at' => Carbon::now()->timestamp
            ]);
        }
        product_option_selection::insert($selectionsArr);
    }

    public static function users ($websiteId){
        $faker = Container::getInstance()->make(Generator::class);
        $users = [];
        for($i=0;$i<=40;$i++){
            $lat = '0';
            $lng = '0';
            if(random_int(0,1)){
                $lat = $faker->latitude((33.7490 - (rand(0,20) / 1000)), (33.7490 + (rand(0,20) / 1000)));
                $lng = $faker->longitude((-84.3880 - (rand(0,20) / 1000)), (-84.3880 + (rand(0,20) / 1000)));
            }
            array_push($users,[
                'website_id'=>$websiteId,
                'email' => $faker->unique()->safeEmail(),
                'name' => $faker->firstName().' '.$faker->lastName(),
                'password' => bcrypt('l;ipuopihbgv39ubv'),
                'phoneNumber' => $faker->e164PhoneNumber(),
                'address' => str_replace("\n", "", $faker->address()),
                'lat' => $lat,
                'lng' => $lng,
                'lastSeen' => Carbon::now()->timestamp,
                'cart' => '{}',
                'cart_lastUpdate' => Carbon::now()->timestamp,
                'created_at' => Carbon::now()->timestamp,
            ]);
        }
        User::insert($users);
        User::create([
            'website_id' => $websiteId,
            'email' => 'muha@gmail.com',
            'name' => 'moha',
            'password' => bcrypt('1234'),
            'phoneNumber' => $faker->e164PhoneNumber(),
            'address' => str_replace("\n", "", $faker->address()),
            'lastSeen' => Carbon::now()->timestamp,
            'cart' => '{}',
            'cart_lastUpdate' => Carbon::now()->timestamp,
            'lat' => $lat,
            'lng' => $lng,
        ]);
    }
    public static function reviews ($product){
        product_review::where('product_id',$product->id)->delete();
        $reviewsEG = [
            "5.I absolutely loved this place! Tasty dishes and a lot of options to choose from.",
            "5.The food was delicious and fresh! Also, the order arrived very quickly.",
            "5.The order was delivered quickly, and the food was hot and yummy, exactly what I was looking for!",
            "4.One of the best places I've discovered in a long time. The food had a very authentic taste to it; it was strange at first as it was different, but definitely a good different!",
            "5.The food was served hot and fresh. The staff were really friendly and helped us choose the dishes that matched what we were looking for.",
            "5.The food was hearty, fresh, and delicious!",
            "5.This place is unquestionably a hidden gem. The portions are great, and the food is delicious.",
            "4.The food was very tasty, but there aren’t a lot of options to choose from. It’ll be great if more food items get added to the menu. but will surely come back again!",
            "5.This place is truly underrated; the food was so tasty and fresh, and the service was more than amazing!",
            "5.We were recommended to try this place, and it absolutely met our expectations and more!",
            "4.We had to wait a little while for the food to arrive, but the food was delicious, so it was well worth the wait.",
            "5.I've been here three times now, and each time has been fantastic! The dishes were delicious as usual, and the service was absolutely great and professional.",
            "5.Simply the best food and atmosphere in town! will surely keep coming back.",
            "5.The food was so fresh and had a really strong taste to it. Absolutely loved this place!",
            "5.One of the best spots in town, excellent food, and very quick delivery.",
            "5.This place is my go-to whenever I feel like eating huge portions of delicious food. Will always recommend it!",
            "5.This is my second time here, and I even loved it more! All the dishes were delicious and fresh.",
            "4.If you're looking for a place to try new yet amazing tastes, then this restaurant will be your perfect match. Always happy to come back again.",
            "4.We had an amazing experience eating here! The menu could just use a bit of variety, and the food needs to be done faster. But other than that, the food was really delicious.",
            "5.What I like most about this restaurant is how the food is always served fresh and organic. This is in addition to the delicious taste of the food.",
            "5.The place is so cozy, and the food was really great. I will recommend it to my friends to try it out!",
            "4.The food is absolutely great, but I hope the restaurant's working hours would be extended a bit, as it closes really early.",
            "5.Excellent atmosphere, friendly service, and great food as usual.",
            "5.Really good food and the best value for money. The perfect combination I was looking for!",
            "5.Great food, delivered quickly, and still piping hot. 100% recommend it.",
            "5.We were looking for a new restaurant to try, and what a great find this one was! We had a fantastic time with delicious food. I will definitely come back.",
            "4.Very friendly staff, and amazing portions, especially for the appetizers. I hadn't had the time to try a lot of items, but the ones I tried were superb.",
            "5.I'm pretty picky about where I eat, but this restaurant didn't disappoint! The quality of the food and the service were excellent.",
            "4.The food was superb to say the least. The portions could just be larger, but a really good experience",
            "4.I had an amazing time and loved the specials on the menu. I don't like to try new foods, but the items here are an exception! Never a disappointment.",
            "4.Lovely food and friendly staff. The only issue is that the food takes some time to prepare. But the overall experience was excellent.",
        ];
        $users = User::where('website_id',$product->website_id)->select('id','name')->get();
        $reviewsArr = [];
        foreach($reviewsEG as $review){
            if(rand(0,1)){
                $posted_at = Carbon::now()->subDays(rand(0,200))->timestamp;
                if($product->created_at > Carbon::now()->timestamp){
                    $posted_at = Carbon::now()->subHours(rand(0,150))->timestamp;
                }
                if(rand(1,0)){$userId = null;$userName = null;}
                else{$user = $users->random(); $userId = $user->id; $userName = $user->name;}
                array_push($reviewsArr,[
                    'website_id' => $product->website_id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'user_id' =>$userId,
                    'userName' => $userName,
                    'rate' => explode('.',$review)[0],
                    'review' => explode('.',$review)[1],
                    'posted_at' => $posted_at,
                    'created_at' => Carbon::now()->timestamp
                ]);
            }
        }
        product_review::insert($reviewsArr);
        $productAllStars = 0;
        $reviewsCount = 0;
        foreach($reviewsArr as $review){
            $reviewsCount = $reviewsCount + 1;
            $productAllStars = $productAllStars + $review['rate'];
        }
        product::where('id',$product->id)->update([
            'rating' => $productAllStars / $reviewsCount,
            'ratings_sum' => $reviewsCount,
        ]);
    }

    public static function orders ($website,$daysSum,$timeZone){
        $orders_start = hrtime(true);
        $orders = [];
        $faker = Container::getInstance()->make(Generator::class);
        $accounts = Account::where('website_id',$website->id)->get();
        $deliveries = delivery::where('website_id',$website->id)->get();
        $orderCreatedSum = 0;
        $now = Carbon::now('UTC');
        $ordersDay = Carbon::now($website->timeZone)->startOfDay()->subdays($daysSum - 1);
        // $ordersDay = Carbon::now($website->timeZone)->startOfDay();
        $ordersDay2 = Carbon::now($website->timeZone)->startOfDay()->subdays($daysSum);
        $users = User::where('website_id',$website->id)->get();
        $ordersAvg = random_int(5,10);

        for($y = $daysSum; $y > 1; $y--){
            $ordersDay->addDay(1);
            $start = hrtime(true);
            $dayOrderCreatedSum = 0;
            // $thisDay = Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$timeZone)->setTimezone('UTC');
            for($x = 0; $x < $ordersAvg; $x++){
                $orderCreatedSum = $orderCreatedSum + 1;
                $dayOrderCreatedSum = $dayOrderCreatedSum + 1;
                $isGuest = random_int(0,1);
                $orderType = random_int(0,2);
                $isCanceled = false;
                $orderItems = [];

                $order = new order();
                $order->website_id = $website->id;
                $order->id = order::where('website_id',$website->id )->max('id') + 1;
                $order->type = $orderType;
                $order->collectReviewSeen = false;

                $order->discount_by = 0;
                $order->discount = 0;
                $order->itemsTotal = 0;
                $order->discount_itemsTotal = 0;
                $order->tax = 0;
                $order->deliveryCost = 0;
                $order->taxPercent = 0;
                $order->service = 0;
                $order->servicePercent = 0;
                $order->total = 0;


                if($isGuest){
                    $order->isGuest = true;
                    $order->user_id = null;
                    $order->userName = null;
                    $order->phoneNumber = $faker->e164PhoneNumber();
                    if($orderType == 0){$order->address = str_replace("\n", "", $faker->address());}else{$order->address = null;}
                }else{
                    $user = $users->random();
                    $order->isGuest = false;
                    $order->user_id = $user->id;
                    $order->userName = $user->name;
                    $order->phoneNumber = $user->phoneNumber;
                    if($orderType == 0){$order->address = $user->address;}else{$order->address = null;}
                }
                $products = product::where('website_id',$website->id)->with(['product_options' => function($q){
                    $q->with('product_option_selections');
                }])->inRandomOrder()->limit(random_int(1,10))->get();

                foreach($products as $product){
                    $selections = [];
                    $itemTotal = (double)$product->price;
                    $itemNotice = null;
                    if(random_int(0,8) == 8){$itemNotice = $faker->sentence(1);}

                    $qty = random_int(1,4);
                    if(!empty($product->product_options)){
                        foreach($product->product_options as $option){
                            if(!empty($option->product_option_selections)){
                                $selection = $option->product_option_selections->random();
                                $itemTotal = $itemTotal + $selection->price;
                                array_push($selections,[
                                    'optionName' => $option->name,
                                    'product_option_id' => $option->id,
                                    'selectionName' => $selection->name,
                                    'product_option_selection_id' => $selection->id,
                                    'price' => (double)$selection->price,
                                ]);
                            }
                        }
                    }
                    $itemTotal = $itemTotal * $qty;
                    $order->itemsTotal = $order->itemsTotal  + $itemTotal;
                    array_push($orderItems,[
                        'product_id' => $product->id,
                        'productName' => $product->name,
                        'price' => (double)$product->price,
                        'qty' => (int)$qty,
                        'total' => (double)$itemTotal,
                        'order_item_option_selections' => $selections,
                        'itemNotice' => $itemNotice,
                    ]);
                }


                foreach($orderItems as $item){
                    $orderItem = new order_item($item);
                    $order->order_items()->associate($orderItem);
                }


                if(random_int(0,2) == 0){
                    $order->discount_by = random_int(1,3);
                    if($order->discount_by == 1){
                        $order->discount = random_int(10,20);
                        $account = $accounts->random();
                        $order->discount_account_id = $account->id;
                        $order->discount_account_name = $account->name;
                    }else if($order->discount_by == 2){
                        $order->discount = 10;
                    }else if($order->discount_by == 3){
                        $promocode = promocode::where('website_id',$website->id)->first();
                        $order->discount = $promocode->discount;
                        $order->discount_promocode_id = $promocode->id;
                        $order->discount_promocode = $promocode->code;
                    }
                }
                if($order->discount_by == 0){
                    $order->discount_itemsTotal = $order->itemsTotal;
                }else{
                    $order->discount_itemsTotal = $order->itemsTotal - (($order->itemsTotal / 100 ) * $order->discount);
                }

                if($orderType == 0 ){
                    $order->deliveryCost = 5;
                    $order->tax = ($order->discount_itemsTotal / 100 ) * 2.5;
                    $order->taxPercent =2.5;
                    if(random_int(0,1)){
                        $order->deliveryCost = random_int(5,15);
                        $account = $accounts->random();
                        $order->deliveryEdit_account_name = $account->name;
                        $order->deliveryEdit_account_id = $account->id;
                    }
                }
                else if($orderType == 1 ){
                    $order->tax = ($order->discount_itemsTotal / 100 ) * 3.5;
                    $order->taxPercent = 3.5;
                }
                else if($orderType == 2 ){
                    $order->tax = ($order->discount_itemsTotal / 100 ) * 5;
                    $order->taxPercent = 5;
                    $order->service = ($order->discount_itemsTotal / 100 ) * 10;
                    $order->servicePercent = 10;
                }


                $order->total = $order->discount_itemsTotal + $order-> tax + $order->service + $order->deliveryCost;

                if(random_int(0,4)){$order->notice = $faker->sentence(3);}else{$order->notice = null;}
                $placed_at = Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 13:00:00',$timeZone)->setTimezone('UTC')->addMinutes(random_int(0,540));


                if($orderType == 0){
                    if(random_int(0,1)){$order->paymentMethod = 'cashOnDelivery';}else{$order->paymentMethod = 'cardOnDelivery';}
                    $placed_at = Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 09:00:00',$timeZone)->setTimezone('UTC')->addMinutes(random_int(0,780));
                    $placedBy = random_int(0,1);
                    $is_deliveryMan = random_int(0,1);
                    $deliveryMan = $deliveries->random();

                }else if($orderType == 1){
                    if(random_int(0,1)){$order->paymentMethod = 'cashOnPickup';}else{$order->paymentMethod = 'cardOnPickup';}
                    $placed_at = Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 09:00:00',$timeZone)->setTimezone('UTC')->addMinutes(random_int(0,780));
                    $placedBy = random_int(0,1);

                }else if($orderType == 2){
                    $placed_at = Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 09:00:00',$timeZone)->setTimezone('UTC')->addMinutes(random_int(0,780));
                    $placedBy = 0;

                }

                $order->placed_at = $placed_at;
                $order->created_at = $placed_at;
                $order->placed_by = $placedBy;
                $order->status = 0;

                if($placedBy == 1 ){$order->placed_account_name = null;$order->placed_account_id = null;}
                else{
                    $account = $accounts->random();
                    $order->placed_account_name = $account->name;$order->placed_account_id = $account->id;
                }

                if(random_int(0,5) == 5){
                    if($placedBy == 0){$order->canceled_at = $placed_at;}
                    else{$order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$placed_at->year.'-'.$placed_at->month.'-'.$placed_at->day.' '.$placed_at->hour.':'.$placed_at->format('i').':'.$placed_at->format('s'),'UTC')->addMinutes(random_int(1,10));}
                    $order->canceled_by = $placedBy;
                    $account = $accounts->random();
                    $order->canceled_account_id = $account->id;
                    $order->canceled_account_name = $account->name;
                    $isCanceled = true;
                    $order->status = 2;
                }else{
                    if($placedBy == 0){$order->received_at = $placed_at;}
                    else{$order->received_at = Carbon::createFromFormat('Y-m-d H:i:s',$placed_at->year.'-'.$placed_at->month.'-'.$placed_at->day.' '.$placed_at->hour.':'.$placed_at->format('i').':'.$placed_at->format('s'),'UTC')->addMinutes(random_int(1,10));}
                    $account = $accounts->random();
                    $order->received_account_id = $account->id;
                    $order->received_account_name = $account->name;
                    $order->status = 1;
                }


                if($orderType == 0 && !$isCanceled){
                    if(random_int(0,5) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(1,20));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        if(true){
                            $order->deliveryName = $deliveryMan->deliveryName;
                            $order->delivery_id = $deliveryMan->id;

                        }else{
                            $order->deliveryName = $deliveryMan->null;
                            $order->delivery_id = $deliveryMan->null;

                        }
                        $order->withDelivery_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(15,30));
                        $account = $accounts->random();
                        $order->withDelivery_account_id = $account->id;
                        $order->withDelivery_account_name = $account->name;
                        $order->status = 3;
                    }

                }else if($orderType == 1 && !$isCanceled){
                    if(random_int(0,5) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(1,20));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        $order->readyToPickup_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(15,30));
                        $account = $accounts->random();
                        $order->readyToPickup_account_id = $account->id;
                        $order->readyToPickup_account_name = $account->name;
                        $order->status = 4;
                    }

                }else if($orderType == 2 && !$isCanceled){
                    if(random_int(0,5) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(1,20));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        $order->diningin_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->received_at->year.'-'.$order->received_at->month.'-'.$order->received_at->day.' '.$order->received_at->hour.':'.$order->received_at->format('i').':'.$order->received_at->format('s'),'UTC')->addMinutes(random_int(15,30));
                        $account = $accounts->random();
                        $order->diningin_account_id = $account->id;
                        $order->diningin_account_name = $account->name;
                        $order->status = 8;
                    }
                }


                if($orderType == 0 && !$isCanceled){
                    $order->collectReviewSeen = true;
                    if(random_int(0,5) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->withDelivery_at->year.'-'.$order->withDelivery_at->month.'-'.$order->withDelivery_at->day.' '.$order->withDelivery_at->hour.':'.$order->withDelivery_at->format('i').':'.$order->withDelivery_at->format('s'),'UTC')->addMinutes(random_int(1,15));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        $order->delivered_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->withDelivery_at->year.'-'.$order->withDelivery_at->month.'-'.$order->withDelivery_at->day.' '.$order->withDelivery_at->hour.':'.$order->withDelivery_at->format('i').':'.$order->withDelivery_at->format('s'),'UTC')->addMinutes(random_int(10,20));
                        if(true){
                            $order->delivered_by = 1;
                            $order->delivered_delivery_id = $deliveryMan->id;
                            $order->delivered_delivery_name = $deliveryMan->deliveryName;
                        }else{
                            $order->delivered_by = 0;
                            $account = $accounts->random();
                            $order->delivered_account_id = $account->id;
                            $order->delivered_account_name = $account->name;
                        }
                        $order->status = 5;
                    }

                }else if($orderType == 1 && !$isCanceled){
                    $order->collectReviewSeen = true;
                    if(random_int(0,5) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->readyToPickup_at->year.'-'.$order->readyToPickup_at->month.'-'.$order->readyToPickup_at->day.' '.$order->readyToPickup_at->hour.':'.$order->readyToPickup_at->format('i').':'.$order->readyToPickup_at->format('s'),'UTC')->addMinutes(random_int(1,15));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        $order->pickedUp_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->readyToPickup_at->year.'-'.$order->readyToPickup_at->month.'-'.$order->readyToPickup_at->day.' '.$order->readyToPickup_at->hour.':'.$order->readyToPickup_at->format('i').':'.$order->readyToPickup_at->format('s'),'UTC')->addMinutes(random_int(1,15));
                        $account = $accounts->random();
                        $order->pickedUp_account_id = $account->id;
                        $order->pickedUp_account_name = $account->name;
                        $order->status = 6;
                    }
                }else if($orderType == 2 && !$isCanceled){
                    $order->collectReviewSeen = true;
                    if(random_int(0,15) == 5){
                        $order->canceled_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->diningin_at->year.'-'.$order->diningin_at->month.'-'.$order->diningin_at->day.' '.$order->diningin_at->hour.':'.$order->diningin_at->format('i').':'.$order->diningin_at->format('s'),'UTC')->addMinutes(random_int(1,5));
                        $order->canceled_by = 0;
                        $account = $accounts->random();
                        $order->canceled_account_id = $account->id;
                        $order->canceled_account_name = $account->name;
                        $isCanceled = true;
                        $order->status = 2;
                    }else{
                        $order->dinein_at = Carbon::createFromFormat('Y-m-d H:i:s',$order->diningin_at->year.'-'.$order->diningin_at->month.'-'.$order->diningin_at->day.' '.$order->diningin_at->hour.':'.$order->diningin_at->format('i').':'.$order->diningin_at->format('s'),'UTC')->addMinutes(random_int(20,40));
                        $account = $accounts->random();
                        $order->dinein_account_id = $account->id;
                        $order->dinein_account_name = $account->name;
                        $order->status = 7;
                    }
                }


                if(random_int(0,4)){
                    $order_items_original = $order->order_items->toArray();
                    $randomKey = array_rand($order_items_original, 1);
                    unset($order_items_original[$randomKey]);
                    $order->order_items_original = $order_items_original;
                    $account = $accounts->random();
                    $order->itemsEdit_account_name = $account->name;
                    $order->itemsEdit_account_id = $account->id;
                }
                if(random_int(0,4)){
                    $account = $accounts->random();
                    $order->typeEdit_account_name = $account->name;
                    $order->typeEdit_account_id = $account->id;
                }
                if(random_int(0,4) && $order->notice != null){
                    $account = $accounts->random();
                    $order->noticeEdit_account_name = $account->name;
                    $order->noticeEdit_account_id = $account->id;
                }
                if(random_int(0,4)){
                    $account = $accounts->random();
                    $order->phoneEdit_account_name = $account->name;
                    $order->phoneEdit_account_id = $account->id;
                }
                if(random_int(0,4) && $orderType == 0){
                    $account = $accounts->random();
                    $order->addressEdit_account_name = $account->name;
                    $order->addressEdit_account_id = $account->id;
                }

                $ordersWithSameId = order::where(['website_id'=>$website->id,'id'=>$order->id])->count();
                if($ordersWithSameId > 0){
                    $order->id = order::where('website_id',(int)$website->id )->max('id') + 1;
                }
                $order->save();
                foodmenuFunctions::checkOrderId($website->id,$order->id);
            }
            $ordersAvg = random_int(50,100);
            $end = hrtime(true);
            //

            error_log('');
            error_log("     \e[30m\e[42m  \e[0m \e[33m$dayOrderCreatedSum\e[0m orders created for \e[1m\e[34m".$ordersDay->toDateString()."\e[0m ..... Total orders so far (\e[33m$orderCreatedSum\e[0m)........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");


            if($y != 2){
                $start = hrtime(true);
                // $ordersDay2->subday(1);
                $thisDayOrders = order::
                where(function($q) use ($ordersDay, $website){
                    $q->where('website_id',$website->id)->whereBetween('dinein_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
                })
                ->orWhere(function($q) use ($ordersDay, $website){
                    $q->where('website_id',$website->id)->whereBetween('canceled_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
                })
                ->orWhere(function($q) use ($ordersDay, $website){
                    $q->where('website_id',$website->id)->whereBetween('delivered_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
                })
                ->orWhere(function($q) use ($ordersDay, $website){
                    $q->where('website_id',$website->id)->whereBetween('pickedUp_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
                })
                ->whereIn('status',[2,5,6,7])
                ->with('order_items')->get();
                $reviews = product_review::
                where('website_id',$website->id)
                ->whereBetween('posted_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 00:00:00',$website->timeZone)->setTimezone('UTC')->timestamp, Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay->year.'-'.$ordersDay->month.'-'.$ordersDay->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')->timestamp])
                ->get();
                foodmenuFunctions::archiveStatistice($thisDayOrders,$reviews,(int)$website->id,(int)$ordersDay->day,(int)$ordersDay->month,(int)$ordersDay->year,$website->timeZone);
                $restaurant_Month_Expenses = [
                    0=>["name"=>"electricity","amount"=>random_int(1000,2500).".00"],
                    1=>["name"=>"food ingredients","amount"=>random_int(10000,15000).".00"],
                    2=>["name"=>"advertising","amount"=>random_int(1000,2000).".00"]
                ];
                website::where('id',$website->id)->update([
                    'month_expenses' => $restaurant_Month_Expenses,
                ]);
                $end = hrtime(true);
                error_log('');
                error_log("     \e[30m\e[46m  \e[0m statistics for \e[1m\e[34m".$ordersDay->toDateString()."\e[0m have been created and archived successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");
            }



        }

        $orders_end = hrtime(true);
        error_log('');
        error_log(" \e[30m\e[42m DONE \e[0m Order history created and statistics archived successfully........... \e[32m".number_format(($orders_end - $orders_start) / 60000000000 , 2,'.','')." Minutes\e[0m");

        // $ordersDay2 = Carbon::now($website->timeZone)->startOfDay()->subDays($daysSum);
        // $statistics_start = hrtime(true);

        // error_log('');
        // error_log(" \e[30m\e[44m CREATE \e[0m Starting create and archive statistics data.");
        // for($y = 1; $y < $daysSum; $y++){

        //     $start = hrtime(true);
        //     $ordersDay2->addDay(1);
        //     $thisDayOrders = order::
        //     where(function($q) use ($ordersDay2, $website){
        //         $q->where('website_id',$website->id)->whereBetween('dinein_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
        //     })
        //     ->orWhere(function($q) use ($ordersDay2, $website){
        //         $q->where('website_id',$website->id)->whereBetween('canceled_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
        //     })
        //     ->orWhere(function($q) use ($ordersDay2, $website){
        //         $q->where('website_id',$website->id)->whereBetween('delivered_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
        //     })
        //     ->orWhere(function($q) use ($ordersDay2, $website){
        //         $q->where('website_id',$website->id)->whereBetween('pickedUp_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')]);
        //     })
        //     ->whereIn('status',[2,5,6,7])
        //     ->with('order_items')->get();
        //     $reviews = product_review::
        //     where('website_id',$website->id)
        //     ->whereBetween('posted_at',[Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 00:00:00',$website->timeZone)->setTimezone('UTC'), Carbon::createFromFormat('Y-m-d H:i:s',$ordersDay2->year.'-'.$ordersDay2->month.'-'.$ordersDay2->day.' 23:59:59',$website->timeZone)->setTimezone('UTC')])
        //     ->get();
        //     foodmenuFunctions::archiveStatistice($thisDayOrders,$reviews,(int)$website->id,(int)$ordersDay2->day,(int)$ordersDay2->month,(int)$ordersDay2->year,$website->timeZone);
        //     $end = hrtime(true);
        //     error_log('');
        //     error_log("     \e[30m\e[42m  \e[0m statistics for \e[1m\e[34m".$ordersDay2->toDateString()."\e[0m have been created and archived successfully........... \e[32m".number_format(($end - $start) / 1000000000 , 2,'.','')." Seconds\e[0m");

        // }
        // $statistics_end = hrtime(true);
        // error_log('');
        // error_log(" \e[30m\e[42m DONE \e[0m Archive statistics data have been created successfully........... \e[32m".number_format(($statistics_end - $statistics_start) / 60000000000 , 2,'.','')." Minutes\e[0m");


    }

}
