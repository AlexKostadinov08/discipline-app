export const CATEGORIES = [
    { value: 'sport', label: 'Sport' },
    { value: 'study', label: 'Study' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'work', label: 'Work' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' },
];

export function getCategoryLabel(value) {
    return CATEGORIES.find((category) => category.value === value)?.label ?? 'Other';
}
