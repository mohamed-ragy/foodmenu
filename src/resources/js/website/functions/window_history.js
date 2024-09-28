window.window_history = {
    user_status:function(){
        let user_status_obj = null;
        if('popup' in window.history.state){
            switch(window.history.state.popup){
                default:
                    user_status_obj = {'status':`user_browse_${window.history.state.popup}`}
                break;
            }
        }else{
            switch(window.history.state.page){
                case 'account':
                    user_status_obj = {'status':`user_browse_${window.history.state.account_page}`}
                break;
                default:
                    user_status_obj = {'status':`user_browse_${window.history.state.page}`}
                break;
            }
        }
        user_status(user_status_obj)
    },
    push:function(data){
        let new_state = {}
        for (const key in data) {
            new_state[key] = data[key];
        }
        window.history.pushState(new_state, '', window.window_history.get_url(new_state));
        window.window_history.user_status()
    },
    replace:function(data){
        let new_state = {}
        if(window.history.state !== null){
            for(const key in window.history.state){
                let state = window.history.state[key];
                new_state[key] = state;
            }
        }
    
        for(const key in data){
            new_state[key] = data[key];
        }
        window.history.replaceState(new_state,'',window.window_history.get_url(new_state))
        window.window_history.user_status()
    },
    delete:function(delete_keys){
        if(!Array.isArray(delete_keys)){
            delete_keys = [delete_keys];
        }
        let new_state = {}
        if(window.history.state !== null){
            for(const key in window.history.state){
                let state = window.history.state[key];
                if(!delete_keys.includes(key)){
                    new_state[key] = state;
                }
            }
        }
        window.history.replaceState(new_state,'',window.window_history.get_url(new_state))
    },
    get_url:function(data = window.history.state){
        let url = `/${window.lang}/`
        if(data.page == 'product'){
            //i will make it later
        }else if(data.page == 'category'){
            //i will make it later
        }else if(data.page == 'account'){
            url = `${url}${data.page}/${data.account_page}`;
        }else{
            url = `${url}${data.page}`;
        };

        url = `${url}?`;

        for(const key in data){
            if(!['page','account_page'].includes(key)){
                url = `${url}${key}=${data[key]}&`
            }
        }

        url = url.slice(0, -1);

        return url;
    }
}