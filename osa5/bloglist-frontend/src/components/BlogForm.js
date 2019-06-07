import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  blogTitle,
  blogAuthor,
  blogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        title:
        <input {...blogTitle} reset='null' />
        <br/>
        author:
        <input {...blogAuthor} reset='null' />
        <br/>
        url:
        <input {...blogUrl} reset='null' />
        <br/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm