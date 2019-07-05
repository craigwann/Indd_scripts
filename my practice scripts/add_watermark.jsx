//DESCRIPTION:This script adds a watermark
// add_watermark.jsx
//
// Modified 2019-04-10
// Craig Wann
// 
// Assumptions:
// The document only conains 1 layer
// The page size is large enough to accommodate the watermark text
// All pages in the document are the same size

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
        var myDoc = app.activeDocument;
        // Set up some variables
        var myWatermarkText = "SAMPLE"; // Edit this to change the text displayed by the watermark script
        var myStartPage = 1; // Edit this to change the starting page
        var myEndPage = 8; // Edit this to change the ending page
        // Create a new layer
        var myWatermarkLayer = myDoc.layers.add({name: 'Watermark', layerColor: UIColors.gray});
        // Memorize the page width and height
        var myPageWidth = myDoc.documentPreferences.pageWidth;
        var myPageHeight = myDoc.documentPreferences.pageHeight;
        // Create a text frame on the first page the same size as the page
        var myTextFrame = myDoc.pages[myStartPage-1].textFrames.add();
        myTextFrame.geometricBounds = [0,0,myPageHeight,myPageWidth];
        // Add the text to the frame
        myTextFrame.contents = myWatermarkText;
        // Format the text
        myTextFrame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
        var myText = myTextFrame.paragraphs[0];
        myText.appliedFont = app.fonts.item("Aktiv Grotesk");
        myText.fontStyle = "XBold";
        myText.justification = Justification.centerAlign;
        myText.pointSize = 100;
        myText.fillColor = myDoc.colors.item("Black");
        myText.fillTint = 50;
        // set Opacity Blend Mode
        myTextFrame.transparencySettings.blendingSettings.blendMode = BlendMode.DIFFERENCE;
        // Duplicate the frame to the other pages
        for (var myCounter = myStartPage; myCounter < myEndPage; myCounter++) {
            myTextFrame.duplicate(myDoc.pages[myCounter]);
        }

        
		alert("Finished!");
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.");
	}
}