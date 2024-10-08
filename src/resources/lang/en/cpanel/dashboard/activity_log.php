<?php
return [
    "category.created" => ":account: has created a new category :category:.",
    "category.deleted" => "The category :category: has been deleted by :account:.",
    "category.edited" => "The category :category: has been edited by :account:.",
    //
    "img.uploaded" => "The image :img: has been uploaded by :account:.",
    "img.deleted" => "The image :img: has been deleted by :account:.",
    //
    "delivery.created" => "A new delivery account :delivery: has been created by :account:.",
    "delivery.deleted" => "The delivery account :delivery: has been deleted by :account:.",
    "delivery.password_edited" => "The delivery account password for :delivery: has been modified by :account:.",
    //
    "subaccount.unblocked" => ":subaccount:'s account has been unblocked by :account:.",
    "subaccount.created" => "The subaccount :subaccount: has been created by :account:.",
    "subaccount.deleted" => "The subaccount :subaccount: has been deleted by :account:.",
    "subaccount.password_changed" => ":subaccount:'s account password has been modified by :account:.",
    "subaccount.authorities_changed" => ":subaccount:'s account permissions has been modified by :account:.",
    //
    "order.new_order_by_account" => ":account: has placed a new order :order:.",
    "order.new_order_by_user" => "A new order :order: has been placed by :user:.",
    "order.accepted" => "Order :order: has been accepted by :account:.",
    "order.canceled_by_account" => "Order :order: has been canceled by :account:.",
    "order.canceled_by_user" => "Order :order: has been canceled by :user:.",
    "order.ready_for_pickup" => "Order :order: has been marked as ready for pickup by :account:.",
    "order.picked_up" => "Order :order: has been marked as picked up by :account:.",
    "order.out_for_delivery" => "Order :order: has been marked as out for delivery by :account:.",
    "order.to_delivery_man" => "Order :order: has been assigned to :delivery: and marked as out for delivery by :account:.",
    "order.delivered_by_account" => "Order :order: has been marked as delivered by :account:.",
    "order.delivered_by_delivery" => "Order :order: has been marked as delivered by :delivery:.",
    "order.diningin" => "Order :order: has been marked as dining in by :account:.",
    "order.dinedin" => "Order :order: has been marked as dined in by :account:.",
    "order.update.notice" => "Order :order: additional comment has been modified by :account:.",
    "order.update.phoneNumber" => "The contact number for the order :order: has been changed by :account:.",
    "order.update.address" => "The delivery address for the order :order: has been changed by :account:.",
    "order.update.type" => "Order :order: type has been changed from :old_type: to :new_type: by :account:.",
    "order.update.discount" => "The discount percentage for order :order: has been changed from :old_discount: to :new_discount: by :account:.",
    "order.update.deliveryCost" => "The delivery fees for order :order: has been changed from :old_deliveryCost: to :new_deliveryCost: by :account:.",
    "order.update.addItem" => "X:new_qty: :product: has been added to order :order: by :account:.",
    "order.update.removeItem" => ":product: has been removed from order :order: by :account:.",
    "order.update.itemNotice" => "The special request for the :product: in order :order: has been modified by :account:.",
    "order.update.qty" => "The item quantity for :product: has been changed from :old_qty: to :new_qty: for order :order: by :account:.",
    "order.update.selection" => ":product:'s variant selection has been changed from :old_selection: to :new_selection: for order :order: by :account:.",
    //
    "product.created" => "A new product :product: has been created by :account:.",
    "product.deleted" => "The product :product: has been deleted by :account:.",
    "product.availability" => "The product :product: has been set as :availability: by :account:.",
    "product.edited" => "The product :product: has been modified by :account:.",
    "product.option.created" => "A new variant :option: has been created for the product :product: by :account:.",
    "product.option.deleted" => "The variant :option: has been deleted from the product :product: by :account:.",
    "product.option.edited" => "The variant :option: has been modified for the product :product: by :account:.",
    "product.selection.set_default" => "The selection :selection: has been set as the default selection for the variant :option: in the product :product: by :account:.",
    "product.selection.create" => "A new selection :selection: has been added to the :option: variant in the product :product: by :account:.",
    "product.selection.deleted" => "The selection :selection: for the variant :option: has been deleted from the product :product: by :account:.",
    "product.selection.edited" => "The selection :selection: for the the variant :option: has been modified from the product :product: by :account:.",
    //
    "review.posted" => "A :review: has been posted on :product: by :user:.",
    "review.posted_survey" => ":reviews_sum: :review: has been posted via the post-purchase survey by :user:.",
    "review.deleted" => "A review on :product: has been deleted by :account:.",
    //
    "security.email.verified" => "The main <a class='cpPage' cpPage='email_address'>account's email address</a> has been verified.",
    "security.email.changed" => "The main <a class='cpPage' cpPage='email_address'>account's email address</a> has been changed from :old_email: to :new_email:.",
    "security.phone.created" => "A security <a class='cpPage' cpPage='phone_number'>phone number</a> has been registered to the main account.",
    "security.phone.verified" => "The main <a class='cpPage' cpPage='phone_number'>account's phone number</a> has been verified.",
    "security.phone.changed" => "The main <a class='cpPage' cpPage='phone_number'>account's phone number</a> has been changed from :old_phone: to :new_phone:.",
    "security.password.changed" => "The main <a class='cpPage' cpPage='password'>account's password</a> has been changed.",
    //
    "settings.website_status.online" => "The website has been switched on by :account:.",
    "settings.website_status.offline" => "The website has been switched off by :account:.",
    "settings.system_settings" => "The <a class='cpPage' cpPage='system' openTab='system_settings'>system settings</a> has been modified by :account:.",
    "settings.website_privacyPolicy" => "The <a class='cpPage' cpPage='system' openTab='privacy_policy'>website privacy policy</a> has been modified by :account:.",
    "settings.country" => "<a class='cpPage' cpPage='system' openTab='region'>Your restaurant's country</a> has been changed from :old_country: to :new_country: by :account:.",
    "settings.timeZone" => "<a class='cpPage' cpPage='system' openTab='region'>The time zone</a> has been changed from :old_timeZone: to :new_timeZone: by :account:.",
    "settings.logo_icon.icon" => "<a class='cpPage' cpPage='restaurant_information' openTab='logo_and_icon'>The website icon</a> has been changed by :account:.",
    "settings.logo_icon.logo" => "<a class='cpPage' cpPage='restaurant_information' openTab='logo_and_icon'>Your restaurant's logo</a> has been changed by :account:.",
    "settings.logo_icon.metaImg" => "<a class='cpPage' cpPage='restaurant_information' openTab='logo_and_icon'>Your website's meta image</a> has been changed by :account:.",
    "settings.restaurant_info.restaurant_names" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_name' >restaurant's name</a> has been modified by :account:.",
    "settings.restaurant_info.restaurant_descriptions" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_description' >restaurant's description</a> has been modified by :account:.",
    "settings.restaurant_info.restaurant_email" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_email' >restaurant's contact email address</a> has been changed from :old_email: to :new_email: by :account:.",
    "settings.restaurant_info.restaurant_phone_numbers" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_phone_numbers' >restaurant's contact numbers</a> have been changed by :account:.",
    "settings.restaurant_info.restaurant_address" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_address' >restaurant's address</a> has been modified by :account:.",
    "settings.restaurant_info.restaurant_location" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='restaurant_location' >restaurant's location settings</a> have been modified by :account:.",
    "settings.restaurant_info.currency_symbol" => "The <a class='cpPage' cpPage='restaurant_information' openTab='currency_symbol' >currency symbol</a> has been modified by :account:.",
    "settings.restaurant_info.social_media_links" => "Your <a class='cpPage' cpPage='restaurant_information' openTab='social_media_links' >social media links</a> have been modified by :account:.",
    "settings.restaurant_info.website_announcement" => "The <a class='cpPage' cpPage='restaurant_information' openTab='website_announcement' >website announcement</a> has been modified by :account:.",
    "settings.restaurant_info.receipt_footer_message" => "The <a class='cpPage' cpPage='restaurant_information' openTab='receipt_footer_message' >receipt footer message</a> has been modified by :account:.",
    "settings.promocode.activity_status" => "The promocode :promocode: has been :activity_status: by :account:",
    "settings.promocode.deleted" => "The promocode :promocode: has been deleted by :account:",
    "settings.promocode.created" => "The promocode :promocode: has been created by :account:",
    "settings.promocode.edit" => "The promocode :promocode: settings have been changed by :account:",
    "settings.language.installed" => "The language :lang: has been installed by :account:.",
    "settings.language.website_default" => "The language :lang: has been set as the default website language by :account:.",
    "settings.language.receipt_default" => "The language :lang: has been set as the default receipt language by :account:.",
    "settings.language.deleted" => "The language :lang: has been deleted by :account:.",
    "settings.language.custom_installed" => "The custom language :lang: has been installed by :account:.",
    "settings.language.edit_options" => "The language :lang: settings have been modified by :account:.",
    "settings.language.edit_texts" => "The language :langTxt: text has been modified by :account:.",
    "settings.dinein.service" => "The <a class='cpPage' cpPage='dine_in_settings' openTab='dinein_service_charge_settings'>dine-in service charge</a> settings has been changed by :account:.",
    "settings.dinein.tax" => "The <a class='cpPage' cpPage='dine_in_settings' openTab='dinein_tax_settings'>dine-in orders tax</a> settings has been changed by :account:.",
    "settings.pickup.averagePickupTime" => "The <a class='cpPage' cpPage='order_pickup_settings' openTab='average_pickup_time'>average time to prepare a pickup order</a> has been changed by :account:.",
    "settings.pickup.paymentMethods" => "The order pickup service <a class='cpPage' cpPage='order_pickup_settings' openTab='pickup_payment_methods'>payment methods</a> have been changed by :account:.",
    "settings.pickup.minimum_charge" => "The order pickup service <a class='cpPage' cpPage='order_pickup_settings' openTab='pickup_minimum_charge'>minimum charge</a> has been changed by :account:.",
    "settings.pickup.tax" => "The <a class='cpPage' cpPage='order_pickup_settings' openTab='pickup_tax_settings'>order pickup tax</a> settings has been changed by :account:.",
    "settings.delivery.tax" => "The <a class='cpPage' cpPage='home_delivery_settings' openTab='delivery_tax_settings'>home delivery tax</a> settings has been changed by :account:.",
    "settings.delivery.minimum_charge" => "The home delivery service <a class='cpPage' cpPage='home_delivery_settings' openTab='delivery_minimum_charge'>minimum charge</a> has been changed by :account:.",
    "settings.delivery.paymentMethods" => "The delivery service <a class='cpPage' cpPage='home_delivery_settings' openTab='delivery_payment_methods'>payment methods</a> have been changed by :account:.",
    "settings.delivery.averageDeliveryTime" => "The <a class='cpPage' cpPage='home_delivery_settings' openTab='average_delivery_time'>average delivery time</a> has been changed by :account:.",
    "settings.delivery.deliveryCost" => "The home <a class='cpPage' cpPage='home_delivery_settings' openTab='delivery_fees'>delivery service fees </a> have been changed by :account:.",
    "settings.service.workingHours" => "The :service_name_workingHours: for <a class='popupPage' popupPage='working_hours' day=':day_attr:' service=':service_attr:'>:day:</a> has been changed by :account:.",
    "settings.service.workingDays" => "The :service_name: working day settings have been modified by :account:.",
    //
    "user.created" => ":account: has created a new user account :user:.",
    "user.edited_by_account" => "The user information of :user: has been modified by :account:.",
    "user.banned" => ":user: user account has been banned by :account:.",
    "user.ban_removed" => "The ban on :user: has been removed by :account:.",
    "user.signed_up" => ":user: has created a new account on your website.",
    "user.edited_by_user" => ":user: has updated his profile information.",
    'user.email_changed' => ":user: has changed his email address.",
    'user.password_changed' => ":user: has changed his password.",
    //
    'website.installed' => "Your restaurant's website has been installed successfully.",
    //new
    'website.domain_added' => 'The domain :domain: has been added by :account:',
    'website.domain_deleted' => 'The domain :domain: has been deleted by :account:',
    //
];
