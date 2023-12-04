
let lastActivity = null;
drawActivityLog = function(activity,live=false,append){
    let activityLogIcon = '';
    let activityLogTxt = '';
    let activityContainerClass = 'none';

    switch (activity.code ) {
        case 0:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>${texts.activityLogs.activity0_1}</span>`;
            activityContainerClass = 'activityContainer_green'
        break;
        case 1:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>${texts.activityLogs.activity1_1}</span>`;
            activityContainerClass = ''
        break;
        case 2:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span class="mie-3">${texts.activityLogs.activity2_1} ${texts.activityLogs.from}</span><span class="mie-3 c-placeholder2">${activity.oldEmail}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="c-placeholder2">${activity.newEmail}</span><span>.</span>`;
            activityContainerClass = 'activityContainer_orange'
        break;
        case 3:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>${texts.activityLogs.activity3_1}</span>`;
            activityContainerClass = ''
        break;
        case 4:

        break;
        case 5:

        break;
        case 6:
            activityLogIcon = 'ico-orders';
            if(activity.user_id == null){
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity6_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity6_2} ${texts.activityLogs.by} ${texts.activityLogs.activity_guest2}.</span>`;
            }else{
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity6_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity6_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>.</span>`;
            }
            activityContainerClass = 'activityContainer_red'
        break;
        case 7:
            activityLogIcon = 'ico-product_reviews';
            if(activity.user_id == null){
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity7_1}</span><a class="popupPage mie-3" popupPage="Review" reviewId="${activity.product_review_id}">${texts.activityLogs.activity7_2}</a><span class="mie-3">${texts.activityLogs.activity7_3}</span><a class="popupPage mie-3" popupPage="Product" product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.by} ${texts.activityLogs.activity_guest2}.</span>`;
            }else{
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity7_1}</span><a class="popupPage mie-3" popupPage="Review" reviewId="${activity.product_review_id}">${texts.activityLogs.activity7_2}</a><span class="mie-3">${texts.activityLogs.activity7_3}</span><a class="popupPage mie-3" popupPage="Product" product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>.</span>`;
            }
            activityContainerClass = 'activityContainer_green'
        break;
        case 8:
            activityLogIcon = 'ico-orders';
            if(activity.user_id == null){
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity8_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity8_2} ${texts.activityLogs.by} ${texts.activityLogs.activity_guest2}.</span>`;
            }else{
                activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity8_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity8_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>.</span>`;
            }
            activityContainerClass = 'activityContainer_green'
        break;
        case 9:
            activityLogIcon = 'ico-categories';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Edit-Category" category="${activity.category_name}">${activity.category_name}</a><span class="mie-3">${texts.activityLogs.activity9_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 10:
            activityLogIcon = 'ico-categories';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Edit-Category" category="${activity.category_name}">${activity.category_name}</a><span class="mie-3">${texts.activityLogs.activity10_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 11:
            activityLogIcon = 'ico-categories';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Edit-Category" category="${activity.category_name}">${activity.category_name}</a><span class="mie-3">${texts.activityLogs.activity11_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 12:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity12_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 13:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity13_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 14:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity14_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 15:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity15_1}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity15_2}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 15.1:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1501_1}</span><span class="mie-3 c-placeholder2">${activity.option_name}</span><span class="mie-3">${texts.activityLogs.activity1501_2}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1501_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 15.2:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1502_1}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity1502_2}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1502_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 15.3:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1503_1}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" selectionId="${activity.selection_id}" action="editselection">${activity.selection_name}</a><span class="mie-3">${texts.activityLogs.activity1503_2}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity1503_3}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1503_4}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 15.4:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1504_1}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" selectionId="${activity.selection_id}" action="editselection">${activity.selection_name}</a><span class="mie-3">${texts.activityLogs.activity1504_2}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity1504_3}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1504_4}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 15.5:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1505_1}</span><span class="mie-3 c-placeholder2">${activity.selection_name}</span><span class="mie-3">${texts.activityLogs.activity1505_2}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity1505_3}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1505_4}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 15.6:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity1506_1}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" selectionId="${activity.selection_id}" action="editselection">${activity.selection_name}</a><span class="mie-3">${texts.activityLogs.activity1506_2}</span><a class="popupPage mie-3" popupPage="Product-Options" product="${activity.product_name}" productId="${activity.product_id}" optionId="${activity.option_id}" action="editOption">${activity.option_name}</a><span class="mie-3">${texts.activityLogs.activity1506_3}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity1506_4}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 16:
            activityLogIcon = 'ico-product_reviews';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity16_1}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity16_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 17:
            activityLogIcon = 'ico-delivery';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity17_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity17_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Edit-Delivery-Account" deliveryaccount="${activity.delivery_name}">${activity.delivery_name.split('@')[0]}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 18:
            activityLogIcon = 'ico-delivery_accounts';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity18_1}</span><a class="popupPage mie-3" popupPage="Edit-Delivery-Account" deliveryaccount="${activity.delivery_name}">${activity.delivery_name}</a><span class="mie-3">${texts.activityLogs.activity18_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 19:
            activityLogIcon = 'ico-delivery_accounts';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity19_1}</span><span class="mie-3">${activity.delivery_name}</span><span class="mie-3">${texts.activityLogs.activity19_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 20:
            activityLogIcon = 'ico-delivery_accounts';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity20_1}</span><a class="popupPage mie-3" popupPage="Edit-Delivery-Account" deliveryaccount="${activity.delivery_name}">${activity.delivery_name}</a><span class="mie-3">${texts.activityLogs.activity20_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 21:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span class="mie-3">${texts.activityLogs.activity21_1}</span><a class="popupPage" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 22:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span class="mie-3">${texts.activityLogs.activity22_1} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 23:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity23_1}</span><a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span class="mie-3">${texts.activityLogs.activity23_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 24:
            activityLogIcon = 'ico-user';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity24_1}</span><a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span class="mie-3">${texts.activityLogs.activity24_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 25:
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity25_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity25_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 25.5:
            activityLogIcon = 'ico-dineIn';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity2505_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity2505_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 25.6:
            activityLogIcon = 'ico-dineIn';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity2506_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity2506_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 26:
            activityLogIcon = 'ico-accepted';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity26_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity26_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 27:
            activityLogIcon = 'ico-pickup';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity27_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity27_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 28:
            activityLogIcon = 'ico-delivery';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity28_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity28_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 29:
            activityLogIcon = 'ico-pickup';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity29_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity29_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 30:
            activityLogIcon = 'ico-delivery';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity30_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity30_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 31:
            activityLogIcon = 'ico-delivery_accounts';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity31_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity31_2}</span><a class="popupPage mie-3" popupPage="Edit-Delivery-Account" deliveryaccount="${activity.delivery_name}">${activity.delivery_name.split('@')[0]}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 32:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity32_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 33:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity33_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 33.5:
            activityLogIcon = 'ico-delivery';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3305_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity3305_2}</span><span class="mie-3 c-placeholder2">${website.currency+activity.oldDeliveryCost}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="mie-3 c-placeholder2">${website.currency+activity.deliveryCost}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 33.6:
            activityLogIcon = 'ico-percent';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3306_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity3306_2}</span><span class="mie-3">${activity.oldDiscount+'%'}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="mie-3">${activity.discount+'%'}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 34:
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity34_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity34_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 35:
            let activitytext = `${texts.activityLogs.activity35_2} <a class="mie-3 cpPage" cpPage="product_reviews" userId="${activity.user_id}" userName="${activity.user_name}">${texts.activityLogs.activity35_1}</a>${texts.activityLogs.activity35_4}`;
            if(activity.reviewsSum > 1){activitytext = `${texts.activityLogs.activity35_2} <a class="mie-3 cpPage" cpPage="product_reviews" userId="${activity.user_id}" userName="${activity.user_name}">${activity.reviewsSum} ${texts.activityLogs.activity35_3}</a>${texts.activityLogs.activity35_4}`;}
            activityLogIcon = 'ico-product_reviews';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="User" userId="${activity.user_id}">${activity.user_name}</a><span>${activitytext}</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 36:
            let oldType; let newType;
            activity.oldType == 0 ? oldType = texts.orders.delivery : activity.oldType == 1 ? oldType = texts.orders.pickup : activity.oldType == 2 ? oldType = texts.orders.dineIn : null ;
            activity.newType == 0 ? newType = texts.orders.delivery : activity.newType == 1 ? newType = texts.orders.pickup : activity.newType == 2 ? newType = texts.orders.dineIn : null ;
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity36_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity36_2} ${texts.activityLogs.from}</span><span class="mie-3 c-placeholder2">${oldType}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="mie-3 c-placeholder2">${newType}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.1:
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3601_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity3601_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.2:
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3602_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity3602_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.3:
            activityLogIcon = 'ico-orders';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3603_1}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.activity3603_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.4:
            activityLogIcon = 'ico-products';
            let itemsTxt = texts.activityLogs.activity3604_3;
            activity.qty > 1 ? itemsTxt = texts.activityLogs.activity3604_4 : null;
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3604_1}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity3604_2}</span><span class="mie-3 c-placeholder2">${activity.qty}</span><span class="mie-3 c-placeholder2">${itemsTxt}</span><span class="mie-3">${texts.activityLogs.activity3604_5}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.5:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3 c-placeholder2">${activity.option_name}</span><span class="mie-3">${texts.activityLogs.activity3605_1} ${texts.activityLogs.from}</span><span class="mie-3 c-placeholder2">${activity.old_selection_name}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="mie-3 c-placeholder2">${activity.selection_name}</span><span class="mie-3">${texts.activityLogs.activity3605_2}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 36.6:
            activityLogIcon = 'ico-products';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity3606_1}</span><a class="popupPage mie-3" popupPage="Product" Product="${activity.product_name}">${activity.product_name}</a><span class="mie-3">${texts.activityLogs.activity3606_2}</span><a class="popupPage mie-3" popupPage="Order" orderId="${activity.order_id}">#${activity.order_id}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 37:
            activityLogIcon = 'ico-website_colors';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity37_1}</span><a class="mie-3 cpPage" cpPage="website_colors">${texts.activityLogs.activity37_2}</a><span class="mie-3">${texts.activityLogs.activity37_3} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 38:
            activityLogIcon = 'ico-email_address';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity38_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-restaurantEmailWindow" selectElem="settings-restaurantEmail">${texts.activityLogs.activity38_2}</a><span class="mie-3">${texts.activityLogs.activity38_3}</span><span class="mie-3">${texts.activityLogs.to}</span><span class="mie-3 c-placeholder2">${activity.newEmail}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 39:
            activityLogIcon = 'ico-templates';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity39_1}</span><a class="mie-3 cpPage" cpPage="templates">${texts.activityLogs.activity39_2}</a><span class="mie-3">${texts.activityLogs.activity39_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 40:
            activityLogIcon = 'ico-promo_codes';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity40_1}</span><a class="popupPage mie-3" popupPage="Edit-Promocode" promocodeid="${activity.promocode_id}" promocodename="${activity.promocode_name}">${activity.promocode_name}</a><span class="mie-3">${texts.activityLogs.activity40_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 40.1:
            activityLogIcon = 'ico-promo_codes';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity4001_1}</span><a class="popupPage mie-3" popupPage="Edit-Promocode" promocodeid="${activity.promocode_id}" promocodename="${activity.promocode_name}">${activity.promocode_name}</a><span class="mie-3">${texts.activityLogs.activity4001_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = '';
        break;
        case 41:
            activityLogIcon = 'ico-promo_codes';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity41_1}</span><a class="popupPage mie-3" popupPage="Edit-Promocode" promocodeid="${activity.promocode_id}" promocodename="${activity.promocode_name}">${activity.promocode_name}</a><span class="mie-3">${texts.activityLogs.activity41_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 42:
            activityLogIcon = 'ico-image';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity42_1}</span><a class="previewImg mie-3" img="${activity.img_id}">${activity.img_name}</a><span class="mie-3">${texts.activityLogs.activity42_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 43:

        break;
        case 44:
            activityLogIcon = 'ico-image';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity44_1}</span><a class="previewImg mie-3" img="${activity.img_id}">${activity.img_name}</a><span class="mie-3">${texts.activityLogs.activity44_2} ${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 45:
            activityLogIcon = 'ico-languages';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity45_1}</span><a class="mie-3 cpPage" cpPage="languages">${texts.activityLogs.activity45_2}</a><span class="mie-3">${texts.activityLogs.activity45_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 46:
            activityLogIcon = 'ico-languages';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity46_1}</span><a class="mie-3 cpPage" cpPage="languages" scrollToElem="settings-language-langTextsWindow">${texts.activityLogs.activity46_2}</a><span class="mie-3">${texts.activityLogs.activity46_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 47:
            activityLogIcon = 'ico-power';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity47_1}</span><a class="mie-3 cpPage" cpPage="system">${texts.activityLogs.activity47_2}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 48:
            activityLogIcon = 'ico-power';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity48_1}</span><a class="mie-3 cpPage" cpPage="system">${texts.activityLogs.activity48_2}</a><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_red';
        break;
        case 49:
            activityLogIcon = 'ico-clock';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity49_1}</span><a class="mie-3 cpPage" cpPage="system" scrollToElem="system-timeZoneWindow">${texts.activityLogs.activity49_2}</a><span class="mie-3">${texts.activityLogs.activity49_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 50:
            activityLogIcon = 'ico-edit';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity50_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-websiteNameWindow">${texts.activityLogs.activity50_2}</a><span class="mie-3">${texts.activityLogs.activity50_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 51:
            activityLogIcon = 'ico-description';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity51_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-websiteDescriptionWindow">${texts.activityLogs.activity51_2}</a><span class="mie-3">${texts.activityLogs.activity51_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 52:
            activityLogIcon = 'ico-announcement';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity52_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-announcementWindow">${texts.activityLogs.activity52_2}</a><span class="mie-3">${texts.activityLogs.activity52_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_green';
        break;
        case 53:
            activityLogIcon = 'ico-link';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity53_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-socialMediaLinksWindow">${texts.activityLogs.activity53_2}</a><span class="mie-3">${texts.activityLogs.activity53_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 54:
            activityLogIcon = 'ico-money';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity54_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-currencySymbolWindow">${texts.activityLogs.activity54_2}</a><span class="mie-3">${texts.activityLogs.activity54_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 55:
            activityLogIcon = 'ico-flag';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity55_1}</span><a class="mie-3 cpPage" cpPage="system" scrollToElem="system-countryWindow">${texts.activityLogs.activity55_2}</a><span class="mie-3">${texts.activityLogs.activity55_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 56:
            activityLogIcon = 'ico-image';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity56_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-logoAndIcon">${texts.activityLogs.activity56_2}</a><span class="mie-3">${texts.activityLogs.activity56_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 57:
            activityLogIcon = 'ico-image';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity57_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-logoAndIcon">${texts.activityLogs.activity57_2}</a><span class="mie-3">${texts.activityLogs.activity57_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 58:
            activityLogIcon = 'ico-phone_number';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity58_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-phoneNumberWindow">${texts.activityLogs.activity58_2}</a><span class="mie-3">${texts.activityLogs.activity58_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 59:
            activityLogIcon = 'ico-location';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity59_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-websiteAdressesWindow">${texts.activityLogs.activity59_2}</a><span class="mie-3">${texts.activityLogs.activity59_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 60:
            activityLogIcon = 'ico-system';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity60_1}</span><a class="mie-3 cpPage" cpPage="system" scrollToElem="settings-system-systemSettings">${texts.activityLogs.activity60_2}</a><span class="mie-3">${texts.activityLogs.activity60_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 61:
            activityLogIcon = 'ico-delivery';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity61_1}</span><a class="mie-3 cpPage" cpPage="home_delivery_settings">${texts.activityLogs.activity61_2}</a><span class="mie-3">${texts.activityLogs.activity61_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 62:
            activityLogIcon = 'ico-pickup';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity62_1}</span><a class="mie-3 cpPage" cpPage="order_pickup_settings">${texts.activityLogs.activity62_2}</a><span class="mie-3">${texts.activityLogs.activity62_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 63:
            activityLogIcon = 'ico-gps';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity63_1}</span><a class="mie-3 popupPage" popupPage="Restaurant-Location">${texts.activityLogs.activity63_2}</a><span class="mie-3">${texts.activityLogs.activity63_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 64:
            let sectionPopupPage;
            activity.component_name == 'intro' ? sectionPopupPage = 'Website-Intro' : activity.component_name == 'info' ? sectionPopupPage =  'Website-Info' : activity.component_name == 'slideShow' ? sectionPopupPage =  'Website-SlideShow' : activity.component_name == 'ourStory' ? sectionPopupPage =  'Website-OurStory' : activity.component_name == 'gallery' ? sectionPopupPage =  'Website-Gallery' : null;
            activityLogIcon = 'ico-home_page_sections';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity64_1}</span><a class="mie-3 popupPage" popupPage="${sectionPopupPage}">${texts.homePageSections[activity.component_name]}</a><span class="mie-3">${texts.activityLogs.activity64_2}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 65:
            activityLogIcon = 'ico-dineIn';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity65_1}</span><a class="mie-3 cpPage" cpPage="dine_in_settings">${texts.activityLogs.activity65_2}</a><span class="mie-3">${texts.activityLogs.activity65_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;
        case 66:
            activityLogIcon = 'ico-description';
            activityLogTxt = `<span class="mie-3">${texts.activityLogs.activity66_1}</span><a class="mie-3 cpPage" cpPage="restaurant_information" scrollToElem="settings-generalSettings-receiptMsgWindow">${texts.activityLogs.activity66_2}</a><span class="mie-3">${texts.activityLogs.activity66_3}</span><span class="mie-3">${texts.activityLogs.by}</span><a class="popupPage" popupPage="Sub-Account" accountid="${activity.account_id}">${activity.account_name}</a><span>.</span>`;
            activityContainerClass = 'activityContainer_orange';
        break;

        default:

        break;
    }
    //////////////
    let diffTimeCalcClass = '';
    if(live == true){
        livePrefex = '-live';
        livestyle = 'height:0;opacity:0';
        activityTime = diffTime(activity.created_at);
        $('#activityLog-noActivities-live').hide();
        diffTimeCalcClass =  'diffTimeCalc';
    }else if(live == false){
        livePrefex = '';
        livestyle = '';
        activityTime = getDateAndTime(activity.created_at,'onlyTime');
        $('#activityLog-noActivities').addClass('none');
    }
    /////////

    if(!live){
        let appendTo;
        let activityGroupSeemore = ''
        if(lastActivity != null){
            if(parseFloat(lastActivity.code) == parseFloat(activity.code)
                && lastActivity.order_id == activity.order_id
            ){
                appendTo = $('#activityLog-activityLogContainer').children().last();
                let moreActivitesNum = ($('#activityLog-activityLogContainer').children().last().children().length - 1);
                moreActivitesNum == 1 ? activityGroupSeemore = `<div class="activityGroupSeemore"><span>${moreActivitesNum} ${texts.activityLogs.moreSimilarActivity}</span> <span class="ico-down fs08 mis-2"></span></div>` : moreActivitesNum > 1 ? activityGroupSeemore = `<div class="activityGroupSeemore"><span>${moreActivitesNum} ${texts.activityLogs.moreSimilarActivitys}</span> <span class="ico-down fs08 mis-2"></span></div>` : null;
                // activityGroupSeemore =  + ' more similar activities.';
            }else{
                $('#activityLog-activityLogContainer').append(
                    appendTo = $('<div/>',{class:'activityGroupContainer',code:parseFloat(activity.code)})
                )
            }
        }else{
            $('#activityLog-activityLogContainer').append(
                appendTo = $('<div/>',{class:'activityGroupContainer',code:parseFloat(activity.code)})
            )
        }
        appendTo.find('.activityGroupSeemore').text('').append(activityGroupSeemore)
        appendTo.append(
                $('<div/>',{
                    class:'activityContainer '+activityContainerClass,
                    created_at:activity.created_at,
                    activityId:activity._id,
                }).append(
                    $('<div/>',{
                        class:activityLogIcon+' fs2 m10',
                    }),
                    $('<div/>',{
                        class:'grow2 fs101 mY5 mie-10'
                    }).append(
                        $('<div/>',{class:'row wrap',html:activityLogTxt}),
                    ),
                    $('<div/>',{class:'column alnE jstfySB alnsSH'}).append(
                        $('<div/>',{class:'ico-close p5 br3 pointer deleteActivityLog',tooltip:texts.cpanel.public.delete}),
                        $('<div/>',{
                            text:getDateAndTime(activity.created_at,'onlyTime'),
                            class:'tnw fs09 taE m5',
                        }),
                    )

                )
        )
        if(appendTo.children().length == 1){
            appendTo.append(
                $('<div/>',{class:'activityGroupSeemore'})
            )
        }
        $('#activityLog-activityLogContainer').children().last().height($('#activityLog-activityLogContainer').children().last().children().first().outerHeight(true) + appendTo.find('.activityGroupSeemore').outerHeight(true))
        lastActivity = activity;
    }else{
        if(append == 'append'){
            $('#home-liveActivity').append(
                $('<div/>',{
                    class:'activityContainer_live alnS '+activityContainerClass,
                }).append(
                    $('<div/>',{
                        class:activityLogIcon+' fs2 m5',
                    }),
                    $('<div/>',{class:'grow2 fs101 mY5 column alnS jstfyS'}).append(
                        $('<div/>',{class:'row wrap',html:activityLogTxt}),
                        $('<div/>',{
                            text:getDateAndTime(activity.created_at,'short'),
                            class:'tnw fs08 taE mX5 mT10 alnsE',
                        }),
                    )
                )
            )
        }else if(append == 'prepend'){
            $('#home-liveActivity').prepend(
                $('<div/>',{
                    class:'activityContainer_live alnS '+activityContainerClass,
                }).append(
                    $('<div/>',{
                        class:activityLogIcon+' fs2 m5',
                    }),
                    $('<div/>',{class:'grow2 fs101 mY5 column alnS jstfyS'}).append(
                        $('<div/>',{class:'row wrap',html:activityLogTxt}),
                        $('<div/>',{
                            text:getDateAndTime(activity.created_at,'short'),
                            class:'tnw fs08 taE mX5 mT10 alnsE',
                        }),
                    )
                )
            )
        }


        if($('#home-liveActivity').children().length == 6) {
            $('#home-liveActivity').children().last().addClass('liveActivityAnimation_exit');
            setTimeout(()=>{$('#home-liveActivity').children().last().text('').remove();},500)
        }
    }

}

if(lastActivites.length == 0){
    $('#activityLog-noActivities-live').show();
}
for(const key in lastActivites){
    drawActivityLog(lastActivites[key],true,'append')
}

///////////////////activity logs events/////////////////////////
$('html,body').on('click','.deleteActivityLog',function(e){
    e.stopImmediatePropagation();
    let activityId = $(this).closest('.activityContainer').attr('activityId');
    let activityHtml = $(this).closest('.activityContainer');
    activityHtml.closest('.activityGroupContainer').find('.activityGroupSeemore').trigger('click');
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',text:texts.activityLogs.deleteActivityLogConfirmTxt}),
            $('<div>/',{html:activityHtml.html(),class:activityHtml.attr('class')}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteActivityLog-confirmBtn',activityId:activityId,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    showPopup($('#delete-popup'))
})
$('html,body').on('click','#deleteActivityLog-confirmBtn',function(){
    showBtnLoading($('#deleteActivityLog-confirmBtn'))
    let activityId = $(this).attr('activityId');
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteActivityLog:activityId,
        },success:function(r){
            hideBtnLoading($('#deleteActivityLog-confirmBtn'))
            closePopup()
            if(r.deleteActivityLogStat == 1){
                showAlert('success',r.msg,4000,true);
                let activityGroupContainer = $(`.activityContainer[activityid="${activityId}"]`).closest('.activityGroupContainer');
                $(`.activityContainer[activityid="${activityId}"]`).text('').attr('class',null).remove()
                let height = 0;
                activityGroupContainer.find('.activityContainer').each(function(){
                    height = $(this).height() + 20 + height;
                })
                activityGroupContainer.height(height);
            }else if(r.deleteActivityLogStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
$('html,body').on('click','.activityGroupSeemore',function(e){
    e.stopImmediatePropagation();
    let height = 0;
    $(this).text('')
    $(this).closest('.activityGroupContainer').find('.activityContainer').each(function(){
        height = $(this).height() + 20 + height;
    })
    $(this).closest('.activityGroupContainer').height(height + 1);
})


let getMoreActivities = true;
let noMoreActivites = false;
$('#activityLog-datePicker-findBtn').on('click',function(){
    $(this).attr('year',$('#datePicker-activityLog').find('.datePickerYear').attr('year'));
    $(this).attr('month',$('#datePicker-activityLog').find('.datePickerMonth').attr('month'));
    $(this).attr('day',$('#datePicker-activityLog').find('.datePickerSelectedDay').text());
    lastActivity = null;
    getMoreActivities = true;
    noMoreActivites = false;
    $('#activityLog-activityLogContainer').text('');
    showBtnLoading($('#activityLog-datePicker-findBtn'));
    $('#activityLog-activityLogContainer_loading').removeClass('none')
    let year = $('#datePicker-activityLog').find('.datePickerYear').attr('year');
    let month = $('#datePicker-activityLog').find('.datePickerMonth').attr('month');
    let day = $('#datePicker-activityLog').find('.datePickerSelectedDay').text();
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getActivityLog:true,
            year:year,
            month:month,
            day:day,
            getMoreActivities:'',
        },
        success:function(response){
            hideBtnLoading($('#activityLog-datePicker-findBtn'));
            $('#activityLog-activityLogContainer_loading').addClass('none')
            scrollToDiv($('#bodyPage'),$('#activityLog-activityLogContainer'),500,20);
            if(response.activities.length == 0){
                $('#activityLog-noActivities').removeClass('none');
            }else{
                $('#activityLog-noActivities').addClass('none');
                noMoreActivites = false;
                let date = new Date(year,(month - 1),day,0,0,0);
                $('#activityLog-activityLogContainer').append(
                    $('<div/>',{class:'activityLogsStickyDate',text:new Date(date).toDateString()})
                )
            }
            for(const key in response.activities){
                drawActivityLog(response.activities[key],false,'append');
            }
        }
    }).done(function(){
        if(!noMoreActivites && $('#activityLog-activityLogContainer').height() <= $('#bodyPage').height()){
            getActivityLogs();
        }
    })
})
getActivityLogs = function(){
    if(getMoreActivities == false){return;}
    if(noMoreActivites == true){return;}
    getMoreActivities = false;
    let year = $('#activityLog-datePicker-findBtn').attr('year');
    let month = $('#activityLog-datePicker-findBtn').attr('month');
    let day = $('#activityLog-datePicker-findBtn').attr('day');
    $('#activityLog-activityLogContainer_loading').removeClass('none')
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getActivityLog:true,
            year:year,
            month:month,
            day:day,
            getMoreActivities:$('#activityLog-activityLogContainer').children().last().find('.activityContainer').last().attr('created_at'),
            lastActivityId:$('#activityLog-activityLogContainer').children().last().find('.activityContainer').last().attr('activityId'),
        },
        success:function(response){
            $('#activityLog-activityLogContainer_loading').addClass('none')
            if(response.activities.length == 0){noMoreActivites = true;lastActivity = null;}
            if(response.activities.length == 0 && $('#activityLog-activityLogContainer').children().length == 0){
                $('#activityLog-noActivities').removeClass('none');
            }else{
                $('#activityLog-noActivities').addClass('none');
            }
            for(const key in response.activities){
                drawActivityLog(response.activities[key],false,'append');
            }
        }
    }).done(function(){
        getMoreActivities = true;
        if(!noMoreActivites && $('#activityLog-activityLogContainer').height() <= $('#bodyPage').height()){
            getActivityLogs();
        }
    })
}
$('#bodyPage').on('scroll',function(e){
    if('Activity-Log' == window.history.state.page ){
        if($('#bodyPage').scrollTop() > $('#activityLog-activityLogContainer').children().eq(1).offset().top ){
            $('.activityLogsStickyDate').addClass('activityLogsStickyDate_sticky')
        }else{
            $('.activityLogsStickyDate').removeClass('activityLogsStickyDate_sticky')
        }
        if($('#activityLog-activityLogContainer').children().length == 0){return}
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 10 ){
            getActivityLogs();
        }
    }

});
