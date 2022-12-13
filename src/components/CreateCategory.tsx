import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryState, categoriesState } from "../atoms";

interface ICategories {
  category: string;
}

function CreateCategory() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const { register, handleSubmit } = useForm<ICategories>();
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onValid = (data: ICategories) => {
    if(categories.includes(data.category)) return;
    setCategories([
      data.category,
      ...categories,
    ]);
  }
  return (
    <div>
      <select value={category} onInput={onInput}>
        {categories.map((item) => 
          <option key={item} value={item}>{item}</option>  
        )}
      </select>
      <form onSubmit={handleSubmit(onValid)}>
          <input {...register("category", {
              
          })} 
            placeholder="please write categories"
          />
          <button>+</button>
      </form>
    </div>
  );
}
export default CreateCategory;