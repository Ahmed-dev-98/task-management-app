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
import { selectTasks, updateTaskAction } from "@/store/slices/tasks.slice";
import { useLocation, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import MainSelect from "@/shared/ui/MainSelect";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "@/store/slices/employees.slice";
import { v4 as uuidv4 } from "uuid";
import { ROUTES } from "@/app/router/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { IEmployee } from "@/app/types/types";

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
      assignedTasks: [],
      id: uuidv4(),
    },
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email().required(),
        family_name: Yup.string().required(),
        given_name: Yup.string().required(),
        picture: Yup.string().required(),
        id: Yup.string().required(),
        tasks: Yup.array().nullable(),
        assignedTasks: Yup.array().nullable(),
      })
    ),
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
    data.assignedTasks = updatedTasks;

    if (!id) {
      dispatch(createEmployeeAction(data));
    } else {
      updatedTasks.map((task) => {
        dispatch(
          updateTaskAction({
            ...task,
            assignedTo: [...task.assignedTo, location.state],
          })
        );
      });
      dispatch(updateEmployeeAction(data));
    }
    navigate(ROUTES.EMPLOYEES);
  };
  return (
    <div className=" w-1/2 mx-auto border border-gray-300 rounded-md   p-4">
      <Form {...employeeForm}>
        <form onSubmit={employeeForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-3 w-full mx-auto">
            <div className="  rounded-md w-1/2 h-[200px] mb-5">
              <MainImageUpload
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                setImage={(e) => employeeForm.setValue("picture", e)}
              />
              {employeeForm.formState.errors.picture && (
                <FormMessage
                  className="text-center"
                  children={employeeForm.formState.errors.picture.message}
                />
              )}
            </div>
            <div className="flex  justify-center items-center gap-3 w-full mx-auto">
              <FormField
                control={employeeForm.control}
                name="given_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
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
            </div>
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
                  <FormLabel children="Assign Tasks" />
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
