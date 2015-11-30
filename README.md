# Zardozer: a Unity-style component system

> Rough rough rough. This is pre-pre-alpha! Just testin' some Ideas.

* Try the **[Zardozer demo](https://mrspeaker.github.io/zardozer/)** in your browser. (Hit "enter" to toggle play/edit mode. Drag things around in edit mode).

Zardozer is a Unity-style component system and editor for making games. In this system, game logic is implemented in [components](https://github.com/mrspeaker/Zardozer/tree/master/components). You attach these to dumb "entities" - and the hooking-up is defined via JSON. The intro demo game was made in the editor, and generated the json defined in [game/demoGame.js](https://github.com/mrspeaker/zardozer/blob/master/game/demoGame.js).

[<img width="710" alt="Zardozer v0.01.4" src="https://cloud.githubusercontent.com/assets/129330/11459631/de48f45e-96a8-11e5-9fe5-f7b00fe57075.png">](https://mrspeaker.github.io/zardozer/)

* `npm install`
* `npm start`

Browse at http://localhost:9966

* `Enter` toggles PLAY and EDIT modes.
* Click and drag entities... Edit them in sidebar (try toggling components on/off)
* `d` duplicates current selection (try duplicating "player")
* `delete` removes current selection
* Add components to an entity in the sidebar (dodgy at the moment: need to manually add params)
* `New game` clears all the entitites. Not much point at the moment - no saving!

## Entities

Entities are the "things" in your game. They don't have any data or logic inside them - they are just a container for `components` which maintain all the state and do all the work.

Ok, they have a *tiny* bit of data in them: a `name`, and `id` (internal use), and a `remove` flag.

Most entities are added via the editor, but up can make an entity with `new Entity("name", x, y, w, h, zIndex)` or with the helper below for deserializing from data. (The `Position` component is currently added automatically - also, position also includes `w` and `h` dimensions. May change that.)

Setting an entities `remove` property to `true` will remove it from the game on the next game update tick.

Entities also have a few helper methods: `addComponent` to add a new component, `removeComponent` to remove an existing one, and `getComponent` to find a component by name.

## Components

Components maintain state and perform logic on that state. They can also interact with other components that are on the same entity. Here's an example component that randomly changes an entity's color every `rate` seconds:

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
* Create new games from scratch (moving out game-specific components and files)
* - how to split core components & game specific
* drag n drop assets (general filesystem access (or at least base64 encode))
* Make instances Env.game.getEntityByName() automagic? General "instance vs prefab" handling.
* how to organise components (allow a tree)

### TODOs

* Array params... how should they work in editor?
* "Pause" shouldn't affect serialized state.
* dump game to json / allow import from json / localstorage
* renaming enitities
* changing entity refs in editor
* scene graph for entities
* integrate pixi.js
* duplicating "add entity" entity crash

### Ideas

* should be very easy to add images/sprite sheets/atlases
* some kind of animation system
* edit pixels directly in the game
* integrate some free sources automatically (search/itegrate imgs/spritesheets directly)
* proxy the brower localstorage sqlite db?! crazy.
