import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/TopToolbar.css';
import '../../css/SidePanel.css';
import { updateDeckElements } from "../actions/index";
import SidePanel from './SidePanel';

/*
currentNoteEmphasisPhrase: "",
currentNoteClosed: false,
currentNoteEhphasis: false,
currentNoteHint: "".
currentNotePhrase: "",
*/

const mapStateToProps = state => {
  var currentCard = state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0];
  if (typeof currentCard === 'undefined') {
    var currentCard= {paragraph: '',
                  audioPath: '',
                 notes: []}
  }
  const toReturn={ cards: state.cards,
                   currentCard: currentCard,
                   currentCardNumber: state.currentCardNumber,
                   showReading: state.showReading,
                   showAudio: state.showAudio}
  return toReturn;
};

function mapDispatchToProps(dispatch) {
  return {
    updateDeckElements: newDeckElements => dispatch(updateDeckElements(newDeckElements)),
  };
}


class CountComp extends Component {
  constructor(props) {
    super(props);
    this.currentCount = this.currentCount.bind(this);
    this.showReading = this.showReading.bind(this);
    this.cardDown = this.cardDown.bind(this);
    this.state = {
     };
  }

  currentCount() {
    const cards=this.props.cards;
    var theCount=0;
    for (var i in cards) {
      for (var x in cards[i].notes) {
        theCount++;
      }
    }
    return theCount
  }

  showReading() {
    if (this.props.showReading) {
      return "btn btn-success btn-sm topButton"
    }
    else return "btn btn-light btn-sm topButton"
  }

  showAudio() {
    if (this.props.showAudio) {
      return "btn btn-success btn-sm topButton"
    }
    else return "btn btn-light btn-sm topButton"
  }

  handleReading() {
    this.props.updateDeckElements({showReading: !this.props.showReading});
  }

  handleAudio() {
    this.props.updateDeckElements({showAudio: !this.props.showAudio});
  }



  cardDown() {
    var currentCardIndex = this.props.cards.findIndex(x => x.cardNumber === this.props.currentCardNumber);
    if (currentCardIndex-1 >= 0) {
      var newCardIndexNumber = currentCardIndex-1;
    }
    else {
      var newCardIndexNumber = currentCardIndex
    }

    var newCardNumber = this.props.cards[newCardIndexNumber].cardNumber
    this.props.updateDeckElements({currentNoteNumber: 0,
                                    currentCardNumber: newCardNumber});
  }

  cardUp() {
    var currentCardIndex = this.props.cards.findIndex(x => x.cardNumber === this.props.currentCardNumber);
    var cardCount = this.props.cards.length;
    if (currentCardIndex+1 < cardCount) {
      var newCardIndexNumber = currentCardIndex+1;
    }
    else {
      var newCardIndexNumber = currentCardIndex
    }

    var newCardNumber = this.props.cards[newCardIndexNumber].cardNumber
    this.props.updateDeckElements({currentNoteNumber: 0,
                                    currentCardNumber: newCardNumber});

  }

    render() {


  return (
    <div className="container-fluid topToolBar">
    <div className="row">
    <div className="col-3"><SidePanel/></div>
    <div className="col-3"> </div>
    <div className="col-3"><div className="arrows" onClick={(event) => this.cardDown()}>←</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <div className="arrows" onClick={(event) => this.cardUp()}>→</div></div>
    <div className="col-3">
    <button className={this.showReading()} onClick={(event) => this.handleReading()}>Show Reading</button>
    <button className={this.showAudio()} onClick={(event) => this.handleAudio()}>Show Audio</button>
  {this.currentCount()} Cards
  </div>
  </div>
  </div>
);}}

const TopToolbar = connect(mapStateToProps, mapDispatchToProps)(CountComp);

export default TopToolbar;


///    <div id="arrows">Hey</div>
//    <div id="TopToolbarRight">
