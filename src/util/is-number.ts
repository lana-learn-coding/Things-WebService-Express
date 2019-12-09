export default function isNumber(val: any) {
    if (val === 0 || val) {
        return !isNaN(Number(val));
    }
    return false;
}
