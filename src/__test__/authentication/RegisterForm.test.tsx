import { render, screen } from "@testing-library/react";
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
});
