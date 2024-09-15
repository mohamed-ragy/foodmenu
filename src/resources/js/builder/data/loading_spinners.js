get_loading_spinner = function(spinner_key,prefix){
    return get_loading_spinners(prefix)[spinner_key]
}
get_loading_spinners = function(prefix='preview_spinner_'){
    let loading_spinners = {};
    let i = 0;
    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'800'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'display' : 'block',
                'position' : 'absolute',
                'box-sizing' : 'border-box',
                'width' : '100%',
                'height' : '100%',
                'border-style' : 'solid',
                'border-width' : ':thickness:',
                'border-radius' : '50%',
                'animation' : `${prefix}${i}_animation_1 :speed:ms cubic-bezier(0.5, 0, 0.5, 1) infinite`,
            },
            'div:nth-child(1)':{
                'animation-delay':'calc(-1 * ((:speed:ms / 8) * 3) )',
                'border-color' : ':color_1: transparent transparent transparent',
            },
            'div:nth-child(2)':{
                'animation-delay':'calc(-1 * ((:speed:ms / 8) * 2) )',
                'border-color' : ':color_1: transparent transparent transparent',
            },
            'div:nth-child(3)':{
                'animation-delay':'calc(-1 * (:speed:ms / 8) )',
                'border-color' : ':color_1: transparent transparent transparent',
            },
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%' : {'transform' : 'rotate(0deg)'},
                '100%' : {'transform' : 'rotate(360deg)'}
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_4),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'1400'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
            'border-radius' : '50%',    
            'border': ':thickness: solid :color_1:',
            'border-top-color': ':color_2:',
            'animation':`${prefix}${i}_animation_1 :speed:ms ${get_timing_function('ease_in_out_back')} infinite`,
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%' : {'transform' : 'rotate(0deg)'},
                '30%' : {'transform' : 'rotate(0deg)'},
                '100%' : {'transform' : 'rotate(360deg)'}
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_5),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'2000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
            'border' : ':thickness: solid :color_2:',
            'border-top' : ':thickness: solid :color_1:',
            'border-radius':'50%',
            'animation':`${prefix}${i}_animation_1 :speed:ms linear infinite`,
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%' : {'transform' : 'rotate(0deg)'},
                '100%' : {'transform' : 'rotate(360deg)'}
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_5),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'800'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'display' : 'block',
                'box-sizing' : 'border-box',
                'width' : '100%',
                'height' : '100%',
                'border-radius' : '50%',
                'border':':thickness: solid :color_1:',
                'border-color':':color_1: :color_2: :color_1: :color_2:',
                'animation':`${prefix}${i}_animation_1 :speed:ms linear infinite`
            }
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%' : {'transform' : 'rotate(0deg)'},
                '100%' : {'transform' : 'rotate(360deg)'}
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_5),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'1500'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'box-sizing' : 'border-box',
                'position':'absolute',
                'border-radius':'50%',
                'border-style':'solid',
                'border-width':':thickness:',
                'width' : '100%',
                'height' : '100%',
            },
            'div:nth-child(1)':{
                'border-color':':color_1: :color_1: transparent transparent',
                'animation':`${prefix}${i}_animation_1 :speed:ms ${get_timing_function('linear')} infinite`,
   
            },
            'div:nth-child(2)':{
                'border-color':':color_2: :color_2: transparent transparent',
                'transform':'rotateZ(180deg)',
                'animation':`${prefix}${i}_animation_2 :speed:ms ${get_timing_function('linear')} infinite`,
            },
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform':'rotateZ(0deg)'},
                '100%':{'transform':'rotateZ(360deg)'}
            },
            [`${prefix}${i}_animation_2`]:{
                '0%':{'transform':'rotateZ(180deg)'},
                '100%':{'transform':'rotateZ(540deg)'}
            }
        }

    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_5),1)',
            ':size:':'50px',
            ':thickness:':'3px',
            ':speed:':'2000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'box-sizing' : 'border-box',
                'position':'absolute',
                'border-radius':'50%',
                'border-style':'dashed dashed dotted dotted',
                'border-color':':color_1:',
                'border-width':':thickness:',
                'width' : '100%',
                'height' : '100%',
                'animation':`${prefix}${i}_animation_1 :speed:ms ${get_timing_function('linear')} infinite`,
            },
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform':'rotateZ(0deg)'},
                '100%':{'transform':'rotateZ(   360deg)'}
            },
        }

    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':thickness:':'6px',
            ':speed:':'2000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'display' : 'block',
                'position':'absolute',
                'box-sizing' : 'border-box',
                'width' : '100%',
                'height' : '100%',
                'border':':thickness: solid :color_1:',
                'opacity':'0',
                'border-radius':'50%',
                'animation':`${prefix}${i}_animation_1 :speed:ms cubic-bezier(0, 0.2, 0.8, 1) infinite`,
            },
            'div:nth-child(2)':{
                'animation-delay':'calc(:speed:ms / 2)',
            }
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{
                    opacity:'1',
                    transform:'scale(0)',
                },
                '100%':{
                    opacity:'0',
                    transform:'scale(1)',
                }
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'2000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'display' : 'block',
                'position':'absolute',
                'box-sizing' : 'border-box',
                'width' : '100%',
                'height' : '100%',
                'background-color':':color_1:',
                'opacity':'0',
                'border-radius':'50%',
                'animation':`${prefix}${i}_animation_1 :speed:ms cubic-bezier(0, 0.2, 0.8, 1) infinite`,
            },
            'div:nth-child(2)':{
                'animation-delay':'calc(:speed:ms / 2)',
            }
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{
                    opacity:'1',
                    transform:'scale(0)',
                },
                '100%':{
                    opacity:'0',
                    transform:'scale(1)',
                }
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'2000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'position' : 'absolute',
                'inset' : '0 0 0 0',
                'width':'calc(:size:/4)',
                'height':'calc(:size:/4)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'transform-origin':'calc(:size:/2) calc(:size:/2)',
                'transform':'rotateZ(135deg)',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ${get_timing_function('linear')} infinite`,
            },
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 1))'},
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 2))'},
            'div:nth-child(3)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 3))'},
            'div:nth-child(4)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 4))'},
            'div:nth-child(5)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 5))'},
            'div:nth-child(6)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 6))'},
            'div:nth-child(7)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 7))'},
            'div:nth-child(8)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 8))'},
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform': 'rotateZ(45deg)'},
                '100%':{'transform': 'rotateZ(405deg)'},
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'1000'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'position' : 'absolute',
                'inset' : '0 0 0 0',
                'width':'calc(:size:/4)',
                'height':'calc(:size:/4)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'transform-origin':'calc(:size:/2) calc(:size:/2)',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ${get_timing_function('ease_out_sine')} infinite`,
            },
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 1))','transform':'rotateZ(-45deg)',},
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 2))','transform':'rotateZ(-90deg)',},
            'div:nth-child(3)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 3))','transform':'rotateZ(-135deg)',},
            'div:nth-child(4)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 4))','transform':'rotateZ(-180deg)',},
            'div:nth-child(5)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 5))','transform':'rotateZ(-225deg)',},
            'div:nth-child(6)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 6))','transform':'rotateZ(-270deg)',},
            'div:nth-child(7)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 7))','transform':'rotateZ(-315deg)',},
            'div:nth-child(8)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 8))','transform':'rotateZ(-360deg)',},
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'opacity': '1'},
                '100%':{'opacity': '.3'},
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'1200'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'position' : 'absolute',
                'width':'calc(:size:/4)',
                'height':'calc(:size:/4)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ${get_timing_function('ease_in_out_sine')} infinite`,
            },
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 8))','left':'calc( ((:size:/2)*1) - ((:size:/4)/2))','top':'calc( ((:size:/2)*0) - ((:size:/4)/1.5))'},
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 7))','left':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))','top':'calc( ((:size:/2)*.25) - ((:size:/4)/2))'},
            'div:nth-child(3)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 6))','left':'calc( ((:size:/2)*2) - ((:size:/4)/3))','top':'calc( ((:size:/2)*1) - ((:size:/4)/2))'},
            'div:nth-child(4)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 5))','left':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))','top':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))'},
            'div:nth-child(5)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 4))','left':'calc( ((:size:/2)*1) - ((:size:/4)/2))','top':'calc( ((:size:/2)*2) - ((:size:/4)/3))'},
            'div:nth-child(6)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 3))','left':'calc( ((:size:/2)*.25) - ((:size:/4)/2))','top':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))'},
            'div:nth-child(7)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 2))','left':'calc( ((:size:/2)*0) - ((:size:/4)/1.5))','top':'calc( ((:size:/2)*1) - ((:size:/4)/2))'},
            'div:nth-child(8)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 1))','left':'calc( ((:size:/2)*.25) - ((:size:/4)/2))','top':'calc( ((:size:/2)*.25) - ((:size:/4)/2))'},
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform':'scale(0)'},
                '50%':{'transform':'scale(1)'},
                '100%':{'transform':'scale(0)'},
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        // 'html':'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>',
        'html':'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_4),1)',
            ':size:':'50px',
            ':speed:':'1200'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'position' : 'absolute',
                'width':'calc(:size:/4)',
                'height':'calc(:size:/4)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ${get_timing_function('ease_in_out_sine')} infinite`,
            },
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 8))','left':'calc( ((:size:/2)*1) - ((:size:/4)/2))','top':'calc( ((:size:/2)*0) - ((:size:/4)/1.5))'},
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 7))','left':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))','top':'calc( ((:size:/2)*.25) - ((:size:/4)/2))'},
            'div:nth-child(3)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 6))','left':'calc( ((:size:/2)*2) - ((:size:/4)/3))','top':'calc( ((:size:/2)*1) - ((:size:/4)/2))'},
            'div:nth-child(4)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 5))','left':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))','top':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))'},
            'div:nth-child(5)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 4))','left':'calc( ((:size:/2)*1) - ((:size:/4)/2))','top':'calc( ((:size:/2)*2) - ((:size:/4)/3))'},
            'div:nth-child(6)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 3))','left':'calc( ((:size:/2)*.25) - ((:size:/4)/2))','top':'calc( ((:size:/2)*1.75) - ((:size:/4)/2))'},
            'div:nth-child(7)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 2))','left':'calc( ((:size:/2)*0) - ((:size:/4)/1.5))','top':'calc( ((:size:/2)*1) - ((:size:/4)/2))'},
            'div:nth-child(8)':{'animation-delay':'calc(-1 * ((:speed:ms / 8) * 1))','left':'calc( ((:size:/2)*.25) - ((:size:/4)/2))','top':'calc( ((:size:/2)*.25) - ((:size:/4)/2))'},
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'background-color':':color_1:','transform':'scale(1)'},
                '50%':{'background-color':':color_2:','transform':'scale(.5)'},
                '100%':{'background-color':':color_1:','transform':'scale(1)'},
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'1300'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
            'display':'flex',
            'align-items':'center',
            'justify-content':'center',
        },
        'css_children':{
            'div':{
                'position':'relative',
                'margin':'1px 1px 1px 1px',
                'width':'calc(:size: / 3)',
                'height':'calc(:size: / 3)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'display':'inline-block',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ease-in-out infinite`,
            },
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 3.3) * 1))'},
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 3.3) * 2))'}
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform': 'scale(0)'},
                '50%':{'transform': 'scale(1)'},
                '100%':{'transform': 'scale(0)'},
            }
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':color_2:':'rgba(var(--color_1_5),1)',
            ':size:':'50px',
            ':speed:':'1300'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
            'display':'flex',
            'align-items':'center',
            'justify-content':'center',
        },
        'css_children':{
            'div':{
                'position':'relative',
                'margin':'1px 1px 1px 1px',
                'width':'calc(:size: / 3)',
                'height':'calc(:size: / 3)',
                'background-color':':color_1:',
                'border-radius':'50%',
                'display':'inline-block',
                'animation' : `${prefix}${i}_animation_1 :speed:ms ease-in-out infinite`,
            },
            'div:nth-child(2)':{'animation-delay':'calc(-1 * ((:speed:ms / 3) * 1))'},
            'div:nth-child(1)':{'animation-delay':'calc(-1 * ((:speed:ms / 3) * 2))'}
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'background-color':':color_2:'},
                '50%':{'background-color':':color_1:'},
                '100%':{'background-color':':color_2:'},
            }
        }
    }


    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'800'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
        },
        'css_children':{
            'div':{
                'margin':'auto calc(:size:/20) auto calc(:size:/20)',
                'inset' : '0 0 0 0',
                'position' : 'absolute',
                'border-radius' : '5px',
                'background-color':':color_1:',
                'width':'calc(:size:/3)',
                'height':'50%',

            },
            'div:nth-child(1)':{
                'left':'0px',
                'animation':`${prefix}${i}_animation_1 :speed:ms ease-in infinite`,
            },
            'div:nth-child(2)':{
                'left':'0px',
                'animation':`${prefix}${i}_animation_2 :speed:ms ease-in infinite`,
            },
            'div:nth-child(3)':{
                'left':'calc((:size:/3)*1)',
                'animation':`${prefix}${i}_animation_2 :speed:ms ease-in infinite`,
            },
            'div:nth-child(4)':{
                'left':'calc((:size:/3)*2)',
                'animation':`${prefix}${i}_animation_3 :speed:ms ease-in infinite`,
            },
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform':'scale(0)'},
                '100%':{'transform':'scale(1)'}
            },
            [`${prefix}${i}_animation_2`]:{
                '0%':{'transform':'translate(0, 0)'},
                '100%':{'transform':'translate(calc(:size:/3), 0)'}
            },
            [`${prefix}${i}_animation_3`]:{
                '0%':{'transform':'scale(1)'},
                '100%':{'transform':'scale(0)'}
            },
        }
    }

    i++;
    loading_spinners[i] = {
        'tag':'div',
        'spinner_key':i,
        'class_selector':`${prefix}${i}_spinner`,
        'html':'<div></div><div></div><div></div><div></div>',
        'vars':{
            ':color_1:':'rgba(var(--color_1_6),1)',
            ':size:':'50px',
            ':speed:':'1200'
        },
        'css':{
            'position' : 'absolute',
            'inset' : '0 0 0 0',
            'margin' : 'auto',
            'width' : ':size:',
            'aspect-ratio' : '1 / 1',
            'display':'flex',
            'align-items':'center',
            'justify-content':'center',
        },
        'css_children':{
            'div':{
                'margin':'0px 1px 0px 1px',
                'border-radius' : '3px',
                'background-color':':color_1:',
                'width':'calc(:size:/4)',
                'height':':size:',
                'animation':`${prefix}${i}_animation_1 :speed:ms ease-in infinite`,
            },
            'div:nth-child(1)':{
                'left':'0px',
                'animation-delay':'calc(-1 * ((:speed:ms / 4) * 1))',
            },
            'div:nth-child(2)':{
                'left':'0px',
                'animation-delay':'calc(-1 * ((:speed:ms / 4) * 2))',
            },
            'div:nth-child(3)':{
                'left':'calc((:size:/3)*1)',
                'animation-delay':'calc(-1 * ((:speed:ms / 4) * 3))',
            },
            'div:nth-child(4)':{
                'left':'calc((:size:/3)*2)',
                'animation-delay':'calc(-1 * ((:speed:ms / 4) * 4))',
            },
        },
        'keyframes':{
            [`${prefix}${i}_animation_1`]:{
                '0%':{'transform':'scaleY(.3)'},
                '50%':{'transform':'scaleY(1)'},
                '100%':{'transform':'scaleY(.3)'},
            },
            // [`${prefix}${i}_animation_2`]:{
            //     '0%':{'transform':'translate(0, 0)'},
            //     '100%':{'transform':'translate(calc(:size:/3), 0)'}
            // },
            // [`${prefix}${i}_animation_3`]:{
            //     '0%':{'transform':'scale(1)'},
            //     '100%':{'transform':'scale(0)'}
            // },
        }
    }

    return loading_spinners;

}
