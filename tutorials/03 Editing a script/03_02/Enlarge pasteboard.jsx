//DESCRIPTION:Enlarge the pasteboard of the active document to 20 x 20 inches

app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		myDoc.pasteboardPreferences.pasteboardMargins = ["3in","2in"];
		app.activeWindow.zoom(ZoomOptions.SHOW_PASTEBOARD);
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.");
	}
}