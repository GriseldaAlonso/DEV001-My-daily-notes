import './home.css';
import { useUserContext } from '../context/userContext'
import { FormForNotes } from '../components/formForNotes';

export default function Home () {
  const { User } = useUserContext();

  const nameUser = User.displayName;

  return (
    <>
    <p id='greeting'>Hello, {nameUser}</p>
    <FormForNotes />
    </>
  );
}
