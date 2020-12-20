// Inventory contains weapons and inventory
const itemsConsole = new GameElement('itemsConsole');
const weapons = ['fists', 'crowbar', 'axe', 'spear', 'pistol', 'rifle'];
const inventory = [];

/**
 * Class for creating items.
 * @extends GameElement
 */
class Item extends GameElement {
  /**
   * Creates the item.
   * @param {string} itemId - HTML text id, used for changing inner text and name.
   * @param {string|false} useId - HTML button id, used for registering click.
   * @param {PlayerStat|false} stat - Stat object that is affected by item.
   * @param {number} points - The number of points the item is worth. Used for the end.
   */
  constructor(itemId, useId, stat, points) {
    super(itemId);
    this._name = itemId;
    this._useId = useId;
    this._stat = stat;
    this._points = points;

    this._count = 0;
    this._weaponInd = false;
    switch (itemId) {
      case 'weapon':
        this._weaponInd = 0;
        break;
      case 'materials':
        break;
      case 'bandages':
        document.getElementById(this._useId).addEventListener('click', () => this._useBandages());
        break;
      case 'antidotes':
        document.getElementById(this._useId).addEventListener('click', () => this._useToCure("poisoned"));
        break;
      case 'car':
        break;
      default:
        document.getElementById(this._useId).addEventListener('click', () => this._use());
        break;
    }

    inventory.push(this);
  }

  /**
   * @returns {string} Name of item.
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {number} Amount of this item the player has.
   */
  get count() {
    return this._count;
  }

  /**
   * @returns {string} Current weapon name.
   */
  get current() {
    let weaponName = weapons[this._weaponInd];
    return weaponName;
  }

  /**
   * @returns {number} Current level of weapon. Uses count. Increases for rifle.
   */
  get currentLevel() {
    return this._count;
  }

  /**
   * @returns {number} Damage player deals.
   */
  get damage() {
    return (this._weaponInd * 10) + (this.currentLevel * 10) + 5;
  }

  _update() {
    if (this._weaponInd === false) {
      this.element.innerHTML = `${this.name.toUpperCase()}: ${this._count}`;
    } else {
      this.element.innerHTML = `${this.name.toUpperCase()}: ${this.current.toUpperCase()}`;
    }
  }

  _use() {
    if (this._count > 0 && this._stat._level != 100) {
      this._count--;
      this._update();
      this._stat.increase(20);
    } else if (this._count === 0) {
      Item._show(`You don't have any ${this.name.toUpperCase()}!`);
    } else {
      Item._show(`You are already ${this._stat.currentCondition.toUpperCase()}!`);
    }
  }

  _useToCure(effect) {
    if (this._count > 0) {
      if (statEffects._currentEffects.includes(effect)) {
        this._count--;
        this._update();
        statEffects.changeEffects("remove", effect);
      } else {
        Item._show(`You are not ${effect.toUpperCase()}!`);
      }
    } else {
      Item._show(`You don't have any ${this.name.toUpperCase()}!`);
    }
  }

  /**
   * Use for bandages.
   */
  _useBandages() {
    if (statEffects._currentEffects.includes("bleeding")) {
      this._useToCure("bleeding");
    } else {
      this._use();
    }
  }

  newWeapon() {
    if (this.current == 'rifle') {
      this._count++;
    } else {
      this._weaponInd++;
    }
  }

  brokeWeapon() {
    if (this._weaponInd != 0) {
      this._weaponInd--;
    }
  }

  /**
   * Increases amount of this item the player has.
   * @param {number} num - Number of item gained.
   */
  gain(num) {
    this._count += num;
  }

  /**
   * Decreases amount of this item the player has.
   * @param {number} num - Number of item lost.
   */
  lose(num) {
    this._count -= num;
  }

  /**
   * @returns {number} The number of points the player has.
   */
  static get points() {
    let points = 0;
    inventory.forEach(item => {
      points += item.count * item._points;
    });
    return points;
  }

  static _updateAll() {
    inventory.forEach(item => {
      item._update();
    });
  }

  static _showAll() {
    this._updateAll();
    itemsConsole.show();
  }

  static _show = async function(text) {
    await writeText(text, true);
    this._showAll();
    showChoices(choiceScripts.inventory, true);
  }

  /**
   * Hides all items. Used for type writer's clear function.
   */
  static hideAll() {
    itemsConsole.hide();
  }

  /**
   * Shows Inventory.
   */
  static checkInventory() {
    this._show(textScripts.inventory);
  }
}

const itemMaterials = new Item('materials', false, false, 1);
const itemBandages = new Item('bandages', 'useBandages', statHealth, 2);
const itemFood = new Item('food', 'useFood', statHunger, 1);
const itemWater = new Item('water', 'useWater', statThirst, 2);
const itemAntidotes = new Item('antidotes', 'useAntidotes', statEffects, 3);
const itemWeapon = new Item('weapon', false, false, 10);
