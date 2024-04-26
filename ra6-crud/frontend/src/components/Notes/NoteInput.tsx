import React from 'react';

export default class NoteInput extends React.Component<{ value: string; onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; onAdd: () => void; }> {
  render() {
    const { value, onChange, onAdd } = this.props;
    return (
      <div className='note-new'>
        <div style={{ marginBottom: '.5em' }}>New Note</div>
        <textarea
          className='content'
          rows={5}
          value={value}
          onChange={onChange}
        ></textarea>
        <button className='btn-send' onClick={onAdd}>➤</button>
      </div>
    );
  }
}
