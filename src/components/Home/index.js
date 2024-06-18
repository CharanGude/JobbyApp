import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Navbar />
    <div className="home-content">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="para-content">
        Millions of people are searching for jobs, salary information, company
        reviews, find the job that fits your ability and potential
      </p>
      <Link to="/jobs">
        <button type="button" className="login-button find-jobs">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
