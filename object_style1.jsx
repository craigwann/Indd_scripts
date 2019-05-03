function DefaultAction(){

    /** command array */
    var commands = [

    /** ACTION FUNCTIONS BEGIN HERE: **/

        /* Assign a property from the objectStyles collection */
        function assign_appliedObjectStyle(obj){ 
            obj.appliedObjectStyle = document.objectStyles.itemByName("Image"); 
        }

    ];

    /** START ACTION EXECUTION CODE: **/

    var applyToSelection = [true,true,true,true];
    var repeats = 1;
    while(repeats--){
    for(var idx=0; idx < commands.length; idx++){
        try{var i = void 0; (!applyToSelection[idx])?commands[idx]():(function(command){
        while((i = (i||0)+1) <= app.selection.length){
             try{ command(app.selection[i-1]); }catch(err){
                //Selection command error handling code here.
             }
        }})(commands[idx]);}catch(err){
            //Insert Error Handling Code Here.
    }}}

 /** END ACTION EXECUTION CODE: **/

}
];
for(var idx = 0; idx < actions.length; idx++){
         actions[idx]()                       
}  