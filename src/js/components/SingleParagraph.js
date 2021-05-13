import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/SingleParagraph.css'


/*
currentNoteEmphasisPhrase: "",
currentNoteClosed: false,
currentNoteEhphasis: false,
currentNoteHint: "".
currentNotePhrase: "",
*/

const mapStateToProps = state => {
  const toReturn={ currentCardNumber: state.currentCardNumber,
                   cards: state.cards,
                   currentNotePhrase: state.currentNotePhrase,
                   currentNoteEmphasisPhrase: state.currentNoteEmphasisPhrase,
                   currentNoteEmphasis: state.currentNoteEmphasis,
                   currentNoteClosed: state.currentNoteClosed,
                   currentNoteHint: state.currentNoteHint}
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

      var noteEmphasisRegex = new RegExp("(" + this.props.currentNoteEmphasisPhrase + ")");
      var arrayOfStringsEmphasis = [];
      if (this.props.currentNoteEmphasisPhrase !== "") {
        arrayOfStringsEmphasis = currentParagraph.split(noteEmphasisRegex);
      } else {
          arrayOfStringsEmphasis.push(currentParagraph);
      }
      var stringsColoredEmp = []
      for (var index in arrayOfStringsEmphasis) {
        if (arrayOfStringsEmphasis[index]===this.props.currentNoteEmphasisPhrase) {
          stringsColoredEmp.push({type: "emphasis",
                                  text: arrayOfStringsEmphasis[index]})
        }
        else {
          stringsColoredEmp.push({type: "normal",
                                  text: arrayOfStringsEmphasis[index]})
        }
      }
       // for each string in the array split it on the currentnote phrase and then make sure it's in the right spot then return it
       //eventually what we have is an array of normal plus green  then we check normal and if our blue is found in normal seperate it,
       // cards = [{text: "fdsfsdf",
        ///         color: "green"}]
      var currentPhraseRegex = new RegExp("(" + this.props.currentNotePhrase + ")");
      var arrayOfStringCurrentPhrase = []
      for (var indexStrEmp in stringsColoredEmp) {
        var splitForPhrase=[]
        splitForPhrase = stringsColoredEmp[indexStrEmp].text.split(currentPhraseRegex);
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


  return (
  <div className="SingleParagraph">
   {arrayOfStringCurrentPhrase.map((oneStringMap, index) => {
     switch (oneStringMap.type) {
       case "wordPhrase":
        return <font key={index} color="blue">{oneStringMap.text}</font>
      case "emphasis":
      return <font key={index} color="green">{oneStringMap.text}</font>
      default:
      return <font key={index} color="black">{oneStringMap.text}</font>
     }})}
   <p>
   </p>
  </div>
);
}
}

const SingleParagraph = connect(mapStateToProps)(OneParagraph);

export default SingleParagraph;
