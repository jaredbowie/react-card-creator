import React, { Component } from "react";
import Toolbar from './Toolbar';
import CardNotes from './CardNotes';
import SingleParagraph from './SingleParagraph';
import TopToolbar from './TopToolbar';
import '../../css/Editor.css';
import { connect } from "react-redux";
import { updateDeckElements} from "../actions/index";

const mapStateToProps = state => {
  return { currentCardNumber: state.currentCardNumber,
          cards:  state.cards,
          edit:  state.edit };
};


function mapDispatchToProps(dispatch) {
  return {
    updateDeckElements: newDeckElements => dispatch(updateDeckElements(newDeckElements))
  };
}


//// only show editor of currentCardNumber exists
//// can't delete card 0 or can create card always
/// addnewcard should set currentcard as newcard

class ConnectedEditor extends Component {
  constructor(props) {
    super(props);
    this.currentCardNumberValid = this.currentCardNumberValid.bind(this);
    this.handleWholeClick = this.handleWholeClick.bind(this);
  }

  currentCardNumberValid() {
    for (var cardIndex in this.props.cards) {
      if (this.props.cards[cardIndex].cardNumber === this.props.currentCardNumber) {
        return true
      }
    }
    return false
  }

  handleWholeClick(event) {
    if (!event.target.className.includes("inSidePanel")) {
      this.props.updateDeckElements({sidePanelWidth: {width: "0px"}});
    }
    if (!event.target.className.includes("editParagraph") &&
        !event.target.id === ("addCard") && 
        this.props.edit) {
      console.log("handlewholeclick editparagraph");
      this.props.updateDeckElements({edit: false});
    }

  }



  render() {
    let someTest=null
    if (this.currentCardNumberValid()) {
        someTest=(  <div className="editor">
        <SingleParagraph />
        <CardNotes />
        </div>)
      }
    return (
  <div id="wholePage" onClick={(event) => this.handleWholeClick(event)}>

    <TopToolbar />
      <Toolbar />
   {someTest}
  </div>
)
}
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditor);
export default Editor;
