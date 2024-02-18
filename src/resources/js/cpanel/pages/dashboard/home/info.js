drawInfoSection = function(){

    if(website.categories.length == 0){
        $('#home_infoSection').append(
            $('<div/>',{class:'msgBox_red mxw250'}).append(
                $('<div/>',{class:'ico-warning fs205 mB20'}),
                $('<div/>',{class:'',html:`You haven't created any category yet. <a>Create new category.</a>`})
            )
        )
    }

}
