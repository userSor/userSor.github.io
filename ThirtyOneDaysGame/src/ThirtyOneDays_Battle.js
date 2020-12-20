//@ts-check
/**
 * The object that contains all the functions for battle.
 */
const battle = {
  /**
   * Gets the player's battle text. This method is protected.
   * Finds the text for method, then finds if weapon text if method is attack.
   * Methods include:
   * - Attack
   * - Slow Flee
   * - Flee
   * @param {"attack"|"slow flee"|"flee"} method - Method for combat.
   * @returns {string} Player's battle text.
   */
  _getCombatText(method) {
    let battleText = battleScripts.battle[method] || battleScripts.battle[method][itemWeapon.current]; // second half doesn't work - used to satisfy ts-check
    if (method === "attack") {
      battleText = battleText[itemWeapon.current];
      battleText = itemWeapon.current == 'rifle' ? `${battleText} with your Level ${itemWeapon.currentLevel} Rifle.` : battleText;
    }

    return battleText;
  },

  /**
   * Gets the enemy's result text. This method is protected.
   * Results include:
   * - Attack 
   * - Slow Flee
   * - Flee
   * - Enemy Killed
   * - Enemy Dead (for inventory)
   * @param {"attack"|"slow flee"|"flee"|"weakened"|"killed"|"loot"} result - Result from combat.
   */
  _getResultText(result) {
    return Enemy.current.scripts[result];
  },

  /**
   * Writes the combat text and shows action options after combat. This method is protected. No inventory during battle.
   * Actions include:
   * - Combat
   * - Escaped
   * - Victory
   * @param {"attack"|"slow flee"|"flee"} method - Method for combat.
   * @param {"attack"|"slow flee"|"flee"|"weakened"|"killed"} result - Result from combat.
   * @param {"combat"|"victory"|"escaped"} choices - Actions after combat.
   */
  _combat: async function (method, result, choices) {
    let text;
    if (choices == "escaped") {
      text = `${this._getCombatText(method)} ${this._getResultText(result)} You escaped!`;
    } else {
      text =  `${this._getCombatText(method)} ${this._getResultText(result)} The ${Enemy.current.name.toUpperCase()} is ${Enemy.current.condition.toUpperCase()}.`;
    }
    await writeText(text);

    PlayerStat.showAll();
    showChoices(choiceScripts.battle[choices]);
  },

  /** Player attacks the enemy */
  attack() {
    let damage = itemWeapon.damage;
    if (statEffects._currentEffects.includes("weak")) {
      damage -= 5;
    }
    Enemy.current.loseHp(damage);

    if (Enemy.current.condition == "dead") {
      this._combat("attack", "killed", "victory");
    } else {
      Enemy.current.attackPlayer();
      if (Enemy.current.weak) {
        this._combat("attack", "weakened", "combat");
      } else {
        this._combat("attack", "attack", "combat");
      }
    }
  },

  /** 
   * Player slowly backs away from area.
   * - Player succeeds if the enemy has no regard
   * - Player fails if the enemy has regard
   * - Only available before battle.
   */
  slowFlee() {
    if (Enemy.current.regard) {
      Enemy.current.attackPlayer();
      this._combat("slow flee", "slow flee", "combat");
    } else {
      this._combat("slow flee", "slow flee", "escaped");
      Enemy.gone();
    }
  },

  /** 
   * Player runs away.
   * - Player succeeds if the enemy is not speedy
   * - Player fails if the enemy is speedy
   */
  flee() {
    if (Enemy.current.speedy) {
      Enemy.current.attackPlayer();
      this._combat("flee", "flee", "combat");
    } else {
      this._combat("flee", "flee", "escaped");
      Enemy.gone();
    }
  },

  /**
   * Loots the dead enemy.
   */
  lootEnemy: async function () {
    const text = battleScripts.battle.loot + Enemy.current.receiveLoot();
    await writeText(text);
    PlayerStat.continueOn();
    PlayerStat.showAll();
    showChoices(choiceScripts.battle.loot);
    Enemy.gone();
  },
}
