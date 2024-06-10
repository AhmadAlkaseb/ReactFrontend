import { PRODUCTION_API_BASE_URL, LOCAL_API_BASE_URL } from '../utils/globalVariables'

//med callback... Dette er også en HOF
const fetchItems = async (url, callback) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching items from ${url}`);
        const data = await response.json();
        callback(data);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllItemsForSale = async (callback) => {
    await fetchItems(`${LOCAL_API_BASE_URL}/items`, callback);
};

export const getItemById = async (itemid) => {
    try {
        const response = await fetch(`${LOCAL_API_BASE_URL}/items/${itemid}`);
        if(!response.ok) throw new Error(`Error fetching all items from ${LOCAL_API_BASE_URL}`);

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}



// export const getAllItemsForSale = async () => {
//     try {
//         const response = await fetch(`${LOCAL_API_BASE_URL}/items`);
//         if(!response.ok) throw new Error(`Error fetching all items from ${LOCAL_API_BASE_URL}`);
//
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const getItemById = async (itemid) => {
//     try {
//         const response = await fetch(`${LOCAL_API_BASE_URL}/items/${itemid}`);
//         if(!response.ok) throw new Error(`Error fetching all items from ${LOCAL_API_BASE_URL}`);
//
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }



