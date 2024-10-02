import React from "react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return(
    <div>
    <Oval
      visible={true}
      height="20"
      width="20"
      strokeWidth="5"
      color="#ffff"
      secondaryColor="whitesmoke"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div>
  );
}

export default Loader;
