import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Registration } from './pages/Registration';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import ContactUs from './pages/Contact';
import { About } from './pages/About';



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/registration",
        element: <Registration/>
      },
      {
        path:"/admin",
        element: <AdminPanel/>
      },
      {
        path:"/admin-login",
        element: <AdminLogin/>
      },
      {
        path:"/contact",
        element: <ContactUs/>
      },
      {
        path:"/about",
        element: <About/>
      }
    ]
  }
])

export const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}
