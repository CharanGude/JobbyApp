const EmploymentType = props => {
  const {employmentTypesList, onEmpCheck} = props

  const oncheckboxChange = event => {
    onEmpCheck(event)
  }

  return (
    <div className="employment-type">
      <h1>Type of Employment</h1>
      {employmentTypesList.map(item => (
        <div key={item.employmentTypeId}>
          <label htmlFor={item.employmentTypeId}>
            <input
              type="checkbox"
              id={item.employmentTypeId}
              name={item.employmentTypeId}
              value={item.employmentTypeId}
              onChange={oncheckboxChange}
            />
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default EmploymentType
