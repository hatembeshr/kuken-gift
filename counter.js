/* =========================================================
   SITE VISIT COUNTER

   One visit = one complete opening of the website.

   The visit is counted only when Page 03 is reached.
   Every new page load gets a new visit.
========================================================= */

(() => {
    "use strict";

    const COUNTER_WORKER =
        "https://shiny-rice-f763.hatembshr330.workers.dev";

    const page03 =
        document.getElementById("roomPage");

    if (!page03) {
        console.warn(
            "[Counter] #roomPage not found."
        );
        return;
    }

    /*
     * This variable exists only for this particular
     * opening of the website.
     *
     * It prevents the MutationObserver from counting
     * the same visit more than once.
     *
     * A refresh/new opening creates a new JavaScript
     * execution and therefore a new visit.
     */
    let visitCounted = false;

    async function countVisit() {

        if (visitCounted) {
            return;
        }

        visitCounted = true;

        try {

            const response =
                await fetch(
                    COUNTER_WORKER,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );

            if (!response.ok) {
                throw new Error(
                    `Worker returned ${response.status}`
                );
            }

            const result =
                await response.json();

            console.log(
                "[Counter] Visit counted:",
                result
            );

        } catch (error) {

            /*
             * Allow another attempt if the request
             * failed completely.
             */
            visitCounted = false;

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
     * Handles the case where Page 03 is already
     * active when this script starts.
     */
    checkPage03();

})();