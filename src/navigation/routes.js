import HomePage from "../pages/HomePage";
import { Route } from 'react-router-dom';
import CollectionPage from "../pages/CollectionPage";
import ShowDetailPage from "../pages/ShowDetailPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";

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
        menuTitle: 'My Collections',
        path: '/collections',
        isMenu: true
    },
    {
        element: <ShowDetailPage/>,
        path: '/show-detail',
        isMenu: false
    },
    {
        element: <CollectionDetailPage/>,
        path: '/collection-detail',
        isMenu: false
    }
];

export const routeComponent = routes.map((value, index) => {
  return <Route
    key={"menu" + index}
    {...value}
  />
})


export default routes