"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { uuid } from 'uuidv4';

const Addtask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuid(),
      text: newTask,
    });
    setNewTask("");
    setModalOpen(false); 
    router.refresh();
  };

  return (
    <div>
      <button
        className="btn btn-primary w-30"
        onClick={() => setModalOpen(true)}
      >
        <p>Add Task</p>
        <AiOutlinePlus size={18} className="text-[#F6F7EB]" />
      </button>
      {modalOpen && (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Add your task here ...</span>
              </div>
              <div className="flex gap-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  autoFocus={true}
                  className="input input-bordered w-full max-w-xl"
                />
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </label>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Addtask;
