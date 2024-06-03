import styles from './Button.module.css';

import { ButtonProps } from './Button.props';

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
    className={styles["action-button"]}
      {...props}
    >
      {children}
    </button>
  );
}

