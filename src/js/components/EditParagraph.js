import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    editCard: card => dispatch(editCard(card))
  };
}

function getCurrentCard(state) {
  for(var i=0; i<state.cards.length; i++) {
         if(state.cards[i].cardNumber===state.currentCardNumber) {
           return state.cards[i]
       }
     }
   }

class ConnectedParagraph extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props.allState.currentCardNumber);
    this.state = {
      currentCard:  getCurrentCard(this.props.allState),
      localParagraph: ""
     };
    this.state.localParagraph=this.state.currentCard.paragraph;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const localParagraph = this.state.localParagraph;
    this.props.editCard({paragraph: localParagraph});
    //?? this.setState({ cardParagraph: "" });
  }

  render() {
    //const { cardParagraph } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <textarea
            type="text"
            id="localParagraph"
            value={this.state.localParagraph}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

const EditParagraph = connect(
  null,
  mapDispatchToProps
)(ConnectedParagraph);

export default EditParagraph;
