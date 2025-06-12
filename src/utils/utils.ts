export function formatDate(isoString: string) : string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formatter.format(date)
}

export function fullFormatDate(createdDate: string) :string {
  const date = new Date(createdDate);
  return date.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}