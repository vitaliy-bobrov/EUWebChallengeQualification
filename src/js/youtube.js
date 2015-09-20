(function(document, window, undefined) {
  'use strict';

  var videoWrapper = document.querySelectorAll('.js-player-wrapper')[0];

  if (!videoWrapper) {
    return;
  }

  var playButton = document.querySelectorAll('.js-play-video')[0],
    youTubeVideoId = playButton.getAttribute('data-video-id'),
    lang = document.getElementsByTagName('html')[0].getAttribute('lang'),
    firstScriptTag = document.getElementsByTagName('script')[0],
    tag = document.createElement('script'),
    videoContainer = document.getElementById('youtube-video-container');

  // Async load Youtube iFrame API.
  tag.src = 'https://www.youtube.com/iframe_api';
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var playerSettings = {
      width: videoWrapper.offsetWidth,
      height: videoWrapper.offsetHeight,
      videoId: youTubeVideoId,
      playerVars: {
        'playsinline': 0,
        'hl': lang,
      },
      events: {
        'onReady': onPlayerReady,
      },
    },
    player = false;

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  playButton.addEventListener('click', function(event) {
    event.preventDefault();

    videoContainer.style.zIndex = 3;
    if (!player) {
      player = new window.YT.Player(videoContainer, playerSettings);
    }
    else {
      player.playVideo();
    }
  });

  // Fix iFrame size on resolution change.
  window.addEventListener('resize', function() {
    if (player) {
      player.setSize(videoWrapper.offsetWidth, videoWrapper.offsetHeight);
    }
  });
})(document, window, undefined);