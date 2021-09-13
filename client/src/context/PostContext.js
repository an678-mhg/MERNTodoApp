import { createContext, useReducer, useState } from "react"
import { postReducer } from '../Reducer/postReducer'
import { apiUrl } from "./const"
import axios from "axios"
import { POST_LOADED_FAIL, POST_LOADED_SUCCESS, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from "./const"

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })

    const [showModal, setShowModal] = useState(false)

    const [showUpdatePostModal, setshowUpdatePostModal] = useState(false)

    const [showTosat, setshowTosat] = useState({
        show: false,
        type: null,
        message: ''
    })

    // get all post
    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post/myposts`)
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            }
            return response.data
        } catch (error) {
            dispatch({
                type: POST_LOADED_FAIL
            })
        }
    }

    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post`, newPost)
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'server error'}
        }
    }

    //delete Post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/post/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }

    const findPost = (postId) => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    const postContextData = {
        postState,
        getAllPosts,
        showModal,
        setShowModal,
        addPost,
        showTosat,
        setshowTosat,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setshowUpdatePostModal
    }
    
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider