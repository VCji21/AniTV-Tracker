/* --- This is the opening page for everyone --- */
import Navbar from './components/navbar'
import Herobg from '../../components/herobg'
import HeroLogin from './components/heroLogin'
import Features from './components/features'
import Faq from './components/faq'
import "./firstPage.css"
 
function Landing() {
  return (
    <>
      <header className="head-container">
        <Herobg/>
        <Navbar/>
          <div className="hero top-0 flex-center">
              <h1>Track Your Anime & TV Series Progress</h1>
              <p>Watch, track and manage your shows at one place</p>
              <HeroLogin />
          </div>
      </header>
      <div className="seperator"></div>
      <main>
        <Features />
        <Faq />
      </main>
      <footer className='footer'>
        <div className="f-cont flex-center">
            <p>Ready to track what you watch? Enter your email to create or start you journey!</p>
            <HeroLogin />
        </div>
      </footer>
    </>
  )
}

export default Landing;