import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';

export default function Graphs() {
  const [profile, setGraphs] = useState(null);

  useEffect(() => {
    setTimeout( async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await res.json();
      setGraphs(data);
    }, 4000)
  })


  return (
    <div className='graphs'>
      <h2>Graphs</h2>

      {!profile && (
        <div>
          <Skeleton height={200} />
          <br />
          <br />
          <Skeleton height={300} />
        </div>
      )}

      {profile && (
        <div className='graph'>
          <h3>{profile.username}</h3>
          <p>{profile.email}</p>
          <a href={profile.website}>{profile.website}</a>
        </div>
      )}
    </div>
  )
}
