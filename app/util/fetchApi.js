import fetcho from 'fetcho';

export const ORIGIN = process.env.ORIGIN || `http://localhost:${process.env.PORT || 3000}`;

const fetchApi = (endpoint, opts) => fetcho(`${ORIGIN}${endpoint}`, opts);

export default fetchApi;
