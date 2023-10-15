<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Hello, this is my portfolio">
    <link rel="icon" type="image/x-icon" href="/storage/imgs/ragy/ragy.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/ragy/ragy.css">
    <script src="/js/ragy/ragy.js"></script>
    <title>Mohamed Ragy</title>
</head>
<body>
    <div id="soundControl" class="icon-unmute"></div>
    <span class="icon-1 bgIcon"></span>
    <span class="icon-2 bgIcon"></span>
    <span class="icon-3 bgIcon"></span>
    <span class="icon-4 bgIcon"></span>
    <span class="icon-5 bgIcon"></span>
    <span class="icon-6 bgIcon"></span>
    <span class="icon-7 bgIcon"></span>
    <span class="icon-8 bgIcon"></span>
    <span class="icon-9 bgIcon"></span>
    <span class="icon-10 bgIcon"></span>
    <span class="icon-11 bgIcon"></span>
    <span class="icon-12 bgIcon"></span>
    <span class="icon-13 bgIcon"></span>
    <span class="icon-14 bgIcon"></span>
    <span class="icon-15 bgIcon"></span>
    <span class="icon-16 bgIcon"></span>

    <div id="welcomeContainer">
        <img class="ragyImg" style="margin-top:1em;" src="/storage/imgs/ragy/ragy.ico" alt="">
        <div id="welcome">
            <span class="textCursor">|</span>
        </div>
        {{-- <div style="margin-top:auto;margin-left:.5em;color:white;">Skip</div> --}}
    </div>
    {{-- <div id="firstNote" style="background-color: #ffffff;border-radius: .25em;padding: 1em;max-width:20em;"> --}}
        {{-- I built this portfolio up from scratch without using any coding tools or templates. I had a little help from my cousin Khalid with the English though. --}}
    {{-- </div> --}}
    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
        <button class="btn" style="font-size:2em;z-index:50;" id="FirstBtn">Click Me!</button>
    </div>


    <div id="container">
        <div id="head">
            <img class="ragyImg" style="border: 0.2em solid #023e7d;" src="/storage/imgs/ragy/ragy.ico" alt="">
            <div class="moRagy">Mohamed Ragy</div>
            <div id="headBtnsContainer">
                <button btnAction="info" class="headBtn"><span style="font-size:1.2em;margin:.25em;" class="hide721 icon-person"></span><span class="hide720">Personal Informations</span></button>
                <button btnAction="skills" class="headBtn"><span style="font-size:1.2em;margin:.25em;" class="hide721 icon-skills"></span><span class="hide720">My Skills</span></button>
                <button btnAction="imgs" class="headBtn"><span style="font-size:1.2em;margin:.25em;" class="hide721 icon-imgs"></span><span class="hide720">My Pictures</span></button>
                <button btnAction="bio" style="opacity:1" class="headBtn"><span style="font-size:1.2em;margin:.25em;" class="hide721 icon-bio"></span><span class="hide720">Biography</span></button>
            </div>
        </div>
        <div class="content" id="bio">
                {{-- <div style="font-weight:bold;margin-bottom:1em;font-size:1.2em;">Biography</div> --}}
                <div style="margin:.5em;">I am a Full Stack web developer. My first exposure to coding started when I was 16 years old.  I started by reading tutorials about web development. My first coding project was an online marketplace website. It was a simple project, but it allowed me to build up my coding foundation.</div>
                <div style="margin:.5em;">After turning 20, I turned my focus to tennis. I participated in local and international tennis championships. I also opened my tennis academy in Sharm El-Shiekh. I launched a website for the tennis academy which was a simulation for the Tennis Federation website.</div>
                <div style="margin:.5em;">The website had a lot of features that enabled the players to interact with it which helped the academy to grow.</div>
                <div style="margin:.5em;">At the beginning of the Coronavirus pandemic the business was terribly affected and therefore I decided to go back to web development again.</div>
                <div style="margin:.5em;">I took a few web development courses in order to recall my previous skills, and acquire more knowledge to keep updated with current web development advancements.</div>
                <div style="margin:.5em;">Finally, I started my latest and largest project around April 2021, and I am still in the process of developing it.</div>
                <div style="margin:.5em;">The project is planned to be launched competitively in the market during the first quarter of the next year.</div>
        </div>
        <div class="content" id="info">
                {{-- <div style="font-weight:bold;margin-bottom:1em;font-size:1.2em;">Personal Informations</div> --}}
                <div class="infoElement">Date of birth: 26/11/1988</div>
                <div class="infoElement">Address: Egypt, South Sinai, Sharm El-Sheikh</div>
                <div class="infoElement">Mobile: +201283541823</div>
                <div class="infoElement">Email: muha.ragy@gmail.com</div>
                <div class="infoElement">Marital status: Married</div>
        </div>
        <div class="content" id="skills">
            {{-- <div style="font-weight:bold;margin-bottom:1em;font-size:1.2em;">My Skills</div> --}}
            <div class="skillsContainer">
                <div class="skillContainer">
                    <div class="skillName">HTML</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #e24f24a9,#e24f24, #e24f24a9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">CSS3</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #1471b6a9,#1471b6, #1471b6a9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">SASS</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:65%;background-image: repeating-linear-gradient(0deg, #c26191a9,#c26191, #c26191a9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">Java Script</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #f0cf3ba9,#f0cf3b, #f0cf3ba9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">Jquery</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #1064a5a9,#1064a5, #1064a5a9);"></div>
                    </div>
                </div>
            </div>
            <div class="skillsContainer">
                <div class="skillContainer">
                    <div class="skillName">php</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #4b568ca9,#4b568c, #4b568ca9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">Laravel</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #e3382ba9,#e3382b, #e3382ba9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">Mysql</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:95%;background-image: repeating-linear-gradient(0deg, #005c83a9,#005c83, #005c83a9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">MongoDB</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:65%;background-image: repeating-linear-gradient(0deg, #118b4ba9,#118b4b, #118b4ba9);"></div>
                    </div>
                </div>
                <div class="skillContainer">
                    <div class="skillName">Ubuntu Server</div>
                    <div class="skillBarBg">
                        <div class="skillBar" style="width:25%;background-image: repeating-linear-gradient(0deg, #e86631a9,#e86631, #e86631a9);"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="content" id="imgs">
            <div class="imgsImgContainer">
                <img src="/storage/ragy/1.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/2.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/3.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/4.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/5.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/6.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/7.jpg" class="imgsImg" alt="">
            </div>
            <div class="imgsImgContainer">
                <img src="/storage/ragy/8.jpg" class="imgsImg" alt="">
            </div>
        </div>
    </div>

    <audio  id="clicks"><source src="{{ asset('storage/clicks.mp3') }}" type="audio/mpeg" /></audio>
    <audio loop id="song"><source src="{{ asset('storage/song.mp3') }}" type="audio/mpeg" /></audio>
    <img src="" id="imgMax" alt="">
    <div id="imgMaxCover"></div>
</body>
</html>
