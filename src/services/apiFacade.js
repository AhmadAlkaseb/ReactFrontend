import { PRODUCTION_API_BASE_URL, LOCAL_API_BASE_URL } from '../utils/globalVariables'

export const getAllItemsForSale = async () => {
    try {
        const response = await fetch(`${PRODUCTION_API_BASE_URL}/items`);
        if(!response.ok) throw new Error(`Error fetching all items from ${PRODUCTION_API_BASE_URL}`);
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getItemById = async (itemid) => {
    try {
        const response = await fetch(`${PRODUCTION_API_BASE_URL}/items/${itemid}`);
        if(!response.ok) throw new Error(`Error fetching all items from ${PRODUCTION_API_BASE_URL}`);
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
