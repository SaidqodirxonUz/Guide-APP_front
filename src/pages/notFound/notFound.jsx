import { useEffect } from "react";
import gsap from "gsap";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1 } });

    timeline
      .fromTo(
        ".search",
        { x: "-200px", y: "100px", opacity: 0 },
        {
          x: "200px",
          y: "-100px",
          rotate: 40,
          opacity: 1,
          yoyo: true,
        }
      )
      .to("h1", { y: "0", ease: "bounce", opacity: 1 })
      .to(".search", { x: "0", y: "0", rotate: 0, ease: "bounce" })
      .fromTo("h2", { opacity: 0 }, { opacity: 1, delay: 0.2 });
  }, []);

  const containerStyle = {
    textAlign: "center",
  };

  const h1Style = {
    fontSize: "clamp(10vw, 20vw, 300px)",
    opacity: 0,
    transform: "translateY(-100vh)",
  };

  const h2Style = {
    fontSize: "clamp(3vw, 7vw, 100px)",
    color: "transparent",
    textShadow:
      "2px 2px 0 red, -2px -2px 0 green, 6px 0 0 violet, -6px 0 0 yellow, 0 -6px 0 aqua, 0 6px 0 yellowgreen",
  };

  return (
    <body>
      <main>
        <div style={containerStyle}>
          <AiOutlineSearch
            className="material-symbols-outlined search "
            style={{ fontSize: "10rem" }}
          />
          <h1 style={h1Style}>404</h1>
          <h2 style={h2Style}>Not Found</h2>
          <Link style={{ fontSize: "2em", textDecoration: "none" }} to={"/"}>
            Main Page
          </Link>
        </div>
      </main>
    </body>
  );
}

export default NotFound;
