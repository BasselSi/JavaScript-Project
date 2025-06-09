"use client";
import { signupAction } from "./actions";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signupAction);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form action={action} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-2">
          <span className="mb-1">Name</span>
          <input
            name="name"
            placeholder="Enter your name"
            className="input input-bordered border border-black"
          />
          {state?.errors?.name && (
            <div className="text-red-500">{state.errors.name}</div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="mb-1">Email</span>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered border border-black"
          />
          {state?.errors?.email && (
            <div className="text-red-500">{state.errors.email}</div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="mb-1">Password</span>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered border border-black"
          />
          {state?.errors?.password && (
            <div className="text-red-500">{state.errors.password}</div>
          )}
        </label>
        <button className="btn btn-primary mt-2" disabled={pending}>
          {pending ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
