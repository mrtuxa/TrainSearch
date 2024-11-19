import React, { useState, useEffect } from "react";
import Station from "./Station";
import axios from "axios";
import StyledTextField from "./components/StyledTextField";

const SearchStations: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [stations, setStations] = useState<Station[]>([]);
    const [cache, setCache] = useState<{ [key: string]: Station[] }>({}); // Cache for stations

    const fetchStations = async (query: string) => {
        if (query) {
            // Check if the query exists in cache
            if (cache[query]) {
                setStations(cache[query]);
                return; // Return early if we have cached data
            }

            try {
                const response = await axios.get(`https://v6.db.transport.rest/stations?query=${query}`);
                const stationsData = response.data;

                // Convert the object into an array of stations
                let stationsArray: Station[] = Object.values(stationsData).map((station: any) => ({
                    id: station.id,
                    name: station.name,
                    latitude: station.location.latitude,
                    longitude: station.location.longitude,
                }));

                if (stationsArray.length === 0) {
                    const response = await axios.get(`https://v6.vbb.transport.rest/stations?query=${query}`);
                    const stationData = response.data;

                    stationsArray = Object.values(stationData).map((station: any) => ({
                        id: station.id,
                        name: station.name,
                        latitude: station.location.latitude,
                        longitude: station.location.longitude,
                    }));
                }

                // Update cache with the fetched stations
                setCache((prevCache) => ({
                    ...prevCache,
                    [query]: stationsArray,
                }));

                setStations(stationsArray);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        } else {
            setStations([]);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStations(inputValue);
        }, 300); // Debounce for 300ms
        return () => clearTimeout(delayDebounceFn); // Cleanup
    }, [inputValue]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="autocomplete">
            <div>
                <header className="p-4 flex justify-between items-center">
                    <i className="fas fa-bars"></i>

                    <StyledTextField
                        variant="outlined"
                        placeholder="Search for stations"
                        value={inputValue}
                        onChange={handleChange}
                        fullWidth
                    />
                    <i className="fas fa-sliders-h"></i>
                </header>
            </div>
            <ul style={{ background: 'inherit', color: 'inherit' }}>
                {stations.map((station) => (
                    <li key={station.id}>
                        {station.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchStations;