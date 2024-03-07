@extends('home.layout')

@section('title'){{ trans('home/home.help').' - '.trans('home/help.'.request()->helpCat) }}@endsection
@section('description'){{ trans('home/home.faqDescription') }}@endsection
@section('body')
<script>let helpCat = "{{ request()->helpCat }}"</script>
    <form style="margin:1em;font-size:.9em;padding:0;box-shadow:none;" id="helpHeaderSearchCard" method="get" action="{{ route('home.help.search',['FoodMenuLang'=> request()->FoodMenuLang ]) }}">
        <input type="text" name="q" id="helpSearchInput" placeholder="{{ trans('home/help.searchPlaceHolder') }}">
        <input type="hidden" name="p" value="1">
        <button id="helpSearchButton"><span class="ico-search"></span></button>
        <div id="helpSearchRecent">
            <span class="flexRowNoWrap" style="justify-content:flex-start;color:var(--fm-placeholder);margin-inline-start:.25em;margin-bottom:.5em;"><span class="ico-clock" style="margin-inline-end:.25em;"></span><span>{{ trans('home/help.recent') }}</span></span>
            <div id="helpSearchRecentContainer"></div>
        </div>
    </form>
    <div class="helpLinkTree">
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help">{{ trans('home/home.help') }}</a>
        <span style="color:var(--fm-placeholder);">></span>
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help/{{ request()->helpCat }}">{{ trans('home/help.'.request()->helpCat) }}</a>
    </div>
    <div id="tutsContainer">
        @foreach ($tuts as $tut )
            <a class="tutCardContainer tutLink" href="/{{ request()->FoodMenuLang  }}/help/{{ request()->helpCat }}/{{ $tut->id }}">
                <div class="helpCategoryIcon {{ $tut->icon }}"></div>
                <div style="margin-bottom:.8em;margin-top:1em;text-align:center;">{{ $tut->title }}</div>
                <div style="font-size: .8em;color:var(--fm-placeholder);text-align:center;">{{ $tut->description }}</div>
            </a>
        @endforeach
    </div>
    <div class="flexRowWrap" style="align-items:flex-start;">
        <div class="tutRelatedTuts">
            <span style="font-size:1.3em;font-weight:bold;margin-bottom:1em;align-self:center;">{{ trans('home/help.popularArticlesIn').' '.trans('home/help.'.request()->helpCat) }}</span>
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
