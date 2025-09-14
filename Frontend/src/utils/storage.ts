// filepath: c:\Users\Prakhar\ai-resume-builder-1\frontend\src\utils\storage.ts
export const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const removeItem = (key: string) => {
    localStorage.removeItem(key);
};