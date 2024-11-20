import React, { useEffect, useState } from 'react';

const Admin = () => {
    const [scraps, setScraps] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchScraps();
        fetchUsers();
    }, []);

    const fetchScraps = async () => {
        const result = await fetch('http://localhost:5000/Scrap_List');
        const data = await result.json();
        setScraps(data);
    };

    const fetchUsers = async () => {
        const result = await fetch('http://localhost:5000/Users_List');
        const data = await result.json();
        setUsers(data);
    };

    const deleteScrap = async (id) => {
        await fetch(`http://localhost:5000/DeleteScrap/${id}`, { method: 'DELETE' });
        fetchScraps();  // Refresh the list
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:5000/DeleteUser/${id}`, { method: 'DELETE' });
        fetchUsers();  // Refresh the list
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-section"><h1>Admin Dashboard</h1>
            
                <section>
                    <h2>Manage Scraps</h2>
                    {scraps.map((scrap, index) => (
                        <div key={scrap._id}>
                            <p>{index + 1}. {scrap.scrapType} - {scrap.price}</p>
                            <button className="delete-button" onClick={() => deleteScrap(scrap._id)}>Delete</button>
                        </div>
                    ))}
                </section>
                
                <section>
                    <h2>Manage Users</h2>
                    {users.map((user, index) => (
                        <div key={user._id}>
                            <p>{index + 1}. {user.name} - {user.email}</p>
                            <button className="delete-button" onClick={() => deleteUser(user._id)}>Block</button>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Admin;
