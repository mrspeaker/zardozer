export default {
  name: "scene 1",
  entities: [{
      name: "player",
      pos: [50, 150, 67, 94, 10],
      comps: [
        ["KeyController"],
        ["KeyShooter", 0.15],
        ["Player"],
        ["Renderer", "transparent", "p1_jump.png"]
      ]
    },
    {
      name: "bullet",
      pos: [0, -20, 18, 18, 6],
      comps: [
        ["FlyRight"],
        ["Life", 2],
        ["Renderer", "#ffff00"]
      ]
    },
    {
      name: "ghost",
      pos: [320, 160, 69, 71, 5],
      comps: [
        ["ClickRegener", 10],
        ["Damage"],
        ["Life", 5],
        ["LifeRenderer"],
        ["Wander", 2],
        ["MoveTowards", "player", 1],
        ["Renderer", "transparent", "p3_duck.png"]
      ]
    },
    {
      name: "spawner",
      pos: [290, 120, 32, 32, 1],
      comps: [
        ["Damage", 6],
        ["Renderer", "#222222"],
        ["Spawner", "ghost", 0.9, 1]
      ]
    },
    {
      name: "spawnerBoss",
      pos: [150, 50, 70, 70, 11],
      comps: [
        ["Spawner", "spawner", 1.9],
        ["Renderer", "", "tochLit.png"],
        ["MoveSine", "x", 0.7, 4],
        ["MoveSine", "y", 0.3, 2],
        ["MoveSine", "y", 0.4, 2],
        ["MoveTowards", "player", 1]
      ]
    },
    {
      name: "box1",
      pos:[0, -70, 70, 70, 0],
      comps: [
        ["Renderer", "", "castleCenter.png"]
      ]
    },
    {
      name: "box2",
      pos:[70, -70, 70, 70, 0],
      comps: [
        ["Renderer", "", "sandCenter.png"]
      ]
    },
    {
      name: "box3",
      pos:[140, -70, 70, 70, 0],
      comps: [
        ["Renderer", "", "snowCenter.png"]
      ]
    },
    {
      name: "level",
      pos:[0, 0, 770, 420, 0],
      comps: [
        ["GridIt", ["box1", "box2", "box3"], 11, 6],
      ]
    }
  ]
};
