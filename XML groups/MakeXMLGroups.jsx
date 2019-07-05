//MakeXMLGroups.jsx rev 1.0
//An InDesign CS5+ JavaScript
// Created by Pete Holzmann ("SLTyPete"), ICTA
//
//Shows how to use XML rules + JS to group XML elements within newly inserted parent elements
//
//You must copy the file "glue code.jsx" from the XML Rules folder (inside the Scripts
//folder inside your InDesign folder) to the folder containing this script, or provide a full
//path to the file in the next line.
//
#strict on
#target indesign

#include "glue code.jsx";

//
// Test Case code (similar to XML Rules example, but with "device" tags missing)
// Depends on grpXMLRulesExampleSetup.jsx and .xml
// the modified setup file must retrieve the modified xml file
// the modified xml file has all "device" tags removed.
//

main();
function main(){
    mySetup();
    MakeXMLGroups("/devices","device","name");
    myTeardown();
}
function mySetup(){
    var myFilePath = myFindFile("grpXMLRulesExampleSetup.jsx");
    if(myFilePath){
        app.doScript(File(myFilePath));
    }
    else{
        alert("Please choose the grpXMLRulesExampleSetup.jsx file!");
    }
}

function myTeardown(){
}

function myFindFile(scriptName){
    var myScript = myGetScriptPath();
    var myParentFolder = File(myScript).parent;
    var myFindScript = myParentFolder + "//" + scriptName;
    if(!File(myFindScript).exists){
        myFindScript = File.openDialog ("Locate the grpXMLRulesExampleSetup.jsx", "*.jsx", false);
        }
    return myFindScript;
}

// This works for both live and debug mode...
function myGetScriptPath() {
    try{
        return app.activeScript;
    }
    catch(myError){
        return File(myError.fileName);
    }
}


//
// Given an XPath in the current document:
// Collect sets of XML elements, where each group begins with myHeadTag 
// Insert each group into a new XML element named myParentTag
//
// IMPORTANT: this function requires that the XML Rules "glue code" be included at some point!
//
function MakeXMLGroups(myXPath,myParentTag,myHeadTag){

    if (app.documents.length != 0){
         var myXMLgroups = new Array(0);
		var myDocument = app.documents.item(0); 
         var myMarkupTag = myDocument.xmlTags.itemByName(myParentTag);
        if (!myMarkupTag || !myMarkupTag.isValid) {
            myMarkupTag = myDocument.xmlTags.add(myParentTag);
        }
        
		//First rule grabs the "head" elements; second one grabs all the rest
         try {
		var myRuleSet = new Array (new FindGroupHead, new FindGroupOthers);
        } catch(myError) {
            alert(myError);
        }
		with(myDocument){
            var elements = xmlElements;
                __processRuleSet(elements.item(0), myRuleSet);
        }
 
        // Now we have all the groups. Let's create new parents and move everything where they belong!
        while (myXMLgroups.length) {
            var myXMLgroup = myXMLgroups.shift();       // Grab a set of XML elements
            var myXMLparent = myXMLgroup[0].parent;  //  Put the new element underneath the parent
            var myContainerElement = myXMLparent.xmlElements.add(myMarkupTag);

            // Move everything in...
            while (myXMLgroup.length) {
                var myElement = myXMLgroup.shift();
                // for debugging, show myElement.markupTag.name ...
                myElement.move(LocationOptions.AT_END, myContainerElement);
            }
         }

        //Catch head element: begin new group
        function FindGroupHead(){
            this.name = "FindGroupHead";
            this.xpath = myXPath + "/" + myHeadTag;	
            this.apply = function(myElement, myRuleProcessor){
                __skipChildren(myRuleProcessor);
                myXMLgroups.push(new Array(0));
                myXMLgroups[myXMLgroups.length-1].push(myElement); // add head element
                return true;
            } 
        }

        //Insert insert others into the same new parent
        function FindGroupOthers(){
            this.name = "FindGroupOthers";
            this.xpath = myXPath + "/" + myHeadTag + "/following-sibling::*";	// all other elements (head will be grabbed by the first rule)
            this.apply = function(myElement, myRuleProcessor){
                __skipChildren(myRuleProcessor);
                myXMLgroups[myXMLgroups.length-1].push(myElement); // add another element to the group
            return true;
            } 
        }
  
    }
	else{
		alert("No open document");
	}
}
