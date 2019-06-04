import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogAppearance, setBlogAppearance] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)

    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog.data))
      })
  }

  const showAllBlogInfo = () => (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div onClick={() => setBlogAppearance(!blogAppearance)}>
        {blog.title} {blog.author}

        {
          blogAppearance ?
            showAllBlogInfo()
            : []
        }

      </div>
    </div>
  )
}

export default Blog