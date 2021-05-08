import { ADD_ARTICLE } from "../constants/action-types";
import { ADD_CARD } from "../constants/action-types";
import { EDIT_PARAGRAPH } from "../constants/action-types";
import { DELETE_CARD } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";
import { UPDATE_CURRENT_NOTE_PHRASE } from "../constants/action-types";


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
  currentNotePhrase: "",
  paragraph: "",
  stateTest: "",
  currentCardNumber: 0,
  cards: [{cardNumber: 0,
           fontColor: "#0000ff",
           paragraph:  "",
           audioPath: "[sound:a.mp3]",
           notes:  [{noteNumber: 0,
                       wordPhrase: "",
                       reading: "",
                       definition: "",
                       emphasisPhrase: "",
                       hint:  ""}]}]};

const emptyNote = {
  noteNumber: 0,
  wordPhrase: "",
  reading: "",
  definition: "",
  emphasisPhrase: "",
  hint:  ""}


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

    // takes a note object
function addNotesToCurrentCard(state, newNotes) {
  let newCards=[];
   newCards = state.cards.map(singleCard => {
    if (singleCard.cardNumber === state.currentCardNumber) {
       return Object.assign({}, singleCard, {notes: newNotes})}
    else { return singleCard;}});
    return newCards
}

function rootReducer(state = setInitialState(), action) {

  if (action.type === EDIT_NOTE) {
    //console.log(action.payload.newNotes);
    const newCards= addNotesToCurrentCard(state, action.payload.newNotes);
    const newState= Object.assign({}, state, {cards: newCards})
    saveStateToLocalStorage(newState);
    return newState;
  }

  if (action.type === EDIT_PARAGRAPH) {
    //console.log("reducers index edit paragraph");
    let newCards=[];
     newCards = state.cards.map(singleCard => {
       //console.log(singleCard);
      if (singleCard.cardNumber === state.currentCardNumber) {
         return Object.assign({}, singleCard, action.payload )
       }
      else {
        return singleCard;
      }});
      //console.log(Object.assign({}, state, {cards: newCards}));
    const newState=Object.assign({}, state, {cards: newCards});
    saveStateToLocalStorage(newState);
    return newState;
  }

if (action.type === CHANGE_CARD_NUMBER) {
  console.log("reducers index chang card number");
//  console.log(action.payload);
  let stateWithCard=Object.fromEntries(Object.entries(state).map(([ key, val ]) => [ key, val ]));
  const newState = Object.assign({}, stateWithCard, action.payload);
  saveStateToLocalStorage(newState);
  return newState;
}

if (action.type === UPDATE_CURRENT_NOTE_PHRASE) {
     const newState = Object.assign({}, state, action.payload);
     saveStateToLocalStorage(newState);
     return newState;
}


  if (action.type === ADD_CARD) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === DELETE_CARD) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  /*
  if (action.type === EDIT_NOTE) {
    const newCards= addNotesToCurrentCard(state, action.payload.newNotes);
    const newState= Object.assign({}, state, {cards: newCards})
    saveStateToLocalStorage(newState);
    return newState;
  }
  */

  if (action.type === ADD_NOTE) {
    // takes a note object
    const newCards= addNotesToCurrentCard(state, emptyNote);
    const newState= Object.assign({}, state, {cards: newCards})
    saveStateToLocalStorage(newState);
    return newState;
    };


  if (action.type === DELETE_NOTE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;



/*
{"currentCardNumber": 0,
               "cards": [{"cardNumber": 0,
                          "fontColor": "#0000ff",
                          "paragraph":  "Some Text from card 0",
                          "audio-path": "[sound:a.mp3]",
                          "notes":  [{"noteId": 0,
                                      "wordPhrase": "word or phrase",
                                      "reading": "how to read the word",
                                      "definition": "definition",
                                      "hint":  "any hint"},
                                     {"noteId": 1,
                                      "wordPhrase": "second phrase",
                                      "reading": "second reading",
                                      "definition": "second definition",
                                      "hint":  "second hint"}
                                    ]},
                        {"cardNumber": 1,
                                   "fontColor": "#0000ff",
                                   "paragraph":  "Some Text Card from card 1",
                                   "audio-path": "[sound:a.mp3]",
                                   "notes":  [{"noteId": 0,
                                               "wordPhrase": "word or phrase",
                                               "reading": "how to read the word",
                                               "definition": "definition",
                                               "hint":  "any hint"},
                                              {"noteId": 1,
                                               "wordPhrase": "second phrase",
                                               "reading": "second reading",
                                               "definition": "second definition",
                                               "hint":  "second hint"}
                                                         ]}]}
                                                         */
