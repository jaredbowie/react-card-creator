import React from 'react';
import Toolbar from './Toolbar';
import CardNote from './CardNote';
import SidePanel from './SidePanel';
import DisplayParagraph from './DisplayParagraph';
import EditParagraph from './EditParagraph';
//import SingleParagraph from './SingleParagraph';
import '../../css/Editor.css';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { allState: state };
};


const ConnectedEditor = ({ allState }) => (
  <div>
    <SidePanel allState={allState}/>
  <div className="editor">

  <DisplayParagraph />
  <EditParagraph allState={allState}/>
  <div>Current Card Number = {allState.currentCardNumber}</div>
  </div>
  </div>
  );

const Editor = connect(mapStateToProps)(ConnectedEditor);
export default Editor;


/*
export default class Editor extends React.Component {
  constructor(props) {
  super(props);
  }

  render() {
      return (<div className="editor">
      <DisplayParagraph />
      <EditParagraph />
      </div>)
      }
    }

*/



/*
cards: [{cardNumber: 0,
         fontColor: "#0000ff",
         paragraph:  "Some Text from card 0",
         audioPath: "[sound:a.mp3]",
         notes:  [{noteId: 0,
                     wordPhrase: "word or phrase",
                     reading: "how to read the word",
                     definition: "definition",
                     hint:  "any hint"},
                    {noteId: 1,
                     wordPhrase: "second phrase",
                     reading: "second reading",
                     definition: "second definition",
                     hint:  "second hint"}
                   ]},
       {cardNumber: 1,
        fontColor: "#0000ff",
        paragraph:  "Some Text Card from card 1",
        audioPath: "[sound:a.mp3]",
        notes:  [{noteId: 0,
                    wordPhrase: "word or phrase",
                    reading: "how to read the word",
                    definition: "definition",
                    hint:  "any hint"},
                   {noteId: 1,
                    wordPhrase: "second phrase",
                    reading: "second reading",
                    definition: "second definition",
                    hint:  "second hint"}]
                  }]
                  */




  //highlight and click a button to create a note
  // click a note just reruns

  /*paste(e) {}

  getCurrentCard(state) {
    for(var i=0; i<state.cards.length; i++) {
           if(state.cards[i].cardNumber==state.currentCardNumber) {
             return state.cards[i]
         }
  }
}

  render() {
     const currentState = this.state.defaultState;
     const currentCardNumber = currentState.currentCardNumber;
     const currentCard = this.getCurrentCard(currentState);
     console.log(currentCard);
  return (
    <React.Fragment>
    <SidePanel currentState={currentState} />
      <Toolbar />
      <div
        class='editor'
        id='editor'
        contentEditable='true'
        data-placeholder='Text'
        onPaste={(e) => this.paste(e)}
      >{currentCard.paragraph}<p>Current Card = {currentState.currentCardNumber}</p>
      <p>StateTest {this.props.stateTest}</p></div>
      <CardNote currentCard={currentCard}  />
    </React.Fragment>
  )}*/
