import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Toolbar.css'
import { resetState, addCard, deleteCard } from "../actions/index";

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
    resetState: nothing => dispatch(resetState(nothing)),
    addCard: nothing => dispatch(addCard(nothing)),
    deleteCard: nothing => dispatch(deleteCard(nothing))
  };
}


class ToolbarDisplay extends Component {

  constructor(props) {
    super(props);
    this.resetState = this.resetState.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

  }


 addCard(event) {
   this.props.addCard();
 }

 deleteCard(cardNumber) {
   this.props.deleteCard();
 }

  getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    window.localStorage.setItem('saveTextTest', text);
}



  resetState() {
    this.props.resetState(null);
  }

  render() {
  return (
    <div className='toolbar'>
      <button onClick={this.addCard}>Add Card</button>
      <button onClick={this.deleteCard}>Delete</button>
      <button onClick={this.resetState}>Reset</button>

    </div>
  )
}
}

const Toolbar = connect(mapStateToProps,mapDispatchToProps)(ToolbarDisplay);

export default Toolbar;
