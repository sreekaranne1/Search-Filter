import React from "react";

function ElementsList(props) {
  const { data } = props;
  return (
    <div>
      <div className="container">
        {data?.length > 0 &&
          data.map((elem) => {
            return (
              <div
                key={`${elem.tab}${elem.tab_ln}`}
                id={elem.tab}
                className="wrpr"
              >
                <span>{elem.tab}</span>
                <div className="wrprCnt">
                  {elem?.data?.length > 0 &&
                    elem.data.map((child) => (
                      <p key={child.name}>{child?.vname}</p>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ElementsList;
