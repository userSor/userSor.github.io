//@ts-check
/**
 * For background color
 */
const backgroundColor = {
  _colorDay: "#888888",
  _colorBattle: "#555555",
  _colorNight: "#222222",
  _colorDarkerMaroon: "#500000",
  _changeToColor(color) {
    color = game.isOver ? this._colorDarkerMaroon : color;
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
  },
  changeToDay() {
    this._changeToColor(this._colorDay);
  },
  changeToBattle() {
    this._changeToColor(this._colorBattle);
  },
  changeToNight() {
    this._changeToColor(this._colorNight);
  },
  changeToLose() {
    this._changeToColor(this._colorDarkerMaroon);
  }
}
  
/**
 * For Day One.
 */
const dayOne = {
  get isToday() {
    return day === 1;
  },
  _show: async function(text, choices, start) {
    await writeText(text);
    if (!start) {
      PlayerStat.showAll();
    }

    showChoices(choices);
  },
  start() {
    const text = textScripts.dayOne.title;
    this._show(text, choiceScripts.dayOne.title, true);
  },
  morning() {
    time++;
    const text = textScripts.dayOne.morning;
    this._show(text, choiceScripts.dayOne.morning);
  },
  searchCar() {
    const text = textScripts.dayOne.loot + gain({ materials: 5, bandages: 3, food: 3, water: 3, weapon: true });
    this._show(text, choiceScripts.morning.finished);
  }
}

const game = {
  _isOver: false,
  get isOver() {
    return this._isOver;
  },
  get won() {
    return day === 32;
  },
  /**
   * Writes game over text.
   * @param {string} reason - Reason for lose. Comes from PlayerStat.
   */
  lose(reason) {
    this._isOver = true;
    textConsole.bigText();
    const text = textScripts.lose + reason;
    backgroundColor.changeToLose();
    writeText(text, true, true);
  },
  win: async function() {
    this._isOver = true;
    textConsole.bigText();
    const text = `${textScripts.win.end} Your score is ${Item.points} points!`;
    await writeText(text, true, true);
    document.getElementById("winPoints").style.display = "block";
  }
}

/**
 * Immediately gives player items upon invoke. Checks each inventory item to see if a key contains the item name.
 * @param {object} items - Contains keys for what is gained. Acceptable keys: materials, bandages, food, water, antiotes, weapon(boolean value).
 * @returns {string} The items that the player gains.
 */
function gain(items) {
  let extraMessage = ' You gained:';

  inventory.forEach(item => {
    if (Object.keys(items).includes(item.name)) {
      switch (item.name) {
        case "weapon":
          itemWeapon.newWeapon();
          extraMessage += itemWeapon.current === "rifle" ? ` (+Weapon ${itemWeapon.current.toUpperCase()} LEVEL ${itemWeapon.currentLevel})`
          : ` (+Weapon ${itemWeapon.current.toUpperCase()})`;
          break;
        default:
          item.gain(items[item.name]);
        extraMessage += ` (+${items[item.name]} ${item.name.toUpperCase()})`;
      }
    }
  })

  extraMessage = extraMessage == ' You gained:' ? '' : `${extraMessage}.`;
  return extraMessage;
}

/**
 * Goes back to previous text.
 */
async function goBack() {
  await writeText(lastEvent.text);
  PlayerStat.showAll();
  showChoices(lastEvent.choices);
}

/**
 * Displays game text and options.
 */
async function gameText() {
  let text = textScripts[key.time];
  let choices = choiceScripts[key.time];

  switch (key.time) {
    case "title":
      text = game.won ? textScripts.win.title
      : finalDay.isToday ? `${text} ${day}: Final Day`
      : `${text} ${day}`;
      await writeText(text);
      break;

    case "morning":
      text = game.won ? textScripts.win.morning
      : finalDay.isToday ? textScripts.final
      : bossDay.isToday ? textScripts.boss 
      : randomStringFrom(text.start);

      choices = game.won ? choiceScripts.win
      : choices.start;
      await writeText(text);
      PlayerStat.showAll();
      break;

    case "battle":
      text = Enemy.current.scripts.start;
      choices = choices.start;
      backgroundColor.changeToBattle();
      await writeText(text);
      PlayerStat.showAll();
      break;

    case "night":
      text = randomStringFrom(text);
      backgroundColor.changeToNight();
      await writeText(text);
      break;

    default:
      console.log("ERROR: NO TIME");
  }
  
  showChoices(choices);
}

/**
 * Continues the day, increases time counter. Prevents player from dying on Day 32.
 */
async function continueGame() {
  time++;
  if (!game.isOver) {
    PlayerStat.continueOn();
  }

  gameText();
}

/**
 * Goes on to next day, increases day counter and resets time. Checks if the day is 1 for beginning.
 */
async function nextDay() {
  day++;
  time = 0;
  statEffects.changeEffects("remove", "weak");
  statHealth.increase(10);
  backgroundColor.changeToDay();

  if (dayOne.isToday) {
    dayOne.start();
  } else {
    gameText();
  }
}

/**
 * For gaining OP advantage.
 * @returns {string} Hacks Deployed!
 */
function gainHackz() {
  itemWeapon._weaponInd = 5;
  itemWeapon._count = 20;
  itemFood.gain(10);
  itemWater.gain(10);
  playerCar._progress = 6;
  return "Hacks deployed! You are OP now.";
}
