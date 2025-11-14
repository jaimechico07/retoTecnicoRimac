import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/seguro_salud_flexible/Seguro_salud_flexible";
import PlanesCotizacion from "./pages/planes/Planes_cotizacion";
import Resumen from "./pages/resumen/Resumen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/plans",
    element: <PlanesCotizacion />,
  },
  {
    path: "/resume",
    element: <Resumen />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
