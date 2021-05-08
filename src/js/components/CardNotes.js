// src/js/components/CardNotes.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote, updateCurrentNotePhrase, addNote } from "../actions/index";

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
    updateCurrentNotePhrase: newNotePhrase => dispatch(updateCurrentNotePhrase(newNotePhrase)),
    addNote: nothing => dispatch(addNote(nothing))
    //ADD_NOTE
    //DELETE_NOTE
  };
}

class NoteDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  addNote(event) {
    this.props.addNote(true);
  }

  updateCurrentNote(noteNumber, wordPhrase) {
    this.props.updateCurrentNotePhrase({currentNotePhrase: wordPhrase});
  }

  handleChange(event, noteNumber) {
    let newNotes = this.props.notes.map(singleNote => {
           //console.log(singleCard);
          if (singleNote.noteNumber === noteNumber) {
             return Object.assign({}, singleNote, {[event.target.id] :  event.target.value} )
           }
          else {
            return singleNote;
          }});
    //console.log("newNotes");
    //console.log(newNotes);
    //take the edit and create a new array of notes with the update
    // then send the new note array and the edit note can find the current card number and insert it there
    if (event.target.id==="wordPhrase") {
          this.updateCurrentNote(noteNumber, event.target.value);
    }

    this.props.editNote({newNotes: newNotes,
                        currentNoteNumber: noteNumber});

    //this.setState({ paragraph: "" });
  }

  render() {
    //const { paragraph } = this.state;
    // const paragraph = this.state.paragraph
    return (
      <div>
      currentNotePhrase = {this.props.currentNotePhrase}
      <ul>
        {
          this.props.notes.map(el => {
          const currentKey="noteNumber" + el.noteNumber;
          return <li key={currentKey} id={currentKey} class="cardParagraph" onClick={() => this.updateCurrentNote(el.noteNumber, el.wordPhrase)}>
                  <textarea
                    type="text"
                    id="wordPhrase"
                    value={el.wordPhrase}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <textarea
                    type="text"
                    id="reading"
                    value={el.reading}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <textarea
                    type="text"
                    id="definition"
                    value={el.definition}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <textarea
                    type="text"
                    id="emphasisPhrase"
                    value={el.emphasisPhrase}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />
                  <textarea
                    type="text"
                    id="hint"
                    value={el.hint}  //{this.props.paragraph}
                    onChange={(event) => this.handleChange(event, el.noteNumber)}
                  />

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
