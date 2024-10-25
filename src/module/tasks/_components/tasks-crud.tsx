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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MainImageUpload from "@/shared/ui/MainImageUploader";
import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useAppDispatch } from "@/store";
import { addTaskAction, updateTaskAction } from "@/store/slices/tasks.slice";
import { ROUTES } from "@/app/router/routes";
import { useLocation, useNavigate, useParams } from "react-router";
const TaskManager = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const { getUser } = useKindeAuth();
  const location = useLocation();
  console.log(location.state);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const taskForm = useForm<{
    title: string;
    image: string;
    description: string;
    priority: string;
    state: string;
    createdBy: any;
  }>({
    defaultValues: {
      title: undefined,
      image: undefined,
      description: undefined,
      priority: undefined,
      state: undefined,
      createdBy: getUser(),
    },
  });
  useEffect(() => {
    if (location.state) {
      taskForm.reset(location.state);
      setSelectedImg(location.state.image);
    }
  }, [id]);

  const onSubmit = (data: any) => {
    data.createdBy = getUser();
    console.log(data);
    if (!id) {
      dispatch(addTaskAction(data));
    } else if (id) {
      dispatch(updateTaskAction(data));
    }
    navigate(ROUTES.TASKS);
  };
  return (
    <div className=" w-1/2 mx-auto border border-gray-300 rounded-md  p-4">
      <Form {...taskForm}>
        <form onSubmit={taskForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-3 w-full mx-auto">
            <div className="bg-teal-400  rounded-md w-1/2 h-[200px]">
              <MainImageUpload
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                setImage={(e) => taskForm.setValue("image", e)}
              />
            </div>
            <FormField
              control={taskForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={taskForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel />
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={taskForm.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="priority"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={taskForm.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="text"
                      placeholder="state"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <Button type="submit">{id ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskManager;
