import React, {useContext} from 'react'
import { Button } from 'react-bootstrap'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../context/PostContext'

function ActionButtons({ url, _id }) {
    const { deletePost, findPost, setshowUpdatePostModal, showUpdatePostModal } = useContext(PostContext)

    const destroyPost = async () => {
        deletePost(_id)
    }

    const choosePost = postId => {
        findPost(postId)
        setshowUpdatePostModal(true)
    }
    
    return (
        <>
            <Button className="post-button" href={url} target='_blank'>
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button className="post-button" onClick={choosePost.bind(this, _id)}>
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button className="post-button" onClick={destroyPost}>
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </>
    )
}

export default ActionButtons
