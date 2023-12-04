pushHistory = function (push=true){
    let historyState = {};
    let historyUrl = '';
    for(const key in window.page){
        historyState[key] = window.page[key];
        if(historyUrl == ''){
            historyUrl = `/?${key}=${window.page[key]}`
        }else{
            historyUrl = `${historyUrl}&${key}=${window.page[key]}`
        }
    }
    for(const key in window.popupPage){
        historyState[key] = window.popupPage[key];
        historyUrl = `${historyUrl}&${key}=${window.popupPage[key]}`
    }
    for(const key in window.previewImg){
        historyState[key] = window.previewImg[key];
        historyUrl = `${historyUrl}&${key}=${window.previewImg[key]}`
    }
    if(push){
        window.history.pushState(historyState,'',historyUrl)
    }else{
        window.history.replaceState(historyState,'',historyUrl)
    }
}
