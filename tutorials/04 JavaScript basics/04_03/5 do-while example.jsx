var myTextFrame = app.selection[0];
var myText = myTextFrame.parentStory.texts[0];

do {
	myText.pointSize = myText.pointSize - .1;
} while (myTextFrame.overflows == true);