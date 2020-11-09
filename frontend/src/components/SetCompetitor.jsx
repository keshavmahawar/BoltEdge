import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function SetCompetitor() {
    const { restaurant } = useSelector((state) => state.user)


    if (restaurant == null)
        return <Redirect to=""></Redirect>

    return (
        <>

        </>
    )
}