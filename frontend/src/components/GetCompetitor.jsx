import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { usergetCompetitor } from '../redux/app/action'

export default function GetCompetitor() {
    const { authToken } = useSelector((state) => state.user)
    const { allCompetitors, isLoading } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usergetCompetitor({ authToken }))
    }, [])

    return (
        <>
            {isLoading ? (<h1>Loading...</h1>) :
                (
                    allCompetitors.map((item) => {
                        return (
                            <>
                                <div>{item.name}</div>
                                <div><a href={`item.url`}>View Site</a></div>
                            </>
                        )
                    })
                )}
        </>
    )
}