import React from 'react';
import DraggableInput from '@components/organisms/DraggableInput';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const DraggableFieldList: React.FC = () => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {Object.keys(INPUT_FIELDS).map((key) => {
                const field = INPUT_FIELDS[key];
                return (
                    <DraggableInput
                        key={key}
                        type={field.type}
                        label={field.type}
                        icon={field.icon}
                    />
                );
            })}
        </div>
    );
};

export default DraggableFieldList;
