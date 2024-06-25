import styles from "./Headling.module.css";
import { HeadlingProps } from "./Headling.props";

const Headling = ({ children, ...props }: HeadlingProps) => {
  return (
    <p {...props} className={styles["heading"]}>
      {children}
    </p>
  );
};

export default Headling;
