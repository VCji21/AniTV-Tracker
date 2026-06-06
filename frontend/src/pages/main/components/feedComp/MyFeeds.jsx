import { useEffect, useState } from 'react'
import { get_backend_data } from '../../../../service/api'
import { getUserInfo} from './data/userInfo'

import EmptyFeed from './EmptyFeed'
import PostItem from './postItem'

/* --- Getting all my posts --- */
const MyFeeds = () => {
    const [liked, setLiked] = useState([])
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    /* --- Getting posts and likes --- */
    useEffect(() => {
        const getPosts = async () => {
            try {
                const u = await getUserInfo();
                setUser(u);

                const res = await get_backend_data(`/api/posts/feeds`);
                setPosts(res.data);
                setLiked(res.liked);

            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, [])

  return (
    <div>
        {/* Check for empty feed */}
        {posts.length === 0 && <EmptyFeed/>}

        {/* Map all post of current user */}
        {posts.map((post, index) => {
            return (
                <PostItem key={index} post={post} liked={liked} user={user}/>
            )
        })}
    </div>
  )
}

export default MyFeeds