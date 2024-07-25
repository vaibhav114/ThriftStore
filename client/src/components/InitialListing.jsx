import React from 'react'
import { Link } from 'react-router-dom'

const InitialListing = ({props}) => {
  return (
    <div className='max-w-96 border mb-10 mt-4'>
        <div>
            <Link to={`/items/book/${props._id}`}>
            <div>
                    {props.photos && (
                        <div className="min-h-[470px] max-h-[470px] flex max-w-86  justify-center"  key={props._id}>
                          <img
                            className="w-full object-cover"
                            alt="img not found"
                            src={"http://localhost:5000/" + props.photos[0]}
                            />
                        </div>
                      )}
            </div>
            <div className="flex justify-between ml-6 mr-6 mt-3 text-lg">
          <h1 className="tracking-wider  font-bold">{props.iname}</h1>
          <h2 className="">{props.itype}</h2>
        </div>
        <div className="flex  gap-4 ml-6 mr-6 mb-3 mt-1 text-lg" >
        <h2>${props.imrp}</h2>
        <h3>{props.isize}</h3>
      </div>
        </Link>
        </div>
    </div>
  )
}


export default InitialListing