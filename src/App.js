import { useState, useEffect } from 'react';
import Header from './components/Header'
import Templates from './components/Templates'
import Footer from './components/Footer'

function App() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCatgory, setSelectedCategory] = useState("All");
  
  // Fetching Templates from API
  const fetchTemplates = async () => {
    const res = await fetch('https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates')
    const data = await res.json()

    // Ending Template-Skeleton Shimmer Effect
    setloading(false)
    
    return data;
  }

  useEffect(() => {
    const getTemplates = async () => {
      const templatesFromAPI = await fetchTemplates()

      // Setting Templates
      setTemplates(templatesFromAPI)
    }

    getTemplates()
  }, [])

  // Getting Categories
  useEffect(() => {
    const cats = []
    templates.forEach( template => {
      template.category.forEach( c => cats.push(c))
    });

    setCategories([...(new Set(cats))]);
    setFilteredTemplates(templates)
  },[templates, page])

  // Selecting Categories
  const changeCategory = (category) => {
    setSelectedCategory(category)
  }

  // Filtering through templates with Category
  useEffect(() => {
    if(selectedCatgory === "All"){
      setFilteredTemplates(templates)
    } else {
      setFilteredTemplates(templates.filter( temp => temp.category.includes(selectedCatgory)))
    }
  },[selectedCatgory, page, templates])


  return (
    <div className="App">
      <Header categories={categories} changeCategory={changeCategory}/>
      <Templates templateLength={filteredTemplates.length} templates={filteredTemplates.slice(page * 15, ((page + 1) * 15) )} loading={loading}/>
      <Footer pageLength={Math.floor(filteredTemplates.length / 15)} page={page} setPage={setPage}/>
    </div>
  );
}

export default App;
