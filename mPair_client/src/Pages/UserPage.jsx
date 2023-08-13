import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserPage = () => {
    // function to get all user from db
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const jwtToken = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/users", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
                },
            });

            if (response.ok) {
                const usersData = await response.json();
                setUsers(usersData);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const updateUserStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                await response.json();
                getUsers();
                Swal.fire({
                    icon: "success",
                    title: "Status Updated",
                    text: "User status has been updated successfully",
                });
            } else {
                console.error("Failed to update user status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="w-[900px] mx-auto py-20 ">

            <div className="overflow-x-auto w-full">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>
                                    {index + 1}
                                </td>

                                <td>{user.name}</td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.category}
                                </td>


                                <td>{user.status}</td>
                                <td>
                                    <div className="flex  justify-center gap-2 ">
                                    <button 
                                            className={`btn btn-sm btn-ghost bg-green-600 text-white ${
                                                user.status === "admin" || !user ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            onClick={() => updateUserStatus(user._id, "admin")}
                                            disabled={user.status === "admin" || !user}
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                        
                                            className={`btn btn-sm btn-ghost bg-red-600 text-white ${
                                                user.status === "user" || !user ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            onClick={() => updateUserStatus(user._id, "user")}
                                            disabled={user.status === "user" || !user}
                                        >
                                            Make User
                                        </button>



                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPage;