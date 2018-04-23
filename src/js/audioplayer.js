jQuery(document).ready(function() {
  var song;
  var tracker = $('.tracker');
  var volume = $('.volume');

  function initAudio(elem) {
    var url = elem.attr('audiourl');
    var title = elem.text();
    var cover = elem.attr('cover');
    var artist = elem.attr('artist');
    if (sessionStorage.getItem('song') == "undefined" || sessionStorage.getItem('song') == null)
    var id = 0;
    else
    var id = sessionStorage.getItem('song');
    $('.player .title').text(title);
    $('.player .artist').text(artist);
    $('.player .cover').css('background-image','url('+songsList[id].imgurl+')');;
    song = new Audio(songsList[id].audiourl);
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
    playAudio();
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

var songsList = [
    { id: 1, songName: 'Kendrick Lamar – Big Shot.mp3', audiourl: 'audio/Kendrick Lamar – Big Shot.mp3', imgurl : 'images/cover3.jpg '},
    { id: 2, songName: 'XXXTENTACION  – SAD!.mp3', audiourl: 'audio/XXXTENTACION  – SAD!.mp3', imgurl : 'images/cover2.jpg '},
    { id: 3, songName: 'XXXTENTACION – NUMB.mp3', audiourl: 'audio/XXXTENTACION – NUMB.mp3', imgurl : 'images/cover1.jpg ' }
];

window.onload = function() {
    if (sessionStorage.getItem('song') == "undefined" || sessionStorage.getItem('song') == null)
    var id = 0;
    else
    var id = sessionStorage.getItem('song');
    if (typeof songsList[id] !== "undefined" && songsList[id] !== null)
    alert(songsList[id].songName);
    sessionStorage.setItem('song', 0);
    todolist();
    playtolist();
}

function next(){
  var id = sessionStorage.getItem('song');
  if (id == songsList.length-1)
    id = 0;
  else
    id++;
  sessionStorage.setItem('song', id);
  todolist();
  playtolist();
}

function post(){
  var id = sessionStorage.getItem('song');
  if (id == 0)
    id = songsList.length-1;
  else
    id--;
  sessionStorage.setItem('song', id);
  todolist();
  playtolist();
}

function todolist(){
  var id = sessionStorage.getItem('song');
  var ids = id;
  ids++;
  if (id == songsList.length-1)
    ids = 0;
  var list = document.getElementById('list');
  list.innerHTML = "Now play : " + songsList[id].songName + "<br>"
  list.innerHTML += "next song : " + songsList[ids].songName + "<br>"
}

function playtolist(){
  var playforlist = document.getElementById('playforlist');
  list.innerHTML += "<br>";
  list.innerHTML += "Playlist :" + "<br>";
  for (var i = 0; i < songsList.length; i++)  {
    list.innerHTML += songsList[i].songName + "<br>"
  };
}
