import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { VARIANT } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core";
import { Checkbox } from "antd";
import React from "react";

interface CheckboxFieldDesignerProps {
  label: string;
  options?: string[];
  id: string;
  parentId: string;
}

const CheckboxFieldDesigner: React.FC<CheckboxFieldDesignerProps> = ({
  label,
  options,
  parentId,
  id,
}) => {
  const topHalf = useDroppable({
    id: `top-field-${id}`,
    data: {
      id: id,
      position: "top",
      parentId,
      type: VARIANT.FIELD,
    },
  });
  const bottomHalf = useDroppable({
    id: `bottom-field-${id}`,
    data: {
      id: id,
      position: "bottom",
      parentId,
      type: VARIANT.FIELD,
    },
  });

  return (
    <div className=" py-4 border rounded bg-white shadow mt-1">
      <DragAreaSplitter
        topRef={topHalf.setNodeRef}
        bottomRef={bottomHalf.setNodeRef}
      />
      <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
        <div className="mt-2 p-2 flex flex-col">
          <label className="mr-2 font-semibold mb-1">{label}</label>
          <Checkbox.Group options={options} />
        </div>
      </DragAreaSeperator>
    </div>
  );
};

export default CheckboxFieldDesigner;
