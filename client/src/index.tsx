import React from "react";
import classnames from "classnames";
import { createRoot } from "react-dom/client";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

const ITEMS_API_URL = `${window.location.origin}/api/items`; //"https://example.com/api/items";
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

const getItems = (query: string): Promise<string[]> => {
  console.log(`Fetching [${query}]`);
  return axios
    .get(`${ITEMS_API_URL}?q=${query}`)
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      // console.error(error);
      return [];
    });
};

const getItemsDebounced = lodash.debounce(
  (query: string, resolve: (items: string[]) => void) =>
    getItems(query).then(resolve),
  DEBOUNCE_DELAY
);

function Autocomplete({
  onSelected,
}: {
  onSelected: (idx: number, name: string) => void;
}) {
  const [fetching, setFetching] = React.useState(false);
  const [items, setItems] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState("");
  const onTextChanged = (evt: any) => {
    const val = evt.target.value;
    console.log(val);
    setQuery(val);
    setFetching(true);

    getItemsDebounced(val, (res: string[]) => {
      // console.log(res);
      setItems(res);
      setFetching(false);
    });
  };

  const itemElements = items.map((item: string, idx: number) => (
    <a key={idx} className="list-item" onClick={() => onSelected(idx, item)}>
      {item}
    </a>
  ));

  const listClasses = classnames({
    list: true,
    "is-hoverable": true,
    "is-loading": fetching,
  });

  return (
    <div className="wrapper">
      <div className="control">
        <input
          type="text"
          className="input"
          value={query}
          onChange={onTextChanged}
        />
      </div>
      {items.length > 0 && <div className={listClasses}>{itemElements}</div>}
    </div>
  );
}

function Main() {
  const onItemSelected = (idx: number, name: string) =>
    console.log("Item selected", idx, name);
  return <Autocomplete onSelected={onItemSelected} />;
}

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Main />);
