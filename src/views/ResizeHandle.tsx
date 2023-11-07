import colors from "tailwindcss/colors";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ResizeHandle: React.FC<{
  rect: Rect;
  onChange: (rect: Rect) => void;
}> = ({ rect, onChange }) => {
  // WIP: resize
  return (
    <rect
      fill="none"
      stroke={colors.red[500]}
      strokeWidth={2}
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
    />
  );
};
