<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="facebook-domain-verification" content="pre9ub4x7kdutzw9kz2pxrb8w7aded" />
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="apple-touch-icon" href="/storage/favicon.ico">
    <meta name="description" content="{{ trans('home/home.homeDescription') }}">
    <title>Food Menu</title>
    <link rel="stylesheet" href="/css/home/underConstraction.css">
    <script src="/js/home/underConstraction.js"></script>
<!-- Meta Pixel Code -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1541036089749545');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1541036089749545&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->
</head>
<body>
    <span class="ico-lamp bodyAnimatedIcon" ></span>
    <span class="ico-users bodyAnimatedIcon" ></span>
    <span class="ico-money bodyAnimatedIcon"></span>
    <span class="ico-pickup bodyAnimatedIcon"></span>
    <span class="ico-products bodyAnimatedIcon"></span>
    <span class="ico-delivery bodyAnimatedIcon"></span>
    <span class="ico-dineIn bodyAnimatedIcon"></span>
    <span class="ico-cart bodyAnimatedIcon"></span>
    <span class="ico-orders bodyAnimatedIcon"></span>
    <span class="ico-statistics_and_analytics bodyAnimatedIcon"></span>
    <span class="ico-accepted bodyAnimatedIcon"></span>
    <span class="ico-pending bodyAnimatedIcon"></span>
    <span class="ico-address bodyAnimatedIcon"></span>
    <span class="ico-email_address bodyAnimatedIcon"></span>
    <span class="ico-restaurant_information bodyAnimatedIcon"></span>
    <span class="ico-create_new_user bodyAnimatedIcon"></span>
    <span class="ico-notifications bodyAnimatedIcon"></span>
    <span class="ico-plans bodyAnimatedIcon"></span>
    <span class="ico-phone_number bodyAnimatedIcon"></span>
    <span class="ico-design bodyAnimatedIcon"></span>
    <span class="ico-images bodyAnimatedIcon"></span>
    <span class="ico-share bodyAnimatedIcon"></span>
    <span class="ico-placeNewOrder bodyAnimatedIcon"></span>
    <span class="ico-websiteTexts bodyAnimatedIcon"></span>
    <div id="top">
        <div id="topContainer">
            <div id="topTxt">
                <div id="topTxt2">
                    <img src="/storage/logo/logo.png" id="logoImg" alt="">
                    <span id="logoTxt">FOOD MENU</span>
                </div>
                <div id="topTxt3">
                    Food-menu is a platform designed to assist restaurant owners in launching their websites and managing their restaurants through our all-in-one services.
                </div>
                <div id="topTxt1">
                    <div><span>Launch</span> your website effortlessly,</div>
                    <div><span>Manage</span> Your Restaurant,</div>
                    <div><span>Grow</span> Big,</div>
                </div>
                <div class="signupContainerContainer">
                    <div class="flexRow" style="flex-wrap:wrap;margin-top:.5em;">
                        <div style="text-align: center;color:#032620;font-size:1.1em;">We are working on launching our services very soon. Sign up now to book a free 30-day beta version once it's ready.</div>
                    </div>

                    <div class="signupContainer">
                        <input class="signupInput" type="text" placeholder="Your Email">
                        <div class="signupBtn">Sign up</div>
                    </div>
                    <img class="loading" src="{{ asset('storage/imgs/loading-dark.png') }}" alt="">
                    <div class="flexRow wrongEmail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>The email address you entered is incorrect.</span>
                    </div>
                    <div class="flexRow signupFail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>Unknown Error Occurred! Please try again.</span>
                    </div>
                    <div class="flexRow signupSuccess" style="color:var(--fm-green-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-check"></span>
                        <span>Thank you for signing up with us! We will get back to you as soon as possible once the beta version is ready.</span>
                    </div>
                </div>
            </div>
            <div class="imgContainer" id="imgContainer">
                <img class="img" src="/storage/imgs/underConstraction/img.jpg" alt="">
                <div class="img1Filter" style="transform:rotateZ(25deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(20deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(15deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(10deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(5deg);"></div>
            </div>
        </div>
        <div id="learnMore">
            <div>Learn More</div>
            <div class="ico-down"></div>
        </div>
    </div>
    <div id="mid">
        <div id="midTxt">Food-menu Is The Game-changer Your Restaurant Needs</div>
        <div id="cardsContainer">
            <div class="card" card="1">
                <div class="cardImgContainer">
                    <img class="cardImgbr1 cardImg" src="/storage/imgs/underConstraction/cardimg1.jpg" alt="">
                </div>
                <div class="cardBody">
                    <div class="cardTitle">Have a Website In a Few Minutes</div>
                    <div class="cardDescription">With Food-menu, you can go live with your restaurant instantly. Have an interactive multiple-page website, and go as far as you want with key restaurant features such as online ordering and a customer rating and review system.</div>
                </div>
                <div class="cardReadMore">
                    <span style="font-size:1.1em">Read More</span><span style="margin-inline-start:.25em;font-weight:bold;" class="ico-right"></span>
                </div>
            </div>
            <div class="card" card="2">
                <div class="cardImgContainer">
                    <img class="cardImgbr1 cardImg" src="/storage/imgs/underConstraction/cardimg2.jpg" alt="">
                </div>
                <div class="cardBody">
                    <div class="cardTitle">Develop Your Own Website</div>
                    <div class="cardDescription">You won't need to collaborate and go back and forth with a web developer for your website anymore. With food-menu, we enable you to customize your website using simple tools that don't require any web development knowledge.</div>
                </div>
                <div class="cardReadMore">
                    <span style="font-size:1.1em">Read More</span><span style="margin-inline-start:.25em;font-weight:bold;" class="ico-right"></span>
                </div>
            </div>
            <div class="card" card="3">
                <div class="cardImgContainer">
                    <img class="cardImgbr1 cardImg" src="/storage/imgs/underConstraction/cardimg3.jpg" alt="">
                </div>
                <div class="cardBody">
                    <div class="cardTitle">Manage Your Restaurant</div>
                    <div class="cardDescription">Manage all of your restaurant's orders and deliveries from one place, gain insight into your performance with our precise statistics and analytics, keep your finances in check with the monthly financial reports we generate for you, and much more.</div>
                </div>
                <div class="cardReadMore">
                    <span style="font-size:1.1em">Read More</span><span style="margin-inline-start:.25em;font-weight:bold;" class="ico-right"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="section" sectionNum="1" id="section1">
        <div class="sectionTitle">Food-menu Will Get Everything Ready For You</div>
        <div class="sectionBody">
            <div id="section1Text" class="sectionText">
                <div class="sectionTextP"><span class="ico-check" style="margin-inline-end:.5em;font-size:1.3em;"></span>Go from having no web presence to having a customizable website for your restaurant.</div>
                <div class="sectionTextP"><span class="ico-upload" style="margin-inline-end:.5em;font-size:1.3em;"></span>We will host your website on our servers, so you won’t need to sign up with a hosting company.</div>
                <div class="sectionTextP"><span class="ico-earth" style="margin-inline-end:.5em;font-size:1.3em;"></span>Get the domain name of your choice when you subscribe to our premium plan (example: RestaurantName.com). In our other plans, you'll get a subdomain using our domain's name (example: RestaurantName.food-menu.net).</div>
                <div class="sectionTextP"><span class="ico-security" style="margin-inline-end:.5em;font-size:1.3em;"></span>Your website is secured with us with an SSL certificate, which means that you and your users' data is end-to-end encrypted.</div>
                <div class="sectionTextP"><span class="ico-refresh" style="margin-inline-end:.5em;font-size:1.3em;"></span>System updates are performed on a regular basis to ensure that your experience is always improving. </div>
                <div class="sectionTextP"><span class="ico-support" style="margin-inline-end:.5em;font-size:1.3em;"></span>Our customer support team will assist you with any inquiry or concern through help tickets.</div>
                <div class="signupContainerContainer">
                    <div class="flexRow" style="flex-wrap:wrap;margin-top:.5em;">
                        <div style="text-align: center;color:#032620;font-size:1.1em;">We are working on launching our services very soon. Sign up now to book a free 30-day beta version once it's ready.</div>
                    </div>

                    <div class="signupContainer">
                        <input class="signupInput" type="text" placeholder="Your Email">
                        <div class="signupBtn">Sign up</div>
                    </div>
                    <img class="loading" src="{{ asset('storage/imgs/loading-dark.png') }}" alt="">
                    <div class="flexRow wrongEmail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>The email address you entered is incorrect.</span>
                    </div>
                    <div class="flexRow signupFail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>Unknown Error Occurred! Please try again.</span>
                    </div>
                    <div class="flexRow signupSuccess" style="color:var(--fm-green-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-check"></span>
                        <span>Thank you for signing up with us! We will get back to you as soon as possible once the beta version is ready.</span>
                    </div>
                </div>
            </div>
            <div class="imgContainer" id="img1Container">
                <img class="img" src="/storage/imgs/underConstraction/imgSec1.jpg" alt="">
                <div class="img1Filter" style="transform:rotateZ(25deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(20deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(15deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(10deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(5deg);"></div>
            </div>
        </div>

    </div>
    <div class="section" sectionNum="2" id="section2">
        <div class="sectionTitle" style="color:#12725f;">Your Restaurant Website Solution</div>
        <div class="sectionBody">
            <div id="section2Text" class="sectionText sectionText2">
                <div class="sectionTextP2"><span class="ico-basics" style="margin-inline-end:.5em;font-size:1.3em;"></span>Our user-friendly tools allow you to customize your website professionally.</div>
                <div class="sectionTextP2"><span class="ico-products" style="margin-inline-end:.5em;font-size:1.3em;"></span>Showcase your various products in your preferred design.</div>
                <div class="sectionTextP2"><span class="ico-cart" style="margin-inline-end:.5em;font-size:1.3em;"></span>Enable online ordering and set your own working hours.</div>
                <div class="sectionTextP2"><span class="ico-design" style="margin-inline-end:.5em;font-size:1.3em;"></span>Choose your website template and customize it with a few clicks.</div>
                <div class="sectionTextP2"><span class="ico-websiteTexts" style="margin-inline-end:.5em;font-size:1.3em;"></span>Launch your website multilingually from the supported languages or create your own.</div>
                <div class="sectionTextP2"><span class="ico-chat" style="margin-inline-end:.5em;font-size:1.3em;"></span>Live chat with your customers.</div>
                <div class="sectionTextP2"><span class="ico-accepted" style="margin-inline-end:.5em;font-size:1.3em;"></span>Any modifications you make to your restaurant’s information will reflect on your website right away.</div>
                <div class="signupContainerContainer">
                    <div class="flexRow" style="flex-wrap:wrap;margin-top:.5em;">
                        <div style="text-align: center;color:#032620;font-size:1.1em;">We are working on launching our services very soon. Sign up now to book a free 30-day beta version once it's ready.</div>
                    </div>

                    <div class="signupContainer">
                        <input class="signupInput" type="text" placeholder="Your Email">
                        <div class="signupBtn">Sign up</div>
                    </div>
                    <img class="loading" src="{{ asset('storage/imgs/loading-dark.png') }}" alt="">
                    <div class="flexRow wrongEmail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>The email address you entered is incorrect.</span>
                    </div>
                    <div class="flexRow signupFail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>Unknown Error Occurred! Please try again.</span>
                    </div>
                    <div class="flexRow signupSuccess" style="color:var(--fm-green-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-check"></span>
                        <span>Thank you for signing up with us! We will get back to you as soon as possible once the beta version is ready.</span>
                    </div>
                </div>
            </div>
            <div class="imgContainer" id="img2Container">
                <img class="img2" src="/storage/imgs/underConstraction/imgSec2.jpg" alt="">
                <div class="img1Filter2" style="transform:rotateZ(25deg);"></div>
                <div class="img1Filter2" style="transform:rotateZ(20deg);"></div>
                <div class="img1Filter2" style="transform:rotateZ(15deg);"></div>
                <div class="img1Filter2" style="transform:rotateZ(10deg);"></div>
                <div class="img1Filter2" style="transform:rotateZ(5deg);"></div>
            </div>
        </div>
    </div>
    <div class="section" sectionNum="3" id="section3">
        <div class="sectionTitle">Restaurant Management</div>
        <div class="sectionBody">
            <div id="section3Text" class="sectionText">
                <div class="sectionTextP"><span class="ico-accepted" style="margin-inline-end:.5em;font-size:1.3em;"></span>Manage your restaurant thoroughly with our all-in-one services.</div>
                <div class="sectionTextP"><span class="ico-statistics_and_analytics" style="margin-inline-end:.5em;font-size:1.3em;"></span>Make data-backed decisions through the statistics and analytics we generate for you based on your restaurant’s performance.</div>
                <div class="sectionTextP"><span class="ico-money" style="margin-inline-end:.5em;font-size:1.3em;"></span>Keep track of your financial health by reviewing the monthly financial reports we create based on your data.</div>
                <div class="sectionTextP"><span class="ico-sub_accounts" style="margin-inline-end:.5em;font-size:1.3em;"></span>Divide your team into sub-accounts, with assigning them different levels of authority based on their roles.</div>
                <div class="sectionTextP"><span class="ico-orders" style="margin-inline-end:.5em;font-size:1.3em;"></span>Manage all of your restaurant's orders and generate receipts for them.</div>
                <div class="sectionTextP"><span class="ico-delivery" style="margin-inline-end:.5em;font-size:1.3em;"></span>Create delivery accounts for your delivery personnel to ensure no mistakes in the delivery of your orders.</div>
                <div class="sectionTextP"><span class="ico-earth" style="margin-inline-end:.5em;font-size:1.3em;"></span>With only an internet connection, you can manage everything from any place in the world.</div>
                <div class="signupContainerContainer">
                    <div class="flexRow" style="flex-wrap:wrap;margin-top:.5em;">
                        <div style="text-align: center;color:#032620;font-size:1.1em;">We are working on launching our services very soon. Sign up now to book a free 30-day beta version once it's ready.</div>
                    </div>

                    <div class="signupContainer">
                        <input class="signupInput" type="text" placeholder="Your Email">
                        <div class="signupBtn">Sign up</div>
                    </div>
                    <img class="loading" src="{{ asset('storage/imgs/loading-dark.png') }}" alt="">
                    <div class="flexRow wrongEmail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>The email address you entered is incorrect.</span>
                    </div>
                    <div class="flexRow signupFail" style="color:var(--fm-red-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-close"></span>
                        <span>Unknown Error Occurred! Please try again.</span>
                    </div>
                    <div class="flexRow signupSuccess" style="color:var(--fm-green-1);margin:1em;display:none;">
                        <span style="margin-inline-end:.3em;font-size: 1.2em;" class="ico-check"></span>
                        <span>Thank you for signing up with us! We will get back to you as soon as possible once the beta version is ready.</span>
                    </div>
                </div>
            </div>
            <div class="imgContainer" id="img3Container">
                <img class="img" src="/storage/imgs/underConstraction/imgSec3.jpg" alt="">
                <div class="img1Filter" style="transform:rotateZ(25deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(20deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(15deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(10deg);"></div>
                <div class="img1Filter" style="transform:rotateZ(5deg);"></div>
            </div>
        </div>
    </div>
</body>
</html>
