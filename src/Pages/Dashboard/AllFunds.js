import React from 'react'

function AllFunds({ data }) {
  return (
    <React.Fragment>
      <div>
        {data?.label}
      </div>
    </React.Fragment>
  )
}

export default AllFunds
