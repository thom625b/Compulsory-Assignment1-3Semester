import {useState} from "react";


// @ts-ignore
export default function SearchBar({onSearch, searchOptions, disabled}){
    const [searchCategory, setSearchCategory] = useState("all");
    const [searchParam, setSearchParam] = useState("");


    const handleSearch = () => {
        if (!disabled) {
            onSearch({category: searchCategory, param: searchParam});
        }
    };


    return(
        <>
        <div className="flex items-center border rounded-md bg-gray-700 p-2 max-w-lg w-96">
            <div className="relative">
                <select
                    className="bg-gray-700 text-white px-4 py-2 p-2 border-r focus: outline-none w-40"
                    value={searchCategory}
                    onChange={(event) => setSearchCategory(event.target.value)}
                    >
                    {searchOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <input
            type="text"
            className="bg-gray-700 text-white flex-1 px-4 py-2 focus: outline-none w-32"
            placeholder="Search ..."
            value={searchParam}
            onChange={(event) => setSearchParam(event.target.value)}
            />
            <button className="bg-blue-500 px-4 py-2 text-whiter rounded-md hover: bg-gray-600"
                    onClick={handleSearch}
                    >
                🔍
            </button>
        </div>
        </>
    );
}