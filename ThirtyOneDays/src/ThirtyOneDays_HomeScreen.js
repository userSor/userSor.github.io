// play game
async function startGame() {
  textConsole.normalText();
  HomeButton.hideAll();
  nextDay();
}

// story
async function writeStory() {
  textConsole.normalText();
  HomeButton.hideAll();
  await writeText(textScripts.start.story);
  backButton.show();
}

// credits
const credits = new GameElement("credits");

async function writeCredits() {
  textConsole.bigText();
  HomeButton.hideAll();
  await writeText(textScripts.start.credits);
  credits.show();
  backButton.show();
}

// back button returns to home screen
async function returnToHome() {
  textConsole.bigText();
  backButton.hide();
  credits.hide();
  await writeText(textScripts.start.title);
  HomeButton.showAll();
}

// adding the button click listeners
playButton.element.addEventListener('click', startGame);
storyButton.element.addEventListener('click', writeStory);
creditsButton.element.addEventListener('click', writeCredits);
backButton.element.addEventListener('click', returnToHome);
