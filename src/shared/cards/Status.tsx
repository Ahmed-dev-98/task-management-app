import { FiCheckCircle, FiClipboard, FiLoader } from "react-icons/fi";

const Status = ({ state }: { state: "todo" | "doing" | "done" }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded capitalize w-fit min-w-[4rem] ${
        state === "todo"
          ? "bg-red-200 text-red-600"
          : state === "doing"
          ? "bg-blue-200 text-blue-600"
          : "bg-green-200 text-green-600"
      } flex jcenter items-center gap-1`}
    >
      {" "}
      <span>
        {state === "todo" && <FiClipboard />}
        {state === "doing" && <FiLoader />}
        {state === "done" && <FiCheckCircle />}
      </span>
      {state}
    </span>
  );
};

export default Status;
