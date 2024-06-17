import React from 'react';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const SettingsPanel: React.FC = () => {
    const { selectedField } = useFormStore();

    if (!selectedField) return <div>Select a field to edit its properties.</div>;
    console.log({ selectedField })
    const PropertyComponent = INPUT_FIELDS[selectedField.type].propertyComponent;

    return (
        <div>
            <h3>Field Settings</h3>
            <PropertyComponent />
        </div>
    );
};

export default SettingsPanel;
