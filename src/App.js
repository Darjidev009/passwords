import {useState, useCallback, useEffect ,useRef} from 'react'
import './App.css';

function App() {

  const [length, setLength] = useState(8)
  const [ numAllow, setNumAllow] = useState(false);
  const[charAllow,setCharAllow] = useState(false);
  const[password,setPassword] = useState("")

  //refhooks
  const passwordref =useRef(null)

  //end
  const PasswordGenerator = useCallback( () => {

let pass =""
let str ="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz"

if(numAllow) str +="0123456789"
if(charAllow) str +="!@#$%^&*()?:;"

for (let i = 1; i <= length; i++) {
 let char = Math.floor(Math.random() * str.length + 1)
pass += str.charAt(char)

}

setPassword(pass)

  }, [length, numAllow, charAllow, setPassword])


  const copypassclip = useCallback(() => {
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,8); // this is only selection range
    window.navigator.clipboard.writeText(password) // password copy 

  }, [password])

  useEffect(() => {
    
    PasswordGenerator()
  } ,[length, numAllow, charAllow,PasswordGenerator])


  return (
    <div className="App">   
    <h1> Password Generator By Dev</h1>

    <div className='inputbox'>
      <input
      type='text'
      value={password}
      placeholder='password'
      readOnly
      className='inputboxtext'
      ref={passwordref}
      ></input>

      <button onClick={copypassclip} className='copy'>copy</button>
    </div>
      <div className="rang">
        <div className="rang1">
          <input
          type='range'
          min={8}
          max={100}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          ></input>
          <label> length:{length}</label>
        </div>
      </div>

      <div className="checkbox">
        <div className="checkbox1">
          <input
          type='checkbox'
          defaultChecked={numAllow}
          id= "numberInput"
          onChange={() => {
            setNumAllow((prev) => !prev);
          }}

          ></input>
          <label>number</label>

          
        </div>
      </div>
      <div className="checkbox">
        <div className='checkbox2'>
          <input
          type='checkbox'
          defaultChecked={numAllow}
          id= "CharacterInput"
          onChange={() => {
            setCharAllow((prev) => !prev);
          }}

          ></input>
          <label>Charachar</label>

          
        </div>
      </div>
      
    

    </div>
  );
}

export default App;
