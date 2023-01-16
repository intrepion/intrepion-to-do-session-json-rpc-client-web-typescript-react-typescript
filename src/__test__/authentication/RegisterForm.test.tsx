import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../../authentication/RegisterForm";

describe("Registration Form", () => {
  let registerButton: HTMLElement;

  beforeEach(() => {
    render(<RegisterForm />);
    let registerButtonElement = screen.queryByRole("button", {
      name: "Register",
    });
    if (!registerButtonElement) {
      throw new Error("Register Button not found");
    }
    registerButton = registerButtonElement;
  });

  it("has button to register", () => {
    // Arrange

    // Act

    // Assert
    expect(registerButton).toBeInTheDocument();
  });

  it("displays successful message", async () => {
    // Arrange
    const mockApiCall = jest.fn().mockResolvedValue({
      data: {
        id: "1",
        jsonrpc: "2.0",
        result: {},
      },
    });

    axios.get = mockApiCall;

    // Act
    userEvent.click(registerButton);

    // Assert
    const message = await screen.findByText("Successful registration!");
    expect(message).toBeInTheDocument();
  });
});
