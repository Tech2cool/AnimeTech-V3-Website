export const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '')?.replace(/\n/g, '');
};
export function VidioDuration(time: string) {
    const numTime = parseFloat(time);

    if (isNaN(numTime) || !isFinite(numTime)) {
        return '0:00';
    }

    const flooredTime = Math.floor(numTime);
    const hours = Math.floor(flooredTime / 3600);
    const minutes = Math.floor((flooredTime - hours * 3600) / 60);
    const seconds = flooredTime - hours * 3600 - minutes * 60;

    if (flooredTime < 3600) {
        return minutes + ':' + ('0' + seconds).slice(-2);
    } else {
        return (
            hours +
            ':' +
            ('0' + minutes).slice(-2) +
            ':' +
            ('0' + seconds).slice(-2)
        );
    }
}
export function convertToAMPM(timeString: string) {
    if (!timeString) {
        throw new Error('Invalid time string');
    }

    const [hours, minutes] = timeString.split(':');
    if (hours === undefined || minutes === undefined) {
        throw new Error('Invalid time string format');
    }

    let convertedHours = parseInt(hours, 10) % 12;
    convertedHours = convertedHours === 0 ? 12 : convertedHours;
    const period = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    return `${convertedHours}:${minutes} ${period}`;
}
// Function to find the index of the episode within the paginated data
export function findIndexInPaginatedData(
    episodes: { name: string; number: number; id: string }[],
    episodeId: string,
    pageSize: number,
) {
    if (episodes?.length > 0) {
        const episodeIndex = episodes.findIndex((ep) => ep.id === episodeId);
        const page = Math.ceil((episodeIndex + 1) / pageSize);
        const indexInPage = (episodeIndex + 1) % pageSize || pageSize;
        return { page, indexInPage };
    }
    return { page: 1, indexInPage: 0 };
}
export const generateArray = (start:number, end:number) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
};
export const getQueryParams = (url: string): { [key: string]: string } => {
    const queryParams: { [key: string]: string } = {};
    const queryString = url?.split('?')[1];

    if (queryString) {
        const pairs = queryString.split('&');
        pairs.forEach((pair: string) => {
            const [key, value] = pair.split('=');
            queryParams[key] = value;
        });
    }

    return queryParams;
};

export function VideoDuration(time: number) {
    if (isNaN(time) || !isFinite(time)) {
        return '0:00';
    }

    time = Math.floor(time);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    const newMinutes =
        minutes?.toString().length === 1 ? '0' + minutes : minutes;
    const newHours = hours?.toString().length === 1 ? '0' + hours : hours;

    if (time < 3600) {
        return newMinutes + ':' + ('0' + seconds).slice(-2);
    } else {
        return (
            newHours +
            ':' +
            ('0' + minutes).slice(-2) +
            ':' +
            ('0' + seconds).slice(-2)
        );
    }
}
