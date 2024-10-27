import { useAppSelector } from "@/store";
import KanbanBoard from "./_components/kanban-board/KanbanBoard";
import { selectUser } from "@/store/slices/auth.slice";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { selectUserTasks } from "@/store/slices/tasks.slice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Profile = () => {
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectUserTasks(user.id));
  const { getPermission } = useKindeAuth();

  return (
    <div className="relative w-full flex h-full p-6 bg-gray-100">
      <Accordion
        defaultValue="item-1"
        type="single"
        collapsible
        className="w-full h-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold p-4 bg-white rounded-t-lg shadow-sm hover:bg-gray-50">
            User Info
          </AccordionTrigger>
          <AccordionContent className="p-6 bg-white shadow-md rounded-b-lg transition-all duration-300">
            <div className="w-full h-full  flex justify-between items-start text-black p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
              <div className="w-[25%]   gap-2  flex flex-col">
                <div className="w-full h-[120px] rounded-lg border-2 border-primary-300 flex items-center justify-center overflow-hidden bg-white shadow-md">
                  {user.picture.includes("firebase") ? (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg transition-transform duration-200 transform hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-center">
                      <p className="font-medium text-3xl text-gray-800">
                        {user?.given_name?.charAt(0).toUpperCase()}
                        {user?.family_name?.charAt(0).toUpperCase()}
                      </p>
                      <span className="text-xs text-gray-500">
                        Image broken
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-4">
                  <p className="text-2xl font-semibold text-gray-800">
                    {user.given_name} {user.family_name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm mt-1">
                    Role:{" "}
                    <span className="font-medium text-primary-600">
                      {getPermission && getPermission("is-manager").isGranted
                        ? "Manager"
                        : "Employee"}
                    </span>
                  </p>
                  <p className="text-sm mt-1">Tasks Created: {tasks.length}</p>
                </div>
              </div>
              <div className="flex flex-col w-[60%]">
                <div className="flex flex-col gap-4 w-full">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Owned Tasks
                  </h2>
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <p
                          key={index}
                          className="text-sm px-4 py-2 bg-primary-100 text-primary-700 rounded-lg shadow-sm hover:bg-primary-200 transition-colors"
                        >
                          {task.title}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No tasks assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold p-4 bg-white rounded-t-lg shadow-sm hover:bg-gray-50">
            Kanban Board
          </AccordionTrigger>
          <AccordionContent className="w-full h-[500px] bg-white shadow-md rounded-b-lg p-4">
            <KanbanBoard />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Profile;
