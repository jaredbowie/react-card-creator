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






class CardList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sidePanelWidth: {width: "0px"}
       };
      this.handleClick = this.handleClick.bind(this);
      this.handleCloseNav = this.handleCloseNav.bind(this);
      this.handleOpenNav = this.handleOpenNav.bind(this);
    }

    handleCloseNav() {
      this.setState({sidePanelWidth: {width: "0px"}});
      //document.getElementById("mySidepanel").style.width = "0";
    }

    handleOpenNav() {
      this.setState({sidePanelWidth: {width: "250px"}});
      //document.getElementById("mySidepanel").style.width = "250px";
    }

    handleClick(cardNumber) {
      this.setState({currendCardNumber: cardNumber});
      this.props.changeCardNumber({currentCardNumber: cardNumber});
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
       <button class="openbtn" onClick={this.handleOpenNav}>&#9776; Cards</button>
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
