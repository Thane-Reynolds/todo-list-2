import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todos from './Pages/Todos'
import TodoDetail from './Pages/TodoDetail'
import Location from './Pages/Location'
import Categories from './Pages/Categories'
import styled from 'styled-components'
import "@fontsource/raleway"
import "@fontsource/ubuntu"
import "./vars.css"

//Styled components
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 10px 0 0 0;
  box-sizing: border-box;
  background-color: black;
  color: aquamarine;
  font-family:"Raleway";
  min-height: 100vh;
  min-width: 100vw;
  gap: 10px;
`;

function App() {
  

  return (
    <Wrapper>
      <h1> To-Do app in progress</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Todos/> } />
          <Route path='tododetails' element={<TodoDetail />} />
          <Route path='location' element={<Location />} />
          <Route path='category' element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  )
}

export default App
