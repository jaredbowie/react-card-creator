// src/js/components/CardNotes.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote,
         updateCurrentNoteInfo,
         addNote,
         deleteNote} from "../actions/index";

const mapStateToProps = state => {
  return {
    currentNotePhrase: state.currentNotePhrase,
    currentCard: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0],
    notes: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0].notes,
    currentCardNumber: state.currentCardNumber
    }
};

function mapDispatchToProps(dispatch) {
  return {
    editNote: notes => dispatch(editNote(notes)),
    updateCurrentNoteInfo: newNoteInfo => dispatch(updateCurrentNoteInfo(newNoteInfo)),
    addNote: noteInfo => dispatch(addNote(noteInfo)),
    deleteNote: notesNoteNumber => dispatch(deleteNote(notesNoteNumber)),

  };
}

class NoteDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

  }



  addNote(event) {
    this.props.addNote({currentNotes: this.props.notes,
                        currentCard: this.props.currentCard});
  }

  deleteNote(noteNumber) {
    this.props.deleteNote({noteNumber: noteNumber,
                            currentNotes: this.props.notes});
  }

  updateCurrentNote(noteNumber, wordPhrase) {
    this.props.updateCurrentNoteInfo({currentNotePhrase: wordPhrase});
  }

  updateCurrentNoteEmphasis(noteNumber, emphasisPhrase) {
    this.props.updateCurrentNoteInfo({currentNoteEmphasis: emphasisPhrase});
  }

  handleChange(event, noteNumber) {
    console.log(event.target.value);
    let newNotes = this.props.notes.map(singleNote => {
          if (singleNote.noteNumber === noteNumber) {
            if (event.target.id === "closed"){
              //[] converts a string into a key
              return Object.assign({}, singleNote, {[event.target.id] :  !singleNote.closed} )
            }
            if (event.target.id === "emphasis"){
              return Object.assign({}, singleNote, {[event.target.id] :  !singleNote.emphasis} )
            }
            else {
             return Object.assign({}, singleNote, {[event.target.id] :  event.target.value} )
           }
           }
          else {
            return singleNote;
          }});
    if (event.target.id==="wordPhrase") {
          this.updateCurrentNote(noteNumber, event.target.value);
    }
    if (event.target.id==="emphasisPhrase") {
      this.updateCurrentNoteEmphasis(noteNumber, event.target.value);
    }
    this.props.editNote({newNotes: newNotes,
                        currentNoteNumber: noteNumber});
  }


  render() {
    return (
      <div>
      currentNotePhrase = {this.props.currentNotePhrase}
      <ul>
        {
          this.props.notes.map(el => {
          const currentKey="noteNumber" + el.noteNumber;
          return <li key={currentKey} id={currentKey} class="cardParagraph" onClick={() => this.updateCurrentNote(el.noteNumber, el.wordPhrase, el.emphasisPhrase)}>

                  <button onClick={() => this.deleteNote(el.noteNumber)}>Delete Note</button>
                    <br></br>
                  <textarea
                    type="text"
                    id="wordPhrase"
                    placeholder="Word or Phrase"
                    value={el.wordPhrase}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <br></br>
                  <textarea
                    type="text"
                    id="reading"
                    placeholder="Reading (if any)"
                    value={el.reading}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <br></br>
                  <textarea
                    type="text"
                    id="definition"
                    placeholder="Definition"
                    value={el.definition}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <br></br>
                  <input type="checkbox"
                         id="emphasis"
                         checked={el.emphasis}
                         onChange={(event) => this.handleChange(event, el.noteNumber)}></input>
                         {el.emphasis &&
                           <textarea
                               type="text"
                               id="emphasisPhrase"
                               placeholder="Highlight any surrounding context"
                               value={el.emphasisPhrase}  //{this.props.paragraph}
                               onChange={(event) => this.handleChange(event, el.noteNumber)}
                             />}

                  <br></br>
                  <input type="checkbox"
                         id="closed"
                         checked={el.closed}
                         onChange={(event) => this.handleChange(event, el.noteNumber)}></input>
                  {el.closed &&
                    <textarea
                      type="text"
                      id="hint"
                      placeholder="Hint for Cloze"
                      value={el.hint}  //{this.props.paragraph}
                      onChange={(event) => this.handleChange(event, el.noteNumber)}
                    />}


                  </li>
        })
      }
      </ul>
      <button
        id="addNote"
        value="Add Note"
        onClick={this.addNote}>Add Note</button>
      </div>
    );
  }
}

const CardNotes = connect(mapStateToProps,mapDispatchToProps)(NoteDisplay);

export default CardNotes;
