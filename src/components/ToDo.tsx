import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";

const Button = styled.button`
  color: red;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  }
  const removeToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  }
  const categories = useRecoilValue(categoriesState);
  return (
    <li>
      <span>{text}</span>
      {categories.map((current) =>
        current !== category 
        ? <button key={current} name={current} onClick={onClick}>{current}</button> 
        : ""
      )}
      <Button name="remove" onClick={removeToDo}>
        삭제
      </Button>
    </li>
  );
}

export default ToDo;