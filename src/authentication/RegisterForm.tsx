import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let registrationError = false;
    let trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setUsernameError("Username is missing.");
      registrationError = true;
    }
    let trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is missing.");
      registrationError = true;
    }
    let trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordError("Password is missing.");
      registrationError = true;
    }
    let trimmedConfirm = confirm.trim();
    if (!trimmedConfirm) {
      setConfirmError("Confirm is missing.");
      registrationError = true;
    } else if (trimmedPassword !== trimmedConfirm) {
      setConfirmError("Confirm does not match password.");
      registrationError = true;
    }
    if (registrationError) {
      setErrorMessage("There were registration errors.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5166");
      if (response.data.result) {
        setSuccessMessage("Successful registration!");
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
      <label htmlFor="email">
        Email:
        <input id="email" type="email" onChange={handleChangeEmail} />
      </label>
      {emailError && <p>{emailError}</p>}
      <label htmlFor="password">
        Password:
        <input id="password" type="password" onChange={handleChangePassword} />
      </label>
      {passwordError && <p>{passwordError}</p>}
      <label htmlFor="confirm">
        Confirm:
        <input id="confirm" type="password" onChange={handleChangeConfirm} />
      </label>
      {confirmError && <p>{confirmError}</p>}
      <button data-test-id="register" type="submit">
        Register
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}
