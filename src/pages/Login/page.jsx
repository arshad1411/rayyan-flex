import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authService";
import Button from "../../components/Button/Button";
import {
  PasswordEyeCloseIcon,
  PasswordEyeOpenIcon,
} from "../../components/icons";
import InputField from "../../components/InputField/InputField";
import { useAuth } from "../../context/auth-context";
import { DASHBOARD, LOCALENTRY } from "../../router/paths";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const data = await loginUser(formData.identifier, formData.password);

      login(data);

      if (data.role === "superadmin") {
        navigate(DASHBOARD);
      } else {
        navigate(LOCALENTRY);
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.error?.message || "Invalid username or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[450px] p-6 rounded-xl shadow-lg bg-white border">
        <h1 className="text-xl font-semibold">Welcome To Rayyan Graphics</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Username or Email"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <label className="text-sm">Password</label>
          <div
            className={`w-full border border-[#9e77d2] rounded-md px-2 py-2 mt-1 mb-2 flex items-center justify-between`}
          >
            <input
              name="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
            {showPassword ? (
              <PasswordEyeCloseIcon onClick={() => setShowPassword(false)} />
            ) : (
              <PasswordEyeOpenIcon onClick={() => setShowPassword(true)} />
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
          )}

          <Button
            type="submit"
            label={loading ? "Logging in..." : "LOGIN"}
            className="mt-4 bg-[#6a23c9] text-white w-full justify-center"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
