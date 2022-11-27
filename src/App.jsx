import { useState } from 'react'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './firebaseConfig'

let title = "";
function App() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("")

  const inputEmailHandler = (event) =>{
    setEmail(event.target.value);
  }
  const inputPassHandler = (event) =>{
    setPassword(event.target.value);
  }



  const createUser = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setTitle(`User has been created with this ${user.email} successfully`);
    setEmail("");
    setPassword("");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setTitle(`${errorMessage}`);
  });

}

  const loginUser = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setTitle(`User has been login with this ${user.email} successfully`);
    setEmail("");
    setPassword("");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setTitle(`${errorMessage}`);
  });
  
  }
  return (
    <div className="App h-full flex justify-center p-4">
      <div className='w-80 m-5 h-full border-black border-2 rounded-2xl px-2 py-8'>
        <form action="" className='flex align-middle justify-center flex-col h-full px-1 pt-2 w-full'>
        <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-1 my-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="email" placeholder='Enter your Email...' name='email' value={email} onChange={inputEmailHandler}/>
        <input className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-1 my-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="password" placeholder='Enter your Password...' name='password' value={password} onChange={inputPassHandler}/>
          <div className="flex justify-around my-5">
            <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" type="submit" onClick={createUser}>Sign Up</button>
            <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" type="submit" onClick={loginUser}>Sign In</button>
          </div>
        </form>
        <div className="mt-5 text-left h-10">
          <h3>Result: {title}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
