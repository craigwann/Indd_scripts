links = app.documents[0].links.everyItem().getElements();  
for (i = 0; i < links.length; i++) {  
  links[i].parent.parent.fit (FitOptions.PROPORTIONALLY);  
}  