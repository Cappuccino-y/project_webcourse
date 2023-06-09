import {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}
const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}
const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
            })
    }, [])

    const handleLogin = (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }
        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response))
                setNewNote('')
                console.log(response)
            }).catch(error => {
            console.log(error.response.data)
        })
    }
    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote).then(response => {
            setNotes(notes.map(note => note.id !== id ? note : response))
        }).catch(error => {
            setErrorMessage(
                `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setNotes(notes.filter(n => n.id !== id))
        })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
            <Footer/>
        </div>
    )
}

export default App