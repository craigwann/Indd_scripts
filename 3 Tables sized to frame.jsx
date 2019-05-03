
// Size a frame's tables to the width of the frame 
// by resizing columns proportionally.
// (Fix row height to 12 points.)
// Peter Kahrel -- www.kahrel.plus.com

(function () {
	
	var units;
	
	//-------------------------------------------
	// Get the columns that are wide enough to be resized 
	// (Result may not always be good when widening a table)
	
	function adjustWidth (excess, columns) {
		var resizeColumns = [];
		var diff = excess/columns.length;
		for (var i = 0; i < columns.length; i++) {
			if (columns[i].width > diff+3) {
				resizeColumns.push (columns[i]);
			}
		}
		return {resizeable: resizeColumns, delta: (excess/resizeColumns.length)}
	}

	//----------------------------------------------
	// Get a table's resizeable columns, then resize them
	// Take the right edge into account. Border are a mess, 
	// we ignore them.
	
	function resizeTable (table, frameWidth) {
		var data;
		var columns = table.columns.everyItem().getElements();
		var tableWidth = table.width + (table.columns[-1].rightEdgeStrokeWeight);
		var excess = Math.abs (frameWidth - tableWidth);
		data = adjustWidth (excess, columns);
		if (tableWidth > frameWidth) {
			data.delta = -data.delta;
		}
		for (var i = data.resizeable.length-1; i >= 0; i--) {
			data.resizeable[i].width += data.delta;
		}
	}

	// ----------------------------------------------
	// Get the selected frame and resize the tables that aren't the frame's width
	// (Fix the height of all rows at 12 points)
	
	function resizeTables (frame) {
		var frameWidth = frame.geometricBounds[3] - frame.geometricBounds[1];
		var tables = frame.tables.everyItem().getElements();
		for (var i = tables.length-1; i >= 0; i--) {
			if (tables[i].width !== frameWidth) {
				resizeTable (tables[i], frameWidth);
			}
			// tables[i].rows.everyItem().autoGrow = false;
			// tables[i].rows.everyItem().height = 12;
		}
	}


	if (app.selection.length > 0 && app.selection[0] instanceof TextFrame) {
		units = app.scriptPreferences.measurementUnit;
		app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
		resizeTables (app.selection[0]);
		app.scriptPreferences.measurementUnit = units;
	} else {
		alert ('Please select a text frame.', 'Size tables', true);
	}

}());