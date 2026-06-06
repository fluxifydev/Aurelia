"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import PublicRoute from "@/components/PublicRoute";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setSubmitted(true);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card-bg p-8 rounded-2xl shadow-xl border border-zinc-100">
          <Link href="/login" className="inline-flex items-center text-sm text-zinc-500 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl font-semibold mb-2">Reset Password</h1>
            <p className="text-zinc-500">
              {submitted 
                ? "Check your email for a link to reset your password."
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {!submitted && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-3 rounded-xl font-medium tracking-wide hover:bg-zinc-800 transition-all disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </PublicRoute>
  );
}
