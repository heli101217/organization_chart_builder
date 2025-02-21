import { OrgChart } from "@/components/OrgChart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      <div className="p-4">
        <DndProvider backend={HTML5Backend}>
          <OrgChart />
        </DndProvider>
        <ToastContainer />
      </div>
    </Providers>
  );
}

export default App;
