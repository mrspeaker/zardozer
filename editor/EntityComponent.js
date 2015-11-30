import React from "react";
import Input from "./Input";
import ImagePicker from "./ImagePicker";
import Env from "../Env";

const {
  Component
} = React;

class EntityComponent extends Component {

  constructor () {
    super();

    this.state = {
      showImagePicker: false,
      imagePickerCallback: null
    };
    this.onClick = this.onClick.bind(this);
    this.onChooseImage = this.onChooseImage.bind(this);
  }

  onClick () {}

  toggleImageDialog (cb) {
    const show = !this.state.showImagePicker;
    this.setState({
      showImagePicker: show,
      imagePickerCallback: show ? cb : null
    });
  }

  onChooseImage (e) {
    const img = e.target.getAttribute("data-img");
    if (img) {
      const {naturalWidth, naturalHeight} = e.target;
      this.state.imagePickerCallback(img, naturalWidth, naturalHeight);
    } else {
      this.state.imagePickerCallback(null);
    }
    this.toggleImageDialog(null);
  }

  render () {
    const {component} = this.props;
    const {propTypes} = component.constructor;
    const {showImagePicker} = this.state;

    let propertiesDef = [];
    if (propTypes) {
      for (let v in propTypes) {
        propertiesDef.push([v, propTypes[v]]);
      }
    }

    const makeInput = (field, type, val) => {
      switch (type) {
      case "Boolean":
        return <input type="checkbox" checked={val} onChange={() =>
          component[field] = !component[field]} />;
      case "Instance":
        if (!val) {
          console.log("what nonsense is this?");
          return null;
        }
        return <Input value={val.name} onChange={v => {
          const e = Env.game.getEntityByName(v);
          if (e) {
            component[field] = Env.game.getEntityByName(v);
          }
          else {
            console.log("Entity not found:", v);
          }
        }} />;
      /*
      // html5 picker doesn't handle alpha or non-present attrib.
      case "Color":
        return <input value={val} type="color" onChange={v => {
          component[field] = v.target.value;
        }}/>
      */
      case "Image":
        return <span>
          <button onClick={() => this.toggleImageDialog((img, w, h) => {
            component[field] = img ? img : "";
            const rend = component.getComponent("Renderer");
            if (rend) {
              // If no img, set a background color. If img, remove background color.
              if (img) {
                rend.color = "transparent";
              } else {
                rend.color = `hsl(${Math.random() * 360|0}, 50%, 50%)`;
              }
            }
            const pos = component.getComponent("Position");
            if (pos) {
              // Set new dimensions... do automatic?
              pos.w = w;
              pos.h = h;
            }
          })}>select</button>
          <Input value={val} onChange={() => {}} />;
        </span>;
      default:
        return <Input value={val} onChange={v => {
          const newVal = type === "Number" ? parseFloat(v, 10) :  v;
          component[field] = newVal;
        }} />;
      }
    };

    const hasEnabled = propertiesDef.find(p => p[0] === "enabled");
    let enabledBox = null;
    if (hasEnabled) {
      enabledBox = makeInput(hasEnabled[0], hasEnabled[1], component[hasEnabled[0]]);
      propertiesDef = propertiesDef.filter(p => p !== hasEnabled);
    }

    const properties = propertiesDef.map((d, i) => {
      return <div key={i}>{d[0]}: {makeInput(d[0], d[1], component[d[0]])}</div>;
    });

    return <div className="entityComponent" onClick={this.onClick}>
      <strong>{enabledBox}{component.name}</strong>
      <div style={{paddingLeft:"5px"}}>
        {properties}
      </div>
      {showImagePicker && <ImagePicker onChoose={this.onChooseImage} />}
    </div>;
  }
}

export default EntityComponent;
