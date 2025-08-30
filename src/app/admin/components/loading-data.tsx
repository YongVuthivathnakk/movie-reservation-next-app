import { Loader2 } from "lucide-react";

export const LoadingData = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 size={25} className="animate-spin text-muted-foreground" />
      <span className="ml-2 text-lg text-muted-foreground">
        Loading data...
      </span>
    </div>
  );
};
