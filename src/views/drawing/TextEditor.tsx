import { useEffect, useRef } from "react";
import { Drawing } from "../../state/Drawing";
import { action } from "mobx";

export const TextEditor: React.FC<{
  drawing: Drawing;
}> = ({ drawing }) => {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = drawing.editingID;
    if (!id) return;
    const layer = drawing.layers.get(id);
    if (layer?.type !== "text") return;

    const editable = editableRef.current;
    if (!editable) return;

    editable.innerText = layer.text;
    editable.style.color = layer.color;
    editable.style.left = layer.x + "px";
    editable.style.top = layer.y - 16 + "px";

    const onInput = action(() => {
      drawing.updateLayer(id, { text: editable.innerText });
    });

    editable.addEventListener("input", onInput);

    setTimeout(() => {
      editable.focus();
      // select all
      const range = document.createRange();
      range.selectNodeContents(editable);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    });

    return () => {
      editable.removeEventListener("input", onInput);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        className="absolute"
        ref={editableRef}
        contentEditable="plaintext-only"
        onBlur={action(() => {
          drawing.editingID = null;
        })}
      />
    </div>
  );
};
