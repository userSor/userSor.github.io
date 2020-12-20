/* Contains texts used in the game */

const textScripts = {
  "start": {
    "title": "Thirty One Days",
    "credits": "Credits",
    "story": `Story: It was a vacation. I was driving on a mountain, trying to reach the hotel at the top. Suddenly, the road was slippery, and the next thing I knew, I was falling. Thud! As I drifted to sleep, I heard a voice in my head saying "Thirty one days to survive. . ."`
  },

  "inventory": "Inventory",

  "dayOne": {
    "title": "Day 1",
    "morning": "You wake up to the sounds of birds chirping. You see your crashed car and a huge forest ahead of you. This place will be your home. Select an option.",
    "loot": "You search through your car and find some useful items.",
  },

  "boss": "You have a bad feeling about tonight.",
  "final": "You have an extremely bad feeling about tonight.",

  "title": "Day",

  "morning": {
    "start": ["Rise and shine! Time to do some more work. You feel well-rested.", "Good morning! I know you're on vacation, but you have to work. You feel well-rested, after all.", "Get up! You feel well-rested, so it's time to work."],

    "craft": {
      "start": ["Select an item to craft. Costs: Upgrade Weapon (10 materials), 3x Bandages (6 materials), 2x Antidotes (6 materials)."],

      "noAfford": {
        "weapon": ["You don't have enough materials to upgrade your weapon! Select another option.", "Bummer! You don't have enough materials for that. Select another option."],

        "bandages": ["You don't have enough materials to craft bandages! Select another option.", "Bummer! You don't have enough materials for that. Select another option."],

        "antidotes": ["You don't have enough materials to craft an antidote! Select another option.", "Bummer! You don't have enough materials for that. Select another option."]
      },

      "craftFinished": ["After a hard day of work, you crafted your item!", "You got great crafting skills! You were able to craft your item.", "You crafted your item."]
    },

    "explore": {
      "start": ["When you enter the forest, you see the path beginning to split into three paths. Which path do you choose?", "There are three paths in the forest. Which one do you choose?"],
      
      "right": {
        "river": ["You find a river! You bring back a few berries, water and other stuff you found along the way.", "As you walk, you see a river ahead! You collect a small amount of water and berries from the river bushes."],

        "noRiver": ["You see a river, but a big monster is standing there. Oh well, you were able to bring a few food and materials back.", "As you walk, you see a river ahead! After running through some bushes, the river is gone! At least you were able to bring a few food and materials back."],
      },

      "forward": {
        "materials": ["You find a pile of materials and some berries to bring home.", "You bring back lots of string and some berries you found."],

        "bleeding": ["As you walk around, you trip on a log and fall on a rock, leaving you with a BLEEDING wound. At least you find a pile of materials in front of you.", "In search for supplies, you decide to climb a slippery rock. You see a pile of materials and jump, slipping and scraping your knee, which is now BLEEDING. That was not a smart move."],

        "chest": ["For some reason, there is an unguarded chest in the middle of the forest. You look in and take the items. As you head home, a giant tree branch falls, severely damaging you and inflicting BLEEDING!"]
      },

      "left": {
        "poisoned": ["You find a huge pile of food and water. Suddenly, a POISONOUS RAT comes out and bites you in the arm! You run to your car, losing most of your items. Rats! Literally.", "You find some berries and water. As you carry the items, you are stung by POISONOUS MOSQUITOES!"],

        "trap": ["Who left a perfectly good weapon hanging from a tree branch? It must be a trap, right? Well, it is. As you grab the weapon, POISON DARTS shoot out and hit you. Well, at least you got a new weapon."],

        "water": ["There's a case of water here in the middle of the forest. Wait what? Oh well, you get to bring a lot of water home."],
      }
    },

    "checkCar": {
      "busted": ["Your car is still busted. There are some car parts you need to repair."],

      "noAfford": {
        "full": ["You don't have enough materials to do a full repair a part! Select another option.", "Bummer! You don't have enough materials for that. Select another option."],
        "partial": ["You don't have enough materials to partially repair a part! Select another option.", "Bummer! You don't have enough materials for that. Select another option."]
      },

      "repairFinished": {
        "full": ["You finished fully repairing a part and gained +2 progress!"],
        "partial": ["You finished partially repairing a part and gained +1 progress!"]
      },
      "wait": ["You decide to wait in your car for the day."],

      "fixed": ["Your car is fully repaired! Good thing it still has fuel left.", "Your car is as shiny as ever, being fully repaired and all. It still has fuel in it too."],

      "toRiver": ["You saw a river before and decide to drive to the forest river and bring back some supplies to your original spot.", "You drive to the forest river for some supplies. There's a monster there, but you ram into it. You head back home with some supplies.", "You think you remember a river, so you drive to the direction where you think it is. Thankfully, the river is there, and you go back home with some supplies."]
    },
  },

  "night": ["After your hard work, you go back into your car and doze off to sleep. . . "],

  "lose": "GAME OVER",
  "win": {
    "title": "Return Day",
    "morning": `You wake up to the sounds of a conversation. "Let's get this one in the ambulance." The bed that you're sleeping on feels nice, almost like a stretcher.`,
    "end": "You win!"
  }
  
}

const battleScripts = {
  "battle": {
    "attack": {
      "fists": "You slam your fists into the enemy.",
      "crowbar": "You swing your crowbar with all your might.",
      "axe": "You jump at the enemy, swinging your axe with all your might.",
      "spear": "You dash to the enemy, attempting to stab it with your spear.",
      "pistol": "You point your pistol at the enemy and press the trigger repeatedly.",
      "rifle": "Decisive, you aim at the enemy and fire shots"
    },

    "slow flee": "You back away slowly.",
    "flee": "You immediately turn around and run with all your might.",

    "loot": "Nice work! You gained a few items from that battle."
  },

  "enemies": {
    "angry squirrel": {
      // Bleeding effect, Speedy
      "start": "Close to night, you lay in your car, trying to sleep. Suddenly, you hear rustling. You get out and see an ANGRY SQUIRREL coming!",

      "attack": "The ANGRY SQUIRREL gets launched back by your powerful attack! Furious, the ANGRY SQUIRREL jumps on you and creates a gash in your skin, causing BLEEDING.",

      "slow flee": "As you carefully back away, the ANGRY SQUIRREL eyes you warily. When you walk for a few more meters, you instantly flip around and run. As you look behind you, the ANGRY SQUIRREL is nowhere in sight.",

      "flee": "The squirrel is too fast! As you run, your feet stomp on the precious acorns the squirrel saved for winter. Even angrier, the ANGRY SQUIRREL swiftly jumps at you, sticking its teeth into your arm, causing BLEEDING.",

      "weakened": "Weak, the ANGRY SQUIRREL gets up slowly and launches its teeth weakly into your shoulder.",

      "killed": "The ANGRY SQUIRREL tries standing back up, but eventually falls back down."
    },

    "snappy turtle": {
      // None
      "start": "While laying in your car, you hear a branch snap. You get out and see a SNAPPY TURTLE looking at you!",

      "attack": "You make a small dent in the shell of the SNAPPY TURTLE. Angry, the SNAPPY TURTLE jumps at you and tries to snap your leg with its mouth",

      "slow flee": "The SNAPPY TURTLE looks at you. It then turns and walks away. I guess it doesn't want to fight.",

      "flee": "As you run away, you look back. The SNAPPY TURTLE just stands there, looking at you.",

      "weakened": "You see cracks in the shell of the SNAPPY TURTLE. Weak, the SNAPPY TURTLE throws itself at you.",

      "killed": "The SNAPPY TURTLE lays there, eyes closed."
    },

    "welp crow": {
      // Bleeding effect, Regard, Speedy
      "start": "On your way to your car, you hear a loud welp behind you. You turn around and see a WELP CROW flying towards you!",

      "attack": "The WELP CROW welps, but continues to fly and slashes its talons into your arm. You arm starts BLEEDING.",

      "slow flee": "The WELP CROW, however, does not change it's path. You raise your arm to block, and the WELP CROW welps and pierces your arm with its beak, causing BLEEDING.",

      "flee": "The WELP CROW, however, is faster than you. You raise your arm to block, and the WELP CROW welps and pierces your arm with its beak, causing BLEEDING.",

      "weakened": "The WELP CROW welps. It seems slower than before. The WELP CROW continues to fly at you and slashes its talons. The attack seem weaker than normal.",

      "killed": "A whole wing from the WELP CROW falls down. In a few seconds, the WELP CROW falls down as well."
    },

    "slithy snake": {
      // Poisoned effect, Speedy
      "start": "As you walk back to your car, you hear a hiss. You turn to the noise and see a SLITHY SNAKE coming out of a bush!",

      "attack": "You slice a portion of the snake off, but that does not stop the SLITHY SNAKE. The SLITHY SNAKE jumps at you and bites, causing POISONED.",

      "slow flee": "The SLITHY SNAKE seem to be moving somewhere else, and does not notice you. After a moment, the SLITHY SNAKE moves to another bush and is gone!",

      "flee": "Threatened, The SLITHY SNAKE chases after you, delivering a venomous bite. You are POISONED!",

      "weakened": "You feel the SLITHY SNAKE move slower. Even so, the SLITHY SNAKE continues to bites you, but the bite does not feel that strong.",

      "killed": "The SLITHY SNAKE hisses, then fizzes, then stops moving."
    },

    "spidey spider": {
      // Poisoned effect, Regard, Speedy
      "start": "When you get in your car to sleep, you feel a bunch of webs on your face. You immediately recoil back and see a SPIDEY SPIDER on the roof of your car!",

      "attack": "Some webs fall, but the SPIDEY SPIDER is not deterred. The SPIDEY SPIDER jumps at you and stabs its teeth into your skin, inflicing POISONED.",

      "slow flee": "The SPIDEY SPIDER immediately swings toward you, stabbing its teeth into your skin and inflicting POISONED.",

      "flee": "You don't notice the thick webs in front of your legs and you trip. The SPIDEY SPIDER swings in front of you and laughs, somehow. Then, it bites and inflicts POISONED.",

      "weakened": "Juice starts falling out of the spider, but the SPIDEY SPIDER continues to spin its webs, swing to you, and deliver a weak bite.",

      "killed": "The SPIDEY SPIDER splits apart, and mini spiders come out of it. Sensing danger, they flee and move to a bush while the bits of the SPIDEY SPIDER lay on the ground."
    },

    "rocky golem": {
      // Weak effect, Regard (As OP as bosses, but can be fled)
      "start": "In front of you, trees start to fall down. You see a ROCKY GOLEM walking to your direction!",

      "attack": "You make a small dent, but the ROCKY GOLEM is not deterred. The ROCKY GOLEM slams its fist at you. You feel WEAK.",

      "slow flee": "The ROCKY GOLEM, however, knows what it's after. It slams its fist into you, making you WEAK.",

      "flee": "The ROCKY GOLEM raises its fist at you as you gain more and more distance from it. When you return, the ROCKY GOLEM is nowhere to be seen.",

      "weakened": "The ROCKY GOLEM groans. It looks hurt. Nonetheless, the ROCKY GOLEM still punches you.",

      "killed": "The ROCKY GOLEM breaks apart, and its pieces fall to the ground."
    },

    "great snake": {
      // Boss, Poisoned effect
      "start": "As you check your water supply, you begin to think of the Great Lakes. As something in beside you fizzes, you look and actually see them! But instead of the Great Lakes, it's THE GREAT SNAKE in the shape of a lake, hissing at you.",

      "attack": "Bits of skin fall of the snake. THE GREAT SNAKE zooms to you and sinks its POISONED fangs into your arm.",

      "slow flee": "THE GREAT SNAKE slithers to you and sinks its POISONED fangs into you. You just gave THE GREAT SNAKE a free bite.",

      "flee": "However, THE GREAT SNAKE is too fast for you. It zooms and quickly catches up, sinking its POISONED fangs into your leg. You just gave THE GREAT SNAKE a free bite.",

      "weakened": "THE GREAT SNAKE sheds it skin and dashes to you. THE GREAT SNAKE slithers slowly away, leaving a weak bite mark.",

      "killed": "THE GREAT SNAKE sheds it skin and slithers at you. Because of its slowness, you raise and slam your fist into THE GREAT SNAKE. It stops moving."
    },

    "great see gull": {
      // Boss, Bleeding effect
      "start": "The sky is dark. As you count your food, THE GREAT SEE GULL flies from above and snatches a piece of meat!",

      "attack": "Not even a feather falls down from THE GREAT SEE GULL. It flies to you and sinks its talons into you, inflicting BLEEDING",

      "slow flee": "THE GREAT SEE GULL darts toward you and stabs you with its talons that inflict BLEEDING. You gave THE GREAT SEE GULL the first attack.",

      "flee": "Unfortunately, THE GREAT SEE GULL has huge wings, making it dart toward you and slash your BLEEDING arm. You gave THE GREAT SEE GULL the first attack.",

      "weakened": "You start to see a few feathers falling down THE GREAT SEE GULL. THE GREAT SEE GULL cuts your skin, but the attack does not feel as strong.",

      "killed": "THE GREAT SEE GULL drops down and hits the ground, eyes closed."
    },

    "great lead bull": {
      // Boss, Weak effect
      "start": "As you sort your materials, the ground trembles. A small metallic animal appears out of a bush. It is THE GREAT LEAD BULL who is glaring at you with provoking eyes!",

      "attack": "You barely make a dent when THE GREAT LEAD BULL rams you. You fall to the ground and feel WEAK.",

      "slow flee": "But THE GREAT LEAD BULL seems to know is target: you. It runs at you and slams it head into your chest. You fall down feeling WEAK. You gave THE GREAT LEAD BULL the first attack.",

      "flee": "Unfortunately, THE GREAT LEAD BULL is a fast bull. It charges at you, throwing itself into your back. You fall down feeling WEAK. You gave THE GREAT LEAD BULL the first attack.",

      "weakened": "Pieces of metal fall down from the bull. However, THE GREAT LEAD BULL continues to fight and throws you back onto the ground.",

      "killed": "The metal parts holding THE GREAT LEAD BULL fall apart, and nothing is left except huge bits and pieces of metal."
    },

    "final beast": {
      // Final Boss, Weak effect
      "start": "The sky is dark. The ground trembles. Trees are falling down. THE FINAL BEAST comes toward you, and before you can do anything, it smashes your car, crushing it with a single attack.",

      "attack": "No blood is spilled from the beast. In fact, your attack seems to barely have an effect. Laughing, THE FINAL BEAST delivers a mighty blow, making you fall to the ground. As you get up, you feel extremely WEAK and tired.",

      "slow flee": "The ground shakes, and you fall down. THE FINAL BEAST laughs and slams its mighty fist at you. You slowly get up from the ground feeling extremely WEAK and tired. You gave THE FINAL BEAST the first attack.",

      "flee": "Before you know it, a tree falls down in front of you. You slam into the tree. THE FINAL BEAST laughs and slams its mighty fist at you. As you get up, you put your weight onto the fallen tree log becuase you are extremely WEAK and tired. You gave THE FINAL BEAST the first attack.",

      "weakened": "Your attack makes a huge wound, and blood spills from THE FINAL BEAST. It groans. Its eyes loosen a bit. But THE FINAL BEAST won't give up. It still delivers a powerful blow, making you fall down and feel WEAK.",

      "killed": "THE FINAL BEAST growls, and then drops down onto your car. As it closes its eyes, the sky turns brighter, and the ground slows its shaking."
    }
  }
}

const choiceScripts = {
  "inventory": ["Back"],

  "dayOne": {
    "title": ["Start"],
    "morning": ["Search Through Car", "Inventory"],
  },

  "title": ["Continue"],

  "morning": {
    "start": ["Craft", "Explore Forest", "Check Car", "Inventory"],

    "craft": ["Upgrade Weapon", "3x Bandages", "2x Antidotes", "Back"],

    "explore": ["Left (Chance)", "Forward (Materials)", "Right (River)", "Back"],

    "checkCar": {
      "busted": ["(+2) Fully Repair Part: 15 materials", "(+1) Partially Repair Part: 5 materials", "Wait", "Back"],
      "fixed": ["Drive to Forest River", "Back"],
    },

    "finished": ["Continue", "Inventory"]
  },

  "battle": {
    "start": ["Attack", "Back Away Slowly", "Run Away"],
    "bossCombat": ["Attack"],
    "combat": ["Attack", "Run Away"],
    "victory": ["Loot Body", "Inventory"],
    "loot": ["Continue", "Inventory"],
    "escaped": ["Continue", "Inventory"]
  },

  "night": ["Next Day"],

  "win": ["Result"]
}
