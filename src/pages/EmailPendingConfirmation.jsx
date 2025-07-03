function EmailPendingConfirmation() {
  return (
    <section className="h-screen flex flex-col gap-4 items-center justify-center px-4 sm:w-[500px] sm:mx-auto">
      <h2 className="text-xl text-blue-900 text-center sm:text-4xl">
        <strong>Gracias por registrarte en LensLog.</strong>
      </h2>
      <p className="text-center text-gray-600 sm:text-left sm:text-lg">
        Te hemos enviado un correo para confirmar tu cuenta de email. Por favor,
        revisa tu bandeja de entrada y confirma la nueva solicitud antes de
        continuar
      </p>
    </section>
  );
}

export default EmailPendingConfirmation;
