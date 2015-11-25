import React from "react";

const {
  Component
} = React;

class Input extends Component {
  constructor () {
    super();
    this.state = {
      val: null,
      editing: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange (e) {
    this.setState({
      val: e.target.value
    })
  }

  onBlur () {
    this.props.onChange(this.state.val);

    this.setState({
      editing: false
    });
  }

  onFocus () {
    this.setState({
      editing: true
    });
  }

  componentWillReceiveProps (props) {
    if (!this.state.editing) {
      this.setState({
        val: props.value
      });
    }
  }

  render () {
    const {val} = this.state;
    return <input type="text" value={val} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
  }
}

export default Input;
