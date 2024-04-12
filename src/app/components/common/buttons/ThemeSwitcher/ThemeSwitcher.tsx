import { DarkModeSwitch } from "react-toggle-dark-mode";
import cn from "clsx";
import { ThemeEnum } from "./theme.types";
import { useTheme } from './ThemeContext';

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcherComponent = ({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={cn(className)}>
			<DarkModeSwitch
				checked={theme === ThemeEnum.dark}
				onChange={toggleTheme}
				size={22}
				moonColor="#f3f4f6"
				sunColor="#2f343b"
			/>
		</div>
	);
};

export default ThemeSwitcherComponent;
