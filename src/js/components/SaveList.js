import React, { useEffect, useState } from 'react'

export const SaveList: React.FC = ({list}) => {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var theDateCards=yyyy + mm + dd + "-cards";
  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState('')

  // function for generating file and set download link
  const makeTextFile = () => {
    // This creates the file.
    // In my case, I have an array, and each item in
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([list], { type: 'text/plain' })

    // this part avoids memory leaks
    if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data))
  }

  // Call the function if list changes
  useEffect(() => {
    makeTextFile()
  }, [list])

///////////////
////////////////
////




  return (
    <a
      // this attribute sets the filename
      download={theDateCards}
      // link to the download URL
      href={downloadLink}
    >
      <button className="btn btn-primary btn-sm btnWidth">Export</button>
    </a>
  )
}

export default SaveList
