import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/SidePanel.css';
import { updateDeckElements } from "../actions/index";



const mapStateToProps = state => {
  var currentCardIndex = state.cards.findIndex(x => x.cardNumber === state.currentCardNumber);
  if (typeof currentCardIndex === 'undefined') {
    var currentCardIndex= 0
  }
  return {
    currentCardIndex: currentCardIndex,
    sidePanelWidth: state.sidePanelWidth,
    cards: state.cards,
    currentCardNumber: state.currentCardNumber,
    edit:  state.edit };
};

function mapDispatchToProps(dispatch) {
  return {
    updateDeckElements: newDeckElements => dispatch(updateDeckElements(newDeckElements))
  };
}






class CardList extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleCloseNav = this.handleCloseNav.bind(this);
      this.handleOpenNav = this.handleOpenNav.bind(this);
    }

    handleCloseNav() {
        this.props.updateDeckElements({sidePanelWidth: {width: "0px"}});
      //document.getElementById("mySidepanel").style.width = "0";
    }

    handleOpenNav() {
        this.props.updateDeckElements({sidePanelWidth: {width: "350px"}});
      //document.getElementById("mySidepanel").style.width = "250px";
    }

    handleClick(cardNumber) {
      this.setState({currendCardNumber: cardNumber});
      this.props.updateDeckElements({currentCardNumber: cardNumber,
                                     edit: false})
    }


  render() {
    return (
    <div className="inSidePanel">
    <div id="mySidepanel" className="sidepanel inSidePanel" style={this.props.sidePanelWidth}>
    <div className="closebtn inSidePanel" onClick={this.handleCloseNav}>&times;</div>
    <ul className="inSidePanel">
      {
        this.props.cards.map((el, cardIndex) => {
        const currentKey="cardNumberSide" + el.cardNumber;
        return <li key={currentKey} id={currentKey} className="cardParagraph inSidePanel" onClick={() => this.handleClick(el.cardNumber)}>#{cardIndex+1}:  {el.paragraph}</li>
      })
    }
    </ul>
    </div>
       <button className="openbtn inSidePanel" onClick={this.handleOpenNav}>&#9776;</button>
  </div>
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
