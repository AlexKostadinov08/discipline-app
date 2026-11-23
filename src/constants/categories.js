export const CATEGORIES = [
    { value: 'sport', label: 'Спорт' },
    { value: 'study', label: 'Учене' },
    { value: 'sleep', label: 'Сън' },
    { value: 'work', label: 'Работа' },
    { value: 'health', label: 'Здраве' },
    { value: 'other', label: 'Друго' },
];

export function getCategoryLabel(value) {
    return CATEGORIES.find((category) => category.value === value)?.label ?? 'Друго';
}
