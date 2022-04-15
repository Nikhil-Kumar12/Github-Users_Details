import React, { useState, useEffect } from "react";
import axios from "axios";
import Repos from "./Repos";
import ReactPaginate from "react-paginate";

const Profile = ({ login }) => {
  const [data, setData] = useState(null);
  const [repo, setRepo] = useState(null);
  const [repocount, setRepocount] = useState(0);
  const [page, setPagecount] = useState(1);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${login}`).then((response) => {
      const api = response.data;
      setData(api);
    });
    axios.get(`https://api.github.com/users/${login}/repos`).then((response) => {
      const api = response.data;
      setRepocount(api.length);
      setRepo(api);
    });
  }, []);
  const handlePageClick = (data) => {
    setPagecount(data.selected + 1);
  };
  console.log(page);
  return (
    <>
      <div className="indiv-user-details">
        {data && (
          <div className="details">
            <div className="user-details">
              <div className="image">
                <img src={data.avatar_url} alt="" />
              </div>
              <div className="details-list">
                <div className="name">{data.name}</div>
                {data.bio && <div className="bio">{data.bio}</div>}
                {data.location && (
                  <div className="location">
                    <img src="https://img.icons8.com/ultraviolet/40/000000/marker.png" /> &nbsp; {data.location}
                  </div>
                )}
                {data.twitter_username && (
                  <div className="twitter">
                    <img src="https://img.icons8.com/fluency/48/000000/twitter.png" /> &nbsp; https://twitter.com/
                    {data.twitter_username}
                  </div>
                )}
              </div>
            </div>
            <a target="_blank" href={`https://github.com/${data.login}`} className="gitlink">
              <img src="https://img.icons8.com/fluency/48/000000/link.png" /> https://github.com/{data.login}
            </a>
            <div />
          </div>
        )}
      </div>
      <div className="indiv-user-repos">
        {repo?.slice((page - 1) * 6, page * 6).map((repos) => {
          return (
            <div className="repos" key={repos.id}>
              {repos.name && <div className="repo-name">{repos.name}</div>}
              {repos.description && <div className="repo-description">{repos.description}</div>}
              <Repos full_name={repos.full_name} />
            </div>
          );
        })}
      </div>
      <ReactPaginate
        activeClassName="active"
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={repocount / 6}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Profile;
