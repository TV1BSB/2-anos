/**
 * variáveis do shuffle
 */
var Shuffle = window.Shuffle;
var todos_shuffle = document.getElementById("todos_shuffle");
var economia_shuffle = document.getElementById("economia_shuffle");
var energia_shuffle = document.getElementById("energia_shuffle");
var agro_shuffle = document.getElementById("agro_shuffle");
var educacao_shuffle = document.getElementById("educacao_shuffle");
var saude_shuffle = document.getElementById("saude_shuffle");

var last_shuffle = Shuffle.ALL_ITEMS;

/**
 *
 * @type {NodeList}
 *
 * div do shuffle
 */
var shuffleDivs = document.getElementsByClassName('shuffle-container')
var shuffleInstance = [];

/**
 *
 * @type {string}
 *
 * tamanhos dos tiles quando clicados
 */
var clicked_width = '100vw';
var clicked_height = '100vh';

/**
 * inicia o shufflejs
 */
for (var i = 0; i < shuffleDivs.length; i++) {
    var el = document.querySelector("#" + shuffleDivs[i].id);

    //var sizer = document.querySelector('.my-sizer-element');
    shuffleInstance[i] = new Shuffle(el,{
        itemSelector: '.picture-item',
        //sizer: sizer,
    });
}

/**
 * rolar pro topo ao carregar
 */
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/**
 * reativa o ultimo shuffle ao clicar no body
 */
document.body.onclick = function() {
    for (var i = 0; i < shuffleInstance.length; i++) {
        shuffleInstance[i].filter(last_shuffle);
    }
};

window.onload = function() {
    getUrlParameter('v');

    var topSite = document.getElementById('top-site-text');
    topSite.style.opacity = "1";
    topSite.style.top = "40%";

    mountEventsTiles();
};

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
todos_shuffle.addEventListener('click', function() {
    resetButtons();

    todos_shuffle.className += ' button-active';
    last_shuffle = Shuffle.ALL_ITEMS;
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
economia_shuffle.addEventListener('click', function() {
    resetButtons();

    economia_shuffle.className += ' button-active';
    last_shuffle = 'economia';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
energia_shuffle.addEventListener('click', function() {
    resetButtons();

    energia_shuffle.className += ' button-active';
    last_shuffle = 'energia';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
agro_shuffle.addEventListener('click', function() {
    resetButtons();

    agro_shuffle.className += ' button-active';
    last_shuffle = 'agro';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
educacao_shuffle.addEventListener('click', function() {
    resetButtons();

    educacao_shuffle.className += ' button-active';
    last_shuffle = 'educacao';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
saude_shuffle.addEventListener('click', function() {
    resetButtons();

    saude_shuffle.className += ' button-active';
    last_shuffle = 'saude';
    resizeAll();
});


/**
 * remove a classe 'button-active' de todos os botões de filtro
 */
function resetButtons() {
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('button-active');
    }
}

/**
 * adiciona o evento de click a todos os tiles da página
 */
function mountEventsTiles() {
    var controler = document.getElementsByClassName('picture-item');

    for (var i = 0; i < controler.length; i++) {
        controler[i].onclick = function (e) {
            if(this.style.width == clicked_width) {
                resizeAll();

                var square = this;

                square.style.width = square.getAttribute('width');
                square.style.height = square.getAttribute('height');
                square.style.marginLeft = '0%';

                eventFire(document.body, 'click');

                square.getElementsByClassName('content')[0].style.opacity = "0";

                square.getElementsByClassName('type')[0].style.width = square.getElementsByClassName('type')[0].getAttribute('width');
                square.getElementsByClassName('type')[0].style.height = square.getElementsByClassName('type')[0].getAttribute('height');
                square.getElementsByClassName('type')[0].style.left = square.getElementsByClassName('type')[0].getAttribute('left');
                square.getElementsByClassName('type')[0].style.top = square.getElementsByClassName('type')[0].getAttribute('top');

                square.getElementsByClassName('type')[0].style.background = 'black';

                square.classList.remove('active');

                setTimeout(function(){
                    square.getElementsByClassName('float-title')[0].style.opacity = "1";
                    setTimeout(function () {
                        eventFire(document.body, 'click');
                    }, 500)
                }, 500);
            } else {
                resizeAll();

                var square = this;

                square.setAttribute('width', square.style.width);
                square.setAttribute('height', square.style.height);

                square.style.width = clicked_width;
                square.style.height = clicked_height;

                if( !(mobileAndTabletcheck()) ) {
                    square.style.marginLeft = '-50%';
                }

                square.style.position = 'fixed!important';
                eventFire(document.body, 'click');

                square.getElementsByClassName('float-title')[0].style.opacity = "0";

                setTimeout(function(){
                    setTimeout(function() {
                        square.getElementsByClassName('content')[0].style.opacity = "1";
                    }, 500);

                    square.getElementsByClassName('type')[0].setAttribute('width', square.getElementsByClassName('type')[0].style.width)
                    square.getElementsByClassName('type')[0].setAttribute('height', square.getElementsByClassName('type')[0].style.height)
                    square.getElementsByClassName('type')[0].setAttribute('left', square.getElementsByClassName('type')[0].style.left)
                    square.getElementsByClassName('type')[0].setAttribute('top', square.getElementsByClassName('type')[0].style.top)

                    square.getElementsByClassName('type')[0].style.width = '100%';
                    square.getElementsByClassName('type')[0].style.height = '100%';
                    square.getElementsByClassName('type')[0].style.left = '0%';
                    square.getElementsByClassName('type')[0].style.top = '0%';

                    square.getElementsByClassName('type')[0].style.background = 'white';

                    square.className += ' active';

                    setTimeout(function() {
                        window.scroll({
                            top: window.pageYOffset + square.getBoundingClientRect().top,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }, 300);
                }, 500);
            }
        }
    }
}

/**
 *
 * @param el - elemento
 * @param etype - evento
 *
 * dispara o evento definido no elemento definido
 */
function eventFire(el, etype){
    setTimeout(function(){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    },500);
}

/**
 * retorna todos os tiles para seus formatos originais
 *
 * TODO: pausar os vídeos
 */
function resizeAll() {
    var controler = document.getElementsByClassName('picture-item');

    for (i = 0; i < controler.length; i++) {
        var square = controler[i];

        if(square.hasAttribute('width')) {
            square.style.width = square.getAttribute('width');
        } else {
            square.setAttribute('width', square.style.width);
        }
        if(square.hasAttribute('height')) {
            square.style.height = square.getAttribute('height');
        } else {
            square.setAttribute('height', square.style.height);
        }

        window.square = square;

        if(square.getElementsByClassName('type').length > 0) {
            var type = square.getElementsByClassName('type')[0];

            if(type.hasAttribute('width')) {
                type.style.width = type.getAttribute('width');
            } else {
                type.setAttribute('width', type.style.width);
            }
            if(type.hasAttribute('height')) {
                type.style.height = type.getAttribute('height');
            } else {
                type.setAttribute('height', type.style.height);
            }
            if(type.hasAttribute('left')) {
                type.style.left = type.getAttribute('left');
            } else {
                type.setAttribute('left', type.style.left);
            }
            if(type.hasAttribute('top')) {
                type.style.top = type.getAttribute('top');
            } else {
                type.setAttribute('top', type.style.top);
            }
        }

        square.style.width = square.getAttribute('width');
        square.style.height = square.getAttribute('height');

        if(square.getElementsByClassName('float-title').length > 0) {
            square.getElementsByClassName('float-title')[0].style.opacity = "1";
            square.getElementsByClassName('content')[0].style.opacity = "0";

            square.getElementsByClassName('type')[0].style.background = 'black';
        }
    }

    eventFire(document.body, 'click');
}

/**
 *
 * @returns {boolean}
 * verifica se a página foi aberta em um sistema mobile
 */
function mobileAndTabletcheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

/**
 * @param sParam
 * retorna valor do parâmetro passado na URL(http://url?parametro=valor)
 */
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            //return sParameterName[1] === undefined ? true : sParameterName[1];
            var element = document.getElementById(sParameterName[1] === undefined ? true : sParameterName[1]);

            if(element) {
                setTimeout(function() {
                    window.scroll({
                        top: window.pageYOffset + element.getBoundingClientRect().top,
                        left: 0,
                        behavior: 'smooth'
                    });
                    setTimeout(function() {
                        eventFire(element, 'click');
                    }, 1000);
                }, 500);
            }
        }
    }
}