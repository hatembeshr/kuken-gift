/* =========================================================
   SITE VISIT COUNTER
   Counts one visit when Page 03 is reached.
========================================================= */

(() => {
    "use strict";

    const WORKSPACE =
        "hatembeshrs-team-5387";

    const COUNTER_NAME =
        "visits_kuken";

    const COUNTED_KEY =
        "kukenGiftVisitCounted";

    const page03 =
        document.getElementById("roomPage");

    if (!page03) {
        console.warn(
            "[Counter] #roomPage not found."
        );
        return;
    }

    /*
     * One visit = one browser session.
     *
     * Refreshing or moving between pages
     * will NOT count again.
     *
     * Closing the site and opening it again
     * creates a new session.
     */
    function hasAlreadyCounted() {
        return sessionStorage.getItem(
            COUNTED_KEY
        ) === "true";
    }

    function markAsCounted() {
        sessionStorage.setItem(
            COUNTED_KEY,
            "true"
        );
    }

    async function countVisit() {

        if (hasAlreadyCounted()) {
            console.log(
                "[Counter] Visit already counted."
            );
            return;
        }

        if (
            typeof window.Counter !==
            "function"
        ) {
            console.warn(
                "[Counter] CounterAPI library is not loaded."
            );
            return;
        }

        try {

            const counter =
                new window.Counter({
                    workspace: WORKSPACE
                });

            const result =
                await counter.up(
                    COUNTER_NAME
                );

            markAsCounted();

            console.log(
                "[Counter] Visit counted:",
                result?.value
            );

        } catch (error) {

            console.error(
                "[Counter] Failed to count visit:",
                error
            );

        }
    }

    function checkPage03() {

        if (
            page03.classList.contains(
                "active"
            )
        ) {
            countVisit();
        }

    }

    /*
     * Watch Page 03.
     *
     * We don't count Page 01 or Page 02.
     * The counter starts only when #roomPage
     * becomes active.
     */
    const observer =
        new MutationObserver(() => {
            checkPage03();
        });

    observer.observe(
        page03,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );

    /*
     * Also handle the case where Page 03
     * is already active when this script loads.
     */
    checkPage03();

})();