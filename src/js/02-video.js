import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const currentPlaybackTime = data.seconds;
  //   console.log(currentPlaybackTime);
  setCurrentTime(currentPlaybackTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

const setCurrentTime = time => {
  localStorage.setItem(STORAGE_KEY, time);
};

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // alert("The time was less than 0 or greater than the video’s duration");
        break;

      default:
        // alert("Some other error occurred");
        break;
    }
  });
