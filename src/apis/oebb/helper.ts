import axios from 'axios';
import {AuthResponse} from "../../AuthResponse";
import {Params} from "../../Params";

const version = "1.0.0";

export const auth = async () => {
    const { body } = await got.get('https://tickets-mobile.oebb.at/api/domain/v4/init', { responseType: 'json' })
    return body
}

export const createGet = (auth: AuthResponse) => async (url: string, params?: Params): Promise<any> => {
    const { accessToken, sessionId } = auth;

    try {
        const response = await axios.get(url, {
            headers: {
                sessionId,
                AccessToken: accessToken,
                'User -Agent': `oebb-hafas ${version}`, // Ensure `version` is defined in your context
            },
            params, // Axios automatically serializes the params to query string
        });
        return response.data; // Return the response data directly
    } catch (error) {
        // Handle error appropriately
        console.error('Error during GET request:', error);
        throw error; // Rethrow the error or handle it as needed
    }
};