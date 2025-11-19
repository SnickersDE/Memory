// ---- Memory Images ----
const images = [
  "images/img1.jpg", "images/img1.jpg",
  "images/img2.jpg", "images/img2.jpg",
  "images/img3.jpg", "images/img3.jpg",
  "images/img4.jpg", "images/img4.jpg"
];

// Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
let shuffled = shuffle(images);

let firstCard, secondCard;
let lock = false;
let matches = 0;

const grid = document.getElementById("gameGrid");

// Build Grid
shuffled.forEach(src => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-inner">
        <div class="front"><img src="${src}"></div>
        <div class="back"></div>
    </div>
  `;

  card.addEventListener("click", () => flip(card));
  grid.appendChild(card);
});

function flip(card) {
  if (lock || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    check();
  }
}

// Match logic
function check() {
  let img1 = firstCard.querySelector("img").src;
  let img2 = secondCard.querySelector("img").src;

  if (img1 === img2) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    update();
    reset();
  } else {
    lock = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      reset();
    }, 700);
  }
}

function reset() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

// Progress
function update() {
  let bar = document.getElementById("progress-bar");
  let text = document.getElementById("progress-text");

  let progress = (matches / 4) * 100;
  bar.style.width = progress + "%";
  text.innerText = `${matches} / 4`;

  if (matches === 4) celebrate();
}

// Konfetti
const jsConfetti = new JSConfetti();
function celebrate() {
  jsConfetti.addConfetti({
    emojis: ["🎉", "✨", "🥳"],
    emojiSize: 40,
    confettiNumber: 120,
  });
}
