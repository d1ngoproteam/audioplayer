const songsList = [
  { id: 1, songName: 'Kendrick Lamar – Big Shot.mp3', audiourl: 'audio/Kendrick Lamar – Big Shot.mp3', imgurl : 'images/cover3.png '},
  { id: 2, songName: 'XXXTENTACION  – SAD!.mp3', audiourl: 'audio/XXXTENTACION  – SAD!.mp3', imgurl : 'images/cover2.png '},
  { id: 3, songName: 'XXXTENTACION – NUMB.mp3', audiourl: 'audio/XXXTENTACION – NUMB.mp3', imgurl : 'images/cover1.png ' },
  { id: 4, songName: 'Fake.mp3', audiourl: 'audio/1111', imgurl : 'images/cover10.png '}
];

class audioplayer{
  constructor(){
    this.id = 0;
    this.song;
  }

  playAudio() {
    this.song.play();
    this.song.onerror = function(){alert('Аудиозапись не найдена')};
  }

  stopAudio() {
    this.song.pause();
  }

  getID(){
    if (sessionStorage.getItem('song') == "undefined" || sessionStorage.getItem('song') == null)
      this.id = 0;
    else
      this.id = sessionStorage.getItem('song');
  }

  next(){
    this.id = sessionStorage.getItem('song');
    if (this.id == songsList.length-1)
      this.id = 0;
    else
      this.id++;
    sessionStorage.setItem('song', this.id);
    this.Playlist();
  }

  previous(){
    this.id = sessionStorage.getItem('song');
    if (this.id == 0)
      this.id = songsList.length-1;
    else
      this.id--;
    sessionStorage.setItem('song', this.id);
    this.Playlist();
  }

  Playlist(){
    this.id = sessionStorage.getItem('song');
    var ids = this.id;
    ids++;
    if (this.id == songsList.length-1)
      ids = 0;
    var list = document.getElementById('list');
    list.innerHTML = "Now play : " + songsList[this.id].songName + "<br>"
    list.innerHTML += "next song : " + songsList[ids].songName + "<br>"
    list.innerHTML += "<br>";
    list.innerHTML += "Playlist :" + "<br>";
    for (var i = 0; i < songsList.length; i++)  {
      list.innerHTML += songsList[i].songName + "<br>"
    };
  }
}

var a =  new audioplayer();

window.onload = function() {
  a.getID();
  if (typeof songsList[a.id] !== "undefined" && songsList[a.id] !== null)
    alert(songsList[a.id].songName);
  a.Playlist();
  }

jQuery(document).ready(function() {
  var tracker = $('.tracker');
  var volume = $('.volume');

  function initAudio(elem) {

    var url = elem.attr('audiourl');
    var title = elem.text();
    var cover = elem.attr('cover');
    var artist = elem.attr('artist');
    a.getID();
    $('.player .title').text(title);
    $('.player .artist').text(artist);
    $('.player .cover').css('background-image','url('+songsList[a.id].imgurl+')');;
    a.song = new Audio(songsList[a.id].audiourl);
    a.song.addEventListener('timeupdate',function (){
    var curtime = parseInt(a.song.currentTime, 10);
    tracker.slider('value', curtime);
    });

    $('.playlist li').removeClass('active');
    elem.addClass('active');
  }


  $('.play').click(function (e) {
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
    tracker.slider("option", "max", a.song.duration);
    e.preventDefault();
    a.playAudio();
  });

  $('.pause').click(function (e) {
    e.preventDefault();
    a.stopAudio();
    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
  });

  $('.fwd').click(function (e) {
    e.preventDefault();
    a.stopAudio();
    tracker.slider("option", "max", a.song.duration);
    var next = $('.playlist li.active').next();
    if (next.length == 0) {
      next = $('.playlist li:first-child');
    }
    initAudio(next);
	  a.playAudio();
  });

  $('.rew').click(function (e) {
    e.preventDefault();
    a.stopAudio();
    tracker.slider("option", "max", a.song.duration);
    var prev = $('.playlist li.active').prev();
    if (prev.length == 0) {
      prev = $('.playlist li:last-child');
    }
    initAudio(prev);
    a.playAudio();
  });

  $('.pl').click(function (e) {
    e.preventDefault();
    $('.playlist').fadeIn(300);
  });

  $('.playlist li').click(function () {
    a.stopAudio();
    initAudio($(this));
  });

  initAudio($('.playlist li:first-child'));
  a.song.volume = 0.8;
  volume.slider({
  range: 'min',
  min: 1,
  max: 100,
  value: 80,
  start: function(event,ui) {},
  slide: function(event, ui) {
    a.song.volume = ui.value / 100;
  },
    stop: function(event,ui) {},
  });

  tracker.slider({
    range: 'min',
    min: 0, max: 10,
    start: function(event,ui) {},
    slide: function(event, ui) {
      a.song.currentTime = ui.value;
    },
      stop: function(event,ui) {}
  });
});
