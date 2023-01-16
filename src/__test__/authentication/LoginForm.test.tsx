import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";
import LoginForm from "../../authentication/LoginForm";

describe("Login Form", () => {
  let loginButton: HTMLElement;
  let passwordInput: HTMLElement;
  let usernameInput: HTMLElement;

  beforeEach(() => {
    render(<LoginForm />);

    let loginButtonElement = screen.queryByRole("button", {
      name: "Login",
    });
    if (!loginButtonElement) {
      throw new Error("Login Button not found");
    }
    loginButton = loginButtonElement;

    let passwordInputElement = screen.queryByLabelText("Password:");
    if (!passwordInputElement) {
      throw new Error("Password Input not found");
    }
    passwordInput = passwordInputElement;

    let usernameInputElement = screen.queryByLabelText("Username:");
    if (!usernameInputElement) {
      throw new Error("Username Input not found");
    }
    usernameInput = usernameInputElement;
  });

  it("has form elements to register", () => {
    // Arrange

    // Act

    // Assert
    expect(loginButton).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
  });

  it("displays successful message", async () => {
    // Arrange
    const username = v4();
    const password = v4();
    const mockApiCall = jest.fn().mockResolvedValue({
      data: {
        id: "1",
        jsonrpc: "2.0",
        result: {},
      },
    });
    axios.get = mockApiCall;

    // Act
    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    userEvent.click(loginButton);

    // Assert
    const message = await screen.findByText("Successful login!");
    expect(message).toBeInTheDocument();
  });

  it("displays missing username message with no username", async () => {
    // Arrange

    // Act
    userEvent.click(loginButton);

    // Assert
    const usernameMissing = screen.getByText("Username is missing.");
    expect(usernameMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were login errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing username message with spaces", async () => {
    // Arrange
    userEvent.type(usernameInput, " ");

    // Act
    userEvent.click(loginButton);

    // Assert
    const usernameMissing = screen.getByText("Username is missing.");
    expect(usernameMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were login errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing password message with no password", async () => {
    // Arrange

    // Act
    userEvent.click(loginButton);

    // Assert
    const passwordMissing = screen.getByText("Password is missing.");
    expect(passwordMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were login errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing password message with spaces", async () => {
    // Arrange
    userEvent.type(passwordInput, " ");

    // Act
    userEvent.click(loginButton);

    // Assert
    const passwordMissing = screen.getByText("Password is missing.");
    expect(passwordMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were login errors.");
    expect(errors).toBeInTheDocument();
  });
});
