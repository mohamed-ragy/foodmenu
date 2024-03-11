<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\cpanelSettings;
use App\Models\cron_jobs;
use App\Models\foodmenuFunctions;
use App\Models\website;
use App\Models\websiteText;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\Mail;
use App\Mail\automatedEmails;

class foodmenuController extends Controller
{
    protected $lang;
    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            if(
                $request->FoodMenuLang === 'en'
                // || $request->FoodMenuLang === 'ar'
            ){
                Cookie::queue(Cookie::make('FoodMenuLang',$request->FoodMenuLang,9999999));
                App::setLocale($request->FoodMenuLang);
                $this->lang = $request->FoodMenuLang;
            }else{
                Cookie::queue(Cookie::make('FoodMenuLang','en',9999999));
                App::setLocale('en');
                return redirect()->route('foodmenu.home' , ['FoodMenuLang' => 'en']);
            }
            return $next($request);
        })->except(['doRegister','api']);
    }

    public function home(Request $request){
        return view('foodmenu.home',['lang' => $this->lang]);
    }

    public function register(Request $request){

        $templates = collect(foodmenuFunctions::templates())->shuffle();
        $plans = collect(foodmenuFunctions::plans());
        $plans = $plans->map(function ($c) {
            return collect($c)->forget('id')->forget('monthlyId')->forget('yearlyId');
        });
        $restaurantId = '';
        if(Auth::guard('account')->check()){
            if(Auth::guard('account')->user()->register == 2 || Auth::guard('account')->user()->is_master == false){
                return redirect()->route('cpanel');
            }
            $account = Auth::guard('account')->user();
            if($account->register > 0 ){
                $restaurantId = website::where('id',$account->website_id)->pluck('domainName')->first();
            }
        }else{
            $account = 'null';
        }


        return view('foodmenu.register',['account' => $account, 'lang'=>$this->lang, 'templates'=>$templates,'plans'=>$plans,'restaurantId'=>$restaurantId]);
    }

    public function doRegister(Request $request){
        if($request->has('createAccount')){
            if(Auth::guard('account')->check()){return;}
            $validation = validator::make([
                'name'=>$request->name,
                'email'=>$request->email,
                'password' => $request->password,
                'passwordConfirm' => $request->passwordConfirm,
                'agree1' => $request->agree1,
                'agree2' => $request->agree2,
            ],[
                'email' => 'required|email|unique:accounts,email',
                'name' => 'required|regex:/^[a-zA-Z ]*$/ ',
                'password' => 'required|min:8|max:100|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:passwordConfirm',
                'passwordConfirm' => 'required|same:password',
                'agree1' => 'required|accepted',
                'agree2' => 'required|accepted',
            ],[
                'email.required' => Lang::get('foodmenu/register.emailRequired'),
                'email.email' => Lang::get('foodmenu/register.emailEmail'),
                'email.unique' => Lang::get('foodmenu/register.emailUnique'),

                'name.required' => Lang::get('foodmenu/register.nameRequired'),
                'name.regex' => Lang::get('foodmenu/register.nameRegex'),

                'password.required' => Lang::get('foodmenu/register.passwordRequired'),
                'password.min' => Lang::get('foodmenu/register.passwordMin'),
                'password.max' => Lang::get('foodmenu/register.passwordMax'),
                'password.regex' => Lang::get('foodmenu/register.passwordRegex'),
                'password.same' => Lang::get('foodmenu/register.passwordSame'),

                'passwordConfirm.required' => Lang::get('foodmenu/register.passwordConfirmRequired'),
                'passwordConfirm.same' => Lang::get('foodmenu/register.passwordSame'),

                'agree1.required' => Lang::get('foodmenu/register.agree1Accepted'),
                'agree1.accepted' => Lang::get('foodmenu/register.agree1Accepted'),

                'agree2.required' => Lang::get('foodmenu/register.agree2Accepted'),
                'agree2.accepted' => Lang::get('foodmenu/register.agree2Accepted'),


            ]);

            if($validation->fails()){
                return response(['createAccountState' => 0,'errors' => $validation->errors()]);
            }else{
                $emailVerificationCode = Str::random(6);
                if($request->agree3 == 'true'){$request->agree3 = 1;}else if($request->agree3 == 'false'){$request->agree3 = 0;}
                $createNewAccount = Account::create([
                    'website_id'=> null,
                    'register' => 0,
                    'newsLetter' => $request->agree3,
                    'is_master' => true,
                    'authorities' => '111111',
                    'name' => $request->name,
                    'email_verification_code' => $emailVerificationCode,
                    'email_verification_code_sent_at' => Carbon::now()->timestamp,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
                if($createNewAccount){
                    cpanelSettings::create(['account_id'=> $createNewAccount->id]);
                    Auth::guard('account')->attempt(['email' => $request['email'] , 'password' => $request['password'] ]);
                    // $request->session()->regenerate();
                    //send email with email verification code and tell him if he didn't finish rigster he can login and finish installation
                    $account = Auth::guard('account')->user();
                    $data = [
                        'account_name' => $account->name,
                        'account_email' => $account->email,
                        'lang' => $account->language,
                        'content' => str_replace(':code:',$emailVerificationCode,Lang::get('mails/automated.welcome')),
                    ];
                    dispatch(function () use($data,){Mail::send(new automatedEmails($data));})->afterResponse();

                    return response(['createAccountState' => 1]);
                }
            }
        }
        else if($request->has('installWebsite')){
            if(Auth::guard('account')->user()->website_id != null){return;}
            $notAllowedDomainNames = [
                'www','delivery','cpanel','help','administration','foodmenu','menu','api','admin','register','signup','login','signin','helpcenter','blog','vlog','faq','how','example','billing','mail','mailing','design','editor','preview',
                'cumbubble','fuck','fuckyou','shitbag','shit','pissoff','asshole','dickweed','cunt','sonofabitch','fucktrumpet','bastard','bitch','damn','bollocks','bugger','cocknose','bloodyhell','knobhead','choad','bitchtits','crikey','rubbish','pissflaps','shag','wanker','talkingthepiss','twat','arsebadger','jizzcock','cumdumpster','shitmagnet','scrote','twatwaffle','thundercunt','dickhead','shitpouch','jizzstain','nonce','pisskidney','wazzock','cumwipe','fanny','bellend','pisswizard','knobjockey','cuntpuddle','dickweasel','quim','bawbag','fuckwit','tosspot','cockwomble','twatface','cack','flange','clunge','dickfucker','fannyflaps','wankface','shithouse','gobshite','jizzbreath','todger','nutsack',
            ];
            $countries = ['AFG','ALB','DZA','ASM','AND','AGO','AIA','ATG','ARG','ARM','ABW','AUS','AUT','AZE','BHS','BHR','BGD','BRB','BLR','BEL','BLZ','BEN','BMU','BTN','BOL','BIH','BWA','BRA','IOT','BRN','BGR','BFA','BDI','KHM','CMR','CAN','CPV','CYM','CAF','TCD','CHL','CHN','CXR','CCK','COL','COM','COG','COD','COK','CRI','HRV','CUB','CYP','CZE','CIV','DNK','DJI','DMA','DOM','ECU','EGY','SLV','GNQ','ERI','EST','ETH','FLK','FRO','FJI','FIN','FRA','GUF','PYF','GAB','GMB','GEO','DEU','GHA','GIB','GRC','GRL','GRD','GLP','GUM','GTM','GGY','GIN','GNB','GUY','HTI','HMD','HND','HKG','HUN','ISL','IND','IDN','IRN','IRQ','IRL','IMN','ISR','ITA','JAM','JPN','JEY','JOR','KAZ','KEN','KIR','KWT','KGZ','LAO','LVA','LBN','LSO','LBR','LBY','LIE','LTU','LUX','MAC','MDG','MWI','MYS','MLI','MLT','MHL','MRT','MUS','MYT','MEX','FSM','MDA','MCO','MNG','MNE','MSR','MAR','MOZ','MMR','NAM','NLD','NZL','NIC','NER','NGA','PRK','MKD','MNP','NOR','OMN','PAK','PLW','PSE','PAN','PNG','PRY','PER','PHL','PCN','POL','PRT','PRI','QAT','REU','ROU','RUS','RWA','SHN','KNA','LCA','SPM','VCT','WSM','SMR','STP','SAU','SEN','SRB','SYC','SLE','SGP','SVK','SVN','SLB','SOM','ZAF','SGS','KOR','ESP','LKA','SDN','SUR','SJM','SWZ','SWE','CHE','SYR','TWN','TJK','TZA','THA','TLS','TGO','TKL','TON','TTO','TUN','TUR','TKM','TCA','TUV','UGA','UKR','ARE','GBR','USA','URY','UZB','VUT','VAT','VEN','VNM','VGB','VIR','WLF','ESH','YEM','ZMB','ZWE'];
            $timeZones = ['Africa/Abidjan','Africa/Accra','Africa/Addis_Ababa','Africa/Algiers','Africa/Asmera','Africa/Bamako','Africa/Bangui','Africa/Banjul','Africa/Bissau','Africa/Blantyre','Africa/Brazzaville','Africa/Bujumbura','Africa/Cairo','Africa/Casablanca','Africa/Ceuta','Africa/Conakry','Africa/Dakar','Africa/Dar_es_Salaam','Africa/Djibouti','Africa/Douala','Africa/El_Aaiun','Africa/Freetown','Africa/Gaborone','Africa/Harare','Africa/Johannesburg','Africa/Juba','Africa/Kampala','Africa/Khartoum','Africa/Kigali','Africa/Kinshasa','Africa/Lagos','Africa/Libreville','Africa/Lome','Africa/Luanda','Africa/Lubumbashi','Africa/Lusaka','Africa/Malabo','Africa/Maputo','Africa/Maseru','Africa/Mbabane','Africa/Mogadishu','Africa/Monrovia','Africa/Nairobi','Africa/Ndjamena','Africa/Niamey','Africa/Nouakchott','Africa/Ouagadougou','Africa/Porto-Novo','Africa/Sao_Tome','Africa/Tripoli','Africa/Tunis','Africa/Windhoek','America/Anchorage','America/Anguilla','America/Antigua','America/Araguaina','America/Argentina/La_Rioja','America/Argentina/Rio_Gallegos','America/Argentina/Salta','America/Argentina/San_Juan','America/Argentina/San_Luis','America/Argentina/Tucuman','America/Argentina/Ushuaia','America/Aruba','America/Asuncion','America/Bahia','America/Bahia_Banderas','America/Barbados','America/Belem','America/Belize','America/Blanc-Sablon','America/Boa_Vista','America/Bogota','America/Boise','America/Buenos_Aires','America/Cambridge_Bay','America/Campo_Grande','America/Cancun','America/Caracas','America/Catamarca','America/Cayenne','America/Cayman','America/Chicago','America/Chihuahua','America/Coral_Harbour','America/Cordoba','America/Costa_Rica','America/Creston','America/Cuiaba','America/Curacao','America/Danmarkshavn','America/Dawson','America/Dawson_Creek','America/Denver','America/Detroit','America/Dominica','America/Edmonton','America/Eirunepe','America/El_Salvador','America/Fortaleza','America/Glace_Bay','America/Godthab','America/Goose_Bay','America/Grand_Turk','America/Grenada','America/Guadeloupe','America/Guatemala','America/Guayaquil','America/Guyana','America/Halifax','America/Havana','America/Hermosillo','America/Indiana/Knox','America/Indiana/Marengo','America/Indiana/Petersburg','America/Indiana/Tell_City','America/Indiana/Vevay','America/Indiana/Vincennes','America/Indiana/Winamac','America/Indianapolis','America/Inuvik','America/Iqaluit','America/Jamaica','America/Jujuy','America/Juneau','America/Kentucky/Monticello','America/Kralendijk','America/La_Paz','America/Lima','America/Los_Angeles','America/Louisville','America/Lower_Princes','America/Maceio','America/Managua','America/Manaus','America/Marigot','America/Martinique','America/Matamoros','America/Mazatlan','America/Mendoza','America/Menominee','America/Merida','America/Mexico_City','America/Moncton','America/Monterrey','America/Montevideo','America/Montreal','America/Montserrat','America/Nassau','America/New_York','America/Nipigon','America/Nome','America/Noronha','America/North_Dakota/Beulah','America/North_Dakota/Center','America/North_Dakota/New_Salem','America/Ojinaga','America/Panama','America/Pangnirtung','America/Paramaribo','America/Phoenix','America/Port-au-Prince','America/Porto_Velho','America/Port_of_Spain','America/Puerto_Rico','America/Rainy_River','America/Rankin_Inlet','America/Recife','America/Regina','America/Resolute','America/Rio_Branco','America/Santarem','America/Santa_Isabel','America/Santiago','America/Santo_Domingo','America/Sao_Paulo','America/Scoresbysund','America/Sitka','America/St_Barthelemy','America/St_Johns','America/St_Kitts','America/St_Lucia','America/St_Thomas','America/St_Vincent','America/Swift_Current','America/Tegucigalpa','America/Thule','America/Thunder_Bay','America/Tijuana','America/Toronto','America/Tortola','America/Vancouver','America/Whitehorse','America/Winnipeg','America/Yakutat','America/Yellowknife','Antarctica/Casey','Antarctica/Davis','Antarctica/DumontDUrville','Antarctica/Macquarie','Antarctica/Mawson','Antarctica/McMurdo','Antarctica/Palmer','Antarctica/Rothera','Antarctica/Syowa','Antarctica/Vostok','Arctic/Longyearbyen','Asia/Aden','Asia/Almaty','Asia/Amman','Asia/Anadyr','Asia/Aqtau','Asia/Aqtobe','Asia/Ashgabat','Asia/Baghdad','Asia/Bahrain','Asia/Baku','Asia/Bangkok','Asia/Beirut','Asia/Bishkek','Asia/Brunei','Asia/Chita','Asia/Choibalsan','Asia/Colombo','Asia/Damascus','Asia/Dhaka','Asia/Dili','Asia/Dubai','Asia/Dushanbe','Asia/Hong_Kong','Asia/Hovd','Asia/Irkutsk','Asia/Jakarta','Asia/Jayapura','Asia/Jerusalem','Asia/Kabul','Asia/Kamchatka','Asia/Karachi','Asia/Kathmandu','Asia/Khandyga','Asia/Kolkata','Asia/Krasnoyarsk','Asia/Kuala_Lumpur','Asia/Kuching','Asia/Kuwait','Asia/Macau','Asia/Magadan','Asia/Makassar','Asia/Manila','Asia/Muscat','Asia/Nicosia','Asia/Novokuznetsk','Asia/Novosibirsk','Asia/Omsk','Asia/Oral','Asia/Phnom_Penh','Asia/Pontianak','Asia/Pyongyang','Asia/Qatar','Asia/Qyzylorda','Asia/Rangoon','Asia/Riyadh','Asia/Saigon','Asia/Sakhalin','Asia/Samarkand','Asia/Seoul','Asia/Shanghai','Asia/Singapore','Asia/Srednekolymsk','Asia/Taipei','Asia/Tashkent','Asia/Tbilisi','Asia/Tehran','Asia/Thimphu','Asia/Tokyo','Asia/Ulaanbaatar','Asia/Urumqi','Asia/Ust-Nera','Asia/Vientiane','Asia/Vladivostok','Asia/Yakutsk','Asia/Yekaterinburg','Asia/Yerevan','Atlantic/Azores','Atlantic/Bermuda','Atlantic/Canary','Atlantic/Cape_Verde','Atlantic/Faeroe','Atlantic/Madeira','Atlantic/Reykjavik','Atlantic/South_Georgia','Atlantic/Stanley','Atlantic/St_Helena','Australia/Adelaide','Australia/Brisbane','Australia/Broken_Hill','Australia/Currie','Australia/Darwin','Australia/Hobart','Australia/Lindeman','Australia/Melbourne','Australia/Perth','Australia/Sydney','CST6CDT','EST5EDT','Europe/Amsterdam','Europe/Andorra','Europe/Astrakhan','Europe/Athens','Europe/Belgrade','Europe/Berlin','Europe/Bratislava','Europe/Brussels','Europe/Bucharest','Europe/Budapest','Europe/Busingen','Europe/Chisinau','Europe/Copenhagen','Europe/Dublin','Europe/Gibraltar','Europe/Guernsey','Europe/Helsinki','Europe/Isle_of_Man','Europe/Istanbul','Europe/Jersey','Europe/Kaliningrad','Europe/Kiev','Europe/Kirov','Europe/Lisbon','Europe/Ljubljana','Europe/London','Europe/Luxembourg','Europe/Madrid','Europe/Malta','Europe/Mariehamn','Europe/Minsk','Europe/Monaco','Europe/Moscow','Europe/Nicosia','Europe/Oslo','Europe/Paris','Europe/Podgorica','Europe/Prague','Europe/Riga','Europe/Rome','Europe/Samara','Europe/San_Marino','Europe/Sarajevo','Europe/Simferopol','Europe/Skopje','Europe/Sofia','Europe/Stockholm','Europe/Tallinn','Europe/Tirane','Europe/Ulyanovsk','Europe/Uzhgorod','Europe/Vaduz','Europe/Vatican','Europe/Vienna','Europe/Vilnius','Europe/Volgograd','Europe/Warsaw','Europe/Zagreb','Europe/Zaporozhye','Europe/Zurich','Indian/Antananarivo','Indian/Chagos','Indian/Christmas','Indian/Cocos','Indian/Comoro','Indian/Kerguelen','Indian/Mahe','Indian/Maldives','Indian/Mauritius','Indian/Mayotte','Indian/Reunion','MST7MDT','Pacific/Apia','Pacific/Auckland','Pacific/Efate','Pacific/Enderbury','Pacific/Fakaofo','Pacific/Fiji','Pacific/Funafuti','Pacific/Galapagos','Pacific/Guadalcanal','Pacific/Guam','Pacific/Honolulu','Pacific/Johnston','Pacific/Kosrae','Pacific/Kwajalein','Pacific/Majuro','Pacific/Midway','Pacific/Nauru','Pacific/Niue','Pacific/Noumea','Pacific/Pago_Pago','Pacific/Palau','Pacific/Ponape','Pacific/Port_Moresby','Pacific/Rarotonga','Pacific/Saipan','Pacific/Tahiti','Pacific/Tarawa','Pacific/Tongatapu','Pacific/Truk','Pacific/Wake','Pacific/Wallis','PST8PDT'];
            $langs = ['en','fr','de','it','es','ua','ar'];
            $templates = collect(foodmenuFunctions::templates());
            $templatesIds = [];
            foreach($templates as $template){array_push($templatesIds,$template['id']);}
            $plans = collect(foodmenuFunctions::plans());
            $plansNames = [];
            foreach($plans as $plan){array_push($plansNames,$plan['name']);}

            $request->domainName = strip_tags($request->domainName);
            $request->restaurantName = strip_tags($request->restaurantName);
            $request->restaurantDescription = strip_tags($request->restaurantDescription);
            $request->currencySymbol = strip_tags($request->currencySymbol);
            $request->restaurantPhoneNumber = strip_tags($request->restaurantPhoneNumber);
            $request->restaurantAddress = strip_tags($request->restaurantAddress);
            $request->lat = strip_tags($request->lat);
            $request->lng = strip_tags($request->lng);



            $validation = Validator::make(
                [
                    'domainName' => $request->domainName,
                    'country' => $request->country,
                    'timeZone' => $request->timeZone,
                    'websiteLang' => $request->websiteLang,
                    'template' => $request->template,
                    'plan' => $request->plan,
                ],
                [
                    'domainName' => ['required',Rule::notIn($notAllowedDomainNames),'unique:websites,domainName','regex:/^[a-z0-9]+$/'],
                    'country' => ['required',Rule::in($countries)],
                    'timeZone' => ['required',Rule::in($timeZones)],
                    'websiteLang' => ['required',Rule::in($langs)],
                    'template' => ['required',Rule::in($templatesIds)],
                    'plan' => ['required',Rule::in($plansNames)],
                ],
                [
                    'domainName.required' => Lang::get('foodmenu/register.domainNameRequired'),
                    'domainName.not_in' => Lang::get('foodmenu/register.domainNameNotin'),
                    'domainName.unique' => Lang::get('foodmenu/register.domainNameUnique'),
                    'domainName.regex' => Lang::get('foodmenu/register.domainNameRegex'),

                    'country.required' => Lang::get('foodmenu/register.countryRequired'),
                    'country.in' => Lang::get('foodmenu/register.countryRequired'),

                    'timeZone.required' => Lang::get('foodmenu/register.timeZoneRequired'),
                    'timeZone.in' => Lang::get('foodmenu/register.timeZoneRequired'),

                    'websiteLang.required' => Lang::get('foodmenu/register.websiteLangRequired'),
                    'websiteLang.in' => Lang::get('foodmenu/register.websiteLangRequired'),

                    'template.required' => Lang::get('foodmenu/register.templateRequired'),
                    'template.in' => Lang::get('foodmenu/register.templateRequired'),

                    'plan.required' => Lang::get('foodmenu/register.planRequired'),
                    'plan.in' => Lang::get('foodmenu/register.planRequired'),
                ],
            );

            if($validation->fails()){
                return response(['installWebsiteState'=>0,'errors'=>$validation->errors()]);
            }else{
                if($request->restaurantName == null){$request->restaurantName = '';}
                if($request->restaurantDescription == null){$request->restaurantDescription = '';}
                if($request->currencySymbol == null){$request->currencySymbol = '';}
                if($request->restaurantPhoneNumber == null){$request->restaurantPhoneNumber = '';}
                if($request->restaurantAddress == null){$request->restaurantAddress = '';}
                if($request->lat == null){$request->lat = '0';}
                if($request->lng == null){$request->lng = '0';}

                $languages = [
                    'en' => ['code'=>'en','name'=>'English','direction'=>'ltr','flag'=>'USA','websiteDefault'=>1,'receiptDefault'=>1],
                    'es' => ['code'=>'es','name'=>'Española','direction'=>'ltr','flag'=>'ESP','websiteDefault'=>1,'receiptDefault'=>1],
                    'fr' => ['code'=>'fr','name'=>'français','direction'=>'ltr','flag'=>'FRA','websiteDefault'=>1,'receiptDefault'=>1],
                    'de' => ['code'=>'de','name'=>'Deutsche','direction'=>'ltr','flag'=>'DEU','websiteDefault'=>1,'receiptDefault'=>1],
                    'ar' => ['code'=>'ar','name'=>'العربية','direction'=>'rtl','flag'=>'SAU','websiteDefault'=>1,'receiptDefault'=>1],
                    'ua' => ['code'=>'ua','name'=>'українська','direction'=>'ltr','flag'=>'UKR','websiteDefault'=>1,'receiptDefault'=>1],
                    'it' => ['code'=>'it','name'=>'Italiana','direction'=>'ltr','flag'=>'ITA','websiteDefault'=>1,'receiptDefault'=>1],
                ];
                $websiteLang;
                foreach($languages as $lang){
                    if($lang['code'] == $request->websiteLang){
                        $websiteLang = $lang;
                    }
                }
                $websiteLanguages = [$websiteLang['code']=>$websiteLang];
                // $emptyLangs = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];
                $emptyLangs = [$websiteLang['code'] => ''];
                // $emptyLangs2 = ['img'=>'template','title_en'=>'','title_ar'=>'','title_eg'=>'','title_fr'=>'','title_de'=>'','title_es'=>'','title_it'=>'','title_ru'=>'','title_ua'=>'','des_en'=>'','des_ar'=>'','des_eg'=>'','des_fr'=>'','des_de'=>'','des_es'=>'','des_it'=>'','des_ru'=>'','des_ua'=>''];
                $emptyLangs2 = ['img'=>'template','title_'.$websiteLang['code']=>'','des_'.$websiteLang['code']=>''];
                $workingDays = [
                    'sunday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'monday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'tuesday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'wednesday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'thursday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'friday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                    'saturday' => [
                        'working' =>  true,
                        'working24' => false,
                        'from' =>  '13.00',
                        'to' =>  '22.00',
                        'discount' =>  '0',
                        'Dfrom' =>  '13.00',
                        'Dto' =>  '22.00',
                    ],
                ];

                $plan = $plans->where('name',$request->plan)->first();
                // $template = $templates->where('id',$request->template)->first();
                $stripe = new \Stripe\StripeClient('sk_test_51NV5sdIYxD8tIsOHGtIyOTrQbxUq7Nb6Zl2fHSbiaSYjgg80vm5CsifxrCc3XNxTDszMbuGucWP6IdTNhZkU3TWT00IuEY1ouI');
                $testClock = $stripe->testHelpers->testClocks->create([
                    'frozen_time' => Carbon::now()->timestamp,
                    'name' => Auth::guard('account')->user()->name,
                  ]);
                $customer = $stripe->customers->create([
                    'email' => Auth::guard('account')->user()->email,
                    'name' => $request->domainName,
                    'test_clock' => $testClock->id,
                ]);
                if($customer){
                    if($request->billedYearly){$price_id = $plan['yearlyId'];}else{$price_id = $plan['monthlyId'];}
                    $subscription = $stripe->subscriptions->create([
                        'customer' => $customer->id,
                        'items' => [[
                            'price' => $price_id,
                        ]],
                        // 'trial_end' => Carbon::now()->addDays(7)->timestamp,
                        'trial_period_days' => 7,
                        'payment_behavior' => 'default_incomplete',
                        'payment_settings' => ['save_default_payment_method' => 'on_subscription'],
                        // 'expand' => ['latest_invoice.payment_intent'],
                        'trial_settings' => ['end_behavior' => ['missing_payment_method' => 'cancel']],
                    ]);

                    if($subscription){
                        if($request->restaurantPhoneNumber == '' || $request->restaurantPhoneNumber == null){
                            $restaurantPhoneNumbers = [];
                        }else{
                            $restaurantPhoneNumbers = [0 => strip_tags($request->restaurantPhoneNumber)];
                        }
                        // $websiteAddresses = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];
                        $websiteAddresses = [$websiteLang['code'] => strip_tags($request->restaurantAddress)];
                        // $websiteAddresses[$request->websiteLang] = strip_tags($request->restaurantAddress);

                        $currencies = [$websiteLang['code'] => strip_tags($request->currencySymbol)];
                        // $currencies = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];
                        // $currencies[$request->websiteLang] = strip_tags($request->currencySymbol);

                        $websiteNames = [$websiteLang['code'] => strip_tags($request->restaurantName)];
                        // $websiteNames = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];
                        // $websiteNames[$request->websiteLang] = strip_tags($request->restaurantName);

                        $websiteDescriptions = [$websiteLang['code'] => strip_tags($request->restaurantDescription)];
                        // $websiteDescriptions = ['en' => '','ar' => '','eg' => '','fr' => '','de' => '','it' => '','ru' => '','ua' => '','es' => ''];
                        // $websiteDescriptions[$request->websiteLang] = strip_tags($request->restaurantDescription);

                        $website = new website();
                        $website->plan = $plan['name'];
                        $website->billingPeriod = $subscription->plan->interval;
                        $website->customer_id = $customer->id;
                        $website->subscription_id = $subscription->id;
                        $website->active = true;
                        $website->domainName = $request->domainName;
                        $website->languages = $websiteLanguages;
                        // $website->defaultLanguage = $request->websiteLang;
                        // $website->receiptLanguage = $request->websiteLang;
                        $website->phoneNumbers = $restaurantPhoneNumbers;
                        $website->addresses = $websiteAddresses;
                        $website->lat = $request->lat;
                        $website->lng = $request->lng;
                        $website->url = $request->domainName.'.'.env('APP_DOMAIN');
                        $website->timeZone = $request->timeZone;
                        $website->hour12 = $request->hour12;
                        $website->country_code = $request->country;
                        $website->websiteNames = $websiteNames;
                        $website->websiteDescriptions = $websiteDescriptions;
                        $website->currencies = $currencies;
                        $website->website_announcements = $emptyLangs;
                        $website->website_receiptMsgs = $emptyLangs;
                        $website->website_privacyPolicy = $emptyLangs;
                        $website->expenses = [];
                        $website->month_expenses = [];
                        $website->template_id = 1;
                        // $website->website_colors = $template['colors'];
                        // $website->customColorsHexCode = ['color1'=>'#F5F5F5','color2'=>'#EBEBEB','color3'=>'#E0E0E0','color4'=>'#D6D6D6','color5'=>'#CCCCCC','colorError'=>'#D10000','colorSuccess'=>'#228B22','colorWarning'=>'#E3AE09','colorStar'=>'#ffc824',];
                        // $website->template = $template['id'];
                        // $website->intro = $emptyLangs2;
                        // $website->info = $emptyLangs2;
                        // $website->ourStory = $emptyLangs2;
                        // $website->slideShow = [
                        //     'interval' => 15,
                        //     'content' => [],
                        // ];
                        // $website->gallery = '';
                        $website->workingDays_delivery = $workingDays;
                        $website->workingDays_pickup = $workingDays;
                        $website->workingDays_dinein = $workingDays;

                        $website->useDelivery = $request->useDelivery;
                        $website->usePickup = $request->usePickup;
                        $website->dineinWorkingHours = $request->dineinWorkingHours;
                        $website->guestOrders = $request->guestOrders;
                        $website->cancelOrder = $request->cancelOrder;
                        $website->productReviews = $request->productReviews;
                        $website->guestReviews = $request->guestReviews;
                        $website->liveChat = $request->liveChat;
                        $website->guestLiveChat = $request->guestLiveChat;
                        $website->save();

                        if($website){
                            Account::where('id',Auth::guard('account')->user()->id)->update(['register'=>1,'website_id'=>$website->id]);
                            cron_jobs::create([
                                'website_id' => $website->id,
                                'type' => 0,
                                'timeZone' => $website->timeZone,
                            ]);
                            websiteText::create(['website_id'=>$website->id,'lang'=>$websiteLang['code'],'text'=>foodmenuFunctions::defaultLanguageText($websiteLang['code'])]);
                            foodmenuFunctions::notification(null,[
                                'website_id' => $website->id,
                                'code' => 'website.installed'
                            ],null);

                            $account = Auth::guard('account')->user();
                            $data = [
                                'account_name' => $account->name,
                                'account_email' => $account->email,
                                'lang' => $account->language,
                                'content' => Lang::get('mails/automated.website_installed'),
                            ];
                            dispatch(function () use($data,){Mail::send(new automatedEmails($data));})->afterResponse();


                            return response(['installWebsiteState' => 1]);
                        }else{
                            //return unkown error try again
                        }
                    }else{
                        //return unkown error try again
                    }
                }else{
                    //return unkown error try again
                }




            }
        }
        else if($request->has('setInstallationDone')){
            if(Auth::guard('account')->check()){
                if(Auth::guard('account')->user()->register == 1){
                    Account::where('id',Auth::guard('account')->user()->id)->update(['register'=>2]);
                }
            }
        }
    }



    public function api(Request $request){
        if($request->has('getTemplates')){
            $allTemplates = collect(foodmenuFunctions::templates());
            $templates = $allTemplates->where('restaurantType',$request->getTemplates)->shuffle();
            // $templates = $allTemplates->shuffle();
            // $templates = collect(foodmenuFunctions::templates());
            return response(['templates'=>$templates]);
        }
    }

    public function createPaymentMethod(Request $request){
        return view('foodmenu.billing.createPaymentMethod',['lang' => $this->lang]);
    }
}


