import React, {useState, useEffect} from "react";
import Station from "./Station";
import axios from "axios";
import StyledTextField from "./components/StyledTextField";
import {createClient} from 'hafas-client'
import {profile} from 'hafas-client/p/db/index'
const SearchStations: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [stations, setStations] = useState<Station[]>([]);
    const [departures, setDepartures] = useState<any[]>([]); // State for departures
    const [selectedStations, setSelectedStations] = useState<Station[]>([]);


    const fetchStations = async (query: string) => {
        if (query) {
            try {
                const response = await axios.get(`https://v6.db.transport.rest/stations?query=${query}`);
                const stationsData = response.data;

                // Convert the object into an array of stations
                const stationsArray: Station[] = Object.values(stationsData).map((station: any) => ({
                    id: station.id,
                    name: station.name,
                    latitude: station.location.latitude,
                    longitude: station.location.longitude,
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
        setInputValue(e.target.value)
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
            <ul style={{ background: 'inherit', color: 'inherit'}}>
                {stations.map((station) => (
                    <li key={station.id}>
                        {station.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchStations;