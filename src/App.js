import React, { useState, useEffect } from "react";
import "./App.css";

const initialCoffeeDrinks = [
    { id: 1, name: "Espresso", icon: "☕", price: 0 },
    { id: 2, name: "Latte", icon: "🥛", price: 0 },
    { id: 3, name: "Cappuccino", icon: "🍶", price: 0 },
    { id: 4, name: "Americano", icon: "🫖", price: 0 },
    { id: 5, name: "Mocha", icon: "🍫", price: 0 },
];

function App() {
    const [orderList, setOrderList] = useState([]);
    const [coffeeDrinks, setCoffeeDrinks] = useState(initialCoffeeDrinks);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedOrders = localStorage.getItem("orderList");
            const storedDrinks = localStorage.getItem("coffeeDrinks");
            if (storedOrders) {
                setOrderList(JSON.parse(storedOrders));
            }
            if (storedDrinks) {
                setCoffeeDrinks(JSON.parse(storedDrinks));
            }
        } catch (error) {
            console.error("Ошибка при загрузке из Local Storage:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("orderList", JSON.stringify(orderList));
                localStorage.setItem("coffeeDrinks", JSON.stringify(coffeeDrinks));
            } catch (error) {
                console.error("Ошибка при сохранении в Local Storage:", error);
            }
        }
    }, [orderList, coffeeDrinks, isLoaded]);

    const addDrink = (drink) => {
        setOrderList((prevList) => {
            const existingDrink = prevList.find((item) => item.id === drink.id);
            if (existingDrink) {
                return prevList.map((item) =>
                    item.id === drink.id ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevList, { ...drink, count: 1 }];
            }
        });
    };

    const setPrice = (drinkId) => {
        const price = prompt("Введите цену для этого напитка:");
        if (price !== null && !isNaN(price) && price >= 0) {
            setCoffeeDrinks((prevDrinks) =>
                prevDrinks.map((drink) =>
                    drink.id === drinkId ? { ...drink, price: parseFloat(price) } : drink
                )
            );
        } else if (price !== null) {
            alert("Пожалуйста, введите корректное число!");
        }
    };

    const removeDrink = (drinkId) => {
        setOrderList((prevList) => {
            return prevList
                .map((item) =>
                    item.id === drinkId ? { ...item, count: item.count - 1 } : item
                )
                .filter((item) => item.count > 0);
        });
    };

    const clearHistory = () => {
        setOrderList([]);
        localStorage.removeItem("orderList");
    };

    return (
        <div className="app">
            <div className="left-panel">
                {coffeeDrinks.map((drink) => (
                    <button
                        key={drink.id}
                        className="drink-button"
                        onClick={() => addDrink(drink)}
                    >
                        <div className="drink-content">
                            <span className="icon">{drink.icon}</span>
                            <span className="name">{drink.name}</span>
                            <span className="price">(${drink.price || 0})</span>
                        </div>
                        <button
                            className="set-price-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Останавливаем событие клика на родительской кнопке
                                setPrice(drink.id);
                            }}
                        >
                            💲
                        </button>
                    </button>
                ))}
            </div>

            <div className="right-panel">
                <h1 className="title">Список заказов</h1>
                <div className="order-list">
                    {orderList.map((order) => (
                        <div key={order.id} className="order-item">
                            <span>{order.icon}</span>
                            <span>{order.name}</span>
                            <span>x{order.count}</span>
                            <span>${order.count * coffeeDrinks.find((d) => d.id === order.id).price}</span>
                            <button
                                className="remove-button"
                                onClick={() => removeDrink(order.id)}
                                title="Уменьшить количество"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
                <div className="summary">
                    Всего заказов: <strong>{orderList.reduce((sum, item) => sum + item.count, 0)}</strong>
                </div>
                <button className="clear-button" onClick={clearHistory}>
                    Очистить историю
                </button>
            </div>
        </div>
    );
}

export default App;
