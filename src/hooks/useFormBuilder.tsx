import { VARIANT } from "@constants/fieldTypes";
import { useFormStore } from "@store/useFormStore";

type RecordType = Record<string, any>;
type RecordArray = Record<string, any>[];

//remove below line

const useFormBuilder = () => {
  const { setFields } = useFormStore((state) => state);

  const addField = (newField: RecordType) => {
    setFields((fields: RecordArray) => [...fields, newField]);
  };

  const insertFieldAtIndex = (
    targetField: RecordType,
    newField: RecordType,
    position: string
  ) => {
    setFields((fields: RecordArray) => {
      const newFields = [...fields];
      const index = fields.findIndex((field) => field.id === targetField.id);

      if (position === "top") {
        newFields.splice(index, 0, newField);
      } else if (position === "bottom") {
        newFields.splice(index + 1, 0, newField);
      }

      return newFields;
    });
  };

  const handleDragEnd = (event: RecordType) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData.type == VARIANT.STEPPER && overData.type != VARIANT.CANVAS)
      return;

    const isDroppingOnCanvas =
      overData.type == VARIANT.CANVAS && activeData.type === VARIANT.STEPPER;
    const isDroppingOnStepper =
      overData.type === VARIANT.STEPPER && activeData.type !== VARIANT.STEPPER;
    const isDroppingOnSection = overData.type === VARIANT.SECTION;
    const isDroppingOnField =
      overData.type === VARIANT.FIELD || overData.type == VARIANT.SUMMARY;
    const isDroppingOnGridColumns = overData.type === VARIANT.GRID;

    if (isDroppingOnCanvas) {
      if (overData?.position) {
        insertFieldAtIndex(overData, activeData, overData.position);
      } else {
        addField(activeData);
      }
    } else if (
      isDroppingOnStepper ||
      isDroppingOnSection ||
      isDroppingOnField ||
      isDroppingOnGridColumns
    ) {
      handlePositionedDrop(overData, activeData, overData.parentId);
    }
  };

  const handlePositionedDrop = (
    overData: RecordType,
    activeData: RecordType,
    parentId: string = overData.id
  ) => {
    const { position } = overData;
    activeData.parentId = parentId;
    if (position) {
      insertFieldAtIndex(overData, activeData, position);
    } else {
      addField(activeData);
    }
  };

  return {
    handleDragEnd,
  };
};

export default useFormBuilder;
