//JQuery function to position puzzle pieces and
//make them draggable
$(function()
{
    for(i = 1; i < 10; ++i) {
        var image = $("#MoveMe" + i);
        $("#MoveMe" + i).css({top:"0px"});
        $("#MoveMe" + i).css({left:"0px"});
    }   

    $("#MoveMe1").draggable();
    $("#MoveMe2").draggable();
    $("#MoveMe3").draggable();
    $("#MoveMe4").draggable();
    $("#MoveMe5").draggable();
    $("#MoveMe6").draggable();
    $("#MoveMe7").draggable();
    $("#MoveMe8").draggable();
    $("#MoveMe9").draggable();
});

//Parrot puzzle pieces
document.getElementById("setting1").addEventListener("click", function() {

    for (i = 1; i < 10; ++i) {
        var photo = document.getElementById("MoveMe" + i);
        //console.log(photo.style.top + "  AND  " + photo.style.left);
            
        if (photo.style.top != "0px" || photo.style.left != "0px") {
                      
            photo.style.transition = "1s";                     
            photo.style.top = "0px";   
            photo.style.left = "0px"
            
            document.getElementById("MoveMe" + i).addEventListener("transitionend", function() {
                this.style.removeProperty("transition");
            });           
        }                 
    }

    for (i = 1; i < 10; ++i) {
        var photo = document.getElementById("MoveMe" + i);
        //console.log(photo.style.top + "  AND  " + photo.style.left);
            
	 document.getElementById("pic" + i).src = 'media/parrot/image_parrot_00' + i + '.jpg';	              
    }

    document.getElementById("pic1").src = 'media/parrot/image_parrot_007.jpg';
    document.getElementById("pic2").src = 'media/parrot/image_parrot_001.jpg';
    document.getElementById("pic3").src = 'media/parrot/image_parrot_005.jpg';
    document.getElementById("pic4").src = 'media/parrot/image_parrot_009.jpg';
    document.getElementById("pic5").src = 'media/parrot/image_parrot_003.jpg';
    document.getElementById("pic6").src = 'media/parrot/image_parrot_006.jpg';
    document.getElementById("pic7").src = 'media/parrot/image_parrot_002.jpg';
    document.getElementById("pic8").src = 'media/parrot/image_parrot_008.jpg';
    document.getElementById("pic9").src = 'media/parrot/image_parrot_004.jpg';
});

//Turtle puzzle pieces
document.getElementById("setting2").addEventListener("click", function() {

    for (i = 1; i < 10; ++i) {
        var photo = document.getElementById("MoveMe" + i);
        //console.log(photo.style.top + "  AND  " + photo.style.left);
            
        if (photo.style.top != "0px" || photo.style.left != "0px") {
                      
            photo.style.transition = "1s";                     
            photo.style.top = "0px";   
            photo.style.left = "0px"
            
            document.getElementById("MoveMe" + i).addEventListener("transitionend", function() {
                this.style.removeProperty("transition");
            });           
        }                 
    }

   

    document.getElementById("pic1").src = 'media/turtle/image_turtle_007.jpg';
    document.getElementById("pic2").src = 'media/turtle/image_turtle_001.jpg';
    document.getElementById("pic3").src = 'media/turtle/image_turtle_005.jpg';
    document.getElementById("pic4").src = 'media/turtle/image_turtle_009.jpg';
    document.getElementById("pic5").src = 'media/turtle/image_turtle_003.jpg';
    document.getElementById("pic6").src = 'media/turtle/image_turtle_006.jpg';
    document.getElementById("pic7").src = 'media/turtle/image_turtle_002.jpg';
    document.getElementById("pic8").src = 'media/turtle/image_turtle_008.jpg';
    document.getElementById("pic9").src = 'media/turtle/image_turtle_004.jpg';
});

//Tiger puzzle pieces
document.getElementById("setting3").addEventListener("click", function() {

    for (i = 1; i < 10; ++i) {
        var photo = document.getElementById("MoveMe" + i);
        //console.log(photo.style.top + "  AND  " + photo.style.left);
            
        if (photo.style.top != "0px" || photo.style.left != "0px") {
                      
            photo.style.transition = "1s";                     
            photo.style.top = "0px";   
            photo.style.left = "0px"
            
            document.getElementById("MoveMe" + i).addEventListener("transitionend", function() {
                this.style.removeProperty("transition");
            });           
        }                 
    }
    document.getElementById("pic1").src = 'media/tiger/image_tiger_007.jpg';
    document.getElementById("pic2").src = 'media/tiger/image_tiger_001.jpg';
    document.getElementById("pic3").src = 'media/tiger/image_tiger_005.jpg';
    document.getElementById("pic4").src = 'media/tiger/image_tiger_009.jpg';
    document.getElementById("pic5").src = 'media/tiger/image_tiger_003.jpg';
    document.getElementById("pic6").src = 'media/tiger/image_tiger_006.jpg';
    document.getElementById("pic7").src = 'media/tiger/image_tiger_002.jpg';
    document.getElementById("pic8").src = 'media/tiger/image_tiger_008.jpg';
    document.getElementById("pic9").src = 'media/tiger/image_tiger_004.jpg';
});