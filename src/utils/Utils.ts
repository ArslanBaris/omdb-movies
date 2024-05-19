export const truncateString = (str:string, num: number) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}

export const convertToStarRating = (rating: number): number => {
    if(isNaN(rating)) return 0;
    return (rating / 10) * 5;
};