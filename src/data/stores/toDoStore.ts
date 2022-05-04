import create from 'zustand'
import { generateId } from '../helpers'

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: '13',
            title: 'Default Task',
            createdAt: 40522,
        },
        {
            id: '14',
            title: 'Default Task 2',
            createdAt: 50522,
        }
    ],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        if(confirm('Точно удалить?')) {
            set({
                tasks: tasks.filter((task) => task.id !== id)
            });   
        }

    },
}))