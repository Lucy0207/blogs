import styles from './NavigationButton.module.css';
import { ButtonProps } from './NavigationButton.props';
import cn from "classnames"



function NavigationButton({children, className, appearance = 'small', ...props}: ButtonProps) {

	
	return (
		<button   
			
			className={cn(styles['button'], className, {
				[styles['small']] : appearance === 'small',
				[styles['big']] : appearance === 'big',
				[styles['medium']] : appearance === 'medium',
			})} {...props}>
			{children}
		</button>);
}

export default NavigationButton;