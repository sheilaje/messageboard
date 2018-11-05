function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

Post.prototype.createPost = function() {
  $("#results").append("<div class='container well'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "<br><button id='reply-post-1' type='button' class='btn' value=1>Reply post</button></div>")
}

$(document).ready(function(){
  $("#results").on("click", "button", function() {
    console.log("hey, i see your button click on relpies, you clicked on" + this.id);
//    var testValue = $("#results #reply-post-1").val();
  });

  $("#add-post").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var header = $("#header").val();
    var post = $("#post").val();

    var newPost = new Post(name, header, post)
    newPost.createPost();
  });
});
