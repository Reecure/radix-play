import Sidebar from "./widgets/sidebar/sidebar.tsx";
import {sidebarMenu} from "./shared/config/sidebarMenu.ts";

function App() {
  return (
    <>
        <Sidebar menu={sidebarMenu} />
    </>
  )
}

export default App
