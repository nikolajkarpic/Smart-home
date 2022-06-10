import HomeIcon from '@mui/icons-material/Home';
import { border } from '@mui/system';
import styles from './logo.module.css'

export const Logo: React.FC<{}> = () => {
    return (
        <div className={styles.main}>
            <h6 className={styles.text}>smart</h6>
            <HomeIcon htmlColor='white' />
        </div >)
}