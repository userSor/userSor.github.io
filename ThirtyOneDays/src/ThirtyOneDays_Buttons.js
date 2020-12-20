/**
 * Base class framework for all buttons.
 * @extends GameElement
 */
class Button extends GameElement {
  /**
   * Creates js object and connects to html button.
   * @param {string} buttonId - Id of html button.
   */
  constructor(buttonId) {
    super(buttonId);
  }

  /**
   * Hides all buttons of class.
   * @param {string} className - Class of html buttons.
   */
  static _hideButtons(className) {
    const buttons = document.getElementsByClassName(className);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'none';
    }
  }

  /**
   * Shows all buttons of class.
   * @param {string} className - Class of html buttons.
   */
  static _showButtons(className) {
    const buttons = document.getElementsByClassName(className);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'block';
    }
  }
}

/**
 * Class for home buttons.
 * @extends Button
 */
class HomeButton extends Button {
  /**
   * Creates js object and connects to html button.
   * @param {string} buttonId - Id of html button.
   */
  constructor(buttonId) {
    super(buttonId);
  }

  /**
   * Hides all home buttons.
   */
  static hideAll() {
    super._hideButtons('homeButtons');
  }

  /**
   * Shows all home buttons.
   */
  static showAll() {
    super._showButtons('homeButtons');
  }
}

// Choice buttons framework and list
const choiceButtons = [];
/**
 * Class for choice buttons.
 * @extends Button
 */
class ChoiceButton extends Button {
  /**
   * Creates js object and connects to html button.
   * @param {string} buttonId  - Id of html button.
   */
  constructor(buttonId) {
    super(buttonId);
    choiceButtons.push(this);
  }

  /**
   * Hides all choice buttons.
   */
  static hideAll() {
    super._hideButtons('choiceButtons');
  }

  /**
   * Shows all choice buttons.
   */
  static showAll() {
    choiceButtons.forEach(button => {
      button.element.style.display = 'inline-block';
    });
  }
}

// home screen buttons
const playButton = new HomeButton('playButton');
const storyButton = new HomeButton('storyButton');
const creditsButton = new HomeButton('creditsButton');
const backButton = new Button('backButton');

// game buttons
const choice1Button = new ChoiceButton('choice1');
const choice2Button = new ChoiceButton('choice2');
const choice3Button = new ChoiceButton('choice3');
const choice4Button = new ChoiceButton('choice4');
