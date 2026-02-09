import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] border border-gray-300 rounded-xl p-6 bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome To Rayyan Graphics
        </h2>
        <p className="text-sm text-gray-500 mb-5">Sign in to continue</p>

        <Input
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label
          className="text-base text-black
         mb-0"
        >
          Password
        </label>

        <div
          className={`w-full border border-[#9e77d2] rounded-md px-2 py-2 mt-1 mb-2 flex items-center justify-between `}
        >
          <input
            name="password"
            type={ShowPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none "
            required
          />
          <span
            onClick={() => setShowPassword(!ShowPassword)}
            className="cursor-pointer text-sm text-purple-600"
          >
            {ShowPassword ? "Hide" : "Show"}
          </span>
        </div>
        <Button
          type={"submit"}
          label={"LOGIN"}
          classvalues={
            "mt-5 bg-[#6a23c9] text-white flex justify-center w-full"
          }
        />
      </form>
    </div>
  );
};

export default Login;
