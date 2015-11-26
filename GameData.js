const scene = {
  entities: [{
      args: ["e1", 50, 150],
      comps: [
        ["State", "BORN"],
        ["ClickRegener", 10],
        ["Health", 100],
        ["HealthRenderer"],
        ["Damage", 20],
        ["Wander", 2],
        ["MoveTowards", "chaseMe", 1],
        ["Renderer", "#8a8"]
      ]
    },
    {
      args: ["spawner", 150, 150],
      comps: [
        ["Renderer", "#222"],
        ["Spawner", "e1", 0.5, 10, 10]
      ]
    },
    {
      args: ["chaseMe", 100, 50],
      comps: [
        ["Renderer", "#088", 18],
        ["SineX", 0.7, 4],
        ["SineY", 0.4, 2],
        ["ColorChange"]
      ]
    }
  ]
};

export default scene;
