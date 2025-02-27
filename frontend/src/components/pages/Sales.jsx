import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import AddSaleForm from "../AddSaleForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Sales() {
  return (
    <>
      <div className="columns-1 p-10 w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl uppercase font-semibold font-mono text-amber-900">
            Sales
          </h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="default">Add Sales</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log a sale record.</DialogTitle>
                <DialogDescription>
                  <AddSaleForm />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="Submit"> Add </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="w-full mt-3 border-gray-200 border-1" />
        <div className="mt-3">
          <h1>Hello</h1>
        </div>
      </div>
    </>
  );
}

export default Sales;
