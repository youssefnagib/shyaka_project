import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const initLandbot = () => {
      let myLandbot;
      if (!myLandbot) {
        const s = document.createElement("script");
        s.type = "module";
        s.async = true;
        s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

        s.addEventListener("load", () => {
          myLandbot = new window.Landbot.Popup({
            configUrl: "https://storage.googleapis.com/landbot.online/v3/H-2730860-4RV5DJD3LNZ0G05T/index.json",
          });
        });

        document.body.appendChild(s);
      }
    };

    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return null; // No visible output; the chatbot is a popup
};

export default Chatbot;
