function cardMapToString(cardMaps) {
  var cardString="";
  for (var i in cardMaps) {
    cardString=cardString + cardMaps[i].paragraph + "\t" + cardMaps[i].noteAnswer + "\t" + cardMaps[i].audio + "\n";
  }
  return cardString;
}

function addEmphasis(currentParagraph, oneNote) {
  var currentNoteEmphasisPhrase=oneNote.emphasisPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        //"All of these should be escaped: \\ \^ \$ \* \+ \? \. \( \) \| \{ \} \[ \] "
  var noteEmphasisRegex = new RegExp("(" + currentNoteEmphasisPhrase + ")");
  //this is an array of the paragraph spliit at the emphasis word
  var arrayOfStringsEmphasis = [];
  if (currentNoteEmphasisPhrase !== "") {
    arrayOfStringsEmphasis = currentParagraph.split(noteEmphasisRegex);
  } else {
      arrayOfStringsEmphasis.push(currentParagraph);
  }
  var stringsColoredEmp = []
  for (var index in arrayOfStringsEmphasis) {
    //onenote.emphasis is a boolean
    if (oneNote.emphasis && arrayOfStringsEmphasis[index]===oneNote.emphasisPhrase) {

      stringsColoredEmp.push({type: "emphasis",
                              text: arrayOfStringsEmphasis[index]})
    }
    else {
      stringsColoredEmp.push({type: "normal",
                              text: arrayOfStringsEmphasis[index]})
    }
  }
  //xconsole.log("stringsColoredEmp");
  //console.log(stringsColoredEmp);
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


////
//// makeExpPara
//// format the paragraph so that it has highliights and closes colors etc
//////

function makeExpPara(oneCard, oneNote) {
  /// requirements for a card are having a paragraph, having wordPhrase and having a Definition
  if (oneCard.paragraph === ''  ||
     oneNote.wordPhrase === '' ||
     oneNote.definition === '') {
       return false
     }
  var currentParagraph = cleanText(oneCard.paragraph);
  var stringsColoredEmp = addEmphasis(currentParagraph, oneNote);
///////// next do wordPhrase  and close
  var arrayOfStringCurrentPhrase = addNoteHighlight(stringsColoredEmp, oneNote);
/////////////////// next write these out using html tags
 var oneNoteString = arrayOfStringCurrentPhrase.map((oneStringMap, index) => {
  //words in paragraph highlighting
  switch (oneStringMap.type) {
    case "wordPhrase":
     return "<font color='blue'>" + oneStringMap.text + "</font>"
   case "emphasis":
   return "<font color='green'>" + oneStringMap.text + "</font>"
   default:
   return oneStringMap.text
 }})

  return oneNoteString.join("")
}


//////////
///  makeReading
/// format text for reading of definition
///////////

function makeReading(reading) {
  if (reading==="") {
    return reading
  }
  else {
    return "(" + reading + ")"
  }
}

//////////
///  makeAudio
/// format text for audio of definition
///////////

function makeAudio(audio) {
  if (audio==="[sound:a.mp3]") {
    return ""
  }
  else {
    return audio
  }
}

//////////
///  cleanText
/// escapes all weird characters so they don't mess up anki import and converts them to html
///////////

function cleanText(initialText) {
  var textMinusNL= initialText.replace(/(?:\r\n|\r|\n)/g, '<br>');
  var textMinusTab=textMinusNL.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  var textMinusWhiteSpace=textMinusTab.trim();
  var finalText = textMinusWhiteSpace;
  return finalText
}

function makeRestOfCard(card, notes, exportParagraph) {
  var wordPhrase = cleanText(notes.wordPhrase)
  var closed=notes.closed
  //var reading=cleanText(makeReading(notes.reading));
  var definition=cleanText(notes.definition);
  var audio=cleanText(makeAudio(card.audioPath));
  var noteAnswerWordPhrase=wordPhrase;
  var noteAnswerDefinition=definition;
  var fontColor = cleanText(card.fontColor)
  var restOfCard={paragraph: exportParagraph, noteAnswerWordPhrase: noteAnswerWordPhrase, noteAnswerDefinition: noteAnswerDefinition, audio: audio, fontColor: fontColor, closed: closed};
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
      // make rest of card makes us a map of the card with everything formatted etc
      var restOfCard=makeRestOfCard(currentState.cards[i],currentState.cards[i].notes[ni], exportParagraph)


      cardsForExportOneCard.push(restOfCard);
    }
    //now we have all the cards put into key val pairs

    //for each card in the new cards we just created
    for (var xi in cardsForExportOneCard) {
      var compiledNotes = new Array();
      //compiledNotes.length=0;

      var thisCardsNoteWordPhrase = cardsForExportOneCard[xi].noteAnswerWordPhrase; //  var noteAnswerWordPhrase=wordPhrase + reading + "="; var noteAnswerDefinition=definition;
      //for each card
      //organize the notes and put the current note definitioin on top
      for (var zi in cardsForExportOneCard) {
        if (cardsForExportOneCard[zi].noteAnswerWordPhrase === thisCardsNoteWordPhrase) {

          // if our card is closed we want to blue the first part because that's our real answer
          if (cardsForExportOneCard[zi].closed) {
            var madeBlue = "<div><font color='blue'>" + cardsForExportOneCard[zi].noteAnswerWordPhrase +  "</font>=" + cardsForExportOneCard[zi].noteAnswerDefinition + "</div>";
          }
          else {
            var madeBlue = "<div>" + cardsForExportOneCard[zi].noteAnswerWordPhrase +  "<font color='blue'>=" + cardsForExportOneCard[zi].noteAnswerDefinition + "</font></div>";
          }

          compiledNotes.unshift(madeBlue);
          ///The unshift method inserts the given values to the beginning of an array-like object.
        }
        else {
          compiledNotes.push("<div>" + cardsForExportOneCard[zi].noteAnswerWordPhrase + "=" + cardsForExportOneCard[zi].noteAnswerDefinition + "</div>");
        }
      }
      newCards.push({paragraph: cardsForExportOneCard[xi].paragraph,
        noteAnswer: compiledNotes.join(""),
        audio: cardsForExportOneCard[xi].audio,
        fontColor: cardsForExportOneCard[xi].fontColor})
    }
  }
  var cardString=cardMapToString(newCards.flat());
  return [cardString];
}
