import { useEffect } from 'react';
import FormBuilderTemplate from '@components/templates/FormBuilderTemplate';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import useFormBuilder from '@hooks/useFormBuilder';
import useEventBus from '@hooks/useEventBus';



const FormBuilderPage = ({ onFormSave }: FormBuilderPageProps) => {
    const { handleDragEnd } = useFormBuilder()

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor)

    const { subscribe } = useEventBus()
    useEffect(() => {
        subscribe("saveSchema", (schema) => {
            onFormSave(schema)
        })
    }, [])


    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <FormBuilderTemplate />
        </DndContext>
    );
};

export default FormBuilderPage;
