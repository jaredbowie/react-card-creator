import React, { Component } from "react";
import Toolbar from './Toolbar';
import CardNotes from './CardNotes';
import SidePanel from './SidePanel';
//import DisplayParagraph from './DisplayParagraph';
import EditParagraph from './EditParagraph';
import SingleParagraph from './SingleParagraph';
import '../../css/Editor.css';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { currentCardNumber: state.currentCardNumber,
          cards:  state.cards };
};



//// only show editor of currentCardNumber exists
//// can't delete card 0 or can create card always
/// addnewcard should set currentcard as newcard

class ConnectedEditor extends Component {
  constructor(props) {
    super(props);
    this.currentCardNumberValid = this.currentCardNumberValid.bind(this);
  }

  currentCardNumberValid() {
    for (var cardIndex in this.props.cards) {
      if (this.props.cards[cardIndex].cardNumber === this.props.currentCardNumber) {
        return true
      }
    }
    return false
  }



  render() {
    let someTest=null
    if (this.currentCardNumberValid()) {
        someTest=(  <div className="editor">

        <SingleParagraph />
        <EditParagraph/>
        <CardNotes />
        </div>)
      }
    return (
  <div>
    <SidePanel/>
      <Toolbar />
   {someTest}
  </div>
)
}
}

const Editor = connect(mapStateToProps)(ConnectedEditor);
export default Editor;
