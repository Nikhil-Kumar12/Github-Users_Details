import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Users = () => {
  const [data, setData] = useState(null);
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
          <div className="heading">List of Users</div>
            {data?.map((users) => {
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
