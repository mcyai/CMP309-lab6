# Post Dashboard — Assignment 6

A small React app that loads posts from an API and shows them in a list.
You can also filter the posts by title.

## How to run it

```
npm install
npm run dev
```

## File organization

- `src/api/postsApi.js` — gets the posts from the API. Just plain `fetch`, no React stuff in here.
- `src/reducer/postsReducer.js` — handles the posts, loading, and error state with `useReducer`. Has three actions: `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`.
- `src/components/Post.jsx` — shows one single post (title + body).
- `src/components/PostList.jsx` — takes the list of posts and shows a `Post` for each one.
- `src/components/FilterForm.jsx` — the input box where you type to filter posts by title.
- `src/App.jsx` — the main component. It fetches the posts with `useEffect` on page load, keeps the filter text in state, and decides what to show: loading, error, "no posts found", or the list.

## Challenges I faced

- Getting used to `useReducer` instead of just using `useState` for everything. It took a bit to understand that the reducer should only return new state and never do the fetching itself.
- Making sure the filtering did not get saved into its own state. The posts are the only thing stored in state, and the filtered list is just calculated every time the component renders.
- Remembering to cancel the fetch request when the component unmounts, using `AbortController`, so there are no errors from a request that finishes after the component is gone.
- Handling all three UI states (loading, error, empty) without the app crashing if the fetch fails.
