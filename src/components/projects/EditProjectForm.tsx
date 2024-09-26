import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProject } from "@/api/ProjectAPI";

type EditProjectFormProps = {
  data: ProjectFormData;
};

export default function EditProjectForm({ data }: EditProjectFormProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success("Projecto actualizado");
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    console.log(data);
    mutate(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para editar el proyecto
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
            value="Guardar cambios"
            className="w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}
