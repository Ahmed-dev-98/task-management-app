import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Loggin() {
  const { login, register, isAuthenticated, logout } = useKindeAuth();
  console.log(isAuthenticated);

  return (
    <div className="flex gap-5">
      <Button onClick={() => register()} type="button">
        Register
      </Button>
      <Button onClick={() => login()} type="button">
        Log In
      </Button>
      <Button onClick={() => logout()}>logout</Button>
    </div>
  );
}
