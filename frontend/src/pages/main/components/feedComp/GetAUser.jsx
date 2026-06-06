import { useEffect, useState } from 'react'
import { delete_from_backend, get_backend_data, update_backend, backendApi } from '../../../../service/api'

/* --- Get a user --- */
const GetAUser = ({ user }) => {
    const [follow, setFollow] = useState(false);

    /* --- Get follow data to set as following --- */
    useEffect(() => {
        const isFollowing = async () => {
            const followData = await get_backend_data(`/api/users/${user._id}/getfollowdata`)
            if (followData) setFollow(true);
        };
        isFollowing();
    }, [])

    /* --- Allows to follow or unfollow --- */
    const getFollow = async () => {
        let newfollow = !follow;
        setFollow(newfollow);

        if (newfollow) {
            await update_backend("/api/users/follow", { followed: user._id })
        }
        else {
            await delete_from_backend(`/api/users/${user._id}/unfollow`)
        }
    }

    return (
        <div className="flex items-center justify-between gap-4">
            
            {/* Get profile */}
            <div className="flex items-center gap-4">
                <div className="rounded-full w-7 h-7 md:w-24 md:h-24 overflow-hidden">
                    <img className="w-full h-full object-cover object-center" src={user.profile_image !== "" ? `${backendApi}/uploads/${user.profile_image}` : `${backendApi}/uploads/defAvatar.png`} alt="Profile Picture" />
                </div>
                <div className="justify-self-center">
                    <div className="text-base md:text-3xl p-1">{user.username}</div>
                    <div className="px-[5px] py-[1px] border border-zinc-500 rounded-sm text-xs w-fit">Public</div>
                </div>
            </div>

            {/* Follow or unfollow */}
            {!follow && <button onClick={getFollow} className="flex items-center gap-2 px-2 py-1 cursor-pointer border border-bg-zinc-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                    <path fill="white" fillRule="evenodd" d="M320 64 C461.4 64 576 178.6 576 320 C576 461.4 461.4 576 320 576 C178.6 576 64 461.4 64 320 C64 178.6 178.6 64 320 64 Z M320 128 C213.9 128 128 213.9 128 320 C128 426.1 213.9 512 320 512 C426.1 512 512 426.1 512 320 C512 213.9 426.1 128 320 128 Z M296 408 L296 344 L232 344 C218.7 344 208 333.3 208 320 C208 306.7 218.7 296 232 296 L296 296 L296 232 C296 218.7 306.7 208 320 208 C333.3 208 344 218.7 344 232 L344 296 L408 296 C421.3 296 432 306.7 432 320 C432 333.3 421.3 344 408 344 L344 344 L344 408 C344 421.3 333.3 432 320 432 C306.7 432 296 421.3 296 408 Z" />
                </svg>
                <span className='text-bold text-base'>Follow</span>
            </button>}
            {follow && <button onClick={getFollow} className="flex items-center gap-2 px-2 py-1 cursor-pointer border border-bg-zinc-500 rounded-md">
                <span className='text-bold text-base'>Following</span>
            </button>}
        </div>
    )
}

export default GetAUser