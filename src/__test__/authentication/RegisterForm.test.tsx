import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";
import RegisterForm from "../../authentication/RegisterForm";

describe("Registration Form", () => {
  let confirmInput: HTMLElement;
  let emailInput: HTMLElement;
  let registerButton: HTMLElement;
  let passwordInput: HTMLElement;
  let usernameInput: HTMLElement;

  beforeEach(() => {
    render(<RegisterForm />);

    let confirmInputElement = screen.queryByLabelText("Confirm:");
    if (!confirmInputElement) {
      throw new Error("Confirm Input not found");
    }
    confirmInput = confirmInputElement;

    let emailInputElement = screen.queryByLabelText("Email:");
    if (!emailInputElement) {
      throw new Error("Email Input not found");
    }
    emailInput = emailInputElement;

    let registerButtonElement = screen.queryByRole("button", {
      name: "Register",
    });
    if (!registerButtonElement) {
      throw new Error("Register Button not found");
    }
    registerButton = registerButtonElement;

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
    expect(confirmInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
  });

  it("displays successful message", async () => {
    // Arrange
    const username = v4();
    const email = v4() + "@" + v4() + ".com";
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
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(confirmInput, password);
    userEvent.click(registerButton);

    // Assert
    const message = await screen.findByText("Successful registration!");
    expect(message).toBeInTheDocument();
  });

  it("displays missing username message with no username", async () => {
    // Arrange

    // Act
    userEvent.click(registerButton);

    // Assert
    const usernameMissing = screen.getByText("Username is missing.");
    expect(usernameMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing username message with spaces", async () => {
    // Arrange
    userEvent.type(usernameInput, " ");

    // Act
    userEvent.click(registerButton);

    // Assert
    const usernameMissing = screen.getByText("Username is missing.");
    expect(usernameMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing email message with no email", async () => {
    // Arrange

    // Act
    userEvent.click(registerButton);

    // Assert
    const emailMissing = screen.getByText("Email is missing.");
    expect(emailMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing email message with spaces", async () => {
    // Arrange
    userEvent.type(emailInput, " ");

    // Act
    userEvent.click(registerButton);

    // Assert
    const emailMissing = screen.getByText("Email is missing.");
    expect(emailMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing password message with no password", async () => {
    // Arrange

    // Act
    userEvent.click(registerButton);

    // Assert
    const passwordMissing = screen.getByText("Password is missing.");
    expect(passwordMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing password message with spaces", async () => {
    // Arrange
    userEvent.type(passwordInput, " ");

    // Act
    userEvent.click(registerButton);

    // Assert
    const passwordMissing = screen.getByText("Password is missing.");
    expect(passwordMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing confirm message with no confirm", async () => {
    // Arrange

    // Act
    userEvent.click(registerButton);

    // Assert
    const confirmMissing = screen.getByText("Confirm is missing.");
    expect(confirmMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays missing confirm message with spaces", async () => {
    // Arrange
    userEvent.type(confirmInput, " ");

    // Act
    userEvent.click(registerButton);

    // Assert
    const confirmMissing = screen.getByText("Confirm is missing.");
    expect(confirmMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });

  it("displays not matching confirm message with not matching password", async () => {
    // Arrange
    userEvent.type(passwordInput, "abc");
    userEvent.type(confirmInput, "def");

    // Act
    userEvent.click(registerButton);

    // Assert
    const confirmMissing = screen.getByText("Confirm does not match password.");
    expect(confirmMissing).toBeInTheDocument();
    const errors = await screen.findByText("There were registration errors.");
    expect(errors).toBeInTheDocument();
  });
});
