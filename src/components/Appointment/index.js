import React from "react";
import "../Appointment/styles.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Confirm from "../Appointment/Confirm";
import Status from "../Appointment/Status";
import Form from "../Appointment/Form";
import Error from "../Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE"


export default function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
      
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW)
    })
    .catch(error => {
      transition(ERROR_SAVE, true)
    });
  }
  
  function deleteInt () {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(res => {
      transition(EMPTY)
    })
   .catch(error => transition(ERROR_DELETE, true));
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
            {mode === ERROR_SAVE && (
            <Error
              message= "Saving"
              onClose={back}
            />
            )}
            {mode === ERROR_DELETE && (
            <Error
              message= "Deleting"
              onClose={back}
            />
            )}
            

          </article>
        )
       
}

