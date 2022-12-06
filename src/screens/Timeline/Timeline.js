import Wrapper from "../../components/Wrapper/Wrapper"
import NewPost from "../../components/New/New"
import Head from "../../components/Head/Head"
import Post from "../../components/Post/Post"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Loading from "../../components/Loading/Loading"

let isFetching = true

const Timeline = () => {
    const { token } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts?page=${currentPage}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()
        setHasMore(json?.data?.last_page > currentPage)
        if (json?.data?.data?.length) {
            setPosts((prev) => {
                return [...prev, ...json?.data?.data]
            })
            isFetching = false
        }
    }

    const fetching = () => {
        if (!isFetching && hasMore && (window.innerHeight + document.documentElement.scrollTop + 100) > document.documentElement.offsetHeight) {
            isFetching = true
            setCurrentPage((cp) => (cp + 1))
            console.log('Almost at the end of the page, I will fetch now')
        }
    }

    useEffect(() => {
        getPosts()
    }, [currentPage])

    useEffect(() => {
        window.addEventListener('scroll', fetching)
        console.log('Attching Scroll Event')
        return () => {
            console.log('Leaving the posts list, do not forgot to deatch the scroll event, we no longer need it')
            window.removeEventListener('scroll', fetching)
        }
    }, [])
    return (
        <Wrapper>
            <Head title={'Home'} />
            <NewPost setPosts={setPosts} />
            <div className="mb-4">
                {
                    posts.map((post, i) => {
                        return <Post post={post} key={`post-${post.id}`} />
                    })
                }
            </div>
            {(isFetching && hasMore) && <Loading />}
            {!hasMore && <div className='text-center my-4 fst-italic fw-bold text-secondary'>The end of the posts</div>}
        </Wrapper>
    )
}

export default Timeline