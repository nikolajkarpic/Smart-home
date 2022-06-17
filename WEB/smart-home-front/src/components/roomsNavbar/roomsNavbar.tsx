import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from "react"
import { Room, AddRoomDto } from "../../global/types";
import { CreateRoom, DeleteRoom } from "../../api";
import styles from './roomsNavbar.module.css'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


type Props = {
    smartHomeId: number;
    rooms: Array<Room>;
    getRoomId: (arg0: string) => void;
}

const RoomsNavbar: React.FC<Props> = ({ rooms, getRoomId, smartHomeId }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedRoom, setSelectedRoom] = useState<string>('all')
    const [addRoomDto, setAddRoomDto] = useState<AddRoomDto>({
        name: '',
    });
    const [addRoom, setAddRoom] = useState<boolean>(false);


    const createRoom = () => {
        CreateRoom(smartHomeId, addRoomDto).then((response) => {
            setAddRoom(false)
            console.log(response);
        }).catch((error) => {
            console.log(error);

        })
    }

    useEffect(() => {
        if (addRoom) {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }
    }, [addRoom])

    const deleteRoom = () => {
        DeleteRoom(smartHomeId, parseInt(selectedRoom)).then((response) => {
            setAddRoom(false)
            console.log(response);
        }).catch((error) => {
            console.log(error);

        })
    }

    const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const formKey = id as keyof AddRoomDto;
        const updatedText = { ...addRoomDto };
        updatedText[formKey] = value;
        setAddRoomDto(updatedText);
    }

    useEffect(() => {
        getRoomId(selectedRoom)
    }, [selectedRoom])



    let roomButtons = rooms.map(({ id, name }, i) => (
        <button
            className={id.toString() === selectedRoom ? styles.selectedButton : styles.roomsButtons}
            key={i}
            onClick={() => { setSelectedRoom(id.toString()) }}
            id={id.toString()}
        >
            {name}
        </button >
    ))

    return (
        <div className={styles.navbar}>
            <div className={styles.rooms}>
                <div className={styles.allDiv}>
                    <button
                        className={'all' === selectedRoom ? styles.selectedButton : styles.roomsButtons}
                        onClick={() => { setSelectedRoom('all') }}>
                        All
                    </button>

                </div>
                <div className={styles.roomsWithAdd}>


                    {roomButtons}
                    {addRoom ?
                        <div className={styles.inputWithButton}>
                            <input
                                ref={inputRef}
                                onChange={updateInput}
                                value={addRoomDto.name}
                                id='name'
                                type='text'
                                placeholder="room name">
                            </input>
                            <DoneIcon
                                onClick={createRoom}
                                className={styles.iconOk}
                                color='inherit'
                                sx={
                                    {
                                        padding: '2px',
                                        margin: '0',
                                        marginLeft: '8px',
                                        alignSelf: 'center',
                                        justifySelf: 'center'
                                    }
                                } fontSize="inherit" />

                            <CloseIcon
                                onClick={() => setAddRoom(false)}
                                className={styles.iconClose}
                                color='inherit'
                                fontSize='inherit'
                                sx={
                                    {
                                        padding: '2px',
                                        margin: '0',
                                        marginLeft: '8px',
                                        alignSelf: 'center',
                                        justifySelf: 'center'
                                    }
                                } />

                        </div>
                        : null}

                </div>
            </div>
            <div>

                {selectedRoom !== 'all' ?
                    <button
                        onClick={deleteRoom}
                        className={styles.roomsButtons}>
                        <DeleteOutlineRoundedIcon color="inherit" />
                    </button> :
                    null}
                <button
                    onClick={() => setAddRoom(true)}
                    className={styles.roomsButtons}>
                    <AddIcon color="inherit" />
                </button>
            </div>
        </div>
    )
}

export default RoomsNavbar;