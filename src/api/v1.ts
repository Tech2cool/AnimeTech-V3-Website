import axios from 'axios';
import { SERVER_BASE_URL } from '../utils/contstant';

interface Id {
    id: string | undefined;
}
interface Movies {
    page: number;
    alphabet?: string;
}

interface Source {
    id: string | undefined;
    streamServer?: string;
    subtype?: string;
}

interface Search {
    page: number;
    query: string;
    genre: string;
    status: string;
    subtype: string;
    type: string;
    season: string;
    year: string;
}
interface Seasonal {
    season: string;
    page: number;
}
interface chatQueryType {
  id: number | string | undefined;
  cursor: string | undefined;
}

export const fetchRecentRelease = async ({ page = 1 }) => {
    try {
        const url = `${SERVER_BASE_URL}/recent?page=${page}`;
        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchTopAiring = async ({ page = 1 }) => {
    try {
        const url = `${SERVER_BASE_URL}/top-airing?page=${page}`;
        const resp = await axios.get(url);
        // console.log(resp.data)

        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchTrending = async ({ id = 1 }) => {
    try {
        const url = `${SERVER_BASE_URL}/trending/${id}`;
        const resp = await axios.get(url);
        // console.log(resp.data)

        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchPopular = async ({ page = 1 }) => {
    try {
        let url = `${SERVER_BASE_URL}/popular?page=${page}`;
        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchMovies = async ({ page = 1, alphabet }: Movies) => {
    try {
        let url = `${SERVER_BASE_URL}/movies?page=${page}`;
        if (alphabet) {
            url += `&alphabet=${alphabet}`;
        }
        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchInfo = async ({ id }: Id) => {
    try {
        const url = `${SERVER_BASE_URL}/anime-details/${id}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchInfoV2 = async ({ id }: Id) => {
    try {
        const url = `${SERVER_BASE_URL}/anime-details/v2/${id}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchTrailerInfo = async ({ id }: Id) => {
    try {
        const url = `${SERVER_BASE_URL}/trailer/${id}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchEpisodes = async ({ id }: Id) => {
    try {
        const url = `${SERVER_BASE_URL}/episodes/${id}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchSource = async ({ id, streamServer, subtype }: Source) => {
    try {
        const url = `${SERVER_BASE_URL}/source/${id}?streamServer=${streamServer}&subtype=${subtype}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const searchAnime = async ({
    page = 1,
    query,
    genre,
    status,
    subtype,
    type,
    season,
    year,
}: Search) => {
    try {
        let url = `${SERVER_BASE_URL}/search?query=${query}&page=${page}`;
        if (genre) {
            url += `&genre=${encodeURIComponent(genre)}`;
        }
        if (status) {
            url += `&status=${status}`;
        }
        if (subtype) {
            url += `&subtype=${subtype}`;
        }
        if (type) {
            url += `&type=${type}`;
        }
        if (season) {
            url += `&season=${season}`;
        }
        if (year) {
            url += `&year=${encodeURIComponent(year)}`;
        }

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export async function fetchVersion() {
    try {
        const response = await axios.get(`${SERVER_BASE_URL}/version`);
        // console.log(response?.data?.list)
        return response?.data;
    } catch (error:any) {
        // console.log(error?.message)
        throw new Error(error.response?.data?.message || error.message);
        // return []
    }
}

export const fetchRandom = async ({ id }: Id) => {
    try {
        const url = `${SERVER_BASE_URL}/random?id=${id}`;

        const resp = await axios.get(url);
        // console.log(resp.data)
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchHome = async () => {
    try {
        const url = `${SERVER_BASE_URL}/home`;

        const resp = await axios.get(url);
        // console.log(resp.data)
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchUpcoming = async ({ type = undefined, page = 1 }) => {
    try {
        let url = `${SERVER_BASE_URL}/upcoming-anime`;
        if (type) {
            url = `${SERVER_BASE_URL}/upcoming-anime/${type}?page=${page}`;
        }
        const resp = await axios.get(url);
        // console.log(resp.data)
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchSeasonalAnime = async ({ season, page = 1 }: Seasonal) => {
    try {
        const url = `${SERVER_BASE_URL}/season/${season}?page=${page}`;

        const resp = await axios.get(url);
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchRequestedAnime = async ({ page = 1 }) => {
    try {
        const url = `${SERVER_BASE_URL}/requested-list?page=${page}`;

        const resp = await axios.get(url);
        // console.log(resp.data)
        return resp.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const fetchChats = async ({ id, cursor = undefined }: chatQueryType) => {
    try {
        let url = `${SERVER_BASE_URL}/chats/${id}`;

        if (cursor) {
            url += `/${cursor}`;
        }
        const resp = await axios.get(url);
        // console.log(resp.data)
        return resp.data;
    } catch (error:any) {
      throw new Error(error.response?.data?.message || error.message);
    }
};

export const fetchReaction = async ({id}) => {
    try {
      const url = `${SERVER_BASE_URL}/reaction/${id}`;
  
      const resp = await axios.get(url);
      // console.log(resp.data)
      return resp.data;
    } catch (error:any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  