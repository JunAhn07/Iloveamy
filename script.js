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
const reasonCounter = document.getElementById("reasonCounter");

// Placeholder reasons — edit this list with your own! ♡
const reasons = [
    "The way you laugh at your own jokes before you even finish them.",
    "You make even boring days feel like an adventure.",
    "Your smile is honestly my favourite thing to look at.",
    "You always know exactly what to say to make me feel better.",
    "The way your eyes light up when you talk about things you love.",
    "You're kind to people even when no one's watching.",
    "Pastel purple tulips will forever remind me of you.",
    "You give the best hugs, no contest.",
    "You never let me take myself too seriously.",
    "The little way you scrunch your nose when you're concentrating.",
    "You make ordinary moments feel like core memories.",
    "You believe in me even when I don't believe in myself.",
    "Your voice is the most calming sound in the world to me.",
    "You're effortlessly the funniest person I know.",
    "I love how excited you get over the smallest things.",
    "You make me want to be a better person, every single day."
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

        if (reasonCounter) {

            reasonCounter.textContent =
                reasonsShown + " of " + reasons.length;

        }

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

}
