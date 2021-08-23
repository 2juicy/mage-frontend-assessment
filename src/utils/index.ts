export function fetchData(url: string) {
  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw response;
    })
    .catch(error => console.error("Bad request", error));
}

export function findAverage(arr: Array<number | string>) {
  const numbers = arr.map(i => Number(i));
  return numbers.reduce(function (avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
}
