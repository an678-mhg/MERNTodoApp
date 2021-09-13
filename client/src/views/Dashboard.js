import React, {useContext, useEffect} from 'react'
import { Button, Card, Spinner, Row, Col, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { PostContext } from '../context/PostContext'
import SinglePost from '../components/posts/SinglePost'
import ModalCreatePosts from '../components/posts/ModalCreatePosts'
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'

function Dashboard() {
    const { authState: { user: { username } } } = useContext(AuthContext)
    
    const { getAllPosts, postState: { posts, postsLoading, post }, setShowModal, showTosat } = useContext(PostContext)

    const { show, type, message } = showTosat
    
    const getUser = async () => {
        await getAllPosts()
    }
    
    useEffect(() => {
        getUser()
    }, [])

    let body

    if (postsLoading) {
        body = (
            <div className="spinner-container" >
                <Spinner animation='bolder' variant='info' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>
                        Hi {username}
                        <Card.Body>
                            <Card.Title>Welcome to LearnIt</Card.Title>
                            <Card.Text>
                                Click the button to track yor first skill to learn
                            </Card.Text>
                            <Button onClick={() => setShowModal(true)} variant="primary">LearnIt</Button>
                        </Card.Body>
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map(post => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }

    return (
        <>
            {body}
            <ModalCreatePosts />
            {post !== null && <UpdatePostModal />}
            <OverlayTrigger placement="left" overlay={<Tooltip>Add Post</Tooltip>}>
                <Button className="btn-floating" onClick={() => setShowModal    (true)}><img src={addIcon} width="60" height="60" /></Button>
            </OverlayTrigger>
            <Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }} className={`bg-${type} text-white`} >
                <Toast.Body>
                    <strong>{message }</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard
