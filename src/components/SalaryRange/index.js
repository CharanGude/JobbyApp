const SalaryRange = props => {
  const {salaryRangesList, onsalChange} = props

  const onsalary = event => {
    onsalChange(event)
  }

  return (
    <div className="salary-range">
      <h1>Salary Range</h1>
      {salaryRangesList.map(item => (
        <div key={item.salaryRangeId}>
          <label htmlFor={item.salaryRangeId}>
            <input
              type="radio"
              id={item.salaryRangeId}
              name="salary"
              value={item.salaryRangeId}
              onChange={onsalary}
            />
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default SalaryRange
