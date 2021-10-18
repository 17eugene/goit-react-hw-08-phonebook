import AddForm from "../components/AddForm/AddForm";
import ContactList from "../components/ContactList/ContactList";
import Filter from "../components/Filter/Filter";

function ContactsView() {
  return (
    <>
      <Filter />
      <AddForm />
      <ContactList />
    </>
  );
}
export default ContactsView;
