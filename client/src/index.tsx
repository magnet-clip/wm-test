import React from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

const getItems = (query) => {
  console.log(`Fetching [${query}]`);
  return axios
    .get(`${ITEMS_API_URL}?q=${query}`)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    }); 
};

const getItemsDebounced = lodash.debounce(getItems, DEBOUNCE_DELAY);

export default function Autocomplete() {
  const [fetching, setFetching] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const onTextChanged = (evt) => {
    const val = evt.target.value;
    console.log(val);
    setQuery(val);
    setFetching(true);

    const promise = getItemsDebounced(val);
    if (promise) {  
      promise.then(res => {
        console.log(res);
        setItems(res);
        setFetching(false);
      });
    } else {
      setItems([]);
      setFetching(false);
    }
  };
  
  const itemElements = items ? items.map(i => <a className="list-item">{i}</a>) : undefined;
  const listClasses = classnames({
      list: true,
      'is-hoverable': true,
      'is-loading': fetching
    });

  return (
    <div className="wrapper">
      <div className="control">
        <input type="text" className="input" value={query} onChange={onTextChanged}/>
      </div>
      {items && items.length > 0 &&
      <div className={listClasses}>
        {itemElements}
      </div>}
    </div>
  );
}
