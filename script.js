/* =================================
   ELEMENTS
================================= */

const openingPage = document.getElementById("openingPage");
const whenPage = document.getElementById("whenPage");

const openTrigger = document.getElementById("openTrigger");
const question = document.getElementById("question");

const tapHint = document.getElementById("tapHint");

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
   PAGE 01 — OPENING
================================= */

let openingState = 0;


openTrigger.addEventListener("click", () => {

    // =========================
    // FIRST CLICK
    // =========================

    if (openingState === 0) {

        openingState = 1;

        question.textContent = "are you sure?";

        return;
    }


    // =========================
    // SECOND CLICK
    // =========================

    if (openingState === 1) {

        openingState = 2;

        question.textContent = "are you really sure?";

        return;
    }


    // =========================
    // THIRD CLICK
    // =========================

    if (openingState === 2) {

        openingState = 3;

        openTrigger.style.opacity = "0";
        question.style.opacity = "0";

        setTimeout(() => {

            openTrigger.style.display = "none";
            question.style.display = "none";

            openingPage.classList.add("final-state");


            const message = document.createElement("div");

            message.className = "final-message";

            message.innerHTML = `
                <span class="small">okay.</span>
                <span class="main">I made this for you.</span>
            `;

            openingPage.appendChild(message);


            // Show:
            // I made this for you.

            setTimeout(() => {

                message.classList.add("show-main");

            }, 1800);


            // Show:
            // keep going

            setTimeout(() => {

                tapHint.style.opacity = "1";
                tapHint.style.pointerEvents = "auto";

            }, 3400);

        }, 800);

    }

});


/* =================================
   MOVE FROM PAGE 01 → PAGE 02
================================= */

tapHint.addEventListener("click", () => {

    // Fade out page 01

    openingPage.classList.remove("active");


    // Wait for fade

    setTimeout(() => {

        whenPage.classList.add("active");

    }, 500);

});


/* =================================
   PAGE 02 — DATE FINDER
================================= */

const startDate = new Date(2026, 0, 1);

// Actual date:
const targetDate = new Date(2026, 2, 1);

// Accepted range:
// February 25 → March 7

const validFrom = new Date(2026, 1, 25);
const validUntil = new Date(2026, 2, 7);


/* =================================
   DATE FUNCTIONS
================================= */

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


function dateFromDay(day) {

    const date = new Date(startDate);

    date.setDate(
        startDate.getDate() + day
    );

    return date;

}


function formatDate(date) {

    return `${monthNames[date.getMonth()]} ${date.getDate()}`;

}


/* =================================
   UPDATE SLIDER
================================= */

function updateDate() {

    const day = Number(dateSlider.value);

    const currentDate =
        dateFromDay(day);


    // Update displayed date

    displayDate.textContent =
        formatDate(currentDate);


    // Update progress line

    const percentage =
        (day / Number(dateSlider.max)) * 100;

    timelineProgress.style.width =
        `${percentage}%`;

}


/* =================================
   SLIDER EVENT
================================= */

dateSlider.addEventListener(
    "input",
    updateDate
);


// Initial state

updateDate();


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

confirmDate.addEventListener("click", () => {

    const day =
        Number(dateSlider.value);


    const selectedDate =
        dateFromDay(day);


    const isCorrect =
        selectedDate >= validFrom &&
        selectedDate <= validUntil;


    /* =============================
       CORRECT
    ============================= */

    if (isCorrect) {

        confirmDate.style.opacity = "0";
        confirmDate.style.pointerEvents = "none";

        wrongMessage.classList.remove(
            "visible"
        );


        // Calculate March 1 position

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


            // Ease out

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

            } else {

                dateSlider.value =
                    targetDay;

                updateDate();


                // Show success

                setTimeout(() => {

    successMessage.classList.add(
        "visible"
    );


    setTimeout(() => {

        whenPage.classList.remove("active");

        setTimeout(() => {

            roomPage.classList.add("active");

            startRoom();

        }, 500);

    }, 1800);

}, 500);

            }

        }


        requestAnimationFrame(
            animateToTarget
        );


        return;
    }


    /* =============================
       WRONG
    ============================= */

    attempts++;


    const replyIndex =
        Math.min(
            attempts - 1,
            wrongReplies.length - 1
        );


    wrongMessage.innerHTML = wrongReplies[replyIndex];


    // Restart animation

    wrongMessage.classList.remove(
        "visible"
    );


    void wrongMessage.offsetWidth;


    wrongMessage.classList.add(
        "visible"
    );

});

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
   LETTER → MEMORY REVEAL
================================= */

const congratulationsScene =
    document.querySelector(
        ".congratulations-scene"
    );




/* =================================
   CLOSE FUNCTION
================================= */

function closeBlessingLetter() {

    if (
        !blessingLetter.classList.contains(
            "show"
        )
    ) {
        return;
    }


    /*
     * Close letter.
     */

    blessingLetter.classList.remove(
        "show"
    );


    /*
     * Wait for the closing animation,
     * then show the distant memory.
     */

    setTimeout(() => {

        showMemoryPuzzle();

    }, 800);

}

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
   AUDIO ENDED
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


/* =================================
   PAGE 05 — RING
================================= */

const ringButton =
    document.getElementById(
        "ringButton"
    );

const blessingLetter =
    document.getElementById(
        "blessingLetter"
    );


ringButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        ringButton.classList.add(
            "hidden"
        );

        blessingLetter.classList.add(
            "open"
        );

    }
);


/* =================================
   CLOSE LETTER
================================= */

const letterPaper =
    blessingLetter.querySelector(
        ".letter-paper"
    );


blessingLetter.addEventListener(
    "click",
    (event) => {

        /*
         * Click inside the paper:
         * keep the letter open.
         */

        if (
            letterPaper.contains(
                event.target
            )
        ) {

            return;

        }


        /*
         * Click outside the paper:
         * close the letter.
         */

        blessingLetter.classList.remove(
            "open"
        );


        /*
         * Then reveal the memory.
         */

        setTimeout(() => {

            showMemoryPuzzle();

        }, 800);

    }
);

/* =================================
   PAGE 05 — LAST PUZZLE
================================= */

const memoryPuzzle =
    document.getElementById(
        "memoryPuzzle"
    );

const puzzleBoard =
    document.getElementById(
        "puzzleBoard"
    );

const puzzleSvg =
    document.getElementById(
        "puzzleSvg"
    );

const puzzlePieceSource =
    document.getElementById(
        "puzzlePieceSource"
    );


const PUZZLE_COLS = 4;
const PUZZLE_ROWS = 3;

let puzzleReady = false;
let puzzleDragging = false;

let missingCol = 2;
let missingRow = 1;

let dragOffsetX = 0;
let dragOffsetY = 0;


/* =================================
   SHOW MEMORY
================================= */

function showMemoryPuzzle() {

    console.log(
        "MEMORY REVEAL STARTED"
    );


    /*
     * Build only once.
     */

    if (!puzzleReady) {

        buildMemoryPuzzle();

        puzzleReady = true;

    }


    /*
     * Make sure the puzzle
     * starts in its distant state.
     */

    memoryPuzzle.classList.remove(
    "approaching",
    "puzzle-open"
);


    /*
     * Reset preview.
     */

    memoryPreview.style.opacity =
        "0.55";


    memoryPreview.style.filter =
        "blur(5px)";


    memoryPreview.style.transform =
        `
        translate(-50%, -50%)
        scale(.65)
        `;


    /*
     * SHOW.
     */

    memoryPuzzle.classList.add(
        "show"
    );

}

/* =================================
   CAMERA APPROACH
================================= */

const memoryPreview =
    document.getElementById(
        "memoryPreview"
    );

const puzzleStage =
    document.getElementById(
        "puzzleStage"
    );


memoryPreview.addEventListener(
    "click",
    () => {

        if (
            memoryPuzzle.classList.contains(
                "puzzle-open"
            )
        ) {

            return;

        }


        /*
         * Camera rushes toward
         * the distant image.
         */

        memoryPuzzle.classList.add(
            "approaching"
        );


        /*
         * Wait until the zoom
         * is visually complete.
         */

        setTimeout(() => {

            memoryPuzzle.classList.add(
                "puzzle-open"
            );

        }, 900);

    }
);


/* =================================
   CLICK DISTANT MEMORY
================================= */

memoryPreview.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


        if (
            memoryPuzzle.classList.contains(
                "puzzle-open"
            )
        ) {

            return;

        }


        /*
         * Camera rushes toward
         * the memory.
         */

        memoryPuzzle.classList.add(
            "approaching"
        );


        /*
         * After zoom:
         * reveal the puzzle.
         */

        setTimeout(() => {

            memoryPuzzle.classList.add(
                "puzzle-open"
            );

        }, 950);

    }
);


/* =================================
   BUILD
================================= */

function buildMemoryPuzzle() {

    const width = 1000;
    const height = 700;

    puzzleSvg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    puzzleSvg.innerHTML = "";

    const cellWidth =
        width / PUZZLE_COLS;

    const cellHeight =
        height / PUZZLE_ROWS;


    /*
     * Image used by every puzzle piece.
     */

    const image =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "image"
        );

    image.setAttribute(
    "href",
    "memories.png"
);

    image.setAttribute(
        "x",
        "0"
    );

    image.setAttribute(
        "y",
        "0"
    );

    image.setAttribute(
        "width",
        width
    );

    image.setAttribute(
        "height",
        height
    );


    /*
     * Definitions.
     */

    const defs =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );

    puzzleSvg.appendChild(defs);


    /*
     * Build each piece.
     */

    for (
        let row = 0;
        row < PUZZLE_ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < PUZZLE_COLS;
            col++
        ) {

            const isMissing =
                col === missingCol &&
                row === missingRow;


            if (isMissing) {

                continue;

            }


            const path =
                createPuzzlePath(
                    col,
                    row,
                    cellWidth,
                    cellHeight
                );


            const clipId =
                `piece-${col}-${row}`;


            const clipPath =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "clipPath"
                );

            clipPath.setAttribute(
                "id",
                clipId
            );


            const clipShape =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );

            clipShape.setAttribute(
                "d",
                path
            );


            clipPath.appendChild(
                clipShape
            );

            defs.appendChild(
                clipPath
            );


            const pieceGroup =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );

            pieceGroup.setAttribute(
                "clip-path",
                `url(#${clipId})`
            );


            const pieceImage =
                image.cloneNode();


            pieceGroup.appendChild(
                pieceImage
            );


            puzzleSvg.appendChild(
                pieceGroup
            );


            /*
             * Soft puzzle seam.
             */

            const seam =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );

            seam.setAttribute(
                "d",
                path
            );

            seam.setAttribute(
                "fill",
                "none"
            );

            seam.setAttribute(
                "stroke",
                "rgba(255,255,255,0.55)"
            );

            seam.setAttribute(
                "stroke-width",
                "2"
            );

            seam.setAttribute(
                "pointer-events",
                "none"
            );

            puzzleSvg.appendChild(
                seam
            );

        }

    }


    /*
     * Draw missing-piece outline.
     */

    const missingPath =
        createPuzzlePath(
            missingCol,
            missingRow,
            cellWidth,
            cellHeight
        );


    const missingOutline =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

    missingOutline.setAttribute(
        "d",
        missingPath
    );

    missingOutline.setAttribute(
        "fill",
        "rgba(125, 100, 70, 0.08)"
    );

    missingOutline.setAttribute(
        "stroke",
        "rgba(125, 100, 70, 0.22)"
    );

    missingOutline.setAttribute(
        "stroke-width",
        "3"
    );

    missingOutline.setAttribute(
        "stroke-dasharray",
        "7 7"
    );

    missingOutline.setAttribute(
        "pointer-events",
        "none"
    );

    puzzleSvg.appendChild(
        missingOutline
    );


    /*
 * =================================
 * BUILD REAL MISSING PIECE
 * =================================
 */

puzzlePieceSource.innerHTML = "";

const pieceSvg =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

pieceSvg.setAttribute(
    "viewBox",
    `0 0 ${cellWidth} ${cellHeight}`
);

pieceSvg.setAttribute(
    "width",
    cellWidth
);

pieceSvg.setAttribute(
    "height",
    cellHeight
);

pieceSvg.style.width = "100%";
pieceSvg.style.height = "100%";
pieceSvg.style.display = "block";


/*
 * Clip the image using the exact
 * same missing-piece shape.
 */

const pieceDefs =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
    );


const pieceClip =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "clipPath"
    );

pieceClip.setAttribute(
    "id",
    "drag-piece-clip"
);


const piecePath =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );


const localPiecePath =
    createPuzzlePath(
        missingCol,
        missingRow,
        cellWidth,
        cellHeight
    );


/*
 * createPuzzlePath returns coordinates
 * relative to the full board.
 *
 * Move them back so the piece becomes
 * a standalone 1-cell SVG.
 */

const offsetX =
    missingCol * cellWidth;

const offsetY =
    missingRow * cellHeight;


const translatedPath =
    localPiecePath.replace(
        /([MLCZ])([^MLCZ]*)/g,
        (match, command, coords) => {

            const numbers =
                coords
                    .trim()
                    .split(/[\s,]+/)
                    .map(Number);

            if (
                numbers.some(
                    n => !Number.isFinite(n)
                )
            ) {

                return match;

            }

            for (
                let i = 0;
                i < numbers.length;
                i += 2
            ) {

                numbers[i] -= offsetX;
                numbers[i + 1] -= offsetY;

            }

            return (
                command +
                " " +
                numbers.join(" ")
            );

        }
    );


piecePath.setAttribute(
    "d",
    translatedPath
);

pieceClip.appendChild(
    piecePath
);

pieceDefs.appendChild(
    pieceClip
);

pieceSvg.appendChild(
    pieceDefs
);


/*
 * Actual image.
 */

const pieceImage =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
    );

pieceImage.setAttribute(
    "href",
    "memories.png"
);

pieceImage.setAttribute(
    "x",
    -offsetX
);

pieceImage.setAttribute(
    "y",
    -offsetY
);

pieceImage.setAttribute(
    "width",
    width
);

pieceImage.setAttribute(
    "height",
    height
);

pieceImage.setAttribute(
    "clip-path",
    "url(#drag-piece-clip)"
);

pieceImage.setAttribute(
    "preserveAspectRatio",
    "none"
);

pieceSvg.appendChild(
    pieceImage
);


/*
 * Slight shadow so the loose piece
 * actually feels like a physical piece.
 */

pieceSvg.style.filter =
    "drop-shadow(0 12px 14px rgba(70,45,25,.22))";


puzzlePieceSource.appendChild(
    pieceSvg
);


/*
 * Put the piece UNDER the board.
 */

puzzlePieceSource.style.left =
    "50%";

puzzlePieceSource.style.top =
    "auto";

puzzlePieceSource.style.bottom =
    "7%";

puzzlePieceSource.style.width =
    `${cellWidth}px`;

puzzlePieceSource.style.height =
    `${cellHeight}px`;

puzzlePieceSource.style.opacity =
    "1";

puzzlePieceSource.style.transform =
    "translateX(-50%) rotate(0deg)";

puzzlePieceSource.dataset.col =
    missingCol;

puzzlePieceSource.dataset.row =
    missingRow;
}


/* =================================
   REAL JIGSAW PUZZLE PATH
================================= */

function createPuzzlePath(
    col,
    row,
    cellWidth,
    cellHeight
) {

    const x = col * cellWidth;
    const y = row * cellHeight;

    const w = cellWidth;
    const h = cellHeight;

    /*
     * Smaller, more natural jigsaw tabs.
     */
    const tabW = w * 0.16;
    const tabH = h * 0.18;

    /*
     * Every internal edge gets ONE deterministic
     * shape. Neighboring pieces use the exact
     * opposite of that same edge.
     */

    function horizontalEdge(
        x1,
        y1,
        length,
        direction
    ) {

        if (direction === 0) {

            return `L ${x1 + length} ${y1}`;

        }

        const cx = x1 + length / 2;

        const neck = length * 0.30;

        const r = tabW;

        return `
            L ${x1 + neck} ${y1}

            C
                ${x1 + length * 0.39} ${y1}
                ${cx - r} ${y1}
                ${cx - r * 0.72} ${y1 + direction * tabH * 0.72}

            C
                ${cx - r * 0.42} ${y1 + direction * tabH}
                ${cx + r * 0.42} ${y1 + direction * tabH}
                ${cx + r * 0.72} ${y1 + direction * tabH * 0.72}

            C
                ${cx + r} ${y1}
                ${x1 + length * 0.61} ${y1}
                ${x1 + length - neck} ${y1}

            L ${x1 + length} ${y1}
        `;

    }


    function verticalEdge(
        x1,
        y1,
        length,
        direction
    ) {

        if (direction === 0) {

            return `L ${x1} ${y1 + length}`;

        }

        const cy = y1 + length / 2;

        const neck = length * 0.30;

        const r = tabH;

        return `
            L ${x1} ${y1 + neck}

            C
                ${x1} ${y1 + length * 0.39}
                ${x1} ${cy - r}
                ${x1 + direction * tabW * 0.72} ${cy - r * 0.72}

            C
                ${x1 + direction * tabW} ${cy - r * 0.42}
                ${x1 + direction * tabW} ${cy + r * 0.42}
                ${x1 + direction * tabW * 0.72} ${cy + r * 0.72}

            C
                ${x1} ${cy + r}
                ${x1} ${y1 + length * 0.61}
                ${x1} ${y1 + length - neck}

            L ${x1} ${y1 + length}
        `;

    }


    /*
     * ---------------------------------
     * SHARED EDGE DIRECTIONS
     * ---------------------------------
     *
     * These values describe the shape of
     * the actual shared edge.
     *
     * IMPORTANT:
     * Both neighboring pieces use the SAME
     * edge definition, but opposite direction
     * because they face each other.
     */


    function horizontalSharedEdge(
        edgeCol,
        edgeRow
    ) {

        /*
         * Deterministic pseudo-random pattern.
         */

        return (
            (edgeCol * 7 +
             edgeRow * 11) % 2 === 0
        )
            ? 1
            : -1;

    }


    function verticalSharedEdge(
        edgeCol,
        edgeRow
    ) {

        return (
            (edgeCol * 13 +
             edgeRow * 5) % 2 === 0
        )
            ? 1
            : -1;

    }


    /*
     * ---------------------------------
     * TOP
     * ---------------------------------
     */

    let topDirection = 0;

    if (row > 0) {

        /*
         * The edge belongs to the row above.
         * Because this is the TOP of this piece,
         * it must face the opposite direction.
         */

        topDirection =
            -horizontalSharedEdge(
                col,
                row - 1
            );

    }


    /*
     * ---------------------------------
     * RIGHT
     * ---------------------------------
     */

    let rightDirection = 0;

    if (col < PUZZLE_COLS - 1) {

        rightDirection =
            verticalSharedEdge(
                col,
                row
            );

    }


    /*
     * ---------------------------------
     * BOTTOM
     * ---------------------------------
     */

    let bottomDirection = 0;

    if (row < PUZZLE_ROWS - 1) {

        bottomDirection =
            horizontalSharedEdge(
                col,
                row
            );

    }


    /*
     * ---------------------------------
     * LEFT
     * ---------------------------------
     */

    let leftDirection = 0;

    if (col > 0) {

        /*
         * This edge belongs to the piece
         * on the left, so reverse it.
         */

        leftDirection =
            -verticalSharedEdge(
                col - 1,
                row
            );

    }


    /*
     * ---------------------------------
     * BUILD PATH
     * ---------------------------------
     */

    let d = `M ${x} ${y}`;


    /*
     * TOP
     */

    d += horizontalEdge(
        x,
        y,
        w,
        topDirection
    );


    /*
     * RIGHT
     */

    d += verticalEdge(
        x + w,
        y,
        h,
        rightDirection
    );


    /*
     * BOTTOM
     *
     * Traversed RIGHT → LEFT.
     *
     * We construct the edge normally
     * LEFT → RIGHT and reverse it.
     */

    if (bottomDirection === 0) {

        d += `
            L ${x} ${y + h}
        `;

    } else {

        const cx = x + w / 2;

        const neck = w * 0.30;

        const r = tabW;

        const dir = -bottomDirection;

        d += `
            L ${x + w - neck} ${y + h}

            C
                ${x + w * 0.61} ${y + h}
                ${cx + r} ${y + h}
                ${cx + r * 0.72} ${y + h + dir * tabH * 0.72}

            C
                ${cx + r * 0.42} ${y + h + dir * tabH}
                ${cx - r * 0.42} ${y + h + dir * tabH}
                ${cx - r * 0.72} ${y + h + dir * tabH * 0.72}

            C
                ${cx - r} ${y + h}
                ${x + w * 0.39} ${y + h}
                ${x + neck} ${y + h}

            L ${x} ${y + h}
        `;

    }


    /*
     * LEFT
     *
     * Traversed BOTTOM → TOP.
     */

    if (leftDirection === 0) {

        d += `
            L ${x} ${y}
        `;

    } else {

        const cy = y + h / 2;

        const neck = h * 0.30;

        const r = tabH;

        const dir = -leftDirection;

        d += `
            L ${x} ${y + h - neck}

            C
                ${x} ${y + h * 0.61}
                ${x} ${cy + r}
                ${x + dir * tabW * 0.72} ${cy + r * 0.72}

            C
                ${x + dir * tabW} ${cy + r * 0.42}
                ${x + dir * tabW} ${cy - r * 0.42}
                ${x + dir * tabW * 0.72} ${cy - r * 0.72}

            C
                ${x} ${cy - r}
                ${x} ${y + h * 0.39}
                ${x} ${y + neck}

            L ${x} ${y}
        `;

    }


    d += " Z";

    return d;
}


/* =================================
   DRAG PUZZLE PIECE
================================= */

puzzlePieceSource.addEventListener(
    "pointerdown",
    (event) => {

        event.preventDefault();

        puzzleDragging = true;

        puzzlePieceSource.classList.add(
            "dragging"
        );

        const rect =
            puzzlePieceSource.getBoundingClientRect();


        dragOffsetX =
            event.clientX -
            (
                rect.left +
                rect.width / 2
            );

        dragOffsetY =
            event.clientY -
            (
                rect.top +
                rect.height / 2
            );


        puzzlePieceSource.setPointerCapture(
            event.pointerId
        );

    }
);


puzzlePieceSource.addEventListener(
    "pointermove",
    (event) => {

        if (!puzzleDragging) {
            return;
        }


        const x =
            event.clientX -
            dragOffsetX;

        const y =
            event.clientY -
            dragOffsetY;


        puzzlePieceSource.style.left =
            `${x}px`;

        puzzlePieceSource.style.top =
            `${y}px`;

        puzzlePieceSource.style.bottom =
            "auto";


        checkPuzzlePosition();

    }
);


puzzlePieceSource.addEventListener(
    "pointerup",
    () => {

        if (!puzzleDragging) {
            return;
        }

        puzzleDragging = false;

        puzzlePieceSource.classList.remove(
            "dragging"
        );

        checkPuzzlePosition(true);

    }
);


puzzlePieceSource.addEventListener(
    "pointercancel",
    () => {

        puzzleDragging = false;

        puzzlePieceSource.classList.remove(
            "dragging"
        );

    }
);


/* =================================
   CHECK POSITION
================================= */

function checkPuzzlePosition(
    release = false
) {

    const boardRect =
        puzzleBoard.getBoundingClientRect();


    const pieceRect =
        puzzlePieceSource.getBoundingClientRect();


    /*
     * Target position inside board.
     */

    const targetX =
        boardRect.left +
        (
            missingCol /
            PUZZLE_COLS
        ) *
        boardRect.width;


    const targetY =
        boardRect.top +
        (
            missingRow /
            PUZZLE_ROWS
        ) *
        boardRect.height;


    const targetW =
        boardRect.width /
        PUZZLE_COLS;


    const targetH =
        boardRect.height /
        PUZZLE_ROWS;


    const pieceCenterX =
        pieceRect.left +
        pieceRect.width / 2;

    const pieceCenterY =
        pieceRect.top +
        pieceRect.height / 2;


    const targetCenterX =
        targetX +
        targetW / 2;

    const targetCenterY =
        targetY +
        targetH / 2;


    const distance =
        Math.hypot(
            pieceCenterX -
            targetCenterX,

            pieceCenterY -
            targetCenterY
        );


    /*
     * Close enough.
     */

    if (distance < 85) {

        puzzlePieceSource.style.left =
            `${targetCenterX}px`;

        puzzlePieceSource.style.top =
            `${targetCenterY}px`;


        puzzlePieceSource.style.transform =
            "translate(-50%, -50%) rotate(0deg)";


        if (release) {

            completePuzzle();

        }

    }

}


/* =================================
   PUZZLE COMPLETE
================================= */

let puzzleCompleted =
    false;

let waitingForFinalClick =
    false;


function completePuzzle() {

    if (puzzleCompleted) {

        return;

    }


    puzzleCompleted = true;


    /*
     * =================================
     * PUT THE MISSING PIECE INTO THE
     * ACTUAL BOARD
     * =================================
     */

    const width = 1000;
    const height = 700;

    const cellWidth =
        width / PUZZLE_COLS;

    const cellHeight =
        height / PUZZLE_ROWS;


    /*
     * Build the missing piece
     * directly inside the board SVG.
     */

    const defs =
        puzzleSvg.querySelector("defs");


    const finalClip =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "clipPath"
        );

    finalClip.setAttribute(
        "id",
        "completed-piece-clip"
    );


    const finalPath =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    finalPath.setAttribute(
        "d",
        createPuzzlePath(
            missingCol,
            missingRow,
            cellWidth,
            cellHeight
        )
    );


    finalClip.appendChild(
        finalPath
    );

    defs.appendChild(
        finalClip
    );


    const finalImage =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "image"
        );


    finalImage.setAttribute(
        "href",
        "memories.png"
    );

    finalImage.setAttribute(
        "x",
        "0"
    );

    finalImage.setAttribute(
        "y",
        "0"
    );

    finalImage.setAttribute(
        "width",
        width
    );

    finalImage.setAttribute(
        "height",
        height
    );

    finalImage.setAttribute(
        "clip-path",
        "url(#completed-piece-clip)"
    );

    finalImage.setAttribute(
        "preserveAspectRatio",
        "none"
    );


    /*
     * Put it above everything.
     */

    puzzleSvg.appendChild(
        finalImage
    );


    /*
     * Remove the dashed missing outline.
     */

    const outlines =
        puzzleSvg.querySelectorAll(
            'path[stroke-dasharray]'
        );


    outlines.forEach(
        outline => {

            outline.remove();

        }
    );


    /*
     * Hide the loose piece.
     */

    puzzlePieceSource.style.transition =
        "opacity .35s ease";

    puzzlePieceSource.style.opacity =
        "0";


    /*
     * Let the completed picture
     * stay on screen.
     */

    setTimeout(() => {

        waitingForFinalClick =
            true;

        memoryPuzzle.classList.add(
            "completed-wait"
        );

    }, 1500);

}

/* =================================
   COMPLETED PUZZLE → FINAL PAGE
   CLICK ANYWHERE
================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !waitingForFinalClick
        ) {

            return;

        }


        /*
         * Ignore clicks that happen
         * before the puzzle has finished.
         */

        waitingForFinalClick =
            false;


        const finalPage =
            document.getElementById(
                "finalPage"
            );


        if (!finalPage) {

            console.error(
                "finalPage not found"
            );

            return;

        }


        /*
         * Fade the completed memory away.
         */

        memoryPuzzle.classList.remove(
            "show"
        );


        /*
         * Then move to Page 06.
         */

        setTimeout(() => {

            congratulationsScene
                .closest(".page")
                .classList.remove(
                    "active"
                );

            finalPage.classList.add(
                "active"
            );

        }, 900);

    }
);

/* =================================
   PAGE 04 → PAGE 05
================================= */




/* =================================
   DEV NAVIGATION
================================= */

const devNavigation =
    document.getElementById("devNavigation");


const devButtons =
    devNavigation.querySelectorAll(
        "button"
    );


function devGoToPage(pageId) {

    const targetPage =
        document.getElementById(pageId);

    if (!targetPage) {

        console.error(
            "Page not found:",
            pageId
        );

        return;
    }


    // Hide every page

    document
        .querySelectorAll(".page")
        .forEach((page) => {

            page.classList.remove(
                "active"
            );

        });


    // Show requested page

    targetPage.classList.add(
        "active"
    );


    // Stop Page 04 audio

    if (
        typeof songAudio !== "undefined"
    ) {

        songAudio.pause();

    }


    /*
     * Page 04
     */

    if (
        pageId === "songPage"
    ) {

        if (
            typeof resetSongPage ===
            "function"
        ) {

            resetSongPage();

        }

    }


    /*
     * Page 05
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

}

