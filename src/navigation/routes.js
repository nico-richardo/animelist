import HomePage from "../pages/HomePage";
import { Route } from 'react-router-dom';
import CollectionPage from "../pages/CollectionPage";

const routes = [
    {
        element: <HomePage/>,
        menuTitle: 'Shows',
        path: '/',
        exact: true,
        isMenu: true
    },
    {
        element: <CollectionPage/>,
        menuTitle: 'My Collection',
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