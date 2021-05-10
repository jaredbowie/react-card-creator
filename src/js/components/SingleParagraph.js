import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const toReturn={ currentCardNumber: state.currentCardNumber,
                   cards: state.cards,
                   currentNotePhrase: state.currentNotePhrase,
                   currentNoteEmphasis: state.currentNoteEmphasis}
  return toReturn;
};

class OneParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidePanelWidth: {width: "0px"}
     };
  }

  /// green before the blue
  // green after the blue
  // green before and after the blue
  /// would blue ever be both green and black? // assume no
  // which means blue is either in green or not in green

    render() {

      const cards=this.props.cards;
      const currentCardNumber=this.props.currentCardNumber;
      const currentCard = cards.filter(oneCard => oneCard.cardNumber === currentCardNumber)[0];
      const currentParagraph = currentCard.paragraph;
      var p = new RegExp("(" + this.props.currentNoteEmphasis + ")");
      const arrayOfStrings = currentParagraph.split(p);

  return (
  <div>
   {arrayOfStrings.map(oneString => {
     if (oneString===this.props.currentNoteEmphasis) {
       return <font color="green">{oneString}</font>
     }
     else {
       return oneString;
     }
     }
   )}
   {console.log("this props")}
   {console.log(this.props)}
  </div>
);
}
}

const SingleParagraph = connect(mapStateToProps)(OneParagraph);

export default SingleParagraph;
