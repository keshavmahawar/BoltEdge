import React, { useState, useEffect } from 'react'
import axios from '../requests/request'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Checkbox } from '@material-ui/core'
// import { usersetCompetitor } from '../redux/User/action'

export default function GetCompetitor() {
    const { authToken } = useSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(true)
    const [allCompetitors, setAllCompetitors] = useState([])

    const [topCompetitor, setTopCompetitor] = useState([])
    const [topCompetitorIDs, setTopCompetitorIDs] = useState([])

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

    const handleCheckBox = (e, id) => {
        if (e.target.checked == true) {
            if (topCompetitor.length >= 5) {
                e.target.checked = false
                console.log("Max 5")
                return;
            }
            allCompetitors.forEach((item) => item.id == id ? handleTopCompetitor(item) : null)
        }
        else {
            let newArray = [...topCompetitor]
            let tempArray = [...topCompetitorIDs]
            topCompetitor.forEach((item, index) => {
                if (item.id == id) {
                    newArray.splice(index, 1)
                    tempArray.splice(index, 1)
                }
            })
            setTopCompetitor(newArray)
            setTopCompetitorIDs(tempArray)
        }
        console.log(e.target.checked, id, topCompetitor)

    }

    const handleTopCompetitor = (item) => {
        setTopCompetitor([...topCompetitor, item]);
        setTopCompetitorIDs([...topCompetitorIDs, item.id])
    }

    const handleSave = () => {
        console.log(topCompetitor)
        // dispatch(usersetCompetitor(topCompetitor))
    }
    return (

        <>
            {isLoading ? (<h1>Loading...</h1>) :
                (
                    <div>
                        {
                            allCompetitors.map((item) => {
                                return (
                                    <>
                                        <div key={item.id}>
                                            <div>
                                                <Checkbox
                                                    checked={topCompetitorIDs.includes(item.id) ? true : false}
                                                    color="primary"
                                                    onChange={(e) => handleCheckBox(e, item.id)}
                                                />
                                            </div>
                                            <div>{item.name}</div>
                                            <div><a href={item.url}>View Site</a></div>
                                        </div>

                                    </>
                                )
                            })
                        }
                        <button onClick={handleSave}>Save</button>
                    </div>
                )}

        </>
    )
}