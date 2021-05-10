import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/SingleParagraph.css'

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

      var noteEmphasisRegex = new RegExp("(" + this.props.currentNoteEmphasis + ")");
      var arrayOfStringsEmphasis = [];
      if (this.props.currentNoteEmphasis !== "") {
        arrayOfStringsEmphasis = currentParagraph.split(noteEmphasisRegex);
      } else {
          arrayOfStringsEmphasis.push(currentParagraph);
      }
      var stringsColoredEmp = []
      for (var index in arrayOfStringsEmphasis) {
        if (arrayOfStringsEmphasis[index]===this.props.currentNoteEmphasis) {
          stringsColoredEmp.push({type: "emphasis",
                                  text: arrayOfStringsEmphasis[index]})
        }
        else {
          stringsColoredEmp.push({type: "normal",
                                  text: arrayOfStringsEmphasis[index]})
        }
      }
      console.log("stringsColoredEmp");
      console.log(stringsColoredEmp);
       // for each string in the array split it on the currentnote phrase and then make sure it's in the right spot then return it
       //eventually what we have is an array of normal plus green  then we check normal and if our blue is found in normal seperate it,
       // cards = [{text: "fdsfsdf",
        ///         color: "green"}]
      var currentPhraseRegex = new RegExp("(" + this.props.currentNotePhrase + ")");
      var arrayOfStringCurrentPhrase = []
      for (var indexStrEmp in stringsColoredEmp) {
        var splitForPhrase=[]
        var splitForPhrase = stringsColoredEmp[indexStrEmp].text.split(currentPhraseRegex);
        for (var indexSecond in splitForPhrase) {
          if (splitForPhrase[indexSecond] === this.props.currentNotePhrase) {
            arrayOfStringCurrentPhrase.push({type: "wordPhrase",
                                             text: splitForPhrase[indexSecond]})
          }
          else {
            arrayOfStringCurrentPhrase.push({type: stringsColoredEmp[indexStrEmp].type,
                                             text: splitForPhrase[indexSecond]})
          }
        }
      }
      console.log("arrayOfStringCurrentPhrase");
      console.log(arrayOfStringCurrentPhrase);

  return (
  <div className="SingleParagraph">
   {arrayOfStringCurrentPhrase.map(oneStringMap => {
     switch (oneStringMap.type) {
       case "wordPhrase":
        return <font color="blue">{oneStringMap.text}</font>
      case "emphasis":
      return <font color="green">{oneStringMap.text}</font>
      case "normal":
      return <font color="black">{oneStringMap.text}</font>
     }

     }
   )}
  </div>
);
}
}

const SingleParagraph = connect(mapStateToProps)(OneParagraph);

export default SingleParagraph;
