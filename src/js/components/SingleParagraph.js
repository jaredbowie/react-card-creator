import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const toReturn={ currentCardNumber: state.currentCardNumber,
                   cards: state.cards,
                   currentNotePhrase: state.currentNotePhrase};
  return toReturn;
};

class OneParagraph extends Component {
  constructor(props) {
    super(props);
  //  console.log("props state cardlist sidepanel.js");
  //  console.log(props);
    this.state = {
      //currentCardNumber:  props.currentCardNumber,
      //cards: props.cards,
      sidePanelWidth: {width: "0px"}
     };
    //this.handleClick = this.handleClick.bind(this);
    //this.handleCloseNav = this.handleCloseNav.bind(this);
    //this.handleOpenNav = this.handleOpenNav.bind(this);
  }

    //console.log(currentCard);
    render() {
      const cards=this.props.cards;
      const currentCardNumber=this.props.currentCardNumber;
      const currentCard = cards.filter(oneCard => oneCard.cardNumber === currentCardNumber)[0];
      const currentParagraph = currentCard.paragraph;
      var p = new RegExp("(" + this.props.currentNotePhrase + ")");
      const arrayOfStrings = currentParagraph.split(p);

  return (
  <div>
   {arrayOfStrings.map(oneString => {
     if (oneString===this.props.currentNotePhrase) {
       return <font color="blue">{oneString}</font>
     }
     else {
       return oneString;
     }
     }
   )}
  </div>
);
}
}

const SingleParagraph = connect(mapStateToProps)(OneParagraph);

export default SingleParagraph;
