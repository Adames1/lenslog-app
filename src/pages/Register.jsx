import { useEffect, useState } from "react";
import { sessionAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaTimes, FaCheck } from "react-icons/fa";

function Register() {
  const { signUp } = sessionAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (confirmPassword !== "") {
      setIsError(confirmPassword !== password);
    } else {
      setIsError(false);
    }
  }, [password, confirmPassword]);

  const validate = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword =
      validate.length &&
      validate.uppercase &&
      validate.number &&
      validate.special;

    if (!isValidPassword || password !== confirmPassword) {
      setIsError(true);
      return;
    }

    try {
      await signUp(email, password);

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <section className="relavative h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl text-blue-900">
        <strong>LensLog</strong> - Registro
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

        <div className="w-full">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-full px-5 py-1.5"
              required
            />
          </div>

          {/* validate password */}
          {isPasswordFocus && (
            <div className="mt-2 mb-2 flex flex-col gap-1">
              <span className="flex gap-2 items-center text-gray-500">
                {validate.length ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes />
                )}
                Minimo 8 caracteres.
              </span>
              <span className="flex gap-2 items-center text-gray-500">
                {validate.uppercase ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes />
                )}{" "}
                Al menos una mayúscula.
              </span>
              <span className="flex gap-2 items-center text-gray-500">
                {validate.number ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes />
                )}{" "}
                Al menos un número.
              </span>
              <span className="flex gap-2 items-center text-gray-500">
                {validate.special ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaTimes />
                )}{" "}
                Al menos un carácter especial.
              </span>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-600">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-full px-5 py-1.5"
              required
            />
          </div>
          {isError && confirmPassword && (
            <p className="text-red-500">No coinciden las contraseñas.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            !confirmPassword ||
            !validate.length ||
            !validate.uppercase ||
            !validate.number ||
            !validate.special ||
            password !== confirmPassword
          }
          className="disabled:bg-gray-400 disabled:cursor-default bg-blue-900 text-white font-medium rounded-full px-8 py-2.5 cursor-pointer mt-5 hover:bg-blue-800 transition"
        >
          Registrar
        </button>
      </form>

      <div className="absolute bottom-5 px-4 flex items-center text-center">
        <p className="text-gray-600 text-md">
          ¿Ya tienes una cuenta?,{" "}
          <Link to={"/login"} className="text-blue-500">
            Iniciar sesion aqui.
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
