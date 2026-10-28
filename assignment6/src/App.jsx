import { useEffect, useReducer, useState } from 'react'
import { fetchPosts } from './api/postsApi.js'
import { postsReducer, initialPostsState } from './reducer/postsReducer.js'
import PostList from './components/PostList.jsx'
import FilterForm from './components/FilterForm.jsx'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState)
  const { posts, loading, error } = state
  const [titleFilter, setTitleFilter] = useState('')

  // Derived state: computed during render, never stored separately.
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(titleFilter.toLowerCase()),
  )

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

      {!loading && !error && (
        <FilterForm value={titleFilter} onChange={setTitleFilter} />
      )}

      {loading && <p>Loading posts...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && filteredPosts.length === 0 && (
        <p>No posts found.</p>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </div>
  )
}

export default App
