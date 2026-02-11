import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {CowbookApp} from './CowbookApp.tsx'
import {ResultsPage} from "./ResultsPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <CowbookApp></CowbookApp>
    },{path: '/results-video',
        element: <ResultsPage/>}
]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
