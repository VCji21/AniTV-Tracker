import { useEffect, useRef, useState } from "react";
import { delete_from_backend, update_backend, get_backend_data, backendApi } from "../../../../service/api";
import Comment from "./Comment";
import GetComments from "./GetComments";

/* --- Show all posts of other users --- */
const AllPosts = ({ post, liked, users }) => {
  const boxRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  const [user, setUser] = useState({});

  /* --- Show more or Show less --- */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    if (el.scrollHeight > el.clientHeight) {
      setShowMore(true);
    }
  }, [post.content]);

  /* --- Set users like --- */
  useEffect(() => {
    const likeIdSet = new Set(post.likes.map(id => id.toString()));

    const alreadyLiked = liked.some(like =>
      likeIdSet.has(like._id.toString())
    );

    setLike(alreadyLiked);
  }, [post.likes, liked]);

  /* --- Allow to like or remove like, if not --- */
  const likePost = async () => {
    try {
      let newlike = !like;
      setLike(newlike);

      if (newlike) {
        await update_backend("/api/posts/likes", { _id: post._id });
      } else {
        await delete_from_backend(`/api/posts/${post._id}/unlike`)
      }
    } catch (error) {
      console.error(error)
      setLike(prev => !prev); // rollback on failure
    }
  }

  /* --- Getting the user who post this --- */
  useEffect(() => {
    users.forEach((u) => {
      if (u._id === post.userId) {
        setUser(u);
        return;
      }
    })
  }, []);

  /* --- Setting comments for the post --- */
  useEffect(() => {
    const getComments = async () => {
      const comments = await get_backend_data(`/api/posts/${post._id}/getcomments`)
      setComments(comments.data)
    }
    getComments();
  }, [])

  return (
    <div className="p-4 my-4 flex flex-col gap-4 border border-zinc-700 rounded-md">

      {/* Setting user profile */}
      <div className="flex items-center gap-4">
        <div className="rounded-full w-6 h-6 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${backendApi}/uploads/${user.profile_image}`}
            alt="Profile"
          />
        </div>
        <div className="text-base text-zinc-500">{user.username}</div>
        <div className="text-sm text-zinc-500">{post.createdAt}</div>
      </div>

      {/* Adding post with show more or less functionality */}
      <div
        ref={boxRef}
        className={`whitespace-pre-wrap overflow-hidden transition-all ${expanded ? "max-h-none" : "max-h-[120px]"
          }`}
      >
        {post.content}
      </div>

      {showMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-400 self-start"
        >
          {expanded ? "Less" : "More"}
        </button>
      )}

      {/* Allow to like or remove like, if not & Get comments */}
      <div className="flex gap-4">
        <button onClick={likePost}
          className="flex gap-2 items-center py-1 px-4 border border-zinc-500 rounded-md"
        >
          {!like && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
            <path fill="white" d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" />
          </svg>}
          {like && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
            <path fill="red" d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" />
          </svg>}
          <span>{post.likes.length}</span>
        </button>
        <button onClick={() => { setComment(true) }} className="flex gap-2 items-center py-1 px-4 border border-zinc-500 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
            <path fill="white" d="M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z" />
          </svg>
          <span>{post.comments.length}</span>
        </button>
      </div>

      {/* Do comment and Getting comment for the post */}
      {/* This is not good way but i use this for fast development */}
      {comment && <div>
        <button className="px-2 py-1 rounded-md bg-red-500 m-2" onClick={() => { setComment(false) }}>Close</button>
        {/* <button className="px-2 py-1 rounded-md bg-blue-500 m-2" onClick={() => {setShowComments(true)}}>All Comments</button> */}
        <Comment post={post} setComment={setComment} />
        <div className="border border-zinc-700 rounded-md mt-1">
          {comments.map((comment) => {
            return <GetComments key={comment._id} comment={comment} />
          })}
        </div>
      </div>}

    </div>
  );
};

export default AllPosts