import React from 'react';

const HeroLogin = () => {
  return (
    <>
        <form action="/signup" method="get" className="login">
            <input className="email-in transparent-black-bg" type="email" placeholder="Email Address" />
            <button className="red-btn" type="submit">Get Started &gt;</button>
        </form>
    </>
  )
}

export default HeroLogin;