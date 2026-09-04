/* =========================================================
   PAGE 07 — GIFT + VOICE
   Completely isolated from birthday.js
========================================================= */

(() => {
    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const giftScene =
        document.getElementById("birthdayGiftScene");

    const voiceScene =
        document.getElementById("birthdayVoiceScene");


    const giftButton =
        document.getElementById("birthdayGift");

    const giftContainer =
        document.getElementById("giftBoxContainer");

    const giftClick =
        document.getElementById("giftClick");

    const giftMessage =
        document.getElementById("birthdayGiftMessage");

    const openGiftButton =
        document.getElementById("openGift");


    const voiceButton =
        document.getElementById("voiceNoteButton");

    const voiceAudio =
        document.getElementById("birthdayVoice");

    const voiceStatus =
        document.getElementById("voiceNoteStatus");


    let giftOpened = false;

    let openingTimer = null;
    let messageTimer = null;


    /* =====================================================
       SHOW GIFT
       IMPORTANT:
       Gift is NOT a .birthday-scene anymore.
    ===================================================== */

    function showGift() {

        if (!giftScene) {
            console.error(
                "[Birthday Gift] #birthdayGiftScene not found."
            );

            return;
        }


        /*
         * Hide Voice.
         */

        voiceScene?.classList.remove("active");


        /*
         * Show Gift.
         */

        giftScene.classList.add("active");


        /*
         * Make sure Gift starts from a clean state.
         */

        resetGift();


        console.log(
            "[Birthday Gift] Gift scene active."
        );
    }


    /* =====================================================
       SHOW VOICE
    ===================================================== */

    function showVoice() {

        if (!voiceScene) {
            console.error(
                "[Birthday Gift] #birthdayVoiceScene not found."
            );

            return;
        }


        /*
         * Hide Gift.
         */

        giftScene?.classList.remove("active");


        /*
         * Show Voice.
         */

        voiceScene.classList.add("active");


        /*
         * Stop audio if necessary.
         */

        stopVoice();


        console.log(
            "[Birthday Gift] Voice scene active."
        );
    }


    /* =====================================================
       RESET GIFT
    ===================================================== */

    function resetGift() {

        window.clearTimeout(openingTimer);
        window.clearTimeout(messageTimer);


        giftOpened = false;


        if (giftContainer) {

            giftContainer.classList.remove(
                "shaking",
                "open"
            );
        }


        if (giftMessage) {

            giftMessage.classList.remove(
                "visible"
            );
        }
    }


    /* =====================================================
       STOP VOICE
    ===================================================== */

    function stopVoice() {

        if (!voiceAudio) {
            return;
        }


        voiceAudio.pause();


        try {

            voiceAudio.currentTime = 0;

        } catch (error) {
            // Ignore.
        }


        voiceButton?.classList.remove(
            "playing"
        );
    }


    /* =====================================================
       CAKE → GIFT
    ===================================================== */

    if (giftButton) {

        giftButton.addEventListener(
            "click",
            () => {

                showGift();

            }
        );

    } else {

        console.warn(
            "[Birthday Gift] #birthdayGift button not found."
        );
    }


    /* =====================================================
       CLICK GIFT
    ===================================================== */

    if (giftClick) {

        giftClick.addEventListener(
            "click",
            () => {

                if (
                    !giftContainer ||
                    giftOpened
                ) {
                    return;
                }


                giftOpened = true;


                /*
                 * Shake first.
                 */

                giftContainer.classList.add(
                    "shaking"
                );


                /*
                 * Then open.
                 */

                openingTimer =
                    window.setTimeout(
                        () => {

                            giftContainer.classList.remove(
                                "shaking"
                            );

                            giftContainer.classList.add(
                                "open"
                            );


                            /*
                             * Show message.
                             */

                            messageTimer =
    window.setTimeout(
        () => {

            /*
             * Give the opened gift a tiny moment
             * before revealing the voice note.
             */

            giftMessage?.classList.add(
                "visible"
            );


            window.setTimeout(() => {

                showVoice();

            }, 1200);

        },
        500
    );

                        },
                        700
                    );

            }
        );

    }


    /* =====================================================
       OPEN GIFT → VOICE
    ===================================================== */

    if (openGiftButton) {

        openGiftButton.addEventListener(
            "click",
            () => {

                showVoice();

            }
        );

    }


    /* =====================================================
       VOICE NOTE
    ===================================================== */

    if (voiceButton) {

        voiceButton.addEventListener(
            "click",
            async () => {

                /*
                 * No audio file yet.
                 */

                if (
                    !voiceAudio ||
                    !voiceAudio.getAttribute("src")
                ) {

                    if (voiceStatus) {

                        voiceStatus.textContent =
                            "The voice note isn't here yet.";

                    }

                    console.info(
                        "[Birthday Gift] No voice note attached yet."
                    );

                    return;
                }


                /*
                 * PLAY
                 */

                if (voiceAudio.paused) {

                    try {

                        await voiceAudio.play();

                        voiceButton.classList.add(
                            "playing"
                        );


                        if (voiceStatus) {

                            voiceStatus.textContent =
                                "playing...";

                        }

                    } catch (error) {

                        console.error(
                            "[Birthday Gift] Voice playback failed:",
                            error
                        );

                    }

                }


                /*
                 * PAUSE
                 */

                else {

                    voiceAudio.pause();

                    voiceButton.classList.remove(
                        "playing"
                    );


                    if (voiceStatus) {

                        voiceStatus.textContent =
                            "paused";

                    }

                }

            }
        );

    }


    /* =====================================================
       VOICE ENDED
    ===================================================== */

    voiceAudio?.addEventListener(
        "ended",
        () => {

            voiceButton?.classList.remove(
                "playing"
            );


            if (voiceStatus) {

                voiceStatus.textContent =
                    "finished.";
            }

        }
    );


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.showBirthdayGift =
        showGift;

    window.resetBirthdayGift =
        resetGift;


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    resetGift();

    voiceScene?.classList.remove("active");

})();