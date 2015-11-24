vault
  * rooms
  * dwellers
  * caps
  * power
  * food
  * water

dwellers
  * dwellers [dweller]

dweller
  * state [stranger, working, moving, idle, hunting]

  * skills
    * strength
    * luck
    * perception

  * stats
    * health
    * happiness
    * hunger
    * thirst

  * weapon
  * clothing

  * assignedRoom

rooms
  * graph of room

room
  * state [normal, rush, disaster]
  * type  [lobby, living area, power, water, food, storage]
  * dwellers [dweller]
  * xp
  * level
  * efficency
  * cost, upgrade cost?
