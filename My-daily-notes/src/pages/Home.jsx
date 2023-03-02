import "./home.css";
import { useUserContext } from "../context/userContext";
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
          <div id="firstLevel">
            <p id="greeting">Hello, {nameUser}</p>
            <h1 id="mainTitle">Notes</h1>
          </div>
          <div id="notesContainer">
            <ShowNotes userUid={userUid} />
          </div>
        </>
      ) : (
        <p id="greeting">{nameUser}</p>
      )}
    </>
  );
}
