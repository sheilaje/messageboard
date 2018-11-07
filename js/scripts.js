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

Topic.prototype.findName = function(name){
  var tempArray = [];
  for (var i=0; i<this.posts.length; i++){
    if(this.posts[i].name === name){
      console.log("Hey , you r inside the loop");
      console.log(this);
      console.log(this.posts[i].post);
      tempArray.push(this.posts[i].post);
      console.log(tempArray);
    }
  }
  return tempArray;
}

//Bussiness Logic for Post
function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post,
  this.replies = []
}

Post.prototype.addReply = function (replyObjectPost) {
  this.replies.push(replyObjectPost)
}

//creates the initial post with a new topic
Post.prototype.createPost = function() {
  var theCurrentTime = new Date();
$("#results").append("<div class='container well style-post' id='first-post-"  + topicsObject.currentId + "'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "<br>" + theCurrentTime.toDateString() + createReplyLink(topicsObject.currentId,0) + "</div>")
}

//function createReplyLink creates the Reply Post button dynamically after every post
function createReplyLink(postId,replyId) {
  return "<div id='reply-div-" + postId+ replyId + "'><button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-default btn-reply-post'>Reply post</button></div>";
}

//function createReplyTextArea creates the form on the DOM with the fields userName and space for the user to reply to the post
function createReplyTextArea(postId, replyId) {
  return "<div class='well style-reply' id='reply-msg-" + postId + replyId + "'>" +
"<div class='form-group'><label for='name'>Name:</label>" +
"<input id='replyname' class='form-control' type='text' placeholder='Enter Your Name'></div>" +
"<div class='form-group'><label for='header'>Reply Message:</label>" +
"<input id='replymsg' class='form-control' type='text' placeholder='Enter Your Reply'></div>" +
"<button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-submit'>Reply post</button></div>";
}

//function displayReply displays the reply in a new well
function displayReply(id, replyname, replymessage){
  var theCurrentTime = new Date();
  return "Name: "+ replyname + "<br>Time" + theCurrentTime.toDateString() + "<br>Message" + replymessage + "<br>";
}

// function createReplyToReplyLink(postId, replyId){
//   return "<div id='reply-div-" + postId+ replyId + "'><button data-replyID='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-default btn-reply-post'>Reply post</button></div>";
// }

var topicsObject = new Topic();

//User Interface Logic
$(document).ready(function(){

//Event Listener for button button reply post
  $("#results").on("click", ".btn-reply-post", function(e) {
    //console.log("hey, i see your button click on relpies, you clicked on" + this.id);
    //console.log("hey this is your text you are replying to" + this.post);
    var postId = $(e.target).attr("data-postid");
    var replyId = $(e.target).attr("data-id");
    //console.log("clicked id=" + postId);
    $("#reply-div-" + postId+replyId).html(createReplyTextArea(postId, replyId));
});

//event Listener for button reply submit
$("#results").on("click", ".btn-reply-submit", function(e) {
  var replyId = $(e.target).attr("data-id");
  console.log($("data-id"));
  var postId = $(e.target).attr("data-postid");
  var replyName = $("#replyname").val();
  var replyMessage = $("#replymsg").val();

  var newReply = new Post(replyName, "", replyMessage) //This is a temp reply post object
  topicsObject.posts[postId].replies.push(newReply);

  $("#reply-msg-" + postId + replyId).html(displayReply(replyId, replyName, replyMessage));
  var nextId = parseInt(replyId) + 1;
  $("#first-post-" + postId).append(createReplyLink(postId,nextId));

  // $("#replyname").val("");
  // $("#replymsg").val("");

});

//Event Listener for button search post
  $("#searchid").on("click", "#search-post", function(event){
    event.preventDefault();
    var searchName = $("#search").val();
    console.log(searchName);
    var searchNameResults = topicsObject.findName(searchName);
    console.log(searchNameResults);
    $("#searchPerson").html(searchNameResults);
    $("#search").val("");
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
