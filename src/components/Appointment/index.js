import React from "react";
import "../Appointment/styles.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";




export default function Appointment (props) {
   console.log(props)
    if(props.interview) {
        return (
          <article className="appointment">
            <Header time = {props.time}/>
            <Show student = { props.interview && props.interview.student} interviewer = { props.interview && props.interview.interviewer.name}/>
          </article>
        )
      }else {
        return (
          <article className="appointment">
            <Header time = {props.time}/>
            <Empty />
          </article>
        )
      }
   
  
}

