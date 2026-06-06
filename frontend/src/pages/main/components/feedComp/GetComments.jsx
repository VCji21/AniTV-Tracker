import { useEffect, useRef, useState } from "react";
import { getAllUserInfo, getUserInfo } from "./data/userInfo";
import { backendApi } from "../../../../service/api.js"

/* --- Get all the comments of post --- */
const GetComments = ({ comment }) => {
    const [user, setUser] = useState({});

    /* --- Get users info, who comment --- */
    useEffect(() => {
        const getUser = async () => {

            // Current user
            const u = await JSON.parse(localStorage.getItem("user"));
            if (u._id === comment.userId) {
                const me = await getUserInfo();
                setUser(me)
                return;
            }

            // Other users
            const others = await getAllUserInfo();
            others.forEach((u) => {
                let img = "";
                if (u.profile_image) img = `${backendApi}/uploads/${u.profile_image}`;
                else img = `${backendApi}/uploads/defAvatar.png`;

                if (u._id === comment.userId)
                {
                    setUser({
                        profile_image: img,
                        username: u.username,
                    })
                    return
                }
            })
        }
        getUser();
    }, []);

  return (
    <div>
        {user &&
        <section className="m-2 p-2 h-full flex flex-col gap-2 border border-zinc-700 rounded-md cursor-default">
            <div className="p-2 w-full h-full flex items-center gap-4 cursor-text">
                <div className="rounded-full overflow-hidden w-8 h-8">
                    <img className="w-full h-full object-cover object-center" src={user.profile_image} alt="Profile Picture" />
                </div>
                <div className="text-base font-bold text-zinc-400">{user.username}</div>
            </div>
            <article className="whitespace-pre-wrap">{comment.text}</article>
        </section>
        }
    </div>
  );
};

export default GetComments