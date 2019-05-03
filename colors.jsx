//DESCRIPTION: Practice script from https://www.youtube.com/watch?v=FSx9LVTSHTo
// Script colors.jsx
//
// Modified 05/02/2019
for (i = 0; i < 100; i++) {
    app.activeDocument.colors.add({
        colorValue: [i, 100, 0, 0],
        name: "C"+i

    });
}