const app = () => {
  const sound = document.querySelector('.sound');
  const play = document.querySelector('.play');
  const replay = document.querySelector('.replay');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');
  const sounds = document.querySelectorAll('.sound-picker button');
  const durations = document.querySelectorAll('.duration-selector button');
  const timeDisplay = document.querySelector('.time-display');

  // Get the circumference of the SVG circle
  const outlineLength = outline.getTotalLength();

  // Set the default duration
  let currentDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Stop and play sounds
  const toggleSound = (sound) => {
    if (sound.paused) {
      sound.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      sound.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  const reset = (sound) => {
    sound.currentTime = 0;
  };

  replay.addEventListener('click', () => {
    reset(sound);
  });

  // Select sound
  sounds.forEach((el) => {
    el.addEventListener('click', () => {
      sound.src = el.dataset.sound;
      video.src = el.dataset.video;
      toggleSound(sound);
    });
  });

  // Select duration
  // TODO: Reset time when a new duration is selected
  durations.forEach((el) => {
    el.addEventListener('click', () => {
      currentDuration = el.dataset.time;
      timeDisplay.textContent = `${Math.floor(currentDuration / 60)}:${Math.floor(
        currentDuration % 60
      )}0`;
    });
  });

  // Animate the circle
  sound.ontimeupdate = () => {
    const { currentTime } = sound;
    const elapsedTime = currentDuration - currentTime;
    const seconds = Math.floor(elapsedTime % 60);
    const minutes = Math.floor(elapsedTime / 60);

    // Animate the elapsed time
    const progress = outlineLength - (currentTime / currentDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    console.log(currentDuration);

    // Animate time display
    if (seconds < 10) {
      timeDisplay.textContent = `${minutes}:0${seconds}`;
    } else {
      timeDisplay.textContent = `${minutes}:${seconds}`;
    }

    if (currentTime >= currentDuration) {
      sound.pause();
      sound.currentTime = 0;
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // Play sound
  play.addEventListener('click', () => {
    toggleSound(sound);
  });
};

app();
