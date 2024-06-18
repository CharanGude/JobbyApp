import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {details: {}, isFailure: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const api = 'https://apis.ccbp.in/profile'
    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({
        details: data.profile_details,
      })
    } else {
      this.setState({isFailure: true})
    }
  }

  render() {
    const {details, isFailure} = this.state

    return (
      <div>
        {isFailure ? (
          <button type="button" className="login-button">
            Retry
          </button>
        ) : (
          <div>
            <div className="profile-row">
              <img src={details.profile_image_url} alt="profile" />
              <h1>{details.name}</h1>
            </div>
            <p>{details.short_bio}</p>
          </div>
        )}
      </div>
    )
  }
}
export default Profile
