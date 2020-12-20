//@ts-check
const statsConsole = new GameElement('statsConsole');
const stats = [];
const statNames = [];


/**
 * Class for player's stats.
 * @extends GameElement
 */
class PlayerStat extends GameElement {
  /**
   * Creates a player stat.
   * @param {string} statId - Html element id to connect stat object to.
   * @param {string} statName - Name of the stat.
   * @param {string[]} conditions - All stat conditions.
   */
  constructor(statId, statName, conditions) {
    super(statId);
    this._statName = statName;
    this._level = 50;

    this._conditions = conditions;
    this._currentEffects; // for statEffects
    switch (statName) {
      case 'Effects':
        this._currentEffects = ["none"];
        break;
      default:
        break;
    }

    stats.push(this);
    statNames.push(this._statName);
  }

  /**
   * For all stats except for Effects. Changes string color
   * @returns {string} The player's current condition for the stat
   */
  get currentCondition() {
    const levelPercentage = this._level / 101;
    let condIndex;
    condIndex = Math.floor(this._conditions.length * levelPercentage);

    switch (condIndex) {
      case 0:
        this.element.style.color = 'maroon';
        break;
      case 1:
        this.element.style.color = 'gold';
        break;
      default:
        this.element.style.color = 'darkgrey';
        break;
    }

    condIndex = Math.floor(this._conditions.length * levelPercentage);
    return this._conditions[condIndex].toUpperCase();
  }

  /**
   * Only for statEffects. Changes string color
   * @returns {string} The player's current effects.
   */
  get currentConditions() {
    // for effect
    let effects = '';
      this._currentEffects.forEach(effect => {
        effects += `${effect.toUpperCase()} `;
        switch(effect) {
          case "none":
            this.element.style.color = "darkgrey";
            break;
          case "bleeding":
            this.element.style.color = "firebrick";
            break;
          case "poisoned":
            this.element.style.color = "purple";
            break;
          case "weak":
            this.element.style.color = "sienna";
            break;
          default:
            this.element.style.color = "black";
            break;
        }
      });
    return effects;
  }

  _update() {
    switch (this._statName) {
      case 'Effects':
        this.element.innerHTML = `${this._statName} Status: ${this.currentConditions}`;
        break;
      default:
        this.element.innerHTML = `${this._statName} Status: ${this.currentCondition}`;
        break;
    }
  }

  /**
   * Used for activating player's effects. Only for statEffects.
   */
  _activateEffects() {
    this._currentEffects.forEach(condition => {
      switch (condition) {
        case "bleeding":
          statHealth.decrease(20);
          break;
        case "poisoned":
          statHealth.decrease(10);
          break;
      }
    })
  }

  /**
   * Used for changing player's effects. Only for statEffects.
   * @param {"add"|"remove"} changeType - The Type of change.
   * @param {"none"|"bleeding"|"weak"|"poisoned"} effect - The effect to add/remove.
   */
  changeEffects(changeType, effect) {
    switch (changeType) {
      case "add":
        if (this._conditions.includes(effect) && !this._currentEffects.includes(effect)) {
          this._currentEffects.push(effect);
          this._currentEffects = this._currentEffects.filter(condition => condition != "none");
        }
        break;
      case "remove":
        this._currentEffects = this._currentEffects.filter(condition => condition != effect);
        if (!this._currentEffects.length) {
          this._currentEffects.push("none");
        }
        break;
      default:
        console.log("ERROR: CHANGE EFFECT TYPE NOT SPECIFIED");
    }
  }
/**
 * Increases the stat's level. Caps level at 100.
 * @param {number} num - The amount increase in the stat.
 */
  increase(num) {
    this._level += num;
    if (this._level > 100) {
      this._level = 100;
    }
  }

  /**
   * Decreases the stat's level. Loses game if run out of level and game is still not over.
   * @param {number} num - The amount decrease in the stat.
   */
  decrease(num) {
    this._level -= num;
    if (this._level <= 0 && !game.isOver) {
      game.lose(` You ran out of ${this._statName.toUpperCase()}!`);
    }
  }

  static _updateAll() {
    stats.forEach(stat => {
      stat._update();
    });
  }

  /**
   * Used when player continues the game. Effects(Bleeding and Poisoned) activate, Hunger and Thirst stat levels decrease.
   */
  static continueOn() {
    statEffects._activateEffects();
    statHunger.decrease(5);
    statThirst.decrease(10);
  }

  /**
   * Hides all the stats. Used for type writer's clear function.
   */
  static hideAll() {
    statsConsole.hide();
  }

  /**
   * Shows and updates all the stats.
   */
  static showAll() {
    if (!game.isOver) {
      this._updateAll();
      statsConsole.show();
    }
  }
}

const statLabel = new GameElement('statLabel');
const statHealth = new PlayerStat('health', 'Health', ['dying', 'unhealthy', 'okay', 'healthy']);
const statEffects = new PlayerStat('effects', 'Effects', ['none', 'bleeding', 'weak', 'poisoned']);
const statHunger = new PlayerStat('hunger', 'Hunger', ['starving', 'hungry', 'satiated', 'full']);
const statThirst = new PlayerStat('thirst', 'Thirst', ['parched', 'thirsty', 'hydrated', 'quenched']);
