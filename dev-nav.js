/* =================================
   DEVELOPMENT PAGE NAVIGATION
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(
            "#devNavigation button"
        );


    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const pageId =
                button.dataset.page;

            const target =
                document.getElementById(pageId);


            if (!target) {

                console.error(
                    "DEV NAV: Page not found:",
                    pageId
                );

                return;

            }


            /*
             * Hide every page
             */

            document
                .querySelectorAll(".page")
                .forEach((page) => {

                    page.classList.remove(
                        "active"
                    );

                });


            /*
             * Show selected page
             */

            target.classList.add(
                "active"
            );


            /*
             * Update selected button
             */

            buttons.forEach((btn) => {

                btn.classList.remove(
                    "selected"
                );

            });


            button.classList.add(
                "selected"
            );


            /*
             * Stop audio when leaving Page 04
             */

            const audio =
                document.getElementById(
                    "songAudio"
                );


            if (
                audio &&
                pageId !== "songPage"
            ) {

                audio.pause();

            }


            /*
             * Reset Page 04 when entering it
             */

            if (
                pageId === "songPage" &&
                typeof resetSongPage ===
                    "function"
            ) {

                resetSongPage();

            }


            /*
             * Start Page 05 animation
             */

            if (
                pageId ===
                "congratulationsPage"
            ) {

                if (
                    typeof startCongratulationsPage ===
                        "function"
                ) {

                    startCongratulationsPage();

                }

            }

        });

    });

});