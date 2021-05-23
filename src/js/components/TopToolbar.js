import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/TopToolbar.css';
import { updateDeckElements} from "../actions/index";

/*
currentNoteEmphasisPhrase: "",
currentNoteClosed: false,
currentNoteEhphasis: false,
currentNoteHint: "".
currentNotePhrase: "",
*/

const mapStateToProps = state => {
  const toReturn={ cards: state.cards,
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
      return "btn btn-success btn-sm"
    }
    else return "btn btn-light btn-sm"
  }

  showAudio() {
    if (this.props.showAudio) {
      return "btn btn-success btn-sm"
    }
    else return "btn btn-light btn-sm"
  }

  handleReading() {
    this.props.updateDeckElements({showReading: !this.props.showReading});
  }

  handleAudio() {
    this.props.updateDeckElements({showAudio: !this.props.showAudio});
  }

    render() {


  return (
    <div id="TopToolbar">
    <button className={this.showReading()} onClick={(event) => this.handleReading()}>Show Reading</button>
    <button className={this.showAudio()} onClick={(event) => this.handleAudio()}>Show Audio</button>
  {this.currentCount()} Cards
  </div>
);}}

const TopToolbar = connect(mapStateToProps, mapDispatchToProps)(CountComp);

export default TopToolbar;
