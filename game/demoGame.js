export default {
  name: "demo game",
  initial: "scene 1",
  scenes: {
    "scene 1": {
      name: "scene 1",
      entities: [
        {
          name: "background",
          pos:[120, 0, 0, 0, 10],
          comps: [
            ["Renderer"],
          ],
          children: [
            {
              name: "box1",
              prefab: false,
              pos:[0, 70, 32, 32, 0],
              comps: [
                ["DOMRenderer", "", "sandCenter.png"],
                ["Renderer", "", "box1", "sandCenter.png", 1]
              ]
            }
          ]
        },
        // Tile prefabs.
        {
          name: "box2",
          prefab: false,
          pos:[70, 70, 32, 32, 0],
          comps: [
            ["DOMRenderer", "", "castleCenter.png"],
            ["Renderer", "", "box2", "castleCenter.png", 1]
          ]
        },
        {
          name: "box3",
          prefab: false,
          pos:[140, 70, 32, 32, 0],
          comps: [
            ["DOMRenderer", "", "snowCenter.png"],
            ["Renderer", "", "box3", "snowCenter.png", 1]
          ]
        },
        /*{
          name: "background",
          pos:[0, 0, 0, 0, 10],
          comps: [
            ["Renderer"],
          ],
          children: [
            // Background - uses the box prefabs to make a grid
            {
              name: "level",
              pos:[0, 0, 770, 420, 0],
              comps: [
                ["GridIt", ["box1", "box2", "box3"]]
              ]
            }
          ]
        },
        {
          name: "player",
          pos: [71, 150, 67, 94, 10],
          comps: [
            ["KeyController"],
            ["KeyTwinStickShooter", "bullet", 0.15],
            ["Player"],
            ["DOMRenderer", "", "p1_jump.png", true],
            ["Renderer", "", "jump", "p1_jump.png", 1],
            ["MapCollider", "level"],
          ]
        },
        {
          name: "bullet",
          pos: [20, 20, 18, 18, 6],
          prefab: true,
          comps: [
            ["Move"],
            ["Life", 2],
            ["DOMRenderer", "#ffff00", "", true],
            ["Renderer", "", "bullet", "spaceMonster1.png", 1]
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
            ["DOMRenderer", "", "p3_duck.png", true],
            ["Renderer", "", "ghost", "p3_duck.png", 1]
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
            ["DOMRenderer", "#222222", "", true],
            ["Spawner", "ghost", 0.9, 1]
          ]
        },
        // Flying boss spawner-dropper
        {
          name: "spawnerBoss",
          pos: [150, 80, 70, 70, 11],
          comps: [
            ["Spawner", "spawner", 1.9],
            ["DOMRenderer", "", "tochLit.png", true, 0.7],
            ["Renderer", "", "torch", "tochLit.png", 1],
            ["MoveSine", "x", 0.7, 4],
            ["MoveSine", "y", 0.3, 2],
            ["MoveSine", "y", 0.4, 2],
            ["MoveTowards", "player", 1],
            ["MapCollider", "level"]
          ]
        }
        */
      ]
    }
  }
};
