import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const MainDialoge = ({
  open,
  setOpen,
  title,
  describtion,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  describtion?: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{describtion}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default MainDialoge;
