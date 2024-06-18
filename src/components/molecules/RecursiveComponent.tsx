import React from 'react';
import FieldComponent from '@components/molecules/FieldComponent';
import { Field, Step, Section } from '@store/useFormStore';

const RecursiveComponent: React.FC<{ item: Field | Step | Section }> = ({ item }) => {
    return <FieldComponent field={item} />;
};

export default RecursiveComponent;
