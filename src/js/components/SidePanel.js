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
  return {
    changeCardNumber: currentCardNumber => dispatch(changeCardNumber(currentCardNumber))
  };
}
/*
function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps");
  console.log(dispatch);
  return {
    changeCardNumber: currentCardNumber => dispatch(changeCardNumber(currentCardNumber))
  };
}
*/





class CardList extends Component {
    constructor(props) {
      super(props);
    //  console.log("props state cardlist sidepanel.js");
    //  console.log(props);
      this.state = {
        //currentCardNumber:  props.currentCardNumber,
        //cards: props.cards,
        sidePanelWidth: {width: "0px"}
       };
      this.handleClick = this.handleClick.bind(this);
      this.handleCloseNav = this.handleCloseNav.bind(this);
      this.handleOpenNav = this.handleOpenNav.bind(this);
    }

    handleCloseNav() {
      console.log("handle close");
      this.setState({sidePanelWidth: {width: "0px"}});
      //document.getElementById("mySidepanel").style.width = "0";
    }

    handleOpenNav() {
      console.log("handle open");
      this.setState({sidePanelWidth: {width: "250px"}});
      //document.getElementById("mySidepanel").style.width = "250px";
    }

    handleClick(cardNumber) {
    //  console.log(cardNumber);
      this.setState({currendCardNumber: cardNumber});
      console.log("handleclick in sidepanel.js");
      //this.props.changeCardNumber({currentCardNumber: cardNumber});
      this.props.changeCardNumber({currentCardNumber: cardNumber});
      //dispatch(changeCardNumber(currentCardNumber));
      //this.props.editCard({paragraph: localParagraph});
    }


  render() {
    return (
    <p>
    <div id="mySidepanel" className="sidepanel" style={this.state.sidePanelWidth}>
    <a href="javascript:void(0)" className="closebtn" onClick={this.handleCloseNav}>&times;</a>
    <ul>
      {
        this.props.cards.map(el => {
        const currentKey="cardNumber" + el.cardNumber;
        return <li key={currentKey} id={currentKey} class="cardParagraph" onClick={() => this.handleClick(el.cardNumber)}>#{el.cardNumber}:  {el.paragraph}</li>
      })
    }
    </ul>
    </div>
       <button class="openbtn" onClick={this.handleOpenNav}>&#9776;</button>
  </p>
)
  }

}

  const SidePanel = connect(mapStateToProps, mapDispatchToProps)(CardList);

  export default SidePanel;



  /*

  <p>
  <div id="mySidepanel" class="sidepanel">
  <a href="javascript:void(0)" class="closebtn" onClick={handleCloseNav}>&times;</a>
  <ul>
    {
      theState.cards.map(el => {
      const currentKey="cardNumber" + el.cardNumber;
      return <li key={currentKey} id={currentKey} class="cardParagraph" onClick={() => handleClick(el.cardNumber)}>hey {el.cardNumber} ... {el.paragraph}</li>
    })
  }
  </ul>
  </div>
     <button class="openbtn" onClick={handleOpenNav}>&#9776; Toggle Sidepanel</button>
     <h2>Collapsed Sidepanel</h2>
     <p>Content...</p>
</p>
*/
