import React from 'react';
//import Toolbar from './Toolbar';
//import './Editor.css';
/*


                                      */


export default class CardNote extends React.Component {
//  constructor(props) {
//    super(props);
//}

  render() {
    const currentCard=this.props.currentCard;
    console.log(currentCard.notes[0].wordPhrase);
  return (
    <div>
    {currentCard.notes.map((note, index) => (
            <p>
            <textarea>{note.wordPhrase}</textarea>
            <textarea>{note.definition}</textarea>!
            </p>
        ))}


    </div>
  )
 }
}
