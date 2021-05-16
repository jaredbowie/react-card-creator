import React from "react";
import Editor from "./Editor";
//import Form from "./Form";
//import List from "./List";

//ximport SidePanel from "./SidePanel";

const App = () => (
  <>
    <div>
      <Editor />
    </div>
  </>
);

export default App;


/// features bugs
//// reset doesn't highlight (but maybe doesn't matter since initialstate will normally be blank)
/// color and audio changing option
// confirmations of any delete
// vieja is twice in the notes
// enabling disabling emphasis changes nothing
// feature so you can't add two empty Cards
// disable / enabling reading option for all cards so reading doesn't display (by default)
// must not be editing paragraph to edit card notes
/// new notes get added to top
