<div class="pageWrapper" id="home_page_sections-page">
    <input type="hidden" id="home_page_sections-title" value="{{ trans('cpanel/cpanel.menu.home_page_sections') }}" icon="home">
    <x-content-window title="{{ trans('cpanel/design/homePageSections.homePageSections') }}"  helpId="143" >

        <div id="design-homePageSectionsContainer">
            <div class="homePageSectionCard popupPage" popupPage="Website-Intro" sectionName="intro">
                <div class="ico-basics homePageSectionCardIcon"></div>
                <div class="homePageSectionCardTitle">{{ trans('cpanel/design/homePageSections.intro') }}</div>
            </div>
            <div class="homePageSectionCard popupPage" popupPage="Website-SlideShow" sectionName="slideShow">
                <div class="ico-slideshow homePageSectionCardIcon"></div>
                <div class="homePageSectionCardTitle">{{ trans('cpanel/design/homePageSections.slideShow') }}</div>
            </div>
            <div class="homePageSectionCard popupPage" popupPage="Website-Info" sectionName="info">
                <div class="ico-info homePageSectionCardIcon"></div>
                <div class="homePageSectionCardTitle">{{ trans('cpanel/design/homePageSections.info') }}</div>
            </div>
            <div class="homePageSectionCard popupPage" popupPage="Website-OurStory" sectionName="ourStory">
                <div class="ico-description homePageSectionCardIcon"></div>
                <div class="homePageSectionCardTitle">{{ trans('cpanel/design/homePageSections.ourStory') }}</div>
            </div>
            <div class="homePageSectionCard popupPage" popupPage="Website-Gallery" sectionName="gallery">
                <div class="ico-images homePageSectionCardIcon"></div>
                <div class="homePageSectionCardTitle">{{ trans('cpanel/design/homePageSections.gallery') }}</div>
            </div>
        </div>
    </x-content-window>
</div>
