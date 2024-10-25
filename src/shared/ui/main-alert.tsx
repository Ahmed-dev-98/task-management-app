import { ReactElement } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MainAlert = ({
  buttonComponent,
  description,
  handler,
  id,
}: {
  buttonComponent: ReactElement;
  description?: string;
  handler: (id: string) => void;
  id: string;
}) => {
  console.log(id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{buttonComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>confirmationMessage</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              "This action cannot be undone. This will permanently delete your  account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handler(id)}>
            continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MainAlert;
