//DESCRIPTION:Create report of all part# and page numbers
// report_export.jsx
//
// Modified 05-07-2019
// Craig Wann
//
// List of things required for the script to run
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		if (app.activeDocument.stories.length != 0){
			myDisplayDialog();
		}
		else{
			alert("The document does not contain any text. Please open a document containing text and try again.");
		}
	}
	else{
		alert("No documents are open. Please open a document and try again.");
	}
}
function myDisplayDialog(){
	with(myDialog = app.dialogs.add({name:"ExportReport"})){
		//Add a dialog column.
		myDialogColumn = dialogColumns.add()	
		with(myDialogColumn){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Export as:"});
				with(myExportFormatButtons = radiobuttonGroups.add()){
					radiobuttonControls.add({staticLabel:"Text Only", checkedState:true});
					radiobuttonControls.add({staticLabel:"RTF"});
					radiobuttonControls.add({staticLabel:"InDesign Tagged Text"});
				}
			}
		}
		myReturn = myDialog.show();
		if (myReturn == true){
			//Get the values from the dialog box.
			myExportFormat = myExportFormatButtons.selectedButton;
			myDialog.destroy;
			myFolder= Folder.selectDialog ("Choose a Folder");
			if((myFolder != null)&&(app.activeDocument.stories.length !=0)){
				myExportAllStories(myExportFormat, myFolder);
			}
		}
		else{
			myDialog.destroy();
		}
	}
}
//myExportStories function takes care of exporting the stories.
//myExportFormat is a number from 0-2, where 0 = text only, 1 = rtf, and 3 = tagged text.
//myFolder is a reference to the folder in which you want to save your files.
function myExportAllStories(myExportFormat, myFolder){
        var myDoc = app.activeDocument;
		var myDocName = myDoc.name;
        var root = myDoc.xmlElements[0];
        var docTag = root.evaluateXPathExpression('//dwin_display_item_number');
        // Create a text frame on the first page pasteboard
        var myTextFrame = myDoc.pages[0].textFrames.add();
        myTextFrame.geometricBounds = [0,9,11,13];
        var myID = myTextFrame.id;
        // Add the text to the frame
        myTextFrame.contents += "SKU" + "\t" +  "Page" + "\n";

		for (var i = 0; i < docTag.length; i++) {                
			var docPos = docTag[i].xmlContent.insertionPoints[0].parentTextFrames[0];
			myTextFrame.contents += docTag[i].contents + "\t" +  docPos.parentPage.name + "\n";
		}
        
		switch(myExportFormat){
			case 0:
				myFormat = ExportFormat.TEXT_TYPE;
				myExtension = ".txt"
				break;
			case 1:
				myFormat = ExportFormat.RTF;
				myExtension = ".rtf"
				break;
			case 2:
				myFormat = ExportFormat.taggedText;
				myExtension = ".txt"
				break;
		}
        var myReport = myTextFrame.parentStory;
		myFileName = myDocName + "-report-" + myID + myExtension;
		myFilePath = myFolder + "/" + myFileName;
		myFile = new File(myFilePath);
		myReport.exportFile(myFormat, myFile);
		myReportContainer = app.activeDocument.textFrames.itemByID(myID);
		myReportContainer.remove();
}