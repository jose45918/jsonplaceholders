"use client"; // Add this directive at the top to make this a Client Component

import axios from "axios";
import { useEffect, useState } from "react";

async function getRegistro() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(url);
    return response.data;
}

export default function Usu() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getRegistro();
            setUsuarios(data);
        };
        fetchUsers();   
    }, []);

    const showUserDetails = (usuario) => {
        setSelectedUser(usuario);
    };

    return (
        <>
            <h1>Usuario</h1>
            <p>Estas en usuarios</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    showUserDetails(usuario);
                                }}>
                                    {usuario.name}
                                </a>
                            </td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Website:</strong> {selectedUser.website}</p>
                    <h3>Address:</h3>
                    <p>{selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                    <h3>Company:</h3>
                    <p><strong>Name:</strong> {selectedUser.company.name}</p>
                    <p><strong>Catch Phrase:</strong> {selectedUser.company.catchPhrase}</p>
                    <p><strong>BS:</strong> {selectedUser.company.bs}</p>
                </div>
            )}
        </>
    );
}
