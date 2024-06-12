import React from 'react';
import { useFormStore } from '@store/useFormStore';
import DraggableFieldList from '@components/molecules/DraggableFieldList';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import DroppableZone from '@components/molecules/DroppableZone';

const FormBuilderTemplate: React.FC = () => {
    const { selectedField } = useFormStore();

    return (
        <div className="flex h-screen">

            <div className="flex-1 bg-gray-100 p-4">
                <div className="h-full border-dashed border-2 border-gray-300">
                    <DroppableZone />
                </div>
            </div>
            <div className="w-1/4 bg-white p-4 border-l border-gray-200">
                {selectedField ? (
                    <div>
                        <h3>Field Settings</h3>
                        {React.createElement(INPUT_FIELDS[selectedField.type].propertyComponent)}
                    </div>
                ) : (
                    <div className="w-full bg-white p-4 border-r border-gray-200">
                        <DraggableFieldList />
                    </div>
                )}
            </div>
        </div>
    );
};


export default FormBuilderTemplate;
