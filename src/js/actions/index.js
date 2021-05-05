// src/js/actions/index.js

//import { ADD_ARTICLE } from "../constants/action-types";
import { EDIT_PARAGRAPH } from "../constants/action-types";
import { CHANGE_CARD_NUMBER } from "../constants/action-types";


export function editCard(payload) {
  return { type: EDIT_PARAGRAPH, payload };
}

export function changeCardNumber(payload) {
  console.log("changecardnumber actions index");
  return { type: CHANGE_CARD_NUMBER, payload };
}
