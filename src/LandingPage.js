import React from 'react'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className='body-landing'>
      <div className='banner'>
        <div className='left-banner'>
        <img
          className="landing-banner-img"
          src="/images/Cool Kids - Brainstorming.png"
          alt="living room"
        />
              <img
          className="landing-banner-img"
          src="/images/Cool Kids - Long Distance Relationship.png"
          alt="living room"
        />
           <img
          className="landing-banner-img"
          src="/images/Cool Kids - Staying Home.png"
          alt="living room"
        />
        </div>
        <div className='right-banner'>
          <h1>The Book Club</h1>
          <h5>Creating communities, one book at a time.</h5>
        </div>
      </div>

    </div>
  )
}
