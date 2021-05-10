import { ADD_ARTICLE } from "../constants/action-types";
import { ADD_CARD } from "../constants/action-types";
import { EDIT_PARAGRAPH } from "../constants/action-types";
import { DELETE_CARD } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";
import { UPDATE_CURRENT_NOTE_INFO } from "../constants/action-types";
import { RESET_STATE } from "../constants/action-types";

const initialState = {
  currentNotePhrase: "test",
  paragraph: "default paragraph",
  stateTest: "hey this is a test",
  articles:[],
  currentCardNumber: 0,
  cards: [{cardNumber: 0,
           fontColor: "#0000ff",
           paragraph:  "paragraph test from card 0 ",
           audioPath: "[sound:a.mp3]",
           notes:  [{noteNumber: 0,
                       wordPhrase: "card 0 note 0 word or phrase",
                       reading: "card 0 note 0  how to read the word",
                       definition: "card 0 note 0  definition",
                       emphasisPhrase: "",
                       hint:  "card 0 note 0  any hint"},
                      {noteNumber: 1,
                       wordPhrase: "card 0 note 1 second phrase",
                       reading: "card 0 note 1 second reading",
                       definition: "card 0 note 1 second definition",
                       emphasisPhrase: "",
                       hint:  "card 0 note 1 second hint"}
                     ]},
         {cardNumber: 1,
          fontColor: "#0000ff",
          paragraph:  "paragraph from card 1",
          audioPath: "[sound:a.mp3]",
          notes:  [{noteNumber: 0,
                      wordPhrase: "card 1 note 0 word or phrase",
                      reading: "card 1 note 0  how to read the word",
                      definition: "card 1 note 0 definition",
                      emphasisPhrase: "",
                      hint:  "card 1 note 0 any hint"},
                     {noteNumber: 1,
                      wordPhrase: "card 1 note 1 second phrase",
                      reading: "card 1 note 1 second reading",
                      definition: "card 1 note 1 second definition",
                      emphasisPhrase: "",
                      hint:  "card 1 note 1 second hint"}]
                    }]
};

const defaultState = {
  currentNoteEmphasis: "",
  currentNotePhrase: "",
  paragraph: "",
  stateTest: "",
  currentCardNumber: 0,
  cardIterate: 0,
  cards: [{cardNumber: 0,
           fontColor: "#0000ff",
           paragraph:  "",
           audioPath: "[sound:a.mp3]",
           noteIterate: 0,
           notes:  [{noteNumber: 0,
                       wordPhrase: "",
                       reading: "",
                       definition: "",
                       emphasis: false,
                       emphasisPhrase: "",
                       closed: false,
                       hint:  ""}]}]};

const emptyNote = {noteNumber: 0,
            wordPhrase: "",
            reading: "",
            definition: "",
            emphasis: false,
            emphasisPhrase: "",
            closed: false,
            hint:  ""}

const emptyCard = {
  cardNumber: 0,
   fontColor: "#0000ff",
   paragraph:  "",
   audioPath: "[sound:a.mp3]",
   noteIterate: 0,
   notes:  [{noteNumber: 0,
               wordPhrase: "",
               reading: "",
               definition: "",
               emphasis: false,
               emphasisPhrase: "",
               closed: false,
               hint:  ""}]}

// this will be executed on first load
function fetchStateFromLocalStorage() {
  const state=JSON.parse(window.localStorage.getItem('state'));
  return state
}

function setInitialState() {
  if (JSON.parse(window.localStorage.getItem('state')) !== null) {
    return fetchStateFromLocalStorage()
  }
  else {
    return defaultState
  }
}

// this will be executed with every update
function saveStateToLocalStorage(state) {
  window.localStorage.setItem('state', JSON.stringify(state));
  return true
}

function resetState(){
  return
}

/////////////////////////////////////////////////////////

    // takes an array of notes
function addNotesToCurrentCard(state, newNotes) {
  let newCards=[];
   newCards = state.cards.map(singleCard => {
    if (singleCard.cardNumber === state.currentCardNumber) {
       return Object.assign({}, singleCard, {notes: newNotes})}
    else { return singleCard;}});
    return newCards
}

// the update should be a json object ex {paragraph: "cat"}
function updateCurrentCard(state, theUpdate) {
  let newCards=[];
   newCards = state.cards.map(singleCard => {
    if (singleCard.cardNumber === state.currentCardNumber) {
       return Object.assign({}, singleCard, theUpdate)}
    else { return singleCard;}});
    return newCards
}

// add updated card to cards in state
//////////////////////////////////////////



function rootReducer(state = setInitialState(), action) {


  if (action.type === RESET_STATE) {
    const newState=defaultState;
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === EDIT_NOTE) {
    console.log("edit note");
    const newCards= addNotesToCurrentCard(state, action.payload.newNotes);
    const newState= Object.assign({}, state, {cards: newCards})
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === EDIT_PARAGRAPH) {
    let newCards=[];
     newCards = state.cards.map(singleCard => {
      if (singleCard.cardNumber === state.currentCardNumber) {
         return Object.assign({}, singleCard, action.payload )
       }
      else {
        return singleCard;
      }});
    const newState=Object.assign({}, state, {cards: newCards});
    saveStateToLocalStorage(newState);
    return newState;
  }

if (action.type === CHANGE_CARD_NUMBER) {
  let stateWithCard=Object.fromEntries(Object.entries(state).map(([ key, val ]) => [ key, val ]));
  const newState = Object.assign({}, stateWithCard, action.payload);
  saveStateToLocalStorage(newState);
  return newState;
}

if (action.type === UPDATE_CURRENT_NOTE_INFO) {
     const newState = Object.assign({}, state, action.payload);
     saveStateToLocalStorage(newState);
     return newState;
}


  if (action.type === ADD_CARD) {
    let newCardIterate = state.cardIterate + 1;
    let oneNewCard = Object.assign({}, emptyCard, {cardNumber: newCardIterate});
    const newCards = state.cards.concat(oneNewCard);
    const newState=Object.assign({}, state, {currentCardNumber: newCardIterate,
                                             cards: newCards,
                                             cardIterate: newCardIterate  });
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === DELETE_CARD) {
    let newCards = state.cards.filter(oneCard => {
      if (oneCard.cardNumber === state.currentCardNumber) {}
      else return oneCard
    })
    const newState=Object.assign({}, state, {cards: newCards});
    saveStateToLocalStorage(newState);
    return newState;
  }


  if (action.type === ADD_NOTE) {
    let newNoteIterate = action.payload.currentCard.noteIterate + 1;
    let oneNewNote = Object.assign({}, emptyNote, {noteNumber: newNoteIterate});
    let newNotes = action.payload.currentNotes.concat(oneNewNote)
    //const currentCard = action.payload.currentCard;
    //const newCurrentCard = Object.assign({}, currentCard, {noteIterate: newNoteIterate,
    //                                                        notes: newNotes});

    let newCards= updateCurrentCard(state, {noteIterate: newNoteIterate,
                                                     notes: newNotes});
    const newState=Object.assign({}, state, {cards: newCards});
    saveStateToLocalStorage(newState);
    return newState;
    };

///gets  {noteNumber: noteNumber, currentNotes: this.props.notes}
  if (action.type === DELETE_NOTE) {
    let newNotes = action.payload.currentNotes.filter(oneNote => {
      if (oneNote.noteNumber === action.payload.noteNumber) {}
      else return oneNote
    })
    let newCards= updateCurrentCard(state, {notes: newNotes});
    const newState=Object.assign({}, state, {cards: newCards});
    saveStateToLocalStorage(newState);
    return newState;
  }
  return state;
}

export default rootReducer;
