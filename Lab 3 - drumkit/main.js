const sounds = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
};

const channels = [[], [], [], []];
let recording = [false, false, false, false];
let startTime = [null, null, null, null];

addEventListener("keypress", (ev) => {
  const key = ev.key;
  const sound = sounds[key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
    const time = Date.now();

    for (let i = 0; i < recording.length; i++) {
      if (recording[i]) {
        channels[i].push({
          key: key,
          time: time - startTime[i],
        });
      }
    }
  }
});

function startRecording(channel) {
  recording[channel] = true;
  startTime[channel] = Date.now();
  channels[channel] = [];
}

function stopRecording(channel) {
  recording[channel] = false;
}

function playRecording(channel) {
  channels[channel].forEach((note) => {
    setTimeout(() => {
      const sound = sounds[note.key];
      sound.currentTime = 0;
      sound.play();
    }, note.time);
  });
}

function playAll() {
  for (let i = 0; i < channels.length; i++) {
    playRecording(i);
  }
}
