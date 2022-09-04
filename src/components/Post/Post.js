import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useContext, useState } from 'react'
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'
import './Post.css'
import { AuthContext } from '../../contexts/AuthContext'

dayjs.extend(relativeTime)

const Post = ({post}) => {
    const { token } = useContext(AuthContext)
    const [liked, setLiked] = useState(post?.liked_by_current_user)
    const [detailed, setDetailed] = useState(false)
    const [details, setDetails] = useState(post)

    const likePost = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/like`, {
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
            setLiked(true)
        }
    }
    const unlikePost = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/unlike`, {
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
            setLiked(false)
        }
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

    return (
        <div className="post">
            <div className='postContent'>
                <img src={post?.user?.avatar} alt={post?.user?.name} />
                <div>
                    <div className='mb-0 name'>{post?.user?.name}</div>
                    <div className='mb-2 datetime'>{dayjs().to(dayjs(post?.created_at))}</div>
                    <p>{post.content}</p>
                    <div className='icons d-flex align-items-center'>
                        <div className='me-2'>
                        {liked ? 
                            <Favorite color='error' onClick={() => {unlikePost(post.id)}} /> : 
                            <FavoriteBorder onClick={() => likePost(post.id)} /> }
                        </div>
                        <ChatBubbleOutline onClick={() => {loadDetails(post.id)}} />
                    </div>
                </div>
            </div>
            {
                detailed && (
                    <>
                        <div className='comments'>
                            {details?.comments.map((comment, i) => {
                                return (
                                    <div className='comment'>
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
                                        <input type='text' className='form-control' placeholder='Add a new comment' />
                                    </div>
                                    <div className='col-3 p-0'>
                                        <button className='btn btn-primary w-100'>
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