// frontend/app/signup/page.js

"use client";
import AuthForm from '../../components/AuthForm';

export default function Signup() {
  return <AuthForm initialMode="signup" />;
}