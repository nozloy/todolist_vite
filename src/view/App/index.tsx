import React from "react";
import styles from './index.module.scss';
import { useToDoStore } from '../../data/stores/toDoStore';
import { InputTask } from "../components/inputTask";
import { ShowTask } from "../components/showTask";

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ])
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>to DO[й]</h1>
            <InputTask onAdd={(title) => { if (title) { createTask(title) } }} />
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>Здесь нет дройдов, которых вы ищете (с)</p>
                )}
                {tasks.map((task) => (
                  <ShowTask
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  onDone={removeTask}
                  onEdited={updateTask}
                  onRemoved={removeTask}
                  /> 
                ))}
            </section>
            <section className={styles.articleSection}></section>
        </article>
    );
}