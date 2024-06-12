import React from 'react';
import FormBuilderTemplate from '@components/templates/FormBuilderTemplate';
import { useFormStore } from '@store/useFormStore';
import INPUT_FIELDS from '@constants/inputFieldConstants';
import { DndContext } from '@dnd-kit/core';
import useFormBuilder from '@hooks/useFormBuilder';

const FormBuilderPage: React.FC = () => {

    const { handleDragEnd } = useFormBuilder()

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <FormBuilderTemplate />
        </DndContext>
    );
};

export default FormBuilderPage;
