import { ITask } from "@/types/task";
import Task from "./Task";

interface TodolistProps {
  task: ITask[];
}

const ToDoList: React.FC<TodolistProps> = ({ task }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="table bg-gray-800 p-5 text-cyan-50">
        <thead>
          <tr className="">
            <th></th>
            <th className="text-xl text-cyan-50">Task</th>
            <th className="text-xl text-cyan-50 basis-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {task.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
