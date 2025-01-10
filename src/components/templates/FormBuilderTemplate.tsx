import React from 'react';
import { useFormStore } from '@store/useFormStore';
import DraggableFieldList from '@components/molecules/DraggableFieldList';
import DroppableZone from '@components/molecules/DroppableZone';
import { ImCross } from "react-icons/im";
import DragOverlayContainer from '@components/molecules/DragOverlayContainer';
import SettingsPanel from '@components/organisms/SettingsPanel';
import DividerWithHeader from '@components/atoms/Divider';
import { Button, Input } from 'antd';


const FormBuilderTemplate = ({ onFormSave }: FormBuilderPageProps) => {
    const { selectedField, setSelected, setIsPreview, fields, setMetadata, metadata } = useFormStore();


    const handeOutSideClick = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(null)
    }

    const handlePreview = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setIsPreview(true)
    }

    const handleFormNameChange = (e: any) => {
        const { name, value } = e.target || {}
        setMetadata((old: Record<string, any>) => ({ ...old, [name]: value }))

    }
    const handleFormSave = () => {
        onFormSave({ fields, metadata })
    }

    return (
        <div className="flex h-[90vh]  min-w-[50vh]">
            <div className="flex-1  bg-white" onClick={handeOutSideClick}>
                <div className="h-full overflow-y-scroll">
                    <DroppableZone />
                </div>
            </div>
            <div className="w-1/4 bg-white p-4 border-l border-gray-200">
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
                    <div className="w-full bg-white flex flex-col justify-between h-full ">
                        <div className='p-2 flex justify-end '>
                            <div className='flex items-center gap-2 w-full'>
                                <Button type='primary' className='w-full' ghost onClick={handlePreview}>Preview</Button>
                                <Button type='primary' className='w-full' onClick={handleFormSave}>Save</Button>
                            </div>
                        </div>
                        <div className="w-full mb-2 gap-1">
                            <Input value={metadata?.name} placeholder='Form name' onChange={handleFormNameChange} name='name' />
                        </div>
                        <div className='flex-1'>
                            <DraggableFieldList />
                        </div>

                    </div>
                )}
            </div>
            <DragOverlayContainer />
        </div>
    );
};


export default FormBuilderTemplate;
