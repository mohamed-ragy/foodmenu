
<div id="sideMenu-itemsContainer">
    <div id="sideMenu-toggle"  tooltip="<div><span>{{ trans('cpanel/cpanel.hotKeys.SideMenuToggle').'</span> <span class="hotKeys">'.trans('cpanel/cpanel.hotKeys.viewIconsHotKey') }}</span></div>">
        <div class="ico-menu"></div>
    </div>

    <div class="sideMenu-itemsContainer" menuId="dashboard">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.dashboard') }}</div>
        <div class="cpPage side-menuItem" cpPage="home">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.home') }}</span>
                <span class="ico-home sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.home') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="activity_log">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.activity_log') }}</span>
                <span class="ico-activity_log sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.activity_log') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="statistics_and_analytics">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.statistics_and_analytics') }}</span>
                <span class="ico-statistics_and_analytics sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.statistics_and_analytics') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="restaurant_expenses">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.restaurant_expenses') }}</span>
                <span class="ico-restaurant_expenses sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.restaurant_expenses') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="financial_reports">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.financial_reports') }}</span>
                <span class="ico-financial_reports sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.financial_reports') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_master" menuId="security">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.security') }}</div>
        <div class="cpPage side-menuItem authority_master" cpPage="email_address">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.email_address') }}</span>
                <span class="ico-email_address sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.email_address') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="password">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.password') }}</span>
                <span class="ico-password sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.password') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="phone_number">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.phone_number') }}</span>
                <span class="ico-phone_number sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.phone_number') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="sub_accounts">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.sub_accounts') }}</span>
                <span class="ico-sub_accounts sideMenu-itemIcon"  tooltip="{{ trans('cpanel/cpanel.menu.sub_accounts') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_0" menuId="orders">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.orders') }}</div>
        <div class="cpPage side-menuItem authority_0" cpPage="incomplete_orders">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.incomplete_orders') }}</span>
                <span class="ico-orders sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.incomplete_orders') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_0" cpPage="order_history">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.order_history') }}</span>
                <span class="ico-order_history sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.order_history') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_1" menuId="categories">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.categories') }}</div>
        <div class="cpPage side-menuItem authority_1" cpPage="category_list">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.category_list') }}</span>
                <span class="ico-category_list sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.category_list') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_1" menuId="products">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.products') }}</div>
        <div class="cpPage side-menuItem authority_1" cpPage="manage_products">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.manage_products') }}</span>
                <span class="ico-manage_products sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.manage_products') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_1" cpPage="product_reviews">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.product_reviews') }}</span>
                <span class="ico-product_reviews sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.product_reviews') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_2" menuId="users">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.users') }}</div>
        <div class="cpPage side-menuItem authority_2" cpPage="create_new_user">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.create_new_user') }}</span>
                <span class="ico-create_new_user sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.create_new_user') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_2" cpPage="manage_users">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.manage_users') }}</span>
                <span class="ico-manage_users sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.manage_users') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_2" cpPage="online_users">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.online_users') }}</span>
                <span class="ico-online_users sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.online_users') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_2" cpPage="delivery_accounts">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.delivery_accounts') }}</span>
                <span class="ico-delivery_accounts sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.delivery_accounts') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_3" menuId="design">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.design') }}</div>
        <div class="cpPage side-menuItem authority_3" cpPage="templates">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.templates') }}</span>
                <span class="ico-templates sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.templates') }}"></span>
            </div>
        </div>

        <div class="cpPage side-menuItem authority_3" cpPage="website_colors">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.website_colors') }}</span>
                <span class="ico-website_colors sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.website_colors') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_3" cpPage="home_page_sections">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.home_page_sections') }}</span>
                <span class="ico-home_page_sections sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.home_page_sections') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_3" cpPage="images">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.images') }}</span>
                <span class="ico-images sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.images') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer" menuId="settings">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.settings') }}</div>
        <div class="cpPage side-menuItem authority_4" cpPage="system">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.system') }}</span>
                <span class="ico-system sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.system') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="restaurant_information">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.restaurant_information') }}</span>
                <span class="ico-restaurant_information sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.restaurant_information') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="languages">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.languages') }}</span>
                <span class="ico-languages sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.languages') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem " cpPage="control_panel_settings">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.control_panel_settings') }}</span>
                <span class="ico-control_panel_settings sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.control_panel_settings') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="home_delivery_settings">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.home_delivery_settings') }}</span>
                <span class="ico-delivery sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.home_delivery_settings') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="order_pickup_settings">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.order_pickup_settings') }}</span>
                <span class="ico-pickup sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.order_pickup_settings') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="dine_in_settings">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.dine_in_settings') }}</span>
                <span class="ico-dineIn sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.dine_in_settings') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_4" cpPage="promo_codes">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.promo_codes') }}</span>
                <span class="ico-promo_codes sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.promo_codes') }}"></span>
            </div>
        </div>
    </div>

    <div class="sideMenu-itemsContainer authority_master" menuId="support">
        <div class="sideMenu-itemsContainerTitle">{{ trans('cpanel/cpanel.menu.support') }}</div>
        <div class="cpPage side-menuItem authority_master" cpPage="submit_a_help_ticket">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.submit_a_help_ticket') }}</span>
                <span class="ico-submit_a_help_ticket sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.submit_a_help_ticket') }}"></span>
            </div>
        </div>
        <div class="cpPage side-menuItem authority_master" cpPage="ticket_history">
            <div class="ico-right sideMenu-itemArrow"></div>
            <div class="row alnC jstfyC">
                <span class="sideMenu-itemTitle">{{ trans('cpanel/cpanel.menu.ticket_history') }}</span>
                <span class="ico-ticket_history sideMenu-itemIcon" tooltip="{{ trans('cpanel/cpanel.menu.ticket_history') }}"></span>
            </div>
        </div>
    </div>

</div>
<div id="sideMenu-mainContainer">
    <div>
        <img id="sideMenu-logo" src="{{ asset('storage/logo/logo.png') }}" alt="">
        <div menuId="dashboard" class="sideMenu-mainItem" tooltip="{{ trans('cpanel/cpanel.menu.dashboard') }}"><span class="ico-dashboard"></span></div>
        <div menuId="security" class="sideMenu-mainItem authority_master" tooltip="{{ trans('cpanel/cpanel.menu.security') }}"><span class="ico-security"></span></div>
        <div menuId="orders" class="sideMenu-mainItem authority_0" tooltip="{{ trans('cpanel/cpanel.menu.orders') }}"><span class="ico-orders"></span></div>
        <div menuId="categories" class="sideMenu-mainItem authority_1" tooltip="{{ trans('cpanel/cpanel.menu.categories') }}"><span class="ico-categories"></span></div>
        <div menuId="products" class="sideMenu-mainItem authority_1" tooltip="{{ trans('cpanel/cpanel.menu.products') }}"><span class="ico-products"></span></div>
        <div menuId="users" class="sideMenu-mainItem authority_2" tooltip="{{ trans('cpanel/cpanel.menu.users') }}"><span class="ico-users fs09"></span></div>
        <div menuId="design" class="sideMenu-mainItem authority_3" tooltip="{{ trans('cpanel/cpanel.menu.design') }}"><span class="ico-design"></span></div>
    </div>
    <div>
        <div menuId="settings" class="sideMenu-mainItem " tooltip="{{ trans('cpanel/cpanel.menu.settings') }}"><span class="ico-settings"></span></div>
        <div menuId="support" class="sideMenu-mainItem authority_master" tooltip="{{ trans('cpanel/cpanel.menu.support') }}"><span class="ico-support"></span></div>
        <a menuId="billing" href="{{ env('BILLING_CENTER_URL') }}" target="_blank" class="sideMenu-mainItem_billing authority_master" tooltip="{{ trans('cpanel/cpanel.menu.billing') }}"><span class="ico-billing"></span></a>
        <div class="reportBug reportBug-sideMenu" tooltip="{{ trans('cpanel/cpanel.reportBug.reportBug') }}"><span class="ico-bug"></span></div>
        <div class="Logout Logout-sideMenu" tooltip="{{ trans('cpanel/cpanel.public.logout') }}"><span class="ico-logout"></span></div>

    </div>

</div>

