/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader, UploadCloudIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import mediaService from "@/app/services/media.service";

interface IMainImageUploadProps {
  hint?: string;
  disabled?: boolean;
  setSelectedImg: React.Dispatch<React.SetStateAction<string>>;
  selectedImg: string;
  setImage: (e: string) => void;
}
export default function MainImageUpload({
  hint,
  disabled = false,
  selectedImg,
  setSelectedImg,
  setImage,
}: IMainImageUploadProps): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fileRejections, setfileRejections] = useState<string | any[]>([]);
  const [progress, setProgress] = useState(13);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/svg+xml": [".svg"],
      "image/tiff": [".tiff"],
      "image/psd": [".psd"],
      "image/jfif": [".jfif"],
      "image/webp": [".webp"],
      "image/ico": [".ico"],
      "image/heif": [".heif"],
      "image/raw": [".raw"],
      "image/indd": [".indd"],
      "image/ai": [".ai"],
      "image/eps": [".eps"],
      // 'application/pdf': ['.pdf'],
    },
    multiple: false,
    noClick: true,

    onDrop(acceptedFiles, fileRejections) {
      if (fileRejections.length > 0) {
        setfileRejections(
          "Some files were rejected. Please check the file types."
        );
      }
      handleImageDrop(acceptedFiles);
    },
  });

  const handleImageDrop = async (acceptedFiles: Blob[] | MediaSource[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setLoading(true);
    setSelectedImg("");
    try {
      const file = filesWithPreview[0] as any;
      if (!file) return;
      await mediaService
        .uploadImage(file)
        .then((data) => {
          setProgress(100);
          if (data) {
            setSelectedImg(data);
            setImage(data);
          }
          setLoading(false);
        })
        .catch((e) => {
          toast.error(e.response.data.localizedMessage["en"]);
          setLoading(false);
          setProgress(100);
          setSelectedImg("");
        });
    } catch (error) {
      setProgress(100);
      console.log(error);

      setTimeout(() => {
        setLoading(false);
      }, 500);
      setfileRejections(
        "Some files were rejected. Please check the file types."
      );
    }
  };

  return (
    <FormItem
      className={cn(
        { "pointer-events-none opacity-50": disabled },
        "w-full  h-full flex justify-center items-center"
      )}
    >
      <div className="mx-auto flex h-full  w-full flex-col items-center justify-between gap-1 ">
        {!selectedImg ? (
          <div
            onClick={() => {
              document.getElementById("refInput")?.click();
            }}
            className="flex h-full w-full justify-center items-center hover:border-slate-950  hover:cursor-pointer hover:border-dashed border-2"
          >
            {isLoading ? (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <Loader className="animate-spin" />
                <Progress value={progress} className="w-[90%] mx-auto" />
              </div>
            ) : (
              <UploadCloudIcon />
            )}
          </div>
        ) : (
          <Avatar
            className={cn(
              "h-[75%] w-full  rounded-md outline outline-1 outline-gray-400",
              {
                "animate-pulse bg-gray-300/50": isLoading,
              }
            )}
          >
            <AvatarImage
              src={selectedImg && selectedImg}
              className="object-contain"
            />
          </Avatar>
        )}

        <div className="w-full text-center" {...getRootProps({})}>
          <input id="refInput" className="w-full" {...getInputProps()} />
          <span className="text-gray  pt-1 text-[10px] first-letter:capitalize">
            {hint}
          </span>
          <Button
            className={cn(
              { "cursor-wait": isLoading },
              "w-full  text-center flex justify-center items-center"
            )}
            onClick={open}
            type="button"
          >
            <p>{isLoading ? "Wating for uploading... " : "Add photo"}</p>
          </Button>
        </div>
      </div>
      <p className="text-[0.8rem] font-medium text-red-500">{fileRejections}</p>
      <FormMessage className="me-auto max-w-[20rem]" />
    </FormItem>
  );
}
