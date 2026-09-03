/* =========================================================
   PAGE 06 — FINAL LETTER
   ========================================================= */

(() => {
    "use strict";

    const page = document.getElementById("finalPage");

    if (!page) return;

    const paragraphs = page.querySelectorAll(".final-paragraph");
    const signature = page.querySelector(".final-signature");

    const treeButton = page.querySelector(".final-tree-button");
    const treePopup = page.querySelector(".final-tree-popup");
    const treeClose = page.querySelector(".final-tree-popup-close");

    const monthsEl = page.querySelector("[data-countdown='months']");
    const daysEl = page.querySelector("[data-countdown='days']");
    const hoursEl = page.querySelector("[data-countdown='hours']");
    const minutesEl = page.querySelector("[data-countdown='minutes']");

    let countdownInterval = null;

    /* -------------------------------------------------------
       Paragraph reveal
       ------------------------------------------------------- */

    function revealParagraphs() {
        paragraphs.forEach((paragraph, index) => {
            setTimeout(() => {
                paragraph.classList.add("visible");
            }, 700 + index * 280);
        });

        const signatureDelay = 700 + paragraphs.length * 280 + 500;

        setTimeout(() => {
            if (signature) {
                signature.classList.add("visible");
            }
        }, signatureDelay);
    }

    /* -------------------------------------------------------
       Countdown
       ------------------------------------------------------- */

    function updateCountdown() {
        /*
         * The surprise becomes available on:
         * December 30, 2026 at 00:00 local time.
         */

        const target = new Date(2026, 11, 30, 0, 0, 0);
        const now = new Date();

        let difference = target.getTime() - now.getTime();

        if (difference <= 0) {
            difference = 0;
        }

        const totalMinutes = Math.floor(difference / 60000);

        const months = Math.floor(totalMinutes / (60 * 24 * 30.4375));

        const remainingAfterMonths =
            totalMinutes - Math.floor(months * 30.4375 * 24 * 60);

        const days = Math.floor(
            remainingAfterMonths / (24 * 60)
        );

        const remainingAfterDays =
            remainingAfterMonths - days * 24 * 60;

        const hours = Math.floor(
            remainingAfterDays / 60
        );

        const minutes = remainingAfterDays % 60;

        if (monthsEl) {
            monthsEl.textContent = String(months);
        }

        if (daysEl) {
            daysEl.textContent = String(days);
        }

        if (hoursEl) {
            hoursEl.textContent = String(hours).padStart(2, "0");
        }

        if (minutesEl) {
            minutesEl.textContent = String(minutes).padStart(2, "0");
        }
    }

    function startCountdown() {
        updateCountdown();

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(updateCountdown, 1000);
    }

    /* -------------------------------------------------------
       Tree Easter egg
       ------------------------------------------------------- */

    function openTreePopup() {
        if (!treePopup) return;

        treePopup.classList.add("open");
        startCountdown();
    }

    function closeTreePopup() {
        if (!treePopup) return;

        treePopup.classList.remove("open");
    }

    if (treeButton) {
        treeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            if (treePopup?.classList.contains("open")) {
                closeTreePopup();
            } else {
                openTreePopup();
            }
        });
    }

    if (treeClose) {
        treeClose.addEventListener("click", (event) => {
            event.stopPropagation();
            closeTreePopup();
        });
    }

    document.addEventListener("click", (event) => {
        if (!treePopup || !treePopup.classList.contains("open")) {
            return;
        }

        if (
            !treePopup.contains(event.target) &&
            !treeButton?.contains(event.target)
        ) {
            closeTreePopup();
        }
    });

    /* -------------------------------------------------------
       Tiny tree animation
       ------------------------------------------------------- */

    function wiggleTree() {
        if (!treeButton) return;

        treeButton.classList.remove("wiggle");

        /*
         * Force reflow so the animation can restart.
         */
        void treeButton.offsetWidth;

        treeButton.classList.add("wiggle");
    }

    function scheduleTreeWiggle() {
        const delay =
            Math.floor(Math.random() * 3000) + 5000;

        setTimeout(() => {
            wiggleTree();
            scheduleTreeWiggle();
        }, delay);
    }

    /* -------------------------------------------------------
       Page activation
       ------------------------------------------------------- */

    function startFinalPage() {
        paragraphs.forEach((paragraph) => {
            paragraph.classList.remove("visible");
        });

        if (signature) {
            signature.classList.remove("visible");
        }

        closeTreePopup();
        revealParagraphs();
        scheduleTreeWiggle();
    }

    /*
     * Page 05 can call this whenever Page 06 becomes active.
     */
    window.startFinalPage = startFinalPage;

    /*
     * If the page is already active when this script loads.
     */
    if (page.classList.contains("active")) {
        startFinalPage();
    }



/* -------------------------------------------------------
   Detect Page 06 activation
   ------------------------------------------------------- */

const pageObserver = new MutationObserver(() => {

    if (page.classList.contains("active")) {
        startFinalPage();
    }

});

pageObserver.observe(page, {
    attributes: true,
    attributeFilter: ["class"]
});

})();