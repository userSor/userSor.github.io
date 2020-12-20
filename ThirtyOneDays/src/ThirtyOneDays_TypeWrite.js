let textSpeed = 40; // default text speed

// text console
const textConsole = {
  get element() {
    return document.getElementById('textConsole');
  },

  normalText() {
    this.element.style.fontSize = '20px';
  },

  bigText() {
    this.element.style.fontSize = '60px';
  },

  clear() {
    this.element.innerHTML = '';
    ChoiceButton.hideAll();
    PlayerStat.hideAll();
    Item.hideAll();
  },
};

// writes text
/**
 * Types the text on the website if game is over. Saves test to last event if "noSave" isn't true. Only game over text will write when game.isOver.
 * @param {string} textIn - The text to write.
 */
/**
 * Types the text on the website. Saves test to last event if not "Inventory";
 * @param {string} textIn - The text to write.
 * @param {true} [noSave] - If the text is about inventory. Text will not save to lastEvent.
 * @param {true} [forGameOver] - If the text is for game over.
 */
async function writeText(textIn, noSave, forGameOver) {
  if (!game.isOver || (game.isOver && forGameOver)) {
    textConsole.clear();
    let l = 0; // l = letter index in text
    while (l < textIn.length) {
      let letter = textIn.charAt(l);
      l++;
  
      // add letter
      await new Promise(resolve => {
        setTimeout(function () {
          textConsole.element.innerHTML += letter;
          resolve();
        }, 1000 / textSpeed);
      });
    }
  
    noSave ? false : lastEvent.saveText(textIn);
  }
};

// sets text speed
const typeSlider = new GameElement('typeSlider');
function setSpeed() {
  textSpeed = typeSlider.element.value;

  document.getElementById('typeSliderLabel').innerHTML = `Text Speed: ${textSpeed}`;
}

typeSlider.element.addEventListener('input', setSpeed);
