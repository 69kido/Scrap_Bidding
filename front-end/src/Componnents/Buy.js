import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Buy = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getScraps();
    }, []);

    const getScraps = async () => {
        let result = await fetch('http://localhost:5000/Scrap_List');
        result = await result.json();
        setJobs(result);
    }

    const buyScrap = async (id) => {
        navigate("/confirmation");
    }


    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/Search/${key}`);
            result = await result.json();
            if (result) {
                setJobs(result);
            }
        } else {
            getScraps();
        }
    }

    return (
        <div className='job-list main-content body'>
            <h1>Scrap list</h1>
            <input
                type="text"
                className='search-box'
                placeholder='Search Job'
                onChange={searchHandle}
            />
            <ul>
                <li>N°</li>
                <li>Scrap Type</li>
                <li>Price</li>
                <li>Description</li>
                <li>Image</li>
                <li>Buy</li>
            </ul>
            {
                jobs.length > 0 ? jobs.map((item, index) =>
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.scrapType}</li>
                        <li>{item.price}</li>
                        <li>{item.description}</li>
                        {/* Display the image using the server URL */}
                        <li>
                            <img
                                src={`http://localhost:5000/${item.image}`}
                                alt="Scrap"
                                style={{ width: '100px', height: '100px' }}
                            />
                        </li>
                        <li>
                            <button className='typic-button' onClick={() => buyScrap(item._id)}>
                                Buy
                            </button>
                        </li>
                    </ul>
                ) : <h1>No Scrap Found</h1>
            }
        </div>
    )
}

export default Buy;
