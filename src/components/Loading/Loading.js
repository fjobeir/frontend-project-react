import './Loading.css'

const Loading = () => {
    return (
        <div className="loading-container text-center">
            <p>Loading ...</p>
            <div className="line">
                <div className="inner"></div>
            </div>
        </div>
    )
}

export default Loading