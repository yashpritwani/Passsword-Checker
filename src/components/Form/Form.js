import { useEffect, useState, useRef} from "react";
import "./Form.css";
import Loader from "../loader";

const Form = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState();
  const [modal, setModal] = useState(false);
  const [passType , setPassType] = useState("password");
  var resp = useRef("");
  const [passConf , setPassConf] = useState({
    hasUpperCase : 0 , 
    hasLowerCase : 0, 
    hasNumericValue : 0, 
    hasSpecialChar : 0, 
    score : 0
  })
  const [color , setColor] = useState("blue");
  const specialCharString = "/^[!@#$%^&*()_+-=[]{};':|,.<>/?]*$/ ";

  // checks
  // 1. password length greater than 8 
  // 2. contain atleast one uppercase char
  // 3. contain atleast one lowercase char
  // 4. contain atleast one numeric value
  // 5. More preference if contain more special case char 

  useEffect(() => {
    resp.current = ""
    passConf.hasSpecialChar = 0;
    let passwordCopy = password;
    if (passwordCopy.length >= 8) passConf.score = 2
    for (let i = 0; i < passwordCopy.length; i++) {
      if (passwordCopy[i] >= "a" && passwordCopy[i] <= "z") 
        passConf.hasLowerCase = 1
      else if (passwordCopy[i] >= "A" && passwordCopy[i] <= "Z") 
        passConf.hasUpperCase = 1;
      else if (passwordCopy[i] >= "0" && passwordCopy[i] <= "9") 
        passConf.hasNumericValue = 1;
      else if (specialCharString.includes(passwordCopy[i])) 
        passConf.hasSpecialChar++;
      else
        continue
    }
    var percent = 
          ( passConf.score + 
            passConf.hasLowerCase + 
            passConf.hasUpperCase + 
            passConf.hasNumericValue + 
            passConf.hasSpecialChar
          ) / ( passwordCopy.length + 2 ) ;
    if(passConf.hasLowerCase < 1 ) resp.current += "\n Please Provide A Lowercase Char";
    if(passConf.hasUpperCase < 1 ) resp.current += "\n Please Provide A Upper Case Char";
    if(passConf.hasNumericValue < 1 ) resp.current += "\n Please Provide A Number Char";
    if(passConf.hasSpecialChar < 4 ) resp.current += "\n Please Provide more Special Characters in password";
    if(
      strength < 0.9 && 
      passConf.hasSpecialChar >= 3 && 
      passConf.hasNumericValue > 0 && 
      passConf.hasUpperCase > 0 && 
      passConf.hasLowerCase > 0 && 
      password.length > 8 ) resp.current += "\n Please replace small and capital English Char more then 1 with special Char"
    passConf.score = 0
    passConf.hasLowerCase = 0
    passConf.hasUpperCase = 0
    passConf.hasNumericValue = 0
    passConf.hasSpecialChar = 0
    setStrength(percent);
    percent = 0;
    if(strength > 0.90) setColor("green")
    else if(strength <= 0.90 && strength > 0.80) setColor("blue")
    else if(strength <= 0.80 && strength > 0.60) setColor("purple")
    else if(strength <= 0.60 && strength > 0.40 ) setColor("orange")
    else setColor("red")
  },[strength,password,passConf,resp]);

  return (
    <div onClick={()=>{if(modal) setModal(!modal)}}>
      <div className={ modal ? "modal" : "none" }>
        <div className="inside-form">
          {
          strength && strength > 0.9 
          ? ( <h3>Your password strength is more than 90 {"%"} i.e., equal to {strength * 100} {"%"}</h3> ) 
          : ( <h3>Reasons for strength not getting above 90</h3> )
          }
          <img src={ require("../../Layer.svg").default } alt="" 
          onClick={() => setModal(false)}/>
          { 
          password.length < 8 
          ? <h6> Please Provide More Than 8 Chars </h6> 
          : <h6> </h6> 
          }
          <h6>{resp.current}</h6>
          {/* { 
          passConf.hasLowerCase < 1 
          ? <h6> Please Provide A Lowercase Char </h6> 
          : <h6> </h6> 
          }
          { 
          passConf.hasUpperCase < 1 
          ? <h6> Please Provide A Uppercase Char </h6> 
          : <h6> </h6> 
          }
          { 
          passConf.hasNumericValue < 1 
          ? <h6> Please Provide A Number Char </h6> 
          : <h6> </h6> 
          }
          { 
            passConf.hasSpecialChar < 3 
            ? <h6> Please Provide more Special Characters in password </h6> 
            : <h6> </h6> 
          }
          { 
            strength < 0.9 && 
            passConf.hasSpecialChar >= 3 && 
            passConf.hasNumericValue > 0 && 
            passConf.hasUpperCase > 0 && 
            passConf.hasLowerCase > 0 && 
            password.length > 8 
            ? <h6> Please replace small and capital English Char more then 1 with special Char</h6> 
            : <h6> </h6> 
          } */}
        </div>
      </div>
      <h1>Password Strength Checker</h1>
      <div className="form-control">
        <div>
          <input type={passType} 
            id="password" 
            placeholder="Type your password here" 
            className="form-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value) 
          } />
          <img src={ require("../../view.svg").default } alt="" 
            onClick={(e)=>{if (passType==="password") setPassType("text"); 
            else setPassType("password"); 
          }}/>
          { password ? (<Loader progress={strength} />) : (<div></div>) }
          <div>
            { strength && strength < 0.40 
            ? (<h6 className={ password ? "disp" : "none" } style={{color:color}}>
              Very Weak Password</h6>)
            : ( <div></div> ) 
            }
            { strength && strength >= 0.40 && strength <= 0.60 
            ? (<h6 className={ password ? "disp" : "none" } style={{color:color}}>
              Weak password</h6>)
            :(<div></div>) 
            }
            { strength && strength > 0.60 && strength <= 0.80 
            ? (<h6 className={ password ? "disp" : "none" } style={{color:color}}>
              Medium Password</h6>)
            :(<div></div>) 
            }
            { strength && strength > 0.80 && strength <= 0.90 
            ? (<h6 className={ password ? "disp" : "none" } style={{color:color}}>
              Strong Password</h6>)
            :(<div></div>) 
            }
            { strength && strength > 0.90 
            ? (<h6 className={ password ? "disp" : "none" } style={{color:color}}>
              Very Strong Password</h6>)
            :(<div></div>) 
            }
            {password ? (<h6 style={{color:color}}>{strength*100} {"%"}</h6>) : 
            (<div></div>) }
          </div>
        </div>
        <button className="form-btn" onClick={(e)=>{
          e.stopPropagation();
          setModal(true)
          }}>
          Verify Reasons for strength
        </button>
      </div>
    </div>
  );
};

export default Form;
