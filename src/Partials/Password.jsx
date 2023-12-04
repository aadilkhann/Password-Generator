import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [length, setLength] = useState(8);

  const passwordRef = useRef(null);
  const genratePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) {
      str += "0123456789";
    }
    if (isChar) {
      str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [setPassword, isNumber, isChar, length]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.WriteText(password)
  }, [password]);

  useEffect(() => {
    genratePassword();
  }, [length, isChar, isNumber, genratePassword]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5">
      <div className="flex gap-3">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="border-2 px-3 py-1 md:w-96 w-72"
          ref={passwordRef}
        />
        <button className="border-2 px-3 py-1" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="flex md:flex-row flex-col gap-3">
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="range"
            name=""
            id=""
            min="8"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={isNumber}
            onChange={() => setIsNumber((prev) => !prev)}
          />
          <label>Number</label>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={isChar}
            onChange={() => setIsChar((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
};

export default Password;
