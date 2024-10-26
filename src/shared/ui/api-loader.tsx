import { Loader2 } from "lucide-react";

const ApiLoader = () => {
  return (
    <h2 className="h-full w-full bg-slate-50 flex justify-center items-center ">
      <Loader2 className="animate-spin" size={50} />
    </h2>
  );
};

export default ApiLoader;
