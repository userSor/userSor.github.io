//@ts-check
const allEnemies = [];
const normalEnemies = [];
const bossEnemies = [];
let currentEnemyInd = 0;

class Enemy {
  /**
   * Creates an Enemy.
   * @param {string} name 
   * @param {number} attack 
   * @param {number} health 
   * @param {"bleeding"|"poisoned"|"weak"|false} effect 
   * @param {boolean} regard 
   * @param {boolean} speedy 
   * @param {object} loot 
   */
  constructor(name, attack, health, effect, regard, speedy, loot) {
    this._name = name;
    this._attack = attack;
    this._maxHealth = health;
    this._health = health;
    this._effect = effect;
    this._regard = regard;
    this._speedy = speedy;
    this._loot = loot;
    this._weak = false;
    this._conditions = ["dying", "harmed", "healthy"];
    allEnemies.push(this);
  }

  get name() {
    return this._name;
  }

  /**
   * @returns {boolean} If the enemy blocks player from slow fleeing.
   */
  get regard() {
    return this._regard;
  }

  /**
   * @returns {boolean} If the enemy blocks player from fleeing.
   */
  get speedy() {
    return this._speedy;
  }

  get weak() {
    return this._weak;
  }

  get condition() {
    const healthPercentage = this._health / (this._maxHealth + 1);
    const condIndex = Math.floor(this._conditions.length * healthPercentage);
    const condition = this._health <= 0 ? "dead" : this._conditions[condIndex];
    return condition;
  }

  get scripts() {
    return battleScripts.enemies[this._name];
  }

  get attack() {
    const attack = this._weak ? this._attack - Math.floor(this._attack / 2) : this._attack;
    return attack;
  }

  _reset() {
    this._health = this._maxHealth;
    this._weak = false;
  }

  loseHp(damage) {
    this._health -= damage;
    this._weak = this.condition == "dying" ? true : false;
  }

  attackPlayer() {
    const attack = this._weak ? this._attack - Math.floor(this._attack / 2) : this._attack;
    statHealth.decrease(attack);
    if (this._effect) {
      statEffects.changeEffects("add", this._effect);
    }
  }

  receiveLoot() {
    return gain(this._loot);
  }

  /**
   * @type {Enemy}
   */
  static _current;

  static _randomInd(enemyArray) {
    return Math.floor(Math.random() * enemyArray.length);
  }

  static _resetAllNormal() {
    normalEnemies.forEach(enemy => {
      enemy._reset();
    })
  }

  static get current() {
    return this._current;
  }

  static _changeCurrent() {
    currentEnemyInd = bossDay.isTomorrow ? this._randomInd(bossEnemies)
    : this._randomInd(normalEnemies);
    this._current = finalDay.isTomorrow ? enemyTheFinalBeast
    : bossDay.isTomorrow ? bossEnemies[currentEnemyInd]
    : normalEnemies[currentEnemyInd];
  }

  static gone() {
    if (bossDay.isToday) {
      const currentEnemyInd = bossEnemies.indexOf(this._current);
      bossEnemies.splice(currentEnemyInd, 1);
    }
    this._changeCurrent();
    if (bossDay.firstBossIsTomorrow) {
      this._current._maxHealth = this._current._maxHealth / 2;
      this._current._health = this._current._maxHealth;
    }
    this._resetAllNormal();
  }
}

/**
 * Class for Normal Enemies (not Bosses).
 * @extends Enemy
 */
class NormalEnemy extends Enemy {
  constructor(name, attack, health, effect, regard, speedy, loot) {
    super(name, attack, health, effect, regard, speedy, loot);
    normalEnemies.push(this);
  }
}

/**
 * Class for Bosses.
 * @extends Enemy
 */
class BossEnemy extends Enemy {
  constructor(name, attack, health, effect, regard, speedy, loot) {
    super(name, attack, health, effect, regard, speedy, loot);
    if (name != "final beast") {
      bossEnemies.push(this);
    }
  }
}

// Normal Enemies
const enemyAngSquirrel = new NormalEnemy("angry squirrel", 5, 35, "bleeding", false, true, {materials: 2, bandages: 1, food: 1, water: 1});
Enemy.gone();

const enemySnapTurtle = new NormalEnemy("snappy turtle", 10, 100, false, false, false, {materials: 5, bandages: 1, food: 1, water: 1, antidotes: 1});

const enemyWelpCrow = new NormalEnemy("welp crow", 10, 50, "bleeding", true, true, {materials: 3, food: 2, water: 2});

const enemySlithySnake = new NormalEnemy("slithy snake", 20, 50, "poisoned", false, true, {materials: 5, food: 5});

const enemySpideySpider = new NormalEnemy("spidey spider", 10, 50, "poisoned", true, true, {materials: 5, food: 5});

const enemyRockGolem = new NormalEnemy("rocky golem", 20, 150, "weak", true, false, {materials: 5, bandages: 3, antidotes: 1, weapon: true});


// Boss Enemies
const enemyTheGreatSnake = new BossEnemy("great snake", 20, 190, "poisoned", true, true, {materials: 10, bandages: 10, food: 5, water: 10, anditotes: 1, weapon: true});

const enemyTheGreatSeeGull = new BossEnemy("great see gull", 30, 160, "bleeding", true, true, {materials: 20, bandages: 5, food: 20, water: 5, antidotes: 2, weapon: true});

const enemyTheGreatLeadBull = new BossEnemy("great lead bull", 20, 230, "weak", true, true, {materials: 50, food: 5, water: 3, weapon: true});

// Final Boss Enemy
const enemyTheFinalBeast = new BossEnemy("final beast", 65, 450, "weak", true, true, {materials: 40, bandages: 10, food: 30, water: 10});
