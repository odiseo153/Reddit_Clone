import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './Main';
import { AppProvider } from './PageContainer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
     <AppProvider >
        <Main />
     </AppProvider>
    </React.StrictMode>
);

