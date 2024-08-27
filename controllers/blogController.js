const { blogs } = require("../models/blogmodel");
const { users } = require("../models/usermodel");

exports.createBlog = (req, res) => {
  const { id, title, content, userId } = req.body;
  if (id && title && content && userId) {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid User ID. User does not exist" });
    }

    const blogexists = blogs.some((b) => b.id === id);
    if (blogexists) {
      return res
        .status(400)
        .json({ message: "Blog ID already exists. Please use a unique ID" });
    }

    blogs.push({ id, title, content, userId });
    res.status(201).json({
      message: "Blog created successfully",
      blog: { id, title, content, userId },
    });
  }
};
exports.getAllBlogs = (req, res) => {
  res.json(blogs);
};

exports.getBlogById = (req, res) => {
    const {id} = req.params;
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

exports.updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blog = blogs.find((b) => b.id === id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    res.json({ message: "Blog updated successfully", blog });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// Delete a blog
exports.deleteBlog = (req, res) => {
  const { id } = req.params;
  const blogIndex = blogs.findIndex((b) => b.id === id);

  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
    res.json({ message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};
