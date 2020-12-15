import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    props.onCancel()
  } 
  const [error, setError] = useState("");
  const saving = () => {
    setName(name)
    setInterviewer(interviewer)
    
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(name, interviewer)
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input    text--semi-bold"
            name="name"
            onChange= {(event) => setName(event.target.value)}
            data-testid="student-name-input"
            value= {name}
            type="text"
            placeholder="Enter Student Name"
            
          />
          
        </form>
          <section className="appointment__validation">       {error}
          </section>
          <InterviewerList 
            interviewers={props.interviewers}    
            value={interviewer} 
            onChange={setInterviewer} 
          />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick= {cancel}>Cancel</Button>
          <Button confirm onClick= {saving}>Save</Button>
        </section>
      </section>
    </main>
      )
}