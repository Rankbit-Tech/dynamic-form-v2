import { useState } from 'react';

interface InputField {
    id: string;
    type: string;
    label: string;
    name: string;
    placeholder?: string;
    validations?: string[];
}

interface FormSection {
    id: string;
    title: string;
    fields: InputField[];
}

const useFormBuilder = () => {


    const handleDragEnd = (event: Record<string, any>) => {
        const { active, over } = event
        console.log({ active, over })

        if (!active || !over) return
        if (active.id == over.id) return


    }

    return {
        handleDragEnd
    }
};

export default useFormBuilder;
