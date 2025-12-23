import Sidebar from "../widgets/sidebar/sidebar.tsx";
import {sidebarMenu} from "../shared/config/sidebarMenu.ts";
import {Suspense} from "react";
import "./App.scss";
import {AppRouter} from "./providers/router";

function App() {
  return (
    <div className={"app"}>
        <Suspense fallback="">
            <Sidebar menu={sidebarMenu} />
            <div className="content-page">
                <AppRouter/>
            </div>
        </Suspense>
    </div>
  )
}

export default App
