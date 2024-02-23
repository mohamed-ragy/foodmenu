////////////qrcode
drawWebsiteQRCode = function(){
    var qrcode = new QRCode(document.getElementById("website_QRcode"), {
        text: `${process.env.MIX_APP_URL_HTTP}${website.url}`,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

}

drawDownloadQrcode = function(){
    var qrcode2 = new QRCode(document.getElementById("website_QRcodeDownload"), {
        text: `${process.env.MIX_APP_URL_HTTP}${website.url}`,
        width: 800,
        height: 800,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    })


}
