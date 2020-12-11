import React from "react";
import "../Appointment/styles.scss";
import {getInterviewersForDay} from "../../helpers/selectors"
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Form from "../Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
        return (
          <article className="appointment">
            <Header time = {props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && (
            <Form 
              interviewers = {props.interviewers} 
              onCancel={() => back()}
            />
            
            )}
            {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
            )}
          </article>
        )
       
}

