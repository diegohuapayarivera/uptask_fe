import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import toast from "react-hot-toast";

export default function DashboardView() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: deleteProject, // Delete Projects
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Projecto Eliminado")
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Maneja y adminitra tus proyectos
        </p>
        <nav className="my-5">
          <Link
            className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-100"
            to="/projects/create"
          >
            Nuevo Proyecto
          </Link>
          {data.length ? (
            <ul
              role="list"
              className="mt-10 bg-white border border-gray-100 divide-y divide-gray-100 shadow-lg"
            >
              {data.map((project) => (
                <li
                  key={project._id}
                  className="flex justify-between px-5 py-10 gap-x-6"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="flex-auto min-w-0 space-y-2">
                      <Link
                        to={``}
                        className="text-3xl font-bold text-gray-600 cursor-pointer hover:underline"
                      >
                        {project.projectName}
                      </Link>
                      <p className="text-sm text-gray-400">
                        Cliente: {project.clientName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0 gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon
                          className="h-9 w-9"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            <Link
                              to={``}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              to={`/projects/${project._id}/edit`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Editar Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500"
                              onClick={() => mutate(project._id)}
                            >
                              Eliminar Proyecto
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center">
              No hay projectos aun {""}
              <Link
                className="font-bold text-fuchsia-500"
                to="/projects/create"
              >
                Crear proyecto
              </Link>
            </p>
          )}
        </nav>
      </>
    );
}
