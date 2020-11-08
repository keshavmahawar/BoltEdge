import React from "react";
import styles from "./style.module.css";

function Cards({ data, clickHandler }) {
    return (
        <>
            {" "}
            <div className={styles.detailsCardBox}>
                <div className={styles.cardDiv}>
                    <div className={styles.hoverBubble}></div>
                    <div className={styles.title}>
                        <h1>{data.name}</h1>
                    </div>
                    <div className={styles.description}>
                        <p>Cuisines: {data.cuisines}</p>
                        <div className={styles.address}>
                            Address:143\\/A, 60 Feet Road, Koramangala 5th
                            Block, Bangalore
                        </div>
                        <button>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={data.url}
                            >
                                More Details
                            </a>
                        </button>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={() => clickHandler(data)}
                        >
                            Select Restaurant
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cards;
