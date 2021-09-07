import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pathToHeader } from "containers/MenuContainer";

export default function useHeader() {
  const location = useLocation();
  const [header, setHeader] = useState("");

  useEffect(() => {
    const paths = Object.keys(pathToHeader);
    for (const path of paths) {
      if (location.pathname.startsWith(path)) {
        setHeader(pathToHeader[location.pathname]);
        break;
      }
    }
  }, [location.pathname]);

  return header;
}
