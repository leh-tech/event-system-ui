import './App.scss';
import AppNavbar from "./components/Navbar";
import Container from 'react-bootstrap/Container';
import EventsSection from 'EventsSection';
import AddEvent from 'components/AddEvent';

function App() {
  return (
    <main className="App">
      <header className="mb-2">
        <AppNavbar />
      </header>
      <Container fluid >
       <EventsSection></EventsSection>
      </Container>
    </main>
  );
}

export default App;
