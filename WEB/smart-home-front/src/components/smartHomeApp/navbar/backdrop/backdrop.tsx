import styles from './backdrop.module.css'

type Props = {
    show: boolean;
    clicked: () => void;
}

const Backdrop: React.FC<Props> = ({ show, clicked }) => {
    return (
        show ? <div
            onClick={clicked}
            className={styles.Backdrop}>
        </div> : null);
}

export default Backdrop;