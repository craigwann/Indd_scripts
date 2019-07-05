/*jslint undef: true, newcap: true, nomen: false, regexp: true, 
        bitwise: true, onevar: true, indent: 4, white: false */  
/*global File, LocationOptions, PageSideOptions, 
  UserInteractionLevels, 
  __processChildren, __processRuleSet, alert, app */  
  
#include "glue code.jsx";  
  
// handy debugging function; e.g.: $.writeln(dumplist(x.xmlElements));  
function dumplist(l) {  
    var i, rv = [];  
  
    rv.push("has "+l.length+" elements:");  
    for (i=0; i<l.length; i++) {  
        rv.push("  "+i+"\t"+l[i].toSpecifier()+  
                    "\t"+l[i].markupTag.name);  
    }  
    return rv.join("\n");  
}  
  
// Initialize a tags object to map strings to tags.  
function initTags(doc, tagnames) {  
    var i, t, tags = {};  
      
    for (i=0; i<tagnames.length; i++) {  
        try {  
            t = doc.xmlTags.add(tagnames[i]);  
        } catch (e0) {}  
        tags[tagnames[i]] = doc.xmlTags.itemByName(tagnames[i]);  
    }   
     return tags;  
}  
  
// Handy subtree functions  
function firstChildTag(node, tag) {  
    var i, e = node.xmlElements;  
      
    for (i=0; i<e.length; i++) {  
        if (e[i].markupTag === tag) {  
            return e[i];  
        }  
    }  
    return node;  
}  
  
function lastChildTag(node, tag) {  
    var i, e = node.xmlElements;  
      
    for (i=e.length-1; i>=0; i--) {  
        if (e[i].markupTag === tag) {  
            return e[i];  
        }  
    }  
    return node;  
}  
  
  
//// XML rule functions  
//  
// Adobe's sample for how to define these is HORRIBLE.  
// Let's fix several of these problems.  
//  
// First, a handy object to make clearer the return values  
// of XML rules:  
  
var XMLmm = { stopProcessing: true, continueProcessing: false};   
  
// Adobe suggest defining rules constructors like this:  
//  
//   function RuleName() {  
//       this.name = "RuleNameAsString";  
//       this.xpath = "ValidXPathSpecifier";  
//       this.apply = function (element, ruleSet, ruleProcessor){  
//       //Do something here.  
//       //Return true to stop further processing of the XML element  
//       return true;  
//       }; // end of Apply function  
//   }  
//  
// And then creating a ruleset like this:  
//   
//   var myRuleSet = new Array (new RuleName, new anotherRuleName);  
//   
// That syntax is ugly and, and is especially bad if  
// you need to parametrize the rule parameters, which is the only  
// reasonable approach to writing reasonable rules. Such as:  
//   
//   function addNode(xpath, parent, tag) {  
//       this.name = "addNode";  
//       this.xpath = xpath;  
//       this.apply = function (element, ruleProcessor) {  
//           parent.xmlElements.add(tag);  
//           return XMLmm.stopProcessing;  
//       }  
//   }  
//  
// and then creating a ruleset like:  
//  
//   rule = new Array (new addNode("//p", someTag));  
//  
// So instead we introduce a makeRule function, that  
// allows us to leave behind all the crud. So then we can write:  
//  
//   
// addNode = makeRule("addNode",  
// function(element, ruleProcessor, parent, tag) {  
//     parent.xmlElements.add(tag);  
//     return XMLmm.stopProcessing;  
// });  
//  
// and use:  
//  
// rule = [ addNode("//p", someTag ];  
//  
//  
  
function makeRule(name, f) {  
    return function(xpath) {  
        var  
            //xpath=arguments[0],  
               // "arguments" isn't a real array, but we can use  
               // Array.prototype.slice on it instead...  
               args=Array.prototype.slice.apply(arguments, [1]);  
        return {  
            name: name,  
            xpath: xpath,  
            apply: function(element, ruleProcessor) {  
                    // Slice is necessary to make a copy so we don't  
                    // affect future calls.  
                var moreargs = args.slice(0);  
                moreargs.splice(0, 0, element, ruleProcessor);  
  
                return f.apply(f,moreargs);  
            }  
        };  
    };  
}  
  
// Create a new node at parent. Doesn't do  
// anything with the XPath context node.  
var addNode = makeRule("addNode",  
function(element, ruleProcessor, parent, tag) {  
    parent.xmlElements.add(tag);  
    return XMLmm.stopProcessing;  
});  
     
// Create a cell for a table, adding a node to  
// the last node of the last node of the  
// table. Duplicate the context  
// node as a child of that cell.  
var makeCell = makeRule("makeCell",  
function(element, rp, table, outertag, innertag) {  
    var  
        cell = table.xmlElements[-1].xmlElements.add(outertag),  
        copy = element.duplicate();             
    copy.markupTag = innertag;  
    copy.move(LocationOptions.AT_BEGINNING, cell);  
    return XMLmm.stopProcessing;  
});  
  
// Apply from() to the context node to get  
// a source node. Copy that source node  
// to be the first child of the context node.  
var copyFromToChild = makeRule("copyFromToChild",  
function(element, ruleProcessor, from) {  
    var copy = from(element).duplicate();          
    copy.move(LocationOptions.BEFORE,  
      element.xmlElements[0]);      
    // __skipChildren(ruleProcessor);  
    return XMLmm.continueProcessing;  
});  
  
// We don't actually use this, but it was useful  
// in debugging. Essentially "rename" a node.  
// Set the tag of the context node to the  
// specified tag.  
var setTag = makeRule("setTag",  
function(element, ruleProcessor, newtag) {  
    element.markupTag = newtag;  
    return XMLmm.stopProcessing;  
});  
  
// Apply from() to the context node to get  
// a source node. Apply to() to the  
// context node to get a destination node.  
// Move the source node in the specified  
// location (how) to the destination node.  
var moveFromTo = makeRule("moveFromTo",  
function (element, ruleProcessor, from, how, to) {  
    __processChildren(ruleProcessor);  
    var src = from(element);  
    src.move(how, to(element));  
    return XMLmm.continueProcessing;  
});  
  
// end rule functions  
  
// It's just not worth rewriting some of Adobe's ugly functions...  
// but at least fix it up so it JSLints.  
function myGetBounds(myDocument, myPage){  
    var  
        myPageWidth = myDocument.documentPreferences.pageWidth,  
        myPageHeight = myDocument.documentPreferences.pageHeight,  
        myX1, myX2, myY1, myY2;  
  
    if(myPage.side === PageSideOptions.leftHand){  
        myX2 = myPage.marginPreferences.left;  
        myX1 = myPage.marginPreferences.right;  
    }  
    else{  
        myX1 = myPage.marginPreferences.left;  
        myX2 = myPage.marginPreferences.right;  
    }  
    myY1 = myPage.marginPreferences.top;  
    myX2 = myPageWidth - myX2;  
    myY2 = myPageHeight - myPage.marginPreferences.bottom;  
    return [myY1, myX1, myY2, myX2];  
}  
  
function myGetScriptPath() {  
    try {  
        return app.activeScript;  
    }  
    catch(myError){  
        return new File(myError.fileName);  
    }  
}  
  
  
// OK, the actual program.  
function main() {  
    var  
        doc = app.activeDocument,  
        page = doc.pages[0],  
        root = doc.xmlElements[0],  
        //inputFile = new File(myGetScriptPath().path+ "/mac.xml"),   
        inputFile = File.openDialog(),  
        tags = {},  
        p, table;  
         
    if (app.documents.length<1) {  
       alert ("Open a document and run the Script");  
       return false;  
    }  
      
     // Let's not use a seperate variable for each tag. Instead,  
     // we'll keep an Object that maps strings to tags.  
    tags = initTags(doc,  
                         ["table", "para", "article",  
                          "section", "section-head", "tr", "td", "p"]);  
    
    doc.xmlImportPreferences.allowTransform = false;  
    doc.xmlImportPreferences.ignoreWhitespace = true;  
  
    app.scriptPreferences.userInteractionLevel =  
          UserInteractionLevels.NEVER_INTERACT;  
    doc.importXML(inputFile);  
    app.scriptPreferences.userInteractionLevel =  
          UserInteractionLevels.INTERACT_WITH_ALL;  
        
    // For each <para>, copy the parent's <section-head> inside.  
    // Next, move each <article> node to the end of the <para>,  
    // placing it after the <page> node.  
    __processRuleSet(root, [  
        copyFromToChild(  
            "//para",  
            function(n) {  
                    return firstChildTag(n.parent,tags["section-head"]);  
               }),  
        moveFromTo(  
            "//para",  
            function(n) { return firstChildTag(n, tags.article); },  
            LocationOptions.AT_END,  
            // This is more general than we need to be; we're moving  
            // to "the end", but the end of WHAT? It need not be the  
            // <para>, it could be some other node.  
            function(n) { return n; })  
   ]);  
          
    // Add a <p> node to hold the table we're about to create.  It's  
     // not super-clear from the documentation, but  
     // convertElementToTable creates a text node of the table in the  
     // XLM structure. In order to then place that into a frame, there  
     // has to be an enclosing XML node to do so. We choose <p> for  
     // lack of a better tag.  
    p = root.xmlElements.add(tags.p);  
    table = p.xmlElements.add(tags.table);  
  
    // For each para node, add a <tr> to the table.  For each  
    // <section-head>, <page>, or <article>, add a <td> to the last  
    // <tr> of the table  
    __processRuleSet(root, [  
        addNode("//para", table, tags.tr),  
        makeCell("//para/section-head", table, tags.td, tags.p),  
        makeCell("//para/page", table, tags.td, tags.p),  
        makeCell("//para/article", table, tags.td, tags.p)  
    ]);  
  
     // Make it a table and GO!  
    table.convertElementToTable(tags.tr, tags.td);  
    p.placeIntoFrame(page, myGetBounds(doc, page));  
}  
  
main();  