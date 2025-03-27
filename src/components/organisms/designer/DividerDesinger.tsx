import DividerWithHeader from "@components/atoms/Divider";
import DragAreaSeperator from "@components/atoms/DragAreaSeperator";
import DragAreaSplitter from "@components/atoms/DragAreaSplitter";
import { VARIANT } from "@constants/fieldTypes";
import { useDroppable } from "@dnd-kit/core";

interface DividerDesingerProps {
  title: string;
  options?: string[];
  id: string;
  parentId: string;
}
const DividerDesinger = ({ title, parentId, id }: DividerDesingerProps) => {
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
          <DividerWithHeader title={title} />
        </div>
      </DragAreaSeperator>
    </div>
  );
};

export default DividerDesinger;
