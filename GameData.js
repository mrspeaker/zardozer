const scene = {
  entities: [{
      args: ["player", 200, 150],
      comps: [
        ["KeyController"],
        ["KeyShooter", 0.15],
        ["Player"],
        ["Renderer", "transparent", 25, "spaceship1.png"]
      ]
    },
    {
      args: ["bullet", 0, -20],
      comps: [
        ["FlyRight"],
        ["Life", 2],
        ["Renderer", "#ff0", 4]
      ]
    },
    {
      args: ["ghost", 50, 150],
      comps: [
        ["ClickRegener", 10],
        ["Damage"],
        ["Life", 5],
        ["LifeRenderer"],
        ["Wander", 2],
        ["MoveTowards", "player", 1],
        ["Renderer", "transparent", 25, "spaceMonster1.png"]
      ]
    },
    {
      args: ["spawner", 150, 150],
      comps: [
        ["Damage", 5],
        ["Renderer", "#222"],
        ["Spawner", "ghost", 2, 10, 10]
      ]
    },
    {
      args: ["spawnerBoss", 150, 50],
      comps: [
        //["Damage", 10],
        ["Spawner", "spawner", 2.4, 30, 30],
        ["Renderer", "#088", 18],
        ["MoveSine", "x", 0.7, 4],
        ["MoveSine", "y", 0.3, 2],
        ["MoveSine", "y", 0.4, 2],
        ["ColorChange", 2.4]
      ]
    }
  ]
};

export default scene;
