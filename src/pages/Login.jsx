import { useState } from "react";
import { sessionAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Login() {
  const { signIn } = sessionAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Correo o contraseña incorrectos");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Por favor, confirme su correo antes de iniciar sesión");
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <section className="relavative h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl text-blue-900">
        <strong>LensLog</strong> - Inicia Sesion
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full py-5 gap-3 sm:w-96"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-gray-600">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-600 rounded-full px-5 py-1.5"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password" className="text-gray-600">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-600 rounded-full px-5 py-1.5"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!email || !password}
          className="disabled:bg-gray-400 disabled:cursor-default bg-blue-900 text-white font-medium rounded-full px-8 py-2.5 cursor-pointer mt-5 hover:bg-blue-800 transition"
        >
          Iniciar Sesion
        </button>
      </form>

      <div className="absolute bottom-5 px-4 flex items-center text-center">
        <p className="text-gray-600 text-md">
          Si no tienes una cuenta,{" "}
          <Link to={"/register"} className="text-blue-500">
            Registrate Aqui.
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
