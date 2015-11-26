# Funkity: a unity-style component system

A Unity-style component system and editor for making games.

<img width="719" alt="Funkity game editor" src="https://cloud.githubusercontent.com/assets/129330/11429251/4673657c-9443-11e5-9d61-23224b7daabc.png">

* `npm install`
* `npm start`

Browse at http://localhost:9966

## Entities

Simple objects, that have a name and a bunch of `components`, and not much else! All state and logic is done by components.

Can make an enitity with `new Entity("name", xpos, ypos)` or with the helper below for deserializing from data. (The `Position` component is currently added automatically. May change that.)

Setting an entities `remove` property to `true` will remove it from the game on the next game update tick.

## Components

Here's an example component that randomly changes an entity's color every `rate` seconds:

```js
class ColorChange extends Component {
  static deps = ["Renderer"]; // Requires Renderer
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

To use it in the game, create the file in `/components/` and add it to the `/components/index.js` list. (will try to automate this somehow in the future)

*static fields*

* `static propTypes = {}` (used for serializing/editor)
  - Number, Boolean, Color, Instance, String
* `static deps = []`
  - Names of components to require. Access with `this.deps.CompName`

*lifecycle methods*

* `start ()` // Called before first update tick. Be sure to call super.start();
* `update (dt)` // Called every frame
* `remove() ` // Called when component removed from entity

Get any references to other entities in `start` with `Env.game.getEntityByName(targetName)`.
(This might be magical-ized)

## Serializing/deserializing

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

`args` is array of `entity name`, `x position`, and `y position` (might get rid of the position requirement later)

```js
  Entities.serialize(entity);
```

### To figure out

* How to spawn prefabs without requiring an instance
* drag n drop assets (general filesystem access)
* How to create new games from scratch (moving out game-specific components and files)
* Make instances Env.game.getEntityByName() automagic?

### TODOs

* renaming enitites
* changing entity refs in editor
