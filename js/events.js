$(document).ready(function() {
    $(document).on("click",".appDetails", function () {
        var clickedBtnID = $(this).attr('class'); // or var clickedBtnID = this.id
        alert(clickedBtnID);
    });

    /**
     * eventos parallax
     */
    $('.capa-paroller').paroller({ factor: '0.3', type: 'background', direction: 'vertical' });
    $('.second-capa-paroller').paroller({ factor: '0.2', type: 'foreground', direction: 'vertical' });

    /**
     * evento de play quando clicado em play do vídeo #1
     *
     * TODO: passar para PLAIN JAVASCRIPT
     */
    $('.play-button').click(function() {
        var play = $(this);

        $('html, body').animate({
            scrollTop: play.parent().offset().top
        }, 300);

        play.fadeOut();

        setTimeout(function() {
            play.parent().append('<iframe class="video-play" frameborder="0" src="https://www.youtube.com/embed/7-tNUur2YoU?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1" allow="autoplay; encrypted-media"></iframe>');
        }, 400);
    });

    // TODO: Scroll to second-capa
    window.wasScrolled = false;
    $(window).bind('scroll',function(){
        if (!window.wasScrolled){
            $('html, body').animate({
                scrollTop: document.getElementById('second-capa').getBoundingClientRect().top
            },1000);
            //setTimeout(function() {
            //    setTimeout(function() {
            //        document.getElementById('top-site-text').style.filter = 'invert(100%)';
            //    },1400)
            //}, 100);
            //setTimeout(function() {
            //    //document.write.$(document.getElementById('container')).style = "display:inherit";
            //    //document.write.$(document.getElementById('container')).innerHTML = "Collapse";
            //    //document.getElementById('container').remove();
            //},2000);
        }
        window.wasScrolled = true;
    });
});