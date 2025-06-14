import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../actions/cartActions';

const initialState = {
    itemData: [],
    loading: false,
    error: null
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:{
            let found = false;
            const updatedItems = [];
            {console.log(state);}
            console.log("ADD_TO_CART action received", action.payload);
            state.itemData.forEach((item)=>
            {
                console.log("Heyy-->",item);
                if(item._id == action.payload._id)
                {

                    found = true;
                    updatedItems.push({
                        ...item,
                        count: item.count + 1
                    })
                }
                else
                {
                    updatedItems.push(item);
                }
            })
            if (!found) {
                console.log("add new item if not found");
                updatedItems.push({
                    ...action.payload,
                    count: 1
                }); // add new item if not found
                console.log("updatedItems:",updatedItems)
            }
           
            return{
                ...state,
                itemData: updatedItems
            } 
        }


        case REMOVE_FROM_CART :{
            let found = false;
            let updatedItems = [];
            state.itemData.forEach((item)=>
            {
                if(item._id == action.payload._id)
                {
                    found = true;
                    if(item.count > 1)
                    {
                        updatedItems.push({
                            ...item,
                            count: item.count - 1
                        })
                    }
                }
                else{
                    updatedItems.push(item);
                }
            })
            return {
                ...state,
                itemData: updatedItems
            };
        }
        default: {
            return state;
        }
    }
}
