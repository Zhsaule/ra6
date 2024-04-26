import React from 'react';

export interface Note {
  id: number;
  content: string;
}

export default class NotesList extends React.Component<{ notes: Note[]; onReload: () => void; onDelete: (id: number) => void; }> {
  render() {
    const { notes, onReload, onDelete } = this.props;
    return (
      <>
        <button className='btn-reload' onClick={onReload}>⇅</button>
        {notes.map(note => (
          <div className='note' key={note.id}>
            <pre>{note.content}</pre>
            <button className='btn-close' onClick={() => onDelete(note.id)}>x</button>
          </div>
        ))}
      </>
    );
  }
}