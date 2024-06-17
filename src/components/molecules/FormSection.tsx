import React from 'react';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';


interface FormSectionProps {
    field: Record<string, any>
}

const FormSection: React.FC<FormSectionProps> = ({ field }) => {
    const { setSelected } = useFormStore();

    const { type } = field || {}

    const DesignerComponent = INPUT_FIELDS[type].designerComponent;

    const handleSelectField = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(field)
    }
    return (
        <div
            key={field.id}
            onClick={handleSelectField}
            className="cursor-pointer"
        >
            <DesignerComponent field={field} />
        </div>

    );
};

export default FormSection;
