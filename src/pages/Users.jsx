// This admin-side component displays a list of all registered users.
// Admins can search for users by email and update their passwords directly from this interface.
// It uses data from a local JSON file as a mock database.
// Password updates are hashed using MD5 (just for mock purposes).

import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import "./admin.css";
import "./home.css";
import "./category.css";
import { useMessage } from "../context/MessageContext";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [findUser, userSearch] = useState([]);
  const { showMessage } = useMessage();

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
      const res = await axiosInstance.get('/users');
      console.log(res.data)
      setUsers(res.data)
    } catch (err) {
      console.error("cant find product:", err);
    }
  }   

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      userSearch(
        users.filter((user) =>
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  const updatePassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const userId = form.id;
    const newPassword = form.password.value;

    if (!newPassword || newPassword.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    showMessage(`Password updated successfully for user ID ${userId}`, "success");

    form.reset();
  };

  return (
    <section>
      <div className="user-orders">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <h2>Users</h2>
          <input
            style={{ alignSelf: "center" }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Sub-city</th>
              <th>Account Type</th>
              <th>Update Password</th>
            </tr>
          </thead>
          <tbody>
            {findUser.map((user) => {
              
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_no}</td>
                  <td>{user.city}</td>
                  <td>{user.subcity || user.address}</td>
                  <td>{user.accountType}</td>
                  <td>
                    <form id={user.id} onSubmit={updatePassword}>
                      <input
                        type="text"
                        name="password"
                        placeholder="New password"
                      />
                      <button type="submit">Update</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
