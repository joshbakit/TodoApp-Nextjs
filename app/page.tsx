import { getAllTodos } from "@/api";
import Addtask from "@/components/Addtask";
import Footer from "@/components/Footer";
import ToDoList from "@/components/ToDoList";


export default async function Home() { 
  const task = await getAllTodos()
  
  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <div className=" flex flex-row items-center gap-5 text-center max-w-7xl">
        <h1 className="text-3xl md:text-4xl xl:text-6xl text-[#F6F7EB] font-bold">To Do App</h1>
        <Addtask />
      </div>
      <ToDoList task={task}/>
      <Footer/>
    </main>
  );
}
