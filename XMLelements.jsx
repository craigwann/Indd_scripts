//DESCRIPTION:Modify XML element structure after initial import
// XMLelements.jsx
//
// Modified 06/25/2019
// Craig Wann
//
// Requirements...

Main();
// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
        mySqrtTag(myDoc)  
        function mySqrtTag(elm)  
        {  
            for (var i = 0; i < elm.xmlElements.length; i++)  
            {  
                if(elm.xmlElements[i].markupTag.name.toString() == "m:msqrt")  
                {  
                    elm.xmlElements[i].insertionPoints[0].contents = "sqrt";  
                }  
                mySqrtTag(elm.xmlElements[i]);  
            }  
        }  
        
		alert("Finished!");
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.");
	}
}