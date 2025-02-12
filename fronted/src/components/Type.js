import React from "react";
import Typed from "typed.js";

function Type() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Order", "Eat", "Sleep", "Repeat"],
      typeSpeed: 130,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      <span
        className="mb-6 max-w-lg text-3xl font-bold leading-snug tracking-tight text-white sm:text-7xl sm:leading-snug"
        ref={el}
      />
    </div>
  );
}

export default Type;
