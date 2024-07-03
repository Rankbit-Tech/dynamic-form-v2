import React from 'react';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const SettingsPanel: React.FC = () => {
    const { selectedField } = useFormStore();

    if (!selectedField) return <div>Select a field to edit its properties.</div>;
    const PropertyComponent = INPUT_FIELDS[selectedField.type].propertyComponent;

    return (
        <div className='overflow-y-scroll max-h-[90vh] pb-10 scrollbar-hide'>
            <PropertyComponent key={selectedField.id} />
        </div>
    );
};

export default SettingsPanel;
