import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Mycomponent />
    </>
  );
}

function Mycomponent() {
  const [name, setname] = useState("");

  const [pass, setpass] = useState("");

  const [list, setlist] = useState([]);

  const [validerror, setvaliderror] = useState(false);

  const processname = (e) => {
    const newname = e.target.value;
    setname(newname);
  };
  const processpass = (e) => {
    const newpass = e.target.value;
    setpass(newpass);
  };

  const adduser = () => {
    if (name == "" || pass == "") {
      // alert("invalid");
      setvaliderror(true);
      return;
    }

    const url = "http://localhost:40000/post";
    const body = {
      username: name,
      password: pass,
    };
    axios.post(url, body);
    let newlist = [body, ...list];
    setlist(newlist);
    setname("");
    setpass("");

    setvaliderror(false);
  };

  const getuser = async () => {
    const url = "http://localhost:40000/user";

    let result = await axios.get(url);

    let list = result.data;

    const newlist = [...list];
    setlist(newlist);
  };

  useEffect(() => getuser(), []);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-1"></div>
        <div className="col-12 col-md-5 justify-content-center">
          <h1 className="alert alert-info">Registraion form</h1>
          <div>
            <label htmlFor="">Enter your username</label>
            {/* "form-control form-control-lg border-info my-1" */}
            <input
              className={
                name == "" && validerror
                  ? "form-control form-control-lg border border-danger my-1"
                  : "form-control form-control-lg bordder border-info my-1"
              }
              type="text"
              name=""
              id=""
              value={name}
              placeholder="type username"
              onChange={processname}
            />{" "}
            <span
              className={
                name == "" && validerror
                  ? "d-block alert alert-danger"
                  : "d-none"
              }
            >
              Enter a valid username
            </span>
          </div>
          <div>
            <label htmlFor="">Enter your password</label>
            <input
              className={
                pass == "" && validerror
                  ? "form-control form-control-lg border border-danger my-1"
                  : "form-control form-control-lg bordder border-info my-1"
              }
              type="password"
              value={pass}
              placeholder="type password"
              onChange={processpass}
            />
            <span
              className={
                pass == "" && validerror
                  ? "d-block alert alert-danger"
                  : "d-none"
              }
            >
              Enter a valid username
            </span>
          </div>
          <div>
            <input
              className="form-control form-control-lg bg-primary text-light fs-3 p-2 my-3"
              type="button"
              value="Register"
              onClick={adduser}
            />
          </div>
          <div className="">
            {list.map((item, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col">UserName : {item.username}</div>
                  <div className="col"> Password : {item.password}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default App;