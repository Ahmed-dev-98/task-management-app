/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/store";
import { selectUser } from "@/store/slices/auth.slice";
import {
  selectTasks,
  updateTaskStatusAction,
} from "@/store/slices/tasks.slice";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import toast from "react-hot-toast";
import { ITask } from "@/app/types/types";

const KanbanBoard = () => {
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const organizedTasks: { [key: string]: string[] } = {
    todo: [],
    doing: [],
    done: [],
  };
  tasks.forEach((task) => {
    if (task.assignedTo.some((assignedUser) => assignedUser.id === user.id)) {
      organizedTasks[task.state].push(task.id);
    }
  });
  const initialData = {
    columns: {
      todo: {
        id: "todo",
        title: "To Do",
        taskIds: organizedTasks.todo,
      },
      doing: {
        id: "doing",
        title: "Doing",
        taskIds: organizedTasks.doing,
      },
      done: {
        id: "done",
        title: "Done",
        taskIds: organizedTasks.done,
      },
    },
    tasks: tasks.reduce((acc, task) => {
      acc[task.id] = { ...task };
      return acc;
    }, {}),
    columnOrder: ["todo", "doing", "done"],
  };

  const [data, setData] = useState(initialData);
  const handleChangeStatus = (
    taskId: string,
    newStatus: "todo" | "doing" | "done"
  ) => {
    dispatch(
      updateTaskStatusAction({
        id: taskId,
        state: newStatus,
      })
    );
    toast.success("Task status updated successfully");
  };
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);

    if (sourceColumn === destinationColumn) {
      sourceTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };
      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: sourceTaskIds,
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            taskIds: destinationTaskIds,
          },
        },
      });

      handleChangeStatus(draggableId, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const columnTasks = column.taskIds.map(
            (taskId: string) => data.tasks[taskId]
          );

          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    margin: "0 8px",
                    padding: "8px",
                    width: 200,
                    flexGrow: 1,
                    height: "100%",
                    overflowY: "auto",
                    backgroundColor: "#eee",
                  }}
                >
                  <h3 className="w-full bg-[#294664] text-white  text-center p-2 rounded-m font-medium">
                    {column.title}
                  </h3>
                  {columnTasks.map((task: ITask, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="my-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />{" "}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
