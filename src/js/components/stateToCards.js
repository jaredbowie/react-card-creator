function cardMapToString(cardMaps) {
  var cardString="";
  for (var i in cardMaps) {
    cardString=cardString + cardMaps[i].paragraph + "\t" + cardMaps[i].noteAnswer + "\t" + cardMaps[i].audio + "\n";
  }
  return cardString;
}

function addEmphasis(currentParagraph, oneNote) {
  var noteEmphasisRegex = new RegExp("(" + oneNote.emphasisPhrase + ")");
  var arrayOfStringsEmphasis = [];
  if (oneNote.emphasisPhrase !== "") {
    arrayOfStringsEmphasis = currentParagraph.split(noteEmphasisRegex);
  } else {
      arrayOfStringsEmphasis.push(currentParagraph);
  }
  var stringsColoredEmp = []
  for (var index in arrayOfStringsEmphasis) {
    if (oneNote.emphasis && arrayOfStringsEmphasis[index]===oneNote.emphasisPhrase) {
      stringsColoredEmp.push({type: "emphasis",
                              text: arrayOfStringsEmphasis[index]})
    }
    else {
      stringsColoredEmp.push({type: "normal",
                              text: arrayOfStringsEmphasis[index]})
    }
  }
  return stringsColoredEmp
}

function addNoteHighlight(stringsColoredEmp, oneNote){
  var currentPhraseRegex = new RegExp("(" + oneNote.wordPhrase + ")");
  var arrayOfStringCurrentPhrase = [];
  for (var indexStrEmp in stringsColoredEmp) {
    var splitForPhrase=[];
    splitForPhrase = stringsColoredEmp[indexStrEmp].text.split(currentPhraseRegex);
    for (var indexSecond in splitForPhrase) {
      if (splitForPhrase[indexSecond] === oneNote.wordPhrase) {
        if (oneNote.closed) {
          arrayOfStringCurrentPhrase.push({type: "wordPhrase",
                                         text: "(" + oneNote.hint + ") "})
        }
        else {
          arrayOfStringCurrentPhrase.push({type: "wordPhrase",
                                         text: splitForPhrase[indexSecond]})
                                       }
      }
      else {
        arrayOfStringCurrentPhrase.push({type: stringsColoredEmp[indexStrEmp].type,
                                         text: splitForPhrase[indexSecond]})
      }
    }
  }
  return arrayOfStringCurrentPhrase
}

function makeExpPara(oneCard, oneNote) {
  /// requirements for a card are having a paragraph, having wordPhrase and having a Definition
  if (oneCard.paragraph === ''  ||
     oneNote.wordPhrase === '' ||
     oneNote.definition === '') {
       return false
     }
  var paragraphMinusNL=oneCard.paragraph.replace(/(?:\r\n|\r|\n)/g, '<br>');
  var paragraphMinusTab=paragraphMinusNL.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  /// first do emphasis
  var currentParagraph = paragraphMinusTab;
  //console.log("currentparagraph");
  //console.log(currentParagraph);

  var stringsColoredEmp = addEmphasis(currentParagraph, oneNote);

///////// next do wordPhrase  and close

  var arrayOfStringCurrentPhrase = addNoteHighlight(stringsColoredEmp, oneNote);



/////////////////// next write these out using html tags

var oneNoteString = arrayOfStringCurrentPhrase.map((oneStringMap, index) => {
  switch (oneStringMap.type) {
    case "wordPhrase":
     return "<font color=" + oneCard.fontColor + ">" + oneStringMap.text + "</font>"
   case "emphasis":
   return "<font color=" + oneCard.emphasisColor + ">" + oneStringMap.text + "</font>"
   default:
   return oneStringMap.text
 }})

  return oneNoteString.join("")

}

function makeReading(reading) {
  if (reading==="") {
    return reading
  }
  else {
    return "(" + reading + ")"
  }
}

function makeAudio(audio) {
  if (audio==="[sound:a.mp3]") {
    return ""
  }
  else {
    return audio
  }
}

function makeRestOfCard(card, notes, exportParagraph) {
  var wordPhrase=notes.wordPhrase;
  var reading=makeReading(notes.reading);
  var definition=notes.definition;
  var audio=makeAudio(card.audioPath);
  var noteAnswer=wordPhrase + reading + "=" + definition;
  var fontColor = card.fontColor
  var restOfCard={paragraph: exportParagraph, noteAnswer: noteAnswer, audio: audio, fontColor: fontColor};
  return restOfCard
}

export const stateToCards = (currentState) => {
  var newCards = [];
  var cardsForExport=[];
  //for each card
  for (var i in currentState.cards) {
    var cardsForExportOneCard=[];
    /// for each note in one card
    for (var ni in currentState.cards[i].notes) {
      var exportParagraph = makeExpPara(currentState.cards[i], currentState.cards[i].notes[ni]);
      if (!exportParagraph) {
        return "Failed on card " + i
      }
      var restOfCard=makeRestOfCard(currentState.cards[i],currentState.cards[i].notes[ni], exportParagraph)


      cardsForExportOneCard.push(restOfCard);
    }
  //  console.log("cardsForExportOneCard");
//    console.log(JSON.stringify(cardsForExportOneCard));
    ///theory is there is something weird happening with overwriting the key value
    var newCardsCombNotes = [];
    for (var xi in cardsForExportOneCard) {
      var compiledNotes = new Array();
      //compiledNotes.length=0;
      //console.log("compilednotes beginning");
      //console.log(compiledNotes[0]);
      var thisCardsNote = cardsForExportOneCard[xi].noteAnswer; //var noteAnswer=wordPhrase + reading + "=" + definition;
      //console.log("thisCardsNote");
      //console.log(JSON.stringify(thisCardsNote));

      //for each

      for (var zi in cardsForExportOneCard) {
        //console.log("cardsForExportOneCard[zi]");
        //console.log(cardsForExportOneCard[zi]);
        if (cardsForExportOneCard[zi].noteAnswer === thisCardsNote) {
        //  console.log("hit cardsForExportOneCard[zi].noteAnswer === thisCardsNote")
          var madeBlue = "<div><font color=" + cardsForExportOneCard[zi].fontColor + ">" + cardsForExportOneCard[zi].noteAnswer + "</font></div>";
          compiledNotes.unshift(madeBlue);
        }
        else {
          compiledNotes.push("<div>" + cardsForExportOneCard[zi].noteAnswer + "</div>");
        }
      }
      newCards.push({paragraph: cardsForExportOneCard[xi].paragraph,
        noteAnswer: compiledNotes.join(""),
        audio: cardsForExportOneCard[xi].audio,
        fontColor: cardsForExportOneCard[xi].fontColor})
    }
  }
  console.log("cardsForExport")
  console.log(newCards.flat());
  var cardString=cardMapToString(newCards.flat());
  return [cardString];
}
