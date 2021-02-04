import contra from './index';
import startScreen from './startscreen';

export default function gameComplite() {
  contra.pjs.game.stop();

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const video = document.createElement('video');
  video.src = './assets/video/end.mp4';

  video.autoPlay = true;
  video.loop = false;
  const videoContainer = {
    video,
    ready: false,
  };

  const updateCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (videoContainer !== undefined && videoContainer.ready) {
      ctx.drawImage(videoContainer.video, 0, 0, 256, 224);
    }
    if (videoContainer.video.paused) {
      contra.pjs.game.resume();
      startScreen(contra, 1, contra.startGame);
    } else {
      requestAnimationFrame(updateCanvas);
    }
  };

  const readyToPlayVideo = () => {
    videoContainer.video.play();
    videoContainer.ready = true;
    requestAnimationFrame(updateCanvas);
  };

  video.oncanplay = readyToPlayVideo;
}
