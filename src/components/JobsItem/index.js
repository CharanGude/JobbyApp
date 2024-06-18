import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobsItem = props => {
  const {details} = props

  return (
    <li key={details.id}>
      <Link to={`/jobs/${details.id}`} className="jobitem-link">
        <div className="jobitem-container">
          <div className="jobitem-header">
            <img
              src={details.company_logo_url}
              alt="company logo"
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
            <span>{details.package_per_annum}</span>
          </div>
          <hr />
          <h4>Description</h4>
          <p>{details.job_description}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsItem
