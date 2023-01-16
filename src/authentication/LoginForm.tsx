import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let loginError = false;
    let trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setUsernameError("Username is missing.");
      loginError = true;
    }
    let trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordError("Password is missing.");
      loginError = true;
    }
    if (loginError) {
      setErrorMessage("There were login errors.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5166");
      if (response.data.result) {
        setSuccessMessage("Successful login!");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="username">
        Username:
        <input id="username" type="text" onChange={handleChangeUsername} />
      </label>
      {usernameError && <p>{usernameError}</p>}
      <label htmlFor="password">
        Password:
        <input id="password" type="password" onChange={handleChangePassword} />
      </label>
      {passwordError && <p>{passwordError}</p>}
      <button data-test-id="login" type="submit">
        Login
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}
