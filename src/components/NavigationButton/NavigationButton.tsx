import cn from "classnames";

import styles from "./NavigationButton.module.css";
import { ButtonProps } from "./NavigationButton.props";

function NavigationButton({
  children,
  className,
  appearance,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles["button"], className, {
        [styles["red"]]: appearance === "red",
        [styles["blue"]]: appearance === "blue",
        [styles["green"]]: appearance === "green",
        [styles["black"]]: appearance === "black",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default NavigationButton;
