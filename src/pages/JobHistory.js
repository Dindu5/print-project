import { useContext } from "react";
import CardTable from "../components/CardTable.js";
import { PrintOrderContext } from "../context/PrintOrderContext";

export default function Jobhistory() {
  const { printOrders } = useContext(PrintOrderContext);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable printOrders={printOrders} />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
