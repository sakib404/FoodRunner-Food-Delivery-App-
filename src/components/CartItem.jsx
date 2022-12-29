import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {BiMinus, BiPlus} from "react-icons/bi";
import {useStateValue} from "../context/StateProvider";
import {actionType} from "../context/reducer";

const CartItem = ({item}) => {
    const id = item?.id;
    const [qty, setQty] = useState(item.qty);
    const [{cartItems}, dispatch] = useStateValue();

    const cartDispatch = (newItems) => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: newItems,
        });
        localStorage.setItem("cartItems", JSON.stringify(newItems));
    };

    const updateQty = (action) => {
        if(action === "add") {
            setQty(qty + 1);
        }else{
            if (qty === 1){
                setQty(0);
            }else{
                setQty(qty -1);
            }
        }
    };

    useEffect(() => {
        let newCartItems = [];

        for (const cItem of cartItems) {
            if (cItem.id === id) {
                if (qty === 0) {
                    continue
                }
                cItem.qty = qty;
            }
            newCartItems.push(cItem)
        }

        cartDispatch(newCartItems)
    }, [qty, item]);

    useEffect(() => {
        setQty(cartItems.filter(n => n.id === id)[0].qty)
    }, [cartItems])

    return (
        <div


            className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img
                src={item?.imageURL}
                className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                alt=""
            />

            {/* name section */}
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">{item?.title}</p>
                <p className="text-sm block text-gray-300 font-semibold">
                    BDT {parseFloat(item?.price) * qty}
                </p>
            </div>

            {/* button section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("remove", item?.id)}>
                    <BiMinus className="text-gray-50 "/>
                </motion.div>

                <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                    {qty}
                </p>

                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("add", item?.id)}>
                    <BiPlus className="text-gray-50 "/>
                </motion.div>
            </div>
        </div>
    );
}

export default CartItem;