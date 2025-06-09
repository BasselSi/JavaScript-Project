"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, dispatch] = useActionState(loginAction, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/");
  }, [state, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form action={dispatch} className="flex flex-col gap-2 w-80">
        <h2 className="text-xl mb-2">Sign In</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered"
          required
        />
        {state?.errors?.email && (
          <div className="text-red-500">{state.errors.email}</div>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        {state?.error && <div className="text-red-500">{state.error}</div>}
      </form>
      <button
        className="btn btn-link mt-4"
        type="button"
        onClick={() => router.push("/signup")}
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
}
