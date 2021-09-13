import { Modal, Button, Form } from "react-bootstrap"
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from "../../context/PostContext"

function UpdatePostModal() {
    const { postState: { post }, setshowUpdatePostModal, showUpdatePostModal, updatePost, setshowTosat } = useContext(PostContext)

    const closeModal = () => {
        setshowUpdatePostModal(false)
        setUpdatePost(post)
    }

    const [updatedPost, setUpdatePost] = useState(post)

    useEffect(() => setUpdatePost(post), [post])

    const { title, description, url, status } = updatedPost

    const onChangeNewPost = (e) => {
        setUpdatePost({ ...updatedPost, [e.target.name]: e.target.value })
    }

    const update = async () => {
        const { success, message } = await updatePost(updatedPost)
        setshowUpdatePostModal(false)
        // setUpdatePost({
        //     title: '',
        //     description: '',
        //     url: '',
        //     status: 'TO LEARN'
        // })
        // setShowModal(false)
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
        <Modal show={showUpdatePostModal}>
            <Modal.Header>
                <Modal.Title>
                    Making progress ?
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
                    <Form.Group>
                        <Form.Control as="select" value={status} name="status" onChange={onChangeNewPost}>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => closeModal()} variant="secondary">Cancel</Button>
                    <Button onClick={update} variant="success">Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
