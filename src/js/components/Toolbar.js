import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Toolbar.css'
import { resetState, addCard, deleteCard, addNote, updateDeckElements, editNote } from "../actions/index";
import {stateToCards} from "./stateToCards";
import {SaveList} from "./SaveList";

const mapStateToProps = state => {
  var currentNote={};
  var currentCard = state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0];
  if (typeof currentCard === 'undefined') {
    var currentCard= {paragraph: '',
                  audioPath: '',
                 notes: []}
  }
  var currentNote = currentCard.notes.filter(oneNote => oneNote.noteNumber === state.currentNoteNumber)[0];
  if (typeof currentNote === 'undefined') {
    var currentNote= {emphasis: false,
                  noteNumber: 0,
                  closed: false}
  }
  return {
    currentNoteEmphasis: currentNote.emphasis,
    currentNoteNumber: currentNote.noteNumber,
    currentNoteClosed: currentNote.closed,
    currentNote: currentNote,
    currentCard: currentCard,
    notes: currentCard.notes,
    currentState: state,
    currentCardNumber: state.currentCardNumber
    }
};

function mapDispatchToProps(dispatch) {
  return {
    addNote: noteInfo => dispatch(addNote(noteInfo)),
    editNote: notes => dispatch(editNote(notes)),
    resetState: nothing => dispatch(resetState(nothing)),
    addCard: nothing => dispatch(addCard(nothing)),
    deleteCard: nothing => dispatch(deleteCard(nothing)),
    updateDeckElements: newDeckElements => dispatch(updateDeckElements(newDeckElements)),
  };
}



class ToolbarDisplay extends Component {

  constructor(props) {
    super(props);
    this.resetState = this.resetState.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.exportState = this.exportState.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateNote(noteNumber, updatedMap) {
    let newNotes = this.props.notes.map(singleNote => {
          if (singleNote.noteNumber === noteNumber) {
              return Object.assign({}, singleNote, updatedMap )
            }
          else {
            return singleNote;
          }});
   return newNotes
  }

 addCard(event) {
   this.props.addCard();
 }

 deleteCard(cardNumber) {
   if (window.confirm('Are you sure you wish to delete this item?')) {
     this.props.deleteCard();
   }
 }


// <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } />


  exportState() {
    return stateToCards(this.props.currentState);
  }

  resetState() {
  if (window.confirm('Are you sure you want to delete ALL CARDS?')) {
    this.props.resetState(null);
  }
  }

  addNote(event) {
    this.props.addNote({currentNotes: this.props.notes,
                        currentCard: this.props.currentCard});
  }

  handleClose() {
    var newNotes=this.updateNote(this.props.currentNoteNumber, {closed: !this.props.currentNoteClosed});
    this.props.editNote({notes: newNotes});
  }

  handleEmphasis() {
    var newNotes=this.updateNote(this.props.currentNoteNumber, {emphasis: !this.props.currentNoteEmphasis});
    this.props.editNote({notes: newNotes});
  }


  render() {
  return (
    <div>
      <div className='toolbar d-grid gap-2 col-2 mx-auto'>
      <button className="btn btn-info btn-sm"
              id="addNote"
              value="Add Note"
              onClick={this.addNote} >Add Card</button>
      <button className="btn btn-info btn-sm btnWidth" onClick={(event) => this.handleClose()}>Close</button>
      <button className="btn btn-info btn-sm btnWidth" onClick={(event) => this.handleEmphasis()}>Emphasis</button>
      <button className="btn btn-primary btn-sm btnWidth" onClick={this.addCard}>Add Note</button>
      <button className="btn btn-danger btn-sm btnWidth deleteNoteButton" onClick={this.deleteCard}>Delete Note</button>
      <button className="btn btn-danger btn-sm btnWidth" onClick={this.resetState}>Reset Deck</button>
      <SaveList list={this.exportState()}/>
      </div>
    </div>
  )
}
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarDisplay);

export default Toolbar;


/*
<div className="inputDiv"> <input type="checkbox"
                id="closed"
                checked={el.closed}
                onChange={(event) => this.handleClose(el.noteNumber, el.closed)}></input>
                */
