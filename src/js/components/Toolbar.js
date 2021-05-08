import React from 'react'
import '../../css/Toolbar.css'




export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.createNote = this.createNote.bind(this);
    this.format = this.format.bind(this);
    this.getSelectionText = this.getSelectionText.bind(this);
    //this.addLink = this.addLink.bind(this);
    //this.setUrl = this.setUrl.bind(this);
    //this.setHeader = this.setHeader.bind(this);
    //this.addCodeBlock = this.addCodeBlock.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);


  }
  // Basic syntax
/* The boolean value determines whether or not a default interface is shown. It should always be set to false because some browsers do
not support it. */
 format(com, val) {
   document.execCommand(com, false, val);
   console.log(com);
   console.log(val);
 }


  getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    window.localStorage.setItem('saveTextTest', text);
    console.log(text);
}


  createNote() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    window.localStorage.setItem('saveTextTest', text);
  }
  addLink() {
    console.log("clicked add link")
    localStorage.setItem("stateTest", "addLink");
  }


  render() {
  return (
    <div className='toolbar'>
      <button onClick={this.getSelectionText}>Get Text</button>

    </div>
  )
}
}



/*
<button onClick={e => this.format('italic')}>Italics</button>
<button
  onClick={e =>
    this.format('insertUnorderedList')
  }
>
  List
</button>
<button onClick={e => this.addLink()}>Link</button>
<div id='url-input' className='hidden'>
  <input id='txtFormatUrl' placeholder='url'/>
  <button onClick={e => this.setUrl(e)}>Create Link</button>
</div>
<button onClick={e => this.setHeader()}>Header</button>
<button onClick={e => this.addCodeBlock()}>CodeBlock</button>
<button onClick={e => this.handleSubmit()}>Submit</button>
*/


/*
:id new-card-id
:font-color "#0000ff"
:paragraph ""
:audio-path "[sound:a.mp3]"
:notes [{:id new-note-id :japanese "" :checked false :reading "" :english "" :hint ""}]}

myObj = {
  "name":"John",
  "age":30,
  "cars": {
    "car1":"Ford",
    "car2":"BMW",
    "car3":"Fiat"
  }
 }
 */
