import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Toolbar.css'
import { resetState, addCard, deleteCard } from "../actions/index";
import {stateToCards} from "./stateToCards";
import {SaveList} from "./SaveList";

const mapStateToProps = state => {
  return {
    currentState: state,
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
    this.exportState = this.exportState.bind(this);
  }


 addCard(event) {
   this.props.addCard();
 }

 deleteCard(cardNumber) {
   this.props.deleteCard();
 }

  exportState() {
    return stateToCards(this.props.currentState);
  }

  resetState() {
    this.props.resetState(null);
  }



  render() {
    const cardString = this.exportState();
    console.log("cardString");
    console.log(cardString)
  return (
    <div className='toolbar'>
      <button onClick={this.addCard}>Add Card</button>
      <button onClick={this.deleteCard}>Delete</button>
      <button onClick={this.resetState}>Reset</button>
      <SaveList list={this.exportState()}/>
    </div>
  )
}
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarDisplay);

export default Toolbar;
