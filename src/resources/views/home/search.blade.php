@extends('home.layout')
@section('title'){{ trans('home/help.search').' - '.$q ?? trans('home/home.help').' - '.trans('home/help.search') }}@endsection
@section('description'){{ trans('home/home.helpDescription') }}@endsection
<script>
    let results = {!! $results !!};
    let count = {{ $count }};
    let next = "{{ trans('home/help.next') }}";
    let prev = "{{ trans('home/help.prev') }}";
    let p = {{ request()->p }};
    let q = "{!! request()->q !!}";
    let helpCats = {
        0:"{{ trans('home/help.get-started') }}",
        1:"{{ trans('home/help.basics') }}",
        2:"{{ trans('home/help.security') }}",
        3:"{{ trans('home/help.orders') }}",
        4:"{{ trans('home/help.statistics') }}",
        5:"{{ trans('home/help.Billing') }}",
        6:"{{ trans('home/help.products-categories') }}",
        7:"{{ trans('home/help.deliveryAccount') }}",
        8:"{{ trans('home/help.users') }}",
        9:"{{ trans('home/help.design') }}",
        10:"{{ trans('home/help.settings') }}",
    }

</script>
@section('body')
    <form style="margin:1em;font-size:.9em;padding:0;box-shadow:none;" id="helpHeaderSearchCard" method="get" action="{{ route('home.help.search',['FoodMenuLang'=> request()->FoodMenuLang ]) }}">
        <input type="text" name="q" id="helpSearchInput" placeholder="{{ trans('home/help.searhPlaceHolder') }}">
        <input type="hidden" name="p" value="1">
        <button id="helpSearchButton"><span class="ico-search"></span></button>
        <div id="helpSearchRecent">
            <span class="flexRowNoWrap" style="justify-content:flex-start;color:var(--fm-placeholder);margin-inline-start:.25em;margin-bottom:.5em;"><span class="ico-clock" style="margin-inline-end:.25em;"></span><span>{{ trans('home/help.recent') }}</span></span>
            <div id="helpSearchRecentContainer"></div>
        </div>
    </form>
    <div class="helpLinkTree">
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
        <span style="font-size:1.2em;color:var(--fm-placeholder);">></span>
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help/search">{{ trans('home/help.search') }}</a>
        <span style="font-size:1.2em;color:var(--fm-placeholder);">></span>
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help/search?q={{ request()->q }}">{{ $q }}</a>
    </div>
    @if($count == 0)
        <div class="tutSearchTuts" >
            <span id="noSearchResaults" style="text-align:center;width:100%;">{{ trans('home/help.noSearchResaults') }}</span>
        </div>
        <div class="flexRowWrap" style="margin-top:2em;margin-bottom:2em;">
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/contact-us">
                <div class="ico-email_address helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.contect') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.contectTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" href="/{{ request()->FoodMenuLang  }}/help/faq">
                <div class="ico-help helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.faq') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.faqTXT') }}</div>
            </a>
            <a class="helpCategoryContainer" target="_blank" href="{{ env('CPANEL_URL') }}/?tab=submit_a_help_ticket">
                <div class="ico-ticket helpCategoryIcon"></div>
                <div style="font-size:1.2em;">{{ trans('home/help.submitTicket') }}</div>
                <div class="helpCategotyText">{{ trans('home/help.submitTicketTxt') }}</div>
            </a>
        </div>

        <div class="tutRelatedTuts">
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
    @else
        <div class="tutSearchTutsContainer">
            <div class="searchPaginationContainer flexRowNoWrap" style="align-self:center;margin:1em;"></div>
            <div id="tutSearchTuts"></div>
            <div class="searchPaginationContainer flexRowNoWrap" style="align-self:center;"></div>

        </div>
    @endif
@endsection
