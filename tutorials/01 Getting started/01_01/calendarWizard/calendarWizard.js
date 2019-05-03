/*
   Indesign Calendar Wizard
   Release 4.1.2

   Authored by by Scott Selberg
   March 11, 2006

   Subversion Revision: $Revision: 157 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $

   The script is a gift to the InDesign user community.  It is free to 
   use and modify; however, it is not permissible to sell or 
   redistribute any portion of the script without express written 
   permission from the author.  

   Last update: $Date: 2015-08-20 07:56:33 -0700 (Thu, 20 Aug 2015) $
   Thanks to Gary Spedding for the first round of user feedback
   Thanks to Theo Duijkers for the Dutch weeks and months
   Thanks to Ulrik Södergren for Swedish language   
   Thanks to David Blatner for the table and cell styles suggestion, 
             the cymk colors suggestion, 
             and for reading the currently selected text frame for holidays suggestion.
   Thanks to Barbara L for notincing the order of weekdays in French, Spanish, and Dutch were wrong.
   Thanks to Ott Rammo for the Estonian language update
   Thanks to Giancarlo Gamberini for the Italian language update
   Thannk to Robert Siemiński for the Polish language update
   Thanks to Szabó Szabolcsfor the Hungarian language update
   Thanks to Tim Fennell for finding a bug with dates in split cells
   Thanks to Tim Fennell for finding a bug in the year of the mini-calendar.
   Thanks to Magnus Nyland for Norwegian langage update.
   Thanks to Ole Jessien for Danish language update
   Thanks to Robb Lutton for finding the CMYK bug
   Thanks to Daniel Pinto for the Portuguese language update
   Thanks to Themis Chapsis for the Greek language update
   Thanks to Yehuda Shiran, Ph.D. for Work Week algorithm
   Thanks to Xavier M. Jubier (http://xjubier.free.fr/en/index_en.html) for the phase of the moon calculation
   Thanks to Ryan Gardner for the idea of the picture frame
   Thanks to Radu Diaconu for the Romanian language update
   Thanks to Glenn Heckard for finding bugs with only Highlight Sundays selected,
      with Custom File selected, and not being able to generate a new page with 
      holidays from frame selected and the cal_date alignment paragraph override in CS4
   Thanks to Ott Rammo for finding several bugs under CS1
   Thanks to Daniel Pinto for Portugal's holidays
   Thanks to Ott Rammo for the idea of a highlight holidays feature
      and the Eastonian holiday pack.
   Thanks to Robb Luttton for pointing out a few spelling mistakes in the US holidays
   Thanks to Alejandro Martin Parra for finding the spanish bug
   Thanks to Toni Copistero for finding the bug with monday start day, 1st of month is Sunday, and hightlight sundays
   Thanks to Toni Copistero for finding the bug with monday start day, 1st of month is Sunday, and include non-month selected
      and the Catalonian language update
    Thanks to Dave Saunders for figuring out how to avoid the UserInteractionLevel trap which may have been set by a previous script.
   Thanks to Manuela for finding the CS bug concerning UserInteractionLevels
   Thanks to Salvador Subarroca for correcting the catalan language and providing the Basque language
   Thanks to Ott Rammo for the updated Eastonian holiday pack.
   Thanks to Gregory Dziedzic for the Turkish langauge update
   Thanks to Jennie Zell for finding a bug with the re-align script and suggesting the custom page size
   Thanks to Stein Egeberg for help with the documentation, usability, and finding some bugs with the cell styles
   Thanks to Jukka Kemppainen for the Finnish Translation
   Thanks to George Shustov for the Russian Translation
   Thanks to Andrej Damjanovic for the Slovenian Translation
   Thanks to Tobias Kraft for the German Holidays
   Thanks to Joan Grytness for finding the bug where split cells had no "splitcell" style
   Thanks to 林巧忻 for the Chinese translation
   Thanks to Eric Lee for detecting that the custom holiday file selection only picked up one file rather than all
   Thanks to Jeffrey Trimble for suggesting a Julian Date Layer (Day of Year)
   Thanks to George Buxton for the New Zealand Holidays
   Thanks to Gabor Szebenyi for finding the bug with Highlight Sundays and not-mini calendars where the first sunday was not being highlighted
   Thanks to Jozef Ramen, Frantisek Lukacovic, and  empmejl for the Slovak language traslation
   Thanks for Hlynuf Helgason fo the icelandic translation
   Thanks to Karolis Jurkevicius for the lithuanian translation
   Thanks to Gyorgy zombori for finding a resizing bug
   Thanks to Kajza for the Croatian translation
   Thanks to Gavin Anderson for proofing the README
   Thanks to Ken Keyes for the Azerbaijan translation
   Thanks to Ron Samson for finding a bug with CS3/CS4
   Thanks to Douglas Riley for the Austrailian Holidays
   Thanks to Ivan Stoyanov for the Bulgarian translation
   Thanks to Sandra Fassalovara for the Austrian holidays
   Thanks to Sadek for the Arabic
   Thanks to Godehard Hannig for correcting the mid day names to two characters
   Thanks to Josip Zvijerac for the Bosnian, Serbian Latin and Serbian Cyrillic translations
   Thanks to Hakan Balci for the Turkish translation fixes
   Thanks to Kristaps Zvaigznite for the Latvian translation
   Thanks to Jennyfur for finding the issue with greek months
   Thanks to Ibrahima Sarr for the Fulah language update
   Thanks to Piotr Grajnert for the updated Polish Holidays
   Added the ability to hightlight holiday cell with no holiday text
   Thanks to Andrej Damjanovic for the updated holidays for Slovenia
   Added the A, B, C and D holiday cell styles

   To add a new language, insert the English name for it into the
   settings.languageOptions array towards the top of this file. Then
   create an "else if" case int he selectLanguage function at the 
   bottom of the file.
*/

/********************************************************************/
// Variable Declarations                                            
/********************************************************************/
var titleString       = "Adobe InDesign Calendar Wizard: Version 4.1.2";

var calendarDatesRegExp      = new RegExp( "calendarDates(.*)" )
var calendarJulianDateRegExp = new RegExp( "calendarJulianDate(.*)" )
var calendarTextRegExp       = new RegExp( "calendarText(.*)" )
var calendarHolidaysRegExp   = new RegExp( "calendarHolidays(.*)" )
var calendarMoonsRegExp      = new RegExp( "calendarMoons(.*)" )
var calendarPicturesRegExp   = new RegExp( "calendarPictures(.*)" )
var calendarBackgroundRegExp = new RegExp( "calendarBackground(.*)" )
var numberRegExp             = new RegExp( "[0-9.]+" );
// --------------------------------------------------------------- //

var selector = new Object;
var settings = new Object;

// Calendar Generation Options
settings.title = titleString;  //Set the title  so it can be displayed in the dialog box
settings.today       = new Date();
settings.yearOptions = new Array( (settings.today.getFullYear()-8)+"",
                                  (settings.today.getFullYear()-7)+"",
                                  (settings.today.getFullYear()-6)+"",
                                  (settings.today.getFullYear()-5)+"",
                                  (settings.today.getFullYear()-4)+"",
                                  (settings.today.getFullYear()-3)+"",
                                  (settings.today.getFullYear()-2)+"",
                                  (settings.today.getFullYear()-1)+"",
                                  (settings.today.getFullYear()  )+"",
                                  (settings.today.getFullYear()+1)+"",
                                  (settings.today.getFullYear()+2)+"",
                                  (settings.today.getFullYear()+3)+"",
                                  (settings.today.getFullYear()+4)+"",
                                  (settings.today.getFullYear()+5)+"",
                                  (settings.today.getFullYear()+6)+"",
                                  (settings.today.getFullYear()+7)+"",
                                  (settings.today.getFullYear()+8)+"",
                                  (settings.today.getFullYear()+9)+"",
                                  (settings.today.getFullYear()+10)+"",
                                  (settings.today.getFullYear()+11)+"",
                                  (settings.today.getFullYear()+12)+"",
                                  (settings.today.getFullYear()+13)+"",
                                  (settings.today.getFullYear()+14)+"",
                                  (settings.today.getFullYear()+15)+"",
                                  (settings.today.getFullYear()+16)+"",
                                  (settings.today.getFullYear()+17)+"",
                                  (settings.today.getFullYear()+18)+"",
                                  (settings.today.getFullYear()+19)+"",
                                  (settings.today.getFullYear()+20)+""
                                  );
settings.startDayOptions         = new Array( 'Sunday', 'Monday', 'Saturday');
settings.monthOptions            = new Array( 'January', 'February', 'March', 'April', 'May', 'June',
                                              'July', 'August', 'September', 'October', 'November', 'December');
settings.maxRowCountOptions      = new Array( 'Auto', '5', '6' );
settings.workWeekStartOptions    = new Array( 'First Full Week', 'Week including Jan 1' );
settings.colorSpaceOptions       = new Array( 'CMYK', 'RGB', "Lab" );
settings.calendarsPerPageOptions = new Array( '1', '2', '3', '4', '6', '8', '9', '10', '12');
settings.pageTypeOptions         = new Array( 'Auto', 'Current Text Frame', 'New Document', 'Current Document' );
settings.pageOrientationOptions  = new Array( 'default', 'Portrait', 'Landscape' );
settings.pageSizeOptions            = new Array( "Letter", "Legal", "Tabloid", "Letter - Half", "Legal - Half", "A3", "A4", "A5", "B5" ); 
settings.calendarCustomSizeUnitOptions = new Array( 'inches', 'points', 'centimeters' );
settings.styleSetOptions         = new Array( '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15' );
settings.headerOptions           = new Array( "Auto", "Short: S", "Mid: Sun", "Full: Sunday");
settings.languageOptions         = new Array( 'English', 
                                              'Arabic (عربي)',
                                              'Azerbaijani',
                                              'Bosnian',                                             
                                              'Bulgarian',
                                              'Catalan',
                                              'Chinese (繁體中文)',
                                              'Croatian',
                                              'Czech',
                                              'Basque',
                                              'Danish',
                                              'Dutch', 
                                              'Estonian', 
                                              'Fulah',
                                              'Finnish',
                                              'French', 
                                              'German', 
                                              'Greek',
                                              'Hungarian', 
                                              'Icelandic',
                                              'Italian', 
                                              'Latvian',                                              
                                              'Lithuanian',
                                              'Norwegian', 
                                              'Polish', 
                                              'Portuguese',
                                              'Romanian',
                                              'Russian',
                                              'Serbian Latin',
                                              'Serbian Cyrillic',
                                              'Slovak',
                                              'Slovenian',
                                              'Spanish', 
                                              'Swedish',
                                              'Turkish'
                                            );

// defaults for calendar generation
settings.calendarSpacing = 0.25;
settings.calendarVerticalSpacing   = settings.calendarSpacing;
settings.calendarHorizontalSpacing = settings.calendarSpacing;
settings.miniCalendarSize = new Array( "2in", "2in", "2.75in", "2.75in" ); // 0.75 inches square
settings.workWeekCellWidth = 0.25;

// Used for tracking progress
settings.calendarDateLabel       = 'calendarDates';
settings.calendarJulianDateLabel = 'calendarJulianDate';
settings.calendarHolidayLabel    = 'calendarHolidays';
settings.calendarTextLabel       = 'calendarText';
settings.calendarMoonsLabel      = 'calendarMoons';
settings.calendarPicturesLabel   = 'calendarPictures';
settings.calendarBackgroundLabel = 'calendarBackground';

// --------------------------------------------------------------- //
// Main Application
// --------------------------------------------------------------- //

IdentifyInDesignVersionAndFeatures( settings );

if( settings.bCS || settings.bCS2 )
{
   settings.holidaysFolder = new Folder( Folder.startup + "/Presets/Scripts/calendarWizard/holidays" );
   settings.help = new File( Folder.startup + "/Presets/Scripts/calendarWizard/README" );
}
else
{
   settings.holidaysFolder = new Folder($.fileName.substring( 0, $.fileName.indexOf( "calendarWizard.js" ) ) + "holidays");
   settings.help = new File($.fileName.substring( 0, $.fileName.indexOf( "calendarWizard.js" ) ) + "README");
}
settings.bHolidaysFile = new Array();

if( bGetUserInput( settings, selector ) )
{
   if (settings.bShowHelp) 
   {
      GetTheDocument( settings );
      GetThePage( settings, 0 );
      GetTheFrame( settings, 0 );

      ShowHelp( settings );
   }
   else
   {
      GetHolidays( settings );

      GetTheDocument( settings );

      SetTheDocumentStyles( settings );

      MakeCalendars( settings );

      PlaceCalendarsOnAppropriateLayers( settings );

      CleanUp( settings );
   }
}
// --------------------------------------------------------------- //
function CleanUp( settings )
{
   with(settings.currentDocument.viewPreferences)
   {
      rulerOrigin                = settings.originalRulerOrigin;
      horizontalMeasurementUnits = settings.originalHorizontalMeasurementUnits;
      verticalMeasurementUnits   = settings.originalVerticalMeasurementUnits;
   }

   app.select( NothingEnum.nothing );

   return;
}
// --------------------------------------------------------------- //
function GetHolidays( settings )
{
   var count = 0;
   var i;
   var holidays;
   var styles;
   var items;

   settings.holidayGroups              = new Array();
   settings.holidayGroupStyles      = new Array();

   if( settings.bGetFrameHolidays )
   {
      settings.holidayGroups.push( GetFrameHolidays( settings ) );
      settings.holidayGroupStyles.push( settings.GetHolidaysFromCurrentFrameStyle );
   }

   if( settings.bGetFileHolidays )
   {
      items = GetFileHolidays( settings );
      holidays = items[0];
      styles = items[1];

      for( i = 0; i < holidays.length; i++ )
      {
          settings.holidayGroups.push( holidays[i] );
          settings.holidayGroupStyles.push( styles[i] );
      }
   }

   if( settings.bGetCustomHolidays )
   {
      settings.holidayGroups.push( GetCustomHolidays( settings ) )
      settings.holidayGroupStyles.push( settings.GetHolidaysFromCustomFilesStyle );
   }

   return;
}
// --------------------------------------------------------------- //
function  MakeCalendars( settings )
{
   var iYear  = settings.iStartYear;
   var iMonth = settings.iStartMonth;
   var iCalendarCount = 0;

   while( ( iYear < settings.iEndYear ) || 
          ( (iYear == settings.iEndYear && iMonth <= settings.iEndMonth ) ) )
   {

      GetThePage( settings, iCalendarCount );
      GetTheFrame( settings, iCalendarCount );

      // false indicates the calendar is not a miniCalendar
      buildCalendar( settings, settings.currentFrame, iMonth, iYear, false );

      var next = nextMonth( iMonth, iYear );
      iMonth = next[0];
      iYear = next[1];
      iCalendarCount++;
   }

   return;
}
// --------------------------------------------------------------- //
function labelMonthAndWeekDayRows( settings, table )
{
   if( !settings.bCS )
   {
      myRow = table.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         myCells = myRow.cells;
         for( i = 0; i < myCells.length; i++ )
         {
            myCells.item(i).label = "MonthName";
         }
         myRow = table.rows.nextItem( myRow );
      }
      
      if( !settings.bExcludeWeekDayNames )
      {
         myCells = myRow.cells;
         for( i = 0; i < myCells.length; i++ )
         {
            myCells.item(i).label = "WeekDayName";
         }
      }
   }
}
// --------------------------------------------------------------- //
function buildCalendar( settings, frame, iMonth, iYear, bMiniCalendar )
{
   var dayOrdering = settings.dayOrdering;
   var iFixedRowCount = settings.iFixedRowCount;

   var buffer;
   var days;
   var strokeWidth;
   var frameBounds;
   var selectedStyle;
   var myRow;
   var myCells;
   var day;
   var dateBuffer;
   var workWeek;
   var bIncludeHeaderInCompact;
   var startCellCount = 0;

   var month = settings.months[ iMonth ];
   var bSplitCell = false;
   var stroke = 1/72;
   var calendarColumnCount = 7;
   var initialRows = 2;
   var leftIndex = 0;
   var rightIndex = 2;

   var myDocument = settings.currentDocument;
   var myCalendar;
   var i;
   var miniLeftTextFrame;
   var next;
   var miniRightTextFrame;
   var date;
   var startDay;
   var endDate;
   var daysInTheMonth = new Array();
   var daysInThePreviousMonth;
   var daysInTheNextMonth;
   var bStarted;
   var strokeHeight;
   var cellHeight;
   var rowStart;
   var holidaysTextFrame;
   var myMasterRow;
   var mySlaveRow;
   var myMasterColumn;
   var mySlaveColumn;
   var textTextFrame;
   var bufferStroke;
   var cellWidth;

   var julianDateTextFrame;
   var julianDateCalendar
   var moonsTextFrame;
   var moonsCalendar;
   var picturesTextFrame;
   var picturesCalendar;
   var backgroundTextFrame;
   var backgroundCalendar;
   var styles;
   var rowOffset;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*/;

   // needed to map the cell label to cell id since CS has no label...
   var csLabelMap = new Array;
   var bufferLabel;

   if( settings.bAddWorkWeek && ! bMiniCalendar )
   {
      calendarColumnCount = 8;
      startCellCount = 1;
   }

   if( bMiniCalendar )
   {
       iFixedRowCount = 6;
   }

   with( frame )
   {
      frameBounds = geometricBounds;

      // get the array of day names
      if( settings.headerType == "Short: S" )
      {
         days = settings.daysShort;
      } 
      else if( settings.headerType == "Mid: Sun" )
      {
         days = settings.daysMid;
      } 
      else if( settings.headerType == "Full: Sunday" )
      {
         days = settings.daysLong;
      }
      else if( ( frameBounds[3] - frameBounds[1] ) >= 7.5 )
      {
         days = settings.daysLong;
      }
      else if( ( frameBounds[3] - frameBounds[1] ) >= 3 )
      {
         days = settings.daysMid;
      }
      else
      {
         days = settings.daysShort;
      }

      if( bMiniCalendar ) 
      {
         strokeWidth = 0;
      }
      else
      {
         strokeWidth = stroke;
      }

      // create the table which will be the calendar.
      myCalendar = frame.parentStory.tables.add({bodyRowCount: (initialRows + iFixedRowCount), 
                                                     columnCount:calendarColumnCount,
                                                     width:(frameBounds[3]-frameBounds[1]-(strokeWidth))});

      with( myCalendar )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         if( settings.bCS )
         {
            bodyRowCount = initialRows + iFixedRowCount;
            columnCount = calendarColumnCount;
            width = frameBounds[3]-frameBounds[1]-strokeWidth;
         }

         // Default the styles in the cell
         if( settings.bCellStyles == true )
         {
            bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
            appliedTableStyle = myDocument.tableStyles.item(selectedStyle + settings.styleSet);

            bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
            rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
         }
         else
         {
            myCells = cells.everyItem().getElements();   
            for( i = 0; i < myCells.length; i++ )
            {
               // default the style of the paragraph.
               // this is most important in the compact mode, where
               // the default style will prevent the cell from being 
               // sized small enough
               bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
               myCells[i].insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
               if( bMiniCalendar )
               {
                  myCells[i].topEdgeStrokeWeight    = "0in";
                  myCells[i].leftEdgeStrokeWeight   = "0in";
                  myCells[i].bottomEdgeStrokeWeight = "0in";
                  myCells[i].rightEdgeStrokeWeight  = "0in";
                  myCells[i].topInset    = (1/72) + "in";
                  myCells[i].leftInset   = (1/72) + "in";
                  myCells[i].bottomInset = (1/72) + "in";
                  myCells[i].rightInset  = (1/72) + "in";
               }
            }
         }

         // set the title cell (month + year)
         if( !settings.bExcludeMonthName )
         {
            myRow = rows.firstItem();

            // this is needed to set the header row; but it toasts the logic for creating the
            // text layer and holiday layer tables... so I'll comment it out for now.
            //if( settings.bCellStyles ) )
            //{
            //   myRow.rowType = RowTypes.HEADER_ROW;
            //}
            if( settings.bAddWorkWeek && ! bMiniCalendar )
            {
               leftIndex++;
               rightIndex++;

               if( settings.bCellStyles )
               {
                  myRow.cells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
               }
               else
               {
                  myRow.cells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
               }   

            }

            if( settings.bAddMiniCalendars && !bMiniCalendar )
            {

               // merge the middle cells
               myRow.cells.item(leftIndex+1).merge( myRow.cells.itemByRange( leftIndex+1, calendarColumnCount-2 ) );
               buffer = rows.firstItem().cells.item(leftIndex+1);

               // Set the style for the minicalendar on the left and right cells
               if( settings.bCellStyles )
               {
                   myRow.cells.item(leftIndex).appliedCellStyle = myDocument.cellStyles.item("cal_leftMiniCalendar" + settings.styleSet);
                   myRow.cells.item(rightIndex).appliedCellStyle = myDocument.cellStyles.item("cal_rightMiniCalendar" + settings.styleSet);
               }
               else
               {
                   myRow.cells.item(leftIndex).insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item( "cal_leftMiniCalendar" + settings.styleSet );
                   myRow.cells.item(rightIndex).insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item( "cal_rightMiniCalendar" + settings.styleSet );

                   myRow.cells.everyItem().leftEdgeStrokeWeight = "0in";
                   myRow.cells.everyItem().topEdgeStrokeWeight = "0in";
                   myRow.cells.everyItem().rightEdgeStrokeWeight = "0in";
               }

               // add the mini calendar on the left
               if( settings.bCS || settings.bCS2 )
               {
                  miniLeftTextFrame = settings.currentPage.textFrames.add( { geometricBounds:settings.miniCalendarSize } );

                  // needed because of a bug in CS
                  miniLeftTextFrame.geometricBounds = settings.miniCalendarSize;

                  next = previousMonth( iMonth, iYear );
                  buildCalendar( settings, miniLeftTextFrame, next[0], next[1], true );

                  app.select( miniLeftTextFrame );
                  app.cut();
                  app.select( myRow.cells.item(leftIndex).insertionPoints.firstItem() );
                  app.paste();
               }
               else
               {
                  miniLeftTextFrame = myRow.cells.item(leftIndex).insertionPoints.firstItem().textFrames.add( { geometricBounds:settings.miniCalendarSize } );
                  next = previousMonth( iMonth, iYear );
                  buildCalendar( settings, miniLeftTextFrame, next[0], next[1], true );
               }

               // add the mini calendar on the right
               if( settings.bCS || settings.bCS2 )
               {
                  miniRightTextFrame = settings.currentPage.textFrames.add( { geometricBounds:settings.miniCalendarSize } );

                  // needed because of a bug in CS
                  miniRightTextFrame.geometricBounds = settings.miniCalendarSize;

                  next = nextMonth( iMonth, iYear );
                  buildCalendar( settings, miniRightTextFrame, next[0], next[1], true );

                  app.select( miniRightTextFrame );
                  app.cut();
                  app.select( myRow.cells.item(rightIndex).insertionPoints.firstItem() );
                  app.paste();
               }
               else
               {
                  miniRightTextFrame = myRow.cells.item(rightIndex).insertionPoints.firstItem().textFrames.add( { geometricBounds:settings.miniCalendarSize } );
                  next = nextMonth( iMonth, iYear );
                  buildCalendar( settings, miniRightTextFrame, next[0], next[1], true );
               }

               app.select( NothingEnum.nothing );
            }
            else
            {
               myRow.cells.item(leftIndex).merge( myRow.cells.itemByRange( leftIndex, calendarColumnCount-1 ) );
               buffer = rows.firstItem().cells.item(leftIndex);
            }

            // Set the style and contents of the merged middle cells
            buffer.contents = month + " " + iYear;

            // Set the cell style
            styles = new Object();
            styles.miniStyle = 'calMini_title';
            styles.defaultStyle = 'cal_title';
            styles.paragraphMiniStyle = 'calMini_title';
            styles.paragraphDefaultStyle =  'cal_title';
            setStyle( settings, bMiniCalendar, styles, buffer );
   
            // this call makes the cell render, so that the height may be asked for
            buffer = rows.firstItem().cells.firstItem().contents;  
         }

         // set the day header cells
         if( ! settings.bExcludeWeekDayNames ){
            if( myRow == null )
            {
               myRow = rows.firstItem();
            }
            else
            {
               myRow = rows.nextItem( myRow );
            }
            myCells = myRow.cells;
            for( i = startCellCount; i < myCells.length; i++ )
            {   
               myCells.item(i).contents = days[(settings.dayOrdering[i - startCellCount])];

               if( settings.bCellStyles )
               {
                   bMiniCalendar ? selectedStyle = "calMini_day" : selectedStyle = "cal_day";
                   myCells.item(i).appliedCellStyle = myDocument.cellStyles.item( selectedStyle + settings.styleSet);
               }
               else
               {
                   bMiniCalendar ? selectedStyle = "calMini_dayCellBackground" : selectedStyle = "cal_dayCellBackground";
                   myCells.item(i).fillColor = myDocument.colors.item(selectedStyle + settings.styleSet);
                   bMiniCalendar ? selectedStyle = "calMini_day" : selectedStyle = "cal_day";
                   myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                   myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
               }
            }
            
            if( settings.bAddWorkWeek && ! bMiniCalendar )
            {
               if( settings.bCellStyles )
               {
                  myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
               }
               else
               {
                  myCells.item(0).rotationAngle = 270;
                  myCells.item(0).verticalJustification = VerticalJustification.centerAlign;
                  myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
               }
            }
         }
         
         // this call makes the cell render, so that the height may be asked for
         //?? why is this here?
         // buffer = myCells.firstItem().contents;

         // figure out how many days in the month, and what day of the week to start on
         date = new Date( iYear, iMonth, 1);
         startDay = date.getDay();  // day of the week
         endDate  = GetDaysInMonth( iYear, iMonth )
         for( i = 0; i < endDate; i++ )
         {
            daysInTheMonth[i] = (endDate - i) + "";
         }

         if( settings.bAddNonMonthDays )
         {
            daysInThePreviousMonth = new Array();
            daysInTheNextMonth     = new Array();

            if( iMonth == 0 )
            {
               endDate = GetDaysInMonth( iYear-1, 11 );
            }
            else
            {
               endDate = GetDaysInMonth( iYear, iMonth-1 );
            }

            for( i = 0; i < endDate; i++ )
            {
               daysInThePreviousMonth[i] = (endDate - i) + "";
            }

            if( iMonth == 11 )
            {
               endDate = GetDaysInMonth( iYear+1, 0 );
            }
            else
            {
               endDate = GetDaysInMonth( iYear, iMonth+1 );
            }

            for( i = 0; i < endDate; i++ )
            {
               daysInTheNextMonth[i] = (endDate - i) + "";
            }
         }

         // start the days...
         bStarted         = false;
         bWorkWeekLabeled = false;
         if( myRow == null )
         {
            myRow = rows.firstItem();
         }
         else
         {
            myRow = rows.nextItem( myRow );
         }
         try{ myCells = myRow.cells; }
         catch( myError ) {
               myRow = rows.add();
               myRow.cells.everyItem().label = "";
               if( settings.bCS )
               {
                  myRow = rows.lastItem();
               }
               myCells = myRow.cells;
         }

         for( i = startCellCount; i < myCells.length; i++ )
         {
            if( settings.bCS2 || settings.bCS )
            {
                myCells.item(i).fillColor = app.activeDocument.swatches.item(0); // nullSwatch 
            }

            if( bStarted || startDay == settings.dayOrdering[i - startCellCount] )
            {
               bStarted = true;
               day = daysInTheMonth.pop()
               myCells.item(i).contents = day;

               if( settings.bCS )
               {
                  csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }
               else
               {
                  myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }

               if( settings.bAddWorkWeek && !bWorkWeekLabeled && !bMiniCalendar )
               {
                  workWeek = getWorkWeek( settings, iYear, iMonth, parseInt(day) );
                  myCells.item(0).contents = workWeek.toString();

                  if( settings.bCellStyles )
                  {
                     myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
                  }
                  else
                  {
                     myCells.item(0).rotationAngle = 270;
                     myCells.item(0).verticalJustification = VerticalJustification.centerAlign;
                     myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
                  }   

                  bWorkWeekLabeled = true;
               }

               if( settings.bCellStyles )
               {
                  bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                  myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  myCells.item(i).clearCellStyleOverrides( true );
                  myCells.item(i).insertionPoints.everyItem().clearOverrides( OverrideType.ALL );
               }
               else
               {
                   bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                   myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
               }

               // needs to be after the clearCellStyleOverrides
               if( settings.bCS )
               {
                  csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }
               else
               {
                  myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
               }

            }
            else
            {
               if( settings.bAddNonMonthDays )
               {
                  if( startDay + startCellCount - settings.dayOrdering[0] - i - 1 < 0 )
                  {
                     // this is the case when the first day of the month is Sunday and calendar starts on Monday.
                     myCells.item(i).contents = daysInThePreviousMonth[ startDay + startCellCount - settings.dayOrdering[0] - i - 1 + 7 ];
                  }
                  else
                  {
                     myCells.item(i).contents = daysInThePreviousMonth[ startDay + startCellCount - settings.dayOrdering[0] - i - 1 ];
                  }

                  if( settings.bCS )
                  {
                     csLabelMap[ myCells.item(i).id ] = " ";
                  }
                  else
                  {
                     myCells.item(i).label = " ";
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                      myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  }
                  else
                  {
                      bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                      myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );  
                  }
               }
               else
               {
                  myCells.item(i).contents = '';

                  if( settings.bCS )
                  {
                     csLabelMap[ myCells.item(i).id ] = " ";
                  }
                  else
                  {
                     myCells.item(i).label = " ";
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
                      myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                  }
               }
            }

            if( !settings.bCellStyles )
            {
                if( bMiniCalendar )
                {
                   myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
                }
                else
                {
                   myCells.item(i).verticalJustification = VerticalJustification.topAlign;
                }
            }
         }            

         // continue the days...  
         while( daysInTheMonth.length > 0 )
         {
            bWorkWeekLabeled = false;
            myRow = rows.nextItem( myRow );
            try{ myCells = myRow.cells; }
            catch( myError ) {
               if( iFixedRowCount == 0 )
               {
                  myRow = rows.add();
                  myRow.cells.everyItem().label = "";
                  if( settings.bCS )
                  {
                     myRow = rows.lastItem();
                  }

                  if( settings.bCellStyles )
                  {
                      bMiniCalendar ? selectedStyle = "calMini_empty" : selectedStyle = "cal_empty";
                      myRow.cells.everyItem().appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet)
                  }

                  myCells = myRow.cells;
               }
               else
               {
                  bSplitCell = true;
                  myRow = rows.lastItem();
                  myCells = myRow.cells;
               }
            }

            for( i = startCellCount; i < myCells.length; i++ )
            {
               if( daysInTheMonth.length > 0 )
               {
                  if( !bSplitCell )
                  {
                     day = daysInTheMonth.pop()
                     myCells.item(i).contents = day;

                     if( settings.bAddWorkWeek && !bWorkWeekLabeled && !bMiniCalendar )
                     {
                         workWeek = getWorkWeek( settings, iYear, iMonth, parseInt(day) );
                        myCells.item(0).contents = workWeek.toString();

                        if( settings.bCellStyles )
                        {
                           myCells.item(0).appliedCellStyle = myDocument.cellStyles.item("calWorkWeek_text" + settings.styleSet);
                        }
                        else
                        {
                           myCells.item(0).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_workWeek" + settings.styleSet);
                        }   

                        bWorkWeekLabeled = true;
                     }

                     if( settings.bCellStyles )
                     {
                        bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                        myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                        myCells.item(i).clearCellStyleOverrides( true );
                        myCells.item(i).insertionPoints.everyItem().clearOverrides( OverrideType.ALL );
                     }
                     else
                     {
                        bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                        myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);

                        if( bMiniCalendar )
                        {
                           myCells.item(i).verticalJustification = VerticalJustification.centerAlign;
                        }
                        else
                        {
                           myCells.item(i).verticalJustification = VerticalJustification.topAlign;
                        }
                     }

                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }
                     else
                     {
                        // needs to be after the clearCellStyleOverrides
                        myCells.item(i).label = (iMonth+1).toString() + "-" + day + "-" + iYear.toString();
                     }
                  }
                  else
                  {
                      //something else to find...
                     if( settings.bCellStyles )
                     {
                         myCells.item(i).appliedCellStyle = myDocument.cellStyles.item( "cal_dateSplitCell" + settings.styleSet );
                     }
                     else
                     {
                        myCells.item(i).topLeftDiagonalLine = true;
                        myCells.item(i).verticalJustification = VerticalJustification.justifyAlign;
                      }
                     myCells.item(i).contents = myCells.item(i).contents + "\r" + daysInTheMonth.pop();

                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = " ";
                     }
                     else
                     {
                        myCells.item(i).label = " ";
                     }

                     bMiniCalendar ? selectedStyle = "calMini_date" : selectedStyle = "cal_date";
                     myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                     bMiniCalendar ? selectedStyle = "calMini_date_splitCellSecondLine" : selectedStyle = "cal_date_splitCellSecondLine";
                     myCells.item(i).insertionPoints.lastItem().appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                  }
               }
               else
               {
                  if( settings.bAddNonMonthDays )
                  {
                     myCells.item(i).contents = daysInTheNextMonth.pop();

                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = " ";
                     }
                     else
                     {
                        myCells.item(i).label = " ";
                     }

                     if( settings.bCellStyles )
                     {
                         bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                         myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                     }
                     else 
                     {
                         bMiniCalendar ? selectedStyle = "calMini_nonMonthDay" : selectedStyle = "cal_nonMonthDay";
                         myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                     }
                  }
                  else
                  {
                     if( settings.bCS )
                     {
                        csLabelMap[ myCells.item(i).id ] = " ";
                     }
                     else
                     {
                        myCells.item(i).label = " ";
                     }
                  }

               }
            }            
         }

         if( settings.bCS )
         {
            for( i = 0; i < csLabelMap.length; i++ )
            {
               try{ csLabelMap[i].match( numberRegExp ) }
               catch( myError ){ csLabelMap[i] = "unlabeled"}
            }

            settings.csLabelMap = csLabelMap;
         }

         // set the style for Sunday
         if( settings.bHighlightSundays )
         {
             rowStart = 2;
             if( settings.bExcludeMonthName )
             {
                rowStart = rowStart - 1;
             }
             if( settings.bExcludeWeekDayNames )
             {
                rowStart = rowStart - 1;
             }

             if( settings.dayOrdering[0] == 0 )
             {
                if( settings.bAddWorkWeek && !bMiniCalendar )
                {
                   myCells = columns.item(1).cells;
                   for( i = rowStart; i < myCells.length; i++ )
                   {
                      bufferLabel = " ";
                      if( settings.bCS )
                      {
                         bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                      }
                      else
                      {
                         bufferLabel = myCells.item(i).label;
                      }

                      if(  settings.bAddNonMonthDays && !bufferLabel.match( dateWithYearRegExp )  )
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                         }                  
                      }
                      else
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }                  
                      }

                   }
                }
                else
                {
                   myCells = columns.item(0).cells;
                   for( i = rowStart; i < myCells.length; i++ )
                   {
                      bufferLabel = " ";
                      if( settings.bCS )
                      {
                         bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                      }
                      else
                      {
                         bufferLabel = myCells.item(i).label;
                      }

                      if(  settings.bAddNonMonthDays && !bufferLabel.match( dateWithYearRegExp )  )
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }                  
                      }
                      else
                      {
                         if( settings.bCellStyles )
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                         }
                         else 
                         {
                             bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                             myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                         }                  
                      }
                   }
                }
             }
             else
             {
                //when the cell spans several columns, it is not included in the cells of the last column. so we
                //need to account for this
                //
                //Mini-calendars don't have mini-calendars, so the title will span the whole length and therefore
                // we need to take 1 away.  If mini-calendars are not included, we also need to take 1 away as
                // the title spans the whole lenth.
                if( bMiniCalendar || !settings.bAddMiniCalendars ) {
                    rowOffset = 1;
                } else {
                    rowOffset = 0;
                }

                myCells = columns.lastItem().cells;
                for( i = (rowStart - rowOffset); i < myCells.length; i++ )
                {                   
                   bufferLabel = " ";
                   if( settings.bCS )
                   {
                      bufferLabel = settings.csLabelMap[ myCells.item(i).id ];
                   }
                   else
                   {
                      bufferLabel = myCells.item(i).label;
                   }

                   if(  settings.bAddNonMonthDays && !bufferLabel.match( dateWithYearRegExp )  )
                   {
                      if( settings.bCellStyles )
                      {
                          bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                          myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                      }
                      else 
                      {
                          bMiniCalendar ? selectedStyle = "calMini_nonMonthSunday" : selectedStyle = "cal_nonMonthSunday";
                          myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item(selectedStyle + settings.styleSet);
                      }                  
                   }
                   else
                   {
                      if( settings.bCellStyles )
                      {
                          bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                          myCells.item(i).appliedCellStyle = myDocument.cellStyles.item(selectedStyle + settings.styleSet);
                      }
                      else 
                      {
                          bMiniCalendar ? selectedStyle = "calMini_sunday" : selectedStyle = "cal_sunday";
                          myCells.item(i).insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item( selectedStyle + settings.styleSet );
                      }                  
                   }
                }
             }
         }

         // adjust the cell height

         // measure the last row (as the first may have the work week)
         myCells = columns.lastItem().cells;
         strokeHeight = (myCells[ myCells.length-1 ].bottomEdgeStrokeWeight)/72;

         // adjust the first row
         myCells = columns.firstItem().cells;

         if( settings.bCS )
         {
            // in CS, the bottomEdgeStrokeWeight doesn't seem to work, so I'm hard
            // coding it to 1/72
            strokeHeight = stroke;
         }

//         if( _bCompact == 1 && _bIncludeHeaderInCompact == 0 ) 
//         {
//            rowStart = 1;
//            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
//         }
//         else
//         {
         rowStart = 2;
         if( settings.bExcludeMonthName && settings.bExcludeWeekDayNames )
         {
            rowStart = rowStart - 2;
            cellHeight = ((frameBounds[2] - frameBounds[0] - strokeHeight)/(myCells.length));
         }
         else if( settings.bExcludeMonthName || settings.bExcludeWeekDayNames )
         {
            rowStart = rowStart - 1;
            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - strokeHeight)/(myCells.length - 1));
         } else {
            cellHeight = ((frameBounds[2] - frameBounds[0] - myCells[0].height - myCells[1].height  - strokeHeight)/(myCells.length - 2));
         }
//         }

         for( i = rowStart; i < myCells.length; i++ )
         {
            myCells[i].height = cellHeight;
         }

         // adjust the widths if work week is displayed
         if( settings.bAddWorkWeek && !bMiniCalendar )
         {
            myCells = rows.item(4).cells;  //get a row cells which display the dates
            bufferStroke = ( myCells[ myCells.length-1 ].rightEdgeStrokeWeight)/72;
            myCells[0].width = settings.workWeekCellWidth;

            cellWidth = ((frameBounds[3] - frameBounds[1] - myCells[0].width - bufferStroke)/(myCells.length - 1));
            rowStart = 1;
            if( settings.bExcludeMonthName )
            {
               rowStart = rowStart - 1;
            }
            for( i = rowStart; i < myCells.length; i++ )
            {
               myCells[i].width = cellWidth;
            }
         }
      }
      labelMonthAndWeekDayRows( settings, myCalendar )
   }

   if( settings.bHolidaysLayer && !bMiniCalendar)
   {
      holidaysTextFrame = settings.currentPage.textFrames.add( settings.holidaysLayer );
      if( settings.bFrameNameSupported == true )
      {
         holidaysTextFrame.name = settings.calendarHolidayLabel + settings.iCalendarCount;
      }
      holidaysTextFrame.label = settings.calendarHolidayLabel + settings.iCalendarCount;
      holidaysTextFrame.geometricBounds = frame.geometricBounds;

      holidaysCalendar = holidaysTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                   columnCount:myCalendar.columnCount
                                                                 });
      if( settings.bCellStyles )
      {
          holidaysCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_holiday" + settings.styleSet);
          holidaysCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holidayText" + settings.styleSet);
          if(!settings.bExcludeMonthName )
          {
             holidaysCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_holidayTitle" + settings.styleSet);
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         holidaysCalendar.bodyRowCount = myCalendar.bodyRowCount;
         holidaysCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = holidaysCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = holidaysCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = holidaysCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          holidaysCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          holidaysCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_holiday" + settings.styleSet);
          holidaysCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }

      // disabled because it causes the myCalendar to change layers
      addHolidayText( settings, iYear, myCalendar, holidaysCalendar );
      labelMonthAndWeekDayRows( settings, holidaysCalendar )
   }

   if( settings.bJulianDateLayer && !bMiniCalendar)
   {
      julianDateTextFrame = settings.currentPage.textFrames.add( settings.julianDateLayer );
      if( settings.bFrameNameSupported == true )
      {
         julianDateTextFrame.name = settings.calendarJulianDateLabel + settings.iCalendarCount;
      }
      julianDateTextFrame.label = settings.calendarJulianDateLabel + settings.iCalendarCount;
      julianDateTextFrame.geometricBounds = frame.geometricBounds;

      julianDateCalendar = julianDateTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                       columnCount:myCalendar.columnCount
                                                                      });
      if( settings.bCellStyles )
      {
          julianDateCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_julianDate" + settings.styleSet);
          julianDateCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_julianDateText" + settings.styleSet);
          if(!settings.bExcludeMonthName )
          {
             julianDateCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_julianDateTitle" + settings.styleSet);
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         julianDateCalendar.bodyRowCount = myCalendar.bodyRowCount;
         julianDateCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = julianDateCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = julianDateCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = julianDateCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          julianDateCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_julianDate" + settings.styleSet);;
      }

      // disabled because it causes the myCalendar to change layers
      addJulianDates( settings, myCalendar, julianDateCalendar );
      labelMonthAndWeekDayRows( settings, julianDateCalendar )
   }

   if( settings.bMoonsLayer && !bMiniCalendar)
   {
      moonsTextFrame = settings.currentPage.textFrames.add( settings.moonsLayer );
      if( settings.bFrameNameSupported == true )
      {
         moonsTextFrame.name = settings.calendarMoonsLabel + settings.iCalendarCount;
      }
      moonsTextFrame.label = settings.calendarMoonsLabel + settings.iCalendarCount;
      moonsTextFrame.geometricBounds = frame.geometricBounds;

      moonsCalendar = moonsTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                             columnCount:myCalendar.columnCount
                                                            });
      if( settings.bCellStyles )
      {
          moonsCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_moon" + settings.styleSet);
          moonsCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_moonText" + settings.styleSet);
          if(!settings.bExcludeMonthName )
          {
             moonsCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_moonTitle" + settings.styleSet);
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         moonsCalendar.bodyRowCount = myCalendar.bodyRowCount;
         moonsCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = moonsCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = moonsCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = moonsCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          moonsCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          moonsCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_moon" + settings.styleSet);
          moonsCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }

      // disabled because it causes the myCalendar to change layers
      addMoons( settings, myCalendar, moonsCalendar );
      labelMonthAndWeekDayRows( settings, moonsCalendar )
   }

   if( settings.bPicturesLayer && !bMiniCalendar)
   {
      picturesTextFrame = settings.currentPage.textFrames.add( settings.picturesLayer );
      if( settings.bFrameNameSupported == true )
      {
         picturesTextFrame.name = settings.calendarPicturesLabel + settings.iCalendarCount;
      }
      picturesTextFrame.label = settings.calendarPicturesLabel + settings.iCalendarCount;
      picturesTextFrame.geometricBounds = frame.geometricBounds;

      picturesCalendar = picturesTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                   columnCount:myCalendar.columnCount
                                                                  });
      if( settings.bCellStyles )
      {
          picturesCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_pictures" + settings.styleSet);
          picturesCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_picturesText" + settings.styleSet);
          if(!settings.bExcludeMonthName )
          {
             picturesCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_picturesTitle" + settings.styleSet);
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         picturesCalendar.bodyRowCount = myCalendar.bodyRowCount;
         picturesCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = picturesCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = picturesCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = picturesCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          picturesCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          picturesCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_pictures" + settings.styleSet);
          picturesCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }

      // disabled because it causes the myCalendar to change layers
      addPictureFrames( settings, myCalendar, picturesCalendar );
      labelMonthAndWeekDayRows( settings, picturesCalendar )
   }

   if( settings.bBackgroundLayer && !bMiniCalendar)
   {
      backgroundTextFrame = settings.currentPage.textFrames.add( settings.backgroundLayer );
      if( settings.bFrameNameSupported == true )
      {
         backgroundTextFrame.name = settings.calendarBackgroundLabel + settings.iCalendarCount;
      }
      backgroundTextFrame.label = settings.calendarBackgroundLabel + settings.iCalendarCount;
      backgroundTextFrame.geometricBounds = frame.geometricBounds;

      backgroundCalendar = backgroundTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                                       columnCount:myCalendar.columnCount
                                                                      });
      
      if( settings.bCellStyles )
      {
          backgroundCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_background" + settings.styleSet);
          backgroundCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_background" + settings.styleSet);
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         backgroundCalendar.bodyRowCount = myCalendar.bodyRowCount;
         backgroundCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = backgroundCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = backgroundCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = backgroundCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          backgroundCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          backgroundCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          backgroundCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          backgroundCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          backgroundCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_background" + settings.styleSet);
          backgroundCalendar.cells.everyItem().verticalJustification = VerticalJustification.bottomAlign;
      }
      labelMonthAndWeekDayRows( settings, backgroundCalendar )
   }

   if( settings.bTextLayer && !bMiniCalendar )
   {
      textTextFrame = settings.currentPage.textFrames.add( settings.textLayer );
      if( settings.bFrameNameSupported == true )
      {
         textTextFrame.name = settings.calendarTextLabel + settings.iCalendarCount;
      }
      textTextFrame.label = settings.calendarTextLabel + settings.iCalendarCount;
      textTextFrame.geometricBounds = frame.geometricBounds;

      textCalendar = textTextFrame.parentStory.tables.add({bodyRowCount:myCalendar.bodyRowCount, 
                                                           columnCount:myCalendar.columnCount
                                                         });
      if( settings.bCellStyles )
      {
          textCalendar.appliedTableStyle = myDocument.tableStyles.item("cal_text" + settings.styleSet);
          textCalendar.rows.everyItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_textText" + settings.styleSet);
          if(!settings.bExcludeMonthName )
          {
             textCalendar.rows.firstItem().cells.everyItem().appliedCellStyle = myDocument.cellStyles.item("cal_textTitle" + settings.styleSet);
          }
      }

      if( settings.bCS )
      {
         // in CS, the table is not made properly in the constructor, so
         // I'm setting the bounds again manually...
         textCalendar.bodyRowCount = myCalendar.bodyRowCount;
         textCalendar.columnCount = myCalendar.columnCount;
      }

      myMasterRow = myCalendar.rows.lastItem().cells;
      mySlaveRow  = textCalendar.rows.lastItem().cells;

      for( i = 0; i < myMasterRow.length; i++ )
      {
         mySlaveRow[i].width = myMasterRow[i].width;
      }

      myMasterColumn = myCalendar.columns.firstItem().cells;
      mySlaveColumn  = textCalendar.columns.firstItem().cells;

      for( i = 0; i < myMasterColumn.length; i++ )
      {
         mySlaveColumn[i].height = myMasterColumn[i].height;
      }

      mySlaveRow  = textCalendar.rows.firstItem();
      if( !settings.bExcludeMonthName )
      {
         mySlaveRow.cells.item(1).merge( mySlaveRow );
      }

      if( !settings.bCellStyles )
      {
          textCalendar.cells.everyItem().leftEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().topEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().rightEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().bottomEdgeStrokeWeight = "0in";
          textCalendar.cells.everyItem().insertionPoints.firstItem().appliedParagraphStyle = myDocument.paragraphStyles.item("cal_text" + settings.styleSet);
      }
      labelMonthAndWeekDayRows( settings, textCalendar )
   }
}
// --------------------------------------------------------------- //
function setStyle( settings, bMiniCalendar, styles, cell )
{
    var selectedStyle;

    if( settings.bCellStyles )
    {
        bMiniCalendar ? selectedStyle = styles.miniStyle : selectedStyle = styles.defaultStyle;
        cell.appliedCellStyle = settings.currentDocument.cellStyles.item( selectedStyle + settings.styleSet );
    }
    else
    {
        bMiniCalendar ? selectedStyle = styles.paragraphMiniStyle : selectedStyle = styles.paragraphDefaultStyle;
        cell.insertionPoints.item(0).appliedParagraphStyle = settings.currentDocument.paragraphStyles.item( selectedStyle + settings.styleSet);
    }

    return;
}
// --------------------------------------------------------------- //
//myGetBounds calculates and return the bounds of the "live area" of the page.
function myGetBounds(myPage, myDocument)
{
    var array = new Array()
    var item = 0;
    with (myDocument.documentPreferences)
   {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }

    with(myPage.marginPreferences)
    {
        var myX1 = left;
        var myY1 = top;
        var myY2 = bottom;
        var myX2 = right;
    }

    array[item++] = myY1;
    array[item++] = myX1;
    array[item++] = myPageHeight - myY2;
    array[item++] = myPageWidth - myX2;

   return array;
}
// --------------------------------------------------------------- //
function GetDaysInMonth(iYear, iMonth) 
{
   var daysInMonth = new Array(12);
   daysInMonth[0]  = 31; // January

   /* Leap year complexity.  if the year is evenly divisible by 400 it is a leap year
   if it is eveny divisible by 100, it is not, and lastly if it is divisible by 4 it is. */
   if( iYear % 400 == 0 )
   {
      daysInMonth[1] = 29 // February;
   }
   else if( iYear % 100 == 0 )
   {
      daysInMonth[1] = 28 // February;
   }
   else if( iYear % 4 == 0 )
   {
      daysInMonth[1] = 29 // February;
   }
   else
   {
      daysInMonth[1] = 28 // February;  
   }

   daysInMonth[2]  = 31; // March
   daysInMonth[3]  = 30; // April
   daysInMonth[4]  = 31; // May
   daysInMonth[5]  = 30; // June
   daysInMonth[6]  = 31; // July
   daysInMonth[7]  = 31; // August
   daysInMonth[8]  = 30; // September
   daysInMonth[9]  = 31; // October
   daysInMonth[10] = 30; // November
   daysInMonth[11] = 31; // December

   return daysInMonth[iMonth];

}
// --------------------------------------------------------------- //
function nextMonth( iMonth, iYear )
{
   var iNextMonth;
   var iNextYear;
   if( iMonth == 11 )
   {
      iNextMonth = 0;
      iNextYear = iYear + 1;
   }
   else
   {
      iNextMonth = iMonth + 1;
      iNextYear = iYear;
   }

   return( new Array( iNextMonth, iNextYear ) );
}
// --------------------------------------------------------------- //
function previousMonth( iMonth, iYear )
{
   var iNextMonth;
   var iNextYear;
   if( iMonth == 0 )
   {
      iNextMonth = 11;
      iNextYear = iYear - 1;
   }
   else
   {
      iNextMonth = iMonth - 1;
      iNextYear = iYear;
   }

   return( new Array( iNextMonth, iNextYear ) );
}
// --------------------------------------------------------------- //
function calendarFramePositions(settings, document)
{
   var pageOrientation = document.documentPreferences.pageOrientation;
   var page            = document.pages.item(0);

   var frameBounds = new Array();
   var frames      = new Array();
   var i = 0;
   var j = 0;
   var frameCount      = 0
   var framesPerRow    = 1;
   var framesPerColumn = 1;
   var myPageHeight;
   var myPageWidth;
   var myX1;
   var myX2;
   var myY1;
   var myY2;
   var framesPerPage          = settings.iCalendarsPerPage;
   var frameVerticalSpacing   = settings.calendarVerticalSpacing;
   var frameHorizontalSpacing = settings.calendarHorizontalSpacing;
   var dimensionY;
   var dimensionX;
   var frameCount = 0;
   var scaleFactor = 1;

   if( settings.bUseCustomSize )
   {
      if( settings.customSizeUnits == "inches" )
      {
         scaleFactor = 1;
      }
      else if( settings.customSizeUnits == "points" )
      {
         scaleFactor = 1/72;
      }
      else if( settings.customSizeUnits == "centimeters" )
      {
         scaleFactor = 0.393700787;
      }

      frames[ frameCount++ ] = new Array( settings.customSizeY1 * scaleFactor,
                                          settings.customSizeX1 * scaleFactor,
                                          settings.customSizeY2 * scaleFactor,
                                          settings.customSizeX2 * scaleFactor);
   }
   else
   {

      with (document.documentPreferences)
      {
         myPageHeight = pageHeight;
         myPageWidth = pageWidth;
      }

      with(page.marginPreferences)
      {
         myX1 = left;
         myY1 = top;
         myY2 = myPageHeight - bottom;
         myX2 = myPageWidth - right;
      }

      if( framesPerPage == 1 )
      {
         framesPerRow    = 1;
         framesPerColumn = 1;
      }
      else if( ( framesPerPage == 2 || framesPerPage == 3 ) && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 1;
         framesPerColumn = framesPerPage;
      }
      else if( ( framesPerPage == 2 || framesPerPage == 3 ) && myPageHeight < myPageWidth )
      {
         framesPerRow    = framesPerPage;
         framesPerColumn = 1;
      }
      else if( framesPerPage == 4 )
      {
         framesPerRow    = 2;
         framesPerColumn = 2;
      }
      else if( ( framesPerPage == 6 || framesPerPage == 8 || framesPerPage == 10 ) && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 2;
         framesPerColumn = framesPerPage/2;
      }
      else if( ( framesPerPage == 6 || framesPerPage == 8 || framesPerPage == 10 ) && myPageHeight < myPageWidth )
      {
         framesPerRow    = framesPerPage/2;
         framesPerColumn = 2;
      }
      else if( framesPerPage == 9 )
      {
         framesPerRow    = 3;
         framesPerColumn = 3;
      }
      else if( framesPerPage == 12 && myPageHeight >= myPageWidth )
      {
         framesPerRow    = 3;
         framesPerColumn = 4;
      }
      else if( framesPerPage == 12 && myPageHeight < myPageWidth )
      {
         framesPerRow    = 4;
         framesPerColumn = 3;
      }

      dimensionY = (myY2 - myY1 - (frameVerticalSpacing * (framesPerColumn - 1)))/framesPerColumn;
      dimensionX = (myX2 - myX1 - (frameHorizontalSpacing * (framesPerRow - 1)))/framesPerRow;

      for( var i=0; i<framesPerColumn; i++ )
      {
         frameBounds[0] = myY1 + (i * frameVerticalSpacing ) + (i+0) * dimensionY;
         frameBounds[2] = myY1 + (i * frameVerticalSpacing ) + (i+1) * dimensionY;

         for( var j=0; j<framesPerRow; j++ )
         {
            frameBounds[1] = myX1 + (j * frameHorizontalSpacing ) + (j+0) * dimensionX;
            frameBounds[3] = myX1 + (j * frameHorizontalSpacing ) + (j+1) * dimensionX;

            frames[frameCount++] = new Array(frameBounds[0], frameBounds[1], frameBounds[2], frameBounds[3]);
         }
      }
   }

   return frames;
}
// --------------------------------------------------------------- //
function addLayers( settings, myDocument )
{
   with( myDocument )
   {
      if( settings.bMoonsLayer )
      {
         try{ settings.moonsLayer = layers.item( settings.calendarMoonsLabel ).name; }
         catch (myError){
            settings.moonsLayer = layers.add({name:settings.calendarMoonsLabel});
            settings.moonsLayer.move( LocationOptions.AT_END );
         }
      }  
      if( settings.bPicturesLayer )
      {
         try{ settings.picturesLayer = layers.item( settings.calendarPicturesLabel ).name; }
         catch (myError){
            settings.picturesLayer = layers.add({name:settings.calendarPicturesLabel});
            settings.picturesLayer.move( LocationOptions.AT_END );
         }
      }
      if( settings.bBackgroundLayer )
      {
         try{ settings.backgroundLayer = layers.item( settings.calendarBackgroundLabel ).name; }
         catch (myError){
            settings.backgroundLayer = layers.add({name:settings.calendarBackgroundLabel});
            settings.backgroundLayer.move( LocationOptions.AT_END );
         }
      }
      if( settings.bDateLayer )
      {
         try{ settings.dateLayer = layers.item( settings.calendarDateLabel ).name; }
         catch (myError){
            settings.dateLayer = layers.add({name:settings.calendarDateLabel});
            settings.dateLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bJulianDateLayer )
      {
         try{ settings.julianDateLayer = layers.item( settings.calendarJulianDateLabel ).name; }
         catch (myError){
            settings.julianDateLayer = layers.add({name:settings.calendarJulianDateLabel});
            settings.julianDateLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bHolidaysLayer )
      {
         try{ settings.holidaysLayer = layers.item( settings.calendarHolidayLabel ).name; }
         catch (myError){
            settings.holidaysLayer = layers.add({name:settings.calendarHolidayLabel});
            settings.holidaysLayer.move( LocationOptions.AT_BEGINNING );
         }
      }
      if( settings.bTextLayer )
      {
         try{ settings.textLayer = layers.item( settings.calendarTextLabel ).name; }
         catch (myError){
            settings.textLayer = layers.add({name:settings.calendarTextLabel});
            settings.textLayer.move( LocationOptions.AT_BEGINNING );
         }
      }   
   }

   return;
}
// --------------------------------------------------------------- //
function findCalendars()
{
   var knownCalendars = new Array();
   var buffer;
   var myError;
   var i;
   var myDocument = app.activeDocument;
   var myTextFrames = myDocument.textFrames;

   for( i = 0; i < myTextFrames.length; i++ )
   {
      buffer = calendarDatesRegExp.exec( myTextFrames.item(i).label );
      try{ knownCalendars.push( parseInt( buffer[1] ) ) }
      catch( myError ){ }
   }

   return( knownCalendars )
}
// --------------------------------------------------------------- //
function nextCalendarCount( )
{
   var buffer = 0;
   var knownCalendars;
   var i;
   try
   {
      knownCalendars = findCalendars();
      for( i = 0; i < knownCalendars.length; i++ )
      {
         if( knownCalendars[i] > buffer )
         {
            buffer = knownCalendars[i];
         }
      }      
   } catch( myError )
   {}

   return( buffer + 1 )
}
// --------------------------------------------------------------- //
function addHolidayText( settings, iYear, calendarTable, holidaysTable )
{
   var myCalendarRow;
   var myHolidaysRow;
   var myCalendarCells;
   var myHolidaysCells;
   var calendarDate;
   var myDocument = settings.currentDocument;
   var dateWithOutYearRegExp = /^\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;
   var anythingRegExp        = /\w/;
   var i;
   var j;
   var k;
   var m;
   var h;
   var g;
   var holidaysPreBuffer;
   var holidaysBuffer = new Array( 2 );
   var holidays = new Array();
   var fullStyle;
   var style;
   var printedHolidays;
   var holidayGroups = settings.holidayGroups;
   var holidayGroupStyles = settings.holidayGroupStyles;
   var bPrintHoliday = false;
   var bufferLabel;
   var bStyleSet = false;
   var fullCellStyle;

   for( k = 2; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myHolidaysCells = holidaysTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         printedHolidays = new Array();
         bStyleSet = false;
         for( g = 0; g < holidayGroups.length; g++ )
         {
             holidays = holidayGroups[g];
             style    = holidayGroupStyles[g];

             for( h = 0; h < holidays.length; h++ )
             {
                bPrintHoliday = false;
                 if( holidays[h].match( dateWithOutYearRegExp ) )
                 {
                    holidaysPreBuffer = holidays[h].split(":");
                    holidaysBuffer[0] = holidaysPreBuffer.shift();
                    holidaysBuffer[1] = holidaysPreBuffer.join( ":" );

                    bufferLabel = " ";
                    if( settings.bCS )
                    {
                       bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
                    }
                    else
                    {
                       bufferLabel = myCalendarCells[i].label;
                    }

                    if( bufferLabel == (holidaysBuffer[0] + "-" + iYear) )
                    {
                       bPrintHoliday = true;
                    }
                 }
                 else if( holidays[h].match( dateWithYearRegExp ) )
                 {
                    holidaysPreBuffer = holidays[h].split(":");
                    holidaysBuffer[0] = holidaysPreBuffer.shift();
                    holidaysBuffer[1] = holidaysPreBuffer.join( ":" );

                    bufferLabel = " ";
                    if( settings.bCS )
                    {
                       bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
                    }
                    else
                    {
                       bufferLabel = myCalendarCells[i].label;
                    }

                    if( bufferLabel == holidaysBuffer[0] )
                    {
                       bPrintHoliday = true;
                    }
                 }

                 if( bPrintHoliday )
                 {
                    if( !bItemIn( holidaysBuffer[1], printedHolidays ) )
                    {
                       if( myHolidaysCells[i].contents.match( anythingRegExp ) )
                       {
                          myHolidaysCells[i].insertionPoints.lastItem().contents = "\r" + holidaysBuffer[1];
                       }
                       else
                       {
                          myHolidaysCells[i].contents = holidaysBuffer[1];
                       }

                       printedHolidays.push( holidaysBuffer[1] );
                       fullStyle = "cal_holiday" + style;

                       myHolidaysCells[i].insertionPoints.lastItem().appliedParagraphStyle = settings.currentDocument.paragraphStyles.item(fullStyle + settings.styleSet);

                       if( settings.bHighlightHolidays == true)
                       {
                          if( settings.bCellStyles == true && !bStyleSet )
                          {
                             fullCellStyle = "cal_holidayDate" + style;
                             myCalendarCells[i].appliedCellStyle = myDocument.cellStyles.item(fullCellStyle + settings.styleSet);
                             bStyleSet = true;
                          }
                          else
                          {
                             myCalendarCells[i].insertionPoints.item(0).appliedParagraphStyle = myDocument.paragraphStyles.item("cal_holidayDate" + settings.styleSet);
                          }   
                       }
                    }
                 }
             }
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function bItemIn( item, array )
{
   var bFlag = false;
   var i;

   for( i = 0; i < array.length; i++ )
   {
      if( item == array[i] )
      {
         bFlag = true;
      }
   }

   return( bFlag );
}
// --------------------------------------------------------------- //
function addJulianDates( settings, calendarTable, julianDatesTable )
{
   var myCalendarRow;
   var myJulianDateRow;
   var myCalendarCells;
   var myJulianDateCells;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*$/;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;

   var dateNow  = new Date();
   var dateJan1 = new Date();

   var bufferLabel;
   var tempCells;

   for( k = 2; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells   = calendarTable.rows.item( k ).cells;
      myJulianDateCells = julianDatesTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myJulianDateCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;
         }

         if( bufferLabel.match( dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            dateJan1.setFullYear( parseInt( year ), 0, 1 );
            dateNow.setFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day )+1 );
            myJulianDateCells[i].contents = "\n".concat( Math.ceil( (dateNow.valueOf() - dateJan1.valueOf())/(60*60*24*1000)).toString() );
         }
      }
   }

   return;
}
// --------------------------------------------------------------- //
function addMoons( settings, calendarTable, moonsTable )
{
   var myCalendarRow;
   var myMoonsRow;
   var myCalendarCells;
   var myMoonsCells;
   var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*$/;
   var i;
   var k;
   var cellDate;
   var month;
   var day;
   var year;

   var dateNow  = new Date();
   var datePre  = new Date();
   var datePost = new Date();

   var error = 10;
   var newMoon = 0;
   var waxMoon = 25;
   var fullMoon = 50;
   var waneMoon = 75;
   var moonNow;
   var moonPre;
   var moonPost;
   var bufferLabel;
   var tempCells;
   for( k = 2; k < calendarTable.rows.length; k++ )
   {
      myCalendarCells = calendarTable.rows.item( k ).cells;
      myMoonsCells   = moonsTable.rows.item( k ).cells;

      for( i = 0; i < myCalendarCells.length; i++ )
      {
         if( !settings.bCellStyles )
         {
            myMoonsCells[i].topInset    = "0 in";
            myMoonsCells[i].rightInset  = "0 in";
            myMoonsCells[i].bottomInset = "0 in";
            myMoonsCells[i].leftInset   = "0 in";
            myMoonsCells[i].verticalJustification = VerticalJustification.topAlign;
         }

         bufferLabel = " ";
         if( settings.bCS )
         {
            bufferLabel = settings.csLabelMap[ myCalendarCells[i].id ];
         }
         else
         {
            bufferLabel = myCalendarCells[i].label;

         }

         if( bufferLabel.match( dateWithYearRegExp ) )
         {
            cellDate = bufferLabel;
            month = cellDate.substring( 0, cellDate.indexOf( '-', 0 ) );
            day   = cellDate.substring( cellDate.indexOf('-',0)+1, cellDate.indexOf( '-', 3 ) );
            year  = cellDate.substr( cellDate.indexOf( '-', 3 ) + 1, 4 );

            if( true )
            {
                datePre.setFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day ) - 1);
                dateNow.setFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day ) );
                datePost.setFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day ) + 1 );

                moonNow  = moonPhasePercent( dateNow );
                moonPre  = moonPhasePercent( datePre );
                moonPost = moonPhasePercent( datePost );
            }
            else
            {
                dateNow.setFullYear( parseInt( year ), parseInt( month ) - 1, parseInt( day )+1 );

                moonPre = moonNow;
                moonNow = moonPre;
                moonPost = moonPhasePercent( datePost );
            }

            // New moon?
            if( moonNow < (newMoon + error) || moonNow > (newMoon + 100 - error) )
            {
                errorA = squaredError( newMoon, moonPre );
                errorB = squaredError( newMoon + 1, moonPre );
                errorA <= errorB ? error1 = errorA : error1 = errorB;

                errorA = squaredError( newMoon, moonNow );
                errorB = squaredError( newMoon + 1, moonNow );
                errorA <= errorB ? error2 = errorA : error2 = errorB;

                errorA = squaredError( newMoon, moonPost );
                errorB = squaredError( newMoon + 1, moonPost );
                errorA <= errorB ? error3 = errorA : error3 = errorB;

                if( error1 > error2 && error2 <= error3 )
                {
                    //myMoonsCells[i].contents = "New Moon";
                    addMoon( settings, "New Moon", myMoonsCells[i] );
                }
            }

            // Waxing moon?
            else if( (waxMoon-error) < moonNow && moonNow < (waxMoon+error) )
            {
                error1 = squaredError( waxMoon, moonPre );
                error2 = squaredError( waxMoon, moonNow );
                error3 = squaredError( waxMoon, moonPost );

                if( error1 > error2 && error2 <= error3 )
                {
                    //myMoonsCells[i].contents = "Waxing Moon";
                    addMoon( settings, "Waxing Moon", myMoonsCells[i] );
                }
            }

            // Full moon?
            else if( (fullMoon-error) < moonNow && moonNow < (fullMoon+error) )
            {
                error1 = squaredError( fullMoon, moonPre );
                error2 = squaredError( fullMoon, moonNow );
                error3 = squaredError( fullMoon, moonPost );

                if( error1 > error2 && error2 <= error3 )
                {
                    //myMoonsCells[i].contents = "Full Moon";
                    addMoon( settings, "Full Moon", myMoonsCells[i] );
                }
            }

            // Waning moon?
            else if( (waneMoon-error) < moonNow && moonNow < (waneMoon+error) )
            {
                error1 = squaredError( waneMoon, moonPre );
                error2 = squaredError( waneMoon, moonNow );
                error3 = squaredError( waneMoon, moonPost );

                if( error1 > error2 && error2 <= error3 )
                {
                    //myMoonsCells[i].contents = "Waning Moon";
                    addMoon( settings, "Waning Moon", myMoonsCells[i] );
                }
            }
         }
      }
   }

   return;
}

// --------------------------------------------------------------- //
function addMoon( settings, type, cell )
{
    var height = cell.height;
    var width  = cell.width;
    var dim;
    var moonScaling;
    var oval;
    var buffer;

    height <= width ? dim = height : dim = width;
    moonScaling = 1/3;

    oval = settings.currentPage.ovals.add( {strokeColor:settings.currentDocument.colors.item('cal_moonStrokeColor' + settings.styleSet),
                                            strokeWeight:'2pt',
                                            geometricBounds: [0,0,dim * moonScaling, dim * moonScaling]} );

    if( settings.bCS )
    {
       oval.geometricBounds = [0,0,dim*moonScaling, dim*moonScaling];
    }

    if( type == "New Moon" )
    {
    }
    else if( type == "Waxing Moon" )
    {
        settings.currentDocument.paragraphStyles.item( 'cal_moon' + settings.styleSet ).tabStops.add( {position:(dim * moonScaling * 1/2)} );

        oval.fillColor = settings.currentDocument.colors.item('cal_moonFillColor' + settings.styleSet);

        oval.paths.item(0).pathPoints.item(3).remove();

        oval.paths.item(0).pathPoints.item(0).pointType = PointType.CORNER;
        oval.paths.item(0).pathPoints.item(0).leftDirection = [ 
            oval.paths.item(0).pathPoints.item(0).anchor[0], 
            oval.paths.item(0).pathPoints.item(0).anchor[1] - (dim * moonScaling * 1/4)];

        oval.paths.item(0).pathPoints.item(2).pointType = PointType.CORNER;
        oval.paths.item(0).pathPoints.item(2).rightDirection = [ 
            oval.paths.item(0).pathPoints.item(2).anchor[0], 
            oval.paths.item(0).pathPoints.item(2).anchor[1] + (dim * moonScaling * 1/4)];

        cell.contents = "\t";
    }
    else if( type == "Full Moon" )
    {
        oval.fillColor = settings.currentDocument.colors.item('cal_moonFillColor' + settings.styleSet);     
    }
    else if( type == "Waning Moon" )
    {
        oval.fillColor = settings.currentDocument.colors.item('cal_moonFillColor' + settings.styleSet);
        oval.paths.item(0).pathPoints.item(1).remove();

        oval.paths.item(0).pathPoints.item(0).pointType = PointType.CORNER;
        oval.paths.item(0).pathPoints.item(0).rightDirection = [ 
            oval.paths.item(0).pathPoints.item(0).anchor[0], 
            oval.paths.item(0).pathPoints.item(0).anchor[1] - (dim * moonScaling * 1/4)];

        oval.paths.item(0).pathPoints.item(1).pointType = PointType.CORNER;
        oval.paths.item(0).pathPoints.item(1).leftDirection = [ 
            oval.paths.item(0).pathPoints.item(1).anchor[0], 
            oval.paths.item(0).pathPoints.item(1).anchor[1] + (dim * moonScaling * 1/4)];
    }

    app.select( oval );
    app.cut();
    app.select( cell.insertionPoints.lastItem() );
    app.paste();

    return;
}
// --------------------------------------------------------------- //
function squaredError( reference, value )
{
    return Math.pow( (reference-value), 2 );
}
// --------------------------------------------------------------- //
function addPictureFrames( settings, calendarTable, picturesTable )
{
   var cells = picturesTable.cells;
   var i;
   var width;
   var height;
   var frame;

   for( i = 0; i < cells.length; i++ )
   {
      height = cells[i].height;
      width  = cells[i].width;

      cells[i].label = "pictureCell_" + i;

      if( settings.bCS || settings.bCS2 )
      {
         cells[i].topInset = "0 in";
         cells[i].rightInset = "0 in";
         cells[i].bottomInset = "0 in";
         cells[i].leftInset = "0 in";

         frame = settings.currentPage.textFrames.add( {geometricBounds:[0,0,height,width]});

         // needed due to bug in CS
         if( settings.bCS )
         {
            frame.geometricBounds = [0,0,height,width];
         }

         frame.contentType = ContentType.GRAPHIC_TYPE;
         frame.label = "pictureFrame_" + i;

         app.select( frame );
         app.cut();
         app.select( cells[i].insertionPoints.lastItem() );
         app.paste();
      }
      else
      {
         frame = cells[i].insertionPoints.lastItem().textFrames.add( {geometricBounds:[0,0,height,width]});
         frame.contentType = ContentType.GRAPHIC_TYPE;
         frame.label = "pictureFrame_" + i;
      }
   }

   return;
}
// --------------------------------------------------------------- //
function GetFrameHolidays( settings )
{
    var selectionObjectType = settings.selectionObjectType;
    var myTextFrame;
    var text;
    var holidays = new Array();

    if( selectionObjectType == "[object TextFrame]" )
    {
       myTextFrame = app.selection[0];
    } 
    else if( selectionObjectType == "[object InsertionPoint]" )
    {
       if( settings.bCS )
       {
          try{ myTextFrame = app.selection[0].parentTextFrame; }
          catch( myError )
          {
             myTextFrame = app.selection[0].parentTextFrame[0];
          }
       }
       else
       {
          myTextFrame = app.selection[0].parentTextFrames[0];
       }
    }

    text = myTextFrame.contents;
    holidays = text.split("\r")

    return( holidays );
}
// --------------------------------------------------------------- //
function GetFileHolidays( settings )
{
    var items     = new Array();
    var holidays = new Array();
    var styles    = new Array();
    var i;

    for( i = 0; i < settings.holidayFiles.length; i++ )
    {
        if( settings.bHolidaysFile[i] )
        {
            holidays.push( LoadHolidaysFromFile( settings.holidayFiles[i] ) );
            styles.push( settings.holidaySelectorsStyle[i] );
        }
    }

    items[0] = holidays;
    items[1] = styles;

    return( items );
}
// --------------------------------------------------------------- //
function GetCustomHolidays( settings )
{
    var holidays = new Array();
    var i;
    var file = new File();
    var files = file.openDlg( "Select one or more holiday files", "", true );
    var myError;
    var temp;
    var j;

    try {
       for( i = 0; i < files.length; i++ )
       {
          temp = LoadHolidaysFromFile( files[i] );
          for( j = 0; j < temp.length; j++ )
          {
             holidays.push( temp[j] );
          }
       }

    } catch( myError ){}

    return( holidays );
}
// --------------------------------------------------------------- //
function LoadHolidaysFromFile( file )
{
    var lines = new Array();
    var dateWithOutYearRegExp = /^\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;
    var dateWithYearRegExp    = /^\s*(\d+)\s*-\s*(\d+)\s*-\s*(\d+)\s*:\s*(.*)/;

    var i = 0;
    var buffer;

    file.open();
    while( ! file.eof )
    {
        buffer = file.readln();
        if( buffer.match( dateWithOutYearRegExp )  || buffer.match( dateWithYearRegExp )  )
        {
            lines[i++] = buffer;
        }
    }
    file.close();

    return( lines );
}
// --------------------------------------------------------------- //
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
// --------------------------------------------------------------- //
function getWorkWeek( settings, iYear, iMonth, iDay )
{
  var newYearDayInstance = new Date( iYear, 0, 1);       //instance of the date for January 1
  var newYearDayOfWeek   = newYearDayInstance.getDay(); //day of the week for January 1. 0 is Sunday
  var daysUntilToday     = newYearDayOfWeek;            //days before January 1 in ww01
  var j;
  var ww;
  var workWeek;

  // Take into account the week starting on Monday
  daysUntilToday -= settings.dayOrdering[0];

  for (var j = 0; j < iMonth; j++)
  { 
   //count days in all previous months
    daysUntilToday += GetDaysInMonth(iYear, j);
  }

  daysUntilToday += iDay; //add days in current month
  workWeek = Math.ceil(daysUntilToday/7)

  if( settings.workWeekStart == 'FirstFullWeek' && (newYearDayOfWeek - settings.dayOrdering[0]) > 0 )
  {
     if( workWeek == 1 || workWeek == 0) 
     {
        workWeek = 52;
     }
     else
     {
        workWeek--;
     }
  }
  else if( settings.workWeekStart == 'Jan1' && (newYearDayOfWeek - settings.dayOrdering[0]) < 0 )
  {
     workWeek++;
  }

  if( workWeek == 0 )
  {
     workWeek = 52;
  }

  return workWeek;
}
// --------------------------------------------------------------- //
function IdentifyInDesignVersionAndFeatures( settings )
{
   settings.bCS         = false;
   settings.bCS2        = false;
   settings.bCS3        = false;
   settings.bCS4        = false;
   settings.bCS5        = false;
   settings.bCSX        = false;
   settings.bCellStyles = false;
   settings.bFrameNameSupported = false;

   if (app.version == 3)
   {
      settings.bCS = true;
   }
   else if( String(app.version).split(".")[0] == 4 )
   {
      settings.bCS2     = true;
   }
   else if( String(app.version).split(".")[0] == 5 )
   {
      settings.bCS3     = true;
   }
   else if( String(app.version).split(".")[0] == 6 )
   {
      settings.bCS4     = true;
   }
   else if( String(app.version).split(".")[0] == 7 )
   {
      settings.bCS5     = true;
   }
   else
   {
      settings.bCSX    = true;
   }

   if( ! (settings.bCS == true || settings.bCS2 == true ) )
   {
      settings.bCellStyles = true
   }

   if( ! (settings.bCS == true || settings.bCS2 == true || settings.bCS3 == true || settings.bCS4 == true) )
   {
      settings.bFrameNameSupported = true
   }

   return;
}
// --------------------------------------------------------------- //
function bUserInputOK( settings )
{
   var selectionObjectType;
   var bFlag = true;
   var bClipToOneMonth = false;
   var buffer; 
   try{ selectionObjectType = app.selection[0].toString(); }
   catch( myError ){ selectionObjectType = null; }

   settings.selectionObjectType = selectionObjectType;

   if( settings.bGetFrameHolidays && 
       !( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) )
   {
      alert( "No frame selected, therefore, I couldn't get holidays from frame" );
      settings.bGetFrameHolidays = false;
   }

   // Give the user a dialog if the settings call for the
   // text frame, but it can't be used.
   if( settings.sPageType == "Current Text Frame" )
   {
      if( !( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) )
      {
         alert( "Need to select a text frame before executing the script in order to use \"Current Text Frame\"." );  
         bFlag = false;
      }
      else if( !( (settings.iStartMonth == settings.iEndMonth ) &&
                  (settings.iStartYear == settings.iEndYear   ) &&
                  (settings.iCalendarsPerPage == 1   ) ) )
      {
         bClipToOneMonth = true;
      }  
   }
   else if( settings.sPageType == "Auto" )
   {
      if( ( selectionObjectType == "[object TextFrame]" || selectionObjectType == "[object InsertionPoint]" ) &&
          !( (settings.iStartMonth == settings.iEndMonth ) &&
             (settings.iStartYear == settings.iEndYear   ) &&
             (settings.iCalendarsPerPage == 1   )
          ) )
      {
         bClipToOneMonth = true;
      }
   }

   if( settings.iFixedRowCount == 5 )
   {
      if( settings.bGetFileHolidays ||
          settings.bGetCustomHolidays ||
          settings.bGetFrameHolidays ||
          settings.bAddWorkWeek ||
          settings.bMoonsLayer )
      {
         alert( "Can't select work week, moon phases, or holidays with a fixed row count of 5.  Changing to auto." );
         settings.iFixedRowCount = 0;
      }
   }

   if( bClipToOneMonth )
   {
      alert( "When drawing into a text frame, only one month can be created." );  
      settings.iEndMonth = settings.iStartMonth;
      settings.iEndYear  = settings.iStartYear;
      settings.sEndMonth = settings.sStartMonth;
      settings.iCalendarsPerPage = 1;
   }

   if( settings.bUseCustomSize && settings.iCalendarsPerPage > 1 )
   {
      alert( "When drawing into a custom size frame, only one calendar per page may be created." );  
      settings.iCalendarsPerPage = 1;
   }

   if( settings.sPageType == "Current Document" )
   {
      try{ app.activeDocument }
      catch( myError )
      {
         alert( "No document selected! Defaulting to \"Auto\" page type." );
         settings.sPageType = 'Auto';

      }
   }

   return( bFlag );
}
// --------------------------------------------------------------- //
function GetTheDocument( settings )
{
   var myDocument;
   var selectionObjectType = settings.selectionObjectType;
   var myY1;
   var myX1;
   var myY2;
   var myX2;
   var scaleFactor = 1;
   var unitSuffix = "in";

   if( settings.customSizeUnits == "points" )
   {
      unitSuffix = "pt";
   }
   else if( settings.customSizeUnits == "centimeters" )
   {
      unitSuffix = "cm";
   }
   else //if( settings.customSizeUnits == "inches" )
   {
      unitSuffix = "in";
   }

   if( settings.bGetFrameHolidays && settings.sPageType == "Auto" )
   {
      // the normal auto is the current frame if it is selected; but
      // not when it has holiday information.
      settings.sPageType = "New Document"; 
   }

   if( settings.sPageType == "Current Text Frame" ||
       settings.sPageType == "Current Document" ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object TextFrame]" ) ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object InsertionPoint]")
      )
   {
      myDocument  = app.activeDocument;
   }   
   else
   {

      if( settings.bUseCustomPageMargin == true )
      {
         //backup and set the current application default margin preferences.
         with (app.marginPreferences)
         {
            myY1 = top;
            myX1 = left;
            myY2 = bottom;
            myX2 = right;

            top    = settings.customPageMargin+unitSuffix;
            left   = settings.customPageMargin+unitSuffix;
            bottom = settings.customPageMargin+unitSuffix;
            right  = settings.customPageMargin+unitSuffix;
         }
      }

      // Add the document
      myDocument  = app.documents.add();
      myDocument.documentPreferences.facingPages = false;
      myDocument.documentPreferences.pageHeight = (settings.customPageHeight + unitSuffix);
      myDocument.documentPreferences.pageWidth  = (settings.customPageWidth  + unitSuffix);      

      if( settings.bUseCustomPageBleed == true )
      {
          myDocument.documentPreferences.documentBleedBottomOffset         = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedInsideOrLeftOffset   = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedOutsideOrRightOffset = (settings.customPageBleed + unitSuffix);
          myDocument.documentPreferences.documentBleedTopOffset            = (settings.customPageBleed + unitSuffix);
      }

      if( settings.bUseCustomPageSize == true)
      {
         if( parseFloat( settings.customPageHeight ) > parseFloat( settings.customPageWidth ) )
         {
            myDocument.documentPreferences.pageOrientation = PageOrientation.portrait;
         }
         else
         {
            myDocument.documentPreferences.pageOrientation = PageOrientation.landscape;
         }
      }
      else if( settings.sPageOrientation == 'Portrait')
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.portrait;
      }
      else if( settings.sPageOrientation == 'Landscape')
      {
         myDocument.documentPreferences.pageOrientation = PageOrientation.landscape;
      }

      // Reset the application default margins to their original state.
      if( settings.bUseCustomPageMargin == true )
      {
         with (app.marginPreferences)
         {
            top    = myY1;
            left   = myX1;
            bottom = myY2;
            right  = myX2;
         }
      }
   }

   addLayers( settings, myDocument );

   with(myDocument.viewPreferences)
   {
      settings.originalRulerOrigin                = rulerOrigin;
      settings.originalHorizontalMeasurementUnits = horizontalMeasurementUnits;
      settings.originalVerticalMeasurementUnits   = verticalMeasurementUnits;

      rulerOrigin                = RulerOrigin.pageOrigin;
      horizontalMeasurementUnits = MeasurementUnits.inches;
      verticalMeasurementUnits   = MeasurementUnits.inches;
   }

   settings.calendarFramePositions = calendarFramePositions( settings, myDocument );
   settings.currentDocument = myDocument;
   return;
}
// --------------------------------------------------------------- //
function GetThePage( settings, iCalendarCount )
{
   var myDocument = settings.currentDocument;
   var selectionObjectType = settings.selectionObjectType;
   var myPage;

   if( settings.sPageType == "Current Text Frame" ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object TextFrame]" ) ||
       ( settings.sPageType == "Auto" && settings.selectionObjectType == "[object InsertionPoint]")
      )
   {
      // reset once the frame is found
      myPage = myDocument.pages.item(0);
   }
   else if( settings.sPageType == "Current Document" )
   {
      if( iCalendarCount > 0 && (iCalendarCount % settings.iCalendarsPerPage) == 0 )
      {
         myPage = myDocument.pages.add();
      }
      myPage = myDocument.layoutWindows.item(0).activePage;

      /*if( iCalendarCount == 0 )
      {
         myPage = myDocument.layoutWindows.item(0).activePage;
      }
      else
      {
         myPage = myDocument.pages.add();      
      }*/
   }
   else
   {
      if( iCalendarCount > 0 && (iCalendarCount % settings.iCalendarsPerPage) == 0 )
      {
         myPage = myDocument.pages.add();
      }
      myPage = myDocument.pages.lastItem();
   }

   settings.currentPage = myPage;
   return( myPage );
}
// --------------------------------------------------------------- //
function GetTheFrame( settings, iCalendarCount )
{
   var myDocument = settings.currentDocument;
   var myPage     = settings.currentPage;
   var myTextFrame;
   var selectionObjectType = settings.selectionObjectType;
   var myItem;
   if( (settings.sPageType == "Current Text Frame" || settings.sPageType == "Auto" ) && settings.selectionObjectType == "[object TextFrame]" )
   {
      myTextFrame = app.selection[0];
      myItem = myTextFrame.parent;
      while( !myItem.toString() == "[object Page]" ){
         myItem = myItem.parent;
      }
      settings.currentPage = myItem;
   }
   else if( (settings.sPageType == "Current Text Frame" || settings.sPageType == "Auto" )  && settings.selectionObjectType == "[object InsertionPoint]" )
   {
      if( settings.bCS )
      {
         try{ myTextFrame = app.selection[0].parentTextFrame; }
         catch( myError )
         {
            myTextFrame = app.selection[0].parentTextFrame[0];
            myItem = myTextFrame.parent;
            while( !myItem.toString() == "[object Page]" ){
               myItem = myItem.parent;
            }
            settings.currentPage = myItem;
         }
      }
      else
      {
         myTextFrame = app.selection[0].parentTextFrames[0];
         myItem = myTextFrame.parent;
         while( !myItem.toString() == "[object Page]" ){
            myItem = myItem.parent;
         }
         settings.currentPage = myItem;
      }
   }
   else
   {
      myTextFrame = myPage.textFrames.add();
      myTextFrame.geometricBounds = settings.calendarFramePositions[iCalendarCount % settings.iCalendarsPerPage];
   }

   if( settings.bGetFrameHolidays && settings.sPageType == "Current Text Frame" )
   {
       myTextFrame.contents = "";
   }

   if( settings.bDateLayer )
   {
      myTextFrame.move( myDocument.layers.item( settings.calendarDateLabel ) );
   }

   settings.iCalendarCount = nextCalendarCount();
   myTextFrame.label = settings.calendarDateLabel + settings.iCalendarCount;
   if( settings.bFrameNameSupported == true )
   {
      myTextFrame.name = settings.calendarDateLabel + settings.iCalendarCount;
   }   
   settings.currentFrame = myTextFrame;

   return( myTextFrame );
}
// --------------------------------------------------------------- //
function SetTheDocumentStyles( settings )
{
   var titleSize;
   var myDocument = settings.currentDocument;
//   var paperSwatch = app.activeDocument.swatches.item(1); 

   /********************************************************************/
   /* create colors and styles, ...                                    */
   /********************************************************************/
   with(myDocument)
   {
      //Add colors.
      try{ colors.item("cal_dayCellBackground" + settings.styleSet).name; }
      catch (myError){ 
         if( settings.sColorSpace == 'CMYK' ){
            colors.add({name:"cal_dayCellBackground" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
         } else if ( settings.sColorSpace == 'RBG' ){
            colors.add({name:"cal_dayCellBackground" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,255]});
         } else { // 'Lab'
            colors.add({name:"cal_dayCellBackground" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
         }
      }
      try{ colors.item("cal_dayTextColor" + settings.styleSet).name; }
      catch (myError){ 
         if( settings.sColorSpace == 'CMYK' ){
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
         } else if ( settings.sColorSpace == 'RBG' ){
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
         } else {
            colors.add({name:"cal_dayTextColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,0,0]});
         }
      }

      if( settings.bHighlightSundays )
      {
          try{ colors.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_sunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }

          if( settings.bAddNonMonthDays )
          {
              try{ colors.item("cal_nonMonthSunday" + settings.styleSet).name; }
              catch (myError){ 
                  if( settings.sColorSpace == 'CMYK' ){
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
                  } else if ( settings.sColorSpace == 'RBG' ){
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
                  } else {
                      colors.add({name:"cal_nonMonthSunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
                  }
              }
          }
      }

      if( settings.bHighlightHolidays )
      {
          try{ colors.item("cal_holidayDate" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_holidayDate" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bJulianDateLayer )
      {
          try{ colors.item("cal_julianDate" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
             } else {
                colors.add({name:"cal_julianDate" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
             }
          }
      }

      if( settings.bAddNonMonthDays )
      {
          try{ colors.item("cal_nonMonthDay" + settings.styleSet).name; }
          catch (myError){ 
              if( settings.sColorSpace == 'CMYK' ){
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
              } else if ( settings.sColorSpace == 'RBG' ){
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
              } else {
                  colors.add({name:"cal_nonMonthDay" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
              }
          }
      }
      if( settings.bHolidaysLayer )
      {
         try{ colors.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_holiday" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }

         if( settings.bHolidayStyleA )
         {
             try{ colors.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
                } else {
                   colors.add({name:"cal_holidayA" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
                }
             }
         }

         if( settings.bHolidayStyleB )
         {
             try{ colors.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[77,30,100,17]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,121,16]});
                } else {
                   colors.add({name:"cal_holidayB" + settings.styleSet, space:ColorSpace.lab, colorValue:[45,-33,45]});
                }
             }
         }

         if( settings.bHolidayStyleC )
         {
             try{ colors.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[74,25,28,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.rgb, colorValue:[63,153,172]});
                } else {
                   colors.add({name:"cal_holidayC" + settings.styleSet, space:ColorSpace.lab, colorValue:[58,-23,-18]});
                }
             }
         }

         if( settings.bHolidayStyleD )
         {
             try{ colors.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[58,83,0,0]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.rgb, colorValue:[145,52,200]});
                } else {
                   colors.add({name:"cal_holidayD" + settings.styleSet, space:ColorSpace.lab, colorValue:[42,57,-60]});
                }
             }
         }
      }

      if( settings.bAddWorkWeek )
      {
         try{ colors.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,100,100,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,0,0]});
            } else {
               colors.add({name:"cal_workWeek" + settings.styleSet, space:ColorSpace.lab, colorValue:[54,81,70]});
            }
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ colors.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.rgb, colorValue:[255,255,255]});
            } else {
               colors.add({name:"cal_background" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
            }
         }
      }

      if( settings.bAddMiniCalendars )
      {
         try{ colors.item("calMini_dayCellBackground" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"calMini_dayCellBackground" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,0]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"calMini_dayCellBackground" + settings.styleSet, space:ColorSpace.rgb, colorValue:[225,225,225]});
            } else {
               colors.add({name:"calMini_dayCellBackground" + settings.styleSet, space:ColorSpace.lab, colorValue:[100,0,0]});
            }
         }
         try{ colors.item("calMini_dayTextColor" + settings.styleSet).name; }
         catch (myError){ 
            if( settings.sColorSpace == 'CMYK' ){
               colors.add({name:"calMini_dayTextColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
            } else if ( settings.sColorSpace == 'RBG' ){
               colors.add({name:"calMini_dayTextColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
            } else {
               colors.add({name:"calMini_dayTextColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,0,0]});
            }
         }
         if( settings.bHighlightSundays )
         {
             try{ colors.item("calMini_sunday" + settings.styleSet).name; }
             catch (myError){ 
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"calMini_sunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,100]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"calMini_sunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[0,0,0]});
                } else {
                   colors.add({name:"calMini_sunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[0,0,0]});
                }
             }
             if( settings.bAddNonMonthDays )
             {
                 try{ colors.item("calMini_nonMonthSunday" + settings.styleSet).name; }
                 catch (myError){ 
                     if( settings.sColorSpace == 'CMYK' ){
                         colors.add({name:"calMini_nonMonthSunday" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
                     } else if ( settings.sColorSpace == 'RBG' ){
                         colors.add({name:"calMini_nonMonthSunday" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
                     } else {
                         colors.add({name:"calMini_nonMonthSunday" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
                     }
                 }
             }
         }

         if( settings.bAddNonMonthDays )
         {
             try{ colors.item("calMini_nonMonthDay" + settings.styleSet).name; }
             catch (myError){ 
                if( settings.sColorSpace == 'CMYK' ){
                   colors.add({name:"calMini_nonMonthDay" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
                } else if ( settings.sColorSpace == 'RBG' ){
                   colors.add({name:"calMini_nonMonthDay" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
                } else {
                   colors.add({name:"calMini_nonMonthDay" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
                }
             }
         }
      }

      if( settings.bMoonsLayer )
      {
          try{ colors.item("cal_moonStrokeColor" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_moonStrokeColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_moonStrokeColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
             } else {
                colors.add({name:"cal_moonStrokeColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
             }
          }

          try{ colors.item("cal_moonFillColor" + settings.styleSet).name; }
          catch (myError){ 
             if( settings.sColorSpace == 'CMYK' ){
                colors.add({name:"cal_moonFillColor" + settings.styleSet, space:ColorSpace.cmyk, colorValue:[0,0,0,25]});
             } else if ( settings.sColorSpace == 'RBG' ){
                colors.add({name:"cal_moonFillColor" + settings.styleSet, space:ColorSpace.rgb, colorValue:[198,200,202]});
             } else {
                colors.add({name:"cal_moonFillColor" + settings.styleSet, space:ColorSpace.lab, colorValue:[80,0,-1]});
             }
          }

      }

      //Add character styles
      //try{ characterStyles.item("character_style").name; }
      //catch (myError){
      //   characterStyles.add({name:"character_style"});
      //}

      //Add paragraph styles
      try{ paragraphStyles.item("cal_base" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_base" + settings.styleSet});
      }

      try{ paragraphStyles.item("cal_title" + settings.styleSet).name; }
      catch (myError){
         if( settings.iCalendarsPerPage >= 8 )
         {
            titleSize = 18;
         }
         else if( settings.iCalendarsPerPage >= 4 )
         {
            titleSize = 24;
         }
         else
         {
            titleSize = 36;
         }
         paragraphStyles.add({name:"cal_title" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.centerAlign,
            capitalization:Capitalization.smallCaps,
            pointSize:titleSize});
      }

      try{ paragraphStyles.item("cal_day" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_day" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.centerAlign,
            fillColor:colors.item("cal_dayTextColor" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_text" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_text" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet) });
      }

      try{ paragraphStyles.item("cal_date" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_date" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
            justification:Justification.rightAlign,
            nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });
      }
      if( settings.bHighlightSundays )
      {
          try{ paragraphStyles.item("cal_sunday" + settings.styleSet).name; }
          catch (myError){
             paragraphStyles.add({name:"cal_sunday" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                justification:Justification.rightAlign,
                nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                fillColor:colors.item("cal_sunday" + settings.styleSet) });
          }

          if( settings.bAddNonMonthDays )
          {
              try{ paragraphStyles.item("cal_nonMonthSunday" + settings.styleSet).name; }
              catch (myError){
                 paragraphStyles.add({name:"cal_nonMonthSunday" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                    justification:Justification.rightAlign,
                    nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                    fillColor:colors.item("cal_nonMonthSunday" + settings.styleSet) });
              }
          }
      }
      if( settings.bHighlightHolidays )
      {
          try{ paragraphStyles.item("cal_holidayDate" + settings.styleSet).name; }
          catch (myError){
             paragraphStyles.add({name:"cal_holidayDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                justification:Justification.rightAlign,
                nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                fillColor:colors.item("cal_holidayDate" + settings.styleSet) });
          }
          if( settings.bHolidayStyleA )
          {
             try{ paragraphStyles.item("cal_holidayDateA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleB )
          {
             try{ paragraphStyles.item("cal_holidayDateB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleC )
          {
             try{ paragraphStyles.item("cal_holidayDateC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
          }
          if( settings.bHolidayStyleD )
          {
             try{ paragraphStyles.item("cal_holidayDateD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayDateD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holidayDate" + settings.styleSet),
                   fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
          }
      }
      if( settings.bAddNonMonthDays )
      {
          try{ paragraphStyles.item("cal_nonMonthDay" + settings.styleSet).name; }
          catch (myError){
              paragraphStyles.add({name:"cal_nonMonthDay" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
                  justification:Justification.rightAlign,
                  nextStyle:paragraphStyles.item("cal_text" + settings.styleSet),
                  fillColor:colors.item("cal_nonMonthDay" + settings.styleSet) });
          }
      }
      try{ paragraphStyles.item("cal_date_splitCellSecondLine" + settings.styleSet).name; }
      catch (myError){
         paragraphStyles.add({name:"cal_date_splitCellSecondLine" + settings.styleSet, basedOn:paragraphStyles.item("cal_date" + settings.styleSet),
            justification:Justification.leftAlign,
            nextStyle:paragraphStyles.item("cal_text" + settings.styleSet) });

         if( !(settings.bCS2 == 1 || settings.bCS == 1 ) )
         {
            paragraphStyles.item( "cal_date_splitCellSecondLine" + settings.styleSet ).justification = Justification.LEFT_ALIGN;
         }
      }

      if( settings.bAddWorkWeek )
      {
         try{ paragraphStyles.item("cal_workWeek" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_workWeek" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign,
               fillColor:colors.item("cal_workWeek" + settings.styleSet) });
         }
      }

      if( settings.bHolidaysLayer )
      {
         try{ paragraphStyles.item("cal_holiday" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_holiday" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign,
               pointSize:10,
               fillColor:colors.item("cal_holiday" + settings.styleSet) });
         }

         if( settings.bHolidayStyleA )
         {
             try{ paragraphStyles.item("cal_holidayA" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayA" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayA" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleB )
         {
             try{ paragraphStyles.item("cal_holidayB" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayB" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayB" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleC )
         {
             try{ paragraphStyles.item("cal_holidayC" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayC" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayC" + settings.styleSet) });
             }
         }
         if( settings.bHolidayStyleD )
         {
             try{ paragraphStyles.item("cal_holidayD" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"cal_holidayD" + settings.styleSet, basedOn:paragraphStyles.item("cal_holiday" + settings.styleSet),
                   fillColor:colors.item("cal_holidayD" + settings.styleSet) });
             }
         }
      }

      if( settings.bMoonsLayer )
      {
         try{ paragraphStyles.item("cal_moon" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_moon" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.leftAlign});
         }
      }

      if( settings.bJulianDateLayer )
      {
         try{ paragraphStyles.item("cal_julianDate" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_julianDate" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.rightAlign,
               fillColor:colors.item("cal_julianDate" + settings.styleSet)});
         }
      }

      if( settings.bPicturesLayer )
      {
         try{ paragraphStyles.item("cal_pictures" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_pictures" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign});
         }
      }

      if( settings.bBackgroundLayer )
      {
         try{ paragraphStyles.item("cal_background" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_background" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet)});
         }
      }

      if( settings.bAddMiniCalendars )
      {
         try{ paragraphStyles.item("calMini_base" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_base" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               pointSize:5});
         }

         try{ paragraphStyles.item("calMini_title" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_title" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign,
               capitalization:Capitalization.smallCaps });
         }

         try{ paragraphStyles.item("calMini_day" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_day" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign,
               fillColor:colors.item("calMini_dayTextColor" + settings.styleSet) });
         }

         try{ paragraphStyles.item("calMini_text" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_text" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet) });
         }

         try{ paragraphStyles.item("calMini_date" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_date" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }
         if( settings.bHighlightSundays )
         {
             try{ paragraphStyles.item("calMini_sunday" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"calMini_sunday" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
                   justification:Justification.centerAlign,
                   fillColor:colors.item("calMini_sunday" + settings.styleSet) });
             }
             if( settings.bAddNonMonthDays )
             {
                 try{ paragraphStyles.item("calMini_nonMonthSunday" + settings.styleSet).name; }
                 catch (myError){
                    paragraphStyles.add({name:"calMini_nonMonthSunday" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
                       justification:Justification.centerAlign,
                       fillColor:colors.item("cal_nonMonthSunday" + settings.styleSet) });
                 }
             }
         }
         if( settings.bHighlightHolidays )
         {
             try{ paragraphStyles.item("calMini_holidayDate" + settings.styleSet).name; }
             catch (myError){
                paragraphStyles.add({name:"calMini_holidayDate" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
                   justification:Justification.centerAlign,
                   fillColor:colors.item("cal_holidayDate" + settings.styleSet) });
             }
             if( settings.bHolidayStyleA )
             {
                try{ paragraphStyles.item("calMini_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateA" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayA" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ paragraphStyles.item("calMini_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateB" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayB" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ paragraphStyles.item("calMini_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateC" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayC" + settings.styleSet) });
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ paragraphStyles.item("calMini_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   paragraphStyles.add({name:"calMini_holidayDateD" + settings.styleSet, basedOn:paragraphStyles.item("calMini_holidayDate" + settings.styleSet),
                      fillColor:colors.item("cal_holidayD" + settings.styleSet) });
                }
             }
         }
         if( settings.bAddNonMonthDays )
         {
             try{ paragraphStyles.item("calMini_nonMonthDay" + settings.styleSet).name; }
             catch (myError){
                 paragraphStyles.add({name:"calMini_nonMonthDay" + settings.styleSet, basedOn:paragraphStyles.item("calMini_base" + settings.styleSet),
                     justification:Justification.centerAlign,
                     fillColor:colors.item("calMini_nonMonthDay" + settings.styleSet) });
             }
         }
         try{ paragraphStyles.item("calMini_date_splitCellSecondLine" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"calMini_date_splitCellSecondLine" + settings.styleSet, basedOn:paragraphStyles.item("calMini_date" + settings.styleSet),
               justification:Justification.centerAlign });
            if( !(settings.bCS2 == 1 || settings.bCS == 1 ) )
            {
               paragraphStyles.item( "cal_date_splitCellSecondLine" + settings.styleSet ).justification = Justification.LEFT_ALIGN;
            }
         }

         try{ paragraphStyles.item("cal_leftMiniCalendar" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_leftMiniCalendar" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }

         try{ paragraphStyles.item("cal_rightMiniCalendar" + settings.styleSet).name; }
         catch (myError){
            paragraphStyles.add({name:"cal_rightMiniCalendar" + settings.styleSet, basedOn:paragraphStyles.item("cal_base" + settings.styleSet),
               justification:Justification.centerAlign });
         }
      }

      if( settings.bCellStyles )
      {
         // Cell Styles
         try{ cellStyles.item("cal_base" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_base" + settings.styleSet,
               appliedParagraphStyle:paragraphStyles.item( "cal_base" + settings.styleSet )});
         }

         try{ cellStyles.item("cal_baseNoEdges" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_baseNoEdges" + settings.styleSet,
                  basedOn:cellStyles.item("cal_base" + settings.styleSet),
                  topEdgeStrokeWeight:0,
                  rightEdgeStrokeWeight:0,
                  bottomEdgeStrokeWeight:0,
                  leftEdgeStrokeWeight:0});
         }

         try{ cellStyles.item("cal_date" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_date" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_date" + settings.styleSet )});
         }

         if( settings.iFixedRowCount == 5 )
         {
            try{ cellStyles.item("cal_dateSplitCell" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_dateSplitCell" + settings.styleSet,
                  basedOn:cellStyles.item("cal_date" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_date" + settings.styleSet )});

               cellStyles.item("cal_dateSplitCell"+settings.styleSet).topLeftDiagonalLine = true;
               cellStyles.item("cal_dateSplitCell"+settings.styleSet).verticalJustification = VerticalJustification.justifyAlign;
            }
         }

         try{ cellStyles.item("cal_title" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_title" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet)});

            if( settings.bAddMiniCalendars )
              {
               cellStyles.item( "cal_title" + settings.styleSet ).rightEdgeStrokeWeight  = 0;
               cellStyles.item( "cal_title" + settings.styleSet ).leftEdgeStrokeWeight   = 0;
            }
         }

         try{ cellStyles.item("cal_day" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_day" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_day" + settings.styleSet )});
         }

         if( settings.bHighlightSundays )
         {
             try{ cellStyles.item("cal_sunday" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_sunday" + settings.styleSet,
                   basedOn:cellStyles.item("cal_base" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_sunday" + settings.styleSet )});
             }

             if( settings.bAddNonMonthDays )
             {
                 try{ cellStyles.item("cal_nonMonthSunday" + settings.styleSet).name; }
                 catch (myError){
                    cellStyles.add({name:"cal_nonMonthSunday" + settings.styleSet,
                       basedOn:cellStyles.item("cal_base" + settings.styleSet),
                       appliedParagraphStyle:paragraphStyles.item( "cal_nonMonthSunday"  + settings.styleSet)});
                 }
             }
         }
         if( settings.bHighlightHolidays )
         {
             try{ cellStyles.item("cal_holidayDate" + settings.styleSet).name; }
             catch (myError){
                cellStyles.add({name:"cal_holidayDate" + settings.styleSet,
                   basedOn:cellStyles.item("cal_base" + settings.styleSet),
                   appliedParagraphStyle:paragraphStyles.item( "cal_holidayDate" + settings.styleSet )});
             }
             if( settings.bHolidayStyleA )
             {
                try{ cellStyles.item("cal_holidayDateA" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateA" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateA" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleB )
             {
                try{ cellStyles.item("cal_holidayDateB" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateB" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateB" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleC )
             {
                try{ cellStyles.item("cal_holidayDateC" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateC" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateC" + settings.styleSet )});
                }
             }
             if( settings.bHolidayStyleD )
             {
                try{ cellStyles.item("cal_holidayDateD" + settings.styleSet).name; }
                catch (myError){
                   cellStyles.add({name:"cal_holidayDateD" + settings.styleSet,
                      basedOn:cellStyles.item("cal_holidayDate" + settings.styleSet),
                      appliedParagraphStyle:paragraphStyles.item( "cal_holidayDateD" + settings.styleSet )});
                }
             }
         }
         if( settings.bAddNonMonthDays )
         {
             try{ cellStyles.item("cal_nonMonthDay" + settings.styleSet).name; }
             catch (myError){
                 cellStyles.add({name:"cal_nonMonthDay" + settings.styleSet,
                    basedOn:cellStyles.item("cal_base" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "cal_nonMonthDay" + settings.styleSet )});
             }
         }
         try{ cellStyles.item("cal_empty" + settings.styleSet).name; }
         catch (myError){
            cellStyles.add({name:"cal_empty" + settings.styleSet,
               basedOn:cellStyles.item("cal_base" + settings.styleSet),
               appliedParagraphStyle:paragraphStyles.item( "cal_date"  + settings.styleSet)});
         }

         if( settings.bTextLayer )
         {
            try{ cellStyles.item("cal_textTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_textTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet )
               });
            }

            try{ cellStyles.item("cal_textText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_textText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_text" + settings.styleSet )
                  });
            }
         }

         if( settings.bHolidaysLayer )
         {
            try{ cellStyles.item("cal_holidayTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet )
                  });
            }

            try{ cellStyles.item("cal_holidayText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_holidayText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_holiday"  + settings.styleSet),
                  verticalJustification:VerticalJustification.BOTTOM_ALIGN});
            }
         }

         if( settings.bJulianDateLayer )
         {
            try{ cellStyles.item("cal_julianDateTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDateTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet )
                  });
            }

            try{ cellStyles.item("cal_julianDateText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_julianDateText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_julianDate"  + settings.styleSet)
                  });
            }
         }

         if( settings.bMoonsLayer )
         {
            try{ cellStyles.item("cal_moonTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moonTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title"  + settings.styleSet)
               });
            }

            try{ cellStyles.item("cal_moonText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_moonText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_moon"  + settings.styleSet),
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bPicturesLayer )
         {
            try{ cellStyles.item("cal_picturesTitle" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_picturesTitle" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_title" + settings.styleSet ),
                  bottomInset:0,
                  topInset:0,
                  rightInset:0,
                  leftInset:0});
            }

            try{ cellStyles.item("cal_picturesText" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_picturesText" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_pictures" + settings.styleSet ),
                  bottomInset:0,
                  topInset:0,
                  rightInset:0,
                  leftInset:0,
                  verticalJustification:VerticalJustification.TOP_ALIGN});
            }
         }

         if( settings.bBackgroundLayer )
         {
            try{ cellStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               cellStyles.add({name:"cal_background" + settings.styleSet,
                  basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                  fillColor:colors.item("cal_background" + settings.styleSet),
                  appliedParagraphStyle:paragraphStyles.item( "cal_background" + settings.styleSet )});
            }
         }

        if( settings.bAddWorkWeek )
        {
           try{ cellStyles.item("calWorkWeek_text" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calWorkWeek_text" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_workWeek" + settings.styleSet ),
                 topEdgeStrokeWeight:0,
                 //rightEdgeStrokeWeight:0,
                 bottomEdgeStrokeWeight:0,
                 leftEdgeStrokeWeight:0,
                 rotationAngle:270,
                 verticalJustification:VerticalJustification.TOP_ALIGN});
           }
        }

        if( settings.bAddMiniCalendars )
        {
           try{ cellStyles.item("calMini_base" + settings.styleSet).name; }
           catch (myError){
                 cellStyles.add({name:"calMini_base" + settings.styleSet,
                 basedOn:cellStyles.item("cal_baseNoEdges" + settings.styleSet),
                 topInset:(1/72) + "in",
                 leftInset:(1/72) + "in",
                 bottomInset:(1/72) + "in",
                 rightInset:(1/72) + "in"
                 });
           }

           try{ cellStyles.item("cal_leftMiniCalendar" + settings.styleSet).name; }
           catch (myError){
                cellStyles.add({name:"cal_leftMiniCalendar" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_leftMiniCalendar" + settings.styleSet )});
           }

           try{ cellStyles.item("cal_rightMiniCalendar" + settings.styleSet).name; }
           catch (myError){
                cellStyles.add({name:"cal_rightMiniCalendar" + settings.styleSet,
                 basedOn:cellStyles.item("cal_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "cal_rightMiniCalendar" + settings.styleSet )});
           }

           try{ cellStyles.item("calMini_title" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_title" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_title" + settings.styleSet )
              });
           }

           try{ cellStyles.item("calMini_day" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_day" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_day" + settings.styleSet )
              });
           }

           try{ cellStyles.item("calMini_date" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_date" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_date" + settings.styleSet )
              });
           }

           if( settings.bHighlightSundays )
           {
               try{ cellStyles.item("calMini_sunday" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_sunday" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_sunday"+settings.styleSet)
                  });
               }

               if( settings.bAddNonMonthDays )
               {
                  try{ cellStyles.item("calMini_nonMonthSunday" + settings.styleSet).name; }
                  catch (myError){
                     cellStyles.add({name:"calMini_nonMonthSunday" + settings.styleSet,
                        basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                        appliedParagraphStyle:paragraphStyles.item( "calMini_nonMonthSunday" + settings.styleSet )
                     });
               }
               }
           }
           if( settings.bHighlightHolidays )
           {
               try{ cellStyles.item("calMini_holidayDate" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_holidayDate" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_date" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_holidayDate"+settings.styleSet)
                  });
               }
           }

           if( settings.bAddNonMonthDays )
           {
               try{ cellStyles.item("calMini_nonMonthDay" + settings.styleSet).name; }
               catch (myError){
                  cellStyles.add({name:"calMini_nonMonthDay" + settings.styleSet,
                     basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                     appliedParagraphStyle:paragraphStyles.item( "calMini_nonMonthDay" + settings.styleSet )
                  });
               }
           }

           try{ cellStyles.item("calMini_empty" + settings.styleSet).name; }
           catch (myError){
              cellStyles.add({name:"calMini_empty" + settings.styleSet,
                 basedOn:cellStyles.item("calMini_base" + settings.styleSet),
                 appliedParagraphStyle:paragraphStyles.item( "calMini_date" + settings.styleSet )
              });
           }
        }

        // Table Styles
        try{ tableStyles.item("cal_date" + settings.styleSet).name; }
        catch (myError){
           tableStyles.add({name:"cal_date" + settings.styleSet});
        }

        if( settings.bTextLayer )
        {
            try{ tableStyles.item("cal_text" + settings.styleSet).name; }
            catch (myError){
                tableStyles.add({name:"cal_text" + settings.styleSet});
            }
        }

        if( settings.bHolidaysLayer )
        {
            try{ tableStyles.item("cal_holiday" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_holiday" + settings.styleSet});
            }
        }

        if( settings.bJulianDateLayer )
        {
            try{ tableStyles.item("cal_julianDate" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_julianDate" + settings.styleSet});
            }
        }

        if( settings.bPicturesLayer )
        {
            try{ tableStyles.item("cal_pictures" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_pictures" + settings.styleSet});
            }
        }

        if( settings.bBackgroundLayer )
        {
            try{ tableStyles.item("cal_background" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_background" + settings.styleSet});
            }
        }

        if( settings.bMoonsLayer )
        {
            try{ tableStyles.item("cal_moon" + settings.styleSet).name; }
            catch (myError){
               tableStyles.add({name:"cal_moon" + settings.styleSet});
            }
        }

        if( settings.bAddMiniCalendars )
        {
           try{ tableStyles.item("calMini_date" + settings.styleSet).name; }
           catch (myError){
              tableStyles.add({name:"calMini_date" + settings.styleSet});
           }
        }
      }

      return;
   }
}
// --------------------------------------------------------------- //
function aGetHolidayFiles( settings )
{
   var i;
   var buffer;

   settings.holidayFiles = settings.holidaysFolder.getFiles("*.holidays");

   settings.holidayFilesShort = new Array();

   for( i = 0; i < settings.holidayFiles.length; i++ ) 
   {
      buffer = settings.holidayFiles[i].toString();
      settings.holidayFilesShort[i] = buffer.substring( buffer.indexOf( "holidays" ) + 9, buffer.indexOf( ".holiday" ) );
   }

   return;
}
// --------------------------------------------------------------- //
function bGetUserInput_new( settings, selector )
{
    var bOK;
    var dialogBox = new Window( 'dialog', "Radio Layout" );

    var rg = dialogBox.add ('group')
    var rb1 = rg.add ('radiobutton', undefined, 'Button 1');
    rb1.value = true;
    var rb2 = rg.add ('radiobutton', undefined, 'Button 2');
    bOK = dialogBox.show();

    if( bOK )
    {
//       ParseUserInput( settings, selector );

//       if( !bUserInputOK( settings ) )
//       {
//          bOK = false;
//       }
    }

    dialogBox.destroy();

    return( false );
}
// --------------------------------------------------------------- //
function bGetUserInput( settings, selector )
{
   var dialogBox;
   var result;
   var bOK;
   var i;

   aGetHolidayFiles( settings );
   selector.holidaySelectorsA = new Array();
   selector.holidaySelectorsB = new Array();
   selector.holidaySelectorsC = new Array();
   selector.holidaySelectorsD = new Array();

   dialogBox = app.dialogs.add({name:settings.title,canCancel:true});
   with(dialogBox)
   {
      //Add a dialog column.
      with(dialogColumns.add())
      {
        with( dialogRows.add() )
        {
          with(dialogColumns.add())
          {
            staticTexts.add({staticLabel:"First Month"});
            staticTexts.add({staticLabel:"Last Month"});
          }
          with(dialogColumns.add())
          {
            selector.StartMonth = dropdowns.add({stringList:settings.monthOptions,
                                                 selectedIndex:settings.today.getMonth()});
            selector.EndMonth = dropdowns.add({stringList:settings.monthOptions,
                                               selectedIndex:settings.today.getMonth()});
          }
          with(dialogColumns.add())
          {
            selector.StartYear = dropdowns.add({stringList:settings.yearOptions,
                                                selectedIndex:8});
            selector.EndYear = dropdowns.add({stringList:settings.yearOptions,
                                              selectedIndex:8});
          }
        }

        with( dialogRows.add() )
        {
          staticTexts.add({staticLabel:" "});
        }

        with(dialogRows.add())
        {
          with(dialogColumns.add())
          {
            staticTexts.add({staticLabel:"Calendar Options"});
            with( dialogRows.add() )
            {
               staticTexts.add({staticLabel:"Language"});
               selector.Language = dropdowns.add({stringList:settings.languageOptions,
                                                  selectedIndex:0});
            }
            with( dialogRows.add() )
            {
               staticTexts.add({staticLabel:"Start on"});
               selector.StartDay = dropdowns.add({stringList:settings.startDayOptions,
                                                  selectedIndex:0});
            }
            with( dialogRows.add() )
            {
               staticTexts.add({staticLabel:"Date Rows"});
               selector.MaxRowCount = dropdowns.add({stringList:settings.maxRowCountOptions,
                                                     selectedIndex:0});
            }
            with( dialogRows.add() )
            {
               staticTexts.add({staticLabel:"Count Work Week on"});
               selector.WorkWeekStart = dropdowns.add({stringList:settings.workWeekStartOptions,
                                                       selectedIndex:0});
            }
            with( dialogRows.add() )
            {
               staticTexts.add({staticLabel:"Heading Style"});
               selector.headerOptions = dropdowns.add({stringList:settings.headerOptions,
                                                       selectedIndex:0});
            }
            with( dialogRows.add() )
            {
               selector.IncludeMonthName = checkboxControls.add({checkedState:true});
               staticTexts.add({staticLabel:"Include Month Name"});
            }
            with( dialogRows.add() )
            {
               selector.IncludeWeekDayNames = checkboxControls.add({checkedState:true});
               staticTexts.add({staticLabel:"Include Week Day Names"});
            }
            with( dialogRows.add() )
            {
               selector.AddMiniCalendars = checkboxControls.add({checkedState:false});
               staticTexts.add({staticLabel:"Include Mini-Calendar"});
            }
            with( dialogRows.add() )
            {
               selector.AddWorkWeek = checkboxControls.add({checkedState:false});
               staticTexts.add({staticLabel:"Include Work Weeks"});
            }
            with( dialogRows.add() )
            {
               selector.AddNonMonthDays = checkboxControls.add({checkedState:false});
               staticTexts.add({staticLabel:"Include Non-Month Days"});
            }
            with( dialogRows.add() )
            {
               selector.bHighlightSundays = checkboxControls.add({checkedState:false});
               staticTexts.add({staticLabel:"Highlight Sundays"});
            }
            with( dialogRows.add() )
            {
               selector.bHighlightHolidays = checkboxControls.add({checkedState:false});
               staticTexts.add({staticLabel:"Highlight Holidays"});
            }
          }
          with(dialogColumns.add())
          {
            staticTexts.add({staticLabel:"     "});
          }
          with(dialogColumns.add())
          {
            staticTexts.add({staticLabel:"Layer Options"});
            with(dialogRows.add())
            {
               with(dialogColumns.add())
               {
                 staticTexts.add({staticLabel:"Add Text Layer"});
                 staticTexts.add({staticLabel:"Add Holiday Layer"});
                 staticTexts.add({staticLabel:"Use Calendar Layer"});
                 staticTexts.add({staticLabel:"Add Day of Year Layer"});
                 staticTexts.add({staticLabel:"Add Moon Phases"});
                 staticTexts.add({staticLabel:"Add Picture Layer"});
                 staticTexts.add({staticLabel:"Add Background Layer"});
               }
               with(dialogColumns.add())
               {
                 selector.AddTextLayer       = checkboxControls.add({checkedState:true});
                 selector.AddHolidaysLayer   = checkboxControls.add({checkedState:false});
                 selector.UseCalendarLayer   = checkboxControls.add({checkedState:false});
                 selector.AddJulianDateLayer = checkboxControls.add({checkedState:false});
                 selector.AddMoonsLayer      = checkboxControls.add({checkedState:false});
                 selector.AddPicturesLayer   = checkboxControls.add({checkedState:false});
                 selector.AddBackgroundLayer = checkboxControls.add({checkedState:false});
               }
            }
            with(dialogColumns.add())
            {
              staticTexts.add({staticLabel:"     "});
            }
            with(dialogColumns.add())
            {
              staticTexts.add({staticLabel:"Holiday Options (M-D[-YYYY]:Text)"});
              with(dialogRows.add())
              {           

                 with(dialogColumns.add())
                 {
                    staticTexts.add({staticLabel:"<Style>"});
                    staticTexts.add({staticLabel:"From Current Frame"});
                    staticTexts.add({staticLabel:"From Custom Files"});
                    for( i = 0; i < settings.holidayFiles.length; i++ )
                    {
                       staticTexts.add({staticLabel: settings.holidayFilesShort[i]});
                    }
                 }

                 with(dialogColumns.add())
                 {
                     staticTexts.add({staticLabel:"A  "});
                    selector.GetHolidayFromCurrentFrameA = checkboxControls.add({checkedState:false});
                    selector.GetHolidayFromCustomFilesA  = checkboxControls.add({checkedState:false});
                    for( i = 0; i < settings.holidayFiles.length; i++ )
                    {
                       selector.holidaySelectorsA[i] = checkboxControls.add({checkedState:false});
                    }
                 }
                 with(dialogColumns.add())
                 {
                    staticTexts.add({staticLabel:"B  "});
                    selector.GetHolidayFromCurrentFrameB = checkboxControls.add({checkedState:false});
                    selector.GetHolidayFromCustomFilesB  = checkboxControls.add({checkedState:false});
                    for( i = 0; i < settings.holidayFiles.length; i++ )
                    {
                       selector.holidaySelectorsB[i] = checkboxControls.add({checkedState:false});
                    }
                 }
                 with(dialogColumns.add())
                 {
                    staticTexts.add({staticLabel:"C  "});
                    selector.GetHolidayFromCurrentFrameC = checkboxControls.add({checkedState:false});
                    selector.GetHolidayFromCustomFilesC  = checkboxControls.add({checkedState:false});
                    for( i = 0; i < settings.holidayFiles.length; i++ )
                    {
                       selector.holidaySelectorsC[i] = checkboxControls.add({checkedState:false});
                    }
                 }
                 with(dialogColumns.add())
                 {
                    staticTexts.add({staticLabel:"D  "});
                    selector.GetHolidayFromCurrentFrameD = checkboxControls.add({checkedState:false});
                    selector.GetHolidayFromCustomFilesD  = checkboxControls.add({checkedState:false});
                    for( i = 0; i < settings.holidayFiles.length; i++ )
                    {
                       selector.holidaySelectorsD[i] = checkboxControls.add({checkedState:false});
                    }
                 }
              }
            }
          }
        }

        with( dialogRows.add() )
        {
           staticTexts.add({staticLabel:" "});
        }

        with( dialogRows.add() )
        {
           staticTexts.add({staticLabel:"Custom Sizes: Used when all values for the page or calendar size or both are specified"});
        }

        with( dialogRows.add() )
        {   
           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"Custom Page Size/Margin"});
              }
              with( dialogRows.add() )
              {
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:"Height"});
                    staticTexts.add({staticLabel:"Width"});
                    staticTexts.add({staticLabel:"Margin"});
                    staticTexts.add({staticLabel:"Bleed"});
                 }
                 with( dialogColumns.add() )
                 {
                    selector.customPageHeight = textEditboxes.add({minWidth:80});
                    selector.customPageWidth  = textEditboxes.add({minWidth:80});
                    selector.customPageMargin = textEditboxes.add({minWidth:80});
                    selector.customPageBleed = textEditboxes.add({minWidth:80});
                 }
              }
           }
           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"     "});
              }
           }
           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"Custom Calendar Size/Placement"});
              }              
              with( dialogRows.add() )
              {
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:"Top"});
                    staticTexts.add({staticLabel:"Bottom"});
                 }
                 with( dialogColumns.add() )
                 {
                    selector.customSizeY1 = textEditboxes.add({minWidth:40});
                    selector.customSizeY2 = textEditboxes.add({minWidth:40});
                    staticTexts.add({staticLabel:"Left"});
                 }
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:" "});
                    staticTexts.add({staticLabel:" "});
                    selector.customSizeX1 = textEditboxes.add({minWidth:40});
                 }
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:" "});
                    staticTexts.add({staticLabel:" "});
                    staticTexts.add({staticLabel:"Right"});
                 }
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:" "});
                    staticTexts.add({staticLabel:" "});
                    selector.customSizeX2 = textEditboxes.add({minWidth:40});
                 }
              }
           }
           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"     "});
              }
           }
           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"Units/Style"});
              }
              with( dialogRows.add() )
              {
                 with( dialogColumns.add() )
                 {
                    staticTexts.add({staticLabel:"Units:"});
                    staticTexts.add({staticLabel:"Calendar Style Set:"});
                 }
                 with( dialogColumns.add() )
                 {
                    selector.customSizeUnitOptions = dropdowns.add({stringList:settings.calendarCustomSizeUnitOptions, selectedIndex:0});
                    selector.styleSetOptions       = dropdowns.add({stringList:settings.styleSetOptions, selectedIndex:0});
                 }
              }
           }
        }

        with( dialogRows.add() )
        {
           staticTexts.add({staticLabel:" "});
        }

        with( dialogRows.add() )
        {
           with(dialogColumns.add())
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"Calendars per Page"});
                 selector.CalendarsPerPage = dropdowns.add({stringList:settings.calendarsPerPageOptions,
                    selectedIndex:0});
                 staticTexts.add({staticLabel:" Color Space"});
                 selector.ColorSpace = dropdowns.add({stringList:settings.colorSpaceOptions,
                    selectedIndex:0});
              }

              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"Page"});
                 selector.PageType = dropdowns.add({stringList:settings.pageTypeOptions,
                    selectedIndex:0});
                 selector.PageOrientation = dropdowns.add({stringList:settings.pageOrientationOptions,
                    selectedIndex:2});
                 selector.PageSize = dropdowns.add({stringList:settings.pageSizeOptions,
                    selectedIndex:0});
              }
           }

           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"     "});
              }
           }

           with( dialogColumns.add() )
           {
              with( dialogRows.add() )
              {
                 selector.ShowHelp = checkboxControls.add({checkedState:false});
                 staticTexts.add({staticLabel:"Show Full Help"});
              }
              staticTexts.add({staticLabel:"Holiday Example: 1-1:New Year\'s Day"});
           }
        }

        with( dialogRows.add() )
        {
           staticTexts.add({staticLabel:"     "});
        }

        with( dialogRows.add() )
        {
           with(dialogColumns.add())
           {
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"If you find this script useful please make a donation at: http://calendarwizard.sourceforge.net"});
              }
              with( dialogRows.add() )
              {
                 staticTexts.add({staticLabel:"You can also find documentation and tutorial examples there."});
              }
           }
        }
      }
   }

   // this is necessary because a previous script written by somebody else might 
   // have disabled it which would cause the script to not work.
   if( !settings.bCS )
   {
      app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
   }

   bOK = dialogBox.show();

   if( bOK )
   {
      ParseUserInput( settings, selector );

      if( !bUserInputOK( settings ) )
      {
         bOK = false;
      }
   }

   dialogBox.destroy();

   return( bOK );
}
// --------------------------------------------------------------- //
function ParseUserInput( settings, selector )
{
   var i;
   var pageSize;
   settings.bHolidayStyleA = false;
   settings.bHolidayStyleB = false;
   settings.bHolidayStyleC = false;
   settings.bHolidayStyleD = false;
   settings.holidaySelectorsStyle = new Array();

   // Page Options
   settings.iCalendarsPerPage = parseInt( settings.calendarsPerPageOptions[ 
                                          selector.CalendarsPerPage.selectedIndex ] );
   settings.sPageType         = settings.pageTypeOptions[ selector.PageType.selectedIndex ];
   settings.sPageOrientation  = settings.pageOrientationOptions[ selector.PageOrientation.selectedIndex ];
   settings.sColorSpace       = settings.colorSpaceOptions[ selector.ColorSpace.selectedIndex ];

   // Start and End Month
   settings.iStartMonth  = selector.StartMonth.selectedIndex;
   settings.iEndMonth    = selector.EndMonth.selectedIndex;

   // Start and End Year
   settings.sStartYear   = settings.yearOptions[ selector.StartYear.selectedIndex ];
   settings.sEndYear     = settings.yearOptions[ selector.EndYear.selectedIndex ];
   settings.iStartYear   = parseInt( settings.sStartYear );
   settings.iEndYear     = parseInt( settings.sEndYear );

   // Day Ordering
   if( selector.StartDay.selectedIndex == 1 ){
      settings.dayOrdering = new Array(1, 2, 3, 4, 5, 6, 0);
   } else if ( selector.StartDay.selectedIndex== 2){
	  settings.dayOrdering = new Array(6, 0, 1, 2, 3, 4, 5);
   } else {
      settings.dayOrdering = new Array(0, 1, 2, 3, 4, 5, 6);
   }

   // Add Mini Calendars
   settings.bAddMiniCalendars = selector.AddMiniCalendars.checkedState;
   if( settings.bAddMiniCalendars == true && settings.iCalendarsPerPage > 4 )
   {
      alert( "Mini-Calendars can only be activated when there are four or less calendars per page." );
      settings.bAddMiniCalendars = false;
   }
   
   settings.bExcludeMonthName = !selector.IncludeMonthName.checkedState;
   if( settings.bExcludeMonthName && settings.bAddMiniCalendars )
   {
      alert( "Mini-Calendars can not be used when the month name is excluded." );
      settings.bAddMiniCalendars = false;
   }
   
   settings.bExcludeWeekDayNames = !selector.IncludeWeekDayNames.checkedState;

   if( selector.WorkWeekStart.selectedIndex == 0 )
   {
      settings.workWeekStart = 'FirstFullWeek';
   }
   else //if( selector.WorkWeekStart.selectedIndex == 1 )
   {
      settings.workWeekStart = 'Jan1';
   }

   settings.bAddWorkWeek       = selector.AddWorkWeek.checkedState;
   settings.bAddNonMonthDays   = selector.AddNonMonthDays.checkedState;
   settings.bDateLayer         = selector.UseCalendarLayer.checkedState;
   settings.bHolidaysLayer     = selector.AddHolidaysLayer.checkedState;
   settings.bJulianDateLayer   = selector.AddJulianDateLayer.checkedState;
   settings.bPicturesLayer     = selector.AddPicturesLayer.checkedState;
   settings.bBackgroundLayer   = selector.AddBackgroundLayer.checkedState;
   settings.bTextLayer         = selector.AddTextLayer.checkedState;
   settings.bMoonsLayer        = selector.AddMoonsLayer.checkedState;
   settings.bHighlightSundays  = selector.bHighlightSundays.checkedState;
   settings.bHighlightHolidays = selector.bHighlightHolidays.checkedState;

   settings.headerType         = settings.headerOptions[ selector.headerOptions.selectedIndex ];

   if( selector.ShowHelp.checkedState )
   {
      settings.bShowHelp = true;
      settings.sPageType = "New Document";
      settings.sPageOrientation = settings.pageOrientationOptions[ 1 ];
   }
   else
   {
      settings.bShowHelp = false;
   }

   // Add Holidays  rom Frame
   if( selector.GetHolidayFromCurrentFrameA.checkedState || 
       selector.GetHolidayFromCurrentFrameB.checkedState ||
       selector.GetHolidayFromCurrentFrameC.checkedState ||
       selector.GetHolidayFromCurrentFrameD.checkedState ){
      settings.bGetFrameHolidays = true;
      settings.bHolidaysLayer = true;

      if( settings.sPageType == "Auto" )
      {
         settings.sPageType = 'New Document';
      }

      if( selector.GetHolidayFromCurrentFrameA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
      else if( selector.GetHolidayFromCurrentFrameB.checkedState )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'B';
      }
      else if( selector.GetHolidayFromCurrentFrameC.checkedState )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'C';
      }
      else if( selector.GetHolidayFromCurrentFrameD.checkedState )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'D';
      }
      else //( selector.GetHolidayFromCurrentFrameB.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCurrentFrameStyle = 'A';
      }
   } else {
      settings.bGetFrameHolidays = false;
   }

   // Holiday Custom Files
   if( selector.GetHolidayFromCustomFilesA.checkedState ||
       selector.GetHolidayFromCustomFilesB.checkedState ||
       selector.GetHolidayFromCustomFilesC.checkedState ||
       selector.GetHolidayFromCustomFilesD.checkedState ){
      settings.bGetCustomHolidays = true;
      settings.bHolidaysLayer = true;

      if( selector.GetHolidayFromCustomFilesA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }
      else if( selector.GetHolidayFromCustomFilesB.checkedState )
      {
          settings.bHolidayStyleB = true;
          settings.GetHolidaysFromCustomFilesStyle = 'B';
      }
      else if( selector.GetHolidayFromCustomFilesC.checkedState )
      {
          settings.bHolidayStyleC = true;
          settings.GetHolidaysFromCustomFilesStyle = 'C';
      }
      else if( selector.GetHolidayFromCustomFilesD.checkedState )
      {
          settings.bHolidayStyleD = true;
          settings.GetHolidaysFromCustomFilesStyle = 'D';
      }
      else //if( selector.GetHolidayFromCustomFilesA.checkedState )
      {
          settings.bHolidayStyleA = true;
          settings.GetHolidaysFromCustomFilesStyle = 'A';
      }

   } else {
      settings.bGetCustomHolidays = false;
   }

   // Holiday Files
   for( i = 0; i < settings.holidayFiles.length; i++ )
   {
      if( selector.holidaySelectorsA[i].checkedState ||
          selector.holidaySelectorsB[i].checkedState ||
          selector.holidaySelectorsC[i].checkedState ||
          selector.holidaySelectorsD[i].checkedState ){
         settings.bHolidaysLayer   = true;
         settings.bGetFileHolidays = true;
         settings.bHolidaysFile[i] = true;

         if( selector.holidaySelectorsA[i].checkedState )
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }
         else if( selector.holidaySelectorsB[i].checkedState )
         {
             settings.bHolidayStyleB = true;
             settings.holidaySelectorsStyle[i] = 'B';
         }
         else if( selector.holidaySelectorsC[i].checkedState )
         {
             settings.bHolidayStyleC = true;
             settings.holidaySelectorsStyle[i] = 'C';
         }
         else if( selector.holidaySelectorsD[i].checkedState )
         {
             settings.bHolidayStyleD = true;
             settings.holidaySelectorsStyle[i] = 'D';
         }
         else //if( selector.holidaySelectorsA[i].checkedState )
         {
             settings.bHolidayStyleA = true;
             settings.holidaySelectorsStyle[i] = 'A';
         }

         } else {
         settings.bHolidaysFile[i] = false;
      }
   }

   // Row count ( 0 = auto select )
   if( selector.MaxRowCount.selectedIndex > 0 ){
      settings.iFixedRowCount = parseInt( settings.maxRowCountOptions[ selector.MaxRowCount.selectedIndex ] );
   } else {
      settings.iFixedRowCount = 0;
   }

   selectLanguage( settings, selector );

   if( selector.customPageMargin.editContents.match( numberRegExp ) )
   {
      settings.bUseCustomPageMargin = true;
      settings.customPageMargin = selector.customPageMargin.editContents;
   }
   else
   {
      settings.bUseCustomPageMargin = false;
   }

   if( selector.customPageBleed.editContents.match( numberRegExp ) )
   {
      settings.bUseCustomPageBleed = true;
      settings.customPageBleed = selector.customPageBleed.editContents;
   }

   if(    selector.customSizeY1.editContents.match( numberRegExp ) 
       && selector.customSizeY2.editContents.match( numberRegExp ) 
       && selector.customSizeX1.editContents.match( numberRegExp ) 
       && selector.customSizeX2.editContents.match( numberRegExp ) )
   {
      settings.bUseCustomSize = true;
      settings.customSizeY1 = selector.customSizeY1.editContents;
      settings.customSizeY2 = selector.customSizeY2.editContents;
      settings.customSizeX1 = selector.customSizeX1.editContents;
      settings.customSizeX2 = selector.customSizeX2.editContents;
   }
   else
   {
      settings.bUseCustomSize = false;
   }

   settings.customSizeUnits = settings.calendarCustomSizeUnitOptions[ selector.customSizeUnitOptions.selectedIndex ];
   settings.styleSet = settings.styleSetOptions[ selector.styleSetOptions.selectedIndex ];

   if(    selector.customPageHeight.editContents.match( numberRegExp ) 
       && selector.customPageWidth.editContents.match( numberRegExp ) )
   {
      settings.sPageType = "New Document";
      settings.customPageHeight = selector.customPageHeight.editContents;
      settings.customPageWidth  = selector.customPageWidth.editContents;
      settings.bUseCustomPageSize = true;
   }
   else
   {
      settings.bUseCustomPageSize = false;
      sPageSize = settings.pageSizeOptions[ selector.PageSize.selectedIndex ];
      if( sPageSize == 'B5' )
      {
         settings.customPageHeight = '25.0';
         settings.customPageWidth  = '17.6';    
         settings.customSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A5' )
      {
         settings.customPageHeight = '21.0';
         settings.customPageWidth  = '14.8';    
         settings.customSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A4' )
      {
         settings.customPageHeight = '29.7';
         settings.customPageWidth  = '21.0';    
         settings.customSizeUnits = "centimeters";
      }
      else if( sPageSize == 'A3' )
      {
         settings.customPageHeight = '42.0';
         settings.customPageWidth  = '29.7';    
         settings.customSizeUnits = "centimeters";
      }
      else if( sPageSize == 'Legal - Half' )
      {
         settings.customPageHeight = '7';
         settings.customPageWidth  = '8.5';    
         settings.customSizeUnits = "inches";
      }
      else if( sPageSize == 'Letter - Half' )
      {
         settings.customPageHeight = '5.5';
         settings.customPageWidth  = '8.5';    
         settings.customSizeUnits = "inches";
      }
      else if( sPageSize == 'Tabloid' )
      {
         settings.customPageHeight = '17';
         settings.customPageWidth  = '11';    
         settings.customSizeUnits = "inches";
      }
      else if( sPageSize == 'Legal' )
      {
         settings.customPageHeight = '14';
         settings.customPageWidth  = '8.5';    
         settings.customSizeUnits = "inches";
      }
      else //( sPageSize == 'Letter' )
      {
         settings.customPageHeight = '11';
         settings.customPageWidth  = '8.5';    
         settings.customSizeUnits = "inches";
      }
   }

   return;
}
// --------------------------------------------------------------- //
function ShowHelp( settings )
{
   var anythingRegExp = /\w/;
   var contents = "";
   var linesPerPage = 50;
   var marginPercent = 0.95;
   var pagesCount;
   var pages = new Array();
   var textFrames = new Array();;
   var i = 0;
   var lines = new Array();

   if( settings.help.exists )
   {
      settings.help.open();
      while( ! settings.help.eof )
      {
          line = settings.help.readln();
          contents += line + "\r";
          lines[i++] = line;
      }
      settings.help.close();
   }

   pagesCount = Math.ceil( lines.length/(linesPerPage * marginPercent) )

   pages[0] = settings.currentPage;
   textFrames[0] = settings.currentFrame;

   for( i = 1; i < pagesCount; i++ )
   {
       pages[i] = settings.currentDocument.pages.add();
       textFrames[i] = pages[i].textFrames.add();
       textFrames[i].geometricBounds = settings.calendarFramePositions[0];
       textFrames[i].previousTextFrame = textFrames[i-1];
   }

   settings.currentFrame.insertionPoints.firstItem().contents = contents;

   return;
}
// --------------------------------------------------------------- //
//function moonPhasePercent( iYear, iMonth, iDay )
function moonPhasePercent( inDate )
{
  var synodic = 29.53058867;
  var msPerDay = 86400000;
  var baseDate = new Date();

  // reference Full moon
  baseDate.setFullYear(2009);
  baseDate.setMonth(7);
  baseDate.setDate(6);
  baseDate.setHours(0);
  baseDate.setMinutes(55);

  var diff = inDate - baseDate;
  var phase = diff / (synodic * msPerDay);
  phase *= 100;
  phase = Math.abs(phase % 100);

  return(phase);
}
// --------------------------------------------------------------- //
function selectLanguage( settings, selector )
{
   if( settings.languageOptions[ selector.Language.selectedIndex ] == "Arabic (عربي)" )
   {
      settings.months    = new Array( 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر');
      settings.daysLong  = new Array( 'الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت' );
      settings.daysMid   = new Array( 'أحد', 'أثن', 'ثلا', 'أرب', 'خمس', 'جمع', 'سبت' );
      settings.daysShort = new Array( 'ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Azerbaijani" )
   {
      settings.months    = new Array( 'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
                                      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr');
      settings.daysLong  = new Array( 'Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 
                                      'Cümə axşamı', 'Cümə', 'Şənbə' );
      settings.daysMid   = new Array( 'Bzr', 'Bzr ert', 'Çar axş', 'Çar', 'Cüm axş', 'Cüm', 'Şnb' );
      settings.daysShort = new Array( 'B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Bosnian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                                      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar');
      settings.daysLong  = new Array( 'Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Bulgarian" )
   {
      settings.months    = new Array( 'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
                                      'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември');
      settings.daysLong  = new Array( 'Неделя', 'Понеделник', 'Вторник', 'Сряда', 
                                      'Четвъртък', 'Петък', 'Събота' );
      settings.daysMid   = new Array( 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд' );
      settings.daysShort = new Array( 'П', 'В', 'С', 'Ч', 'П', 'С', 'Н' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Catalan" )
   {
      settings.months    = new Array( 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
                                      'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre');
      settings.daysLong  = new Array( 'Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 
                                      'Dijous', 'Divendres', 'Dissabte' );
      settings.daysMid   = new Array( 'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds' );
      settings.daysShort = new Array( 'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds' );
   }  
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Chinese (繁體中文)" )
   {
      settings.months    = new Array( '一月', '二月', '三月', '四月', '五月', '六月',
                                      '七月', '八月', '九月', '十月', '十一月', '十二月');
      settings.daysLong  = new Array( '星期日', '星期一', '星期二', '星期三',
                                      '星期四', '星期五', '星期六' );
      settings.daysMid   = new Array( '週日', '週一', '週二', '週三', '週四', '週五', '週六');
      settings.daysShort = new Array( '日', '一', '二', '三', '四', '五', '六' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Croatian" )
   {
      settings.months    = new Array( 'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
                                      'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac');
      settings.daysLong  = new Array( 'Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda',
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Czech" )
   {
      settings.months    = new Array( 'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
                                      'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec');
      settings.daysLong  = new Array( 'Neděle', 'Pondělí', 'Úterý', 'Středa', 
                                      'Čtvrtek', 'Pátek', 'Sobota' );
      settings.daysMid   = new Array( 'Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So' );
      settings.daysShort = new Array( 'N', 'P', 'Ú', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Basque" )
   {
      settings.months    = new Array( 'Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina',
                                      'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua');
      settings.daysLong  = new Array( 'Igandea', 'Astelehena', 'Asteartea', 'Asteazkena',
                                      'Osteguna', 'Ostirala','Larunbata');
      settings.daysMid   = new Array( 'Ig', 'Al', 'As', 'Az', 'Og', 'Or', 'Lr' );
      settings.daysShort = new Array( 'Ig', 'Al', 'As', 'Az', 'Og', 'Or', 'Lr' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Danish" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Søndag', 'Mandag', 'Tirsdag','Onsdag',
                                      'Torsdag', 'Fredag', 'Lørdag' );
      settings.daysMid   = new Array( 'Søn', 'Man', 'Tir', 'Ons', 'Tor','Fre', 'Lør' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Dutch" )
   {
      settings.months    = new Array( 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
                                      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 
                                      'Donderdag', 'Vrijdag', 'Zaterdag' );
      settings.daysMid   = new Array( 'Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za');
      settings.daysShort = new Array( 'Z', 'M', 'D', 'W', 'D', 'V', 'Z' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Estonian" )
   {
      settings.months    = new Array( 'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
                                      'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember');
      settings.daysLong  = new Array( 'Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev',
                                      'Neljapäev', 'Reede', 'Laupäev' );
      settings.daysMid   = new Array( 'Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup' );
      settings.daysShort = new Array( 'P', 'E', 'T', 'K', 'N', 'R', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Fulah" )
   {
      settings.months    = new Array( 'Siilo', 'Colte', 'MBooy', 'Seeɗto', 'Duujal', 'Korse',
                                      'Morso', 'Juko', 'Siilto', 'Yarkomaa', 'Jolal', 'Bowte');
      settings.daysLong  = new Array( 'Dewo', 'Aaɓnde', 'Mawbaare', 'NJeslaare',
                                      'Naasaande', 'Mande', 'Hoore-Biir' );
      settings.daysMid   = new Array( 'Dew', 'Aaɓ', 'Maw', 'NJe', 'Naa', 'Mde', 'Hbi' );
      settings.daysShort = new Array( 'D', 'A', 'M', 'N', 'N', 'M', 'H' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Finnish" )
   {
      settings.months    = new Array( 'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
                                      'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu');
      settings.daysLong  = new Array( 'Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko',
                                      'Torstai', 'Perjantai', 'Lauantai' );
      settings.daysMid   = new Array( 'Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'K', 'T', 'P', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "French" )
   {
      settings.months    = new Array( 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
      settings.daysLong  = new Array( 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 
                                      'Jeudi', 'Vendredi', 'Samedi' );
      settings.daysMid   = new Array( 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'M', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "German" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
      settings.daysLong  = new Array( 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 
                                      'Donnerstag', 'Freitag', 'Samstag' );
      settings.daysMid   = new Array( 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' );
      settings.daysShort = new Array( 'S', 'M', 'D', 'M', 'D', 'F', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Greek" )
   {
      settings.months    = new Array( 'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
                                      'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος');
      settings.daysLong  = new Array( 'Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη',
                                      'Πέμπτη', 'Παρασκευή', 'Σάββατο' );
      settings.daysMid   = new Array( 'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ' );
      settings.daysShort = new Array( 'Κ', 'Δ', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σ' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Hungarian" )
   {
      settings.months    = new Array( 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
                                      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December');
      settings.daysLong  = new Array( 'Vasárnap', 'Hétfő', 'Kedd', 'Szerda',
                                      'Csütörtök', 'Péntek', 'Szombat' );
      settings.daysMid   = new Array( 'V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo' );
      settings.daysShort = new Array( 'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz' ); 
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Icelandic" )
   {
      settings.months    = new Array( 'Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júni',
                                      'Júli', 'Águst', 'September', 'Október', 'Nóvember', 'Desember');
      settings.daysLong  = new Array( 'Sunnudagur', 'Mánudagur', 'Þriðjudagur','Miðvikudagur',
                                      'Fimmtudagur', 'Föstudagur', 'Laugardagur' );
      settings.daysMid   = new Array( 'Sun', 'Mán', 'Þri', 'Mið', 'Fim','Fös', 'Lau' );
      settings.daysShort = new Array( 'S', 'M', 'Þ', 'M', 'F', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Italian" )
   {
      settings.months    = new Array( 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                                      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre');
      settings.daysLong  = new Array( 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì',
                                      'Giovedì', 'Venerdì', 'Sabato' );
      settings.daysMid   = new Array( 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'M', 'G', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Latvian" )
   {
      settings.months    = new Array( 'Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs',
                                      'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris');
      settings.daysLong  = new Array( 'Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 
                                      'Ceturtdiena', 'Piektdiena', 'Sestdiena' );
      settings.daysMid   = new Array( 'Svētd.', 'Pirmd.', 'Otrd.', 'Trešd.', 'Ceturtd.', 'Piektd.', 'Sestd.' );
      settings.daysShort = new Array( 'Sv', 'P', 'O', 'T', 'C', 'P', 'S' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Lithuanian" )
   {
      settings.months    = new Array( 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
                                      'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis');
      settings.daysLong  = new Array( 'Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 
                                      'Ketvirtadienis', 'Panktadienis', 'Šeštadienis' );
      settings.daysMid   = new Array( 'Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pe', 'Št' );
      settings.daysShort = new Array( 'S', 'P', 'A', 'T', 'K', 'Pe', 'Š' );
   }   
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Norwegian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
                                      'Juli', 'August', 'September', 'Oktober', 'November', 'Desember');
      settings.daysLong  = new Array( 'Søndag', 'Mandag', 'Tirsdag', 'Onsdag',
                                      'Torsdag', 'Fredag', 'Lørdag' );
      settings.daysMid   = new Array( 'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Polish" )
   {
      settings.months    = new Array( 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                                      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień');
      settings.daysLong  = new Array( 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 
                                      'Czwartek', 'Piątek', 'Sobota' );
      settings.daysMid   = new Array( 'Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob' );
      settings.daysShort = new Array( 'N', 'P', 'W', 'Ś', 'C', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Portuguese" )
   {
      settings.months    = new Array( 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
      settings.daysLong  = new Array( 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
                                      'Quinta-feira', 'Sexta-feira', 'Sábado' );
      settings.daysMid   = new Array( 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' );
      settings.daysShort = new Array( 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Romanian" )
   {
      settings.months     = new Array( 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
                                       'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie');
      settings.daysLong   = new Array( 'Duminică', 'Luni', 'Marţi', 'Miercuri',
                                       'Joi', 'Vineri', 'Sâmbătă' );
      settings.daysMid    = new Array( 'Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ' );
      settings.daysShort  = new Array( 'D', 'L', 'M', 'M', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Russian" )
   {
      settings.months     = new Array( 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                                       'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');
      settings.daysLong   = new Array( 'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
                                       'Четверг', 'Пятница', 'Суббота' );
      settings.daysMid    = new Array( 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' );
      settings.daysShort  = new Array( 'В', 'П', 'В', 'С', 'Ч', 'П', 'С' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Serbian Latin" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                                      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar');
      settings.daysLong  = new Array( 'Nedelja', 'Ponedeljak', 'Utorak', 'Sreda',
                                      'Četvrtak', 'Petak', 'Subota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Serbian Cyrillic" )
   {
      settings.months    = new Array( 'Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун',
                                      'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар');
      settings.daysLong  = new Array( 'Недеља', 'Понедељак', 'Уторак', 'Среда',
                                      'Четвртак', 'Петак', 'Субота' );
      settings.daysMid   = new Array( 'Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб' );
      settings.daysShort = new Array( 'Н', 'П', 'У', 'С', 'Ч', 'П', 'С' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Slovak" )
   {
      settings.months    = new Array( 'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
                                      'Júl', 'August', 'September', 'Október', 'November', 'Decemeber');
      settings.daysLong  = new Array( 'Nedeľa', 'Pondelok', 'Utorok', 'Streda',
                                      'Štvrtok', 'Piatok', 'Sobota' );
      settings.daysMid   = new Array( 'Ne', 'Po', 'Ut', 'Str', 'Štv', 'Pi', 'So' );
      settings.daysShort = new Array( 'N', 'P', 'U', 'S', 'Š', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Slovenian" )
   {
      settings.months    = new Array( 'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij',
                                      'Julij', 'Avgust', 'September', 'Oktober', 'November', 'Decemeber');
      settings.daysLong  = new Array( 'Nedelja', 'Ponedeljek', 'Torek', 'Sreda',
                                      'Četrtek', 'Petek', 'Sobota' );
      settings.daysMid   = new Array( 'Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob' );
      settings.daysShort = new Array( 'N', 'P', 'T', 'S', 'Č', 'P', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Spanish" )
   {
      settings.months   = new Array( 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
      settings.daysLong  = new Array( 'Domingo', 'Lunes', 'Martes', 'Miércoles', 
                                      'Jueves', 'Viernes', 'Sábado' );
      settings.daysMid   = new Array( 'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb' );
      settings.daysShort = new Array( 'D', 'L', 'M', 'X', 'J', 'V', 'S' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Swedish" )
   {
      settings.months    = new Array( 'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
                                      'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December');
      settings.daysLong  = new Array( 'Söndag', 'Måndag', 'Tisdag', 'Onsdag',
                                      'Torsdag', 'Fredag', 'Lördag' );
      settings.daysMid   = new Array( 'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'O', 'T', 'F', 'L' );
   }
   else if( settings.languageOptions[ selector.Language.selectedIndex ] == "Turkish" )
   {
      settings.months    = new Array( 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                                      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık');
      settings.daysLong  = new Array( 'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 
                                      'Perşembe', 'Cuma', 'Cumartesi' );
      settings.daysMid   = new Array( 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt');
      settings.daysShort = new Array( 'P', 'Pt', 'S', 'Ç', 'P', 'C', 'Ct' );
   }
   else //English
   {
      settings.months    = settings.monthOptions;
      settings.daysLong  = new Array( 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                                      'Thursday', 'Friday', 'Saturday' );
      settings.daysMid   = new Array( 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' );
      settings.daysShort = new Array( 'S', 'M', 'T', 'W', 'T', 'F', 'S' );
   }

   return;
}

