$(document).ready(function(){

    const quiz = [
        {q: "What is jQuery?", options: ["Library", "Framework", "Language"], answer: 0},
        {q: "Which method handles events?", options: [".click()", ".style()", ".loop()"], answer: 0},
        {q: "Ajax is used for?", options: ["Styling", "Animations", "Server Communication"], answer: 2}
    ];

    let index = 0;
    let score = 0;

    function loadQuestion(){
        $("#questionBox").hide().text(quiz[index].q).fadeIn();
        $("#optionsBox").empty();

        $.each(quiz[index].options, function(i, option){
            $("#optionsBox").append(
                `<div class="option" data-id="${i}">${option}</div>`
            );
        });
    }

    $(document).on("click", ".option", function(){
        let selected = $(this).data("id");
        if(selected == quiz[index].answer){
            score++;
        }
        $(".option").css("background","#f1f1f1");
        $(this).css("background","#ff6f61");
    });

    $("#nextBtn").click(function(){
        index++;
        if(index < quiz.length){
            loadQuestion();
        } else {
            $(".quiz-container").html(
                `<h2>Quiz Completed</h2>
                 <p>Your Score: ${score}/${quiz.length}</p>`
            );
        }
    });

    $("#submitBtn").click(function(){
        $(".quiz-container").html(
            `<h2>Quiz Submitted</h2>
             <p>Your Final Score: ${score}/${quiz.length}</p>`
        );
    });

    loadQuestion();

});