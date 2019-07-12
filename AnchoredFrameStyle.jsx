//DESCRIPTION:Apply object style to every anchored frame
// AnchoredFrameStyle.jsx
//
// Modified 07/02/2019
// Craig Wann
// Your web site URL
//
/* requirements:*/

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
    // Check to see whether any InDesign documents are open.
    // If no documents are open, display an error message.
    if (app.documents.length > 0) {
        var myDoc = app.activeDocument;
        var objectStyleName1 = "AnchoredStroke"; // #1 object styles's name  
        var objectStyleName2 = "MissingImage"; // ALT #2 object styles's name  

        var objectStyle1 = myDoc.objectStyles.itemByName(objectStyleName1);
        var objectStyle2 = myDoc.objectStyles.itemByName(objectStyleName2);
        if (!objectStyle1.isValid) {
            return
        };
        if (!objectStyle2.isValid) {
            return
        };

        var allGraphicsArray = myDoc.allGraphics;
        var allGraphicsArrayLength = allGraphicsArray.length;

        for (var n = 0; n < allGraphicsArrayLength; n++) {
            if (allGraphicsArray[n].parent.parent.constructor.name != "Character") {
                continue
            };
            if (allGraphicsArray[n].itemLink.name.match(/imagenotfound/i)) {
                allGraphicsArray[n].parent.appliedObjectStyle = objectStyle2;
            }
            else {
                allGraphicsArray[n].parent.appliedObjectStyle = objectStyle1;
            };
        }
        alert("All anchored frames STROKED!");
    } else {
        // No documents are open, so display an error message.
        alert("No InDesign documents are open. Please open a document and try again.");
    }
}