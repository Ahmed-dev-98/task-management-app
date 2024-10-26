/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainImageUpload from "@/shared/ui/MainImageUploader";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/tasks.slice";
import { useLocation, useNavigate, useParams } from "react-router";
import MainSelect from "@/shared/ui/MainSelect";
import {
  createEmployeeAction,
  IEmployee,
  updateEmployeeAction,
} from "@/store/slices/employees.slice";
import { v4 as uuidv4 } from "uuid";
import { ROUTES } from "@/app/router/routes";
import { updateUser } from "@/store/slices/auth.slice";

const EmployeeManager = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const location = useLocation();
  const [selectedTasks, setSelectedTasks] = useState<
    { id: string; label: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const navigate = useNavigate();
  const { id } = useParams();
  const employeeForm = useForm<IEmployee>({
    defaultValues: {
      email: undefined,
      family_name: undefined,
      given_name: undefined,
      picture: undefined,
      tasks: [],
      id: uuidv4(),
    },
  });
  useEffect(() => {
    if (location.state) {
      employeeForm.reset(location.state);
      setSelectedImg(location.state.picture);
      setSelectedTasks(
        location.state.tasks.map((task: any) => ({
          id: task.id,
          label: task.title,
        }))
      );
    }
  }, [id]);

  const onSubmit = (data: any) => {
    const ids = selectedTasks.map((task) => task.id);
    const updatedTasks = tasks.filter((task) => ids.includes(task.id));
    data.tasks = updatedTasks;

    if (!id) {
      dispatch(createEmployeeAction(data));
    } else {
      console.log(data);

      dispatch(updateEmployeeAction(data));
      dispatch(updateUser(data));
    }
    navigate(ROUTES.EMPLOYEES);
  };
  return (
    <div className=" w-1/2 mx-auto border border-gray-300 rounded-md  p-4">
      <Form {...employeeForm}>
        <form onSubmit={employeeForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-3 w-full mx-auto">
            <div className="bg-teal-400  rounded-md w-1/2 h-[200px]">
              <MainImageUpload
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                setImage={(e) => employeeForm.setValue("picture", e)}
              />
            </div>
            <FormField
              control={employeeForm.control}
              name="given_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel children="First Name" />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="text"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={employeeForm.control}
              name="family_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel children="Last Name" />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="text"
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={employeeForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel children="email" />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="text"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={employeeForm.control}
              name="tasks"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel />
                  <FormControl>
                    <MainSelect
                      isMulti
                      badgeClassName="bg-blue-500 text-white rounded-sm text-sm"
                      defaultValue={selectedTasks ? selectedTasks : undefined}
                      options={tasks.map((task) => ({
                        id: task.id,
                        label: task.title,
                      }))}
                      value={(e) => {
                        setSelectedTasks(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{id ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeManager;
