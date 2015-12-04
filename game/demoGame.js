export default {
  name: "demo game",
  initial: "scene 1",
  scenes: {
    "scene 1": {
      name: "scene 1",
      entities: [{
        name: "player",
        pos: [71, 150, 67, 94, 10],
        comps: [
          ["KeyController"],
          ["KeyShooter", "bullet", 0.15],
          ["Player"],
          ["Renderer", "", "p1_jump.png", true],
          ["MapCollider", "level"],
          //["BorderRenderer"]
        ]
      },
      {
        name: "bullet",
        pos: [20, 20, 18, 18, 6],
        prefab: true,
        comps: [
          ["Move"],
          ["Life", 2],
          ["Renderer", "#ffff00", "", true]
        ]
      },
      {
        name: "ghost",
        pos: [320, 160, 69, 71, 5],
        prefab: true,
        comps: [
          ["ClickRegener", 10],
          ["Damage"],
          ["Life", 5],
          ["LifeRenderer"],
          ["Wander", 2],
          ["MoveTowards", "player", 1],
          ["Renderer", "", "p3_duck.png", true],
          //["BorderRenderer"]
        ]
      },
      // Ghost spawner
      {
        name: "spawner",
        prefab: true,
        pos: [290, 120, 32, 32, 1],
        comps: [
          ["Damage", 6],
          ["Renderer", "#222222", "", true],
          ["Spawner", "ghost", 0.9, 1]
        ]
      },
      // Flying boss spawner-dropper
      {
        name: "spawnerBoss",
        pos: [150, 80, 70, 70, 11],
        comps: [
          ["Spawner", "spawner", 1.9],
          ["Renderer", "", "tochLit.png", true, 0.7],
          ["MoveSine", "x", 0.7, 4],
          ["MoveSine", "y", 0.3, 2],
          ["MoveSine", "y", 0.4, 2],
          ["MoveTowards", "player", 1],
          ["MapCollider", "level"]
        ]
      },
      // Tile prefabs.
      {
        name: "box1",
        prefab: true,
        pos:[0, -70, 32, 32, 0],
        comps: [
          ["Renderer", "", "sandCenter.png"]
        ]
      },
      {
        name: "box2",
        prefab: true,
        pos:[70, -70, 32, 32, 0],
        comps: [
          ["Renderer", "", "castleCenter.png"]
        ]
      },
      {
        name: "box3",
        prefab: true,
        pos:[140, -70, 32, 32, 0],
        comps: [
          ["Renderer", "", "snowCenter.png"]
        ]
      },
      // Background - uses the box prefabs to make a grid
      {
        name: "level",
        pos:[0, 0, 770, 420, 0],
        comps: [
          ["GridIt", ["box1", "box2", "box3"]]
        ]
      }]
    }
  }
};
