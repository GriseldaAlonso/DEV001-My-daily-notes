import "./home.css";
import { useUserContext } from "../context/userContext";
import { FormForNotes } from "../components/formForNotes";
import ShowNotes from "../components/stickNotes";

export default function Home() {
  const { User } = useUserContext();
  let nameUser;
  if (User !== null) {
    nameUser = User.displayName;
  } else {
    nameUser = "Loading...";
  }

  return (
    <>
      {User !== null ? (
        <p id="greeting">Hello, {nameUser}</p>
      ) : (
        <p id="greeting">{nameUser}</p>
      )}
      <div id="mainContainer">
        <FormForNotes />
        <div id="notesContainer">
          <h1>Notes</h1>
          <ShowNotes />
        </div>
      </div>
    </>
  );
}
