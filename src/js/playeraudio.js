const SongsList = [
  { id: 1, songName: 'Kendrick Lamar – Big Shot.mp3', audiourl: 'audio/Kendrick Lamar – Big Shot.mp3', imgurl : 'images/cover3.png '},
  { id: 2, songName: 'XXXTENTACION  – SAD!.mp3', audiourl: 'audio/XXXTENTACION  – SAD!.mp3', imgurl : 'images/cover2.png '},
  { id: 3, songName: 'XXXTENTACION – NUMB.mp3', audiourl: 'audio/XXXTENTACION – NUMB.mp3', imgurl : 'images/cover1.png ' },
  { id: 4, songName: 'Fake.mp3', audiourl: 'audio/1111', imgurl : 'images/cover10.png '}
];

class AudioPlayer{
  constructor(){
    this.id = 0;
    this.song;
  }

  playkk(i){
    this.stopAudio();
    this.id = i;
    sessionStorage.setItem('song', this.id);
    initAudio(this.id);
    this.PlayList();
    this.PlayAudio();
  }
  PlayAudio() {
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

  Next(){
    this.id = sessionStorage.getItem('song');
    if (this.id == SongsList.length-1)
      this.id = 0;
    else
      this.id++;
    sessionStorage.setItem('song', this.id);
    this.PlayList();
  }

  Previous(){
    this.id = sessionStorage.getItem('song');
    if (this.id == 0)
      this.id = SongsList.length-1;
    else
      this.id--;
    sessionStorage.setItem('song', this.id);
    this.PlayList();
  }

  PlayList(){
    this.getID();
    var ids = this.id;
    ids++;
    if (this.id == SongsList.length-1)
      ids = 0;
    var list = document.getElementById('list');
    list.innerHTML = "Now play : " + SongsList[this.id].songName + "<br>"
    list.innerHTML += "next song : " + SongsList[ids].songName + "<br>"
    list.innerHTML += "<br>";
    list.innerHTML += "PlayList :" + "<br>";
    for (var i = 0; i < SongsList.length; i++)  {
      list.innerHTML += `<li class = ${i} + onclick =  audioplayer.playkk(${i})>` + SongsList[i].songName + "</li>"
    };
  }
}

var audioplayer =  new AudioPlayer();

window.onload = function() {
  audioplayer.getID();
  if (typeof SongsList[audioplayer.id] !== "undefined" && SongsList[audioplayer.id] !== null)
    alert(SongsList[audioplayer.id].songName);
  audioplayer.PlayList();
  }

  var tracker = $('.tracker');
  var volume = $('.volume');

   function initAudio(elem) {
    audioplayer.getID();
    $('.player .cover').css('background-image','url('+SongsList[audioplayer.id].imgurl+')');;
    audioplayer.song = new Audio(SongsList[audioplayer.id].audiourl);
    audioplayer.song.addEventListener('timeupdate',function (){
    var curtime = parseInt(audioplayer.song.currentTime, 10);
    tracker.slider('value', curtime);
    tracker.slider("option", "max", audioplayer.song.duration);
    });
  }


  $('.play').click(function (e) {
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
    tracker.slider("option", "max", audioplayer.song.duration);
    e.preventDefault();
    audioplayer.PlayAudio();
  });

  $('.pause').click(function (e) {
    e.preventDefault();
    audioplayer.stopAudio();
    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
  });

  $('.fwd').click(function (e) {
    audioplayer.Next();
    e.preventDefault();
    audioplayer.stopAudio();
    tracker.slider("option", "max", audioplayer.song.duration);
    var next = $('.playlist li.active').next();
    if (next.length == 0) {
      next = $('.playlist li:first-child');
    }
    initAudio(next);
	  audioplayer.PlayAudio();
  });

  $('.rew').click(function (e) {
    audioplayer.Previous();
    e.preventDefault();
    audioplayer.stopAudio();
    tracker.slider("option", "max", audioplayer.song.duration);
    var prev = $('.playlist li.active').prev();
    if (prev.length == 0) {
      prev = $('.playlist li:last-child');
    }
    initAudio(prev);
    audioplayer.PlayAudio();
  });

  $('.pl').click(function (e) {
    e.preventDefault();
    $('.playlist').fadeIn(300);
  });

  $('.playlist li').click(function () {
    //alert('');
    audioplayer.id = SongsList[i].audiourl;
    alert(audioplayer.id);
    audioplayer.stopAudio();
    initAudio($(this));
  });

  initAudio($('.playlist li:first-child'));
  audioplayer.song.volume = 0.8;
  volume.slider({
  range: 'min',
  min: 1,
  max: 100,
  value: 80,
  start: function(event,ui) {},
  slide: function(event, ui) {
    audioplayer.song.volume = ui.value / 100;
  },
    stop: function(event,ui) {},
  });

  tracker.slider({
    range: 'min',
    min: 0, max: 10,
    start: function(event,ui) {},
    slide: function(event, ui) {
      audioplayer.song.currentTime = ui.value;
    },
      stop: function(event,ui) {}
  });

