import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log("API Response:", response.data);
                
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else if (response.data.users && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    setUsers([]);
                }
                setLoaded(true);
            })
            .catch((err) => {
                toast.error("Failed to load users");
                console.error(err);
            });
        }
    }, [loaded]);

    // User ගේ Status එක වෙනස් කිරීම (Block/Unblock)
    const toggleBlockStatus = (email, currentStatus) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + `/users/status/${email}`, 
            { isBlocked: !currentStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
            toast.success(currentStatus ? "User Unblocked" : "User Blocked");
            setLoaded(false); // Table එක Reload කරන්න
        })
        .catch((err) => {
            toast.error("Failed to update status");
            console.error(err);
        });
    };

    return (
        <div className="w-full h-full flex flex-col p-8 relative overflow-y-auto font-velvet">
            <div className="w-full bg-white/50 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <h1 className="text-3xl font-extrabold text-text mb-8 tracking-tight">Manage Users</h1>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-secondary text-[11px] uppercase tracking-widest text-primary">
                                <th className="p-4 font-extrabold">Name</th>
                                <th className="p-4 font-extrabold">Email</th>
                                <th className="p-4 font-extrabold">Role</th>
                                <th className="p-4 font-extrabold">Blocked</th>
                                <th className="p-4 font-extrabold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index} className="border-b border-secondary/50 hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 font-bold text-text text-sm capitalize">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="p-4 font-medium text-text/80 text-sm">{user.email}</td>
                                        <td className="p-4 font-medium text-text/80 text-sm uppercase">{user.role}</td>
                                        <td className="p-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                                user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                            }`}>
                                                {user.isBlocked ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleBlockStatus(user.email, user.isBlocked)}
                                                className={`py-2 px-4 rounded-xl font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                                                    user.isBlocked 
                                                    ? "bg-green-600 hover:bg-green-700 text-white" 
                                                    : "bg-red-600 hover:bg-red-700 text-white"
                                                }`}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-text/60">
                                        {loaded ? "No users found" : "Loading..."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}