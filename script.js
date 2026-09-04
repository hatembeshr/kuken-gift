/* =================================
   ELEMENTS
================================= */

const openingPage = document.getElementById("openingPage");
const whenPage = document.getElementById("whenPage");

const door =
    document.getElementById("door");

const doorHint =
    document.getElementById("doorHint");

const doorKnock =
    document.getElementById("doorKnock");

const dateSlider = document.getElementById("dateSlider");
const displayDate = document.getElementById("displayDate");
const timelineProgress = document.getElementById("timelineProgress");

const confirmDate = document.getElementById("confirmDate");
const wrongMessage = document.getElementById("wrongMessage");

const successMessage = document.getElementById("successMessage");

const roomPage = document.getElementById("roomPage");

const toyField = document.getElementById("toyField");

const roomCounter = document.getElementById("roomCounter");

const roomHint = document.getElementById("roomHint");

const roomComplete = document.getElementById("roomComplete");

const roomContinue = document.getElementById("roomContinue");

/* =================================
   PAGE 01 — THE DOOR
================================= */

let knockCount = 0;

let knockResetTimer = null;

let doorOpening = false;


const KNOCK_LIMIT = 3;

const KNOCK_WINDOW = 1800;


/* =================================
   KNOCK ON THE DOOR
================================= */

door?.addEventListener(
    "click",
    () => {

        if (doorOpening) {
            return;
        }


        /*
         * Reset the knock sequence if
         * the user takes too long.
         */

        window.clearTimeout(
            knockResetTimer
        );


        knockCount++;


        /* =============================
           DOOR SHAKE
        ============================= */

        door.classList.remove(
            "knock"
        );


        /*
         * Force the animation to restart.
         */

        void door.offsetWidth;


        door.classList.add(
            "knock"
        );


        door.addEventListener(
            "animationend",
            () => {

                door.classList.remove(
                    "knock"
                );

            },
            {
                once: true
            }
        );


        /* =============================
           KNOCK MESSAGE
        ============================= */

        if (doorKnock) {

            doorKnock.textContent =
                knockCount === 1
                    ? "knock."
                    : knockCount === 2
                        ? "knock... knock."
                        : "knock... knock... knock.";

            doorKnock.classList.add(
                "show"
            );


            window.setTimeout(
                () => {

                    doorKnock.classList.remove(
                        "show"
                    );

                },
                700
            );
        }


        /* =============================
           HINT
        ============================= */

        if (doorHint) {

            if (knockCount === 1) {

                doorHint.textContent =
                    "again.";

            } else if (knockCount === 2) {

                doorHint.textContent =
                    "one more.";

            } else {

                doorHint.textContent =
                    "";

            }

        }


        /* =============================
           THREE KNOCKS
        ============================= */

        if (
            knockCount >=
            KNOCK_LIMIT
        ) {

            openDoor();

            return;
        }


        /* =============================
           RESET SEQUENCE
        ============================= */

        knockResetTimer =
            window.setTimeout(
                () => {

                    knockCount = 0;


                    if (doorHint) {

                        doorHint.textContent =
                            "knock on the door";

                    }

                },
                KNOCK_WINDOW
            );

    }
);


/* =================================
   OPEN THE DOOR
================================= */

function openDoor() {

    doorOpening = true;

    window.clearTimeout(
        knockResetTimer
    );

    knockCount = KNOCK_LIMIT;


    /* =====================================================
       HIDE THE HINT
    ===================================================== */

    if (doorHint) {
        doorHint.textContent = "";
    }


    /* =====================================================
       OPEN THE DOOR
    ===================================================== */

    openingPage.classList.add(
        "door-open"
    );


    /* =====================================================
       BLOOM
       The door is already opening.
       The light becomes stronger near the
       end of the door movement.
    ===================================================== */

    window.setTimeout(
        () => {

            openingPage.classList.add(
                "door-bloom"
            );

        },
        1050
    );


    /* =====================================================
       FINAL WHITE FADE
    ===================================================== */

    window.setTimeout(
        () => {

            openingPage.classList.add(
                "door-fade"
            );

        },
        1350
    );


    /* =====================================================
       MOVE TO PAGE 02
       while the white fade is still finishing
    ===================================================== */

    window.setTimeout(
        () => {

            openingPage.classList.remove(
                "active"
            );

            whenPage.classList.add(
                "active"
            );


            /* Reset Page 01 state */

            openingPage.classList.remove(
                "door-open",
                "door-bloom",
                "door-fade"
            );

        },
        1950
    );
}

/* =================================
   PAGE 02 — DATE FINDER
================================= */

const startDate = new Date(2026, 0, 1);
const targetDate = new Date(2026, 2, 1);

const validFrom = new Date(2026, 1, 25);
const validUntil = new Date(2026, 2, 7);

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =================================
   DATE HELPERS
================================= */

function dateFromDay(day) {

    const date = new Date(startDate);

    date.setDate(
        startDate.getDate() + Number(day)
    );

    return date;
}


function formatDate(date) {

    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
}


/* =================================
   UPDATE DATE
================================= */

function updateDate() {

    if (!dateSlider || !displayDate || !timelineProgress) {
        return;
    }

    const day = Number(dateSlider.value);

    const currentDate = dateFromDay(day);

    displayDate.textContent =
        formatDate(currentDate);

    const percentage =
        (day / Number(dateSlider.max)) * 100;

    timelineProgress.style.width =
        `${percentage}%`;
}


/* =================================
   SLIDER
================================= */

if (dateSlider) {

    dateSlider.addEventListener(
        "input",
        updateDate
    );

    updateDate();
}


/* =================================
   WRONG ANSWERS
================================= */

const wrongReplies = [
    "غلط يا سكاكر.",
    'لا يا <span class="english">süßigkeiten</span>.',
    "ركزي يا قرطاس النكد.",
    "مستفزة والله.",
    "ارجعي خدي أدويتك تاني."
];

let attempts = 0;


/* =================================
   CONFIRM DATE
================================= */

if (confirmDate) {

    confirmDate.addEventListener(
        "click",
        () => {

            if (!dateSlider) {
                return;
            }

            const day =
                Number(dateSlider.value);

            const selectedDate =
                dateFromDay(day);

            const isCorrect =
                selectedDate >= validFrom &&
                selectedDate <= validUntil;


            /* =========================
               WRONG
            ========================= */

            if (!isCorrect) {

                attempts++;

                const replyIndex =
                    Math.min(
                        attempts - 1,
                        wrongReplies.length - 1
                    );

                if (wrongMessage) {

                    wrongMessage.innerHTML =
                        wrongReplies[replyIndex];

                    wrongMessage.classList.remove(
                        "visible"
                    );

                    void wrongMessage.offsetWidth;

                    wrongMessage.classList.add(
                        "visible"
                    );
                }

                return;
            }


            /* =========================
               CORRECT
            ========================= */

            confirmDate.style.opacity = "0";
            confirmDate.style.pointerEvents = "none";

            if (wrongMessage) {

                wrongMessage.classList.remove(
                    "visible"
                );
            }


            /* =========================
               MOVE TO MARCH 1
            ========================= */

            const targetDay =
                Math.round(
                    (targetDate - startDate) /
                    (1000 * 60 * 60 * 24)
                );

            const startValue =
                Number(dateSlider.value);

            const duration = 700;

            const startTime =
                performance.now();


            function animateToTarget(time) {

                const elapsed =
                    time - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );

                const value =
                    startValue +
                    (targetDay - startValue) *
                    eased;

                dateSlider.value = value;

                updateDate();


                if (progress < 1) {

                    requestAnimationFrame(
                        animateToTarget
                    );

                    return;
                }


                /* =====================
                   FINISH
                ===================== */

                dateSlider.value =
                    targetDay;

                updateDate();


                window.setTimeout(
                    () => {

                        if (successMessage) {

                            successMessage.classList.add(
                                "visible"
                            );
                        }


                        window.setTimeout(
                            () => {

                                whenPage.classList.remove(
                                    "active"
                                );


                                window.setTimeout(
                                    () => {

                                        roomPage.classList.add(
                                            "active"
                                        );

                                        startRoom();

                                    },
                                    500
                                );

                            },
                            1800
                        );

                    },
                    500
                );

            }


            requestAnimationFrame(
                animateToTarget
            );

        }
    );

}

/* =================================
   PAGE 03 — LITTLE ROOM
================================= */

const toys = [

    {
        image: "bird.png",
        text: "كوكن اللي هو أنا يعني"
    },

    {
        image: "bully.png",
        text: "تنمرنا على الجروب طبعًا"
    },

    {
        image: "bye.png",
        text: "سلاوداع"
    },

    {
        image: "candy.png",
        text: "سكاكر اللي هي إنتي يعني"
    },

    {
        image: "chat.png",
        text: "المأوى اللي كان بيلمنا"
    },

    {
        image: "disgusted.png",
        text: "مش طايقاك/طايقك"
    },

    {
        image: "germany.png",
        text: "مين كان يتخيل إن كورس الألماني هيكون سبب في كل ده؟"
    },

    {
        image: "ghost.png",
        text: "اسمعي Supernatural!!"
    },

    {
        image: "house.png",
        text: "مشاكل البيت اللي عمرها ما خلصت"
    },

    {
        image: "hug.png",
        text: "وقت الضحك، وقت الزعل، وقت الرغي اللي ملوش لازمة... كنا دايمًا موجودين عشان بعض"
    },

    {
        image: "karaoke.png",
        text: "الطرب اللي كنا بنطرب بعض بيه"
    },

    {
        image: "sleeping.png",
        text: "وقت الننة"
    },

    {
        image: "youtube.png",
        text: "الفيديوهات والمسلسلات اللي تراكمت علينا ومسمعناهاش"
    },

    {
        image: "sad.png",
        text: "قرطاث النكد"
    }

];

let discoveredCount = 0;

let nextToyIndex = 0;



/* =================================
   START ROOM
================================= */

function startRoom() {

    toyField.innerHTML = "";

    discoveredCount = 0;

    nextToyIndex = 0;

    occupiedPositions.length = 0;

    roomCounter.textContent = "0 / 14";

    roomComplete.classList.remove("visible");

    roomHint.style.opacity = "1";


    // Every visit gets a completely new layout.

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            revealNextToy();

        }, i * 180);

    }

}


/* =================================
   REVEAL TOY
================================= */

function revealNextToy() {

    if (nextToyIndex >= toys.length) {

        return;

    }


    const toyData =
        toys[nextToyIndex];


    const toy =
        document.createElement("button");


    toy.type = "button";

    toy.className = "toy";

    toy.dataset.index =
        nextToyIndex;


    toy.innerHTML = `

        <img
            src="${toyData.image}"
            alt=""
            draggable="false"
        >

        <span class="toy-shadow"></span>

        <span class="toy-message">
            ${toyData.text}
        </span>

    `;


    /* -------------------------
       RANDOM POSITION
    ------------------------- */

    const position =
        getRandomPosition();


    toy.style.left =
        `${position.x}%`;

    toy.style.top =
        `${position.y}%`;


    /* -------------------------
       RANDOM ROTATION
    ------------------------- */

    const rotation =
        -12 +
        Math.random() * 24;


    toy.style.setProperty(
        "--rotation",
        `${rotation}deg`
    );


    /* -------------------------
       RANDOM FLOAT
    ------------------------- */

    const floatDuration =
        3.2 +
        Math.random() * 2;


    const floatDelay =
        Math.random() * -3;


    toy.style.setProperty(
        "--float-duration",
        `${floatDuration}s`
    );

    toy.style.setProperty(
        "--float-delay",
        `${floatDelay}s`
    );


    /* -------------------------
       RANDOM ENTRANCE
    ------------------------- */

    const entrances = [
        "enter-from-left",
        "enter-from-right",
        "enter-from-top",
        "enter-from-bottom"
    ];


    const entrance =
        entrances[
            Math.floor(
                Math.random() *
                entrances.length
            )
        ];


    toy.classList.add(
        entrance
    );


    toyField.appendChild(toy);


    /* -------------------------
       SHOW
    ------------------------- */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            toy.classList.add("visible");

        });

    });


    /* -------------------------
       INTERACTION
    ------------------------- */

    setupToyInteraction(toy);


    nextToyIndex++;

}


/* =================================
   DRAGGABLE TOYS
================================= */

function setupToyInteraction(toy) {

    let isDragging = false;

    let hasMoved = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;


    toy.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;

            hasMoved = false;

            toy.classList.add(
                "dragging"
            );

            toy.setPointerCapture(
                event.pointerId
            );


            startX =
                event.clientX;

            startY =
                event.clientY;


            startLeft =
                parseFloat(
                    toy.style.left
                );

            startTop =
                parseFloat(
                    toy.style.top
                );

        }
    );


    toy.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) {
                return;
            }


            const dx =
                event.clientX -
                startX;

            const dy =
                event.clientY -
                startY;


            if (
                Math.abs(dx) > 5 ||
                Math.abs(dy) > 5
            ) {

                hasMoved = true;

            }


            const x =
                startLeft +
                (dx /
                    window.innerWidth) *
                100;


            const y =
                startTop +
                (dy /
                    window.innerHeight) *
                100;


            // Keep toy inside the screen.

            const boundedX =
                Math.max(
                    6,
                    Math.min(
                        94,
                        x
                    )
                );


            const boundedY =
                Math.max(
                    10,
                    Math.min(
                        88,
                        y
                    )
                );


            toy.style.left =
                `${boundedX}%`;

            toy.style.top =
                `${boundedY}%`;


            // Update bubble position while dragging.

            if (
                toy.classList.contains(
                    "show-message"
                )
            ) {

                adjustBubblePosition(
                    toy
                );

            }

        }
    );


    toy.addEventListener(
        "pointerup",
        (event) => {

            if (!isDragging) {
                return;
            }


            isDragging = false;

            toy.classList.remove(
                "dragging"
            );


            try {

                toy.releasePointerCapture(
                    event.pointerId
                );

            } catch {}

        }
    );


    toy.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

            toy.classList.remove(
                "dragging"
            );

        }
    );


    /* -------------------------
       CLICK / DISCOVER
    ------------------------- */

    toy.addEventListener(
        "click",
        () => {

            // If the user dragged it,
            // don't treat that as a click.

            if (hasMoved) {

                hasMoved = false;

                return;

            }


            discoverToy(toy);

        }
    );

}


/* =================================
   RANDOM TOY POSITIONS
================================= */

const occupiedPositions = [];


function getRandomPosition() {

    const minX = 10;
    const maxX = 90;

    const minY = 16;
    const maxY = 82;

    const minDistance = 15;


    for (let attempt = 0; attempt < 80; attempt++) {

        const x =
            minX +
            Math.random() *
            (maxX - minX);

        const y =
            minY +
            Math.random() *
            (maxY - minY);


        const isTooClose =
            occupiedPositions.some(position => {

                const dx =
                    x - position.x;

                const dy =
                    y - position.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                return distance < minDistance;

            });


        if (!isTooClose) {

            const position = {
                x,
                y
            };

            occupiedPositions.push(
                position
            );

            return position;

        }

    }


    // Fallback if the screen gets crowded.

    return {
        x:
            minX +
            Math.random() *
            (maxX - minX),

        y:
            minY +
            Math.random() *
            (maxY - minY)
    };

}


function discoverToy(toy) {

    if (
        toy.classList.contains(
            "discovered"
        )
    ) {

        return;

    }


    toy.classList.add(
        "discovered"
    );


    discoveredCount++;


    roomCounter.textContent =
        `${discoveredCount} / 14`;


    roomHint.style.opacity = "0";


    setTimeout(() => {

        adjustBubblePosition(toy);

        toy.classList.add(
            "show-message"
        );

    }, 150);


    setTimeout(() => {

        if (
            nextToyIndex <
            toys.length
        ) {

            revealNextToy();

        }

    }, 900);


    if (
    discoveredCount === 14
) {

    // Let all toys celebrate first.

    setTimeout(() => {

        toyField.classList.add(
            "celebrating"
        );

    }, 250);


    // Then reveal the final message.

    setTimeout(() => {

        roomComplete.classList.add(
            "visible"
        );

    }, 2200);

}

}

function adjustBubblePosition(toy) {

    const toyRect =
        toy.getBoundingClientRect();

    const bubble =
        toy.querySelector(".toy-message");


    if (!bubble) {
        return;
    }


    /*
     * If the toy is too close to the top,
     * put the bubble underneath it.
     */

    if (toyRect.top < 125) {

        toy.classList.add("message-below");

    } else {

        toy.classList.remove("message-below");

    }


    /*
     * Give the browser a moment to calculate
     * the bubble's real dimensions.
     */

    requestAnimationFrame(() => {

        const bubbleRect =
            bubble.getBoundingClientRect();


        let shift = 0;


        /*
         * Too far to the left
         */

        if (bubbleRect.left < 14) {

            shift =
                14 - bubbleRect.left;

        }


        /*
         * Too far to the right
         */

        if (bubbleRect.right > window.innerWidth - 14) {

            shift =
                (window.innerWidth - 14) -
                bubbleRect.right;

        }


        toy.style.setProperty(
            "--bubble-shift",
            `${shift}px`
        );

    });

}


/* =================================
   PAGE 04 — THE SONG
================================= */

const songPage = document.getElementById("songPage");

const songAudio = document.getElementById("songAudio");

const lyricsList = document.getElementById("lyricsList");

const lyricsWindow = document.getElementById("lyricsWindow");

const chatMessages =
    document.getElementById("chatMessages");

const playButton =
    document.getElementById("playButton");

const songProgress =
    document.getElementById("songProgress");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");


/* =================================
   LRC DATA
================================= */

const lyrics = [

    {
        time: 1.01,
        text: "قبل اى كلمة تقولها عن ظنونك و اللى كان"
    },

    {
        time: 7.23,
        text: "قبل ما تفرقنا كلمة قبل ما يفوت الاوان"
    },

    {
        time: 13.50,
        text: "قبل اى كلمة تقولها عن ظنونك و اللى كان"
    },

    {
        time: 20.62,
        text: "قبل ما تفرقنا كلمة قبل ما يفوت الاوان"
    },

    {
        time: 26.55,
        text: "يلا نسرق من الزمن لحظه تفاهم"
    },

    {
        time: 32.17,
        text: "محتمل نرجع واحسن من زمان"
    },

    {
        time: 38.25,
        text: "يلا نسرق من الزمن لحظه تفاهم"
    },

    {
        time: 43.74,
        text: "محتمل نرجع واحسن من زمان"
    },

    {
        time: 50.14,
        text: "احنا كنا الحب ذاته قبل متسافر بعيد"
    },

    {
        time: 56.21,
        text: "قولتلك خدنى معاك قولت راجع من جديد"
    },

    {
        time: 62.92,
        text: "احنا كنا الحب ذاته قبل متسافر بعيد"
    },

    {
        time: 69.06,
        text: "قولتلك خدنى معاك قولت راجع من جديد"
    },

    {
        time: 75.73,
        text: "واتوعدنا واتعهدنا بالعيون قبل الكلام"
    },

    {
        time: 82.18,
        text: "واتوعدنا واتعهدنا بالعيون قبل الكلام"
    },

    {
        time: 89.06,
        text: "واتفقنا عالرسايل وابتسمت وقمت قايل"
    },

    {
        time: 95.59,
        text: "واتفقنا عالرسايل وابتسمت وقمت قايل"
    },

    {
        time: 102.23,
        text: "مستحيل فى يوم تنام"
    },

    {
        time: 109.20,
        text: "قبل ماتكتبلى غنوة احس فيها فيها بالامان"
    },

    {
        time: 119.54,
        text: "وانتظرت يجينى ردك وانت عارف معني بعدك"
    },

    {
        time: 126.23,
        text: "وحدتى رجعتلى بعدك كنت جنبك يوم فى ضلك"
    },

    {
        time: 132.18,
        text: "حيرتي زادت من ظنونى قولت اسئل ناس صحابك"
    },

    {
        time: 138.92,
        text: "اللى ردوا وخوفوني قالوا انسي اللي راح وسابك"
    },

    {
        time: 144.86,
        text: "الا واحد بس قالى بكره راجع رغم انه"
    },

    {
        time: 150.87,
        text: "هوا دا اللى تملي انت ياما خفت منه"
    },

    {
        time: 157.13,
        text: "الا واحد بس قالى بكره راجع رغم انه"
    },

    {
        time: 163.00,
        text: "هوا دا اللى تملي انت ياما خفت منه"
    },

    {
        time: 169.83,
        text: "بس صاحبك اللى قالى اللى قالى هوا قلبى"
    },

    {
        time: 176.16,
        text: "قلبى اللى ياما قلت عليه زمان"
    },

    {
        time: 181.36,
        text: "قلبى اللى ياما قلت عليه زمان"
    },

    {
        time: 186.80,
        text: "قلبى اللى ياما قلت عليه زمان"
    }

];


/* =================================
   YOUR MESSAGES
================================= */

const songMessages = [

    {
        time: 3.20,
        text: "هالو هالو"
    },

    {
        time: 7.00,
        text: "قبل اي كلمة تقولها حبيت اسمع معاكي الاغنية دي يمكن اخر مره نسمع اغاني سوا"
    },

    {
        time: 15.80,
        text: " 😂رايق ابو تيام مش كدا؟"
    },

    {
        time: 30.30,
        text: "اكيد هانبقى نسرق من الزمن كام لحظة كدا نتطمن فيها على بعض من بعيد لبعيد"
    },

    {
        time: 61.00,
        text: "بجد صداقتنا كانت غريبه 6 شهور بس ولا اكنها سنين سأفتقد الصداقه دي للأبد ياسكاكر"
    },

    {
        time: 82.00,
        text: " 😂 عايزين نوعد بعض بقا المرة دي اننا نفضل طايقين بعض مش زي المره اللي فاتت"
    },

    {
        time: 110.00,
        text: " 🥹 كدا مش هاسمع طربك تاني ياسكاكر؟ دا انا مكنتش بعرف انام غير على صوتك يافنانة"
    },

    {
        time: 122.00,
        text: "عايز اقولك اني هافضل دايما مستني منك كلمة او سلام هافضل منتظر سؤالك وهافضل ممتن لكل لحظة في ال6 شهور دول كان نفسي نفضل دايما صحاب بس يمكن مش هانفضل صحاب لكن معزتك عندي عمرها ما هاتقل ابدا هافضل فعلا منتظرك حتى لو مش هاتيجي❤️"
    },

    {
        time: 128.40,
        text: " 😓 ايوة ياعمو مصطفى وحدتي رجعتلي بعده"
    },

    {
        time: 143.00,
        text: " قرطاث النكد!!! اياكي تكوني بتعيطي انتي عارفه هاكسر راسك!!! + متعمده تستفزيني بعياطك يعني عشان عارفه اني مش هاعرف اعمل حاجه؟ 😬"
    },

    {
        time: 168.80,
        text: " مش كل كلمة وداع معناها النهايه اكيد مُقدر لينا نتجمع تاني في المستقبل بتمنى انك ماتكونيش مجرد شابتر وتبقي مكملة في الرواية كلها حتى بعد ما كل واحد يبقى عنده حياته الخاصة ❤️‍🩹"
    },

    {
        time: 180.00,
        text: " 👋 سلأغاااااااااااااااني"
    }

];


/* =================================
   STATE
================================= */

let currentLyricIndex = -1;

let displayedMessageCount = 0;

let songStarted = false;

let songEnded = false;


/* =================================
   FORMAT TIME
================================= */

function formatSongTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const remaining =
        Math.floor(seconds % 60);


    return `${minutes}:${String(
        remaining
    ).padStart(2, "0")}`;

}


/* =================================
   BUILD LYRICS
================================= */

function buildLyrics() {

    lyricsList.innerHTML = "";

    lyricsList.style.transform =
        "translateY(0)";

    currentLyricIndex = -1;


    lyrics.forEach(
        (line, index) => {

            const element =
                document.createElement("p");

            element.className =
                "lyric-line";

            element.dataset.index =
                index;

            element.textContent =
                line.text;

            lyricsList.appendChild(
                element
            );

        }
    );

}

/* =================================
   UPDATE LYRICS
================================= */

function updateLyrics(currentTime) {

    let activeIndex = -1;


    // Find current lyric

    for (
        let i = lyrics.length - 1;
        i >= 0;
        i--
    ) {

        if (
            currentTime >= lyrics[i].time
        ) {

            activeIndex = i;

            break;
        }

    }


    const lyricElements =
        lyricsList.querySelectorAll(
            ".lyric-line"
        );


    // Before the first lyric

    if (activeIndex === -1) {

        lyricElements.forEach(
            (element) => {

                element.classList.remove(
                    "previous",
                    "current",
                    "next"
                );

            }
        );

        lyricsList.style.transform =
            "translateY(0)";

        currentLyricIndex = -1;

        return;
    }


    // Update visual states

    lyricElements.forEach(
        (element, index) => {

            element.classList.remove(
                "previous",
                "current",
                "next"
            );


            if (
                index < activeIndex
            ) {

                element.classList.add(
                    "previous"
                );

            }

            else if (
                index === activeIndex
            ) {

                element.classList.add(
                    "current"
                );

            }

            else {

                element.classList.add(
                    "next"
                );

            }

        }
    );


    const currentElement =
        lyricElements[
            activeIndex
        ];


    if (!currentElement) {
        return;
    }


    /*
     * Because the lyrics list now starts
     * at top: 0, offsetTop is reliable.
     */

    const currentCenter =
        currentElement.offsetTop +
        (
            currentElement.offsetHeight / 2
        );


    const windowCenter =
        lyricsWindow.clientHeight / 2;


    const translateY =
        windowCenter -
        currentCenter;


    lyricsList.style.transform =
        `translateY(${translateY}px)`;


    currentLyricIndex =
        activeIndex;

}


/* =================================
   SHOW MESSAGES
================================= */

function updateMessages(currentTime) {

    while (
        displayedMessageCount <
        songMessages.length
    ) {

        const nextMessage =
            songMessages[
                displayedMessageCount
            ];


        if (
            currentTime <
            nextMessage.time
        ) {

            break;

        }


        addChatMessage(
            nextMessage.text
        );


        displayedMessageCount++;

    }

}


/* =================================
   ADD CHAT MESSAGE
================================= */

function addChatMessage(text) {

    const bubble =
        document.createElement("div");

    bubble.className =
        "chat-message";

    bubble.innerHTML = `
        <span>${escapeHTML(text)}</span>
    `;


    chatMessages.appendChild(
        bubble
    );


    requestAnimationFrame(() => {

        chatMessages.scrollTo({
            top:
                chatMessages.scrollHeight,

            behavior:
                "smooth"
        });

    });

}


/* =================================
   ESCAPE HTML
================================= */

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent = value;

    return element.innerHTML;

}


/* =================================
   UPDATE PLAYER
================================= */

function updatePlayer() {

    if (
        !songAudio.duration
    ) {

        return;

    }


    const current =
        songAudio.currentTime;

    const duration =
        songAudio.duration;


    currentTimeElement.textContent =
        formatSongTime(current);


    durationElement.textContent =
        formatSongTime(duration);


    songProgress.style.width =
        `${(
            current / duration
        ) * 100}%`;

}


/* =================================
   RESET SONG PAGE
================================= */

function resetSongPage() {

    songAudio.pause();

    songAudio.currentTime = 0;

    songStarted = false;

    songEnded = false;

    currentLyricIndex = -1;

    displayedMessageCount = 0;


    lyricsList.style.transform =
        "translateY(0)";


    chatMessages.innerHTML = "";


    buildLyrics();


    currentTimeElement.textContent =
        "0:00";


    songProgress.style.width =
        "0%";


    playButton.textContent =
        "▶";

}


/* =================================
   START SONG PAGE
================================= */

async function startSongPage() {

    resetSongPage();


    /*
     * This function gets called as a result
     * of the user's tap on "keep going",
     * so iPhone Safari is allowed to start
     * playback here.
     */

    try {

        await songAudio.play();

        songStarted = true;

        playButton.textContent =
            "❚❚";

    } catch (error) {

        /*
         * If Safari blocks playback,
         * the user can simply tap play.
         */

        playButton.textContent =
            "▶";

    }

}


/* =================================
   PLAY / PAUSE
================================= */

playButton.addEventListener(
    "click",
    async () => {

        if (
            songAudio.paused
        ) {

            try {

                await songAudio.play();

                playButton.textContent =
                    "❚❚";

            } catch {}

        } else {

            songAudio.pause();

            playButton.textContent =
                "▶";

        }

    }
);


/* =================================
   AUDIO TIME UPDATE
================================= */

songAudio.addEventListener(
    "timeupdate",
    () => {

        const current =
            songAudio.currentTime;


        updateLyrics(
            current
        );


        updateMessages(
            current
        );


        updatePlayer();

    }
);


/* =================================
   AUDIO PLAY
================================= */

songAudio.addEventListener(
    "play",
    () => {

        songStarted = true;

        playButton.textContent =
            "❚❚";

    }
);


/* =================================
   AUDIO PAUSE
================================= */

songAudio.addEventListener(
    "pause",
    () => {

        if (
            !songEnded
        ) {

            playButton.textContent =
                "▶";

        }

    }
);


/* =================================
   PAGE 04 → PAGE 05
================================= */

songAudio.addEventListener(
    "ended",
    () => {

        songEnded = true;

        playButton.textContent =
            "▶";


        /*
         * Make sure every remaining
         * timed message appears.
         */

        updateMessages(
            Number.MAX_SAFE_INTEGER
        );


        /*
         * Give the final message a moment,
         * then move to Page 05.
         */

        window.setTimeout(
            () => {

                songPage.classList.remove(
                    "active"
                );

                congratulationsPage.classList.add(
                    "active"
                );


                /*
                 * Reset Page 05 for a fresh start.
                 */

                if (
                    typeof window.startCongratulationsPage ===
                    "function"
                ) {

                    window.startCongratulationsPage();

                }

            },
            1800
        );

    }
);


/* =================================
   PAGE 03 → PAGE 04
================================= */

roomContinue.addEventListener(
    "click",
    () => {

        roomPage.classList.remove(
            "active"
        );


        setTimeout(() => {

            songPage.classList.add(
                "active"
            );


            startSongPage();

        }, 500);

    }
);


/* =================================
   INITIALIZE
================================= */

buildLyrics();

