import { useEffect } from "react";
import Logo from "../../src/images/logo_min_1.png";

const Favicon = () => {
  useEffect(() => {
    const favicon = document.getElementById("dynamic-favicon");
    if (favicon) {
      favicon.href = Logo;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.id = "dynamic-favicon";
      newFavicon.rel = "icon";
      newFavicon.href = Logo;
      document.head.appendChild(newFavicon);
    }
  }, []);

  return null; 
};

export default Favicon;
