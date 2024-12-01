// ver1



// import React, { useState, useEffect } from "react";
// import "./App.css";
//
// const initialCoffeeDrinks = [
//     { id: 1, name: "Espresso", icon: "☕", price: 0 },
//     { id: 2, name: "Latte", icon: "🥛", price: 0 },
//     { id: 3, name: "Cappuccino", icon: "🍶", price: 0 },
//     { id: 4, name: "Americano", icon: "🫖", price: 0 },
//     { id: 5, name: "Mocha", icon: "🍫", price: 0 },
// ];
//
// function App() {
//     const [orderList, setOrderList] = useState([]);
//     const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
//     const [isLoaded, setIsLoaded] = useState(false);
//
//     useEffect(() => {
//         try {
//             const storedOrders = localStorage.getItem("orderList");
//             const storedDrinks = localStorage.getItem("coffeeDrinks");
//             if (storedOrders) {
//                 setOrderList(JSON.parse(storedOrders));
//             }
//             if (storedDrinks) {
//                 setCoffeeDrinks(JSON.parse(storedDrinks));
//             }
//         } catch (error) {
//             console.error("Ошибка при загрузке из Local Storage:", error);
//         } finally {
//             setIsLoaded(true);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (isLoaded) {
//             try {
//                 localStorage.setItem("orderList", JSON.stringify(orderList));
//                 localStorage.setItem("coffeeDrinks", JSON.stringify(coffeeDrinks));
//             } catch (error) {
//                 console.error("Ошибка при сохранении в Local Storage:", error);
//             }
//         }
//     }, [orderList, coffeeDrinks, isLoaded]);
//
//     const addDrink = (drink) => {
//         setOrderList((prevList) => {
//             const existingDrink = prevList.find((item) => item.id === drink.id);
//             if (existingDrink) {
//                 return prevList.map((item) =>
//                     item.id === drink.id ? { ...item, count: item.count + 1 } : item
//                 );
//             } else {
//                 return [...prevList, { ...drink, count: 1 }];
//             }
//         });
//     };
//
//     const setPrice = (drinkId) => {
//         const price = prompt("Введите цену для этого напитка:");
//         if (price !== null && !isNaN(price) && price >= 0) {
//             setCoffeeDrinks((prevDrinks) =>
//                 prevDrinks.map((drink) =>
//                     drink.id === drinkId ? { ...drink, price: parseFloat(price) } : drink
//                 )
//             );
//         } else if (price !== null) {
//             alert("Пожалуйста, введите корректное число!");
//         }
//     };
//
//     const removeDrink = (drinkId) => {
//         setOrderList((prevList) => {
//             return prevList
//                 .map((item) =>
//                     item.id === drinkId ? { ...item, count: item.count - 1 } : item
//                 )
//                 .filter((item) => item.count > 0);
//         });
//     };
//
//     const clearHistory = () => {
//         setOrderList([]);
//         localStorage.removeItem("orderList");
//     };
//
//     return (
//         <div className="app">
//             <div className="left-panel">
//                 {coffeeDrinks.map((drink) => (
//                     <button
//                         key={drink.id}
//                         className="drink-button"
//                         onClick={() => addDrink(drink)}
//                     >
//                         <div className="drink-content">
//                             <span className="icon">{drink.icon}</span>
//                             <span className="name">{drink.name}</span>
//                             <span className="price">(${drink.price || 0})</span>
//                         </div>
//                         <button
//                             className="set-price-button"
//                             onClick={(e) => {
//                                 e.stopPropagation(); // Останавливаем событие клика на родительской кнопке
//                                 setPrice(drink.id);
//                             }}
//                         >
//                             💲
//                         </button>
//                     </button>
//                 ))}
//             </div>
//
//             <div className="right-panel">
//                 <h1 className="title">Список заказов</h1>
//                 <div className="order-list">
//                     {orderList.map((order) => (
//                         <div key={order.id} className="order-item">
//                             <span>{order.icon}</span>
//                             <span>{order.name}</span>
//                             <span>x{order.count}</span>
//                             <span>${order.count * coffeeDrinks.find((d) => d.id === order.id).price}</span>
//                             <button
//                                 className="remove-button"
//                                 onClick={() => removeDrink(order.id)}
//                                 title="Уменьшить количество"
//                             >
//                                 🗑️
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="summary">
//                     Всего заказов: <strong>{orderList.reduce((sum, item) => sum + item.count, 0)}</strong>
//                 </div>
//                 <button className="clear-button" onClick={clearHistory}>
//                     Очистить историю
//                 </button>
//             </div>
//         </div>
//     );
// }
//
// export default App;



// ver 2

// import React, { useState, useEffect } from "react";
// import "./App.css";
//
// const initialCoffeeDrinks = [
//     { id: 1, name: "Espresso", icon: "☕" },
//     { id: 2, name: "Latte", icon: "🥛" },
//     { id: 3, name: "Cappuccino", icon: "🍶" },
//     { id: 4, name: "Americano", icon: "🫖" },
//     { id: 5, name: "Mocha", icon: "🍫" },
// ];
//
// function App() {
//     const [orderList, setOrderList] = useState([]);
//     const [currentOrder, setCurrentOrder] = useState([]);
//     const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
//     const [isSelecting, setIsSelecting] = useState(false);
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
//     const addDrinkToCurrentOrder = (drink, type) => {
//         const price = type === "floors" ? 10 : 20; // Цена: 10 для "Этажей", 20 для "Всех"
//         const label = type === "floors" ? " (Этажи)" : " (Все)";
//         setCurrentOrder((prevOrder) => {
//             const existingDrink = prevOrder.find(
//                 (item) => item.id === drink.id && item.label === label
//             );
//             if (existingDrink) {
//                 return prevOrder.map((item) =>
//                     item.id === drink.id && item.label === label
//                         ? { ...item, count: item.count + 1 }
//                         : item
//                 );
//             } else {
//                 return [
//                     ...prevOrder,
//                     { ...drink, count: 1, label, price },
//                 ];
//             }
//         });
//     };
//
//     const addCurrentOrderToOrderList = () => {
//         setOrderList((prevList) => [...prevList, currentOrder]);
//         setCurrentOrder([]);
//         setIsSelecting(false);
//     };
//
//     const calculateOrderTotal = (order) =>
//         order.reduce((total, item) => total + item.count * item.price, 0);
//
//     const calculateTotalCost = () =>
//         orderList.reduce((total, order) => total + calculateOrderTotal(order), 0);
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
//                         <h3>Выберите напитки:</h3>
//                         {coffeeDrinks.map((drink) => (
//                             <button
//                                 key={drink.id}
//                                 className="drink-button"
//                             >
//                                 <div className="drink-content">
//                                     <span className="icon">{drink.icon}</span>
//                                     <span className="name">{drink.name}</span>
//                                 </div>
//                                 <div className="button-actions">
//                                     <button
//                                         className="action-button for-floors"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             addDrinkToCurrentOrder(drink, "floors");
//                                         }}
//                                     >
//                                         Для Этажей
//                                     </button>
//                                     <button
//                                         className="action-button for-all"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             addDrinkToCurrentOrder(drink, "all");
//                                         }}
//                                     >
//                                         Для всех
//                                     </button>
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
//                             <span>Заказ {index + 1}</span>
//                             <select>
//                                 {order.map((item, idx) => (
//                                     <option key={idx}>
//                                         {item.name} {item.label} x{item.count}
//                                     </option>
//                                 ))}
//                             </select>
//                             <span>Стоимость: ${calculateOrderTotal(order)}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="summary">
//                     Общая стоимость всех заказов:{" "}
//                     <strong>${calculateTotalCost()}</strong>
//                 </div>
//
//                 {isSelecting && currentOrder.length > 0 && (
//                     <div className="current-order-summary">
//                         <h3>Текущий заказ:</h3>
//                         {currentOrder.map((item, index) => (
//                             <div key={index} className="current-order-item">
//                                 <span>{item.icon}</span>
//                                 <span>
//                             {item.name} {item.label}
//                         </span>
//                                 <span>x{item.count}</span>
//                                 <span>${item.count * item.price}</span>
//                             </div>
//                         ))}
//                         <div className="current-order-total">
//                             Итог: ${calculateOrderTotal(currentOrder)}
//                         </div>
//                         <button
//                             className="add-order-button"
//                             onClick={addCurrentOrderToOrderList}
//                         >
//                             Добавить заказ
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//
//     );
// }
//
// export default App;



// ver3

import React, { useState, useEffect } from "react";
import "./App.css";

const initialCoffeeDrinks = [
    {
        id: 1,
        name: "Espresso",
        icon: "☕",
        price: { floors: 10, all: 20 },
    },
    {
        id: 2,
        name: "Latte",
        icon: "🥛",
        price: { floors: 12, all: 24 },
    },
    {
        id: 3,
        name: "Cappuccino",
        icon: "🍶",
        price: { floors: 15, all: 30 },
    },
    {
        id: 4,
        name: "Americano",
        icon: "🫖",
        price: { floors: 8, all: 16 },
    },
    {
        id: 5,
        name: "Mocha",
        icon: "🍫",
        price: { floors: 18, all: 36 },
    },
];

function App() {
    const [orderList, setOrderList] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
    const [isSelecting, setIsSelecting] = useState(false);

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

    const addDrinkToCurrentOrder = (drink, type) => {
        const price = drink.price[type];
        const label = type === "floors" ? " (Этажи)" : " (Все)";
        setCurrentOrder((prevOrder) => {
            const existingDrink = prevOrder.find(
                (item) => item.id === drink.id && item.label === label
            );
            if (existingDrink) {
                return prevOrder.map((item) =>
                    item.id === drink.id && item.label === label
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            } else {
                return [
                    ...prevOrder,
                    { ...drink, count: 1, label, price },
                ];
            }
        });
    };

    const addCurrentOrderToOrderList = () => {
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
                        <h3>Выберите напитки:</h3>
                        {coffeeDrinks.map((drink) => (
                            <button
                                key={drink.id}
                                className="drink-button"
                            >
                                <div className="drink-content">
                                    <span className="icon">{drink.icon}</span>
                                    <span className="name">{drink.name}</span>
                                </div>
                                <div className="button-actions">
                                    <button
                                        className="action-button for-floors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addDrinkToCurrentOrder(drink, "floors");
                                        }}
                                    >
                                        Для Этажей
                                    </button>
                                    <button
                                        className="action-button for-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addDrinkToCurrentOrder(drink, "all");
                                        }}
                                    >
                                        Для всех
                                    </button>
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
                            <span>Заказ {index + 1}</span>
                            <select>
                                {order.map((item, idx) => (
                                    <option key={idx}>
                                        {item.name} {item.label} x{item.count}
                                    </option>
                                ))}
                            </select>
                            <span>Стоимость: ${calculateOrderTotal(order)}</span>
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
                    Общая стоимость всех заказов:{" "}
                    <strong>${calculateTotalCost()}</strong>
                </div>
                <button className="clear-history-button" onClick={clearOrderHistory}>
                    Очистить историю заказов
                </button>

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
            </div>
        </div>
    );
}

export default App;
