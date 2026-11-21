// "2026-11-21" -> "21.11.2026"
// Режем стринга на ръка, вместо new Date(), за да няма изместване с ден заради часовата зона.
export function formatDate(isoDate) {
    if (!isoDate) return '';

    const [year, month, day] = isoDate.slice(0, 10).split('-');
    return `${day}.${month}.${year}`;
}
