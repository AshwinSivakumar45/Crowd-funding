import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ Name: "", Email: "" });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:1000/register");
        console.log("Fetched data:", response.data);
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  async function handleAddUser() {
    try {
      const response = await axios.post("http://localhost:1000/add", {
        Name: newUser.Name,
        Email: newUser.Email,
        status: "active",
      });
      console.log(response.data);

      setUsers([...users, response.data]);
      setNewUser({ Name: "", Email: "" });
      alert("User added successfully!");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleBlockUser(_id) {
      
      const response = await axios.post(`http://localhost:1000/block/${_id}`);
      console.log(response.data);
      
    

    console.log("Blocking user:", _id);


  }

  async function handleUnblockUser(_id) {
    const response = await axios.post(`http://localhost:1000/unblock/${_id}`)
    console.log(response.data);
    


    console.log("Unblocking user:", _id);
  }

  async function handleDeleteUser(_id) {
    try {
      const response = await axios.post(`http://localhost:1000/delete/${_id}`)
      alert('Fundraiser rejected successfully!');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      console.log("Deleting user:", _id);

    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <div className="p-4 bg-white rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold">Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.Name}
          onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.Email}
          onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleAddUser}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Add User
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-3 px-4">{user.Name}</td>
                  <td className="py-3 px-4">{user.Email}</td>
                  <td className="py-3 px-4 capitalize">{user.status}</td>
                  <td className="py-3 px-4">
                    {user.status === "active" && (
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                        onClick={() => handleBlockUser(user._id)}
                      >
                        Block
                      </button>
                    )}
                    {user.status === "blocked" && (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        onClick={() => handleUnblockUser(user._id)}
                      >
                        Unblock
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center">
                  No users found☝️.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
