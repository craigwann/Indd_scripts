/*
   Indesign Calendar Wizard

   fitCalendarToFrame.js
   
   version 0.95

   by Scott Selberg
   April 3, 2006

   The script is a gift to the InDesign user community.  It is free to 
   use and modify; however, it is not permissible to sell or 
   redistribute any portion of the script without express written 
   permission from the author.  

*/
var calendarRegExp            = new RegExp( "calendar(Dates|JulianDate|Holidays|Text|Moons|Pictures|Background)(.*)" );
var calendarDatesRegExp       = new RegExp( "calendarDates(.*)" );
var calendarJulianDateRegExp  = new RegExp( "calendarJulianDate(.*)" );
var calendarTextRegExp        = new RegExp( "calendarText(.*)" );
var calendarHolidaysRegExp    = new RegExp( "calendarHolidays(.*)" );
var calendarMoonsRegExp       = new RegExp( "calendarMoons(.*)" );
var calendarPicturesRegExp    = new RegExp( "calendarPictures(.*)" );
var calendarBackgroundRegExp  = new RegExp( "calendarBackground(.*)" );

var knownCalendars = findCalendars().sort();
knownCalendars.unshift("All");
var knownLayers = new Array( "calendarDates", "calendarJulianDate", "calendarText", "calendarHolidays", "calendarMoons", "calendarPictures", "calendarBackground" ); 
var alignCalendars = new Array();
var masterLayer;
var knownCalendarIndex = 0;

var bFrameFound = false;
var myLabel;
var myError;
var rowStart;

var bCS = false;
var bCS2 = false;
var bCS3 = false;
var bCS4 = false;
var bCSX = false;
var bCellStyles = false;

var settings = new Object;
settings.calendarDateLabel       = 'calendarDates';
settings.calendarJulianDateLabel = 'calendarJulianDate';
settings.calendarHolidayLabel    = 'calendarHolidays';
settings.calendarTextLabel       = 'calendarText';
settings.calendarMoonsLabel      = 'calendarMoons';
settings.calendarPicturesLabel   = 'calendarPictures';
settings.calendarBackgroundLabel = 'calendarBackground';

/********************************************************************/
// Version Diagnostic
/********************************************************************/

if (app.version == 3)
{
   bCS = true;
}
else if( String(app.version).split(".")[0] == 4 )
{
   bCS2     = true;
}
else if( String(app.version).split(".")[0] == 5 )
{
   bCS3     = true;
}
else if( String(app.version).split(".")[0] == 6 )
{
   bCS4     = true;
}
else
{
   bCSX    = true;
}
   
if( bCS3 == true || bCS4 == true || bCSX == true )
{
   bCellStyles = true
}

/********************************************************************/
// Try to find selected text frame
/********************************************************************/
try
{ 
   var selectionObjectType = app.selection[0].toString();
   if( selectionObjectType == "[object TextFrame]" )
   {
      myLabel = app.selection[0].label; 
      bFrameFound = true;
   }
   else if( selectionObjectType == "[object InsertionPoint]" )
   {
      if( bCS )
      {
         try{ myLabel = app.selection[0].parentTextFrame.label; }
         catch( myError )
         {
            myLabel = app.selection[0].parentTextFrame[0].label;
            bFrameFound = true;
         }
      }
      else
      {
         myLabel = app.selection[0].parentTextFrames[0].label;
         bFrameFound = true;
      }      
   }

   try
   {
       var buffer = calendarRegExp.exec( myLabel );
       for( var i = 0; i < knownCalendars.length; i++ )
       {
           if( buffer[2] == knownCalendars[i] )
           {
               knownCalendarIndex = i;
           }
       }
   }
   catch( myError ){}
}
catch( myError ){}

/********************************************************************/
// User Interface
/********************************************************************/
if( !bFrameFound )
{
    var myDialog = app.dialogs.add({name:"Adobe InDesign Calendar Wizard:",canCancel:true});
    with(myDialog)
    {
        //Add a dialog column.
        with( dialogColumns.add() )
        {
            with( dialogRows.add() )
            {
                staticTexts.add({staticLabel:"Select Calendar"});
                var selectCalendar = dropdowns.add({stringList:knownCalendars,
                                                    selectedIndex:knownCalendarIndex});
            }
            with( dialogRows.add() )
            {
                staticTexts.add({staticLabel:"Align calender to layer"});
                var selectMasterLayer = dropdowns.add({stringList:knownLayers,
                                                       selectedIndex:0});
            }
        }
    }

    var myResult = myDialog.show();
    if(myResult == true)
    {
        if( knownCalendars[ selectCalendar.selectedIndex ] == "All" )
        {
            alignCalendars = knownCalendars;
            alignCalendars.shift();
        }
        else
        {
            alignCalendars[0] = knownCalendars[ selectCalendar.selectedIndex ];
        }

        if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarText" )
        {
            masterLabelPrefix = "calendarText";
        }
        else if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarHolidays" )
        {
            masterLabelPrefix = "calendarHolidays"
        }
        else if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarMoons" )
        {
            masterLabelPrefix = "calendarMoons"
        }
        else if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarPictures" )
        {
            masterLabelPrefix = "calendarPictures"
        }
        else if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarBackground" )
        {
            masterLabelPrefix = "calendarBackground"
        }
        else if( knownLayers[ selectMasterLayer.selectedIndex ] == "calendarJulianDate" )
        {
            masterLabelPrefix = "calendarJulianDate"
        }
        else
        {
            masterLabelPrefix = "calendarDates";
        }

        for( var i = 0; i < alignCalendars.length; i++ )
        {
            var myDocument = app.activeDocument;
            with(myDocument.viewPreferences)
            {
               var originalRulerOrigin                = rulerOrigin;
               var originalHorizontalMeasurementUnits = horizontalMeasurementUnits;
               var originalVerticalMeasurementUnits   = verticalMeasurementUnits;

               rulerOrigin                = RulerOrigin.pageOrigin;
               horizontalMeasurementUnits = MeasurementUnits.inches;
               verticalMeasurementUnits   = MeasurementUnits.inches;
            }

            fitCalendar( alignCalendars[i], masterLabelPrefix )

            with(myDocument.viewPreferences)
            {
               rulerOrigin                = originalRulerOrigin;
               horizontalMeasurementUnits = originalHorizontalMeasurementUnits;
               verticalMeasurementUnits   = originalVerticalMeasurementUnits;
            }
        }
    }
    else
    {
        myDialog.destroy();
    }
}
else
{
    masterLabelPrefix = "calendar" + buffer[1];
    alignCalendars[0] = buffer[2];

    var myDocument = app.activeDocument;
    with(myDocument.viewPreferences)
    {
       var originalRulerOrigin                = rulerOrigin;
       var originalHorizontalMeasurementUnits = horizontalMeasurementUnits;
       var originalVerticalMeasurementUnits   = verticalMeasurementUnits;

       rulerOrigin                = RulerOrigin.pageOrigin;
       horizontalMeasurementUnits = MeasurementUnits.inches;
       verticalMeasurementUnits   = MeasurementUnits.inches;
    }

    fitCalendar( alignCalendars[0], masterLabelPrefix )

    with(myDocument.viewPreferences)
    {
       rulerOrigin                = originalRulerOrigin;
       horizontalMeasurementUnits = originalHorizontalMeasurementUnits;
       verticalMeasurementUnits   = originalVerticalMeasurementUnits;
    }
}
function getStroke( calendarIndex )
{
    var frameStroke;
    var tableStroke;
    var myCellsStroke;
    var stroke = 1/72;
        
    // in CS, the bottomEdgeStrokeWeight doesn't seem to work, so it defaults to 1/72
    if( !bCS )
    {
       frameStroke = myDocument.textFrames.item( "calendarDates" + calendarIndex );
       tableStroke = frameStroke.tables.firstItem();
       myCellsStroke = tableStroke.columns.lastItem().cells;
       stroke = (myCellsStroke[ myCellsStroke.length-1 ].bottomEdgeStrokeWeight)/72;        
       //strokeWidth = (myCells[ myCells.length-1 ].rightEdgeStrokeWeight)/72;
    }

    return stroke;
}
function fitCalendar( calendarIndex, masterLabelPrefix )
{
       var frame1 = myDocument.textFrames.item( masterLabelPrefix + calendarIndex );
       var table1 = frame1.tables.firstItem();
       var frameBounds = frame1.geometricBounds;
       var i;
       var j;
       var myCells = table1.columns.firstItem().cells;
       var strokeHeight = (myCells[ myCells.length-1 ].bottomEdgeStrokeWeight)/72;
       var columns = table1.columns;
       var workWeekCellWidth = 0.25;
       var cellHeight;
       var cellWidth;
       var strokeHeight = getStroke( calendarIndex );
       var strokeWidth  = strokeHeight;

       var firstRowLabel;
       var secondRowLabel;
       var startOnRow = 2;
       var metaRows = 2;
       
       if( bCS )
       {
          // Note, CS (Verion 3) does not support the label property, so we just ask
          metaRows = getCountOfMetaRows( settings )
       }
       else
       {
          var firstRowLabel = table1.rows.item(0).cells.item(0).label;
          var secondRowLabel = table1.rows.item(1).cells.item(0).label;

          if( secondRowLabel == "WeekDayName" )
          {
             metaRows = 2;
          }
          else if( firstRowLabel == "MonthName" || firstRowLabel == "WeekDayName" )
          {
             metaRows = 1;
          }
          else
          {
             metaRows = getCountOfMetaRows( settings )
          }
       }
       
       if( metaRows == 2 )
       {
             cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - myCells[1].height  - strokeHeight)/(myCells.length - 2));
             startOnRow = 2;
       }
       else if( metaRows == 1 )
       {
          cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
          startOnRow = 1;
       }
       else
       {
          cellHeight = ((frameBounds[2] - frameBounds[0] - strokeHeight)/(myCells.length));
          startOnRow = 0;
       }

       for( i = startOnRow; i < myCells.length; i++ )
       {
          myCells[i].height = cellHeight;
       }

       myCells = table1.rows.lastItem().cells;
       if( columns.length == 8 )
       {
          for( i = 0; i < columns.length; i++ )
          {
             if( i == 0 )
             {
                cellWidth = workWeekCellWidth;
             }
             else
             {
                cellWidth = ((frameBounds[3] - frameBounds[1] - strokeWidth - workWeekCellWidth)/(myCells.length - 1));
             }

             cells = columns[i].cells;
             for( j = 0; j < cells.length; j++ )
             {
                myCells[i].width = cellWidth;
             }
          }

       }
       else
       {
          cellWidth = ((frameBounds[3] - frameBounds[1] - strokeWidth)/(myCells.length));
          for( i = 0; i < myCells.length; i++ )
          {
             myCells[i].width = cellWidth;
          }
       }       

       // shrink picture frames
       try{ shrinkPictureFrames( "calendarPictures" + calendarIndex ); }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarDates" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarJulianDate" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}
       
       try{ myDocument.textFrames.item( "calendarHolidays" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarText" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarMoons" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarPictures" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       try{ myDocument.textFrames.item( "calendarBackground" + calendarIndex ).geometricBounds = frameBounds; }
       catch(myError){}

       alignCalendar( calendarIndex, masterLabelPrefix );
       PlaceCalendarsOnAppropriateLayers( settings );
}

function findCalendars()
{
   var myDocument;
   var myTextFrames;
   var i;
   var knownCalendars = new Array();
   var buffer;
   var myError;

   try
   {
      myDocument = app.activeDocument;
      myTextFrames = myDocument.textFrames;
      for( i = 0; i < myTextFrames.length; i++ )
      {
         buffer = calendarDatesRegExp.exec( myTextFrames.item(i).label );
         try{ knownCalendars.push( buffer[1] ) }
         catch( myError ){ }
      }
   }
   catch( myError )
   {}

   return( knownCalendars )
}

function alignCalendar( calendarIndex, masterLabelPrefix )
{
   var calendarDate       = "calendarDates"       + calendarIndex;
   var calendarJulianDate = "calendarJulianDate"  + calendarIndex;
   var calendarHolidays   = "calendarHolidays"    + calendarIndex;
   var calendarText       = "calendarText"        + calendarIndex;
   var calendarMoons      = "calendarMoons"       + calendarIndex;
   var calendarPictures   = "calendarPictures"    + calendarIndex;
   var calendarBackground = "calendarBackground"  + calendarIndex;

   if( masterLabelPrefix == "calendarText" )
   {
      slave1Label = calendarPictures;
      slave2Label = calendarDate;
      slave3Label = calendarMoons;
      slave4Label = calendarHolidays;
      slave5Label = calendarBackground;
      slave6Label = calendarJulianDate;
      masterLabel = calendarText;
   }
   else if( masterLabelPrefix == "calendarHolidays" )
   {
      slave1Label = calendarPictures;
      slave2Label = calendarDate;
      slave3Label = calendarMoons;
      masterLabel = calendarHolidays;
      slave4Label = calendarText;
      slave5Label = calendarBackground;
      slave6Label = calendarJulianDate;
   }
   else if( masterLabelPrefix == "calendarPictures" )
   {
      masterLabel = calendarPictures;
      slave1Label = calendarDate;
      slave2Label = calendarMoons;
      slave3Label = calendarHolidays;
      slave4Label = calendarText;
      slave5Label = calendarBackground;
      slave6Label = calendarJulianDate;
   }
   else if( masterLabelPrefix == "calendarBackground" )
   {
      slave1Label = calendarPictures;
      slave2Label = calendarDate;
      slave3Label = calendarMoons;
      slave4Label = calendarHolidays;
      slave5Label = calendarText;
      masterLabel = calendarBackground;
      slave6Label = calendarJulianDate;
   }
   else if( masterLabelPrefix == "calendarMoons" )
   {
      slave1Label = calendarPictures;
      slave2Label = calendarDate;
      masterLabel = calendarMoons;
      slave3Label = calendarHolidays;
      slave4Label = calendarText;
      slave5Label = calendarBackground;
      slave6Label = calendarJulianDate;
   }
   else if( masterLabelPrefix == "calendarJulianDate" )
   {
      slave1Label = calendarPictures;
      slave2Label = calendarDate;
      slave3Label = calendarMoons;
      slave4Label = calendarHolidays;
      slave5Label = calendarText;
      slave6Label = calendarBackground;
      masterLabel = calendarJulianDate;
   }
   else
   {
      slave1Label = calendarPictures;
      masterLabel = calendarDate;
      slave2Label = calendarMoons;
      slave3Label = calendarHolidays;
      slave4Label = calendarText;
      slave5Label = calendarBackground;
      slave6Label = calendarJulianDate;
   }

   // layer might not exist...
   try{ alignTables( masterLabel, slave1Label ); }
   catch( myError ){}
   
   // layer might not exist...
   try{ alignTables( masterLabel, slave2Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave3Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave4Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave5Label ); }
   catch( myError ){}

   // layer might not exist...
   try{ alignTables( masterLabel, slave6Label ); }
   catch( myError ){}
   
   // rescale picture frames
   rescalePictureFrames( calendarPictures );

   return;
}

function shrinkPictureFrames( frameLabel )
{
   var myDocument = app.activeDocument;
   var frame;
   var frames;
   var cells;
   var i;
   var table;
   var j;

   try{ 
      table = myDocument.textFrames.item( frameLabel ).tables.firstItem();
      rows = table.rows;
      for( i = 0; i < rows.length; i++ )
      {
         cells = rows[i].cells;
         for( j = 0; j < cells.length; j++ )
         {
            cells[j].pageItems.firstItem().geometricBounds = [0,0,.01,.01];
         }
      }
   }
   catch( myError ){}
}

function rescalePictureFrames( frameLabel )
{
   var myDocument = app.activeDocument;
   var frame;
   var frames;
   var cells;
   var i;
   var table;
   var j;

   try{ 
      table = myDocument.textFrames.item( frameLabel ).tables.firstItem();
      rows = table.rows;
      for( i = 0; i < rows.length; i++ )
      {
         cells = rows[i].cells;
         for( j = 0; j < cells.length; j++ )
         {
            cells[j].pageItems.firstItem().geometricBounds = [0,0,cells[j].height,cells[j].width];
         }
      }
   }
   catch( myError ){}
}

function alignTables( label1, label2 )
{
   var myDocument = app.activeDocument;
   var frame1 = myDocument.textFrames.item( label1 );
   var frame2 = myDocument.textFrames.item( label2 );

   var table1 = frame1.tables.firstItem();
   var table2 = frame2.tables.firstItem();

   var myMasterRow = table1.rows.lastItem().cells;
   var mySlaveRow  = table2.rows.lastItem().cells;

   for( var i = 0; i < myMasterRow.length; i++ )
   {
      mySlaveRow[i].width = myMasterRow[i].width;
   }

   var myMasterColumn = table1.columns.firstItem().cells;
   var mySlaveColumn  = table2.columns.firstItem().cells;

   for( var i = 0; i < myMasterColumn.length; i++ )
   {
      mySlaveColumn[i].height = myMasterColumn[i].height;
   }

   return;
}
function PlaceCalendarsOnAppropriateLayers( settings )
{
   var buffer;
   var myError;
   var layer;
   var myDocument = app.activeDocument;
   var myTextFrames = myDocument.textFrames;

   for( var i = 0; i < myTextFrames.length; i++ )
   {
      if( myTextFrames.item(i).label.match( calendarDatesRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item( settings.calendarDateLabel) ) }
          catch (myError){
              try{ myTextFrames.item(i).move( myDocument.layers.item( 'Layer 1' ) ) }
              catch (myError){
                 try{ myTextFrames.item(i).move( myDocument.layers.item(-1) ) }
                 catch (myError){
                 }
              }
          }
      }
      else if( myTextFrames.item(i).label.match( calendarJulianDateRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarJulianDateLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( calendarTextRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarTextLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( calendarHolidaysRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarHolidayLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( calendarMoonsRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarMoonsLabel) ) }
          catch (myError){
          }
      }
      else if( myTextFrames.item(i).label.match( calendarBackgroundRegExp ) )
      {
          try{ myTextFrames.item(i).move( myDocument.layers.item(settings.calendarBackgroundLabel) ) }
          catch (myError){
          }
      }
   }
   return;
}
function getCountOfMetaRows( settings )
{
    var metaRowCount = 0;
    var myDialog = app.dialogs.add({name:"Fit Calendar To Frame Row Identifier:",canCancel:false});
    with( myDialog )
    {
       with( dialogColumns.add() )
       {
          with( dialogRows.add() )
          {
             var hasMonthNameCheckbox = checkboxControls.add({checkedState:false});
             staticTexts.add({staticLabel:"Has row for the month name."});
          }
          with( dialogRows.add() )
          {
             var hasWeekDayNamesCheckbox = checkboxControls.add({checkedState:false});
             staticTexts.add({staticLabel:"Has row with the week day names."});
          }
       }
    }
    var myResult = myDialog.show();
    if( hasMonthNameCheckbox.checkedState )
    {
       metaRowCount = metaRowCount + 1;
    }

    if( hasWeekDayNamesCheckbox.checkedState )
    {
       metaRowCount = metaRowCount + 1;
    }

    return metaRowCount;
}
