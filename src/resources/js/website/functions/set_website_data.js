set_website_data = function(){
    $('.website_logo').attr('src',window.website.logo);
    $('.restaurant_name').text(window.website.websiteNames[window.lang]);
    $('.page_title').text(window.title);
    $('.page_description').text(window.description);
}