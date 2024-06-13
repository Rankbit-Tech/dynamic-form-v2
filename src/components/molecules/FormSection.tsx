import React from 'react';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';


interface FormSectionProps {
    field: Record<string, any>
}

const FormSection: React.FC<FormSectionProps> = ({ field }) => {
    const { selectField } = useFormStore();

    const { type } = field || {}


    const DesignerComponent = INPUT_FIELDS[type].designerComponent;

    return (
        <div
            key={field.id}
            onClick={() => selectField(field)}
            className="cursor-pointer"
        >
            <DesignerComponent {...field} />
        </div>

    );
};

export default FormSection;
