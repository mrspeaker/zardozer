const scene = {
  entities: [{
      args: ["e1", 50, 150],
      comps: [
        ["State", "BORN"],
        ["PlayerActor"],
        ["Health", 100, 0],
        ["HealthRenderer"],
        ["Damage", 10],
        ["Wander", 2],
        ["MoveTowards", "chaseMe"],
        ["Renderer", "#8a8"]
      ]
    },
    {
      args: ["spawner", 150, 150],
      comps: [
        ["Renderer", "#222"],
        ["Spawner", "e1", 0.5, 60, 60]
      ]
    },
    {
      args: ["chaseMe", 300, 150],
      comps: [
        ["Renderer", "#088"],
        ["Wander", 4],
        ["ColorUp"]
      ]
    }
  ]
};

export default scene;
