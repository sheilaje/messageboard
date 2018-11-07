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

//Business logic for posts
function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

Post.prototype.createPost = function() {
  // addPost(this.header, this.post, this.name)
  $("#results").append("<div class='container well'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "</div>")
}

function addPost (header, post, name) {
  var parent = document.getElementById("results")
  var div = document.createElement("div");
  var h2 = document.createElement("h2");
  var br = document.createElement("br");
  console.log(br);
  h2.innerHTML = header
  div.appendChild(h2)
  div.append(post)
  div.append(br)
  div.append(name)
  console.log(div);
  div.setAttribute("class", "container well")
  parent.appendChild(div)
}

function addFormInput(parentId, forValue) {
  var parent = document.getElementById(parentId);
  console.log(parent);
  var newElement = document.createElement("DIV");
  newElement.setAttribute("class", "form-group");
  parent.appendChild(newElement);
  addLabel(forValue, "form-group")
}

function addLabel(forValue, newClass) {
  console.log('"' + newClass + '"');

  var label = document.createElement("LABEL")
  label.setAttribute('for', forValue)

  var parent = document.getElementsByClassName('"' + newClass + '"')
  var length = parent.length
  console.log(parent);
  console.log(length);

  parent.appendChild(label)
}

//User interface logic
var topic = new Topic();

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
