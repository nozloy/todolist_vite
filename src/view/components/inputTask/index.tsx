import React, { useCallback, useState } from "react";
import styles from './index.module.scss';

interface InputTaskProps {
    onAdd: (title: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    onAdd, }) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue])
    return (
        <div className={styles.inputTask} >
            <input type="text"
                className={styles.inputTaskValue}
                value={inputValue}
                onChange={(evt) => { setInputValue(evt.target.value) }}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder='Пиши сюда...'/>
            <button
                onClick={addTask}
                aria-label="add"
                className={styles.inputTaskButton}
            />
        </div>
    )
}