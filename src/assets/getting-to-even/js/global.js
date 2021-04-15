/*******************
    Sharing
*******************/
var shareMeta = {
    link: [{
        // 0 (page)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    },{
        // 1 (episode 1)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    },{
        // 2 (episode 2)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    },{
        // 3 (episode 3)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    },{
        // 4 (episode 4)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    },{
        // 5 (episode 5)
        url: 'http://cnnmon.ie/2ydzE4o',
        fb: 'Placeholder',
        tweet: 'Placeholder',
        hashtag: 'Placeholder'
    }]
}

var shareLink = function (metadata, shareType) {
    var facebookText = metadata.fb || '';
    var twitterText = metadata.tweet || '';
    var uri = metadata.url || '';
    var hashtagText = metadata.hashtag || '';
    var shareURL = '#';
    var shareMap = {
        facebook: {
            linkUrl: 'https://facebook.com/cnnmoney',
            shareUri: 'https://www.facebook.com/share.php'
        },
        twitter: {
            linkUrl: 'https://twitter.com/cnnmoney',
            shareUri: 'https://twitter.com/intent/tweet'
        }
    };
    switch (shareType) {
        case 'facebook':
            shareURL = encodeURI(shareMap[shareType].shareUri + '?u=' + uri + '&quote=' + facebookText);
            break
        case 'twitter':
            shareURL = encodeURI(shareMap[shareType].shareUri + '?text=' + twitterText + '&hashtags=' + hashtagText + '&via=cnnmoney&url=' + uri);
            break
        case 'link':
            window.prompt('Copy to clipboard: Ctrl+C, Enter', uri);
            return
        default:
            shareURL = '#'
    };
    var w = 600;
    var h = 500;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    window.open(shareURL, 'Share', '_blank, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, width=600, height=500, top='+top+', left='+left);
}






function sendAudioEvent(data, event, id){
    try {
        var currAudObj = (typeof data != 'string' ? data : _w.JSON.parse(data));
        trackMetrics({
            type: event,
            data: {
                instance: id,
                audio: currAudObj
            }
        });
    } catch(e){}
}


$(document).ready(function(){

    
   /*******************
   Audio Playlist
   *******************/
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded: function() {
            // Currently play track.
            var track = $('.active-track'),
                name = $('[data-track]', track).attr('data-title'),
                duration = $('[data-track]', track).attr('data-duration');

            // Create object for analytics.
            var audioObject = {
                source: this.source,
                mp3: this.mp3,
                duration: duration,
                paused: false,
                buffer: false
            };
            console.log(audioObject);

            // Fire analytics.
            sendAudioEvent(audioObject, 'audio-complete', 'Getting to Even');
            console.log('audio-complete');

            // Queue next track.
            var next = track.next();
            if (!next.length) next = $('[data-track-card]').first();
            next.addClass('active-track is-playing').siblings().removeClass('active-track is-playing is-paused');
            audio.load($('[data-track]', next).attr('data-src'));
            $('#audiojs-title').text($('[data-track]', next).attr('data-title'));
            
            // Play queued track.
            audio.play();
        },
        pause: function(){
            // Currently play track.
            var track = $('.active-track'),
                name = $('[data-track]', track).attr('data-title'),
                duration = $('[data-track]', track).attr('data-duration');

            // Create object for analytics.
            var audioObject = {
                title: name,
                mp3: this.mp3,
                duration: duration,
                paused: true,
                buffer: false
            };
            console.log(audioObject);

            // Fire analytics.
            sendAudioEvent(audioObject, 'audio-pause', 'Getting to Even');
            console.log('audio-pause');

            $('[data-player]').removeClass('audiojs--is-playing');
        },
        play: function(){

            // Currently play track.
            var track = $('.active-track'),
                name = $('[data-track]', track).attr('data-title'),
                duration = $('[data-track]', track).attr('data-duration'),
                source = $('[data-track]', track).attr('data-src');

            // Create object for analytics.
            var audioObject = {
                title: name,
                mp3: source,
                duration: duration,
                paused: false,
                buffer: false
            };
            console.log(audioObject);

            // Fire analytics.
            sendAudioEvent(audioObject, 'audio-start', 'Getting to Even');
            console.log('audio-start');

            var trackDuration = Math.round(this.duration);
            var trackDuration25 = Math.round(this.duration) / 4;
            var trackDuration50 = Math.round(this.duration) / 2;
            var trackDuration75 = Math.round(this.duration) / 1.3;
            var trackReached25 = false;
            var trackReached50 = false;
            var trackReached75 = false;
            
            this.element.ontimeupdate = function(){
                if(this.currentTime >= trackDuration25 &&! trackReached25){
                    sendAudioEvent(audioObject, 'audio-twentyfive', 'Getting to Even');
                    console.log('audio-twentyfive');
                    trackReached25 = true;
                }
                if(this.currentTime >= trackDuration50 &&! trackReached50){
                    sendAudioEvent(audioObject, 'audio-fifty', 'Getting to Even');
                    console.log('audio-fifty');
                    trackReached50 = true;
                }
                if(this.currentTime >= trackDuration75 &&! trackReached75){
                    sendAudioEvent(audioObject, 'audio-seventyfive', 'Getting to Even');
                    console.log('audio-seventyfive');
                    trackReached75 = true;
                }
            };

            $('[data-player]').addClass('audiojs--is-playing');
        }
    });

    // Load in the first track
    // Messes up 'Currently playing track' if removed
    var audio = a[0];
    firstTrack = $('[data-track]').attr('data-src');
    firstTitle = $('[data-track]').attr('data-title');
    firstDuration = $('[data-track]').attr('data-duration');
    audio.load(firstTrack);

    // Create object for analytics.
    var audioObject = {
        title: firstTitle,
        mp3: firstTrack,
        duration: firstDuration,
        paused: false,
        buffer: true
    };
    console.log(audioObject);

    // Fire analytics.
    sendAudioEvent(audioObject, 'audio-buffer', 'Getting to Even');
    console.log('audio-buffer');

    $('#audiojs-title').text(firstTitle);

    // Load in a track on click
    $('[data-track]').click(function(e) {
        e.preventDefault();
        if( $(this).parents('[data-track-card]').hasClass('is-playing') ){
            audio.pause();

            $(this).parents('[data-track-card]').removeClass('is-playing active-track');
            console.log('paused!');
        }
        else {
            audio.load($(this).attr('data-src'));
            audio.play();
            $('#audiojs-title').text($(this).attr('data-title'));
            $('.js-audio-bar').addClass('is-visible');
            $(this).parents('[data-track-card]').siblings().removeClass('active-track is-playing is-paused');
            $(this).parents('[data-track-card]').addClass('active-track');
            $(this).parents('[data-track-card]').addClass('is-playing');
        }

    });

    $('.audiojs-play').click(function() {
        $('.active-track').addClass('is-playing').removeClass('is-paused');
    });

    $('.audiojs-pause').click(function() {
        $('.active-track').addClass('is-paused').removeClass('is-playing');
    });

    // Next & Previous Tracks
    $('#audiojs-next').click(function(){
        var next = $('.active-track').next();
        if (!next.length) next = $('[data-track-card]').first();
        next.addClass('active-track is-playing').siblings().removeClass('active-track is-playing is-paused');
        audio.load($('[data-track]', next).attr('data-src'));
        $('#audiojs-title').text($('[data-track]', next).attr('data-title'));
        audio.play();
    });

    $('#audiojs-prev').click(function(){
        var prev = $('.active-track').prev();
        if (!prev.length) prev = $('[data-track-card]').last();
        prev.addClass('active-track is-playing').siblings().removeClass('active-track is-playing is-paused');
        audio.load($('[data-track]', prev).attr('data-src'));
        $('#audiojs-title').text($('[data-track]', prev).attr('data-title'));
        audio.play();
    });

    $('[data-scrub]').click(function(){
        // Currently play track.
        var track = $('.active-track'),
            name = $('[data-track]', track).attr('data-title'),
            duration = $('[data-track]', track).attr('data-duration'),
            source = $('[data-track]', track).attr('data-src');

        // Create object for analytics.
        var audioObject = {
            title: name,
            mp3: source,
            duration: duration,
            paused: false,
            buffer: false
        };
        console.log(audioObject);

        // Fire analytics.
        sendAudioEvent(audioObject, 'audio-scrub', 'Getting to Even');
        console.log('audio-scrub');
    });


    /*******************
    Buttons
    *******************/
    $('.js-nav-btn').click(function(){
        $('.js-nav').toggleClass('is-visible');
        $('.js-nav-btn').toggleClass('is-close-btn');
        $('body').toggleClass('overflow-hidden');
    });

    $('.js-about-btn').click(function(){
        $('.js-about').addClass('is-visible');
         $('body').addClass('modal-is-visble');
    });

    $('.js-credits-btn').click(function(){
        $('.js-credits').addClass('is-visible');
        $('body').addClass('modal-is-visble');
    });

    $('.js-back-btn').click(function(){
        $('.js-credits, .js-about').removeClass('is-visible');
         $('body').removeClass('modal-is-visble');
    });

    $('.js-nav-item')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
            ){
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('body').removeClass('overflow-hidden');
                $('.js-nav').removeClass('is-visible');
                $('.js-nav-btn').removeClass('is-close-btn');
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    }
                    else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    




    /*******************
    Card UI
    *******************/
    //change this value if you want to change the speed of the scale effect
    var scaleSpeed = 0.3,
        animating = false; 
    
    //check the media query 
    var MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    $(window).on('resize', function(){
        MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    });

    function triggerAnimation(){
        if(MQ == 'desktop') {
            //if on desktop screen - animate sections
            (!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
        } else {
            //on mobile - remove the style added by jQuery 
            $('.gte-card').find('.gte-card-inner').removeAttr('style').find('.gte-card-half').removeAttr('style');
        }
    }
    
    function animateSection () {
        var scrollTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            windowWidth = $(window).width();
        
        $('.gte-card').each(function(){
            var actualBlock = $(this),
                offset = scrollTop - actualBlock.offset().top,
                scale = 1,
                translate = windowWidth/2+'px',
                opacity;

            if( offset >= -windowHeight && offset <= 0 ) {
                //move the two .gte-card-half toward the center - no scale/opacity effect
                scale = 1,
                opacity = 1,
                translate = (windowWidth * 0.5 * (- offset/windowHeight)).toFixed(0)+'px';

            } else if( offset > 0 && offset <= windowHeight ) {
                //the two .gte-card-half are in the center - scale the .gte-card-inner element and reduce the opacity
                translate = 0+'px',
                scale = (1 - ( offset * scaleSpeed/windowHeight)).toFixed(5),
                opacity = ( 1 - ( offset/windowHeight) ).toFixed(5);

            } else if( offset < -windowHeight ) {
                //section not yet visible
                scale = 1,
                translate = windowWidth/2+'px',
                opacity = 1;

            } else {
                //section not visible anymore
                opacity = 0;
            }
            
            
            //translate/scale section blocks
            scaleBlock(actualBlock.find('.gte-card-inner'), scale, opacity);

            var directionFirstChild = ( actualBlock.is(':nth-of-type(even)') ) ? '-': '+';
            var directionSecondChild = ( actualBlock.is(':nth-of-type(even)') ) ? '+': '-';
            if(actualBlock.find('.gte-card-half')) {
                translateBlock(actualBlock.find('.gte-card-half').eq(0), directionFirstChild+translate);
                translateBlock(actualBlock.find('.gte-card-half').eq(1), directionSecondChild+translate); 
            }
            //this is used to navigate through the sections
            ( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('is-visible') : actualBlock.removeClass('is-visible');      
        });
    }

    function translateBlock(elem, value) {
        var position = Math.ceil(Math.abs(value.replace('px', '')));

        elem.css({
            '-moz-transform': 'translateX(' + value + ')',
            '-webkit-transform': 'translateX(' + value + ')',
            '-ms-transform': 'translateX(' + value + ')',
            '-o-transform': 'translateX(' + value + ')',
            'transform': 'translateX(' + value + ')'
        });
    }

    function scaleBlock(elem, value, opac) {
        elem.css({
            '-moz-transform': 'scale(' + value + ')',
            '-webkit-transform': 'scale(' + value + ')',
            '-ms-transform': 'scale(' + value + ')',
            '-o-transform': 'scale(' + value + ')',
            'transform': 'scale(' + value + ')',
            'opacity': opac
        });
    }

    function nextSection() {
        if (!animating) {
            if ($('.gte-card.is-visible').next().length > 0) smoothScroll($('.gte-card.is-visible').next());
        }
    }

    function prevSection() {
        if (!animating) {
            var prevSection = $('.gte-card.is-visible');
            if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
                smoothScroll(prevSection);
            } else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
                smoothScroll(prevSection.prev('.gte-card'));
            }
        }
    }

    function smoothScroll(target){
        animating = true;
        $('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
    }

    //bind the animation to the window scroll event
    triggerAnimation();
    $(window).on('scroll', function(){
        triggerAnimation();
    });

    $(window).on('resize', function(){
        triggerAnimation();
    });

    $(document).keydown(function(event){
        if( event.which=='38' ) {
            prevSection();
            event.preventDefault();
        } else if( event.which=='40' ) {
            nextSection();
            event.preventDefault();
        }
    });

    

});