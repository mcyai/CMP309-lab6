import { useEffect, useReducer } from 'react'
import { fetchPosts } from './api/postsApi.js'
import { postsReducer, initialPostsState } from './reducer/postsReducer.js'
import PostList from './components/PostList.jsx'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState)
  const { posts, loading, error } = state

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' })

      try {
        const data = await fetchPosts(controller.signal)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        if (err.name === 'AbortError') return
        dispatch({ type: 'FETCH_ERROR', payload: err.message })
      }
    }

    loadPosts()

    return () => controller.abort()
  }, [])

  return (
    <div className="app">
      <h1>Post Dashboard</h1>

      {loading && <p>Loading posts...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}

      {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
    </div>
  )
}

export default App
