import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";

const usePermissions = (taskId: string, taskTeam: string[]) => {
  const { getUser, getPermission } = useKindeAuth();
  const [isManager, setIsManager] = useState<boolean | undefined>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = getUser();
    setUserId(user?.id || null);

    const isAuthorized = getPermission && getPermission("is-manager").isGranted;

    setIsManager(isAuthorized);
  }, []);

  const isTaskAuthor = taskId === userId;

  const isMember = taskTeam && taskTeam.includes(userId ?? "");

  return { isManager, isTaskAuthor, isMember };
};

export default usePermissions;
