//@ts-chec
/**
 * Show choices framework.
 * Saves choices to lastEvent unless it is "Back".
 * Checks if another button is needed and removes all the listeners from the button.
 * Then, it adds the current choice listener the button.
 * If the button is not needed, this hides the button.
 * @param {string[]} choices - The array consisting of the current choices.
 * @param {true} [noSave] - Determines if the choices will be saved.
 */
function showChoices(choices, noSave) {
  if (!game.isOver) {
    ChoiceButton.showAll();
  }

  if (choices.length <= choiceButtons.length) {
    for (let i = 0; i < choiceButtons.length; i++) {
      if (i < choices.length) {
        ChoiceListener.edit(choiceButtons[i], 'remove');
        choiceButtons[i].element.innerHTML = choices[i];
        ChoiceListener.edit(choiceButtons[i], 'add');
      } else {
        choiceButtons[i].element.style.display = "none";
      }
    }
  } else {
    console.log('ERROR: TOO MANY OPTIONS');
  }

  noSave ? false : lastEvent.saveChoices(choices);
}

// Listeners
const choiceListeners = [];
/** Class for choice button listeners. */
class ChoiceListener {
  /**
   * Creates a choice listener
   * @param {string} innerText - Used to find which button to attach listener to.
   * @param {function} func - Function that is activated.
   */
  constructor(innerText, func) {
    this.innerText = innerText;
    this.func = func;
    choiceListeners.push(this);
  }

  /**
   * Protected Method: Adds or removes this listener.
   * @param {ChoiceButton} choiceButton - Button to edit.
   * @param {"add"|"remove"} editType - Edit listener type.
   */
  _edit(choiceButton, editType) {
    switch (editType) {
      case "add":
        choiceButton.element.addEventListener("click", this.func); // ts-check says wrong but still works ¯\_(ツ)_/¯
        break;
      case "remove":
        choiceButton.element.removeEventListener("click", this.func); // ¯\_(ツ)_/¯
        break;
      default:
        console.log("ERROR: CHOICE EDIT");
    }
  }

  /**
   * Method for adding current listeners or removing old ones. If any choice's inner text matches the button's inner text, then edits it.
   * @param {ChoiceButton} choiceButton - Button to edit.
   * @param {"add"|"remove"} editType  - Edit listener type.
   */
  static edit(choiceButton, editType) {
    choiceListeners.forEach(choiceListener => {
      if (choiceListener.innerText === choiceButton.element.innerHTML) {
        choiceListener._edit(choiceButton, editType);
      }
    });
  }
}

const listenerContinue = new ChoiceListener('Continue', () => continueGame());

// Inventory
const listenerBack = new ChoiceListener('Back', () => goBack());
const listenerInventory = new ChoiceListener('Inventory', () => Item.checkInventory());

// Day One
const listenerStart = new ChoiceListener('Start', () => dayOne.morning());
const listenerSearchCar = new ChoiceListener('Search Through Car', () => dayOne.searchCar());

// Battle
const listenerAttack = new ChoiceListener('Attack', () => battle.attack());
const listenerSlowFlee = new ChoiceListener('Back Away Slowly', () => battle.slowFlee());
const listenerFastFlee = new ChoiceListener('Run Away', () => battle.flee());

// Battle Finish
const listenerLootEnemy = new ChoiceListener('Loot Body', () => battle.lootEnemy());

// Sleep
const listenerNextDay = new ChoiceListener('Next Day', () => nextDay());

// Craft
const listenerCraft = new ChoiceListener('Craft', () => Craft.checkCrafts());
const listenerCraftUpgrade = new ChoiceListener('Upgrade Weapon', () => craftWeapon.craft());
const listenerCraftBandages = new ChoiceListener('3x Bandages', () => craftBandages.craft());
const listenerCraftAntidote = new ChoiceListener('2x Antidotes', () => craftAntidotes.craft());

// Explore Forest
const listenerExplore = new ChoiceListener('Explore Forest', () => forest.explore());
const listenerExploreRight = new ChoiceListener('Right (River)', () => forest.right());
const listenerExploreForward = new ChoiceListener('Forward (Materials)', () => forest.forward());
const listenerExploreLeft = new ChoiceListener('Left (Chance)', () => forest.left());

// Car
const listenerCheckCar = new ChoiceListener('Check Car', () => playerCar.checkCar());
const listenerFullPartRepair = new ChoiceListener('(+2) Fully Repair Part: 15 materials', () => playerCar.partRepair("full"));
const listenerPartialPartRepair = new ChoiceListener('(+1) Partially Repair Part: 5 materials', () => playerCar.partRepair("partial"));
const listenerWait = new ChoiceListener('Wait', () => playerCar.wait());
const listenerToRiver = new ChoiceListener('Drive to Forest River', () => playerCar.toRiver());

// Win Game
const listenerWin = new ChoiceListener('Result', () => game.win());
