//DESCRIPTION:Text that you type here will appear in the tool tip for the script
// name.jsx
//
// Modified XXXX-XX-XX
// Craig Wann
// Your web site URL
//
// List of things required for the script to run

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		var myDocName = myDoc.name;
        var root = myDoc.xmlElements[0];
        var docTag = root.evaluateXPathExpression('//')
		alert("Finished!");
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.");
	}
}