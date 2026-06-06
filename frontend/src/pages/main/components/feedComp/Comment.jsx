import { useEffect, useState, useRef } from 'react'
import { get_backend } from '../../../../service/api'
import { getUserInfo } from './data/userInfo'

/* --- Do comment --- */
const Comment = ({ post, setComment }) => {
    const [user, setUser] = useState({})
    const textRef = useRef();

    /* --- get user info --- */
    useEffect(() => {
        const getUser = async () => {
            const u = await getUserInfo()
            setUser(u);
        }
        getUser();
    }, [])

    /* --- post comment --- */
    const postComment = async () => {
        try {
            if (textRef.current.value) {
                const res = await get_backend("/api/posts/comment", { postId: post._id, text: textRef.current.value });
                alert(res.message);
                setComment(false)
            }
            else {
                alert("Write content to post!")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <section className="w-full border border-zinc-700 rounded-md p-3 md:p-4">
            <div className="flex gap-3 md:gap-4">
                <div className="rounded-full w-8 h-8 md:w-12 md:h-12 overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src={user.profile_image} alt="Profile Picture" />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <textarea rows={1} placeholder="Write comment here..."
                        className="w-full resize-none bg-transparent outline-none focus:ring-0 text-sm md:text-base min-h-[36px] md:min-h-[60px]"
                        ref={textRef}
                    />
                    <div className="flex justify-end">
                        <button onClick={postComment} className="px-1 md:px-4 md:py-1.5 text-xs md:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Comment