import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function LogIn() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setError("");
      await logIn(data.email, data.password);
      navigate("/", { replace: true });
    }
    catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <h1 test-id="errormsg" className="text-center mb-4">Log In</h1>
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
      <div className="text-center my-2">
        <Link className="text-decoration-none" to="/forgotpassword">
          Forgot password?
        </Link>
      </div>
      <Button
        test-id="submit"
        className="mt-3"
        style={{ width: "100%" }}
        variant="primary"
        type="submit"
      >
      Log In
      </Button>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <Link className="text-decoration-none" to="/signup">
          Sign Up
        </Link>
      </p>
    </Form>
  );
}

export default LogIn;
