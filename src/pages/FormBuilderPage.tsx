import FormBuilderTemplate from '@components/templates/FormBuilderTemplate';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import useFormBuilder from '@hooks/useFormBuilder';
import { useFormStore } from '@store/useFormStore';
import { useEffect } from 'react';



const FormBuilderPage = ({ onFormSave }: FormBuilderPageProps) => {
    const { handleDragEnd } = useFormBuilder()
    const { setFields, setMetadata } = useFormStore(state => state)

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

    useEffect(() => {
        return () => {
            setFields(() => [])
            setMetadata({
                name: '',
                version: 1
            })
        }
    }, [])

    const sensors = useSensors(mouseSensor, touchSensor)

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <FormBuilderTemplate onFormSave={onFormSave} />
        </DndContext>
    );
};

export default FormBuilderPage;
