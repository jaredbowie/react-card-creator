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
/// card count off?? check?
/// [ ] can't exist in audio file names
/// sidepanel numbers are index numbers instead (fixed?)
// failed on card should return error
