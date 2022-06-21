import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link } from "react-router-hash-link";

function NavBar(props) {
  const { data, setData, searchData, scrollWithOffset } = props;
  const handleSearch = (e) => {
    if (e.target.value.length !== 0) {
      const arrFinal = [];
      for (const elem of searchData) {
        if (elem.tab.toLowerCase().includes(e.target.value.toLowerCase())) {
          arrFinal.push(elem);
        } else {
          let arr = [];
          let copy = { ...elem };
          for (let i in elem.data) {
            if (
              elem.data[i].name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
              arr.push(elem.data[i]);
            }
          }

          if (arr.length > 0) {
            copy.data = arr;
            arrFinal.push(copy);
          }
        }
      }
      setData(arrFinal);
    } else if (e.target.value.length === 0) {
      setData(searchData);
    }
  };

  return (
    <div className="App">
      <h3 style={{ marginBottom: "10px", marginTop: "10px" }}>SEARCH BAR</h3>
      <div className="sb-example-1">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search.."
            onChange={(e) => handleSearch(e)}
          ></input>
          <button type="submit" className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="scrollmenu">
        {data?.length > 0 &&
          data.map((elem) => {
            return (
              <span key={`${elem.tab}${elem.tab_ln}`}>
                <Link
                  to={`#${elem.tab}`}
                  smooth
                  scroll={(el) => scrollWithOffset(el)}
                >
                  {elem.tab}
                </Link>
              </span>
            );
          })}
      </div>
    </div>
  );
}

export default NavBar;
