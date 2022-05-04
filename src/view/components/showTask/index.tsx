import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from './index.module.scss';

interface ShowTaskProps {
    onEdited: (id: string, title: string) => void;
    onDone: (id: string) => void;
    onRemoved: (id: string) => void;
    id: string;
    title: string;

}

export const ShowTask: React.FC<ShowTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved }) => {
    const [cheked, setCheked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        editTitleInputRef?.current?.focus();
    },[isEditMode])

    return (
        <div className={styles.showTask} >
            <label className={styles.showTaskLabel}>
                <input
                    type="checkbox"
                    checked={cheked}
                    disabled={isEditMode}
                    className={styles.showTaskCheckbox}
                    onChange={(evt) => {
                        setCheked(evt.target.checked);
                        if (evt.target.checked) { onDone(id) }
                    }} />
                {isEditMode ? (<input
                    value={value}
                    ref={editTitleInputRef}
                    onChange={(evt) => {
                        setValue(evt.target.value)
                    }}
                    onKeyDown={(evt) =>{
                      if (evt.key === 'Enter')  {
                        onEdited(id, value);
                        setIsEditMode(false);
                      }
                    }}
                    className={styles.showTaskTitleEdit}
                />) : (<h3 className={styles.showTaskTitle}>{title}</h3>)}
            </label>
            {isEditMode ? (<button
                aria-label="Сохранить"
                className={styles.showTaskSave}
                onClick={() => {
                    onEdited(id, value);
                    setIsEditMode(false);
                }} />) : (<button
                    aria-label="Править"
                    className={styles.showTaskEdit}
                    onClick={() => {
                        setIsEditMode(true);
                    }} />)}

            <button
                aria-label="Удалить"
                className={styles.showTaskRemove}
                onClick={() => { onRemoved(id) }} />
        </div>
    )
}