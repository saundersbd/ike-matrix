import { cn } from "@/lib/utils";
import { Project } from "@/app/types/Project";
import {
  CUSTOM_THEME_COLORS,
  ThemeName as CustomThemeName,
} from "@/app/types/CustomTheme";

interface ProjectListItemProps {
  project: Project;
  dense?: boolean;
}

export function ProjectListItem({
  project,
  dense = false,
}: ProjectListItemProps) {
  return (
    <>
      {project.icon && (
        <project.icon
          className={cn(
            "w-4 h-4 mr-2",
            dense && "mr-1",
            CUSTOM_THEME_COLORS[(project.theme as CustomThemeName) ?? "default"]
              .iconColor
          )}
        />
      )}
      <span>{project.name}</span>
    </>
  );
}
