import React from "react";

export const Card = ({name, id, url,hair_color,eye_color,gender}) => {

    return (

        <>
        <div className="container">
        <div className="row col-md-4">
        <div class="card" style={{width: '18rem'}}>
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <ul>
            <li>Gender: {gender}      </li>
            <li>Hair Color:{hair_color}</li>
            <li>Eye Color:{eye_color}</li>
            </ul>
        </p>
        <a href="#" class="btn btn-primary">Learn More!</a>
      </div>
    </div>
        </div>
        </div>
        
    </>
    )};
