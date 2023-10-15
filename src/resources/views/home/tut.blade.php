@extends('home.layout')

@section('title'){{ trans('home/home.help').' - '.$tut->title }}@endsection
@section('description'){{ $tut->description }}@endsection

<script>let thnxForRate = "{{ trans('home/help.thnxForRate') }}"</script>
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
        <a class="helpLinkTreeElement" href="/{{ request()->FoodMenuLang  }}/help/{{ request()->helpCat }}">{{ trans('home/help.'.request()->helpCat) }}</a>
        <span style="font-size:1.2em;color:var(--fm-placeholder);">></span>
        <a class="helpLinkTreeElement"  href="/{{ request()->FoodMenuLang  }}/help/{{ request()->helpCat }}/{{ $tut->id }}">{{ $tut->title }}</a>
    </div>
    <div id="tutContainer">
        <div id="tutSections">
            <span style="text-align:center;margin:0 1em;margin-bottom:1em;white-space:nowrap">{{ trans('home/help.inThisTut') }}</span>
            @foreach ($tut->help_en_texts as $text)
            <a class="tutSection" tooltip="{{ $text->title }}" href="#{{ $text->sort }}" id="tutSection-{{ $text->sort }}">
                {{ $text->title }}
            </a>
            @endforeach
        </div>
        <div id="tut">
            <div id="tutSectionsContainer">
                <div style="font-size:2em;font-weight:bold;margin:1em 0;">{{ $tut->title }}</div>
                @foreach ($tut->help_en_texts as $text)
                <div class="tutSectionContainer" id="{{ $text->sort }}">
                    <div style="font-size:1.3em;font-weight:bold;margin-bottom:.5em;user-select: text;">{{ $text->title }}</div>
                    <div style="user-select: text;">{!! $text->html !!}</div>
                </div>
                <hr style="width:90%;margin-bottom:2em;margin-top:2em;">
                @endforeach
                <div id="articalRateContainer">
                    <div style="font-size:1.3em;">{{ trans('home/help.rateTutTxt') }}</div>
                    <div class="flexRowNoWrap" style="margin-top:1em;">
                        <span style="font-size:2.5em;margin:.5em;" class="ico-thumbsUp tutRateUp" tutId="{{ $tut->id }}"></span>
                        <span style="font-size:2.5em;margin:.5em;" class="ico-thumbsDown tutRateDown" tutId="{{ $tut->id }}"></span>
                    </div>
                </div>
            </div>
            @if ($relatedTuts->count() > 0)
            <div class="tutRelatedTuts" style="align-self:center;width:auto;max-width:calc(100% - 4);">
                <span style="font-size:1.3em;font-weight:bold;margin-bottom:1em;align-self:center;">{{ trans('home/help.relatedTuts') }}</span>
                @foreach ($relatedTuts as $tut )
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
    </div>

@endsection
