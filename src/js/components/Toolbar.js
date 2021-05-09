import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Toolbar.css'
import { resetState } from "../actions/index";

const mapStateToProps = state => {
  return {
    //currentNotePhrase: state.currentNotePhrase,
    //currentCard: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0],
    //notes: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0].notes,
    currentCardNumber: state.currentCardNumber
    }
};

function mapDispatchToProps(dispatch) {
  return {
    resetState: nothing => dispatch(resetState(nothing))
    //ADD_NOTE
    //DELETE_NOTE
  };
}


class ToolbarDisplay extends Component {

  constructor(props) {
    super(props);
    this.createNote = this.createNote.bind(this);
    this.format = this.format.bind(this);
    this.getSelectionText = this.getSelectionText.bind(this);
    this.resetState = this.resetState.bind(this);

  }
  // Basic syntax
/* The boolean value determines whether or not a default interface is shown. It should always be set to false because some browsers do
not support it. */
 format(com, val) {
   document.execCommand(com, false, val);
   console.log(com);
   console.log(val);
 }


  getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    window.localStorage.setItem('saveTextTest', text);
    console.log(text);
}


  createNote() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    window.localStorage.setItem('saveTextTest', text);
  }
  addLink() {
    console.log("clicked add link")
    localStorage.setItem("stateTest", "addLink");
  }

  resetState() {
    this.props.resetState(null);
  }

  render() {
  return (
    <div className='toolbar'>
      <button onClick={this.resetState}>Reset</button>

    </div>
  )
}
}

const Toolbar = connect(mapStateToProps,mapDispatchToProps)(ToolbarDisplay);

export default Toolbar;
