import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="mt-5 text-2xl font-light text-gray-500">
        Maneja y adminitra tus proyectos
      </p>
      <nav  className="my-5">
        <Link
          className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-100"
          to="/projects/create"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
