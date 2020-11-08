import React, { useState, useEffect } from 'react'
import axios from '../requests/request'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Checkbox } from '@material-ui/core'
import { usersetCompetitor } from '../redux/User/action'

export default function GetCompetitor() {
    const { authToken } = useSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(true)
    const [allCompetitors, setAllCompetitors] = useState([])
    const [checked, setChecked] = useState(false);
    const [topCompetitor, setTopCompetitor] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("/user/competitors", {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ZlcmlmaWVkIjp0cnVlLCJpc1BhaWQiOnRydWUsImVtYWlsIjoia2VzbWFoYXdhckBnbWFpbC5jb20iLCJpYXQiOjE2MDQ3NTkyOTJ9.9f6ggejOeXl4fJy6fzVbsASCCJqoUk_sobBXW9ChFVE`
            }
        }).then((res) => {
            setIsLoading(false)
            setAllCompetitors([...res.data, ...allCompetitors])
        }).catch((err) => console.log(err?.response?.data?.message))
    }, [])

    const handleCheckBox = (id) => {
        if (checked == true) {
            allCompetitors.find((item) => item.id === id ? setTopCompetitor([...topCompetitor, item]) : null)
        }
        else {
            allCompetitors.filter((item) => item.id !== id)
        }

    }

    const handleSave = () => {
        console.log(topCompetitor)
        dispatch(usersetCompetitor(topCompetitor))
    }
    return (
        <>
            {isLoading ? (<h1>Loading...</h1>) :
                (
                    allCompetitors.map((item) => {
                        return (
                            <>
                                <div key={item.id}>
                                    <div>
                                        <Checkbox
                                            value={checked}
                                            color="primary"
                                            onChange={() => handleCheckBox(item.id)}
                                        />
                                    </div>
                                    <div>{item.name}</div>
                                    <div><a href={item.url}>View Site</a></div>
                                </div>
                                <button onClick={handleSave}>Save</button>
                            </>
                        )
                    })
                )}
        </>
    )
}