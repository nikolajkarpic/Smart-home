
import styles from './dropdownItem.module.css'

type Props = {
    children: React.ReactNode;
}


const DropdownItem: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.item}>
            {children}
        </div>
    )
}

export default DropdownItem