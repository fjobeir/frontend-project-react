import Wrapper from "../../components/Wrapper/Wrapper"
import NewPost from "../../components/New/New"
import Head from "../../components/Head/Head"
import Post from "../../components/Post/Post"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Timeline = () => {
    const { token } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const ps = await fetch(`${process.env.REACT_APP_API}/posts`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await ps.json()
            if (json?.data?.length) {
                setPosts(json?.data)
            }
        }
        getPosts()
    }, [])
    return (
        <Wrapper>
            <Head title={'Home'} />
            <NewPost setPosts={setPosts} />
            <div className="mb-4">
            {
                posts.map((post, i) => {
                    return <Post post={post} key={i} />
                })
            }
            </div>
        </Wrapper>
    )
}

export default Timeline