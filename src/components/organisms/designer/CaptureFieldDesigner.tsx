import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { VARIANT } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "antd";

interface CaptureFieldDesignerProps {
  label: string;
  id: string;
  parentId: string;
}

const CaptureFieldDesigner = ({
  label,
  parentId,
  id,
}: CaptureFieldDesignerProps) => {
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
          <Button>Capture</Button>
        </div>
      </DragAreaSeperator>
    </div>
  );
};

export default CaptureFieldDesigner;
