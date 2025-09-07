import axios from "axios";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useAppForm } from "./components/form/form";

const catFormSchema = z.object({
  id: z.number().min(0),
  name: z.string().min(1, "Name is required"),
});

function App() {
  const newCatForm = useAppForm({
    defaultValues: {
      id: 1,
      name: "",
    },
    validators: {
      onChange: catFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-xl">Cat CRUD App</h1>

      <form
        className="flex flex-row gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          newCatForm.handleSubmit();
        }}
      >
        <newCatForm.AppField name="id">{(field) => <field.TextField label="ID:" />}</newCatForm.AppField>
        <newCatForm.AppField name="name">{(field) => <field.TextField label="Name:" />}</newCatForm.AppField>
      </form>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <CatsTable />
      </div>
    </main>
  );
}

const CatsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cats"],
    queryFn: async () => {
      const res = await axios.get("/cats");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <table className="table-auto border border-gray-300 w-full">
      <thead>
        <tr className="text-left border-b border-gray-300">
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {data.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
