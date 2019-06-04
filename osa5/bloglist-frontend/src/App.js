import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm';
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message, state }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={state}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({ text: null, state: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        text: 'invalid username or password',
        state: 'error'
      })
      setTimeout(() => {
        setErrorMessage({ text: null, state: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage({
      text: `You have been logged out`,
      state: 'info'
    })
    setTimeout(() => {
      setErrorMessage({ text: null, state: null })
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage({
          text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          state: 'info'
        })
        setTimeout(() => {
          setErrorMessage({ text: null, state: null })
        }, 5000)
      })
      .catch(error => {
        setErrorMessage({
          text: error.response.data.error,
          state: 'error'
        })
        setTimeout(() => {
          setErrorMessage({ text: null })
        }, 5000)
      })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            addBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage.text} state={errorMessage.state} />

        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>log in</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={errorMessage.text} state={errorMessage.state} />

        <p>{user.name} logged in</p>

        <button onClick={() => handleLogout()}>log out</button>

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        {blogForm()}
      </div>
    )
  }
}

export default App