import Input from "./Input";
import Button from "./Button";

function Header() {
  return (
    <header className="flex flex-col items-center justify-center space-y-4 px-6 py-14 sm:flex-row sm:justify-between">
      <Input />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-900 uppercase tracking-wider sm:text-3xl">
          Bienvenido a LensLog
        </h1>
        <p className="text-gray-600 text-md tracking-wider">
          Comparte lo increible!
        </p>
      </div>
      <div>
        <Button />
      </div>
    </header>
  );
}

export default Header;
