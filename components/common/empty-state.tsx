import { Button, type ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";
export function EmptyState({
  onClick,
  heading,
  description,
  buttonVariant,
}: {
  onClick: {
    label: string;
    action: () => void;
  };
  heading: string;
  description: string;
  buttonVariant?: ButtonProps["variant"];
}) {
  return (
    <div className="flex bg-white/80 flex-col grow items-center justify-center p-10">
      <h3 className="mb-2 font-semibold text-base">{heading}</h3>
      <p className="mb-5 text-sm text-zinc-500 text-center">{description}</p>
      <Button variant={buttonVariant} onClick={onClick.action}>
        <Plus className="w-4 h-4" />
        <span>{onClick.label}</span>
      </Button>
    </div>
  );
}
