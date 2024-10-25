import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-red-400">
      <Button onClick={() => navigate("/auth")}>Auth</Button>
    </div>
  );
};

export default LandingPage;
