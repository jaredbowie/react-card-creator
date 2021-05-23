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
/// color and audio changing option

// enabling disabling emphasis changes nothing
// feature so you can't add two empty Cards
// must not be editing paragraph to edit card notes
// card dispaly closes when clicking outside of it
// download file should be date-cards
// new line and tab in any field will break import
/// card count off??
/// cut off spaces especially from words/phrases
/// deletecard finds any other cards and sets the first one as currentcard

//done
// confirmations of any delete
/// new notes get added to top
// total card / note count
