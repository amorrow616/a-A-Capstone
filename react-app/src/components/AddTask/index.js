import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import CreateHabit from "../CreateHabit";
import CreateDaily from "../CreateDaily";
import OpenModalButton from '../OpenModalButton';
import { HiPlus } from "react-icons/hi";
import { VscCalendar } from "react-icons/vsc";
import { PiPlusMinus } from "react-icons/pi";
import './AddTask.css';

export default function AddTask() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const user = useSelector((state) => state.session.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        console.log('menu opened')
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "addtask-dropdown" + (showMenu ? "" : "-hidden");
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            <button onClick={openMenu} id="addTaskButton"><HiPlus id="plusSign" />Add Task</button>
            <ul className={ulClassName} ref={ulRef}>
                <OpenModalButton
                    modalComponent={<CreateHabit />}
                    buttonText={<>
                        <PiPlusMinus />
                        Habit
                    </>}
                    onItemClick={closeMenu}
                    className="addTaskDropdownItems"
                />
                <OpenModalButton
                    modalComponent={<CreateDaily />}
                    buttonText={<>
                        <VscCalendar />
                        Daily
                    </>}
                    onItemClick={closeMenu}
                    className="addTaskDropdownItems"
                />
            </ul>
        </>
    )
}
