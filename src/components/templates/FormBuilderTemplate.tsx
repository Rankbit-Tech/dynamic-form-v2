import React from 'react';
import { useFormStore } from '@store/useFormStore';
import DraggableFieldList from '@components/molecules/DraggableFieldList';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import DroppableZone from '@components/molecules/DroppableZone';
import { X } from 'lucide-react';
import DragOverlayContainer from '@components/molecules/DragOverlayContainer';

const FormBuilderTemplate: React.FC = () => {
    const { selectedField, setSelected } = useFormStore();
    const handeOutSideClick = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(null)
    }
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white p-4" onClick={handeOutSideClick}>
                <div className="h-full overflow-y-scroll">
                    <DroppableZone />
                </div>
            </div>
            <div className="w-1/4 bg-white p-4 border-l border-gray-200">
                {selectedField ? (
                    <div>
                        <div className='flex justify-between border-b py-2'>
                            <h3 className='font-semibold'>Field Settings</h3>
                            <X className='text-lg hover:text-red-500 cursor-pointer' onClick={handeOutSideClick} />
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-white p-4 border-r border-gray-200">
                        <DraggableFieldList />
                    </div>
                )}
            </div>
            <DragOverlayContainer />

        </div>
    );
};


export default FormBuilderTemplate;
