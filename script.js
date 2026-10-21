/* =========================================================
   PAGE TRANSITIONS
========================================================= */

document.querySelectorAll("a").forEach(function (link) {

    // only apply to internal page links (same site), skip anchors/external links
    const isSameSite = link.hostname === window.location.hostname;
    const isAnchor = link.getAttribute("href") && link.getAttribute("href").startsWith("#");

    if (isSameSite && !isAnchor) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const destination = this.href;

            document.body.classList.add("fade-out");

            setTimeout(function () {

                window.location.href = destination;

            }, 400);

        });

    }

});


/* =========================================================
   REASONS I LOVE YOU
========================================================= */

const reasonButton = document.getElementById("reasonButton");
const reasonText = document.getElementById("reasonText");

// Placeholder reasons 
const reasons = [
    "The way you smile makes my whole day brighter.",
    "You make even the most boring days fun.",
    "Your eyes are something I can look into forever.",
    "You somehow know how to always make me feel better.",
    "The way your eyes light up when you see me makes my heart melt.",
    "You're kind to me even when you don't have to.",
    "Pastel purple tulips will forever remind me of you.",
    "You always make your hugs feel so good.",
    "You never let me feel bad about myself.",
    "The way you tell me that you like something is so cute.",
    "You make ordinary moments feel like important memories.",
    "You support me through all my lowest moments.",
    "Your voice is as sweet as candy.",
    "You're effortlessly the funniest person I know.",
    "I love how excited you get over the smallest things.",
    "You make me want to always be a better person for you.",
    "I love the way you always listen to my interests.",
    "You make eating food with you taste so much better.",
    "Every colour in the world seems brighter with you.",
    "You're both perfect on the inside and outside.",
    "You're my Ae-sun to my Gwak-sik.",
    "I love the way you get me hard.",
    "I love the way you always play games with me.",
    "You always make me feel seen.",
    "I love the way you always ask me what I think too.",
    "You look beautiful no matter the day.",
    "Your presence is enough to light up my mood.",
    "You love the parts of me that I can't love about myself.", 
    "You care for me more then anyone else ever.",
    "I love how you're good at league.",
    "I love how appreciative you are of the things I do for you.",
    "I love the way you make creampies feel so good.",
    "You make playing 2v8 so fun.",
    "You make me excited for our future.",
    "You're like the light at the end of my tunnel.",
    "I love ending the day off by relaxing in call with you.",
    "You always make me look better in public.",
];

let reasonPool = [];
let lastReason = null;
let reasonsShown = 0;

function shuffle(array) {

    const copy = array.slice();

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}

function refillReasonPool() {

    reasonPool = shuffle(reasons);

    // avoid immediately repeating the last reason shown across a reshuffle
    if (reasonPool.length > 1 && reasonPool[reasonPool.length - 1] === lastReason) {

        const swapIndex = Math.floor(Math.random() * (reasonPool.length - 1));

        [reasonPool[reasonPool.length - 1], reasonPool[swapIndex]] =
            [reasonPool[swapIndex], reasonPool[reasonPool.length - 1]];

    }

    reasonsShown = 0;

}

if (reasonButton && reasonText) {

    reasonButton.addEventListener("click", function () {

        if (reasonPool.length === 0) {
            refillReasonPool();
        }

        const nextReason = reasonPool.pop();

        lastReason = nextReason;

        reasonsShown++;

        reasonText.classList.remove("pop");

        void reasonText.offsetWidth; // restart animation

        reasonText.textContent = nextReason;

        reasonText.classList.add("pop");

        reasonButton.textContent = "Give me another reason ♡";

    });

}


/* =========================================================
   HOME PAGE
========================================================= */

const loveButton = document.getElementById("loveButton");
const secretMessage = document.getElementById("secretMessage");
const enterButton = document.getElementById("enterButton");

if (loveButton) {

    loveButton.addEventListener("click", function () {

        if (secretMessage) {
            secretMessage.classList.add("show");
        }

        loveButton.textContent = "♡ I love you ♡";

        if (enterButton) {

            setTimeout(function () {

                enterButton.classList.remove("hidden");

            }, 700);

        }

    });

}


/* =========================================================
   PHOTO GALLERY
========================================================= */

const photoCards = document.querySelectorAll(".photo-card");

const imageModal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const closeModal = document.getElementById("closeModal");


photoCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const image = card.querySelector("img");

        if (!image || !imageModal || !modalImage) {
            return;
        }

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        imageModal.classList.add("show");

    });

});


if (closeModal) {

    closeModal.addEventListener("click", function () {

        imageModal.classList.remove("show");

    });

}


if (imageModal) {

    imageModal.addEventListener("click", function (event) {

        if (event.target === imageModal) {

            imageModal.classList.remove("show");

        }

    });

}


/* =========================================================
   OPEN WHEN LETTERS
========================================================= */

const envelopes = document.querySelectorAll(".envelope");

const letterModal = document.getElementById("letterModal");

const letterTitle = document.getElementById("letterTitle");

const letterMessage = document.getElementById("letterMessage");

const closeLetter = document.getElementById("closeLetter");


envelopes.forEach(function (envelope) {

    envelope.addEventListener("click", function () {

        const title = envelope.dataset.title;

        const message = envelope.dataset.message;

        if (!letterModal) {
            return;
        }

        if (letterTitle) {
            letterTitle.textContent = title;
        }

        if (letterMessage) {
            letterMessage.textContent = message;
        }

        letterModal.classList.add("show");

    });

});


if (closeLetter) {

    closeLetter.addEventListener("click", function () {

        letterModal.classList.remove("show");

    });

}


if (letterModal) {

    letterModal.addEventListener("click", function (event) {

        if (event.target === letterModal) {

            letterModal.classList.remove("show");

        }

    });

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }

    if (imageModal) {
        imageModal.classList.remove("show");
    }

    if (letterModal) {
        letterModal.classList.remove("show");
    }

});


/* =========================================================
   SURPRISE
========================================================= */

const surpriseButton = document.getElementById("surpriseButton");

const surpriseMessage = document.getElementById("surpriseMessage");

const confettiContainer = document.getElementById("confetti");


if (surpriseButton) {

    surpriseButton.addEventListener("click", function () {

        surpriseButton.classList.add("hidden");

        const clickText = document.querySelector(".click-text");

        if (clickText) {
            clickText.classList.add("hidden");
        }

        if (surpriseMessage) {

            surpriseMessage.classList.remove("hidden");

        }

        createConfetti();

    });

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    if (!confettiContainer) {
        return;
    }

    const numberOfPieces = 80;

    for (let i = 0; i < numberOfPieces; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti-piece");

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.width =
            Math.random() * 8 + 5 + "px";

        piece.style.height =
            Math.random() * 8 + 5 + "px";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(piece);

        setTimeout(function () {

            piece.remove();

        }, 5000);

    }


/* =========================================================
   MUSIC PLAYER
   All audio and cover files are in the repository root.
========================================================= */

const musicSongs = [
    {
        title: "Dreamscape",
        artist: "A song for you 💜",
        audio: "song1.mp3",
        cover: "song-cover-1.jpg"
    },
    {
        title: "Our Song",
        artist: "A little memory ♡",
        audio: "song2.mp3",
        cover: "song-cover-2.jpg"
    },
    {
        title: "Just Us",
        artist: "For my 예림",
        audio: "song3.mp3",
        cover: "song-cover-3.jpg"
    }
];

const musicAudio = document.getElementById("audioPlayer");
const musicCover = document.getElementById("albumCover");
const musicTitle = document.getElementById("songTitle");
const musicArtist = document.getElementById("songArtist");
const musicPlayButton = document.getElementById("playButton");
const musicPreviousButton = document.getElementById("previousButton");
const musicNextButton = document.getElementById("nextButton");
const musicProgress = document.getElementById("progressBar");
const musicCurrentTime = document.getElementById("currentTime");
const musicDuration = document.getElementById("duration");
const musicPlaylist = document.getElementById("playlist");
const musicFavouriteButton = document.getElementById("favouriteButton");
const musicShuffleButton = document.getElementById("shuffleButton");
const musicRepeatButton = document.getElementById("repeatButton");
const musicStatus = document.getElementById("playingIndicator");
const musicTrackCount = document.getElementById("trackCount");

let musicIndex = 0;
let musicShuffle = false;
let musicRepeat = false;
let musicFavourites = new Set();

function musicFormatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);

    return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function musicRenderPlaylist() {
    if (!musicPlaylist || !musicAudio) return;

    musicPlaylist.replaceChildren();

    musicSongs.forEach((song, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "playlist-track";

        const isCurrent = index === musicIndex;
        button.classList.toggle("active", isCurrent);

        const cover = document.createElement("img");
        cover.src = song.cover;
        cover.alt = "";
        cover.loading = "lazy";

        const details = document.createElement("span");
        details.className = "playlist-track-details";

        const title = document.createElement("strong");
        title.textContent = song.title;

        const artist = document.createElement("small");
        artist.textContent = song.artist;

        const symbol = document.createElement("span");
        symbol.className = "track-symbol";
        symbol.textContent = isCurrent && !musicAudio.paused ? "♫" : "♡";

        details.append(title, artist);
        button.append(cover, details, symbol);

        button.addEventListener("click", () => {
            musicLoadSong(index);
            musicPlay();
        });

        musicPlaylist.appendChild(button);
    });

    if (musicTrackCount) {
        musicTrackCount.textContent = `${musicSongs.length} songs ♡`;
    }
}

function musicUpdateFavourite() {
    if (!musicFavouriteButton) return;

    const active = musicFavourites.has(musicIndex);

    musicFavouriteButton.classList.toggle("is-favourite", active);
    musicFavouriteButton.setAttribute("aria-pressed", String(active));
    musicFavouriteButton.textContent = active ? "♥" : "♡";
}

function musicLoadSong(index) {
    if (!musicAudio || musicSongs.length === 0) return;

    musicIndex = (index + musicSongs.length) % musicSongs.length;

    const song = musicSongs[musicIndex];

    musicAudio.src = song.audio;
    musicCover.src = song.cover;
    musicCover.alt = `Cover art for ${song.title}`;
    musicTitle.textContent = song.title;
    musicArtist.textContent = song.artist;

    musicProgress.value = 0;
    musicCurrentTime.textContent = "0:00";
    musicDuration.textContent = "0:00";

    musicUpdateFavourite();
    musicRenderPlaylist();
}

async function musicPlay() {
    if (!musicAudio) return;

    try {
        await musicAudio.play();
    } catch (error) {
        console.error("Unable to play this song:", error);

        if (musicStatus) {
            musicStatus.textContent = "CHECK AUDIO FILE";
        }
    }
}

function musicTogglePlay() {
    if (!musicAudio) return;

    if (musicAudio.paused) {
        musicPlay();
    } else {
        musicAudio.pause();
    }
}

function musicNext() {
    if (musicSongs.length === 0) return;

    if (musicShuffle && musicSongs.length > 1) {
        let nextIndex;

        do {
            nextIndex = Math.floor(Math.random() * musicSongs.length);
        } while (nextIndex === musicIndex);

        musicLoadSong(nextIndex);
    } else {
        musicLoadSong(musicIndex + 1);
    }

    musicPlay();
}

function musicPrevious() {
    if (!musicAudio) return;

    if (musicAudio.currentTime > 3) {
        musicAudio.currentTime = 0;
        return;
    }

    musicLoadSong(musicIndex - 1);
    musicPlay();
}

/* Run only on the page that contains the music player. */

if (
    musicAudio &&
    musicCover &&
    musicTitle &&
    musicArtist &&
    musicPlayButton &&
    musicPreviousButton &&
    musicNextButton &&
    musicProgress
) {
    musicLoadSong(0);

    musicPlayButton.addEventListener("click", musicTogglePlay);
    musicNextButton.addEventListener("click", musicNext);
    musicPreviousButton.addEventListener("click", musicPrevious);

    musicAudio.addEventListener("play", () => {
        musicPlayButton.textContent = "Ⅱ";
        musicPlayButton.setAttribute("aria-label", "Pause music");

        if (musicStatus) musicStatus.textContent = "NOW PLAYING";

        musicRenderPlaylist();
    });

    musicAudio.addEventListener("pause", () => {
        musicPlayButton.textContent = "▶";
        musicPlayButton.setAttribute("aria-label", "Play music");

        if (musicStatus) musicStatus.textContent = "PAUSED";

        musicRenderPlaylist();
    });

    musicAudio.addEventListener("loadedmetadata", () => {
        musicDuration.textContent = musicFormatTime(musicAudio.duration);
    });

    musicAudio.addEventListener("timeupdate", () => {
        if (!Number.isFinite(musicAudio.duration) || musicAudio.duration <= 0) {
            return;
        }

        musicProgress.value =
            (musicAudio.currentTime / musicAudio.duration) * 100;

        musicCurrentTime.textContent =
            musicFormatTime(musicAudio.currentTime);

        musicDuration.textContent =
            musicFormatTime(musicAudio.duration);
    });

    musicProgress.addEventListener("input", () => {
        if (Number.isFinite(musicAudio.duration) && musicAudio.duration > 0) {
            musicAudio.currentTime =
                (Number(musicProgress.value) / 100) * musicAudio.duration;
        }
    });

    musicAudio.addEventListener("ended", () => {
        if (musicRepeat) {
            musicAudio.currentTime = 0;
            musicPlay();
        } else {
            musicNext();
        }
    });

    musicAudio.addEventListener("error", () => {
        if (musicStatus) musicStatus.textContent = "AUDIO FILE NOT FOUND";
    });

    musicCover.addEventListener("error", () => {
        musicCover.alt = "Cover image could not be loaded";
    });

    if (musicFavouriteButton) {
        musicFavouriteButton.addEventListener("click", () => {
            if (musicFavourites.has(musicIndex)) {
                musicFavourites.delete(musicIndex);
            } else {
                musicFavourites.add(musicIndex);
            }

            musicUpdateFavourite();
        });
    }

    if (musicShuffleButton) {
        musicShuffleButton.addEventListener("click", () => {
            musicShuffle = !musicShuffle;

            musicShuffleButton.classList.toggle("is-active", musicShuffle);
            musicShuffleButton.setAttribute(
                "aria-pressed",
                String(musicShuffle)
            );
        });
    }

    if (musicRepeatButton) {
        musicRepeatButton.addEventListener("click", () => {
            musicRepeat = !musicRepeat;

            musicRepeatButton.classList.toggle("is-active", musicRepeat);
            musicRepeatButton.setAttribute(
                "aria-pressed",
                String(musicRepeat)
            );
        });
    }

    musicRenderPlaylist();
}

