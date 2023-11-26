import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./components/Pages/Registration";
import Login from "./components/Pages/Login";
import Welcome from "./components/Pages/Welcome";
import Profile from "./components/Pages/Profile";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import ForgotPassword from "./components/Pages/ForgotPassword";
import AddExpense from "./components/AddExpense";

function App() {
  const [isExpense, setIsExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-http-62209-default-rtdb.firebaseio.com/expense.json"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const loadexpenses = [];
        for (const key in data) {
          loadexpenses.push({
            id: key,
            category: data[key].category,
            description: data[key].description,
            price: data[key].price,
            date: data[key].date,
          });
          setExpenses(loadexpenses);
        }
      } else {
        alert("Error");
      }
    } catch (e) {
      console.log(e);
      alert("Error while fetching data from database", e);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpenses = async (expense) => {
    console.log("add");
    try {
      const response = await fetch(
        "https://react-http-62209-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      alert("Error while storing expense to database");
    }

    fetchExpenses();
  };
  const editExpenses = async (expense, id) => {
    console.log("edit", expense);
    console.log("edit", id);
    try {
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      alert("Error while updating expense to database");
    }
    setEditId(null);

    fetchExpenses();
  };
  const showExpenseForm = () => {
    setIsExpense(true);
  };
  const closeExpenseForm = () => {
    setIsExpense(false);
  };

  const editIdHandler = (id) => {
    setEditId(id);
    console.log(id);
    console.log(id.category);
  };
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {authCtx.isLoggedIn && (
            <Route
              path="/"
              element={
                <Welcome
                  showExpenseForm={showExpenseForm}
                  expenses={expenses}
                  fetchExpenses={fetchExpenses}
                  editIdHandler={editIdHandler}
                />
              }
            />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/profile" element={<Profile />} />
          )}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
      {isExpense && (
        <AddExpense
          addExpenses={addExpenses}
          closeExpenseForm={closeExpenseForm}
          editExpenses={editExpenses}
          editId={editId}
        />
      )}
    </Fragment>
  );
}

export default App;
