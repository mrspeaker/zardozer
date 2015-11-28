import React from "react";
import images from "../assets/images";

const {
  Component
} = React;

class ImagePicker extends Component {

  constructor () {
    super();
  }

  render () {
    return <div className="dialog">
      <div>Assets <span style={{float:"right"}} onClick={this.props.onChoose}>X</span></div>
      <div className="imgGrid">
        {images.map(i => {
          return <img data-img={i} onClick={this.props.onChoose} src={"../assets/images/" + i} />;
        })}
      </div>
    </div>
  }
}

export default ImagePicker;
