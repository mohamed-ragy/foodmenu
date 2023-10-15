$('html,body').on('click','.lang',(e) => {
    e.stopImmediatePropagation();
    userStatus({'status':'user_changeLang'})
    showPopup($('#language-popup'))
})
// website.languages.forEach(element => {
//     if(element == lang && element != 'eg'){website.LanguageFlag = `/storage/imgs/flags/${website.availableLangs[element].flag}.png`}
//     if(element == lang && element == 'eg'){website.LanguageFlag = `/storage/imgs/flags/${website.customLang_flag}.png`}

//     if(element == lang && element != 'eg'){website.LanguageName = website.availableLangs[element].name}
//     if(element == lang && element == 'eg'){website.LanguageName = website.customLang_name}
// });
// $(document).ready(()=>{
    // website.languages.forEach(element => {
        // if(element == website.defaultLanguage && element != 'eg'){website.defaultLanguageFlag = `/storage/imgs/flags/${website.availableLangs[element].flag}.png`}
        // if(element == website.defaultLanguage && element == 'eg'){website.defaultLanguageFlag = `/storage/imgs/flags/${website.customLang_flag}.png`}
        // let code;let flag;let name;
        // element == 'eg' ? code = website.customLang_code : code = element;
        // element == 'eg' ? flag = website.customLang_flag : flag = website.availableLangs[element].flag;
        // element == 'eg' ? name = website.customLang_name : name = website.availableLangs[element].name;
        // drawLangElem(code,name,flag)
    // });
// })
