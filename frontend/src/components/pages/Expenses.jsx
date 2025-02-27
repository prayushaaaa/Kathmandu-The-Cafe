import { Separator } from "../ui/separator";

function Expenses() {
  return (
    <>
      <div className="columns-1 p-10 w-full">
        <h1 className="text-3xl uppercase font-semibold font-mono text-amber-900">
          Expenses
        </h1>
        <Separator className="w-full mt-3 border-gray-200 border-1" />
        <h1>Here you can log your expenses!</h1>
      </div>
    </>
  );
}

export default Expenses;
