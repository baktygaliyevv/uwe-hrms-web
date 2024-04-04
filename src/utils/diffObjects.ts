export const diffObjects = (major: Record<any, any>, minor: Record<any, any>) =>
    Object.entries(major).reduce((acc, [ key, value ]) => {
        if(minor.hasOwnProperty(key) && value === minor[key]) return acc;
        return {
            ...acc,
            [key]: value
        }
    }, {});
