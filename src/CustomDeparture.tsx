export interface Departure {
    id: string;
    line: {
        name: string;
    };
    direction: string;
    departureTime: string; // or Date, depending on how you want to handle it
}