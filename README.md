# Funkity: a unity-style component system

The begining of a simple Unity-style component system for making games. Will try to use it to implement a FallOut Shelter mobile kinda game. Should be able to describe the entire game in JSON (see `GameData.js`).

<img width="694" alt="simple editor" src="https://cloud.githubusercontent.com/assets/129330/11408642/7aea8bd4-9388-11e5-8453-4a0e765e8932.png">

* `npm install`
* `npm start`

Browse at http://localhost:9966

## To create a component

* add to components/
* add to components/index
* give propTypes (used for serializing/editor)

## Component strucutre:

* start()
* update(dt)
* remove()
* Comp.propTypes

Get any references to other entities in `start` with `Env.game.getEntityByName(targetName)`.

## Serializing/deserialzing

```js
  const entity = Entities.make({
    args: ["entityName", posX, posY],
    comps: [
      ["State", "BORN"],
      ["Health", 100, 20],
      ["PlayerActor"],
      ["Wander", 2],
      ["MoveTowards", "e2"],
      ["HealthRenderer"],
      ["ColorUp"],
    ]
  });
```

```js
  Entities.serialize(entity);
```

### To figure out

* How to spawn prefabs without requiring an instance
* Clean up creating new components. Too many steps / too manual
* drag n drop assets (general filesystem access)
