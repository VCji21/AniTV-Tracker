import { useState } from 'react'

const qnas = [
    {
        ques: "What is this Anime & TV Series Tracker used for? ",
        ans: "This Anime & TV Series Tracker is designed to help you manage your entire entertainment journey in one place. You can track anime and TV series you`re currently watching, mark episodes and seasons as completed, and plan what to watch next using personalized watchlists. Beyond tracking, the platform also lets you connect with other fans—follow users, share watchlists, join groups, and participate in discussions. This makes it not just a tracker, but a social space where you can discover new shows, exchange recommendations, and enjoy anime and TV series together with a community."
    },
    {
        ques: "Can I create multiple watchlists?",
        ans: "Yes. You can create and manage multiple custom lists like favorites, watching, completed, or any list you prefer."
    },
    {
        ques: "Can I connect with other people on the platform?",
        ans: "Yes. You can connect with other users, follow their activity, share watchlists, and interact through discussions and groups."
    },
    {
        ques: "How does show discovery and recommendations work?",
        ans: "The app suggests trending and relevant anime or TV series based on your watch activity and popular community choices."
    },
    {
        ques: "Can I create or join groups and community discussions?",
        ans: "Yes. You can build or join groups, share watchlists, discuss episodes, and connect with other anime and TV series fans."
    },
    {
        ques: "Is this tracker free to use?",
        ans: "Yes. all the core features, with optional premium features planned for advanced users are free to use."
    },
]

const Faq = () => {
    const [openindex, setOpenindex] = useState(null);

    // Open or close answer for clicked question
    function handleClick(index) {
        setOpenindex(prev => (prev === index ? null : index));
    }

    return (
    <div>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq">
            {qnas.map((value, index) => {
                return (<div key={index} className={`qna ${openindex === index ? "active" : ""}`} onClick={() => handleClick(index)}>
                    <button className="ques dark-white-10">
                        <span>{value.ques}</span> 
                        <span className="svg-sign" >
                            <svg viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" data-icon-id=":Rjal6hlalailqp6:" aria-hidden="true" className="big-plus" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                                <path fill="currentColor" fillRule="evenodd" d="M17 17V3h2v14h14v2H19v14h-2V19H3v-2z" clipRule="evenodd"></path>
                            </svg>
                            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="PlusMedium" data-icon-id=":Rlal6hlalailqp6:" aria-hidden="true" className="small-plus" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                                <path fill="currentColor" fillRule="evenodd" d="M11 11V2h2v9h9v2h-9v9h-2v-9H2v-2z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </button>
                    {openindex === index && <div className="ans dark-white-10">{value.ans}</div>}
                </div>)
            })}
        </div>
    </div>
  )
}

export default Faq;















