import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE'; 
const EDIT = 'EDIT';
const ERROR_SAVING = 'ERROR_SAVING';
const ERROR_DELETING = 'ERROR_DELETING';


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVING, true))
  }

  function deleteAppointment() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETING, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
        message="Are you sure?"
        onConfirm={deleteAppointment}
        onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
        name={props.name ? props.name : props.interview.student}
        value={props.value? props.value : props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}

      {mode === DELETE && <Status message="DELETING..." />}
      {mode === SAVING && <Status message="SAVING..." />}

      {mode === ERROR_SAVING && (<Error message="Could not save" onClose={back} />)}
      {mode === ERROR_DELETING && (<Error message="Could not delete" onClose={back} />)}
    </article>
  );
}