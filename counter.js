/* =========================================================
   SITE VISIT COUNTER
   Counts one visit when Page 03 is reached.
========================================================= */

(() => {
    "use strict";

    const COUNTER_WORKER =
        "https://shiny-rice-f763.hatembshr330.workers.dev";

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

        try {

            const response =
                await fetch(
                    COUNTER_WORKER,
                    {
                        method: "GET"
                    }
                );

            if (!response.ok) {
                throw new Error(
                    `Worker returned ${response.status}`
                );
            }

            const result =
                await response.json();

            markAsCounted();

            console.log(
                "[Counter] Visit counted successfully:",
                result
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

    checkPage03();

})();