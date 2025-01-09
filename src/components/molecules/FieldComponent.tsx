import React from 'react';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { useFormStore } from '@store/useFormStore';
import { FaTrashAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { removeField } from '@utils/removeFields';


const FieldComponent: React.FC<{ field: any }> = ({ field }) => {

    const { setSelected, setFields } = useFormStore();

    const { type, id } = field || {}

    const DesignerComponent = INPUT_FIELDS[type].designerComponent;

    const handleSelectField = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setSelected(field)
    }

    const handleDeleteField = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setFields((fields: Record<string, any>[]) => {
            return removeField(fields, field.id)
        })
        setSelected(null)
    }


    if (!DesignerComponent) return null
    return (
        <div
            key={id}
            className="relative"
        >

            <div className='absolute flex gap-x-3 items-center justify-between z-10 right-3 top-2 p-2'>
                <IoMdSettings size={15} className='hover:rotate-45 hover:text-blue-500 transition-all cursor-pointer' onClick={handleSelectField} />
                <FaTrashAlt size={15} className='hover:text-red-500 cursor-pointer' onClick={handleDeleteField} />
            </div>
            <DesignerComponent {...field} className="h-10">
                {field.children && field.children.map((child: any) => (
                    <FieldComponent key={child.id} field={child} />
                ))}
            </DesignerComponent>
        </div>
    );
};

export default FieldComponent;
