import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PurchaseConfirmation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [confidentialNumber, setConfidentialNumber] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { item } = location.state || {};

    const handleConfirm = async(id) => {
        
            let result= await fetch(`http://localhost:5000/confirmation/${id}`,{
                method:'Delete'
            }
            );
            result = await result.json();
            if(result){
                alert('deleted ...');
                navigate('/buy')
            }
    
        
    };

    return (
        <div className="confirmation-page main-content">
            <h1>Purchase Confirmation</h1>
            <div className="input-group">
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>Bank Account:</label>
                <input 
                    type="text" 
                    value={bankAccount} 
                    onChange={(e) => setBankAccount(e.target.value)} 
                    required 
                />

                <label>Numero de Confidentialite:</label>
                <input 
                    type="text" 
                    value={confidentialNumber} 
                    onChange={(e) => setConfidentialNumber(e.target.value)} 
                    required 
                />
            </div>

            <button onClick={()=>handleConfirm(item._id)} className="typic-button">
                Confirmation
            </button>
        </div>
    );
};

export default PurchaseConfirmation;
