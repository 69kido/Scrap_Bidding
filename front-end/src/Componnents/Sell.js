import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sell = () => {
    const [scrapType, setScrapType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleScrapTypeChange = (e) => {
        setScrapType(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submitScrap = async () => {
        if (!scrapType || !price || !description || !image) {
            setError(true);
            return false;
        }
    
        const userEmail = JSON.parse(localStorage.getItem('user')).email;
    
        // Creating FormData to handle image file
        const formData = new FormData();
        formData.append('scrapType', scrapType);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('file', image);  // Match 'file' as defined in Express
        formData.append('userEmail', userEmail);
    
        try {
            let result = await fetch("http://localhost:5000/Sell_Scrap", {
                method: "POST",
                body: formData
            });
    
            result = await result.json();
            console.log(result);
        } catch (error) {
            console.error("Error submitting scrap:", error);
        }
        navigate("/");
    };
    

    return (
        <div className="main-content">
            <div className="wrapper">
                <h1>Sell Scrap</h1>

                <div className="input-group">
                    <select
                        id="scrapType"
                        className="select-box"
                        value={scrapType}
                        onChange={handleScrapTypeChange}
                    >
                        <option value="">Select Scrap Type</option>
                        <option value="Copper">Copper</option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Brass">Brass</option>
                        <option value="Steel">Steel</option>
                    </select>
                    {error && !scrapType && <span className="error-message">Please choose a scrap type.</span>}

                    <input
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {error && !price && <span className="error-message">Price is required.</span>}
                </div>

                <textarea
                    className="textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && !description && <span className="error-message">Please provide a description.</span>}

                <input
                    type="file"
                    onChange={handleImageChange}
                />
                {error && !image && <span className="error-message">Please upload an image.</span>}

                <button className="submit-button" onClick={submitScrap}>Submit Scrap</button>
            </div>
        </div>
    );
}

export default Sell;
