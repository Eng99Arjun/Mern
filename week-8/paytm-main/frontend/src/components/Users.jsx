import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found");
                }
                const response = await axios.get("http://localhost:3000/api/v1/users/bulk?filter=" + filter, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
                alert("Failed to fetch users");
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <>
            <div className='font-bold mt-6 text-lg'>
                Users
            </div>
            <div className='my-2'>
                <input
                    type="text"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    placeholder='Search Users...'
                    className='w-full px-2 py-1 border rounded border-slate-200'
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className='flex'>
                <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                    <div className='flex flex-col justify-center h-full text-xl'>
                        {user.firstName[0]}
                    </div>
                </div>
                <div className='flex flex-col justify-center h-full'>
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        console.log()
                        navigate(`/send?id=${user.id}&name=${user.firstName}`);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}