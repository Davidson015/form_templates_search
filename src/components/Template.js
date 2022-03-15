const Template = ({ template }) => {
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div className="template">
      <h2 className="template-header">{capitalize(template.name)}</h2>
      <p className="template-body">{capitalize(template.description)}</p>
      <div className="template-footer">
        <a href={template.link} target="_blank" rel="noreferrer" >Use Template</a>
      </div>
    </div>
  )
}

export default Template