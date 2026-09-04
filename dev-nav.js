/* =========================================================
   DEV NAVIGATION
   Pages 01 → 07
========================================================= */

(() => {
    "use strict";

    const devNavigation =
        document.getElementById("devNavigation");

    if (!devNavigation) {
        console.error("[DevNav] #devNavigation not found.");
        return;
    }

    const buttons =
        devNavigation.querySelectorAll("button");


    /* =====================================================
       PAGE CLEANUP
    ===================================================== */

    function stopPageAudio() {

    /* Page 04 */

    if (
        window.songAudio &&
        !window.songAudio.paused
    ) {

        window.songAudio.pause();

    }


    /* Page 06 */

    if (
        typeof window.stopFinalPage ===
        "function"
    ) {

        window.stopFinalPage();

    }


    /* Page 07 voice */

    const birthdayVoice =
        document.getElementById(
            "birthdayVoice"
        );

    if (birthdayVoice) {

        birthdayVoice.pause();

        birthdayVoice.currentTime = 0;

    }

}


    function hideAllPages() {

        document
            .querySelectorAll(".page")
            .forEach((page) => {

                page.classList.remove("active");

            });

    }


    function updateSelectedButton(pageId) {

        buttons.forEach((button) => {

            button.classList.toggle(
                "selected",
                button.dataset.page === pageId
            );

        });

    }


    /* =====================================================
       PAGE 03
    ===================================================== */

    function initializeRoom() {

        if (
            typeof window.startRoom === "function"
        ) {

            window.startRoom();

        } else {

            console.error(
                "[DevNav] startRoom() is not available."
            );

        }

    }


    /* =====================================================
       PAGE 04
    ===================================================== */

    async function initializeSong() {

        if (
            typeof window.startSongPage === "function"
        ) {

            await window.startSongPage();

        } else {

            console.error(
                "[DevNav] startSongPage() is not available."
            );

        }

    }


    /* =====================================================
       PAGE 05
    ===================================================== */

    function initializeCongratulations() {

        if (
            typeof window.startCongratulationsPage ===
            "function"
        ) {

            window.startCongratulationsPage();

        }

    }


    /* =====================================================
       PAGE 06
    ===================================================== */

    function initializeFinal() {

        if (
            typeof window.startFinalPage ===
            "function"
        ) {

            window.startFinalPage();

        } else {

            console.error(
                "[DevNav] startFinalPage() is not available."
            );

        }

    }


    /* =====================================================
       PAGE 07
    ===================================================== */

    function initializeBirthday() {

        if (
            typeof window.startBirthdayPage ===
            "function"
        ) {

            window.startBirthdayPage();

        } else {

            console.error(
                "[DevNav] startBirthdayPage() is not available."
            );

        }

    }


    /* =====================================================
       GO TO PAGE
    ===================================================== */

    async function goToPage(pageId) {

        const targetPage =
            document.getElementById(pageId);


        if (!targetPage) {

            console.error(
                "[DevNav] Page not found:",
                pageId
            );

            return;

        }


        console.log(
            `[DevNav] Going to ${pageId}`
        );


        /* ---------------------------------------------
           Stop anything from the previous page
        --------------------------------------------- */

        stopPageAudio();


        /* ---------------------------------------------
           Hide every page
        --------------------------------------------- */

        hideAllPages();


        /* ---------------------------------------------
           Show requested page
        --------------------------------------------- */

        targetPage.classList.add("active");


        /* ---------------------------------------------
           Update navigation
        --------------------------------------------- */

        updateSelectedButton(pageId);


        /* =================================================
           PAGE 01
        ================================================= */

        if (pageId === "openingPage") {

            return;

        }


        /* =================================================
           PAGE 02
        ================================================= */

        if (pageId === "whenPage") {

            if (
                typeof window.updateDate ===
                "function"
            ) {

                window.updateDate();

            }

            return;

        }


        /* =================================================
           PAGE 03
        ================================================= */

        if (pageId === "roomPage") {

            initializeRoom();

            return;

        }


        /* =================================================
           PAGE 04
        ================================================= */

        if (pageId === "songPage") {

            await initializeSong();

            return;

        }


        /* =================================================
           PAGE 05
        ================================================= */

        if (
            pageId ===
            "congratulationsPage"
        ) {

            initializeCongratulations();

            return;

        }


        /* =================================================
           PAGE 06
        ================================================= */

        if (pageId === "finalPage") {

            initializeFinal();

            return;

        }


        /* =================================================
           PAGE 07
        ================================================= */

        if (pageId === "birthdayPage") {

            initializeBirthday();

            return;

        }

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const pageId =
                    button.dataset.page;

                if (!pageId) {
                    return;
                }

                goToPage(pageId);

            }
        );

    });


    /* =====================================================
       GLOBAL
    ===================================================== */

    window.devGoToPage =
        goToPage;


})();