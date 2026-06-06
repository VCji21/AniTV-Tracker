import { useEffect, useState } from 'react'
import { get_backend_data } from '../../../../service/api'
import { getAllUserInfo } from './data/userInfo'
import EmptyFeed from './EmptyFeed'
import AllPosts from './AllPosts'

/* --- Show all feeds except current user --- */
const Feeds = () => {
    const [liked, setLiked] = useState([])
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    /* --- Get post with likes --- */
    useEffect(() => {
        const getPosts = async () => {
            try {
                const u = await getAllUserInfo();
                setUsers(u);

                const res = await get_backend_data(`/api/posts/allfeeds`);
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
        {/* If feed is empty show emptyness */}
        {posts.length === 0 && <EmptyFeed/>}

        {/* Show all posts of the other users */}
        {posts.map((post, index) => {
            return (
                <AllPosts key={post._id} post={post} liked={liked} users={users}/>
            )
        })}
    </div>
  )
}

export default Feeds