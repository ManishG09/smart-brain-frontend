import React from "react";
import { useState } from "react";

const Register = ({onRouteChange , loadUser}) => {
    const [email, setEmail] = useState('dfg@dfgh.fgh')
    const [password, setPassword] = useState('sdfghj')
    const [name, setName] = useState('sdfghj')
    
  
  
    const onChangeMail=(e) => {
      setEmail(e.target.value)
      
    }
    const onChangePassword=(e) => {
      setPassword(e.target.value)
    }
    const onChangeName=(e) => {
      setName(e.target.value)
    }
  
    const onSubmit= ()=>{
       fetch('http://localhost:3100/register' , {
        method: "post",
        headers: {'Content-Type':'application/json'},
        body:  JSON.stringify({
          name:name,
          email: email,
          password: password
        })
      })
      .then(res => res.json())
      .then(user=> {
        if(user){
        loadUser(user)
        onRouteChange('signin')
        }
      }) 
    }
  
  return (
    <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
              Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChangeName}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="Email">
              Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="Email"
                value={email}
                id="Email"
                onChange={onChangeMail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                value={password}
                id="password"
                onChange={onChangePassword}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register" onClick={onSubmit}
            />
          </div>
          <div className="lh-copy mt3">
          
          </div>
        </div>
      </main>
      </article>
    </div>
  );
};

export default Register;
