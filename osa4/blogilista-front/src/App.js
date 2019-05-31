import React, { useState, useEffect } from 'react';
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        setBlogs(response.data)
      })
  }, [])

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }

    blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response.data))
      })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const rows = () => blogs.map(blog =>
    <div key={blog.title}>
      <div>
        <h2>{blog.title}</h2>
      </div>
      <div>
        {blog.author}
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      {blog.likes} likes
    </div>
  )

  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={addBlog}>
        <div>title: <input value={newTitle} onChange={handleTitleChange} /></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>
        {rows()}
      </div>
    </div>
  )
}

export default App