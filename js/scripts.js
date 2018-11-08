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
      tempArray.push(this.posts[i].post);
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
  $("#results").append("<div class = 'container'><div class='panel panel-info'><div class='panel-heading panel-info' id='first-post-" + topicsObject.currentId + "'><h2><strong>" + this.header + "</strong></h2><h5>" + this.name + "</h5><h5>" + theCurrentTime.toDateString() + "</h5></div><div class='panel-body'>" + this.post + "<br>" +
  "</div><div id='first-post-footer-" + topicsObject.currentId + "' class='panel-footer'>" + createReplyLink(topicsObject.currentId,0) + "</div></div></div>");
  $(".sidenav").append("<a href='#first-post-" + topicsObject.currentId + "'>" + this.header + "</a>")
}

//function createReplyLink creates the Reply Post button dynamically after every post
function createReplyLink(postId,replyId) {
  return "<div id='reply-div-" + postId+ replyId + "'><button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-default btn-reply-post'>Reply post</button></div>";
}

//function createReplyTextArea creates the form on the DOM with the fields userName and space for the user to reply to the post
function createReplyTextArea(postId, replyId) {
  return "<div class=' style-reply' id='reply-msg-" + postId + replyId + "'>" +
  "<div class='form-group'><label for='name'><i class='glyphicon glyphicon-user'></i>Name :</label>" +
  "<input id='replyname' class='form-control' type='text' placeholder='Enter Your Name'></div>" +
  "<div class='form-group'><label for='header'><i class='glyphicon glyphicon-pencil'></i>Reply Message :</label>" +"<input id='replymsg' class='form-control' type='text' placeholder='Enter Your Reply'></div>" +
  "<button data-postid='" + postId + "' data-id='" + replyId + "' type='button' class='btn btn-reply-submit'><i class='glyphicon glyphicon-plus'></i>Reply post</button></div>";
}

//function displayReply displays the reply in a new well
function displayReply(id, replyname, replymessage){
  var theCurrentTime = new Date();
  return "<div class='panel panel-info style-reply-to-post'><div class='panel-heading panel-info'><h5>" + replyname + "</h5><h5>" + theCurrentTime.toDateString() + "</h5></div><div class='panel-body'>"
  + replymessage + "<br>";
}

var topicsObject = new Topic();

//User Interface Logic
$(document).ready(function(){
  //Event Listener for button button reply post
  $("#results").on("click", ".btn-reply-post", function(e) {
    var postId = $(e.target).attr("data-postid");
    var replyId = $(e.target).attr("data-id");
    $("#reply-div-" + postId+replyId).html(createReplyTextArea(postId, replyId));
  });

  //event Listener for button reply submit
  $("#results").on("click", ".btn-reply-submit", function(e) {
    var replyId = $(e.target).attr("data-id");
    var postId = $(e.target).attr("data-postid");
    var replyName = $("#replyname").val();
    var replyMessage = $("#replymsg").val();
    var newReply = new Post(replyName, ("replyUniqueId-" + postId + "-" + replyId), replyMessage)
    topicsObject.posts[postId].replies.push(newReply);
    $("#reply-msg-" + postId + replyId).html(displayReply(replyId, replyName, replyMessage));
    var nextId = parseInt(replyId) + 1;
    $("#first-post-footer-" + postId).append(createReplyLink(postId,nextId));
  });

  //Event Listener for button search post
  $("#searchid").on("click", "#search-post", function(event){
    event.preventDefault();
    var searchName = $("#search").val();
    var searchNameResults = topicsObject.findName(searchName);
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
