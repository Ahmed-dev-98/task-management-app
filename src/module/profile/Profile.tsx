import { useAppSelector } from "@/store";
import KanbanBoard from "./_components/kanban-board/KanbanBoard";
import { selectUser } from "@/store/slices/auth.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { selectUserTasks } from "@/store/slices/tasks.slice";

const Profile = () => {
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectUserTasks(user.id));
  const { getPermission } = useKindeAuth();

  return (
    <div className="relative w-full flex flex-col gap-3  h-full">
      <div className="w-full flex h-[130px] text-black p-3 gap-3 justify-between items-center px-2 rounded-lg shadow-md">
        <div className="w-[120px] h-full rounded-md p-3 border  border-gray-400 flex items-center justify-center  overflow-hidden">
          {user.picture.includes("firebase") ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <p className="font-medium flex-col w-full gap-1 justify-center items-center flex  text-center">
              {user?.given_name?.charAt(0).toUpperCase()}
              {user?.family_name?.charAt(0).toUpperCase()}
              <span className="text-xs"> image broken</span>
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center text-black">
          <p className="text-lg font-semibold">
            Name : {user.given_name} {user.family_name}
          </p>
          <p className="text-sm"> Email : {user.email}</p>
          <p className="text-sm">
            Role :{" "}
            {getPermission && getPermission("is-manager").isGranted
              ? "Manager"
              : "Employee"}
          </p>
          <p className="text-sm"> Created tasks : {tasks.length}</p>
        </div>

        {/* Task List */}
        <div className="flex gap-2  max-h-[120px] max-w-[60%] justify-center items-center">
          <h2 className="text-nowrap">Owned tasks</h2>{" "}
          <div className="flex gap-2  flex-wrap overflow-y-auto max-h-[120px]">
            {tasks?.length > 0 &&
              tasks.map((task, index) => (
                <p
                  key={index}
                  className="bg-blue-500 text-white rounded px-3 py-1 shadow-sm"
                >
                  {task.title}
                </p>
              ))}
          </div>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
};

export default Profile;
