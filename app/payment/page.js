"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { setPremium } from "./actions";

const PaymentSchema = z.object({
  name: z.string().min(1, "Name on card is required."),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits."),
  expiry: z
    .string()
    .refine(
      (val) => /^\d{2}\/\d{2}$/.test(val),
      "Expiry date must be in MM/YY format."
    )
    .refine((val) => {
      if (!/^\d{2}\/\d{2}$/.test(val)) return false;
      const [mm, yy] = val.split("/").map(Number);
      if (mm < 1 || mm > 12) return false;
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (yy < currentYear || (yy === currentYear && mm < currentMonth))
        return false;
      return true;
    }, "Credit card is expired. Please use a different card."),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits."),
});

export default function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);

    const result = PaymentSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    await setPremium(form); // Assuming setPremium is a function that handles the payment
    setSuccess(true);
    setError("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-2">Payment Details</h2>
        <label>
          Name on Card
          <input
            name="name"
            type="text"
            className="input input-bordered border border-black w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Card Number
          <input
            name="cardNumber"
            type="text"
            inputMode="numeric"
            pattern="\d{16}"
            maxLength={16}
            className="input input-bordered border border-black w-full"
            value={form.cardNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiry Date (MM/YY)
          <input
            name="expiry"
            type="text"
            placeholder="MM/YY"
            pattern="\d{2}/\d{2}"
            maxLength={5}
            className="input input-bordered border border-black w-full"
            value={form.expiry}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CVC
          <input
            name="cvc"
            type="text"
            inputMode="numeric"
            pattern="\d{3,4}"
            maxLength={4}
            className="input input-bordered border border-black w-full"
            value={form.cvc}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Payment submitted!</div>}
        {!success ? (
          <button className="btn btn-primary mt-2" type="submit">
            Pay
          </button>
        ) : (
          <button
            className="btn btn-success mt-2"
            type="button"
            onClick={() => (window.location.href = "/profile")}
          >
            Go to Profile
          </button>
        )}
      </form>
    </div>
  );
}
