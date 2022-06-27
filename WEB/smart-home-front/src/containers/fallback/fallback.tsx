import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './fallback.module.css';

const Fallback: React.FC<{ error: Error }> = ({ error }) => {
    const navigator = useNavigate();

    useEffect(() => {
        console.log(error.message)
        if (error.message == 'Unauthorized') {
            console.log('usao')
            navigator('/signin');
        }
    }, [error])

    return (
        <div>
            {error.message == 'Unauthorized' ?
                <Navigate to='/signin' /> : null}
        </div>
    );
}

export default Fallback;