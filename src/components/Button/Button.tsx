import React from "react";

const Button = ({
  text,
  color,
  onButtonClick,
  shape = "round",
  className
}: {
  text: string;
  color: string;
  onButtonClick: () => void;
  shape?: "round" | "solid";
  className?: string
}) => {
  return (
    <div className="buttonContainer">
    <button
      type="button"
      tabIndex={0}
      className={shape === "round" ? "commonButton" : `className  commonButtonSolid`}
      onKeyDown={(event) => {
        console.log("event", event);

        if (event.code === "Enter" || event.code === "NumpadEnter") {
          onButtonClick();
        }
      }}
      style={{ background: color, padding: '10px 20px' }}
      onClick={onButtonClick}
    >
      {text}
    </button>
    </div>
  );
};

export default Button;
