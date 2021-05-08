// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { editParagraph } from "../actions/index";

const mapStateToProps = state => {
  return {
    paragraph: state.cards.filter(oneCard => oneCard.cardNumber  === state.currentCardNumber)[0].paragraph,
    currentCardNumber: state.currentCardNumber
    }
};

function mapDispatchToProps(dispatch) {
  return {
    editParagraph: paragraph => dispatch(editParagraph(paragraph))
  };
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    //this.state = {
    //  paragraph: props.paragraph,
    //  currentCardNumber: props.currendCardNumber
  //  };
    this.handleChange = this.handleChange.bind(this);
  //  this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    //event.preventDefault();
    const paragraph = event.target.value;
    // const paragraph = this.state.paragraph
    this.props.editParagraph({ paragraph });

    //this.setState({ paragraph: "" });
  }
  render() {
    //const { paragraph } = this.state;
    // const paragraph = this.state.paragraph
    return (
      <div id={this.props.currentCardNumber}>
      <form>
        <div>
          <label htmlFor="title"></label>
          <textarea
            type="text"
            id="paragraph"
            value={this.props.paragraph}
            onChange={this.handleChange}
          />
        </div>
      </form>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedForm);

export default Form;
