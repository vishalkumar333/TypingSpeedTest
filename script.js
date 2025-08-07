const paragraphs = [
    "The sun dipped below the horizon, casting a warm glow across the tranquil meadow. Trees stood as silent sentinels, their leaves whispering tales of a bygone era. In this peaceful haven, time seemed to slow, allowing the world to exhale in rhythmic harmony.",

    "Amidst the urban labyrinth, skyscrapers reached for the heavens, reflecting the neon dreams of a bustling city. Anonymous faces hurried along crowded streets, each lost in their own narrative. The metropolis pulsed with life, a symphony of noise and motion echoing the heartbeat of progress.",

    "A solitary figure stood on the cliff's edge, gazing into the vast expanse of the ocean. Waves crashed against the rugged shoreline, a rhythmic reminder of nature's eternal dance. The horizon, a meeting point of earth and sky, held the promise of endless possibilities.",

    "The ancient clock ticked solemnly, marking the passage of time in a room adorned with memories. Shadows danced on weathered walls, revealing the secrets of forgotten yesterdays. A single candle flickered, casting an ethereal glow on the pages of a well-worn book.",

    "In the heart of the forest, sunlight filtered through the canopy, creating a dappled mosaic on the forest floor. The symphony of birdsong echoed through the trees, as flora and fauna engaged in a timeless dance. Nature's palette painted a vivid masterpiece, inviting all to witness its silent brilliance.",

    "The artist, consumed by the strokes of creativity, transformed a blank canvas into a vibrant tapestry of colors. Each brushstroke carried the essence of emotion, a visual poem unfolding on the painter's easel. The studio became a sacred space, where imagination danced freely to the hum of inspiration.",

    "As twilight descended, the cityscape transformed into a sparkling panorama of lights. Skyscrapers became beacons in the urban night, and the rhythm of life continued beneath the celestial canopy. It was a metropolis alive with dreams, where the echoes of footsteps and car horns composed an urban nocturne.",

    "A quaint village nestled in the valley embraced simplicity, its cobblestone streets winding like a labyrinth of nostalgia. Each building, weathered by time, told tales of generations past. The village square bustled with the laughter of children and the chatter of locals, creating a timeless haven in the embrace of tradition.",
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer, maxTime = 60, timeLeft = maxTime, charIndex = 0, mistakes = 0, isTyping = false;

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraph = paragraphs[randomIndex];
    
    typingText.innerHTML = paragraph
        .split("")
        .map(char => `<span>${char}</span>`)
        .join("");
    
    typingText.querySelector("span").classList.add("active");
    addEventListeners();
}

function addEventListeners() {
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    const typedChar = inpField.value[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        startTimer();
        handleTypedCharacter(characters, typedChar);
        updateStats(characters);
    } else {
        endGame();
    }
}

function startTimer() {
    if (!isTyping) {
        timer = setTimeout(initTimer, 1000);
        isTyping = true;
    }
}

function handleTypedCharacter(characters, typedChar) {
    if (typedChar === characters[charIndex].textContent) {
        characters[charIndex].classList.add("correct");
    } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
    }

    charIndex++;
    updateActiveCharacter(characters);
}

function updateActiveCharacter(characters) {
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
}

function updateStats(characters) {
    const wpm = calculateWPM();
    wpmTag.textContent = wpm;
    mistakeTag.textContent = mistakes;
    cpmTag.textContent = charIndex - mistakes;
}

function calculateWPM() {
    return Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60) || 0;
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimeTag();
        updateWPMTag();
    } else {
        clearInterval(timer);
    }
}

function updateTimeTag() {
    timeTag.innerText = timeLeft;
}

function updateWPMTag() {
    const wpm = calculateWPM();
    wpmTag.innerText = wpm;
}

function endGame() {
    clearInterval(timer);
    inpField.value = "";
}

function resetGame() {
    loadParagraph();
    resetVariables();
    resetTags();
}

function resetVariables() {
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
}

function resetTags() {
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
