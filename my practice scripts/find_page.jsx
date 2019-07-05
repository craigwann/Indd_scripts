var myDoc=app.activeDocument;  
var root = myDoc.xmlElements[0];  
var docTag = root.evaluateXPathExpression('//doc//article//titre');  
for(i=0; i<docTag.length; i++){  
    var docPos = docTag[i].xmlContent.insertionPoints[0].parentTextFrames[0];  
       alert("Page: "+docPos.parentPage.name);  
       }  

/*  ----------------------------------------------------------  */
// ExtendScript (JavaScript) snippet  
// One single character should be selected:  
  
var myCharacter = app.selection[0];  
var result = myCharacter.parentTextFrames[0].parentPage;  
  
  
if(result == null)  
{  
    alert("Character's text frame is considered on the pasteboard")  
}  
else  
{  
    alert("Character's text frame is considered on page: "+result.name)  
};  


/*  ----------------------------------------------------------  */
function findPage(theObj) {  
     if (theObj.hasOwnProperty("baseline")) {  
          theObj = theObj.parentTextFrames[0];  
     }  
     while (theObj != null) {  
          if (theObj.hasOwnProperty ("parentPage")) return theObj.parentPage;  
          var whatIsIt = theObj.constructor;  
          switch (whatIsIt) {  
               case Page : return theObj;  
               case Character : theObj = theObj.parentTextFrames[0]; break;  
               case Footnote :; // drop through  
               case Cell : theObj = theObj.insertionPoints[0].parentTextFrames[0]; break;  
               case Note : theObj = theObj.storyOffset; break;  
               case Application : return null;  
          }  
          if (theObj == null) return null;  
          theObj = theObj.parent;  
     }  
     return theObj  
} // end findPage  
/*  ----------------------------------------------------------  */
var doc = app.activeDocument;
// clear find change text preferences before search
app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
// this is scripting equivalent of the 'Find What:' edit text field
app.findTextPreferences.findWhat = “text”;
// search it in the active document
// you can also search it in almost everywhere: story, text frame, paragraph, line, word, etc
var finds = doc.findText();
if (finds.length > 0) { // something has been found
// for the 1st found item display the name of the page where the 1st text frame (there can be several threaded frames) containing it is located
alert(“Found ” + finds.length + ” items, the first of them is on page ” + finds[0].parentTextFrames[0].parentPage.name);
}
else { // found nothing
alert(“Nothing has been found”);
}
// clear find change text preferences after search
app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;