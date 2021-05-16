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
  return {
    currentNotePhrase: state.currentNotePhrase,
    currentCard: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0],
    notes: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0].notes,
    currenteNoteClosed: state.currentNoteClosed,
    currentNoteEmphasis: state.currentNoteEmphasis,
    currentCardNumber: state.currentCardNumber
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
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.changeCurrentNoteNumber = this.changeCurrentNoteNumber.bind(this);
    this.handleWordPhrase = this.handleWordPhrase.bind(this);
    this.updateNote = this.updateNote.bind(this);

  }



  addNote(event) {
    this.props.addNote({currentNotes: this.props.notes,
                        currentCard: this.props.currentCard});
  }

  deleteNote(noteNumber) {
    this.props.deleteNote({noteNumber: noteNumber,
                            currentNotes: this.props.notes});
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

  handleEmphasis(noteNumber, emphasisNow) {
    var newNotes=this.updateNote(noteNumber, {emphasis: !emphasisNow});
    this.props.updateDeckElements({currentNoteEmphasis: !emphasisNow});
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

/*
//this is for updates of any fields in the notes
  handleChange(event, noteNumber) {

    //if (event.target.id==="closed") {
        //  this.updateCurrentNoteClosed(noteNumber, !singleNote.closed);
    //    }
    console.log("card notes handle change currentNoteClosed");
    console.log(this.props.currentNoteClosed);
    if (event.target.id==="wordPhrase") {
          this.updateCurrentNote(noteNumber, event.target.value);
    }

    if (event.target.id==="emphasisPhrase") {
      this.updateCurrentNoteEmphasis(noteNumber, event.target.value);
    }
    this.props.editNote({newNotes: newNotes,
                        currentNoteNumber: noteNumber});
  }

*/
  render() {
    return (
      <div className="noteContainer">
      <ul id="noteList">
      <button
        id="addNote"
        value="Add Note"
        onClick={this.addNote}>Add Note</button>
        {
          this.props.notes.slice(0).reverse().map(el => {
          const currentKey=this.props.currentCardNumber + "noteNumber" + el.noteNumber;
          return <li key={currentKey} id={currentKey} className="cardParagraph" onClick={() => this.changeCurrentNoteNumber(el.noteNumber, el.wordPhrase, el.emphasis, el.emphasisPhrase, el.closed, el.hint)}>
                  <button id="deleteNote" onClick={() => this.deleteNote(el.noteNumber)}>Delete Note</button>
                    <br></br>
                  <textarea
                    className="noteText"
                    type="text"
                    id="wordPhrase"
                    placeholder="Word or Phrase"
                    value={el.wordPhrase}  //{this.props.paragraph}
                    onChange={(event) => this.handleWordPhrase(event, el.noteNumber)}
                  />
                  <br></br>
                   <textarea
                     className="noteText"
                     type="text"
                     id="reading"
                     placeholder="Reading (if any)"
                     value={el.reading}  //{this.props.paragraph}
                     onChange={(event) => this.handleReading(event, el.noteNumber)}
                   />
                   <br></br>
                   <textarea
                     className="noteText"
                     type="text"
                     id="definition"
                     placeholder="Definition"
                     value={el.definition}  //{this.props.paragraph}
                     onChange={(event) => this.handleDefinition(event, el.noteNumber)}
                   />
                   <br></br>
                   <input type="checkbox"
                          id="emphasis"
                          checked={el.emphasis}
                          onChange={(event) => this.handleEmphasis(el.noteNumber, el.emphasis)}></input>
                    {el.emphasis &&
                      <textarea
                          className="noteText"
                          type="text"
                          id="emphasisPhrase"
                          placeholder="Highlight any surrounding context"
                          value={el.emphasisPhrase}  //{this.props.paragraph}
                          onChange={(event) => this.handleEmphasisPhrase(event, el.noteNumber)}
                        />}

                   <br></br>
                   <input type="checkbox"
                          id="closed"
                          checked={el.closed}
                          onChange={(event) => this.handleClose(el.noteNumber, el.closed)}></input>
                   {el.closed &&
                     <textarea
                       type="text"
                       id="hint"
                       placeholder="Hint for Cloze"
                       value={el.hint}  //{this.props.paragraph}
                       onChange={(event) => this.handleHint(event, el.noteNumber)}
                     />}
                  </li>
        })
      }
      </ul>

      </div>
    );
  }
}

const CardNotes = connect(mapStateToProps,mapDispatchToProps)(NoteDisplay);

export default CardNotes;



/*


*/
