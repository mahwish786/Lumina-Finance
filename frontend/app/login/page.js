// frontend/app/login/page.js

"use client";
import AuthForm from '../../components/AuthForm';

export default function Login() {
  return <AuthForm initialMode="login" />;
}