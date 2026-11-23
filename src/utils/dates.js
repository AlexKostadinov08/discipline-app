export function formatDate(isoDate) {
    if (!isoDate) return '';

    const [year, month, day] = isoDate.slice(0, 10).split('-');
    return `${day}.${month}.${year}`;
}

export function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function fromDateString(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Date(year, month - 1, day);
}
