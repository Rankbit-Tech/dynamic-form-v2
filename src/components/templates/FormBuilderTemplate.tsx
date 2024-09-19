import React, { useCallback } from 'react';
import { useFormStore } from '@store/useFormStore';
import DraggableFieldList from '@components/molecules/DraggableFieldList';
import DroppableZone from '@components/molecules/DroppableZone';
import { ImCross } from "react-icons/im";
import DragOverlayContainer from '@components/molecules/DragOverlayContainer';
import SettingsPanel from '@components/organisms/SettingsPanel';
import DividerWithHeader from '@components/atoms/Divider';
import { Button, Input, Select } from 'antd';
import useEventBus from '@hooks/useEventBus';


const FormBuilderTemplate = () => {
    const { selectedField, setSelected, setIsPreview, fields } = useFormStore();
    const handeOutSideClick = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(null)
    }

    const handlePreview = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setIsPreview(true)
    }

    const handleFormNameChange = (values: any) => {
        console.log({ values })
    }
    const { emitEvent } = useEventBus()
    const handleFormSave = () => {
        emitEvent('saveSchema', fields)
    }

    const options = [
        {
            value: "",
            label: "Version"
        },
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
    ];

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-white p-4" onClick={handeOutSideClick}>
                <div className="h-full overflow-y-scroll">
                    <DroppableZone />
                </div>
            </div>
            <div className="w-1/5 bg-white p-4 border-l border-gray-200">
                {selectedField ? (
                    <div>
                        <div className='flex flex-col'>
                            <DividerWithHeader title='Field Settings'>
                                <ImCross size={15} className='text-lg hover:text-red-500 cursor-pointer' onClick={handeOutSideClick} />
                            </DividerWithHeader>
                            <SettingsPanel />
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-white border-r flex flex-col justify-between h-full border-gray-200">
                        <div className="w-full mb-2 flex gap-2">
                            <Select defaultValue="1" options={options} />
                            <Input placeholder='Enter form name' />
                        </div>
                        <div className='flex-1'>
                            <DraggableFieldList />
                        </div>
                        <div className='p-2 flex justify-end '>
                            <div className='flex items-center gap-2 w-full'>
                                <Button type='primary' className='w-full' ghost onClick={handlePreview}>Preview</Button>
                                <Button type='primary' className='w-full' onClick={handleFormSave}>Save</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <DragOverlayContainer />

        </div>
    );
};


export default FormBuilderTemplate;
