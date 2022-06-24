import Home from "../pages/Home";
import { Route } from 'react-router-dom';

const routes = [
    {
        element: <Home/>,
        menuTitle: 'Shows',
        path: '/',
        exact: true,
        isMenu: true
    },
    {
        element: <Home/>,
        menuTitle: 'Collection',
        path: '/collection',
        isMenu: true
    }
];

export const routeComponent = routes.map((value, index) => {
  return <Route
    key={"menu" + index}
    {...value}
  />
})


export default routes