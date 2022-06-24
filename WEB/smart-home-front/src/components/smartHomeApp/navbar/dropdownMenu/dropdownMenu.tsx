
import DropdownItem from './dropdownItem/dropdownItem';
import styles from './dropdownMenu.module.css'

type Props = {
    children: React.ReactNode;
}

const DropdownMenu: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.dropdown}>
            <DropdownItem>
                {children}
            </DropdownItem>
        </div>)
}
export default DropdownMenu;