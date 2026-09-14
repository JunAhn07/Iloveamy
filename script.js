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
   REASONS WHY I LOVE YOU
========================================================= */

const reasonButton = document.getElementById("reasonButton");

const reasonText = document.getElementById("reasonText");

const reasonNumber = document.getElementById("reasonNumber");


const reasons = [

    "I love how you can make even an ordinary day feel special.",

    "I love your smile and how it can instantly make me happier.",

    "I love how beautiful you are, inside and out.",

    "I love talking to you, even when we're talking about the most random things.",

    "I love how comfortable I feel when I'm with you.",

    "I love the little things you do that you probably don't even realize I notice.",

    "I love how you can make me laugh when I need it the most.",

    "I love how caring and thoughtful you are.",

    "I love hearing about your day and everything that's on your mind.",

    "I love every memory we've made together.",

    "I love the way you make me feel loved.",

    "I love that I can be myself around you.",

    "I love how special you make me feel.",

    "I love your personality and all the little things that make you you.",

    "I love how much happier my life feels with you in it.",

    "I love that even when we're apart, you still feel close to my heart.",

    "I love seeing you happy.",

    "I love making you smile.",

    "I love all the little moments we share.",

    "I love you simply because you're you. ♡"

];


let currentReason = 0;


if (reasonButton && reasonText && reasonNumber) {

    reasonButton.addEventListener("click", function () {

        currentReason++;

        /*
         * Once we reach the end of the list,
         * start again from the beginning.
         */

        if (currentReason >= reasons.length) {

            currentReason = 0;

        }

        reasonNumber.textContent =
            `Reason #${currentReason + 1}`;

        reasonText.classList.remove("reason-changing");

        /*
         * Force the animation to restart.
         */

        void reasonText.offsetWidth;

        reasonText.textContent =
            reasons[currentReason];

        reasonText.classList.add("reason-changing");

    });

}

}
