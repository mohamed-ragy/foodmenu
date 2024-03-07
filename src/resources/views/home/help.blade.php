@extends('home.layout')

@section('title'){{ trans('home/home.helptitle') }}@endsection
@section('description'){{ trans('home/home.helpDescription') }}@endsection
@section('body')
    <div id="helpHeader">
        <img id="helpHeaderImg" src="/storage/imgs/support.jpg" alt="">
        <div id="helpHeaderSearchContainer">
            <form id="helpHeaderSearchCard" method="get" action="{{ route('home.help.search',['FoodMenuLang'=> request()->FoodMenuLang ]) }}">
                <input type="text" name="q" id="helpSearchInput" placeholder="{{ trans('home/help.searchPlaceHolder') }}">
                <input type="hidden" name="p" value="1">
                <button id="helpSearchButton"><span class="ico-search"></span></button>
                <div id="helpSearchRecent">
                    <span class="flexRowNoWrap" style="justify-content:flex-start;color:var(--fm-placeholder);margin-inline-start:.25em;margin-bottom:.5em;"><span class="ico-clock" style="margin-inline-end:.25em;"></span><span>{{ trans('home/help.recent') }}</span></span>
                    <div id="helpSearchRecentContainer"></div>
                </div>
            </form>
        </div>
        <div id="helpHeaderCategoriesContainer">
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/get-started">
                <div class="ico-rocket helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.get-started') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.gettingStartedTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/basics">
                <div class="ico-basics helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.basics') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.basicsTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/security">
                <div class="ico-security helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.security') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.securityTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/orders">
                <div class="ico-orders helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.orders') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.ordersTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/statistics">
                <div class="ico-statistics_and_analytics helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.statistics') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.statisticsTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/Billing">
                <div class="ico-plans helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.Billing') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.plansTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/products-categories">
                <div class="ico-products helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.products-categories') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.productTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/users">
                <div class="ico-users helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.users') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.usersTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/design">
                <div class="ico-design helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.design') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.designTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/settings">
                <div class="ico-settings helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.settings') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.settingsTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/faq">
                <div class="ico-help helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.faq') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.faqTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/contact-us">
                <div class="ico-email_address helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.contect') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.contectTXT') }}</div>
            </a>
        </div>
    </div>
    <div class="flexRowWrap" style="align-items:flex-start;">
        <div class="tutRelatedTuts" >
            <span style="font-size:1.3em;font-weight:bold;margin-bottom:1em;align-self:center;">{{ trans('home/help.popularArticles') }}</span>
            @foreach ($mostPopular as $tut )
                @switch($tut->helpCat)
                    @case(0)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/get-started/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(1)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/basics/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(2)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/security/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(3)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/orders/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(4)
                        <div class="relatedTut">
                            <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/statistics/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(5)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/Billing/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(6)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/products-categories/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(7)
                        <div class="relatedTut">
                            <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/deliveryAccount/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(8)
                        <div class="relatedTut">
                            <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/users/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(9)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/design/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @case(10)
                        <div class="relatedTut">
                            <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/settings/{{ $tut->id }}">{{ $tut->title }}</a>
                            <div class="relatedTutDescription">{{ $tut->description }}</div>
                        </div>
                        @break
                    @default
                @endswitch
            @endforeach
        </div>
        @if ($help_recent != null && $help_recent->count() > 0)
            <div class="tutRelatedTuts" >
                <span style="font-size:1.3em;font-weight:bold;margin-bottom:1em;align-self:center;">{{ trans('home/help.recentArticles') }}</span>
                @foreach ($help_recent as $tut )
                    @switch($tut->helpCat)
                        @case(0)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/get-started/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(1)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/basics/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(2)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/security/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(3)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/orders/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(4)
                            <div class="relatedTut">
                                <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/statistics/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(5)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/Billing/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(6)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/products-categories/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(7)
                            <div class="relatedTut">
                                <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/deliveryAccount/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(8)
                            <div class="relatedTut">
                                <a class="relatedTutLink"  href="/{{ request()->FoodMenuLang  }}/help/users/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(9)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/design/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @case(10)
                            <div class="relatedTut">
                                <a class="relatedTutLink" href="/{{ request()->FoodMenuLang  }}/help/settings/{{ $tut->id }}">{{ $tut->title }}</a>
                                <div class="relatedTutDescription">{{ $tut->description }}</div>
                            </div>
                            @break
                        @default
                    @endswitch
                @endforeach
            </div>
        @endif

    </div>

@endsection
