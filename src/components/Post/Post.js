import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useContext, useRef, useState } from 'react'
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import './Post.css'
import { AuthContext } from '../../contexts/AuthContext'

dayjs.extend(relativeTime)

const Post = ({post}) => {
    const newCommentRef = useRef()
    const { token } = useContext(AuthContext)
    const [liked, setLiked] = useState(post?.liked_by_current_user)
    const [detailed, setDetailed] = useState(false)
    const [details, setDetails] = useState(post)
    const [loading, setLoading] = useState(false)

    const likeUnlike = async (id, todo, liked) => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/${todo}`, {
            method: 'post',
            body: JSON.stringify({
                post_id: id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.success) {
            setLiked(liked)
            setDetails({
                ...details,
                likes_count: json.data.likes_count
            })
        }
    }
    const likePost = async (id) => {
        likeUnlike(id, 'like', true)
    }
    const unlikePost = async (id) => {
        likeUnlike(id, 'unlike', false)
    }

    const loadDetails = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.success) {
            setDetailed(true)
            setDetails(json.data)
        }
    }

    const addComment = async (id) => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API}/comments`, {
            method: 'post',
            body: JSON.stringify({
                post_id: id,
                content: newCommentRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (!json?.success) {
            window.alert(json?.messages.join(', '))
        } else {
            newCommentRef.current.value = ''
            setDetails({
                ...details,
                comments: [...details.comments, json.data],
                comments_count: parseInt(details.comments_count) + 1
            })
        }
        setLoading(false)
    }

    return (
        <div className="post">
            <div className='postContent'>
                <img src={post?.user?.avatar} alt={post?.user?.name} />
                <div>
                    <div className='mb-0 name'>{post?.user?.name}</div>
                    <div className='mb-2 datetime'>{dayjs().to(dayjs(post?.created_at))}</div>
                    <p>{post.content}</p>
                    <div className='icons d-flex align-items-center'>
                        <div className='me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center'>
                        {liked ? 
                            <Favorite color='error' onClick={() => {unlikePost(post.id)}} /> : 
                            <FavoriteBorder onClick={() => likePost(post.id)} /> }
                            <div className='ms-2 fw-bolder'>{details.likes_count}</div>
                        </div>
                        <div className='border rounded border bg-light py-1 px-2 d-flex align-items-center'>
                            <ChatBubbleOutline onClick={() => {loadDetails(post.id)}} />
                            <div className='ms-2 fw-bolder'>{details.comments_count}</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                detailed && (
                    <>
                        <div className='comments'>
                            {details.comments?.map((comment, i) => {
                                return (
                                    <div className='comment' key={i}>
                                        <img src={comment?.user?.avatar} alt={comment?.user?.name} />
                                        <div>
                                            <div className='name'>{comment?.user?.name}</div>
                                            <div className='mb-2 datetime'>{dayjs().to(dayjs(comment?.created_at))}</div>
                                            {comment.content}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='container-fluid addcomment'>
                                <div className='row'>
                                    <div className='col-9 ps-0'>
                                        <input type='text' ref={newCommentRef} className='form-control' placeholder='Add a new comment' />
                                    </div>
                                    <div className='col-3 p-0'>
                                        <button disabled={loading} className='btn btn-primary w-100' onClick={() => {addComment(post.id)}}>
                                            <small>Add</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </>

                )
            }
        </div>
    )
}

export default Post