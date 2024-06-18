import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import Navbar from '../Navbar'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobsItem from '../JobsItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    empType: [],
    salRange: '',
    search: '',
    jobs: [],
    isLoading: true,
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    await this.setState({isLoading: true, apiStatus: 'initial'})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const {empType, salRange, search} = this.state
    console.log(empType)
    let apiUrl = ''
    if (empType === [] && salRange === '' && search === '') {
      apiUrl = `https://apis.ccbp.in/jobs`
    } else {
      apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType.join()}&minimum_package=${salRange}&search=${search}`
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      await this.setState({
        jobs: data.jobs,
        isLoading: false,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onEmpCheck = async event => {
    const {empType} = this.state
    const val = event.target.value
    if (event.currentTarget.checked) {
      console.log(val)
      empType.push(val)
      await this.setState({empType})
    } else {
      const res = empType.filter(item => item !== val)
      await this.setState({empType: res})
    }
    await this.getData()
  }

  onsalChange = async event => {
    await this.setState({salRange: event.target.value})
    await this.getData()
  }

  onsearchChange = event => {
    this.setState({search: event.target.value})
  }

  onSearchClick = async () => {
    await this.getData()
  }

  render() {
    const {isLoading, search, jobs, apiStatus} = this.state
    console.log(jobs)
    return (
      <div>
        <Navbar />
        <div className="jobs-main-container">
          <div className="sidebar">
            <div className="profile">
              <Profile />
            </div>
            <hr />
            <EmploymentType
              employmentTypesList={employmentTypesList}
              onEmpCheck={this.onEmpCheck}
            />
            <hr />
            <SalaryRange
              salaryRangesList={salaryRangesList}
              onsalChange={this.onsalChange}
            />
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <label htmlFor="search">
                <input
                  className="search-input"
                  type="search"
                  name="search"
                  value={search}
                  onChange={this.onsearchChange}
                  placeholder="Search"
                />
                <button
                  type="button"
                  onClick={this.onSearchClick}
                  className="search-btn"
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                  search
                </button>
              </label>
            </div>
            {isLoading && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {apiStatus === 'failure' && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                />
                <h2>Oops! Something Went Wrong</h2>
                <p>We cannot seem to find the page you are looking for</p>
                <button type="submit" className="login-button">
                  Retry
                </button>
              </div>
            )}
            {apiStatus === 'success' && (
              <div className="jobList">
                {jobs.length !== 0 ? (
                  <ul className="jobsList-list">
                    {jobs.map(item => (
                      <JobsItem key={item.id} details={item} />
                    ))}
                  </ul>
                ) : (
                  <div>
                    <h2>No Jobs Found</h2>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      alt="no jobs"
                    />
                    <p>We could not find any jobs. Try other filters</p>
                    <button type="submit" className="login-button">
                      Retry
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
