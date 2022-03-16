import Template from "./Template"

const Templates = ({ templates, loading, templateLength, selectedCategory }) => {
  return (
    <>
    <h2 className="category-type">{selectedCategory} Templates</h2>
    <h3 className="templates-number"> { !loading && templateLength === 0 ? '0' : templateLength || "Loading"} Templates</h3>
    <div className="template-container">
      {loading ? (
        new Array(6).fill(0).map( (v, i) => (
          <div key={i} className="template loading"></div>
        ))
        ) : (
        templates.map( (template, index) => (
          <Template key={index} template={template} />
        )))
      }
    </div>
    </>
  )
}

export default Templates