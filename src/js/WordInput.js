import React, {Component} from 'react';

export default class WordInput extends Component {

constructor(props) {
    super(props)
    this.state = {
          value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    }


handleChange(event) {
      this.setState({value: event.target.value});
      console.log(event.target.value);
  }


render() {
    return (<div className="wordinput">
    <textarea id="w3review" placeholder="word / phrase" rows="4" cols="50" value={this.state.value} onChange={this.handleChange}></textarea>
    </div>)
    }
}
