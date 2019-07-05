﻿//ApplyFont.jsx
//An InDesign JavaScript
//
//Shows how to get a list of fonts and display them in a dialog box,
//and how to apply a font to a range of text.
main();
function main(){
    mySetup();
    mySnippet();
    myTeardown();
}
function mySetup(){
	//Creates a text frame in an example document
	//and sizes the text frame to match the page margins.
	var myDocument = app.documents.add();
	//Create a text frame on page 1.
	var myTextFrame = myDocument.pages.item(0).textFrames.add();
	//Set the bounds of the text frame.
	myTextFrame.geometricBounds = myGetBounds(myDocument, myDocument.pages.item(0));
	//Enter text in the text frame.
	myTextFrame.contents = TextFrameContents.placeholderText;
}
function mySnippet(){
	var myDocument = app.documents.item(0);
    var myPage = myDocument.pages.item(0);
    //<fragment>
    var myTextFrame = myPage.textFrames.item(0);
    var myStartChar = myTextFrame.paragraphs.item(2).words.item(3).characters.item(0);
    var myEndChar  = myTextFrame.paragraphs.item(4).words.item(-1).characters.item(-1);
    var myText = myTextFrame.parentStory.texts.itemByRange(myStartChar, myEndChar);
    myDisplayDialog(myText);
    //</fragment>
}
function myTeardown(){
}
//<fragment>
function myDisplayDialog(myText){
	var myList = app.fonts.everyItem().name;
	var myDialog = app.dialogs.add({name:"Fonts"});
	with(myDialog){
		with(dialogColumns.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel:"Font Name:"});
			}
			with(dialogColumns.add()){
				var myDropdown = dropdowns.add({stringList: myList, selectedIndex:0});
			}
		}
	}
	var myResult = myDialog.show();
	if(myResult == true){
		var myFontName = myList[myDropdown.selectedIndex];
		myDialog.destroy();
		//Apply the font to the text.
		myText.appliedFont = app.fonts.item(myFontName);
	}
	else{
		myDialog.destroy();
	}
}
//</fragment>
function myGetBounds(myDocument, myPage){
	var myPageWidth = myDocument.documentPreferences.pageWidth;
	var myPageHeight = myDocument.documentPreferences.pageHeight
	if(myPage.side == PageSideOptions.leftHand){
		var myX2 = myPage.marginPreferences.left;
		var myX1 = myPage.marginPreferences.right;
	}
	else{
		var myX1 = myPage.marginPreferences.left;
		var myX2 = myPage.marginPreferences.right;
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myPageWidth - myX2;
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}