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

function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post,
  this.replies = []
}

Post.prototype.addReply = function (replyObjectPost) {
  this.replies.push(replyObjectPost)
}

function createReplyLink(postId,replyId) {
  return "<div id='reply-div-" + postId+ replyId + "'><button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-post'>Reply post</button></div>";
}


function createReplyTextArea(postId, replyId) {
  return "<div class='well' id='reply-msg-" + postId + replyId + "'>" +
"<div class='form-group'><label for='name'>Name:</label>" +
"<input id='replyname' class='form-control' type='text' placeholder='Enter Your Name'></div>" +
"<div class='form-group'><label for='header'>Reply Message:</label>" +
"<input id='replymsg' class='form-control' type='text' placeholder='Enter Your Reply'></div>" +
"<button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-submit'>Reply post</button></div>";
}

function displayReply(id, replyname, replymessage){
  var theCurrentTime = new Date();

  return "Name: "+ replyname + "<br>Time" + theCurrentTime.toDateString() + "<br>Message" + replymessage + "<br>";
}

var topicsObject = new Topic();

Post.prototype.createPost = function() {
  var theCurrentTime = new Date();

  $("#results").append("<div class='container well' id='first-post-"  + topicsObject.currentId + "'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "<br>" + theCurrentTime.toDateString() + createReplyLink(topicsObject.currentId,0) + "</div>")
}

$(document).ready(function(){
  $("#results").on("click", ".btn-reply-post", function(e) {
    //console.log("hey, i see your button click on relpies, you clicked on" + this.id);
    //console.log("hey this is your text you are replying to" + this.post);
    var postId = $(e.target).attr("data-postid");
    var replyId = $(e.target).attr("data-id");
    //console.log("clicked id=" + postId);
    $("#reply-div-" + postId+replyId).html(createReplyTextArea(postId, replyId));
});

  $("#results").on("click", ".btn-reply-submit", function(e) {

    //console.log("Replying to the post" + this.post);
    var replyId = $(e.target).attr("data-id");
    var postId = $(e.target).attr("data-postid");
    //console.log("clicked id= " + replyId + ", postId = " + postId);
    var replyName = $("#replyname").val();
    var replyMessage = $("#replymsg").val();

    var newReply = new Post(replyName, "", replyMessage) //This is a temp reply post object
    topicsObject.posts[postId].replies.push(newReply);
    //console.log(topicsObject.posts[postId].replies);

    $("#reply-msg-" + postId + replyId).html(displayReply(replyId, replyName, replyMessage));
    var nextId = parseInt(replyId) + 1;
    $("#first-post-" + postId).append(createReplyLink(postId,nextId));
  });

  $("#results").on("click", ".btn-delete-post", function() {
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
