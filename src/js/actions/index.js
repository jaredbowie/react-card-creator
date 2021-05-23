// src/js/actions/index.js

import { EDIT_PARAGRAPH } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";
import { CHANGE_NOTE_NUMBER } from "../constants/action-types";
import { EDIT_NOTE } from "../constants/action-types";
import { ADD_NOTE } from "../constants/action-types";
import { DELETE_NOTE } from "../constants/action-types";
import { ADD_CARD } from "../constants/action-types";
import { DELETE_CARD } from "../constants/action-types";
import { UPDATE_DECK_ELEMENTS } from "../constants/action-types";
import { RESET_STATE } from "../constants/action-types";
import { SWITCH_EDIT } from "../constants/action-types";
import { UPDATE_AUDIO } from "../constants/action-types";

export function switchEdit(payload) {
  return { type: SWITCH_EDIT, payload }
};

export function updateAudio(payload) {
  return { type: UPDATE_AUDIO, payload }
};

export function deleteNote(payload) {
  return { type: DELETE_NOTE, payload }
};

export function addNote(payload) {
  return { type: ADD_NOTE, payload }
};

export function deleteCard(payload) {
  return { type: DELETE_CARD, payload }
};

export function addCard(payload) {
  return { type: ADD_CARD, payload }
};

export function resetState(payload) {
  return { type: RESET_STATE, payload }
};

export function editParagraph(payload) {
  return { type: EDIT_PARAGRAPH, payload };
}

export function changeCardNumber(payload) {
  return { type: CHANGE_CARD_NUMBER, payload };
}
export function changeNoteNumber(payload) {
  return { type: CHANGE_NOTE_NUMBER, payload };
}

export function editNote(payload) {
return { type: EDIT_NOTE, payload };
}

export function updateDeckElements(payload) {
return { type: UPDATE_DECK_ELEMENTS, payload };
}
