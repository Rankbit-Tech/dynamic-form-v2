import React from 'react';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const FormSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
    const { sections, selectField } = useFormStore();
    const section = sections.find((sec) => sec.id === sectionId);

    if (!section) return null;

    return (
        <div>
            <h3>{section.title}</h3>
            {section.fields.map((field) => {
                const DesignerComponent = INPUT_FIELDS[field.type].designerComponent;
                return (
                    <div
                        key={field.id}
                        onClick={() => selectField(field)}
                        className="cursor-pointer"
                    >
                        <DesignerComponent {...field} />
                    </div>
                );
            })}
        </div>
    );
};

export default FormSection;
