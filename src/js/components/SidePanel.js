import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/SidePanel.css';
import { changeCardNumber } from "../actions/index";



const mapStateToProps = state => {
  return {
    cards: state.cards,
    currentCardNumber: state.currentCardNumber };
};

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps");
  return {
    changeCardNumber: currentCardNumber => dispatch(changeCardNumber(currentCardNumber))
  };
}

function handleCloseNav() {
  console.log("handle close");
  document.getElementById("mySidepanel").style.width = "0";
}

function handleOpenNav() {
  console.log("handle open");
  document.getElementById("mySidepanel").style.width = "250px";
}



  class CardList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentCardNumber:  this.props.allState.currentCardNumber,
        cards: this.props.allState.cards
       };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(cardNumber) {
    //  console.log(cardNumber);
      console.log("handleclick in sidepanel.js");
      this.props.changeCardNumber({currentCardNumber: cardNumber});
      //this.props.editCard({paragraph: localParagraph});
    }

render(){
  return (
    <p>
    <div id="mySidepanel" class="sidepanel">
    <a href="javascript:void(0)" class="closebtn" onClick={handleCloseNav}>&times;</a>
    <ul>
      {
        this.state.cards.map(el => {
        const currentKey="cardNumber" + el.cardNumber;
        return <li key={currentKey} id={currentKey} class="cardParagraph" onClick={() => this.handleClick(el.cardNumber)}>hey {el.cardNumber} ... {el.paragraph}</li>
      })
    }
    </ul>
    </div>
       <button class="openbtn" onClick={handleOpenNav}>&#9776; Toggle Sidepanel</button>
       <h2>Collapsed Sidepanel</h2>
       <p>Content...</p>
  </p>
  );
}
}

  const SidePanel = connect(mapStateToProps, mapDispatchToProps)(CardList);

  export default SidePanel;
