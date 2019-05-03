//DESCRIPTION: Transpose the 2 characters on either side of the text cursor
// transpose.jsx
//
// Modified 2019-04-10
// Craig Wann
// 
// Assumptions:
// The text cursor must be located between tow adjacent text characters

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		var mySelection = app.selection[0];
		if (mySelection.constructor.name == "InsertionPoint") {
			$.bp(); // Breakpoint

		}			
		else {
            // Something other than an insertion point is selected
            alert("Please click between two characters with the Type tool and try again.");
        }
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.");
	}
}