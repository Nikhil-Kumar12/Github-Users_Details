import React, { useState, useEffect } from "react";
import axios from "axios";

const Repos = ({ full_name }) => {
  const [language, setLanguage] = useState(null);
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios.get(`https://api.github.com/repos/${full_name}/languages`).then((response) => {
      const api = response.data;
      setLanguage(api);
    });
  }, []);

  return (
    <div className="languages">
      {language && (
        <>
          {Object.entries(language).map(([key, value]) => {
            return <div className="indiv-language">{key}</div>;
          })}
        </>
      )}
    </div>
  );
};

export default Repos;
