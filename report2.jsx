//DESCRIPTION:Create report of all part# and page numbers
// report.jsx
//
// Modified 05-06-2019
// Craig Wann
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
        var root = myDoc.xmlElements[0];
        var docTag = root.evaluateXPathExpression('//dwin_display_item_number');

        // Create a text frame on the first page pasteboard
        var myTextFrame = myDoc.pages[0].textFrames.add();
        myTextFrame.geometricBounds = [0,9,11,13];
        // Add the text to the frame
        // myTextFrame.contents += ;


        
             
            for (var i = 0; i < docTag.length; i++) {                
                var docPos = docTag[i].xmlContent.insertionPoints[0].parentTextFrames[0];
                myTextFrame.contents += docTag[i].contents + "\t" +  docPos.parentPage.name + "\n";
            }
        


        alert("Finished!");
    } else {
        // No documents are open, so display an error message.
        alert("No InDesign documents are open. Please open a document and try again.");
    }
}