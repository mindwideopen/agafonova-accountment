
import React, { useState, useEffect } from "react";
import "./App.css";
import {Modal} from "./Modal";

const initialCoffeeDrinks = [
    { id: 1, name: "Espresso", icon: "☕", price: { floors: { M: 10, L: 15 }, all: { M: 20, L: 25 } } },
    { id: 2, name: "Latte", icon: "🥛", price: { floors: { M: 10, L: 15 }, all: { M: 20, L: 25 } } },
    { id: 3, name: "Cappuccino", icon: "🍶", price: { floors: { M: 10, L: 15 }, all: { M: 20, L: 25 } } },
    { id: 4, name: "Americano", icon: "🫖", price: { floors: { M: 10, L: 15 }, all: { M: 20, L: 25 } } },
    { id: 5, name: "Mocha", icon: "🍫", price: { floors: { M: 10, L: 15 }, all: { M: 20, L: 25 } } },
];

const initialAddOns = [
    { id: 1, name: "Корица", price: 1 },
    { id: 2, name: "Сироп", price: 1 },
    { id: 3, name: "Спешелти кофе", price: 1 },
];

function App() {
    const [orderList, setOrderList] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const showModal = (drink) => {
        setSelectedDrink(drink);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedDrink(null);
        setModalVisible(false);
    };

    const addDrinkToCurrentOrder = (drinkDetails) => {
        setCurrentOrder((prevOrder) => [...prevOrder, drinkDetails]);
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
        order.reduce((total, item) => total + item.totalPrice, 0);

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
                        {initialCoffeeDrinks.map((drink) => (
                            <button
                                key={drink.id}
                                className="drink-button"
                                onClick={() => showModal(drink)}
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
                            <span>Заказ {index + 1}</span>
                            <select>
                                {order.map((item, idx) => (
                                    <option key={idx}>
                                        {item.name} {item.label} x{item.count} +{item.addOnsPrice}$
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
                    Общая стоимость всех заказов: <strong>${calculateTotalCost()}</strong>
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
                                <span>{item.name} {item.label}</span>
                                <span>x{item.count}</span>
                                <span>${item.totalPrice}</span>
                            </div>
                        ))}
                        <div className="current-order-total">
                            Итог: ${calculateOrderTotal(currentOrder)}
                        </div>
                        <button className="add-order-button" onClick={addCurrentOrderToOrderList}>
                            Добавить заказ
                        </button>
                    </div>
                )}
            </div>

            {modalVisible && (
                <Modal
                    drink={selectedDrink}
                    addDrinkToCurrentOrder={addDrinkToCurrentOrder}
                    closeModal={closeModal}
                    addOns={initialAddOns}
                />
            )}
        </div>
    );
}

export default App;
