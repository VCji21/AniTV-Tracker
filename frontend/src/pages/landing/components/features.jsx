import { images } from '../../../data/images';
 
const cardData = [
    {
        title: "Track What You Watch, Effortlessly",
        desc: "Maintain your anime and TV series watch history in one place. Mark episodes as watched, track progress season-wise, and never forget where you left off.",
        img: images.secImg1
    },
    {
        title: "Create Smart & Custom Watchlists",
        desc: "Organize shows into favorites, watching, completed, or planned lists. Personalize your collections your way and manage your entertainment smarter.",
        img: images.secImg2
    },
    {
        title: "Download Your Lists Offline",
        desc: "Save your favorite shows and multiple watchlists offline. Export them in various formats and access your lists anytime, on any device.",
        img: images.secImg3
    },
    {
        title: "Discover & Explore New Shows",
        desc: "Get recommendations based on your watch history. Explore trending anime and TV series, detailed info, ratings, and community reviews—all in one place.",
        img: images.secImg4
    },
    {
        title: "Connect, Share & Watch Together",
        desc: "Build or join groups, connect with other fans, share watchlists, discuss episodes, and experience anime and TV series as part of an active community.",
        img: images.secImg5
    },
];

/* --- Create feature in up and down of image --- */
const imgUp = () => {        
    return cardData.map((value, index) => {
        if (index % 2 === 0) {
            return (<section key={index} className='section'>
                <div className="features">
                    <h2>{value.title}</h2>
                    <p>{value.desc}</p>
                </div>
                <div className="side-img">
                    <img src={value.img} alt="sec-img"/>
                </div>
            </section>)
        }
        else {
            return(<section key={index} className='section'>
                <div className="side-img">
                    <img src={value.img} alt="sec-img"/>
                </div>
                <div className="features">
                    <h2>{value.title}</h2>
                    <p>{value.desc}</p>
                </div>
            </section>)
        }
    })
}

const Features = () => {
  return (
    <>
        {
            imgUp().map((Element, index) => {
                return (
                    <div key={index}>
                        {Element}
                        <div className="seperator"></div>
                    </div>
                ) 
            })
        }
    </>
  )
}

export default Features;