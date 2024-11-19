declare module 'db-stations-autocomplete' {
    // Define the structure of a station
    interface Station {
        id: string;         // Unique identifier for the station
        name: string;       // Name of the station
        type: string;       // Type of the station (e.g., 'stop', 'station')
        location: {
            latitude: number; // Latitude coordinate of the station
            longitude: number; // Longitude coordinate of the station
        };
    }

    // Define the structure of the autocomplete response
    interface AutocompleteResponse {
        stations: Station[]; // Array of stations returned by the autocomplete
    }

    // Define the options for the autocomplete function
    interface AutocompleteOptions {
        query: string;      // The search query for autocomplete
        limit?: number;     // Optional limit on the number of results
    }

    // Declare the autocomplete function
    export function autocomplete(options: AutocompleteOptions): Promise<AutocompleteResponse>;
}