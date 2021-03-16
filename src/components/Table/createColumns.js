export function createColumns(columns, data) {
  return columns.map(
    (col) =>
      (col = {
        ...col,
        data: data[Object.keys(data).find((d) => d === col.id)],
      })
  );
}
