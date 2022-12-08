import React from "react";
import InterviewListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types'; 

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {Object.keys(props.interviewers).map((key)=> { 
          return (
          <InterviewListItem
          key={props.interviewers[key].id}
          name={props.interviewers[key].name}
          avatar={props.interviewers[key].avatar}
          selected={props.interviewers[key].id === props.value}
          setInterviewer={() => props.onChange(props.interviewers[key].id)}
        />
        )})}
      </ul>
    </section>

  );
};


