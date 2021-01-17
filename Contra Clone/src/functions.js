function resize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let wNorm = 256;
  let hNorm = 224;
  let canvas = document.querySelector('canvas');
  if (width / height > wNorm / hNorm) {
    width = wNorm / hNorm * height;
  } else {
    height = width / wNorm * hNorm
  }

  canvas.style.width = width + 'px';
  canvas.style.left = (window.innerWidth - width) / 2 + 'px';
}