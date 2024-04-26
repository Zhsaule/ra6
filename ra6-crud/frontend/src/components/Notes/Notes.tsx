import React from 'react';
import axios from 'axios';
import NoteInput from './NoteInput';
import NotesList, { Note } from './NotesList';

const apiUrl = import.meta.env.VITE_API_URL;

interface State {
  notes: Note[];
  newNoteContent: string;
}

export default class Notes extends React.Component {
  state: State = {
    notes: [],
    newNoteContent: '',
  };

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    axios.get(`${apiUrl}/notes`)
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(error => console.error('Error fetching notes:', error));
  };

  handleAddNote = () => {
    const { newNoteContent } = this.state;
    axios.post(`${apiUrl}/notes`, { content: newNoteContent })
      .then(() => {
        this.setState({ newNoteContent: '' });
        this.fetchNotes();
      })
      .catch(error => console.error('Error adding note:', error));
  };

  handleDeleteNote = (id: number) => {
    axios.delete(`${apiUrl}/notes/${id}`)
      .then(() => {
        this.fetchNotes();
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  handleNoteContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newNoteContent: event.target.value });
  };

  render() {
    return (
      <div className='container'>
        <span className='header'>Notes</span>
        <NotesList notes={this.state.notes} onReload={this.fetchNotes} onDelete={this.handleDeleteNote} />
        <NoteInput value={this.state.newNoteContent} onChange={this.handleNoteContentChange} onAdd={this.handleAddNote} />
      </div>
    );
  }
}
