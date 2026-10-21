/* =========================================================
   MUSIC PLAYER
========================================================= */

// Edit this list with your own song(s) and picture(s) ♡
// Put the mp3 in a "music" folder and the picture in your "images" folder.
// Avoid spaces in file names (use hyphens), and match the case exactly.
const songs = [
    {
        title: "Song title",
        artist: "Artist name",
        src: "music/song1.mp3",
        cover: "images/song-cover.jpg"
    }
];

(function () {

    const audio = document.getElementById("audio");

    if (!audio) {
        return;
    }

    const player = document.querySelector(".player");
    const cover = document.getElementById("cover");
    const titleEl = document.getElementById("songTitle");
    const artistEl = document.getElementById("songArtist");
    const progress = document.getElementById("progress");
    const currentTimeEl = document.getElementById("currentTime");
    const durationEl = document.getElementById("duration");
    const playButton = document.getElementById("playButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const shuffleButton = document.getElementById("shuffleButton");
    const repeatButton = document.getElementById("repeatButton");
    const volume = document.getElementById("volume");
    const likeButton = document.getElementById("likeButton");

    let index = 0;
    let shuffleOn = false;
    let dragging = false;

    function formatTime(seconds) {

        if (!isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return minutes + ":" + (secs < 10 ? "0" : "") + secs;

    }

    function setFill(slider) {

        const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;

        slider.style.setProperty("--fill", percent + "%");

    }

    function loadSong(i) {

        index = i;

        const song = songs[i];

        audio.src = song.src;
        cover.src = song.cover;
        cover.style.visibility = "visible";
        titleEl.textContent = song.title;
        artistEl.textContent = song.artist;

        progress.value = 0;
        setFill(progress);
        currentTimeEl.textContent = "0:00";
        durationEl.textContent = "0:00";

    }

    function changeSong(i) {

        loadSong(i);

        audio.play().catch(function () {});

    }

    function nextIndex() {

        if (shuffleOn && songs.length > 1) {

            let n;

            do {
                n = Math.floor(Math.random() * songs.length);
            } while (n === index);

            return n;

        }

        return (index + 1) % songs.length;

    }

    function prevIndex() {

        return (index - 1 + songs.length) % songs.length;

    }

    playButton.addEventListener("click", function () {

        if (audio.paused) {
            audio.play().catch(function () {});
        } else {
            audio.pause();
        }

    });

    nextButton.addEventListener("click", function () {

        changeSong(nextIndex());

    });

    prevButton.addEventListener("click", function () {

        if (audio.currentTime > 3 || songs.length === 1) {
            audio.currentTime = 0;
        } else {
            changeSong(prevIndex());
        }

    });

    shuffleButton.addEventListener("click", function () {

        shuffleOn = !shuffleOn;

        shuffleButton.classList.toggle("active", shuffleOn);
        shuffleButton.setAttribute("aria-pressed", shuffleOn);

    });

    repeatButton.addEventListener("click", function () {

        audio.loop = !audio.loop;

        repeatButton.classList.toggle("active", audio.loop);
        repeatButton.setAttribute("aria-pressed", audio.loop);

    });

    likeButton.addEventListener("click", function () {

        likeButton.classList.toggle("liked");

    });

    audio.addEventListener("play", function () {
        player.classList.add("is-playing");
    });

    audio.addEventListener("pause", function () {
        player.classList.remove("is-playing");
    });

    audio.addEventListener("ended", function () {

        player.classList.remove("is-playing");

        if (songs.length > 1) {
            changeSong(nextIndex());
        } else {
            audio.currentTime = 0;
        }

    });

    audio.addEventListener("loadedmetadata", function () {

        durationEl.textContent = formatTime(audio.duration);

    });

    audio.addEventListener("timeupdate", function () {

        if (!audio.duration || dragging) {
            return;
        }

        progress.value = (audio.currentTime / audio.duration) * 100;
        setFill(progress);
        currentTimeEl.textContent = formatTime(audio.currentTime);

    });

    progress.addEventListener("pointerdown", function () {
        dragging = true;
    });

    document.addEventListener("pointerup", function () {
        dragging = false;
    });

    progress.addEventListener("input", function () {

        if (!audio.duration) {
            return;
        }

        audio.currentTime = (progress.value / 100) * audio.duration;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        setFill(progress);

    });

    volume.addEventListener("input", function () {

        audio.volume = volume.value / 100;
        setFill(volume);

    });

    cover.addEventListener("error", function () {

        cover.style.visibility = "hidden";

    });

    audio.volume = volume.value / 100;
    setFill(volume);
    loadSong(0);

})();
