import React from 'react';
import DraggableInput from '@components/organisms/DraggableInput';
import INPUT_FIELDS from '@constants/inputFieldConstants';

const DraggableFieldList: React.FC = () => {
    return (
        <div className='grid grid-cols-1 lg:gap-2 lg:grid-cols-2'>
            {Object.keys(INPUT_FIELDS).map((key) => {
                const field = INPUT_FIELDS[key];
                return (
                    <DraggableInput
                        key={key}
                        type={field.type}
                        label={field.title}
                        icon={field.icon}
                    />
                );
            })}
        </div>
    );
};

export default DraggableFieldList;
