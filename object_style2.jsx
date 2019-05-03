// ExtendScript (JavaScript)  
// Detect an anchored frame where the graphic contents is an ai-file  
// Apply an object style to it.  
  
( function()  
{  
     
    if(app.documents.length == 0){ return };  
     
    var objectStyleName = "ObjectStyleName"; // Edit and insert your object styles's name here  
     
    var doc = app.documents[0];  
    var objectStyle = doc.objectStyles.itemByName( objectStyleName );  
    if( !objectStyle.isValid ){ return };  
     
    var allGraphicsArray = doc.allGraphics;  
    var allGraphicsArrayLength = allGraphicsArray.length;  
  
    for(var n=0;n<allGraphicsArrayLength;n++)  
    {  
        if( allGraphicsArray[n].parent.parent.constructor.name != "Character" ){ continue };  
        if( allGraphicsArray[n].imageTypeName != "Adobe PDF" ){ continue };  
         
        if( allGraphicsArray[n].itemLink.name.match(/\.ai$/i) )  
        {  
            allGraphicsArray[n].parent.appliedObjectStyle = objectStyle ;  
        };  
    }  
  
}() )  