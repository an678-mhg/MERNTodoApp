import React from 'react'
import { Redirect } from 'react-router'

function Landing() {
    return (
        <Redirect to="/login" />
    )
}

export default Landing
