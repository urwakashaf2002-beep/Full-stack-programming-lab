$(document).ready(function(){

    let skip = 0;
    const limit = 6;

    function loadPosts(){

        $("#loader").fadeIn();

        $.get(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`, function(data)
        {

            $.each(data.posts, function(index, post){

                $("#postContainer").append(`
                    <div class="card">
                        <span class="tag">#${post.id}</span>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </div>
                `);

            });

            skip += limit;
            $("#loader").fadeOut();

        });
    }

    // Load first batch
    loadPosts();

    $("#loadMore").click(function(){
        loadPosts();
    });

});