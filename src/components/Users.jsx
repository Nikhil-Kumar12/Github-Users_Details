import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Users = () => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => {
      const api = response.data;
      setData(api);
    });
  }, []);

  return (
    <>
      {data ? (
        <div className="users">
          <div className="top-main">
            <div className="heading">List of Users</div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter the value ..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          {data
            ?.filter((val) => {
              if (value == "") {
                return val;
              } else {
                return val.login.toLowerCase().includes(value.toLowerCase());
              }
            })
            .map((users) => {
              return (
                <div className="user-link" key={users.id}>
                  <Link className="link" to={`/${users.login}`} key={users.id}>
                    <span style={{ fontSize: "2rem", position: "absolute" }}>&#xb7;</span>
                    &nbsp; {users.login}
                  </Link>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};

export default Users;
