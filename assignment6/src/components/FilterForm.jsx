function FilterForm({ value, onChange }) {
  return (
    <form className="filter-form">
      <label htmlFor="title-filter">Filter by title</label>
      <input
        id="title-filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to filter posts..."
      />
    </form>
  )
}

export default FilterForm
