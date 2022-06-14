import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import RecipePreviewsComponent from './features/previews/components/recipe-previews.component';
import RecipeComponent from './features/recipes/components/recipe.component';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="counter" element={<Counter />} />
            <Route path="recipes" element={<RecipePreviewsComponent />}>
                
            </Route>
            <Route path="recipes/:slug" element={<RecipeComponent />} />
            <Route path="*" element={
              <main>
                <p>Bit weird gone wrong mate! Doh! </p>
              </main>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
