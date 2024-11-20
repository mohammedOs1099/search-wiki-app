import React from 'react'

export default function ErrorMassage({error}) {
    

    return (
      <>
        <div className="text-center text-danger">{error}</div>
      </>
    );
}
