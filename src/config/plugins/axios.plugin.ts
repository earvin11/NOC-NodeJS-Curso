import axios from 'axios';


export const HttpClinet = {
    get: async(url: string) => {
        const { data } = await axios.get(url);
        return data;
    }
}