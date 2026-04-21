import { useState,useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLenght] = useState(8)
  const [ numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(function(){
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+|}{?/><.,;:[]`~"
    }

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      console.log(char)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numAllowed,charAllowed])

  //useEffect 
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed,passwordGenerator])

  //useRef
  const passwordRef = useRef(null)

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])


return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    
    <div className="w-full max-w-lg bg-white/90 backdrop-blur rounded-2xl shadow-md border border-slate-200 p-6">

  
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">
          Password Generator
        </h1>
        <p className="text-sm text-slate-500">
          Generate secure passwords instantly
        </p>
      </div>

  
      <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden mb-5">
        <input 
          type="text"
          value={password}
          className="w-full px-4 py-2 bg-transparent text-slate-700 outline-none"
          placeholder="Your password..."
          readOnly
          ref={passwordRef}
        />
        <button 
          onClick={copyPassword}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 transition"
        >
          Copy
        </button>
      </div>

   
      <div className="space-y-5">

     
        <div className="p-4 border border-slate-200 rounded-xl bg-white">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Length</span>
            <span className="text-sm text-slate-500">{length}</span>
          </div>
          <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className="w-full accent-blue-500 cursor-pointer"
            onChange={(e) => setLenght(e.target.value)}
          />
        </div>


        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Numbers</span>
            <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              className="accent-blue-500 w-4 h-4"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Symbols</span>
            <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              className="accent-blue-500 w-4 h-4"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>

        </div>

      </div>

    </div>
  </div>
)
}

export default App
