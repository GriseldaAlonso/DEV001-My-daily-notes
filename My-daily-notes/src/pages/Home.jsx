import "./home.css";
import { useUserContext } from "../context/userContext";
import { FormForNotes } from "../components/formForNotes";
import ShowNotes from "../components/stickNotes";

export default function Home() {
  const { User } = useUserContext();
  let nameUser;
  let userUid;
  if (User !== undefined && User !== null) {
    nameUser = User.displayName;
    userUid = User.uid;
  } else {
    nameUser = "Loading...";
  }

  return (
    <>
      {User !== null ? (
        <>
          <p id="greeting">Hello, {nameUser}</p>
          <div id="mainContainer">
            <FormForNotes userUid={userUid}/>
            <div id="notesContainer">
              <h1>Notes</h1>
              <ShowNotes userUid={userUid}/>
            </div>
          </div>
        </>
      ) : (
        <p id="greeting">{nameUser}</p>
      )}
    </>
  );
}
