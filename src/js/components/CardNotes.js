// src/js/components/CardNotes.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote,
         updateDeckElements,
         addNote,
         deleteNote,
         changeNoteNumber} from "../actions/index";
import '../../css/CardNotes.css';

const mapStateToProps = state => {
  var currentCard = state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0];
  if (typeof currentCard === 'undefined') {
    var currentCard= {paragraph: '',
                  audioPath: '',
                 notes: []}
  }
  var currentNote = currentCard.notes.filter(oneNote => oneNote.noteNumber === state.currentNoteNumber)[0];

  if (typeof currentNote === 'undefined') {
    var currentNote = {emphasis: false,
                  noteNumber: 0,
                  closed: false,
                  currentNotePhrase: ""}
  }
  return {
    currentNoteClosed: currentNote.closed,
    currentNotePhrase: currentNote.wordPhrase,
    currentCard: currentCard,
    notes: currentCard.notes,
    currentNoteEmphasis: currentNote.emphasis,
    currentCardNumber: state.currentCardNumber,
    showReading: state.showReading
    }
};

function mapDispatchToProps(dispatch) {
  return {
    // edit note will takes the notes provided and replace them in the state
    // expects a map of {notes: newNotesArray}
    editNote: notes => dispatch(editNote(notes)),
// expect a map of items in the outter most layer (the deck)
    updateDeckElements: newDeckElements => dispatch(updateDeckElements(newDeckElements)),
    addNote: noteInfo => dispatch(addNote(noteInfo)),
    deleteNote: notesNoteNumber => dispatch(deleteNote(notesNoteNumber)),
    ////
    changeNoteNumber: newNoteNumberInfo => dispatch(changeNoteNumber(newNoteNumberInfo)),
  };
}

class NoteDisplay extends Component {
  constructor(props) {
    super(props);
    //this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.changeCurrentNoteNumber = this.changeCurrentNoteNumber.bind(this);
    this.handleWordPhrase = this.handleWordPhrase.bind(this);
    this.updateNote = this.updateNote.bind(this);

  }



  /*addNote(event) {
    this.props.addNote({currentNotes: this.props.notes,
                        currentCard: this.props.currentCard});
  }*/

  deleteNote(noteNumber) {
      if (window.confirm('Are you sure you want to delete this note?')) {
    this.props.deleteNote({noteNumber: noteNumber,
                            currentNotes: this.props.notes});
    }
  }

//this is for selecting the note (to highlight the notes features in the paragraph)
// so with a new note we'll have to update if it's closed, if it's emphasized, what it's emphasis is and what phrase is blue
// we can do all these things here or do it all in the reducer
//currentNoteEmphasisPhrase: "",
//currentNoteClosed: false,
//currentNoteEhphasis: false,
//currentNoteHint: "".
//currentNotePhrase: "",
  changeCurrentNoteNumber(noteNumber, wordPhrase, emphasis, emphasisPhrase, closed, hint) {
    var newMap = {currentNoteNumber: noteNumber,
                  currentNotePhrase: wordPhrase,
                  currentNoteEmphasis: emphasis,
                  currentNoteEmphasisPhrase: emphasisPhrase,
                  currentNoteClosed: closed,
                  currentNoteHint: hint}
    this.props.updateDeckElements(newMap);
  }

//returns new notes  uses card number in state
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

  handleWordPhrase(event, noteNumber) {
    var newNotes=this.updateNote(noteNumber, {wordPhrase: event.target.value});
    this.props.updateDeckElements({currentNotePhrase: event.target.value});
    this.props.editNote({notes: newNotes});
  }

  handleReading(event, noteNumber) {
    var newNotes=this.updateNote(noteNumber, {reading: event.target.value});
    /// doesn't have a current element
    this.props.editNote({notes: newNotes});
  }
  handleDefinition(event, noteNumber) {
    var newNotes=this.updateNote(noteNumber, {definition: event.target.value});
    /// doesn't have a current element
    this.props.editNote({notes: newNotes});
  }



  handleEmphasisPhrase(event, noteNumber) {
    var newNotes=this.updateNote(noteNumber, {emphasisPhrase: event.target.value});
    this.props.updateDeckElements({currentNoteEmphasisPhrase: event.target.value});
    this.props.editNote({notes: newNotes});
  }

  handleClose(noteNumber, closeNow) {
    var newNotes=this.updateNote(noteNumber, {closed: !closeNow});
    this.props.updateDeckElements({currentNoteClosed: !closeNow});
    this.props.editNote({notes: newNotes});
  }
  handleHint(event, noteNumber) {
    var newNotes=this.updateNote(noteNumber, {hint: event.target.value});
    this.props.updateDeckElements({currentNoteHint: event.target.value});
    this.props.editNote({notes: newNotes});
  }


  render() {
    return (
      <div className="noteContainer container">
      <div className="row">
      <ul id="noteList">
        {
          this.props.notes.slice(0).reverse().map(el => {
          const currentKey=this.props.currentCardNumber + "noteNumber" + el.noteNumber;
          return <li key={currentKey} id={currentKey} className="cardParagraph shadow" onClick={() => this.changeCurrentNoteNumber(el.noteNumber, el.wordPhrase, el.emphasis, el.emphasisPhrase, el.closed, el.hint)}>
            <img alt="" onClick={() => this.deleteNote(el.noteNumber)} className="redCircle" src="../../../red-circle.png"></img>

                    <br></br>
                    <div className="inputDiv row">
                  <textarea
                    className="noteText form-control"
                    type="text"
                    id="wordPhrase"
                    placeholder="Word or Phrase"
                    value={el.wordPhrase}  //{this.props.paragraph}
                    onChange={(event) => this.handleWordPhrase(event, el.noteNumber)}
                  />
                  </div>
                  {this.props.showReading &&
                  <div className="inputDiv row">
                   <textarea
                     className="noteText form-control"
                     type="text"
                     id="reading"
                     placeholder="Reading (if any)"
                     value={el.reading}  //{this.props.paragraph}
                     onChange={(event) => this.handleReading(event, el.noteNumber)}
                   /></div>}
                   <div className="inputDiv row">
                   <textarea
                     className="noteText form-control"
                     type="text"
                     id="definition"
                     placeholder="Definition"
                     value={el.definition}  //{this.props.paragraph}
                     onChange={(event) => this.handleDefinition(event, el.noteNumber)}
                   />
                   </div>

                    {el.emphasis &&
                      <div className="inputDiv row">
                      <textarea
                          className="noteText form-control"
                          type="text"
                          id="emphasisPhrase"
                          placeholder="Highlight any surrounding context"
                          value={el.emphasisPhrase}  //{this.props.paragraph}
                          onChange={(event) => this.handleEmphasisPhrase(event, el.noteNumber)}
                        /></div>}


                   {el.closed &&
                     <div className="inputDiv row">
                     <textarea
                       className="noteText form-control"
                       type="text"
                       id="hint"
                       placeholder="Hint for Cloze"
                       value={el.hint}  //{this.props.paragraph}
                       onChange={(event) => this.handleHint(event, el.noteNumber)}
                     /></div>}
                  </li>
        })
      }
      </ul>
      </div>
      </div>
    );
  }
}

const CardNotes = connect(mapStateToProps,mapDispatchToProps)(NoteDisplay);

export default CardNotes;



/*
  <button className="btn btn-danger" id="deleteNote" onClick={() => this.deleteNote(el.noteNumber)}>Delete Note</button>

*/
