import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import Navbar from '../Navbar'

import './index.css'

class JobDetails extends Component {
  state = {details: {}, similar: {}, isLoading: true, apiStatus: 'initial'}

  componentDidMount = async () => {
    await this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({
        details: data.job_details,
        similar: data.similar_jobs,
        isLoading: false,
        apiStatus: 'success',
      })
    } else {
      this.setState({isLoading: false, apiStatus: 'failure'})
    }
  }

  render() {
    const {details, similar, isLoading, apiStatus} = this.state
    return (
      <div>
        <Navbar />
        <div className="jobDetails-container">
          {isLoading && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
              <button
                onClick={this.getData()}
                type="submit"
                className="login-button"
              >
                Retry
              </button>
            </div>
          )}
          {apiStatus === 'success' && (
            <div>
              <div className="jobitem-container">
                <div className="jobitem-header">
                  <img
                    src={details.company_logo_url}
                    alt="job details company logo"
                    width={50}
                    height={50}
                  />
                  <div className="jobitem-title">
                    <h1 className="item-heading">{details.title}</h1>
                    <p>
                      <FaStar /> {details.rating}
                    </p>
                  </div>
                </div>
                <div className="jobitem-details">
                  <div>
                    <p className="jobitem-loc">
                      <IoLocationSharp /> {details.location}
                    </p>
                    <p className="jobitem-loc">
                      <BsBriefcase /> {details.employment_type}
                    </p>
                  </div>
                  <p>{details.package_per_annum}</p>
                </div>
                <hr />
                <div className="jobitem-details">
                  <h3>Description</h3>
                  <a
                    href={details.company_website_url}
                    className="company-website"
                  >
                    Visit
                  </a>
                </div>
                <p>{details.job_description}</p>
                <h4>Skills</h4>
                <div className="jobitem-skills-container">
                  <ul className="jobskills-list">
                    {details.skills.map(item => (
                      <li className="jobitem-skill" key={item.name}>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <p>{item.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <h4>Life at Company</h4>
                <div className="companyLife-container">
                  <p>{details.life_at_company.description}</p>
                  <img
                    className="companyLife-image"
                    src={details.life_at_company.image_url}
                    alt="life-at-company"
                  />
                </div>
              </div>
              <h2>Similar Jobs</h2>
              <div className="similar-jobs-container">
                {similar.map(item => (
                  <div key={item.id}>
                    <div className="jobitem-container">
                      <div className="jobitem-header">
                        <img
                          src={item.company_logo_url}
                          alt="similar job company logo"
                          width={50}
                          height={50}
                        />
                        <div className="jobitem-title">
                          <h1 className="item-heading">{item.title}</h1>
                          <p>
                            <FaStar /> {item.rating}
                          </p>
                        </div>
                      </div>
                      <h4>Description</h4>
                      <p>{item.job_description}</p>
                      <div className="jobitem-details">
                        <div>
                          <p className="jobitem-loc">
                            <IoLocationSharp /> {item.location}
                          </p>
                          <p className="jobitem-loc">
                            <BsBriefcase /> {item.employment_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(JobDetails)
