require('./manageProducts/delete.js') //done
require('./manageProducts/productAvailabilty.js') //done
require('./manageProducts/sort.js') //done
require('./manageProducts/edit.js') //done
require('./manageProducts/editOptions.js') //done


$('html,body').on('click','#manageProducts-selectCategoryList .inputListElement',function(){
    drawManageProductCards($(this).attr('key'));
    window.page.category = $(this).attr('key');
    pushHistory(false);
})

