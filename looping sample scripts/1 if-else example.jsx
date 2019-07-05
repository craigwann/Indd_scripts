// Check to see whether any InDesign documents are open.
// If no documents are open, display an error message.
if (app.documents.length > 0) {
	// Do something here
	alert("You have a document open!");
}
else {
	// No documents are open, so display an error message.
	alert("No InDesign documents are open. Please open a document and try again.");
}