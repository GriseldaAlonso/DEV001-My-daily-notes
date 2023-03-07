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
          <div id="notesContainer">
            <ShowNotes userUid={userUid} nameUser={nameUser} />
          </div>
      ) : (
        <p id="greeting">{nameUser}</p>
      )}
    </>
  );
}
