import React from "react";
import Editor from "./Editor";
//import Form from "./Form";
//import List from "./List";
import '../../css/bootstrap.min.css'
import '../../css/App.css'

//ximport SidePanel from "./SidePanel";

const App = () => (
  <>
    <div className="appGeneral">
      <Editor />
    </div>
  </>
);

export default App;


/// features bugs
// feature so you can't add two empty Cards
// new line and tab in any field will break import
/// card count off??
/// cut off spaces especially from words/phrases
