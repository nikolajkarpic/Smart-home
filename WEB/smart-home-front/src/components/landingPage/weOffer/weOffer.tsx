import { OfferedService } from './offeredService/offeredService'
import styles from './weOffer.module.css'
import img from '../../../assets/images/5f975b5d-o-consultancy-services_0cs07n0cs07n000000001.png'
import { useRef } from 'react'



export const WeOffer: React.FC<{}> = () => {
    const divRef = useRef(null)

    return (
        <div className={styles.mainWindow}>
            <OfferedService
                title='exp'
                subTitle='how we do'
                text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!'
                inverse={false}
                image={<img src={img} style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'objectFit': 'contain' }} />} />
            <OfferedService
                title='exp'
                subTitle='how we do'
                text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!'
                inverse={true}
                image={<img src={img} style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'objectFit': 'contain' }} />} />

            <OfferedService
                title='exp'
                subTitle='how we do'
                text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!'
                inverse={false}
                image={<img src={img} style={{ 'maxWidth': '100%', 'maxHeight': '100%', 'objectFit': 'contain' }} />} />


            {/* <OfferedService title='exp' subTitle='how we do' text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!' inverse={false} image={<img src={img} />} />
            <OfferedService title='exp' subTitle='how we do' text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!' inverse={false} image={<img src={img} />} />
            <OfferedService title='exp' subTitle='how we do' text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, tempore!' inverse={false} image={<img src={img} />} /> */}

        </div>
    )
}
