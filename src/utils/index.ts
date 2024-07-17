


export const onlyNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(e.key)) {
        return;
    }

    if (!/^\d*\.?\d*$/.test(e.key)) {
        e.preventDefault();
    }

};