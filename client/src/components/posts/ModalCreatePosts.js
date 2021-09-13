import { Modal, Button, Form } from "react-bootstrap"
import React, { useContext, useState } from 'react'
import { PostContext } from "../../context/PostContext"

function ModalCreatePosts() {
    const { showModal, setShowModal, addPost, setshowTosat } = useContext(PostContext)

    const closeModal = () => {
        setShowModal(false)
        setnewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
    }

    const [newPost, setnewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url, status } = newPost
    
    const onChangeNewPost = (e) => {
        setnewPost({...newPost, [e.target.name]: e.target.value})
    }

    const createPost = async () => {
        const {success, message} = await addPost(newPost)
        setnewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowModal(false)
        setshowTosat({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        })
        setTimeout(() => setshowTosat({
            show: false,
            message: '',
            type: null
        }), 3000)
    }

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>
                    What do you want to learn
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Title" name="title" required aria-describedby="title-help" onChange={onChangeNewPost} value={title} />
                        <Form.Text id="title-help">Required</Form.Text>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control row={3} as="textarea" type="text" placeholder="Description" name="description" onChange={onChangeNewPost} value={description} />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control type="text" placeholder="Youtube Tutorial URL" name="url" onChange={onChangeNewPost} value={url} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => closeModal()} variant="secondary">Cancel</Button>
                    <Button onClick={createPost} variant="success">Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ModalCreatePosts
