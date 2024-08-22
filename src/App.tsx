import { useState } from "react";
import "./App.css";
import StoreItem from "./StoreItem/StoreItem";
import { storeItemType } from "./types/storeItem";
import { getStoreItemList } from "./Utils";

const storeItems: storeItemType[] = getStoreItemList();

const App = () => {
  const [nameSortDirection, setNameSortDirection] = useState(true);
  const [priceSortDirection, setPriceSortDirection] = useState(false);
  const [sortParam, setSortParam] = useState("name");
  const [search, setSearch] = useState("");

  const sortedItem = (): storeItemType[] => {
    return sortParam === "name"
      ? [...storeItems].sort((item1: storeItemType, item2: storeItemType) => {
          return nameSortDirection
            ? item1.name.localeCompare(item2.name)
            : item2.name.localeCompare(item1.name);
        })
      : [...storeItems].sort((item1: storeItemType, item2: storeItemType) => {
          return priceSortDirection
            ? item1.suggestedPrice - item2.suggestedPrice
            : item2.suggestedPrice - item1.suggestedPrice;
        });
  };

  return (
    <div className="App">
      <div className="App-content">
        <h1>ONLINE STORE ITEMS</h1>
        <div className="action">
          <input
            type="text"
            placeholder="Search Item Name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setNameSortDirection(!nameSortDirection);
              setSortParam("name");
            }}
          >
            {`Sort by Item Name - ${nameSortDirection ? "DESC" : "ASC"}`}
          </button>
          <button
            onClick={() => {
              setPriceSortDirection(!priceSortDirection);
              setSortParam("suggestedPrice");
            }}
          >
            {`Sort by Item Price - ${
              priceSortDirection ? "High to Low" : "Low to High"
            }`}
          </button>
        </div>
        <div className="grid-content">
          {sortedItem().filter((item: storeItemType) =>
            item.name.includes(search)
          ).length === 0 ? (
            <div className="noData">No Data Found</div>
          ) : (
            <>
              {sortedItem()
                .filter((item: storeItemType) => item.name.includes(search))
                .map((item: storeItemType) => (
                  <StoreItem key={item.id} storeItem={item} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
