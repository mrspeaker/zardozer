import React from "react";

const {
  Component
} = React;

class Input extends Component {
  constructor () {
    super();
    this.state = {
      value: null,
      editing: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange ({target:{value}}) {
    this.setState({
      value
    });
  }

  onBlur () {
    const {value} = this.state;
    this.props.onChange(value);

    this.setState({
      editing: false
    });
  }

  onFocus () {
    this.setState({
      editing: true
    });
  }

  componentWillReceiveProps ({value}) {
    const {editing} = this.state;
    if (!editing) {
      this.setState({
        value
      });
    }
  }

  render () {
    const {value} = this.state;
    return <input type="text" value={value} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />;
  }
}

export default Input;
