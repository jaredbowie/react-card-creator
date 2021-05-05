import { ADD_ARTICLE } from "../constants/action-types";
import { ADD_CARD } from "../constants/action-types";
import { EDIT_PARAGRAPH } from "../constants/action-types";
import { DELETE_CARD } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";


const initialState = {
  stateTest: "hey this is a test",
  articles:[],
  currentCardNumber: 0,
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
};

function rootReducer(state = initialState, action) {
  
  if (action.type === EDIT_PARAGRAPH) {
    //console.log("Edit_Paragraph");
    //console.log(action.payload);
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
    return Object.assign({}, state, {cards: newCards});
  }



/*
  /// filter out the card we want to edit
  // edit it
  // filter the deck without the card
  // add card to new deck
  // return
  if (action.type === EDIT_PARAGRAPH) {
    const currentCardNumber=state.currentCardNumber;
    let otherCards = [];
    let currentCard = null;
    let i=0;
    for (i = 0; i < state.cards.length; i++) {
      if (state.cards[i].cardNumber == currentCardNumber) {
        currentCard = state.cards[i]
      }
      else {
        otherCards.push(state.cards[i])
      }
    }
    currentCard.paragraph = action.payload;
    console.log(currentCard);
    //console.log("current card");
    //console.log(currentCard);
    //console.log("other cards");
    //console.log(otherCards);
    return Object.assign({}, state, {
      cards: otherCards.concat(currentCard)
    });

*/
if (action.type === CHANGE_CARD_NUMBER) {
  console.log("chang card number reducers index ");
  console.log(action.payload);
  return Object.assign({}, state, action.payload);
}
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
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
  if (action.type === ADD_NOTE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === EDIT_NOTE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
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
