import { CUSTOM_THEME_COLORS, ThemeName } from "@/app/types/CustomTheme";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ColorPicker({
  theme = "default",
  onValueChange,
}: {
  theme?: ThemeName;
  onValueChange: (value: ThemeName) => void;
}) {
  return (
    <RadioGroup
      className="flex flex-wrap gap-3"
      defaultValue={theme}
      onValueChange={(value) => {
        onValueChange(value as ThemeName);
      }}
    >
      {Object.keys(CUSTOM_THEME_COLORS).map((color) => (
        <RadioGroupItem
          key={color}
          value={color}
          className={cn(
            "w-6 h-6 rounded-full shadow-sm cursor-pointer data-[state=unchecked]:border-none data-[state=checked]:ring-2 data-[state=checked]:ring-zinc-800 data-[state=checked]:ring-offset-2 data-[state=checked]:border-none",
            CUSTOM_THEME_COLORS[color as ThemeName].accentColor
          )}
        ></RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
