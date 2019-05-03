//DESCRIPTION:Configure all preferences and settings for print
// Setup-print.jsx
//
// Modified 2015-07-30
// Keith Gilbert, Gilbert Consulting
// www.gilbertconsulting.com
//

Main();

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		// The following settings are arranged in the order in which they appear in InDesign's menus and preferences dialog box
// Type > Show hidden characters
		myDoc.textPreferences.showInvisibles = true;
// View > Screen Mode > Normal
		app.activeWindow.screenMode = ScreenModeOptions.PREVIEW_OFF;
// View > Display Performance > Typical Display
		app.activeWindow.viewDisplaySetting = ViewDisplaySettings.TYPICAL;
// View > Show Rulers
		myDoc.viewPreferences.showRulers = true;
// View > Extras
		myDoc.viewPreferences.showFrameEdges = true;
		// There is no good way to turn on display of text threads. The following code doesn't work correctly.
		// try {
		// 	var myMenuAction1 = app.menuActions.itemByID(24332);
		// 	if (myMenuAction1.name == "Show Text Threads") {
		// 		app.menuActions.itemByID(24332).invoke();
		// 	}
		// }
		// catch (myError) {};
		// Can't locate a way to show assigned frames	
		// Can't locate a way to show hyperlinks	
		myDoc.viewPreferences.showNotes = true;
		// Can't locate a way to show the Links badge	
		app.generalPreferences.showContentGrabber = false;
		app.generalPreferences.showLiveCorners = true;
		app.generalPreferences.showAnchorObjectAdornment = true;
		app.generalPreferences.showConveyor = false;
// View > Grids & Guides
		myDoc.guidePreferences.guidesShown = true;
		myDoc.guidePreferences.guidesLocked = false;
		myDoc.documentPreferences.columnGuideLocked = true;
		myDoc.guidePreferences.guidesSnapto = true;
		app.smartGuidePreferences.enabled = false;
		myDoc.gridPreferences.baselineGridShown = false;
		myDoc.gridPreferences.documentGridShown = false;
		myDoc.gridPreferences.documentGridSnapto = false;
// View > Structure
		myDoc.xmlViewPreferences.showStructure = false;
		myDoc.xmlViewPreferences.showAttributes = true;
		myDoc.xmlViewPreferences.showTextSnippets = true;
		myDoc.xmlViewPreferences.showTagMarkers = true;
		myDoc.xmlViewPreferences.showTaggedFrames = true;
// View > Story Editor
		// myDoc.galleyPreferences...
// Window > Application Frame	
		app.generalPreferences.useApplicationFrame = true;
// Edit > Transparency Blend Space
		myDoc.transparencyPreferences.blendingSpace = BlendingSpace.CMYK;
// Preferences : General
		app.generalPreferences.pageNumbering = PageNumberingOptions.SECTION; // ABSOLUTE, SECTION
		app.generalPreferences.completeFontDownloadGlyphLimit = 2000;
		app.generalPreferences.preventSelectingLockedItems = true;
		// When Scaling????
		app.generalPreferences.useIncomingSpotUponConflict = false;
// Preferences : Interface
		app.generalPreferences.uiBrightnessPreference = 1; // 0.0 to 1.0
		app.generalPreferences.pasteboardColorPreference = 0; // 0 to set preference to Default White, 1 to set preference to Match to Theme Color
		app.generalPreferences.toolTips = ToolTipOptions.FAST; // NORMAL, NONE, FAST
		app.generalPreferences.placeCursorUsesThumbnails = true;
		app.generalPreferences.showTransformationValues = true;
		app.generalPreferences.enableMultiTouchGestures = false;
		app.generalPreferences.highlightObjectUnderSelectionTool = true;
		app.generalPreferences.toolsPanel = ToolsPanelOptions.SINGLE_COLUMN; // SINGLE_COLUMN, DOUBLE_COLUMN, SINGLE_ROW
		app.generalPreferences.autoCollapseIconPanels = false;
		app.generalPreferences.autoShowHiddenPanels = true;
		app.generalPreferences.openDocumentsAsTabs = true;
		app.generalPreferences.enableFloatingWindowDocking = true;
		app.grabberPreferences.grabberPanning = PanningTypes.GREEK_IMAGES_AND_TEXT; // NO_GREEKING, GREEK_IMAGES, GREEK_IMAGES_AND_TEXT
		app.liveScreenDrawing = LiveDrawingOptions.DELAYED; // NEVER, IMMEDIATELY, DELAYED
		app.generalPreferences.greekVectorGraphicsOnDrag = false;
// Preferences : Type
		myDoc.textPreferences.typographersQuotes = true;
		app.textEditingPreferences.singleClickConvertsFramesToTextFrames = true;
		myDoc.textPreferences.useOpticalSize = true;
		app.textEditingPreferences.tripleClickSelectsLine = true;
		myDoc.textPreferences.useParagraphLeading = false;
		app.textEditingPreferences.smartCutAndPaste = true;
		// Font preview size????
		// Number of recent fonts????
		app.textEditingPreferences.allowDragAndDropTextInStory = true;
		app.textEditingPreferences.dragAndDropTextInLayout = true;
		myDoc.textPreferences.smartTextReflow = true;
		myDoc.textPreferences.addPages = AddPageOptions.END_OF_STORY; // END_OF_STORY, END_OF_SECTION, END_OF_DOCUMENT
		myDoc.textPreferences.limitToMasterTextFrames = true;
		myDoc.textPreferences.preserveFacingPageSpreads = false;
		myDoc.textPreferences.deleteEmptyPages = false;
// Preferences : Advanced Type
		myDoc.textPreferences.superscriptSize = 58.3; // 1-200
		myDoc.textPreferences.superscriptPosition = 33.3; // -500 - +500
		myDoc.textPreferences.subscriptSize = 58.3; // 1-200
		myDoc.textPreferences.subscriptPosition = 33.3; // -500 - +500
		myDoc.textPreferences.smallCap = 70; // 1-200
		// Use inline input for non-latin text????
		// Use native digits when typing in Arabic Scripts????
		// Protect while typing????
		// Protect when applying fonts????
		// Default composer????
// Preferences : Composition
		myDoc.textPreferences.highlightKeeps = false;
		myDoc.textPreferences.highlightSubstitutedFonts = true;
		myDoc.textPreferences.highlightHjViolations = false;
		myDoc.textPreferences.highlightSubstitutedGlyphs = false;
		myDoc.textPreferences.highlightCustomSpacing = true;
		myDoc.textPreferences.justifyTextWraps = false;
		myDoc.textPreferences.abutTextToTextWrap = true;
		myDoc.textPreferences.zOrderTextWrap = false;
// Preferences : Units & Increments
		myDoc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN; // SPREAD_ORIGIN, PAGE_ORIGIN, SPINE_ORIGIN
		myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.PICAS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.PICAS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		myDoc.viewPreferences.strokeMeasurementUnits = MeasurementUnits.POINTS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		myDoc.viewPreferences.pointsPerInch = 72; // 60-80
		myDoc.viewPreferences.cursorKeyIncrement = "1pt"; // Range depends on the measurement unit. For points: 0.001 to 100; picas: 0p0.001 to 8p4; mm: 0 to 35.278; cm: 0 to 3.5278; inches: 0 to 1.3889; ciceros: 0c0.001 to 7c9.839)
		myDoc.textPreferences.baselineShiftKeyIncrement = "0.25pt"; // .001-100
		myDoc.textPreferences.leadingKeyIncrement = "1pt"; // .001-100
		myDoc.textPreferences.kerningKeyIncrement = 1; // 1-100
// Preferences : Grids
		// Various settings can be accessed in myDoc.gridPreferences
		myDoc.gridPreferences.gridsInBack = true;
// Preferences : Guides & Pasteboard
		// Margin color????
		// Columns color????
		myDoc.pasteboardPreferences.bleedGuideColor = UIColors.MAGENTA;
		myDoc.pasteboardPreferences.slugGuideColor = UIColors.GRID_BLUE;
		myDoc.pasteboardPreferences.matchPreviewBackgroundToThemeColor = false;
		myDoc.pasteboardPreferences.previewBackgroundColor = UIColors.LIGHT_GRAY;
		app.smartGuidePreferences.guideColor = UIColors.GRID_GREEN;
		myDoc.viewPreferences.guideSnaptoZone = 4; // (1-36)
		myDoc.guidePreferences.guidesInBack = false;
		app.smartGuidePreferences.alignToObjectCenter = true;
		app.smartGuidePreferences.smartDimensions = true;
		app.smartGuidePreferences.alignToObjectEdges = true;
		app.smartGuidePreferences.smartSpacing = true;
		myDoc.pasteboardPreferences.pasteboardMargins = [-1,"6p0"]; // A horizontal margin of -1 means one document page width
// Preferences : Dictionary
// Preferences : Spelling
// Preferences : Autocorrect
// Preferences : Notes
// Preferences : Track Changes
// Preferences : Story Editor Display
// Preferences : Display Performance
// Preferences : Appearance of Black
// Preferences : File Handling
		// app.generalPreferences.temporaryFolder = File location in which to store temporary files 
		app.generalPreferences.openRecentLength = 10; // 0 to 30
		app.generalPreferences.includePreview = true;
		app.generalPreferences.previewPages = PreviewPagesOptions.FIRST_10_PAGES; // FIRST_PAGE, FIRST_2_PAGES, FIRST_5_PAGES, FIRST_10_PAGES, ALL_PAGES
		app.generalPreferences.previewSize = PreviewSizeOptions.EXTRA_LARGE; // SMALL, MEDIUM, LARGE, EXTRA_LARGE
		// Snippet import????
		// Check links before opening????
		// Find missing links before opening????
		myDoc.textPreferences.linkTextFilesWhenImporting = false;
		// Preserve image dimensions????
		// Default Relink folder????	
// Preferences : Clipboard Handling
// Preferences : Technology Previews
// Add swatches and styles to CC Libraries?
		app.generalPreferences.autoAddCharStyleToCCLibraries = false;
		app.generalPreferences.autoAddParaStyleToCCLibraries = false;
		app.generalPreferences.autoAddSwatchToCCLibraries = false;
// Layers panel
		app.generalPreferences.ungroupRemembersLayers = true;
		app.clipboardPreferences.pasteRemembersLayers = false;
// Other useful stuff		
		app.generalPreferences.showWhatsNewOnStartup = false;
		// app.generalPreferences.objectsMoveWithPage = false;
		// app.generalPreferences.showMasterPageOverlay = true;
// Other settings not in the UI?
		// myDoc.viewPreferences.printDialogMeasurementUnits = MeasurementUnits.PICAS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		// myDoc.viewPreferences.textSizeMeasurementUnits = MeasurementUnits.PICAS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		// myDoc.viewPreferences.typographicMeasurementUnits = MeasurementUnits.PICAS; // POINTS, PICAS, INCHES, INCHES_DECIMAL, MILLIMETERS, CENTIMETERS, CICEROS, CUSTOM, AGATES, U, BAI, MILS, PIXELS, Q, HA, AMERICAN_POINTS
		// myDoc.textPreferences.enableStylePreviewMode = true;
		// app.generalPreferences.createLinksOnContentPlace = false;
		// myDoc.guidePreferences.rulerGuidesColor = UIColors.LIGHT_GRAY;
		// app.activeWindow.bounds=[22,0,1050,1680];
		// app.generalPreferences.customMonitorPpi = false;
		// app.generalPreferences.mapStylesOnContentPlace = false;
		// app.generalPreferences.useCustomMonitorResolution = true;
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.")
	}
}