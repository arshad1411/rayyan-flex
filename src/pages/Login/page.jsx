import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import {
  PasswordEyeCloseIcon,
  PasswordEyeOpenIcon,
} from "../../components/icons/index";
import InputField from "../../components/InputField/InputField";

const Login = () => {
  // const role = Cookies.get("role");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (role) {
  //     if (role === "superadmin") {
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/localentry");
  //     }
  //   }
  // }, [role]);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // try {
    //   const data = { identifier: Username, password: Password };
    //   const response = await LoginAuth(data);
    //   if (response.status === 200) {
    //     setToken(response.data);
    //     const roleFromCookie = Cookies.get("role");

    //     if (!roleFromCookie) {
    //       const role = await getUserFromLocalCookie();

    //       if (role === "superadmin") {
    //         navigate("/dashboard");
    //       } else {
    //         navigate("/localentry");
    //       }
    //     }
    //   } else {
    //     setErrorMessage(response.data.message);
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 400) {
    //     setErrorMessage("Incorrect username or password");
    //   } else {
    //     setErrorMessage("An unexpected error occurred, please try again later");
    //   }
    // }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[500px] p-4 flex flex-col rounded-xl shadow-md bg-[#fbfcfe] border border-[#878da0]">
        <h1 className="text-md">Welcome To Rayyan Graphics</h1>
        <h6 className="text-sm text-[#555e7c]">Sign in to continue</h6>
        <form onSubmit={handleSubmit} className="mt-4">
          <InputField
            placeholder={"Username"}
            name={"username"}
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <label className="text-sm mb-0">Password</label>
          <div
            className={`w-full border border-[#9e77d2] rounded-md px-2 py-2 mt-1 mb-2 flex items-center justify-between`}
          >
            <input
              name="password"
              type={ShowPassword ? "text" : "password"}
              placeholder="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
            {ShowPassword ? (
              <PasswordEyeCloseIcon onClick={() => setShowPassword(false)} />
            ) : (
              <PasswordEyeOpenIcon onClick={() => setShowPassword(true)} />
            )}
          </div>
          {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
          <Button
            type={"submit"}
            label={"LOGIN"}
            classvalues={
              "mt-5 bg-[#6a23c9] text-white flex justify-center w-full"
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
