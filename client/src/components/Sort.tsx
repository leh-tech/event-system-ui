import { SortWrapper } from 'helpers/types';
import React from 'react';

// Compare function needed by the Sort component
function compare(a: any, b: any): number {
    //     // you can access the relevant property like this a.props[by]
    //     // depending whether you are sorting by tilte or year, you can write a compare function here, 
    return a - b;
}

const Sort = ({ children, by }: SortWrapper) => {
    if (!by) {
        // If no 'sort by property' provided, return original list
        return children
    } else {
        return React.Children.toArray(children).sort(compare);
    }



}

export default Sort;