//Evaluate the first item in the selection based on its type.
switch (app.selection[0].constructor.name){
	case "InsertionPoint":
		break;
	case "Character":
		break;
	case "Word":
		break;
	case "TextStyleRange":
		break;
	case "Line":
		break;
	case "Paragraph":
		break;
	case "TextColumn":
		break;
	case "Text":
		break;
	case "Story":
		break;
	case "Table":
		break;
	case "Cell":
		break;
	case "TextFrame":
		break;
	case "Rectangle":
        app.selection[0].fillColor = "C=15 M=100 Y=100 K=0";
		app.selection[0].fillTint = 100;
		break;
	case "Oval":
		app.selection[0].fillColor = "Black";
		app.selection[0].fillTint = 100;
		break;
	case "Polygon":
        app.selection[0].fillColor = "C=75 M=5 Y=100 K=0";
		app.selection[0].fillTint = 100;
		break;
	case "GraphicLine":
		break;
	case "EPS":
		break;
	case "PDF":
		break;
	case "ImportedPage":
		break;
	case "Image":
		break;
	default:
		break;
}