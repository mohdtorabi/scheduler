import React from "react";
import "../Appointment/styles.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Confirm from "../Appointment/Confirm";
import Status from "../Appointment/Status";
import Form from "../Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"


export default function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    //console.log(name)
    const interview = {
      student: name,
      interviewer,
      
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    setTimeout(() => {
      transition(SHOW)
    }, 1000);
    
    
      
  }
  
  function deleteInt () {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    });
  }
    
        return (
          <article className="appointment">
            <Header time = {props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && (
            <Form 
              interviewers = {props.interviewers} 
              onCancel={() => back()}
              saving = {save}
              bookinterview= {props.bookinterview}
            />
            
            )}
            {mode === SAVING && (
            <Status
              message= "Saving"
            />
            )}
            {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer} 
              onDelete = {() => {transition('CONFIRM')}}
              onEdit={() => {transition('EDIT')}}
              />
            )}
            {mode === DELETING && (
            <Status
              message= "Deleting"
            />
            )}
            {mode === CONFIRM && (
              <Confirm
                message="Delete the appointment?"
                onCancel={back}
                onConfirm={deleteInt}
              />
            )}
            {mode === EDIT && (
            <Form 
              interviewers = {props.interviewers} 
              onCancel={() => back()}
              saving = {save}
              bookinterview= {props.bookinterview}
              name= {props.interview.student}
              interviewer= {props.interview.interviewer.id}
            />
            
            )}
            

          </article>
        )
       
}

