import { useState, useEffect, useRef } from 'react';
import CreateHabit from "../CreateHabit";
import CreateDaily from "../CreateDaily";
import CreateTodo from '../CreateTodo';
import CreateReward from '../CreateReward';
import OpenModalButton from '../OpenModalButton';
import { HiPlus } from "react-icons/hi";
import { VscCalendar } from "react-icons/vsc";
import { PiPlusMinus } from "react-icons/pi";
import { IoCheckboxOutline } from "react-icons/io5";
import { GiChest } from "react-icons/gi";
import './AddTask.css';

export default function AddTask() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
                <li>
                    <OpenModalButton
                        modalComponent={<CreateHabit />}
                        buttonText={<>
                            <PiPlusMinus />
                            Habit
                        </>}
                        onItemClick={closeMenu}
                        className="addTaskDropdownItems"
                    />
                </li>
                <li>
                    <OpenModalButton
                        modalComponent={<CreateDaily />}
                        buttonText={<>
                            <VscCalendar />
                            Daily
                        </>}
                        onItemClick={closeMenu}
                        className="addTaskDropdownItems"
                    />
                </li>
                <li>
                    <OpenModalButton
                        modalComponent={<CreateTodo />}
                        buttonText={<>
                            <IoCheckboxOutline />
                            To Do
                        </>}
                        onItemClick={closeMenu}
                        className="addTaskDropdownItems"
                    />
                </li>
                <li>
                    <OpenModalButton
                        modalComponent={<CreateReward />}
                        buttonText={<>
                            <GiChest />
                            Reward
                        </>}
                        onItemClick={closeMenu}
                        className="addTaskDropdownItems"
                    />
                </li>
            </ul>
        </>
    )
}
