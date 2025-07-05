const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const progressBarContainer = document.getElementById('progressBarContainer');
const progressBar = document.getElementById('progressBar');
const progressThumb = document.getElementById('progressThumb');
const timeDisplay = document.getElementById('timeDisplay');

function updatePlayPauseIcon() {
    if (audioPlayer.paused) {
        playPauseButton.innerHTML = `
            <div class="play-pause-bar bar-left"></div>
            <div class="play-pause-bar bar-right"></div>
        `;
    } else {
        playPauseButton.innerHTML = `
            <div class="play-pause-bar bar-left"></div>
        `;
    }
}

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play()
            .then(() => {
                updatePlayPauseIcon();
            })
            .catch(error => {
                console.error("Error playing audio:", error);
                updatePlayPauseIcon();
            });
    } else {
        audioPlayer.pause();
        updatePlayPauseIcon();
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    if (!isNaN(duration)) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        progressThumb.style.left = `${progressPercent}%`;
    }
});

progressBarContainer.addEventListener('click', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioPlayer.duration;

    if (!isNaN(duration)) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
});

audioPlayer.addEventListener('ended', () => {
    audioPlayer.currentTime = 0;
    updatePlayPauseIcon();
    progressBar.style.width = '0%';
    progressThumb.style.left = '0%';
    timeDisplay.textContent = '0:00';
});

audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    updatePlayPauseIcon();
});

audioPlayer.addEventListener('error', (e) => {
    console.error("Audio loading error:", e);
    timeDisplay.textContent = "Loading Error!";
});

document.addEventListener('DOMContentLoaded', () => {
    updatePlayPauseIcon();
});