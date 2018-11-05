function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

Post.prototype.createPost = function() {
  $("#results").append("<div class='container well'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "</div>")
}

$(document).ready(function(){
  $("#add-post").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var header = $("#header").val();
    var post = $("#post").val();

    var newPost = new Post(name, header, post)
    newPost.createPost();
  });
});
