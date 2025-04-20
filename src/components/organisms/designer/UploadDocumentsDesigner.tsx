import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { VARIANT } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core";

interface UploadDocumentsDesignerProps {
  id: string;
  label: string;
  parentId: string;
}
const UploadDocumentsDesigner = ({
  id,
  parentId,
}: UploadDocumentsDesignerProps) => {
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
    <div className=" border rounded bg-white shadow mt-1">
      <DragAreaSplitter
        topRef={topHalf.setNodeRef}
        bottomRef={bottomHalf.setNodeRef}
      />
      <DragAreaSeperator topHalf={topHalf} bottomHalf={bottomHalf}>
        <div className="mt-2 p-2">
          <div className="mt-1">
            <h3>Upload Documents</h3>
          </div>
        </div>
      </DragAreaSeperator>
    </div>
  );
};

export default UploadDocumentsDesigner;
