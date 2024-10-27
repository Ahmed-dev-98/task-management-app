import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

const Priority = ({ priority }: { priority: "high" | "medium" | "low" }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded capitalize w-fit min-w-[5rem] ${
        priority === "high"
          ? "bg-red-100 text-red-600"
          : priority === "medium"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-blue-100 text-blue-600"
      } flex jcenter items-center gap-2`}
    >
      {" "}
      {priority === "high" && <FcHighPriority />}
      {priority === "medium" && <FcMediumPriority />}
      {priority === "low" && <FcLowPriority />}
      {priority}
    </span>
  );
};

export default Priority;
