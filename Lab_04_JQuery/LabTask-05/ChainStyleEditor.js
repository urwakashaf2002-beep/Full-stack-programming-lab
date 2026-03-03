$(document).ready(function()
{

    $("#styleAll").click(function()
    {
        $("#editableText")
            .css({
                "font-size": "20px",
                "color": "#e63946",
                "background-color": "#f1faee",
                "padding": "15px",
                "border-radius": "10px"
            })
            .fadeOut(200)
            .fadeIn(400);
    });

    $("#toggleBold").click(function(){
        $("#editableText").css("font-weight",
            $("#editableText").css("font-weight") === "700" ? "400" : "700"
        );
    });

    $("#toggleItalic").click(function(){
        $("#editableText").css("font-style",
            $("#editableText").css("font-style") === "italic" ? "normal" : "italic"
        );
    });

    $("#increaseFont").click(function(){
        let size = parseInt($("#editableText").css("font-size"));
        $("#editableText").css("font-size", size + 2);
    });

    $("#decreaseFont").click(function(){
        let size = parseInt($("#editableText").css("font-size"));
        $("#editableText").css("font-size", size - 2);
    });

});