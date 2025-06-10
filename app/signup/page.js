"use client";
import { signupAction } from "./actions";
import { useActionState } from "react";
import { useState, useEffect } from "react";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signupAction);

  // Keep the latest entered values in local state for name and email
  const [name, setName] = useState(state?.name || "");
  const [email, setEmail] = useState(state?.email || "");

  // Update local state if the server returns new values (e.g., after a failed submit)
  useEffect(() => {
    if (state?.name !== undefined) setName(state.name);
    if (state?.email !== undefined) setEmail(state.email);
  }, [state?.name, state?.email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form action={action} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-2">
          <span className="mb-1">Please enter your name</span>
          <input
            name="name"
            placeholder="Your name"
            className="input input-bordered border border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {state?.errors?.name && (
            <div className="text-red-500">{state.errors.name}</div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="mb-1">Please enter your email</span>
          <input
            name="email"
            type="email"
            placeholder="Your email"
            className="input input-bordered border border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {state?.errors?.email && (
            <div className="text-red-500">{state.errors.email}</div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="mb-1">Please enter your password</span>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered border border-black"
          />
          {state?.errors?.password && (
            <div className="text-red-500">{state.errors.password}</div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="mb-1">Please repeat your password</span>
          <input
            name="repeatPassword"
            type="password"
            placeholder="Repeat password"
            className="input input-bordered border border-black"
          />
          {state?.errors?.repeatPassword && (
            <div className="text-red-500">{state.errors.repeatPassword}</div>
          )}
        </label>
        {state?.errors?.passwordMatch && (
          <div className="text-red-500">{state.errors.passwordMatch}</div>
        )}
        <button className="btn btn-primary mt-2" disabled={pending}>
          {pending ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
