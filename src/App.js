// import React, { useState, useEffect } from "react";
// import "./App.css";
// import {Modal} from "./Modal";
//
// const initialCoffeeDrinks = [
//     {
//         id: 1,
//         name: "Espresso",
//         icon: "☕",
//     },
//     {
//         id: 2,
//         name: "Latte",
//         icon: "🥛",
//     },
//     {
//         id: 3,
//         name: "Cappuccino",
//         icon: "🍶",
//     },
//     {
//         id: 4,
//         name: "Americano",
//         icon: "🫖",
//     },
//     {
//         id: 5,
//         name: "Mocha",
//         icon: "🍫",
//     },
// ];
//
// const initialAdditions = [
//     { id: 1, name: "Корица", price: 1 },
//     { id: 2, name: "Сироп", price: 1 },
//     { id: 3, name: "Спешелти кофе", price: 1 },
// ];
//
// function App() {
//     const [orderList, setOrderList] = useState([]);
//     const [currentOrder, setCurrentOrder] = useState([]);
//     const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
//     const [additions, setAdditions] = useState(initialAdditions);
//     const [isSelecting, setIsSelecting] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedDrink, setSelectedDrink] = useState(null);
//
//     useEffect(() => {
//         try {
//             const storedOrders = localStorage.getItem("orderList");
//             if (storedOrders) {
//                 setOrderList(JSON.parse(storedOrders));
//             }
//         } catch (error) {
//             console.error("Ошибка при загрузке из Local Storage:", error);
//         }
//     }, []);
//
//     useEffect(() => {
//         try {
//             localStorage.setItem("orderList", JSON.stringify(orderList));
//         } catch (error) {
//             console.error("Ошибка при сохранении в Local Storage:", error);
//         }
//     }, [orderList]);
//
//     const startOrder = () => {
//         setIsSelecting(true);
//         setCurrentOrder([]);
//     };
//
//     const openModal = (drink) => {
//         setSelectedDrink(drink);
//         setIsModalOpen(true);
//     };
//
//     const handleConfirmOrder = (type, volume, selectedAdditions) => {
//         addDrinkToCurrentOrder(selectedDrink, type, volume, selectedAdditions);
//         setIsModalOpen(false);
//     };
//
//     const addDrinkToCurrentOrder = (drink, type, volume, additions) => {
//         const price =
//             volume === "M"
//                 ? type === "floors"
//                     ? 10
//                     : 20
//                 : type === "floors"
//                     ? 15
//                     : 25;
//
//         const additionsPrice = additions.reduce((total, add) => total + add.price, 0);
//
//         setCurrentOrder((prevOrder) => {
//             const existingDrink = prevOrder.find(
//                 (item) => item.id === drink.id && item.label === `${type} (${volume})`
//             );
//             if (existingDrink) {
//                 return prevOrder.map((item) =>
//                     item.id === drink.id && item.label === `${type} (${volume})`
//                         ? {
//                             ...item,
//                             count: item.count + 1,
//                             price: price + additionsPrice,
//                             additions,
//                         }
//                         : item
//                 );
//             } else {
//                 return [
//                     ...prevOrder,
//                     {
//                         ...drink,
//                         count: 1,
//                         price: price + additionsPrice,
//                         label: `${type} (${volume})`,
//                         additions,
//                     },
//                 ];
//             }
//         });
//     };
//
//     const addCurrentOrderToOrderList = () => {
//         if (currentOrder.length === 0) {
//             alert("Вы не выбрали напитков!");
//             return;
//         }
//         setOrderList((prevList) => [...prevList, currentOrder]);
//         setCurrentOrder([]);
//         setIsSelecting(false);
//     };
//
//     const removeOrder = (indexToRemove) => {
//         setOrderList((prevList) => prevList.filter((_, index) => index !== indexToRemove));
//     };
//
//     const calculateOrderTotal = (order) =>
//         order.reduce((total, item) => total + item.count * item.price, 0);
//
//     const calculateTotalCost = () =>
//         orderList.reduce((total, order) => total + calculateOrderTotal(order), 0);
//
//     const clearOrderHistory = () => {
//         setOrderList([]);
//     };
//
//     return (
//         <div className="app">
//             <div className="left-panel">
//                 {!isSelecting ? (
//                     <button className="start-order-button" onClick={startOrder}>
//                         Сформировать заказ
//                     </button>
//                 ) : (
//                     <>
//                         {isSelecting && currentOrder.length > 0 && (
//                             <div className="current-order-summary">
//                                 <h3>Текущий заказ:</h3>
//                                 {currentOrder.map((item, index) => (
//                                     <div key={index} className="current-order-item">
//                                         <span>{item.icon}</span>
//                                         <span>
//                                     {item.name} {item.label}
//                                 </span>
//                                         <span>x{item.count}</span>
//                                         <span>${item.count * item.price}</span>
//                                     </div>
//                                 ))}
//                                 <div className="current-order-total">
//                                     Итог: ${calculateOrderTotal(currentOrder)}
//                                 </div>
//                                 <button
//                                     className="add-order-button"
//                                     onClick={addCurrentOrderToOrderList}
//                                 >
//                                     Добавить заказ
//                                 </button>
//                             </div>
//                         )}
//                         <h3>Выберите напитки:</h3>
//                         {coffeeDrinks.map((drink) => (
//                             <button
//                                 key={drink.id}
//                                 className="drink-button"
//                                 onClick={() => openModal(drink)}
//                             >
//                                 <div className="drink-content">
//                                     <span className="icon">{drink.icon}</span>
//                                     <span className="name">{drink.name}</span>
//                                 </div>
//                             </button>
//                         ))}
//                     </>
//                 )}
//             </div>
//
//             <div className="right-panel">
//                 <h1 className="title">Список заказов</h1>
//                 <div className="order-list">
//                     {orderList.map((order, index) => (
//                         <div key={index} className="order-item">
//                             <span>{index + 1}</span>
//                             <select>
//                                 {order.map((item, idx) => (
//                                     <option key={idx}>
//                                         {item.name} {item.label} x{item.count}
//                                     </option>
//                                 ))}
//                             </select>
//                             <span>${calculateOrderTotal(order)}</span>
//                             <button
//                                 className="delete-order-button"
//                                 onClick={() => removeOrder(index)}
//                             >
//                                 Удалить
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="summary">
//                     Общая стоимость всех заказов:{" "}
//                     <strong>${calculateTotalCost()}</strong>
//                 </div>
//                 <button className="clear-history-button" onClick={clearOrderHistory}>
//                     Очистить историю заказов
//                 </button>
//
//
//             </div>
//
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onConfirm={handleConfirmOrder}
//                 drink={selectedDrink}
//                 additions={additions}
//             />
//         </div>
//     );
// }
//
// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import { Modal } from "./Modal";

const initialCoffeeDrinks = [
    {
        id: 1,
        name: "Espresso",
        icon: "☕",
        prices: {
            floors: { M: 1, L: 2 },
            all: { M: 3, L: 4 },
        },
    },
    {
        id: 2,
        name: "Latte",
        icon: "🥛",
        prices: {
            floors: { M: 5, L: 6 },
            all: { M: 7, L: 8 },
        },
    },
    {
        id: 3,
        name: "Cappuccino",
        icon: "🍶",
        prices: {
            floors: { M: 10, L: 15 },
            all: { M: 20, L: 25 },
        },
    },
    {
        id: 4,
        name: "Americano",
        icon: "🫖",
        prices: {
            floors: { M: 10, L: 15 },
            all: { M: 20, L: 25 },
        },
    },
    {
        id: 5,
        name: "Mocha",
        icon: "🍫",
        prices: {
            floors: { M: 10, L: 15 },
            all: { M: 20, L: 25 },
        },
    },
];

const initialAdditions = [
    { id: 1, name: "Корица", price: 1 },
    { id: 2, name: "Сироп", price: 1 },
    { id: 3, name: "Спешелти кофе", price: 1 },
];

function App() {
    const [orderList, setOrderList] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
    const [additions, setAdditions] = useState(initialAdditions);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);

    useEffect(() => {
        try {
            const storedOrders = localStorage.getItem("orderList");
            if (storedOrders) {
                setOrderList(JSON.parse(storedOrders));
            }
        } catch (error) {
            console.error("Ошибка при загрузке из Local Storage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("orderList", JSON.stringify(orderList));
        } catch (error) {
            console.error("Ошибка при сохранении в Local Storage:", error);
        }
    }, [orderList]);

    const startOrder = () => {
        setIsSelecting(true);
        setCurrentOrder([]);
    };

    const openModal = (drink) => {
        setSelectedDrink(drink);
        setIsModalOpen(true);
    };

    const handleConfirmOrder = (type, volume, selectedAdditions) => {
        addDrinkToCurrentOrder(selectedDrink, type, volume, selectedAdditions);
        setIsModalOpen(false);
    };

    const addDrinkToCurrentOrder = (drink, type, volume, additions) => {
        const price = drink.prices[type][volume];
        const additionsPrice = additions.reduce((total, add) => total + add.price, 0);

        setCurrentOrder((prevOrder) => {
            const existingDrink = prevOrder.find(
                (item) => item.id === drink.id && item.label === `${type} (${volume})`
            );
            if (existingDrink) {
                return prevOrder.map((item) =>
                    item.id === drink.id && item.label === `${type} (${volume})`
                        ? {
                            ...item,
                            count: item.count + 1,
                            price: price + additionsPrice,
                            additions,
                        }
                        : item
                );
            } else {
                return [
                    ...prevOrder,
                    {
                        ...drink,
                        count: 1,
                        price: price + additionsPrice,
                        label: `${type} (${volume})`,
                        additions,
                    },
                ];
            }
        });
    };

    const addCurrentOrderToOrderList = () => {
        if (currentOrder.length === 0) {
            alert("Вы не выбрали напитков!");
            return;
        }
        setOrderList((prevList) => [...prevList, currentOrder]);
        setCurrentOrder([]);
        setIsSelecting(false);
    };

    const removeOrder = (indexToRemove) => {
        setOrderList((prevList) => prevList.filter((_, index) => index !== indexToRemove));
    };

    const calculateOrderTotal = (order) =>
        order.reduce((total, item) => total + item.count * item.price, 0);

    const calculateTotalCost = () =>
        orderList.reduce((total, order) => total + calculateOrderTotal(order), 0);

    const clearOrderHistory = () => {
        setOrderList([]);
    };

    return (
        <div className="app">
            <div className="left-panel">
                {!isSelecting ? (
                    <button className="start-order-button" onClick={startOrder}>
                        Сформировать заказ
                    </button>
                ) : (
                    <>
                        {isSelecting && currentOrder.length > 0 && (
                            <div className="current-order-summary">
                                <h3>Текущий заказ:</h3>
                                {currentOrder.map((item, index) => (
                                    <div key={index} className="current-order-item">
                                        <span>{item.icon}</span>
                                        <span>
                                            {item.name} {item.label}
                                        </span>
                                        <span>x{item.count}</span>
                                        <span>${item.count * item.price}</span>
                                    </div>
                                ))}
                                <div className="current-order-total">
                                    Итог: ${calculateOrderTotal(currentOrder)}
                                </div>
                                <button
                                    className="add-order-button"
                                    onClick={addCurrentOrderToOrderList}
                                >
                                    Добавить заказ
                                </button>
                            </div>
                        )}
                        <h3>Выберите напитки:</h3>
                        {coffeeDrinks.map((drink) => (
                            <button
                                key={drink.id}
                                className="drink-button"
                                onClick={() => openModal(drink)}
                            >
                                <div className="drink-content">
                                    <span className="icon">{drink.icon}</span>
                                    <span className="name">{drink.name}</span>
                                </div>
                            </button>
                        ))}
                    </>
                )}
            </div>

            <div className="right-panel">
                <h1 className="title">Список заказов</h1>
                <div className="order-list">
                    {orderList.map((order, index) => (
                        <div key={index} className="order-item">
                            <span>{index + 1}</span>
                            <select>
                                {order.map((item, idx) => (
                                    <option key={idx}>
                                        {item.name} {item.label} x{item.count}
                                    </option>
                                ))}
                            </select>
                            <span>${calculateOrderTotal(order)}</span>
                            <button
                                className="delete-order-button"
                                onClick={() => removeOrder(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
                <div className="summary">
                    Общая стоимость всех заказов: <strong>${calculateTotalCost()}</strong>
                </div>
                <button className="clear-history-button" onClick={clearOrderHistory}>
                    Очистить историю заказов
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmOrder}
                drink={selectedDrink}
                additions={additions}
            />
        </div>
    );
}

export default App;
