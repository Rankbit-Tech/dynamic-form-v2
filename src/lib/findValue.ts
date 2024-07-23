type Obj = Record<string, any>

export default function findValue(obj: Obj, key: string) {
    // Helper function to perform deep search
    function deepSearch(obj: Obj, key: string) {
        // Check if the current object is indeed an object
        if (obj !== null && typeof obj === 'object') {
            // Iterate through each property in the object
            for (const prop in obj) {
                // If the property matches the key, return its value
                if (prop === key) {
                    return obj[prop];
                }
                // If the property value is an object, perform a deep search
                const result = deepSearch(obj[prop], key) as Obj;
                // If a match was found in the nested object, return the result
                if (result !== undefined) {
                    return result;
                }
            }
        }
        // Return undefined if the key is not found in the current object
        return undefined;
    }

    // Start the deep search from the root object
    return deepSearch(obj, key);
}