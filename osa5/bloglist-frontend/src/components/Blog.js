import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogAppearance, setBlogAppearance] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAllBlogInfo = () => (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => console.log('blog liked')}>like</button>
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