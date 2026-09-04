/* =========================================================
   PAGE 05
   CONGRATULATIONS → LETTER → LAST PAGE GATE
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const page =
        document.getElementById(
            "congratulationsPage"
        );


    const ring =
        document.getElementById(
            "ringButton"
        );


    const letter =
        document.getElementById(
            "blessingLetter"
        );


    const gate =
        document.getElementById(
            "lastPageGate"
        );


    const question =
        document.getElementById(
            "readyQuestion"
        );


    const noMessage =
        document.getElementById(
            "noMessage"
        );


    const yesButton =
        document.getElementById(
            "yesLastPage"
        );


    const noButton =
        document.getElementById(
            "noLastPage"
        );


    const readyAgain =
        document.getElementById(
            "readyAgain"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !page ||
        !ring ||
        !letter ||
        !gate ||
        !question ||
        !noMessage ||
        !yesButton ||
        !noButton ||
        !readyAgain
    ) {

        console.error(
            "[PAGE 05] Missing element."
        );

        console.error({
            page,
            ring,
            letter,
            gate,
            question,
            noMessage,
            yesButton,
            noButton,
            readyAgain
        });

        return;
    }


    console.log(
        "[PAGE 05] Loaded successfully."
    );


    /* =====================================================
       STATE
    ===================================================== */

    let letterOpen = false;

    let gateVisible = false;

    let finalTransition = false;


    /* =====================================================
       RING → LETTER
    ===================================================== */

    ring.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (letterOpen) {
                return;
            }


            letterOpen = true;


            ring.classList.add(
                "hidden"
            );


            letter.classList.add(
                "open"
            );


            console.log(
                "[PAGE 05] Letter opened."
            );

        }
    );


    /* =====================================================
       LETTER → GATE
    ===================================================== */

    letter.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (!letterOpen) {
                return;
            }


            console.log(
                "[PAGE 05] Closing letter..."
            );


            letterOpen = false;


            /*
             * Close letter.
             */

            letter.classList.remove(
                "open"
            );


            /*
             * Give the closing animation
             * enough time to finish.
             */

            setTimeout(
                () => {

                    console.log(
                        "[PAGE 05] Showing last page gate..."
                    );


                    showGate();

                },
                750
            );

        }
    );


    /* =====================================================
       SHOW GATE
    ===================================================== */

    function showGate() {

        if (gateVisible) {
            return;
        }


        gateVisible = true;


        /*
         * Reset question state.
         */

        question.classList.remove(
            "hidden"
        );


        yesButton.classList.remove(
            "hidden"
        );


        noButton.classList.remove(
            "hidden"
        );


        /*
         * Reset NO message.
         */

        noMessage.classList.remove(
            "visible"
        );


        /*
         * Make sure the gate itself
         * is visible.
         */

        gate.classList.add(
            "show"
        );


        console.log(
            "[PAGE 05] Gate visible."
        );

    }


    /* =====================================================
       YES
    ===================================================== */

    yesButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (finalTransition) {
                return;
            }


            console.log(
                "[PAGE 05] YES."
            );


            goToFinalPage();

        }
    );


    /* =====================================================
       NO
    ===================================================== */

    noButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (finalTransition) {
                return;
            }


            console.log(
                "[PAGE 05] NO."
            );


            /*
             * Hide question.
             */

            question.classList.add(
                "hidden"
            );


            yesButton.classList.add(
                "hidden"
            );


            noButton.classList.add(
                "hidden"
            );


            /*
             * Show reassurance.
             */

            setTimeout(
                () => {

                    noMessage.classList.add(
                        "visible"
                    );

                },
                300
            );

        }
    );


    /* =====================================================
       I'M READY
    ===================================================== */

    readyAgain.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (finalTransition) {
                return;
            }


            console.log(
                "[PAGE 05] I'm ready."
            );


            /*
             * Hide reassurance.
             */

            noMessage.classList.remove(
                "visible"
            );


            /*
             * Bring question back.
             */

            setTimeout(
                () => {

                    question.classList.remove(
                        "hidden"
                    );


                    yesButton.classList.remove(
                        "hidden"
                    );


                    /*
                     * Second time:
                     * YES only.
                     */

                    noButton.classList.add(
                        "hidden"
                    );


                    console.log(
                        "[PAGE 05] Question returned."
                    );

                },
                650
            );

        }
    );


    /* =====================================================
       GO TO PAGE 06
    ===================================================== */

    function goToFinalPage() {

        if (finalTransition) {
            return;
        }


        const finalPage =
            document.getElementById(
                "finalPage"
            );


        if (!finalPage) {

            console.error(
                "[PAGE 05] finalPage does not exist."
            );

            return;
        }


        finalTransition = true;


        console.log(
            "[PAGE 05] Transitioning to Page 06..."
        );


        /*
         * Fade Gate.
         */

        gate.classList.add(
            "leaving"
        );


        /*
         * Fade Page 05.
         */

        page.classList.add(
            "page05-leaving"
        );


        /*
         * Wait for cinematic fade.
         */

        setTimeout(
            () => {

                /*
                 * Hide all pages.
                 */

                document
                    .querySelectorAll(
                        ".page"
                    )
                    .forEach(
                        (currentPage) => {

                            currentPage.classList.remove(
                                "active"
                            );

                        }
                    );


                /*
                 * Show Page 06.
                 */

                finalPage.classList.add(
                    "active"
                );


                console.log(
                    "[PAGE 05] Page 06 active."
                );


                /*
                 * Reset Page 05.
                 */

                setTimeout(
                    () => {

                        gate.classList.remove(
                            "show",
                            "leaving"
                        );


                        page.classList.remove(
                            "page05-leaving"
                        );


                        finalTransition = false;

                    },
                    150
                );


            },
            1100
        );

    }


    /* =====================================================
       DEV NAVIGATION RESET
    ===================================================== */

    window.startCongratulationsPage =
        function () {

            console.log(
                "[PAGE 05] Reset."
            );


            letterOpen = false;

            gateVisible = false;

            finalTransition = false;


            /*
             * Ring.
             */

            ring.classList.remove(
                "hidden"
            );


            /*
             * Letter.
             */

            letter.classList.remove(
                "open"
            );


            /*
             * Gate.
             */

            gate.classList.remove(
                "show",
                "leaving"
            );


            /*
             * Question.
             */

            question.classList.remove(
                "hidden"
            );


            yesButton.classList.remove(
                "hidden"
            );


            noButton.classList.remove(
                "hidden"
            );


            /*
             * NO message.
             */

            noMessage.classList.remove(
                "visible"
            );


            /*
             * Page fade.
             */

            page.classList.remove(
                "page05-leaving"
            );

        };


/* =====================================================
   DEV NAVIGATION RESET
===================================================== */

window.startCongratulationsPage = function () {

    opened = false;
    built = false;
    dragging = false;
    completed = false;
    waitingForFinalClick = false;


    root.classList.remove(
        "show",
        "approaching",
        "puzzle-open",
        "completed"
    );


    ring?.classList.remove("hidden");

    letter?.classList.remove("open");


    stage.style.opacity = "";
    stage.style.visibility = "";
    stage.style.pointerEvents = "";


    pieceSource.classList.remove(
        "dragging",
        "snapped"
    );


    pieceSource.style.opacity = "";
    pieceSource.style.visibility = "";
    pieceSource.style.pointerEvents = "";

};

})();