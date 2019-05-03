var myDoc = app.activeDocument;

// Create a new layer
try {
	myDoc.layers.add ({name: 'Text', layerColor: UIColors.red});
}
catch (myError) { // Layer already exists
	myDoc.activeLayer = myDoc.layers.item("Text");
	myDoc.activeLayer.layerColor = UIColors.red;
}