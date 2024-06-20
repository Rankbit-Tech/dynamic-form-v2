import React from 'react';
import FieldComponent from '@components/molecules/FieldComponent';

const RecursiveComponent: React.FC<{ item: Record<string, any> }> = ({ item }) => {
    return <FieldComponent field={item} />;
};

export default RecursiveComponent;
