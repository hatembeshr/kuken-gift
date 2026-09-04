/* =========================================================
   PAGE 07 — BIRTHDAY
   Core only:
   Intro → Reveal → Celebration → Cake/Candle

   Gift + Voice:
   birthday-gift.js
========================================================= */

(() => {
    "use strict";


    /* =====================================================
       PAGE
    ===================================================== */

    const page =
        document.getElementById("birthdayPage");

    if (!page) {
        console.error(
            "[Birthday] #birthdayPage not found."
        );

        return;
    }


    /* =====================================================
       SCENES
    ===================================================== */

    const intro =
        document.getElementById("birthdayIntro");

    const reveal =
        document.getElementById("birthdayReveal");

    const celebration =
        document.getElementById("birthdayCelebration");


    const scenes = [
        intro,
        reveal,
        celebration
    ].filter(Boolean);


    /* =====================================================
       BUTTONS
    ===================================================== */

    const startButton =
        document.getElementById("birthdayStart");

    const celebrateButton =
        document.getElementById("birthdayCelebrate");


    /* =====================================================
       CAKE / CANDLE
    ===================================================== */

    const cakeArea =
        document.getElementById("birthdayCakeArea");

    const birthdayCandle =
        document.getElementById("birthdayCandle");

    const birthdayFlame =
        document.getElementById("birthdayFlame");

    const afterCake =
        document.getElementById("birthdayAfterCake");


    /* =====================================================
       CONFETTI
    ===================================================== */

    const confetti =
        document.getElementById("birthdayConfetti");


    /* =====================================================
       SCENE CONTROL
    ===================================================== */

    function showScene(scene) {

        if (!scene) {
            return;
        }

        scenes.forEach((item) => {
            item.classList.remove("active");
        });

        scene.classList.add("active");
    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti(amount = 80) {

        if (!confetti) {
            return;
        }

        confetti.innerHTML = "";


        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");


            piece.className =
                "birthday-confetti-piece";


            piece.style.left =
                `${Math.random() * 100}%`;


            piece.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 300}px`
            );


            piece.style.animationDelay =
                `${Math.random() * 0.6}s`;


            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            confetti.appendChild(piece);
        }


        window.setTimeout(() => {

            confetti.innerHTML = "";

        }, 4000);
    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetBirthday() {

        showScene(intro);


        if (afterCake) {

            afterCake.classList.remove(
                "visible"
            );
        }


        if (cakeArea) {

            cakeArea.classList.remove(
                "blown"
            );
        }


        if (birthdayCandle) {

            birthdayCandle
                .parentElement
                ?.classList.remove(
                    "candle-visible",
                    "extinguishing"
                );
        }


        if (birthdayFlame) {

            birthdayFlame.classList.remove(
                "extinguished"
            );
        }


        if (confetti) {

            confetti.innerHTML = "";
        }
    }


    /* =====================================================
       CAKE ANIMATION
    ===================================================== */

    function replayCakeAnimation() {

        const cake =
            document.querySelector(
                ".birthday-cake-svg"
            );


        if (!cake) {
            return;
        }


        const originalSrc =
            cake.getAttribute("src");


        if (!originalSrc) {
            return;
        }


        /* RESET CANDLE */

        if (birthdayCandle) {

            birthdayCandle
                .parentElement
                ?.classList.remove(
                    "candle-visible",
                    "extinguishing"
                );
        }


        if (birthdayFlame) {

            birthdayFlame.classList.remove(
                "extinguished"
            );
        }


        /* RESET CAKE */

        cake.classList.remove(
            "cake-visible"
        );

        cake.src = "";


        /*
         * Restart the SVG animation
         * by giving the image a fresh URL.
         */

        requestAnimationFrame(() => {

            cake.src =
                `${originalSrc}?animation=${Date.now()}`;

            cake.classList.add(
                "cake-visible"
            );
        });


        /* SHOW CANDLE */

        window.setTimeout(() => {

            if (birthdayCandle) {

                birthdayCandle
                    .parentElement
                    ?.classList.add(
                        "candle-visible"
                    );
            }


            if (birthdayFlame) {

                birthdayFlame.classList.remove(
                    "extinguished"
                );
            }

        }, 5200);
    }


    /* =====================================================
       PAGE START
    ===================================================== */

    function startBirthdayPage() {

        resetBirthday();

        console.log(
            "[Birthday] Page 07 ready."
        );
    }


    /* =====================================================
       INTRO → REVEAL
    ===================================================== */

    startButton?.addEventListener(
        "click",
        () => {

            showScene(reveal);

            createConfetti(60);

        }
    );


    /* =====================================================
       REVEAL → CELEBRATION
    ===================================================== */

    celebrateButton?.addEventListener(
        "click",
        () => {

            showScene(celebration);

            replayCakeAnimation();

            createConfetti(100);

        }
    );


    /* =====================================================
       FLAME CLICK
    ===================================================== */

    birthdayFlame?.addEventListener(
        "click",
        () => {

            /*
             * Don't allow the flame to be
             * clicked twice.
             */

            if (
                birthdayFlame.classList.contains(
                    "extinguished"
                )
            ) {

                return;
            }


            const candleWrap =
                birthdayCandle?.parentElement;


            /* EXTINGUISH FLAME */

            birthdayFlame.classList.add(
                "extinguished"
            );


            /* CANDLE + SMOKE */

            if (candleWrap) {

                candleWrap.classList.add(
                    "extinguishing"
                );
            }


            /* CELEBRATION */

            createConfetti(80);


            /* SHOW AFTER-CAKE MESSAGE */

            window.setTimeout(() => {

                if (afterCake) {

                    afterCake.classList.add(
                        "visible"
                    );
                }

            }, 1100);

        }
    );


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.startBirthdayPage =
        startBirthdayPage;


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    startBirthdayPage();

})();