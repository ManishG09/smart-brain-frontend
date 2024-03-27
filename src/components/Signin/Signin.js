import React from "react";
import { useState } from "react";


const Signin = ({onRouteChange, loadUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onChangeMail=(e) => {
    setEmail(e.target.value)
    
  }
  const onChangePassword=(e) => {
    setPassword(e.target.value)
  }

  const onSubmit= ()=>{
     fetch('http://localhost:3100/signin' , {
      method: "post",
      headers: {'Content-Type':'application/json'},
      body:  JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(user => {
       if(user) 
      {
        loadUser(user)
        onRouteChange('home')
      }
    }) 
  }

  return (
    <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
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
                id="password"
                onChange={onChangePassword}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in" onClick={onSubmit}
            />
          </div>
          <div className="1h-copy mt3">
            <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">
              Register
            </p>
          </div>
        </div>
      </main>
      </article>
    </div>
  );
};

export default Signin;
