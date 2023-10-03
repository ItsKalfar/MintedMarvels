import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file: File | null) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileChange, ...props }, ref) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      if (onFileChange) {
        onFileChange(selectedFile);
      }
    };
    return (
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,audio/mpeg,audio/mp3"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleFileChange}
        ref={ref}
        {...props}
      />
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
