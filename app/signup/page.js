"use client";
import { signupAction } from "./actions";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signupAction);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form action={action} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-2">
          <span className="mb-1">Please enter your name</span>
          <input
            name="name"
            placeholder="Your name"
            className="input input-bordered border border-black"
            defaultValue={state?.name || ""}
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
            defaultValue={state?.email || ""}
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
