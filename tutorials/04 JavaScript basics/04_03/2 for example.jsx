﻿var myDoc = app.activeDocument;for (var myCounter = 0; myCounter < myDoc.pages.length; myCounter = myCounter + 1) {    var myPageName = myDoc.pages[myCounter].name;    var myPage = myDoc.pages[myCounter];    var myTextFrame = myPage.textFrames.add();    myTextFrame.geometricBounds = [730, 72, 760, 540];    myTextFrame.contents = "Do Not Duplicate";    myTextFrame.paragraphs[0].justification = Justification.centerAlign;}