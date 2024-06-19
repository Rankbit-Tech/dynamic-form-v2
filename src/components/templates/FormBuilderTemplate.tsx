import React from 'react';
import { useFormStore } from '@store/useFormStore';
import DraggableFieldList from '@components/molecules/DraggableFieldList';
import DroppableZone from '@components/molecules/DroppableZone';
import { ImCross } from "react-icons/im";
import DragOverlayContainer from '@components/molecules/DragOverlayContainer';
import SettingsPanel from '@components/organisms/SettingsPanel';


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
                        <div className='flex flex-col'>
                            <div className='flex justify-between border-b py-2 '>
                                <h3 className='font-semibold'>Field Settings</h3>
                                <ImCross className='text-lg hover:text-red-500 cursor-pointer' onClick={handeOutSideClick} />
                            </div>
                            <SettingsPanel />
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
