import React from 'react';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { cards: state.cards };
};


  const ConnectedList = ({ cards }) => (
    <ul>
      {
        cards.map(el => {
        const currentKey="cardNumber" + el.cardNumber;
        console.log(currentKey);
        return <li key={currentKey} id={currentKey} class="cardParagraph">hey {el.cardNumber} ... {el.paragraph}</li>
      })
    }
    </ul>
  );

  const DisplayParagraph = connect(mapStateToProps)(ConnectedList);

  export default DisplayParagraph;
