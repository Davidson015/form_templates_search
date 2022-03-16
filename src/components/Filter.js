import { FaSearch } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'

const Filter = ({ categories, changeCategory, searchTemplates, loading }) => {
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div className='filter'>
      <div className="search">
        <input type="text" name="search-bar" id="search-bar" placeholder="Search Templates" onChange={ e => searchTemplates(capitalize(e.target.value))} />
        {
          !loading && document.getElementById('search-bar').value !== '' ? (
            <FaTimes style={{ marginLeft: '3px', marginRight: '10px', cursor: 'pointer'}} onClick={ e => {
              document.getElementById('search-bar').value = ''
              searchTemplates('')
            }} />
          ) : (
            <FaSearch style={{ marginLeft: '3px', marginRight: '10px', cursor: 'pointer'}} />
          )
        }
      </div>

      <h3>Sort By: </h3>
      <fieldset className="category-filter">
        <legend>Category</legend>
        <select name="category" id="category" onChange={ e => changeCategory(e.target.value)}>
          <option value="All">All</option>
         {
           categories.map( ( category, index ) => (
             <option key={index} value={category}>{category}</option>
           ))
         }
        </select>
      </fieldset>

      <fieldset className="order-filter">
        <legend>Order</legend>
        <select name="order" id="order">
          <option value="Default">Default</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </fieldset>

      <fieldset className="date-filter">
        <legend>Date</legend>
        <select name="date" id="date">
          <option value="Default">Default</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </fieldset>
    </div>
  )
}

export default Filter