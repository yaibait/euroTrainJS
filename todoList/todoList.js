var modalEl = document.getElementById('add_note_modal');
function activateModal() {
    // initialize modal element
    modalEl.style.display  = "block";
    // show modal
    mui.overlay('on', modalEl);
    $("#note-area-input").val("");
  };

$( document ).ready(function() {
    var noteList = [];
    var localData = localStorage.getItem("notes");
    // load data 
    if(localData){
        noteList = JSON.parse(localData);
        loadNoteFromData();
    }
    
    // note model
    function aNote(_content,_done = false,_id){
        this.content = _content;
        this.done = _done;
        this.id = _id;
    }
    function removeNoteById(_id){
        noteList.forEach(function(obj,index){
            if(obj.id == _id){
                noteList.splice(index,1);
            }
        });
    }

    function setDoneForNote(_id, _done){
        noteList.forEach(function(obj,index){
            if(obj.id == _id){
                obj.done = _done;
            }
        });
    }
    // note template
    function aNoteView(note){
        var check = (note.done) ? "checked" : "";
        var through = (note.done) ? 'style="text-decoration: line-through;"' : ""; 
        var noteView = '<div class="mui-panel ui-state-default" data-id="'+ note.id +'">'+
                '<input class="done-btn" type="checkbox" value="" '+ check +'>'+
                '<div class="note-content" '+ through +' >'+ note.content +'</div>'+
                '<i class="fa fa-trash remove-note-btn" aria-hidden="true"></i>'+
            '</div>';

        return noteView;
    }

    function loadNoteFromData(){
        noteList.forEach(function(aNote){
            var noteView = aNoteView(aNote);
            $("#note-wrap").prepend(noteView);
        });
    }
    $("#add-btn").on("click",function(){
        activateModal();
    });

    $("#add_note_modal_close").on("click",function(){
        mui.overlay('off');
    });

    $("#save-node-btn").on("click",function(){
        var noteData = $("#note-area-input").val();
        if(noteData != ""){
            var id = "biNote"+noteList.length;
            var note = new aNote(noteData,false,id);
            noteList.push(note);
            var noteView = aNoteView(note);
            $("#note-wrap").prepend(noteView);
            
            var temp = JSON.stringify(noteList);
            localStorage.setItem('notes',temp);
        }
        mui.overlay('off');
    });

    $("#note-wrap").on("click",".done-btn",function(){
        var parentEl = $(this).parent();
        var id = parentEl.data("id");
        if(this.checked) {
            $(this).parent().find(".note-content").css("text-decoration","line-through");
            setDoneForNote(id,true);
        }else{
            $(this).parent().find(".note-content").css("text-decoration","none");
            setDoneForNote(id,false);
        }
        // save data 
        var temp = JSON.stringify(noteList);
        localStorage.setItem('notes',temp);
    });

    $("#note-wrap").on("click",".remove-note-btn",function(){
        var parentEl = $(this).parent();
        var id = parentEl.data("id");
        parentEl.remove();
        removeNoteById(id);
        // save data 
        var temp = JSON.stringify(noteList);
        localStorage.setItem('notes',temp);
    });
    
    var currentPos;
    
    $( "#note-wrap" ).sortable({
      revert: true,
      start: function( event, ui ) {
          var length = noteList.length - 1;
          currentPos = length - ui.item.index();
          
      },
      stop: function( event, ui ) {
          // change postion 
          var length = noteList.length - 1;
          var newPos = length - ui.item.index();
          
          // prevent undefined postion
          if(newPos == undefined || currentPos == undefined) return;
          var tempObjCurrent = noteList[currentPos];
          var tempObjOld = noteList[newPos];
          noteList[currentPos] = tempObjOld;
          noteList[newPos] = tempObjCurrent;
          // save data 
         var temp = JSON.stringify(noteList);
        localStorage.setItem('notes',temp);
      }
    });
});