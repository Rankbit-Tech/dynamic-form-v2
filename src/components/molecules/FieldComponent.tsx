import React from 'react';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { useFormStore } from '@store/useFormStore';

const FieldComponent: React.FC<{ field: any }> = ({ field }) => {

    const { setSelected } = useFormStore();

    const { type, id } = field || {}

    const DesignerComponent = INPUT_FIELDS[type].designerComponent;

    const handleSelectField = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(field)
    }
    return (
        <div
            key={id}
            onClick={handleSelectField}
            className="cursor-pointer"
        >
            {DesignerComponent && <DesignerComponent {...field}>
                {field.children && field.children.map((child: any) => (
                    <FieldComponent key={child.id} field={child} />
                ))}
            </DesignerComponent>}
        </div>
    );
};

export default FieldComponent;
