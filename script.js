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

}