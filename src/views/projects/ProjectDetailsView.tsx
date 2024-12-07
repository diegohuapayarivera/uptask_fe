import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function ProjectDetailsView() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to={"/404"}></Navigate>;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName} </h1>
        <p className="mt-5 text-2xl font-light text-gray-500 ">
          {data.description}{" "}
        </p>
        <nav className="flex gap-3 my-5 ">
          <button
            type="button"
            className="px-10 py-3 font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-500"
            onClick={() => navigate(location.pathname + "?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
