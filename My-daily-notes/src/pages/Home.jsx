import './home.css';
import { useUserContext } from '../context/userContext'
import { FormForNotes } from '../components/formForNotes';

export default function Home () {
  const { user } = useUserContext();

  const nameUser = user.displayName;

  return (
    <>
    <p id='greeting'>Hello, {nameUser}</p>
    <FormForNotes />
    </>
  );
}
