export function getAppointmentsForDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter((d) => d.name === day);
  if (!filteredDays[0]) {
    return results;
  }
  for (const appointment of filteredDays[0].appointments) {
    results.push(state.appointments[appointment]);
  }
  return results;
}

export function getInterview(state, interview) {
  const results = {};
  if(interview) {
    results['student'] = interview.student;
    results['interviewer'] = state.interviewers[interview.interviewer];
  } else return null;
  return results;
}

export function getInterviewersForDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter((d) => d.name === day);
  if (!filteredDays[0]) {
    return results;
  }
  for (const interviewer of filteredDays[0].interviewers) {
    results.push(state.interviewers[interviewer]);
  }
  return results;
}
