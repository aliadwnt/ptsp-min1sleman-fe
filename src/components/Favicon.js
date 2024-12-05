import { useEffect, useState } from "react";
import { fetchSettings } from "../services/settingsService";
import DEFAULT_LOGO_URL from "../images/logo_min_1 copy.png";

const Favicon = () => {
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetchSettings();

        if (Array.isArray(response)) {
          const logoSetting = response.find((item) => item.key === "app_logo");

          if (logoSetting && logoSetting.value) {
            setLogo(logoSetting.value);
          } else {
            setLogo(DEFAULT_LOGO_URL);
          }
        } else {
          setLogo(DEFAULT_LOGO_URL);
        }
      } catch (error) {
        setLogo(DEFAULT_LOGO_URL);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const favicon = document.getElementById("dynamic-favicon");
    if (favicon) {
      favicon.href = logo;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.id = "dynamic-favicon";
      newFavicon.rel = "icon";
      newFavicon.href = logo;
      document.head.appendChild(newFavicon);
    }
  }, [logo]);

  return null;
};

export default Favicon;
