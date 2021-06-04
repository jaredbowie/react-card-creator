import { ADD_CARD } from "../constants/action-types";
import { EDIT_PARAGRAPH } from "../constants/action-types";
import { DELETE_CARD } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";
import { CHANGE_NOTE_NUMBER } from "../constants/action-types";
import { UPDATE_DECK_ELEMENTS } from "../constants/action-types";
import { RESET_STATE } from "../constants/action-types";
import { UPDATE_AUDIO } from "../constants/action-types";

const defaultState = {
  sidePanelWidth: {width: "0px"},
  showReading: false,
  showAudio: false,
  showFontColor: false,
  showEmphasisColor: false,
  edit: true,
  currentCardNumber: 0,
  currentNoteNumber: 0,
  cardIterate: 0,
  cards: [{cardNumber: 0,
           fontColor: "#0000ff",
           emphasisColor: "#008000",
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

/*const testState = {
 edit: false,
 currentNoteEmphasisPhrase: "cuando podamos",
 currentNoteClosed: false,
 currentNoteEmphasis: false,
 currentNoteHint: "when we can",
 currentNotePhrase: "when we can",
 currentCardNumber: 0,
 currentNoteNumber: 0,
 cardIterate: 0,
 cards: [{cardNumber: 0,
          fontColor: "#0000ff",
          emphasisColor: "#008000",
          paragraph:  "Necesitamos ayudar a otras personas cuando podamos.",
          audioPath: "[sound:a.mp3]",
          noteIterate: 0,
          notes:  [
            {noteNumber: 0,
            wordPhrase: "cuando podamos",
            reading: "",
            definition: "when we can",
            emphasis: false,
            emphasisPhrase: "",
            closed: true,
            hint:  "when we can"},
          {noteNumber: 1,
            wordPhrase: "Necesitamos ayudar",
            reading: "",
            definition: "we need help",
            emphasis: false,
            emphasisPhrase: "",
            closed: false,
            hint:  "when we can"}]},
      {cardNumber: 1,
       fontColor: "#0000ff",
       emphasisColor: "#008000",
       paragraph:  "Mientras Germán se va alejando de Colombia, con todo e isla, escucha por las tardes en su vieja grabadora a Beethoven y lee las montañas de diario que recoge en Saravena. A la gente no le preocupa irse para el otro lado, pues nunca uno será venezolano , dice, pese a que de allí reciben la gasolina más barata y la televisión.",
       audioPath: "[sound:a.mp3]",
       noteIterate: 0,
       notes:  [
         {noteNumber: 0,
         wordPhrase: "se va alejando de Colombia",
         reading: "",
         definition: "go far away",
         emphasis: false,
         emphasisPhrase: "",
         closed: false,
         hint:  ""},
       {noteNumber: 1,
         wordPhrase: "vieja",
         reading: "",
         definition: "old",
         emphasis: true,
         emphasisPhrase: "grabadora",
         closed: true,
         hint:  "old"}]}]};
*/
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
   emphasisColor: "#008000",
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
//////////////////////
//////////////////////


function rootReducer(state = setInitialState(), action) {


// gets {currentNoteNumber: noteNumber,
//              currentNotePhrase: wordPhrase,
//              emphasis: emphasis,
//              emphasisPhrase: emphasisPhrase,
//              closed: closed}
  if (action.type === CHANGE_NOTE_NUMBER) {
//    const newCardsNoteNumber = updateCurrentCard(state, action.payload)
    const newState = Object.assign({}, state, action.payload);
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === UPDATE_AUDIO) {
    let newCardsAudio = updateCurrentCard(state, action.payload)
    const newState= Object.assign({}, state, {cards: newCardsAudio})
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === RESET_STATE) {
    const newState=defaultState;
    saveStateToLocalStorage(newState);
    return newState;
  }


// will takes the notes provided and replace them in the state
// expects a map of {notes: newNotesArray}
  if (action.type === EDIT_NOTE) {
    let newCardsEditNote= addNotesToCurrentCard(state, action.payload.notes);
    const newState= Object.assign({}, state, {cards: newCardsEditNote})
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === EDIT_PARAGRAPH) {
    let newCardsEditParagraph=[];
     newCardsEditParagraph = state.cards.map(singleCard => {
      if (singleCard.cardNumber === state.currentCardNumber) {
         return Object.assign({}, singleCard, action.payload )
       }
      else {
        return singleCard;
      }});
    const newState=Object.assign({}, state, {cards: newCardsEditParagraph});
    saveStateToLocalStorage(newState);
    return newState;
  }

if (action.type === CHANGE_CARD_NUMBER) {
  let stateWithCard=Object.fromEntries(Object.entries(state).map(([ key, val ]) => [ key, val ]));
  const newState = Object.assign({}, stateWithCard, action.payload);
  saveStateToLocalStorage(newState);
  return newState;
}


/// expect a map of items in the outter most layer (the deck)
if (action.type === UPDATE_DECK_ELEMENTS) {
     const newState = Object.assign({}, state, action.payload);
     saveStateToLocalStorage(newState);
     return newState;
}


  if (action.type === ADD_CARD) {
    let newCardIterate = state.cardIterate + 1;
    let oneNewCard = Object.assign({}, emptyCard, {cardNumber: newCardIterate});
    const newCardsAddCard = state.cards.concat(oneNewCard);
    const newState=Object.assign({}, state, {edit: true,
                                             currentCardNumber: newCardIterate,
                                             cards: newCardsAddCard,
                                             cardIterate: newCardIterate  });
    console.log("newState.edit")                                             

     console.log(newState.edit)
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === DELETE_CARD) {
    let newCardsDeleteCard = state.cards.filter(oneCard => {
      if (oneCard.cardNumber === state.currentCardNumber) { return null}
      else return oneCard
    })
    if (typeof newCardsDeleteCard[0] !== "undefined" && typeof newCardsDeleteCard[0].cardNumber === "number") {
          var newCurrentCardNumber = newCardsDeleteCard[0].cardNumber
    }
    else {var newCurrentCardNumber = 0}

    const newState=Object.assign({}, state, {cards: newCardsDeleteCard,
                                            currentCardNumber: newCurrentCardNumber});
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

    let newCardsAddNote= updateCurrentCard(state, {noteIterate: newNoteIterate,
                                                     notes: newNotes});
    const newState=Object.assign({}, state, {currentNoteNumber: newNoteIterate,
                                             cards: newCardsAddNote});
    saveStateToLocalStorage(newState);
    return newState;
    };

///gets  {noteNumber: noteNumber, currentNotes: this.props.notes}
  if (action.type === DELETE_NOTE) {
    let newNotes = action.payload.currentNotes.filter(oneNote => {
      if (oneNote.noteNumber === action.payload.noteNumber) { return null}
      else return oneNote
    })
    let newCardsDeleteNote= updateCurrentCard(state, {notes: newNotes});
    const newState=Object.assign({}, state, {cards: newCardsDeleteNote});
    saveStateToLocalStorage(newState);
    return newState;
  }
  return state;
}

export default rootReducer;
