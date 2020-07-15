import React from 'react';

export default function Username(props) {
  const updateUsername = value => {
    return props.dispatch({
      type: 'UPDATE_USERNAME',
      username: value
    });
  }

  return (
    <div className="field has-addons">
      <p className="control">
        <input 
          className="input" 
          type="text" 
          name="username" 
          id="username" 
          onChange={e => updateUsername(e.target.value)} 
          value={props.username} />
      </p>
      <p className="control">
        <a className="button is-static">
          @creditkey.com
        </a>
      </p>
    </div>
  )
}
