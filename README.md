# Funkity: a unity-style component system

The begining of a simple Unity-style component system for making games. Will try to use it to implement a FallOut Shelter mobile kinda game. Should be able to describe the entire game in JSON (see `GameData.js`).

<img width="694" alt="simple editor" src="https://cloud.githubusercontent.com/assets/129330/11408642/7aea8bd4-9388-11e5-8453-4a0e765e8932.png">

* `npm install`
* `npm start`

Browse at http://localhost:9966

## To create a component

* add to components/
* add to components/index

static fields:

* `static propTypes = {}` (used for serializing/editor)
  - Number, Boolean, Color, Instance, String
* `static deps = []`
  - Names of components to require. Access with `this.deps.CompName`

Example:

```js
class ColorChange extends Component {
  static deps = ["Renderer"]; // Require Renderer
  static propTypes = {
    rate: "Number"            // One property: a number called "rate"
  };
  constructor (rate = 1) {
    super();
    this.rate = rate;
    this.time = 0;
  }
  update (dt) {
    if ((this.time += dt) > this.rate) {
      this.time -= this.rate;
      const newColor = "hsl(" + (Math.random() * 360 | 0) + ", 50%, 50%)";
      this.deps.Renderer.color = newColor;
    }
  }
}
```

## Component methods:

* `start ()` // Called before first update tick. Be sure to call super.start();
* `update (dt)` // Called every frame
* `remove() ` // Called when component removed from entity

Get any references to other entities in `start` with `Env.game.getEntityByName(targetName)`.
(This might be magical-ized)

## Serializing/deserialzing

Deserializing is done by Game.js in `loadScene` (loads everything in GameData.js). To do it manually:

```js
  const entity = Entities.make({
    args: ["entityName", posX, posY],
    comps: [
      ["ColorChange"],
      ["Renderer"]
    ]
  });
```

args is array of `entity name`, `x position`, and `y position` (might get rid of the position requirement later)

```js
  Entities.serialize(entity);
```

### To figure out

* How to spawn prefabs without requiring an instance
* drag n drop assets (general filesystem access)
* How to create new games from scratch (moving out game-specific components)
* Make instances Env.game.getEntityByName() automagic?

### TODOs

* renaming enitites
* changing entity refs in editor
