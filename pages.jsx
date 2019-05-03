//  DESCRIPTION: Practice script from https://www.youtube.com/watch?v=FSx9LVTSHTo
//  pages.jsx
//
//  Modified 05/02/2019
//CREATE PAGES AND TEXT FRAMES

var myDocument = app.documents.item(0);

for (i = 0; i < 100; i++) {

    var d = new Date();

    var pages = myDocument.pages.add();
    var myTextFrame = myDocument.pages.item(i).textFrames.add({
        geometricBounds: ["0p", "0p", "66p", "102p"],
        fillColor: "C" + i,
        contents: "C" + i + "//" + d.getSeconds() + ":" + d.getMilliseconds()

    });

    var myText = myTextFrame.paragraphs.item(0);
    myText.pointSize = 20;
    myText.appliedFont = app.fonts.item("Myriad Pro");
    myText.fontStyle = "Regular";
    myText.justification = Justification.RIGHT_ALIGN;
    myText.fillColor = "Paper";



}