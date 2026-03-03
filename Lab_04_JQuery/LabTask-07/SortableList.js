$(function() {

    $("#sortable").sortable(
    {
        start: function(event, ui) 
        {
            ui.item.css("opacity", "0.7");
        },
        stop: function(event, ui) 
        {
            ui.item.css("opacity", "1");
        }
    });

});