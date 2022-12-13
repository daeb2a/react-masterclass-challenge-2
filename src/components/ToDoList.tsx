import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import CreateCategory from "./CreateCategory";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <hr />
    </div>
  );
}
export default ToDoList;