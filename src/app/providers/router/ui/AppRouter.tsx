import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from "../../../../shared/config/routerConfig/routerConfig.tsx";

const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({element, path}) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={<div>Loading...</div>}>
                        {element}
                    </Suspense>
                )}
            />
        ))}
    </Routes>
);

export default AppRouter;
