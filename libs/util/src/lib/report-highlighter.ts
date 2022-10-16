export function highlightHTML(text: string) {
  function addHighlightClass(match: string) {
    const s = match.match('[0-9]{3}');
    const number = s ? parseInt(s[0], 10) : -1;

    const className =
      number > 30 ? 'text-red-500' : number > 0 ? 'text-blue-600' : '';

    return `<span class="${className} font-bold">${match}</span>`;
  }

  return text.replace(
    /[B][K][N][0-9]{3}|[F][E][W][0-9]{3}|[S][C][T][0-9]{3}/g,
    addHighlightClass
  );
}
