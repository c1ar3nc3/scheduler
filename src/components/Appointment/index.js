import React from "react";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment (props) {
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  function deleteInterview(id) {
    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
  };

  function confirmDelete() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header id={props.id} time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && props.interview && (<Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        onDelete={confirmDelete}
      />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteInterview}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
};