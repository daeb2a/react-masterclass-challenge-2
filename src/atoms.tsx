import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({});

/* export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
} */

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: "예정",
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["진행", "완료", "예정"],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});