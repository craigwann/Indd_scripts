//DESCRIPTION:Configures settings and preferences in the active document
// Setup.jsx
//
// Modified 2015-07-30
// Keith Gilbert, Gilbert Consulting
// http://www.gilbertconsulting.com
//

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		myDoc.viewPreferences.showRulers = true;
		myDoc.viewPreferences.showFrameEdges = true;
		myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.PICAS;
		myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.PICAS;
		myDoc.guidePreferences.guidesShown = true;
		myDoc.guidePreferences.guidesSnapto = true;
		myDoc.viewPreference.rulerOrigin = RulerOrigin.SPREAD_ORIGIN;
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.")
	}
}