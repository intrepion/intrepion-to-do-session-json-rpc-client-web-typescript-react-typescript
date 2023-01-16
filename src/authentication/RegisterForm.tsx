import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
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
        <input id="username" type="text" />
      </label>
      <label htmlFor="email">
        Email:
        <input id="email" type="email" />
      </label>
      <label htmlFor="password">
        Password:
        <input id="password" type="password" />
      </label>
      <label htmlFor="confirm">
        Confirm:
        <input id="confirm" type="password" />
      </label>
      <button id="register" type="submit">
        Register
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}
