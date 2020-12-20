//@ts-check
/** Class for Crafting Mechanic. */
class Craft {
  /**
   * Create the crafting mechanic.
   * @param {Item} item - The item to craft.
   * @param {number|true} quantity - The amount of item gained, upgrade weapon uses true.
   * @param {number} cost - The cost of crafting, in materials.
   */
  constructor(item, quantity, cost) {
    this._item = item;
    this._quantity = quantity;
    this._cost = cost;
  }

  get _affordable() {
    return this._cost <= itemMaterials.count;
  }

  _gain() {
    const gains = {};
    gains[this._item.name] = this._quantity;
    const gainText = gain(gains);

    const text = `${Craft._getScript("craftFinished")} ${gainText} You have ${itemMaterials.count} ${itemMaterials.name.toUpperCase()} left.`;
    Craft._writeCraftText(text, true);
  }

  _noAfford() {
    const text = `${Craft._getScript("noAfford", this._item.name)} Costs: Upgrade Weapon (10 materials), 3x Bandages (6 materials), 2x Antidotes (6 materials). You have ${itemMaterials.count} ${itemMaterials.name.toUpperCase()}.`;
    Craft._writeCraftText(text);
  }

  /**
   * Method for when craft button is pressed.
   */
  craft() {
    if (this._affordable) {
      itemMaterials.lose(this._cost);
      this._gain();
    } else {
      this._noAfford();
    }
  }

  /**
   * Method for getting a random craft script of a craft event. This method is protected.
   * @param {"start"|"noAfford"|"craftFinished"} event - Gets text based off event.
   * @param {string} [itemName] - The item name of choosing. Only for noAfford.
   * @returns {string} Random craft script based off craft event.
   */
  static _getScript(event, itemName) {
    const craftTexts = textScripts.morning.craft[event][itemName] || textScripts.morning.craft[event];
    const craftScript = randomStringFrom(craftTexts);
    return craftScript;
  }

  /**
   * Writes text and shows craft options. Saves results if finished. This method is protected.
   * @param {string} text - The text to write.
   * @param {true} [craftFinished] - Result of craft. True if craft succeeds.
   */
  static _writeCraftText = async function(text, craftFinished) {
    if (craftFinished) {
      await writeText(text);
      PlayerStat.showAll();
      showChoices(choiceScripts.morning.finished);
    } else {
      await writeText(text, true);
      PlayerStat.showAll();
      showChoices(choiceScripts.morning.craft, true);
    }
  }

  /**
   * Writes text and shows craft options. Writes the amount of materials the player has left.
   */
  static checkCrafts() {
    const text = `${this._getScript("start")} You have ${itemMaterials.count} ${itemMaterials.name.toUpperCase()}.`;
    this._writeCraftText(text);
  }
}
const craftWeapon = new Craft(itemWeapon, true, 10);
const craftBandages = new Craft(itemBandages, 3, 6);
const craftAntidotes = new Craft(itemAntidotes, 2, 6);





/**
 * The player's car. Used for the "Car" options in the morning
 */
const playerCar = {
  _progress: 0,
  _fullPartCost: 15,
  _partialPartCost: 5,

  get _isFullyRepaired() {
    return this._progress >= 6; // 6 is max level
  },

  /**
   * Gets the repair cost.
   * @param {"full"|"partial"} repairType - The type of repair.
   * @returns {number} The repair cost.
   */
  _getRepairCost(repairType) {
    return repairType == "full" ? this._fullPartCost : this._partialPartCost;
  },

  /**
   * Finds if a repair is affordable.
   * @param {"full"|"partial"} repairType - The type of repair.
   * @returns {boolean} If the repair is affordable.
   */
  _affordable(repairType) {
    return this._getRepairCost(repairType) <= itemMaterials.count;
  },

  _gainProgress(repairType) {
    let progress = repairType == "full" ? 2 : 1;
    this._progress += progress;

    let text = `${randomStringFrom(textScripts.morning.checkCar.repairFinished[repairType])}  You have ${this._progress}/6 progress and ${itemMaterials.count} ${itemMaterials.name.toUpperCase()} left.`
    this._writeCarText(text, true);
  },

  /**
   * Writes text and options when the player cannot afford an action.
   * @param {"full"|"partial"} repairType - The Type of repair.
   */
  _noAfford(repairType) {
    const text = `${randomStringFrom(textScripts.morning.checkCar.noAfford[repairType])}  You have ${this._progress}/6 progress and ${itemMaterials.count} ${itemMaterials.name.toUpperCase()}.`;
    this._writeCarText(text);
  },

  /**
   * Writes car text is shows options. This method is protected.
   * @param {string} text - The text to write.
   * @param {true} [morningFinished] - Result of action. True if successful repair, wait, or explore.
   */
  _writeCarText: async function (text, morningFinished) {
    if (morningFinished) {
      await writeText(text);
      PlayerStat.showAll();
      showChoices(choiceScripts.morning.finished);
    } else {
      await writeText(text, true);
      PlayerStat.showAll();
      const choices = this._isFullyRepaired ? choiceScripts.morning.checkCar.fixed : choiceScripts.morning.checkCar.busted;
      showChoices(choices, true);
    }
  },

  wait() {
    this._writeCarText(randomStringFrom(textScripts.morning.checkCar.wait), true);
  },

  /**
   * Increases progress of repairing the car
   * @param {"full"|"partial"} repairType - Amount the repair progress increases by. 2 = full repair, 1 = partial repair
   */
  partRepair(repairType) {
    if (this._affordable(repairType)) {
      itemMaterials.lose(this._getRepairCost(repairType));
      this._gainProgress(repairType);
    } else {
      this._noAfford(repairType);
    }
  },

  /**
   * Generates random number between min and max, inclusive. Used ONLY FOR driving to forest river.
   * @param {number} min 
   * @param {number} max 
   * @returns {number} Number in range of [min, max]
   */
  _random(min, max) {
    const multiplier = max - min + 1;
    return Math.floor(Math.random() * multiplier) + min;
  },

  /**
   * Drives to forest river. Collects more supplies. Only available if Car is finished.
   */
  toRiver() {
    const gainText = gain({materials: this._random(3, 5), bandages: this._random(3, 5), food: this._random(2, 4), water: this._random(5, 6), antidotes: this._random(0, 1)});
    const text = randomStringFrom(textScripts.morning.checkCar.toRiver) + gainText;
    this._writeCarText(text, true);
  },

  /**
   * Writes text and shows options when checking car.
   */
  checkCar() {
    if (this._isFullyRepaired) {
      const text = randomStringFrom(textScripts.morning.checkCar.fixed);
      this._writeCarText(text);
    } else {
      const text = `${randomStringFrom(textScripts.morning.checkCar.busted)} You already have ${this._progress}/6 progress and ${itemMaterials.count} ${itemMaterials.name.toUpperCase()}.`;
      this._writeCarText(text);
    }
  }
}






/** For exploring forest */
const forest = {
  /**
   * Generates random number between min and max, inclusive.
   * @param {number} min 
   * @param {number} max 
   * @returns {number} Number in range of [min, max]
   */
  _random(min, max) {
    const multiplier = max - min + 1;
    return Math.floor(Math.random() * multiplier) + min;
  },

  _randomKey(path) {
    const keys = Object.keys(path);
    const key = randomStringFrom(keys);
    return key;
  },

  _writeExploreText: async function (text, exploreFinished) {
    if (exploreFinished) {
      await writeText(text);
      PlayerStat.showAll();
      showChoices(choiceScripts.morning.finished);
    } else {
      await writeText(text, true);
      PlayerStat.showAll();
      showChoices(choiceScripts.morning.explore, true);
    }
  },

  _leftOutcome() {
    // For left path only. Increases the change of "poisoned" outcome.
    return this._random(1, 5) == 1 ? this._randomKey(textScripts.morning.explore.left) : "poisoned";
  },

  right() {
    const outcome = this._randomKey(textScripts.morning.explore.right);
    let text = randomStringFrom(textScripts.morning.explore.right[outcome]);
    switch (outcome) {
      case "river":
        text += gain({ materials: this._random(1, 2), food: this._random(1, 2), water: this._random(3, 4) })
        break;
      case "noRiver":
        text += gain({ materials: this._random(2, 3), food: this._random(2, 3) });
        break;
      default:
        console.log("ERROR: RIGHT PATH OUTCOME");
    }
    this._writeExploreText(text, true);
  },

  forward() {
    const outcome = this._randomKey(textScripts.morning.explore.forward);
    let text = randomStringFrom(textScripts.morning.explore.forward[outcome]);
    switch (outcome) {
      case "materials":
        text += gain({ materials: this._random(4, 5), food: this._random(1, 2) });
        break;
      case "bleeding":
        statEffects.changeEffects("add", "bleeding");
        text += gain({ materials: this._random(6, 8), food: this._random(2, 3) });
        break;
      case "chest":
        statHealth.decrease(this._random(15, 25));
        statEffects.changeEffects("add", "bleeding");
        text += gain({ materials: this._random(2, 3), food: this._random(2, 3), water: this._random(2, 3), bandages: this._random(2, 3), antidotes: this._random(1, 2) });
        break;
      default:
        console.log("ERROR: FORWARD PATH OUTCOME");
    }
    this._writeExploreText(text, true);
  },

  left() {
    const outcome = this._leftOutcome();
    let text = randomStringFrom(textScripts.morning.explore.left[outcome]);
    switch (outcome) {
      case "poisoned":
        statEffects.changeEffects("add", "poisoned");
        text += gain({ materials: this._random(1, 2), food: this._random(1, 2), water: this._random(3, 4) })
        break;
      case "trap":
        statEffects.changeEffects("add", "poisoned");
        text += gain({ materials: this._random(3, 4), weapon: true });
        break;
      case "water":
        text += gain({ water: this._random(8, 10) });
        break;
      default:
        console.log("ERROR: LEFT PATH OUTCOME");
    }
    this._writeExploreText(text, true);
  },

  explore() {
    const text = randomStringFrom(textScripts.morning.explore.start);
    this._writeExploreText(text);
  }
}
