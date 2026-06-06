import { useState, useEffect, useRef } from 'react'
import { get_backend } from '../../../../service/api';
import { getUserInfo } from "./data/userInfo"

/* --- Create new post --- */
export const CreatePost = () => {
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false)

    const textRef = useRef(); // To hold current text

    // Get current user info
    useEffect(() => {
        const getInfo = async () => {
            const u = await getUserInfo();
            setUser(u);
        }
        getInfo();
    }, [])

    /* --- Send post content to backend --- */
    const handlePost = async () => {
        try {
            if (textRef.current.value) {
                const res = await get_backend("/api/posts/create", {content: textRef.current.value}); 
                alert(res.message);
                setOpen(false);
            }
            else {
                alert("Write content to post!")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {/* ---------- Click to create post ---------- */}
            {!open &&
            <div onClick={() => {setOpen(true)}} 
             className="p-4 flex items-center gap-4 border border-zinc-700 rounded-xl cursor-text"
            >
                <div className="rounded-full w-7 h-7 md:w-24 md:h-24 overflow-hidden cursor-default">
                    <img className="w-full h-full object-cover object-center" src={user.profile_image} alt="Profile Picture" />
                </div>
                <div className="text-sm md:text-xl text-zinc-500">
                    Share what's new...
                </div>
            </div>}

            {/* ---------- Add post's content ---------- */}
            {open && 
            <div className="">
                <div className="p-4 flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full w-7 h-7 md:w-24 md:h-24 overflow-hidden">
                            <img className="w-full h-full object-cover object-center" src={user.profile_image} alt="Profile Picture" />
                        </div>
                        <div className="justify-self-center">
                            <div className="text-base md:text-3xl p-1">{user.username}</div>
                            <div className="px-[5px] py-[1px] border border-zinc-500 rounded-sm text-xs w-fit">Public</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handlePost} className="py-1 px-4 bg-red-500 rounded-md border border-zinc-500 hover:bg-red-700" type="submit">Post</button>
                        <button onClick={() => {setOpen(false)}} className="py-1 px-4 bg-zinc-800 rounded-md border border-zinc-500 hover:bg-zinc-700" type="submit">Cancel</button>
                    </div>
                </div>
                <div className="min-h-[60vh] p-4 ">
                    <textarea className="p-4 resize-none h-[60vh] w-full flex-1 outline-none focus:ring-0"
                     placeholder="Write post here..." ref={textRef} />
                </div>
            </div>
            }
        </div>
    )
}

export default CreatePost