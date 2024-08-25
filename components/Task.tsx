"use client";

import { ITask } from "@/types/task";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [doneTask, setDoneTask] = useState(false);
  const [emptyEditTask, setEmptyEditTask] = useState<boolean>(false);

  const handleEditSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (taskToEdit.trim() === "") {
      setEmptyEditTask(true);
      return;
    }
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");
    setOpenEditModal(false);
    setDoneTask(false);
    setEmptyEditTask(false);
    router.refresh();
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setOpenDeleteModal(false);
    router.refresh();
  };

  const handleDoneTask = () => {
    setDoneTask(!doneTask);
  };

  return (
    <tr className="hover" key={task.id}>
      <td>
        <input
          className="checkbox"
          type="checkbox"
          checked={doneTask}
          onChange={handleDoneTask}
        />
      </td>
      <td
      className="text-pretty"
        style={{
          textDecoration: doneTask ? "line-through" : "none",
          opacity: doneTask ? 0.8 : 1,
        }}
      >
        {task.text}
      </td>
      <td className="flex justify-around">
        <div className="tooltip" data-tip="edit">
          <AiFillEdit
            className="text-blue-600 cursor-pointer hover:scale-110"
            onClick={() => setOpenEditModal(true)}
            size={18}
          />
        </div>
        <Modal modalOpen={openEditModal} setModalOpen={setOpenEditModal}>
          <form onSubmit={handleEditSubmitTodo}>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Edit your task ...</span>
              </div>
              <div className="flex gap-2 tooltop" tooltip-warning>
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  autoFocus={true}
                  className={`input input-bordered w-full max-w-xl ${emptyEditTask ? 'border-red-600' : ''}`}
                />
                {taskToEdit.trim() === "" && !emptyEditTask && (
                  <div className="flex gap-2 tooltip">
                    You must enter a task!
                  </div>
                )}
                <button type="submit" className={`btn btn-secondary ${emptyEditTask ? `bg-red-500 hover:bg-red-900` : ''}`}>
                  submit
                </button>
              </div>
            </label>
          </form>
        </Modal>
        <div className="tooltip" data-tip="delete">
          <AiFillDelete
            className="text-red-600 cursor-pointer hover:scale-110"
            onClick={() => setOpenDeleteModal(true)}
            size={18}
          />
        </div>
          <Modal modalOpen={openDeleteModal} setModalOpen={setOpenDeleteModal}>
            <h3 className="text-lg">
              Are your sure you want to delete this task?
            </h3>
            <div>
              <button className="btn" onClick={() => handleDeleteTodo(task.id)}>
                Yes
              </button>
            </div>
          </Modal>
      </td>
      <td>

      </td>
    </tr>
  );
};

export default Task;
