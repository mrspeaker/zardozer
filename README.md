# Funkity: a unity-style component system

A Unity-style component system and editor for making games.

<img width="797" alt="Funkity v0.01.3" src="https://cloud.githubusercontent.com/assets/129330/11454506/f931288e-95fb-11e5-9812-55b981952f26.png">

* `npm install`
* `npm start`

Browse at http://localhost:9966


* `Enter` toggles PLAY and EDIT modes.
* Click on entity name in sidebar to edit
* Add components to an entity in the sidebar (dodgy at the moment)
* `New game` clears all the entitites. Not much point at the moment - no saving!

## Entities

Entities are simple objects that have a `name` and a bunch of `components`, and not much else! All state and logic is done by components.

Can make an entity with `new Entity("name", x, y, w, h)` or with the helper below for deserializing from data. (The `Position` component is currently added automatically - also, position also includes `w` and `h` dimensions. May change that.)

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
  - Number, Boolean, Color, Instance, String, Image
* `static deps = []`
  - Names of components to require. Access with `this.deps.CompName`

*lifecycle methods*

* `start ()` // Called before first update tick. Be sure to call super.start();
* `update (dt)` // Called every frame
* `remove() ` // Called when component removed from entity
* `onCollision(entity)` Called when component collides with another

Get any references to other entities in `start` with `Env.game.getEntityByName(targetName)`.
(This might be magical-ized).

## Serializing/deserializing

Deserializing is done by Game.js in `loadScene` (loads everything in GameData.js). To do it manually:

```js
  const entity = Entities.make({
    name: "entityName"
    pos: [100, 100, 32, 32],
    comps: [
      ["ColorChange"],
      ["Renderer"]
    ]
  });
```

`name` is the name for the entity. Must be unique (gets appended with ID if not). `pos` is an array of `x position`, and `y position`, `width`, and `height` (might get rid of the position requirement later)

```js
  Entities.serialize(entity);
```

### To figure out

* Figure out "game" API (getEntityByName, spawn etc...)
* drag n drop assets (general filesystem access (or at least base64 encode))
* Create new games from scratch (moving out game-specific components and files)
* Make instances Env.game.getEntityByName() automagic? General instance handling.
* how to organise components (allow a tree)

### TODOs

* restart with edits (don't lose new etc)
* dump game to json / allow import from json / localstorage
* renaming enitites
* changing entity refs in editor
* scene graph for entities
* integrate pixi.js
* select/move entities with mouse in edit mode.
* duplicating "Add Entity"'s (crashes atm)

### Ideas

* should be very easy to add images/sprite sheets/atlases
* some kind of animation system
* edit pixels directly in the game
* integrate some free sources automatically (search/itegrate imgs/spritesheets directly)
* proxy the brower localstorage sqlite db?! crazy.
