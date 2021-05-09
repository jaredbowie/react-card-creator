// src/js/actions/index.js

import { EDIT_PARAGRAPH } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { UPDATE_CURRENT_NOTE_PHRASE } from "../constants/action-types";
import { RESET_STATE } from "../constants/action-types";


export function deleteNote(payload) {
  return { type: DELETE_NOTE, payload }
};

export function addNote(payload) {
  return { type: ADD_NOTE, payload }
};

export function resetState(payload) {
  return { type: RESET_STATE, payload }
};

export function editParagraph(payload) {
  //console.log("action index editparagraph");
  //console.log(payload);
  return { type: EDIT_PARAGRAPH, payload };
}

export function changeCardNumber(payload) {
  //console.log("action index changcardnumber");
  //console.log(payload);
  return { type: CHANGE_CARD_NUMBER, payload };
}

export function editNote(payload) {
  //console.log("action index editparagraph");
  //console.log(payload);
  return { type: EDIT_NOTE, payload };
}

export function updateCurrentNotePhrase(payload) {
  //console.log("action index editparagraph");
  //console.log(payload);
  return { type: UPDATE_CURRENT_NOTE_PHRASE, payload };
}
