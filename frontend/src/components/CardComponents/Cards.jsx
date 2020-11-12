import React from "react";
import styles from "./style.module.css";
import { Switch } from "@material-ui/core";

function Cards({ data, clickHandler, checked, onChange }) {
    return (
        <>
            {" "}
            <div className={styles.detailsCardBox}>
                <div className={styles.cardDiv}>
                    <div className={styles.hoverBubble}></div>
                    <div className={styles.title}>
                        <h3>{data.name}</h3>
                    </div>
                    <div className={styles.description}>
                        <p>Cuisines: {data.cuisines}</p>
                        <div className={styles.address}>{data.address}</div>
                        <button>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={data.url}
                            >
                                More Details
                            </a>
                        </button>
                        {clickHandler ? (
                            <button
                                type="button"
                                className={styles.button}
                                onClick={() => clickHandler(data)}
                            >
                                Select Restaurant
                            </button>
                        ) : (
                            <Switch
                                checked={checked}
                                color="primary"
                                onChange={onChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cards;
