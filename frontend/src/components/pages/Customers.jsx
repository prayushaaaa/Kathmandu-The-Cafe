import { Separator } from "../ui/separator";

function Customers() {
  return (
    <>
      <div className="columns-1 p-10 w-full">
        <h1 className="text-3xl uppercase font-semibold font-mono text-amber-900">
          Customers
        </h1>
        <Separator className="w-full mt-3 border-gray-200 border-1" />
        <h1>Here you can view who are your customers!</h1>
      </div>
    </>
  );
}

export default Customers;
