import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import toast from "react-hot-toast";

export default function CreateProjectView() {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => mutate(formData);
  return (
    <>
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className="my-5">
          <Link
            className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-100"
            to="/"
          >
            Volver a proyectos
          </Link>
        </nav>
        <form
          action=""
          className="p-10 mt-10 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="crear Proyecto"
            className="w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}
