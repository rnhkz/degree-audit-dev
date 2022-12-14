import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const EMAIL_REGEX = /^.{3,254}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/;

function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!EMAIL_REGEX.test(data.email)) {
      return setError("Email must be between 3 and 254 characters.");
    }

    if (!PWD_REGEX.test(data.password)) {
      return setError("Password must be 8 to 20 characters, include uppercase and lowercase letters, and a special character (!@#$%).");
    }

    setLoading(true);
    try {
      setError("");
      await signup(data.email, data.password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to create an account.");
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <h1 className="text-center mb-4">Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loading />}
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          test-id="email"
          {...register("email")}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          test-id="password"
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button
        test-id="submit"
        className="mt-3"
        style={{ width: "100%" }}
        variant="primary"
        type="submit"
      >
        Sign Up
      </Button>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link className="text-decoration-none" to="/login">
          Log In
        </Link>
      </p>
    </Form>
  );
}

export default SignUp;
