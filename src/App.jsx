import { useState, useCallback, useEffect, useRef } from "react";
import { LuCopy } from "react-icons/lu";
import { TbCopyCheckFilled } from "react-icons/tb";
import { Tooltip, IconButton } from "@mui/material";
import "./App.css";
// import generatePassword from "./generatePassword.js";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState("Copy");

  useEffect(() => {
    passwordGenerator();
  }, []);

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let characters = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

    if (includeNumbers) str += numbers;
    if (includeCharacters) str += characters;

    for (let index = 0; index < length; index++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, includeNumbers, includeCharacters, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    setCopied(true);
    setTooltipTitle("Copied");
    setTimeout(() => {
      setCopied(false);
      setTooltipTitle("Copy");
    }, 1500);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1 className="text-3xl text-gray-400 mt-10 text-center">
        Password Generator
      </h1>
      <div className="mt-10 w-[400px] flex mb-3">
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full p-3 rounded-tl-md rounded-bl-md text-lg text-gray-400 outline-none bg-gray-500/30 "
          value={password}
          readOnly
          ref={passwordRef}
        />
        <span
          className="text-3xl text-rose-500 cursor-pointer  bg-gray-500/30 p-3 rounded-tr-md rounded-br-md hover:bg-gray-500/50"
          onClick={copyPasswordToClipboard}
        >
          <Tooltip title={tooltipTitle} placement="top">
            <IconButton className="hover:bg-red-500">
              {/* <FaRegCopy className="text-rose-500" /> */}
              {copied ? (
                <TbCopyCheckFilled className="text-rose-500" />
              ) : (
                <LuCopy className="text-rose-500" />
              )}
            </IconButton>
          </Tooltip>
        </span>
      </div>
      <div className="w-[400px] bg-gray-500/30 text-gray-400 rounded-md p-3">
        <div className="flex justify-between ">
          <h1 className="text-xl">Password Length</h1>
          <h1 className="text-rose-500 text-2xl">{length}</h1>
        </div>
        <input
          type="range"
          min="8"
          max="20"
          className="mt-4 w-full accent-rose-500/5 hover:accent-rose-500"
          onChange={(e) => setLength(e.target.value)}
        />
        <div className="flex items-center mt-5 gap-6">
          <input
            type="checkbox"
            name="numbers"
            className="w-4 h-4 accent-rose-500"
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <label htmlFor="numbers" className="text-lg ">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center mt-5 gap-6">
          <input
            type="checkbox"
            name="numbers"
            className="w-4 h-4 accent-rose-500 "
            onChange={(e) => setIncludeCharacters(e.target.checked)}
          />
          <label htmlFor="numbers" className="text-lg ">
            Include Characters
          </label>
        </div>
        <button
          className="w-full text-white bg-rose-500 outline-none mt-10 p-3 text-lg mb-3 border-none uppercase"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
