import React, { useState } from "react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Orange" },
        { id: 4, name: "Grapes" },
        { id: 5, name: "Watermelon" }
    ]);

    // Filter items based on the search query
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 border-gray-300 rounded p-2"
            />
            <ul>
                {filteredItems.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
