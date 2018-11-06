//Business logic for topic
function Topic() {
  this.posts = [],
  this.currentId = 0
}

Topic.prototype.addPost = function(post) {
  post.id = this.assignId();
  this.posts.push(post);
}

Topic.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Topic.prototype.findPost = function(id) {
  for (var i=0; i < this.posts.length; i ++) {
    if (this.posts[i].id === id) {
      return this.posts[i];
    }
  };
  return false;
}

Topic.prototype.replyToPost = function(id) {
  for (var i=0; i < this.posts.length; i ++) {
    if (this.posts[i].id === id) {
      return this.posts[i];
    }
  };
  return false;
}

function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

var index = 1;

// var testName = "Joe";
// var testHeader = "Test Header";
// var testPost = "Lorem ipsum.";
// var post1 = new Post(testName, testHeader, testPost);
// var post2 = new Post("Jane", "2nd Header", "Some more text.");
var topicsObject = new Topic();
// newTopic.addPost(post1);
// newTopic.addPost(post2);

Post.prototype.createPost = function(postObject) {
  var theCurrentTime = new Date();

  $("#results").append("<div class='container well'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "<br>" + theCurrentTime.toDateString() + "<br><button id='reply-post-" + topicsObject.currentId + "' type='button' class='btn'>Reply post</button></div>")

}

$(document).ready(function(){
  $("#results").on("click", "button", function() {
    console.log("hey, i see your button click on relpies, you clicked on" + this.id);
//    var testValue = $("#results #reply-post-1").val();
    console.log("hey this is your text you are replying to" + this.post);
  });

  $("#add-post").submit(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var header = $("#header").val();
    var post = $("#post").val();

    var newPost = new Post(name, header, post)
    newPost.createPost();
    topicsObject.addPost(newPost);

    $("#name").val("");
    $("#header").val("");
    $("#post").val("");
  });
});
