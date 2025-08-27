const choices = ["Pierre", "Feuille", "Ciseaux"];
const buttons = document.querySelectorAll(".choice-btn");
const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const result = document.getElementById("result");
const history = document.getElementById("history");
const resetBtn = document.getElementById("resetBtn");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;
const maxScore = 5; // Limite de score

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(player, computer) {
  if (player === computer) return "Égalité !";
  if (
    (player === "Pierre" && computer === "Ciseaux") ||
    (player === "Feuille" && computer === "Pierre") ||
    (player === "Ciseaux" && computer === "Feuille")
  )
    return "Tu gagnes ! 🎉";
  return "L'ordinateur gagne ! 😢";
}

function checkWinner() {
  if (playerScore >= maxScore) {
    result.textContent = "🏆 Bravo, tu as gagné la partie !";
    disableButtons();
  } else if (computerScore >= maxScore) {
    result.textContent = "💻 L'ordinateur remporte la partie...";
    disableButtons();
  }
}

function disableButtons() {
  buttons.forEach((btn) => (btn.disabled = true));
}

function enableButtons() {
  buttons.forEach((btn) => (btn.disabled = false));
}

// Ajout des cartes
const playerChoiceCard = document.getElementById("playerChoiceCard");
const computerChoiceCard = document.getElementById("computerChoiceCard");

const emojiMap = {
  Pierre: "✊",
  Feuille: "✋",
  Ciseaux: "✌️",
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (playerScore >= maxScore || computerScore >= maxScore) return;

    const player = btn.getAttribute("data-choice");
    const computer = getComputerChoice();

    playerChoice.textContent = emojiMap[player];
    computerChoice.textContent = emojiMap[computer];

    const roundResult = playRound(player, computer);
    result.textContent = roundResult;

    // Score
    if (roundResult.includes("Tu gagnes")) playerScore++;
    if (roundResult.includes("ordinateur")) computerScore++;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // Effet glow sur le gagnant du round
    playerChoiceCard.classList.remove("winner");
    computerChoiceCard.classList.remove("winner");
    if (roundResult.includes("Tu gagnes"))
      playerChoiceCard.classList.add("winner");
    else if (roundResult.includes("ordinateur"))
      computerChoiceCard.classList.add("winner");

    // Historique
    const div = document.createElement("div");
    div.textContent = `Joueur: ${emojiMap[player]} - Ordi: ${emojiMap[computer]} → ${roundResult}`;
    div.className = "p-2 rounded-lg shadow-sm text-sm font-medium";
    if (roundResult.includes("Tu gagnes"))
      div.classList.add("bg-green-100", "text-green-700");
    if (roundResult.includes("ordinateur"))
      div.classList.add("bg-red-100", "text-red-700");
    if (roundResult.includes("Égalité"))
      div.classList.add("bg-gray-100", "text-gray-700");
    history.prepend(div);

    checkWinner();
  });
});

resetBtn.addEventListener("click", () => {
  playerChoice.textContent = "–";
  computerChoice.textContent = "–";
  result.textContent = "Fais ton choix !";
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  history.innerHTML = "";
  enableButtons();
});
