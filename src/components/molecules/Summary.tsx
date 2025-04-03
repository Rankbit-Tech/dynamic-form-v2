import { useFormStore } from "@store/useFormStore";
import { fieldTypes } from "@constants/fieldTypes";
import { Image as ImagePreview } from "antd";
import { useCallback } from "react";
import dayjs from "dayjs";
interface summaryProps {
  validations?: {
    fields?: string[];
  };
  isOnRenderPage?: boolean;
}

interface Field {
  label: string;
  value: any;
  type: string;
  name: string;
}

interface Step {
  title: string;
  fields: Field[];
}

interface FormField {
  id: string;
  parentId?: string;
  variant: "FIELD" | "GRID" | "IMAGE" | "SECTION" | "STEPPER";
  title?: string;
  label?: string;
  name?: string;
  type?: string;
  src?: string;
}

const RenderImages = ({ field }: { field: Field }) => {
  if (!Array.isArray(field?.value)) return null;
  if (field.type == fieldTypes.UPLOADDOCUMENTS || fieldTypes.FILEUPLOAD) {
    return field.value?.reduce((acc, value) => acc.concat(value.name, ","), "");
  }

  return field.value.map((file) => {
    return <ImagePreview key={file.name} height={60} src={file?.url} />;
  });
};

const Summary = ({ validations, isOnRenderPage = false }: summaryProps) => {
  const { fields, formValues } = useFormStore((state) => state);

  const fieldsToIncludeSet = new Set(validations?.fields || []);

  const getSummary = (): Step[] => {
    const groupedFields: Record<string, Step> = {};
    const typedFields = fields as FormField[];

    fields.forEach((field: any) => {
      if (["FIELD", "GRID", "IMAGE", "SECTION"].includes(field.variant)) {
        const step = fields.find(
          (stepField: any) =>
            stepField.id === field.parentId && stepField.variant === "STEPPER"
        );

        if (step) {
          if (!groupedFields[step.id]) {
            groupedFields[step.id] = {
              title: step.title || "",
              fields: [],
            };
          }

          const addFieldToStep = (f: FormField) => {
            if (f.variant === "GRID" || f.variant === "SECTION") {
              typedFields
                .filter((subField) => subField.parentId === f.id)
                .forEach((subField) => addFieldToStep(subField));
            } else {
              const value =
                f.variant === "IMAGE"
                  ? f.src || ""
                  : formValues[f.name || ""] || "";
              groupedFields[step.id].fields.push({
                label: f.label || "",
                value,
                type: f.type || "",
                name: f.name || "",
              });
            }
          };

          addFieldToStep(field as FormField);
        }
      }
    });

    return Object.values(groupedFields);
  };

  const summary = getSummary();

  const renderFields = useCallback((field: Field) => {
    switch (field.type) {
      case fieldTypes.IMAGE:
        return <ImagePreview key={field.name} height={60} src={field.value} />;
      case fieldTypes.FILEUPLOAD:
      case fieldTypes.UPLOADDOCUMENTS:
        return <RenderImages field={field} />;
      case fieldTypes.DATETIME:
        return dayjs.isDayjs(field.value) ? (
          <span>
            {" "}
            : &nbsp; {dayjs(field.value).format("YYYY/MM/DD").toString()}{" "}
          </span>
        ) : (
          <span> : &nbsp;{field.value}</span>
        );
      case fieldTypes.IMAGECAPTURE:
        return (
          <ImagePreview
            key={field.name}
            height={60}
            width={60}
            src={field.value}
          />
        );
      default:
        return <span> : &nbsp;{field.value}</span>;
    }
  }, []);

  return (
    <div className="border p-2 bg-white shadow">
      <div>
        {summary.map((step, index) => (
          <div key={index} style={{ marginBottom: 24 }}>
            <h2 className="text-red-900 font-semibold mb-4 w-full">
              {step.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {step.fields.map((field) => {
                if (!fieldsToIncludeSet.has(field.name) && !isOnRenderPage) {
                  return null;
                }
                return (
                  <div className="flex gap-2" key={field.label}>
                    <span className="font-bold sm:min-w-[100px]">
                      {field.label}
                    </span>
                    {renderFields(field)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
