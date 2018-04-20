jQuery(document).ready(function() {
    var song;
    var tracker = $('.tracker');
    var volume = $('.volume');

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var title = elem.text();
        var cover = elem.attr('cover');
        var cover = elem.attr('cover');
        var artist = elem.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        $('.player .cover').css('background-image','url(images/' + cover+')');;

        song = new Audio('audio/' + url);
        song.addEventListener('timeupdate',function (){
            var curtime = parseInt(song.currentTime, 10);
            tracker.slider('value', curtime);
        });

        $('.playlist li').removeClass('active');
        elem.addClass('active');
    }
    function playAudio() {
        song.play();

        tracker.slider("option", "max", song.duration);

        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
    }
    function stopAudio() {
        song.pause();

        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
    }

    $('.play').click(function (e) {
        e.preventDefault();

        playAudio();
    });

    $('.pause').click(function (e) {
        e.preventDefault();

        stopAudio();
    });

    $('.fwd').click(function (e) {
        e.preventDefault();
        stopAudio();

        var next = $('.playlist li.active').next();
        if (next.length == 0) {
            next = $('.playlist li:first-child');
        }
        initAudio(next);
		playAudio();
    });

    $('.rew').click(function (e) {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('.playlist li:last-child');
        }
        initAudio(prev);
    });

    $('.pl').click(function (e) {
        e.preventDefault();

        $('.playlist').fadeIn(300);
    });

    $('.playlist li').click(function () {
        stopAudio();
        initAudio($(this));
    });

    initAudio($('.playlist li:first-child'));

    song.volume = 0.8;

    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 80,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.volume = ui.value / 100;
        },
        stop: function(event,ui) {},
    });

    tracker.slider({
        range: 'min',
        min: 0, max: 10,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.currentTime = ui.value;
        },
        stop: function(event,ui) {}
    });
});
var id =0;
window.onload = function() {
    var items = document.getElementsByTagName('li'), ids = [];
    for (var i = 0; i < items.length; i++) ids.push(items[i].id);
	id = sessionStorage.getItem('song');
	if (typeof ids[id] !== "undefined" && ids[id] !== null)
	alert(ids[id]);
	sessionStorage.setItem('song', 0);
}

function next(){
	id++;
	if (id >= 3)
		id = 0;
	sessionStorage.setItem('song', id);
}
function post(){
	id--;
	if (id < 0)
		id = 2;
	sessionStorage.setItem('song', id);
}

