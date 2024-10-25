import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Profile = () => {
  const { getUser } = useKindeAuth();
  console.log(getUser());

  return <div>Profile</div>;
};

export default Profile;
