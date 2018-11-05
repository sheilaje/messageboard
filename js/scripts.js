function Post (name, header, post) {
  this.name = name,
  this.header = header,
  this.post = post
}

Post.prototype.createPost = function() {
  $("#results").append("<div class='container well'><h2>" + this.header + "</h2>" + "<br>" + this.post + "<br>" + this.name + "</div>")
}
