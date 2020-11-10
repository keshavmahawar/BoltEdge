import React, { useState, useEffect } from "react";
import axios from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { usersetCompetitor } from "../redux/User/action";
import Card from "./CardComponents/Cards";

export default function GetCompetitor() {
    const authToken = useSelector((state) => state.user.authToken);
    const restaurant = useSelector((state) => state.user.restaurant);
    const [isLoading, setIsLoading] = useState(true);
    const [allCompetitors, setAllCompetitors] = useState([]);

    const [topCompetitor, setTopCompetitor] = useState([]);
    const [topCompetitorIDs, setTopCompetitorIDs] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        axios
            .get("/user/competitors", {
                headers: {
                    Authorization: authToken,
                },
            })
            .then((res) => {
                setIsLoading(false);
                setAllCompetitors([...res.data, ...allCompetitors]);
            })
            .catch((err) => console.log(err?.response?.data?.message));
    }, []);

    const handleCheckBox = (e, id) => {
        if (e.target.checked == true) {
            if (topCompetitor.length >= 5) {
                e.target.checked = false;
                alert("Max 5 Competitors Only");
                console.log("Max 5");
                return;
            }
            allCompetitors.forEach((item) =>
                item.id == id ? handleTopCompetitor(item) : null
            );
        } else {
            let newArray = [...topCompetitor];
            let tempArray = [...topCompetitorIDs];
            topCompetitor.forEach((item, index) => {
                if (item.id == id) {
                    newArray.splice(index, 1);
                    tempArray.splice(index, 1);
                }
            });
            setTopCompetitor(newArray);
            setTopCompetitorIDs(tempArray);
        }
    };

    const handleTopCompetitor = (item) => {
        setTopCompetitor([...topCompetitor, item]);
        setTopCompetitorIDs([...topCompetitorIDs, item.id]);
    };

    const handleSave = () => {
        dispatch(usersetCompetitor({ topCompetitor, authToken })).then(() =>
            history.push("/dashboard")
        );
    };
    if (restaurant == null)
        return <Redirect to="/dashboard/restaurant/add"></Redirect>;
    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1 style={{ textAlign: "center", color: "#14C3C8" }}>
                        Select your Competitors
                    </h1>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="secondary"
                        style={{ float: "right" }}
                    >
                        Save Competitors
                    </Button>

                    <Grid container spacing={2}>
                        {allCompetitors.map((item) => {
                            return (
                                <>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        key={item.id}
                                    >
                                        <Card
                                            data={item}
                                            checked={
                                                topCompetitorIDs.includes(
                                                    item.id
                                                )
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                handleCheckBox(e, item.id)
                                            }
                                        ></Card>
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>
                </div>
            )}
        </>
    );
}
