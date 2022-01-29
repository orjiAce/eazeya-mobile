export function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
}
