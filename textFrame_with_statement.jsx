//DESCRIPTION:Text that you type here will appear in the tool tip for the script
// Script name.jsx
//
// Modified XXXX-XX-XX
// Your Name, Your Company
// using inches upon document creation
//
// This code block is...

app.activeDocument.textFrames.add();
app.activeDocument.textFrames.item(0).label="Test Frame";
app.activeDocument.textFrames.item(0).geometricBounds=[0,0,5.5,8.5];
app.activeDocument.textFrames.item(0).contents = "Test data in the textFrame #1";
app.activeDocument.textFrames.item(0).fillColor = "C=100 M=0 Y=0 K=0";
app.activeDocument.textFrames.item(0).texts[0].fillColor = "Paper";

// ... the same as this code block

with(app.activeDocument.textFrames.add()) {
    label="Test Frame";
    geometricBounds=[5.5,0,11,8.5];
    contents = "Test data in the textFrame #2";
    fillColor = "C=0 M=100 Y=0 K=0";
    texts[0].fillColor = "Paper";
}