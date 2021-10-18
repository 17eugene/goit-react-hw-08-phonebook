// import React, { useState, useEffect } from "react";
// import shortid from "shortid";
import { Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AppBar from "./components/AppBar/AppBar";
import ContactsView from "./views/ContactsView";
import RegisterView from "./views/RegisterView/RegisterView";
import LoginView from "./views/LoginView/LoginView";
import authOperations from "./redux/auth/auth-operations";

import authSelectors from "./redux/selectors/auth-selector";

import PrivateRouter from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const refreshedStatus = useSelector(authSelectors.getRefreshedStatus);

  useEffect(() => {
    dispatch(authOperations.refreshCurrentUser());
  }, [dispatch]);
  // useEffect(() => {
  //   // localStorage.setItem("contacts", JSON.stringify(contacts));
  //   const parsedData = JSON.parse(localStorage.getItem("contacts"));
  //   if (parsedData) {
  //     setContacts(parsedData);
  //   } else {
  //     return;
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // });

  return (
    !refreshedStatus && (
      <div>
        <AppBar />

        <Switch>
          <PrivateRouter path="/contacts">
            <ContactsView />
          </PrivateRouter>

          <PublicRoute path="/signup" restricted>
            <RegisterView />
          </PublicRoute>

          <PublicRoute path="/login" restricted>
            <LoginView />
          </PublicRoute>
        </Switch>
      </div>
    )
  );
}

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       contacts: [
//         { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//         { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//         { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//         { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//       ],
//       filter: "",
//     };
//   }

//   componentDidMount() {
//     const parsedData = JSON.parse(localStorage.getItem("contacts"));
//     if (parsedData) {
//       this.setState({ contacts: parsedData });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = (data) => {
//     //data - объект, состоящий из имени номера, которые прокинули из формы.
//     let newContact = {
//       id: shortid.generate(),
//       ...data,
//     };

//     if (
//       this.state.contacts.find(
//         (contact) =>
//           contact.number === data.number ||
//           contact.name.toLowerCase() === data.name.toLowerCase()
//       )
//     ) {
//       alert("Contact already exist!");
//       return;
//     }

//     this.setState((prevState) => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   deleteContact = (contactId) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== contactId
//       ),
//     }));
//   };

//   filterChange = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFiltredContacts = () => {
//     const normalized = this.state.filter.toLowerCase();

//     return this.state.contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(normalized)
//     );
//   };

//   render() {
//     let filtredContacts = this.getFiltredContacts();
//     return (
//       <div>
//         <AddForm submitHandler={this.formSubmitHandler} />
//         <Filter value={this.state.filter} onChange={this.filterChange} />
//         <ContactList
//           contacts={filtredContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

export { App };
