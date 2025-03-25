// useDebounce hook

import { useEffect, useState } from 'react';  

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() =>{
    const timerId = setTimeout(() =>{
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  },[value, delay]);

  return debouncedValue;
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 500 milliseconds debounce delay

  // Use the debouncedValue in your component logic, e.g., trigger a search API call via a useEffect

  return <>

    <h1>Debounced value: {debouncedValue}</h1>

    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  </>;
};

export default SearchBar;

// useInterval hook

// import { useEffect, useState } from 'react';

// function useInterval(callback, delay) {
//   useEffect(() => {
//     const interval = setInterval(callback, delay);
//     return () => clearInterval(interval);
//   }, [callback, delay]);

// }

// function App() {
//   const [count, setCount] = useState(0);

//   useInterval(() => {
//     setCount(count + 1);
//   }, 1000);

//   return <div>Timer is at {count}</div>
// }

// export default App


//useMousePosition hook

// import { useEffect, useState } from 'react';

// function useMousePosition() {
//   const [position, setPosition] = useState({ x: 0, y: 0 }); 

//   const handleMouseMove = (e) => {
//     setPosition({
//       x: e.clientX,
//       y: e.clientY
//     });
//   }

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     }
//   },[]);


// return position;
// }
// function App() {
//   const mousePosition = useMousePosition();

//   return <>
//     Your mouse position is {mousePosition.x} {mousePosition.y}
//   </>
// }

// export default App
// useIsOnline hook

// import { useEffect, useState } from 'react';

// function useIsOnline() {
//   const [isOnline, setIsOnline] = useState(window.navigator.onLine);

//   useEffect(() => {
//     window.addEventListener('online', () => setIsOnline(true));
//     window.addEventListener('offline', () => setIsOnline(false));
//   },[])

//   return isOnline;
// }

// function App(){
//   const isOnline = useIsOnline();

//   return <>
//     {isOnline?'You are online':'You are offline'}
//   </>
// }

// export default App


// Data fetching hook

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// function useTodos(n){
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//   const value = setInterval(() =>{
//       axios.get("https://dummyjson.com/todos")
//         .then(res => {
//           setTodos(res.data.todos);
//           setLoading(false);
//         })
//     }, n*1000)

//     axios.get("https://dummyjson.com/todos")
//         .then(res => {
//           setTodos(res.data.todos);
//           setLoading(false);
//         })
      
//     return () => {
//       clearInterval(value);
//     }

//   },[n])

//   return {todos, loading};
// }

// function App() {
//   const {todos, loading} = useTodos(10);
  
//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <>
//       {todos.map(todo => <Track todo={todo} />)}
//     </>
//   )
// }

// function Track({ todo }) {
//   return <div>
//     {todo.todo}
//     <br />
//     {todo.completed}
//   </div>
// }

// export default App

// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import React from 'react';

// function App() {
  
//   const [render, setRender] = useState(true);

//   useEffect(() =>{
//     setInterval(() =>{
//       setRender(render => !render) ;
//     }, 5000)
//   },[]);

//   return (
//     <>
//       {render ? <MyComponent /> : null}
//     </>
//   )
// }


// class MyComponent extends React.Component {
//   componentDidMount() {
//     // Perform setup or data fetching here
//     console.log('Component mounted');
//   }

//   componentWillUnmount() {
//     // Clean up (e.g., remove event listeners or cancel subscriptions)
//     console.log('Component unmounted');
//   }

//   render() {
//     // Render UI
//     return <div>Inside MyComponent</div>
//   }
// }

// function MyComponent(){
//   useEffect(() => {
//     console.log('Component mounted')
//     return () => {
//       console.log('Component unmounted')
//     }
//   }, []);

//   return <div>
//     Inside MyComponent
//   </div>

// }

// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }

//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 });
//   }

//   render() {
//     return (
//       <div>
//         <p>{this.state.count}</p>
//         <button onClick={this.incrementCount}>Increment</button>
//       </div>
//     );
//   }
// }


// function MyComponent() {
//   const [count, setCount] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   );
// }

