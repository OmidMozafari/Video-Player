const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const title = document.getElementById('title');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Playlist
const playlist = [
  'video/first.mp4',
  'video/second.mp4',
  'video/third.mp4',
  'video/fourth.mp4'
];

let currentIndex = 0;

// Load video
function loadVideo(index) {
  video.src = playlist[index];

  if (title) {
    const name = playlist[index].split('/').pop();
    title.textContent = name;
  }
}

// Initial load
loadVideo(currentIndex);

// Play / Pause
function togglePlayback() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play icon
function updatePlayIcon() {
  playBtn.innerHTML = video.paused
    ? '<i class="fa fa-play fa-2x"></i>'
    : '<i class="fa fa-pause fa-2x"></i>';
}

// Update progress bar and timestamp
function updateProgress() {
  if (!video.duration) return;

  const percent = (video.currentTime / video.duration) * 100;
  progress.value = percent;

  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);

  if (mins < 10) mins = `0${mins}`;
  if (secs < 10) secs = `0${secs}`;

  timestamp.textContent = `${mins}:${secs}`;
}

// Seek video
function setProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// Stop video
function stopPlayback() {
  video.currentTime = 0;
  video.pause();
}

// Next video
function nextVideo() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadVideo(currentIndex);
  video.play();
}

// Previous video
function prevVideo() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadVideo(currentIndex);
  video.play();
}

// Keyboard controls
function handleKeydown(e) {
  if (e.key === ' ') {
    e.preventDefault();
    togglePlayback();
  }

  if (e.key === 'ArrowRight') video.currentTime += 5;
  if (e.key === 'ArrowLeft') video.currentTime -= 5;
}

// Auto play next when ended
video.addEventListener('ended', nextVideo);

// Events
video.addEventListener('click', togglePlayback);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', togglePlayback);
stopBtn.addEventListener('click', stopPlayback);
progress.addEventListener('input', setProgress);

if (nextBtn) nextBtn.addEventListener('click', nextVideo);
if (prevBtn) prevBtn.addEventListener('click', prevVideo);

document.addEventListener('keydown', handleKeydown);
