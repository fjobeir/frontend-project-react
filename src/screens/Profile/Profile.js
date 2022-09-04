import Wrapper from "../../components/Wrapper/Wrapper"
import NewPost from "../../components/New/New"
import Head from "../../components/Head/Head"


const Profile = () => {
    return (
        <Wrapper>
            <Head title={'Profile'} />
            <NewPost />
        </Wrapper>
    )
}

export default Profile