// WhatIsIt.jsx
//
// Keith Gilbert
// www.gilbertconsulting.com
// Modified 20145-8-14

// Check to see whether any InDesign documents are open.
// If no documents are open, display an error message.
if (app.documents.length > 0) {
	var myDoc = app.activeDocument;
	if (app.selection.length == 1) {
		var mySelection = app.selection[0];
		alert("The 'constructor name' of the selected object is: "+mySelection.constructor.name);
	}
	else {
		alert("Select a single object and try again.");
	}
}
else {
	// No documents are open, so display an error message.
	alert("No InDesign documents are open. Please open a document and try again.")
}