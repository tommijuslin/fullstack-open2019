import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
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
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const kayttaja = useField('text')
  const salasana = useField('password')

  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')

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
    const username = kayttaja.value
    const password = salasana.value
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      salasana.reset()
      kayttaja.reset()
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
      text: 'You have been logged out',
      state: 'info'
    })
    setTimeout(() => {
      setErrorMessage({ text: null, state: null })
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value
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

    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
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
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            addBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // sort blogs by likes
  blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage.text} state={errorMessage.state} />

        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          username
          <input {...kayttaja} reset='null' />
          <br/>
          password
          <input {...salasana} reset='null' />
          <br/>
          <button type='submit'>log in</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={errorMessage.text} state={errorMessage.state} />

        <h2>blogs</h2>

        <p>{user.name} logged in</p>

        <button onClick={() => handleLogout()}>log out</button>

        {blogForm()}

        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            username={user.username}
          />
        )}
      </div>
    )
  }
}

export default App