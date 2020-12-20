//@ts-check
/**
 * Chooses a random string from an array.
 * @param {string[]} array - The array to select string from.
 * @returns {string} A string from the array.
 */
function randomStringFrom(array) {
  const randomInd = Math.floor(Math.random() * array.length);
  return array[randomInd];
}

/* Time and keys */
let day = 0;
let time = 0;

const key = {
  timeKeys: ["title", "morning", "battle", "night"],

  get time() {
    return this.timeKeys[time];
  }
};

/**
 * For days with a Boss Enemy. Boss days are 11 and 21; 31 is Final Boss Day
 */
const bossDay = {
  get isToday() {
    return day === 11 || day === 21;
  },
  get isTomorrow() {
    return day === 10 || day === 20;
  },
  get firstBossIsTomorrow() {
    return day === 10
  }
}

/**
 * For final day 31 with final boss enemy. 
 */
const finalDay = {
  get isToday() {
    return day === 31;
  },
  get isTomorrow() {
    return day === 30;
  },
}

/**
 * Framework for all elements.
 */
class GameElement {
  /**
   * Connects js object to html element.
   * @param {string} elementId - Id of html element.
   */
  constructor(elementId) {
    this._elementId = elementId;
  }
  
  /**
   * @returns {HTMLElement} Html element.
   */
  get element() {
    return document.getElementById(this._elementId);
  }
  
  /**
   * Hides button.
   */
  hide() {
    this.element.style.display = 'none';
  }
  
  /**
   * Shows button
   */
  show() {
    this.element.style.display = 'inline-block';
  }
}

/**
 * For "Back" option in Inventory. Used in goBack, showChoices, and writeText functions.
 */
const lastEvent = {
  _text: '',
  _choices: [],

  get text() {
    return this._text;
  },

  get choices() {
    return this._choices;
  },

  saveText(text) {
    this._text = text;
  },

  saveChoices(choices) {
    this._choices = choices;
  }
}
