const scene = {
  entities: [{
      args: ["player", 200, 150],
      comps: [
        ["KeyController"],
        ["KeyShooter"],
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
        ["Life", 3],
        ["LifeRenderer"],
        ["Wander", 2],
        ["MoveTowards", "chaseMe", 1],
        ["Renderer", "transparent", 25, "spaceMonster1.png"]
      ]
    },
    {
      args: ["spawner", 150, 150],
      comps: [
        ["Renderer", "#222"],
        ["Spawner", "ghost", 0.5, 10, 10]
      ]
    },
    {
      args: ["chaseMe", 100, 50],
      comps: [
        ["Renderer", "#088", 18],
        ["MoveSine", "x", 0.7, 4],
        ["MoveSine", "y", 0.3, 2],
        ["MoveSine", "y", 0.4, 2],
        ["ColorChange"]
      ]
    }
  ]
};

export default scene;
