// import {
//     ADD_TO_CART,
//     REMOVE_FROM_CART
// } from '../actions/cartActions';

// const initialState = {
//     itemData: [],
//     loading: false,
//     error: null
// }

// export const cartReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case ADD_TO_CART:{
//             let found = false;
//             const updatedItems = [];
//             {console.log(state);}
//             console.log("ADD_TO_CART action received", action.payload);
//             state.itemData.forEach((item)=>
//             {
//                 console.log("Heyy-->",item);
//                 if(item._id == action.payload._id)
//                 {

//                     found = true;
//                     updatedItems.push({
//                         ...item,
//                         count: item.count + 1
//                     })
//                 }
//                 else
//                 {
//                     updatedItems.push(item);
//                 }
//             })
//             if (!found) {
//                 console.log("add new item if not found");
//                 updatedItems.push({
//                     ...action.payload,
//                     count: 1
//                 }); // add new item if not found
//                 console.log("updatedItems:",updatedItems)
//             }
           
//             return{
//                 ...state,
//                 itemData: updatedItems
//             } 
//         }


//         case REMOVE_FROM_CART :{
//             let found = false;
//             let updatedItems = [];
//             state.itemData.forEach((item)=>
//             {
//                 if(item._id == action.payload._id)
//                 {
//                     found = true;
//                     if(item.count > 1)
//                     {
//                         updatedItems.push({
//                             ...item,
//                             count: item.count - 1
//                         })
//                     }
//                 }
//                 else{
//                     updatedItems.push(item);
//                 }
//             })
//             return {
//                 ...state,
//                 itemData: updatedItems
//             };
//         }

//         case "DECREASE_QTY": {
//             console.log("DECREASE_QTY action received", action.payload);
//             const targetId = String(action.payload._id ?? action.payload.id);
//             const updated = state.itemData
//                 .map(item => {
//                 if (String(item._id ?? item.id) !== targetId) return item;
//                 const current = Number(item.count) || 0;
//                 return { ...item, count: current - 1 };
//                 })
//                 .filter(item => item.count > 0);
//             return { ...state, itemData: updated };
//         }

//        case "REMOVE_ENTIRE_ITEM_FROM_CART": {
//             console.log("REMOVE_ITEM_FROM_CART action received", action.payload);

//             const targetId = String(action.payload._id ?? action.payload.id);

//             const updated = state.itemData.filter(
//                 (item) => String(item._id ?? item.id) !== targetId
//             );

//             return { ...state, itemData: updated };
//             }
//         default: {
//             return state;
//         }
//     }
// }


const initialState = {
    allCart:[],
    itemData: [],
    loading: false,
    error: null
}


export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_CART":{
            return{
                  ...state,
                loading: true
            }   
        }
        case "ADD_TO_CART_SUCCESS":{
            let updatedItems = action.payload;
            {console.log("state--->",state);}
            {console.log("updatedItems--->",updatedItems);}
            return{
                  ...state,
                itemData: updatedItems,
                loading: false
            }   
        }
        case "ADD_TO_CART_FAILURE":{
            
            return{
                  ...state,
                error: action.payload,
                loading: false
            }   
        }
        case "GET_CART":{
            return {
                ...state,
                loading: true
            }
        }
        case "GET_CART_SUCCESS":{
            console.log("cart fetch successful payload:", action.payload);
            return {
                ...state,
                allCart: action.payload,
                loading: false
            }
        }
        case "GET_CART_FAILURE":{
             return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        case "REMOVE_FROM_CART" :{
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

        case "DECREASE_QTY": {
            console.log("DECREASE_QTY action received", action.payload);
            const targetId = String(action.payload._id ?? action.payload.id);
            const updated = state.itemData
                .map(item => {
                if (String(item._id ?? item.id) !== targetId) return item;
                const current = Number(item.count) || 0;
                return { ...item, count: current - 1 };
                })
                .filter(item => item.count > 0);
            return { ...state, itemData: updated };
        }

       case "REMOVE_ENTIRE_ITEM_FROM_CART": {
            console.log("REMOVE_ITEM_FROM_CART action received", action.payload);

            const targetId = String(action.payload._id ?? action.payload.id);

            const updated = state.itemData.filter(
                (item) => String(item._id ?? item.id) !== targetId
            );

            return { ...state, itemData: updated };
            }
        default: {
            return state;
        }
    }
}
