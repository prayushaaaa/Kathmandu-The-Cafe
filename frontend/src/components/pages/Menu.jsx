import { Separator } from "../ui/separator";

function Menu() {
  return (
    <>
      <div className="columns-1 p-10 w-full">
        <h1 className="text-3xl uppercase font-semibold font-mono text-amber-900">
          Menu Items (Food)
        </h1>
        <Separator className="w-full mt-3 border-gray-200 border-1" />
        <h1>Here you can manage your Menu!</h1>
      </div>
    </>
  );
}

export default Menu;
