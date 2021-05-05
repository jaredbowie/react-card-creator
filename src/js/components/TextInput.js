import React, {Component} from 'react';

export default class TextInput extends Component {



constructor(props) {
    super(props)
    this.state = {
          html: 'cat'
    };
    this.handleType = this.handleType.bind(this);
    }

handleType(event) {
    console.log("handle type");
    //  const theText= event.target.html
    //  if (theText.includes("cat")) {
    //    console.log("found cat!")
    //  }
     //this.setState({html: theText});
    //  textTyped=textTyped + "cat";
    //  this.setState({value: event.target.value});
      console.log("target html" + event.target.html);
      console.log("value " + event.target.value);
      console.log("textcontent " + event.currentTarget.textContent);

      }

render() {
    return (<div className="textinput">
    <div placeholder="input text" contentEditable={true} class="editableDiv2" rows="4" cols="50" onInput={this.handleType} html={this.state.html}></div>
    </div>)
    }
}
