'use strict';
const EMPLOYEE_ROLES={L01:'Family Support Worker',L02:'Clinical Therapist',L03:'Outreach Specialist',L04:'Patient Navigator',L05:'Residential Counselor',L06:'Clinical Case Manager',L07:'School Social Worker',L08:'Data and Services Coordinator',L09:'Family Case Manager',L10:'Housing Navigator',L11:'Adult Services Case Manager',L12:'Residential Counselor',L13:'Client Services Specialist',L14:'Family Resource Navigator',L15:'Transport Coordinator',L16:'Housing Specialist',L17:'Intake Coordinator',L18:'Clinical Therapist',L19:'Youth Support Worker',L20:'Recovery Support Specialist',L21:'Family Support Specialist'};
const FIRST_NAMES=['Avery','Carmen','Devon','Ellis','Farah','Imani','Jamie','Jules','Kiran','Leah','Luis','Marisol','Maya','Morgan','Nadia','Noah','Priya','Quinn','Rafael','Robin','Sam','Skyler','Taylor','Terry','Zoe','Andre','Janelle','Sanjay','Darius','Elena','Keisha','Mateo','Talia','Ren','Mina','Amara'];
const LAST_NAMES=['Allen','Baker','Brown','Carter','Chavez','Chen','Davis','Fernandez','Green','Haddad','Hill','Jackson','Johnson','Kim','Lewis','Martin','Nguyen','Patel','Rivera','Robinson','Singh','Taylor','Thomas','Walker','Wilson','Young'];
const PRONOUNS=['she/her','he/him','they/them'];
const TENURES=['eight months','one year','two years','three years','five years','eight years','twelve years','eighteen years'];
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function shuffle(a){return [...a].sort(()=>Math.random()-.5);}
const usedCaseIds=new Set();
function randomCase(mode,advancedType){
 let pool=CASES.filter(c=>c.kind===mode&&(mode!=='advanced'||advancedType==='any'||c.type===advancedType));
 if(!pool.length)throw Error('No cases for these settings');
 let avail=pool.filter(c=>!usedCaseIds.has(c.id));
 if(!avail.length){for(const c of pool)usedCaseIds.delete(c.id);avail=pool;}
 const selected=pick(avail);usedCaseIds.add(selected.id);return selected;
}
function employeeProfile(preference){
 const p=preference==='Natural variety'?pick([PRESENTATIONS[0],PRESENTATIONS[0],...PRESENTATIONS.slice(1,-1)]):(PRESENTATIONS.find(x=>x.label===preference)||PRESENTATIONS[0]);
 const age=pick([23,26,28,31,33,35,38,41,44,47,52,56,61]);
 const tenureYears={'eight months':0.67,'one year':1,'two years':2,'three years':3,'five years':5,'eight years':8,'twelve years':12,'eighteen years':18};
 const tenureOptions=TENURES.filter(t=>tenureYears[t]<=Math.max(1,age-20));
 return {name:`${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,pronouns:pick(PRONOUNS),age,tenure:pick(tenureOptions),presentation:p,style:pick(STYLE),ordinary:pick(PERSONHOOD)};
}
function chosenContext(ctx){return LIFE_CONTEXT.find(x=>x.label===ctx)||LIFE_CONTEXT[0];}
function formatCase(caseData,employee){
 const supervisorRole=caseData.kind==='assignment'?`Supervisor (oversees ${caseData.role})`:caseData.role;
 const employeeRole=caseData.kind==='assignment'?caseData.role:(EMPLOYEE_ROLES[caseData.id]||'Program Specialist');
 return {supervisorRole,employeeRole,header:`Employee: ${employee.name} (${employee.pronouns}; age ${employee.age}; ${employee.tenure} in role)\nOrganization: ${caseData.setting}\nYour supervisor role: ${supervisorRole}\nEmployee position: ${employeeRole}\nMeeting: ${caseData.title}\nConcern: ${caseData.issue}`,evidence:caseData.facts.map((f,i)=>`${i+1}. ${f}`).join('\n')};
}
function completionText(mode){return mode==='assignment'?`ASSIGNMENT COMPLETION PROTOCOL:
The employee never signs merely to please the supervisor. A clear plan must include (a) specific expectations or steps, (b) a feasible timeframe/ownership, (c) support or barriers discussed as needed, and (d) a concrete follow-up. The employee's perspective must have genuinely been invited. Do not falsely claim resolution of important disagreement. If they understand and agree to a realistic plan, respond naturally, then show exactly:
[EMPLOYEE SIGNS THE CORRECTIVE ACTION PLAN]
SIMULATION COMPLETE — CORRECTIVE ACTION ASSIGNMENT
Save the complete transcript. Write your OWN reflection: what you did well and what you would refine.
If the user asks to conclude without this plan, remain in character and identify ONE actual unresolved detail; do not sign. On CHECK COMPLETION briefly step outside character and identify missing components without grading or inventing evidence. Return to role on the next normal message. On END MEETING, if requirements are incomplete, show MEETING NOT YET COMPLETE — REQUIRED ACTION PLAN MISSING and what is missing; the student can continue. Do not auto-end based on time, politeness or enthusiasm.`:`ADVANCED COMPLETION PROTOCOL:
No signature or agreement required. Termination cases involve a FINALIZED HR-reviewed decision as specified in the supervisor briefing; do not pretend it can be bargained away. Employee may object, grieve, refuse paperwork, request process clarification, or become upset. The leader determines when to close. At END MEETING, stop roleplay, state factual meeting outcome (including unresolved concerns and process steps), and show exactly:
SIMULATION COMPLETE — ADVANCED LEADERSHIP MEETING
Completion means the exercise ended, NOT that the meeting was handled well. Do not impose a signed plan. On CHECK COMPLETION briefly list the relevant closure tasks based on this meeting type: clarity of outcome, respectful handling of objections, necessary safety/process/HR next steps and follow-up; do not score. Return to role afterward. On DEBRIEF after completion give a short evidence-based review if requested.`;}
function supportText(value){if(value==='pause')return 'Remain employee except on COACH PAUSE. Then give one short observed-process suggestion without exposing private case information; wait for RESUME MEETING to return as employee. No unsolicited tips.';if(value==='guided')return 'After about every 4 supervisor turns give ONE clearly labeled outside-role coaching note about observed process, not case secrets. Keep the employee’s behavior independent of those hints.';return 'Stay employee-only until CHECK COMPLETION, END MEETING or authorized post-session command; do not coach or hint.';}
function debriefText(d){return d==='direct'?'If DEBRIEF is requested after the meeting, deliver candid evidence-based critique with concrete examples; no scores.':d==='brief'?'If DEBRIEF is requested after the meeting, give one strength and one meaningful improvement with specific evidence; no scores.':'If DEBRIEF is requested after the meeting, give a balanced evidence-based review of choices, effects, blind spots and an alternative; no scores.';}
const FORMAT={
 portable:(x)=>`SOCIAL-SERVICES EMPLOYEE MEETING — fictional educational roleplay
MODE: ${x.mode==='assignment'?'GRADED CORRECTIVE ACTION ASSIGNMENT':'ADVANCED LEADERSHIP PRACTICE'} | DIFFICULTY: ${x.level}

SUPERVISOR BRIEFING — FACTS KNOWN BEFORE MEETING
${x.caseText.header}
DOCUMENTED EVIDENCE / QUALIFICATIONS:
${x.caseText.evidence}
IMPORTANT UNCERTAINTY: ${x.case.complication}

EMPLOYEE CHARACTER (for portrayal, not an answer key):
${x.employee.presentation.label}: ${x.employee.presentation.rule}
Speaking style: ${x.employee.style}
Outside work: ${x.employee.ordinary}
Context: ${x.context.label}. ${x.context.rule}
Difficulty: ${RESISTANCE_LEVELS[x.level]}

ROLEPLAY: User is the supervisor, AI is ONLY ${x.employee.name}. First reply: present the SUPERVISOR BRIEFING accurately (same facts, no new allegations), then say “Ready when you are.” WAIT for the supervisor to open. Do not open the meeting yourself. Distinguish observed facts, reported accounts and unknowns. Privately create a coherent employee viewpoint consistent with the evidence; hold it steady across turns, disclosing relevant context naturally as the meeting unfolds. An employee can be warm, competent, upset, skeptical, or right about a systemic problem. No cartoon antagonism, automatic confession, unearned agreement, or sudden turnaround due to validation. Do not transform compassion into evidence, capacity, agreement or immediate behavior change. No new misconduct, diagnoses, disciplinary history or policy violations without basis. Do not treat leave, accommodation requests, grievances or policy questions as misconduct. Employee responses usually 1–5 ordinary sentences. Do not write the supervisor's dialogue or teach techniques mid-session.

PROCESS: Purpose, evidence, employee perspective, impact on employee/team/clients, ethics, fair investigation and follow-up matter. Do not feed the supervisor a script. Do not automatically present a completed plan. NASW ethics references need checking against the actual Code; NEVER invent standard numbers. If roleplay requires HR, accommodation, grievance or safety process, don't invent legal certainty: allow appropriate pause/referral.
SUPPORT: ${supportText(x.support)}
${completionText(x.mode)}
${debriefText(x.debrief)}
BEGIN with the supervisor briefing and wait.`,
 mini:(x)=>`FICTIONAL EMPLOYEE-SUPERVISOR ROLEPLAY. MODE: ${x.mode==='assignment'?'CORRECTIVE ACTION ASSIGNMENT':'ADVANCED LEADERSHIP'}; DIFFICULTY: ${x.level}.
SUPERVISOR FILE:
${x.caseText.header}
EVIDENCE:
${x.caseText.evidence}
UNCERTAINTY: ${x.case.complication}
EMPLOYEE: ${x.employee.presentation.label}. ${x.employee.style} ${x.context.label}: ${x.context.rule}

User = supervisor. AI = employee ${x.employee.name}. First answer: repeat only the supervisor file, say “Ready when you are,” and WAIT. Never invent evidence, diagnoses, policies or violations. Sustain one believable viewpoint. No coaching, automatic agreement, caricature, instant change, or forced emotional breakthrough. Questions can be challenged or misunderstood; empathy need not produce consent. The employee may have legitimate concerns about procedures, fairness and feasibility. Discuss documented facts as documented; rumors are not proven facts.
SUPPORT: ${supportText(x.support)}
${x.mode==='assignment'?'A genuine plan needs specifics, timeline, supports and follow-up; invite the employee’s perspective. Do not sign until a feasible agreed plan exists. If supervisor tries to finish early, ask a concrete unresolved question. Once plan exists, display [EMPLOYEE SIGNS THE CORRECTIVE ACTION PLAN] and SIMULATION COMPLETE — CORRECTIVE ACTION ASSIGNMENT. On CHECK COMPLETION name what remains, not a grade. END MEETING without agreement shows MEETING NOT YET COMPLETE — REQUIRED ACTION PLAN MISSING.':'No signature required. A finalized termination decision is not negotiable. On END MEETING show SIMULATION COMPLETE — ADVANCED LEADERSHIP MEETING and accurately state unresolved objections and next steps. CHECK COMPLETION provides task reminders, not grades.'}
No numerical scoring. Do not write the student's reflection.`,
 expanded:(x)=>`${FORMAT.portable(x)}

ADDITIONAL REALISM AND FAIRNESS RULES:
This employee has a real life and interests outside this concern. Keep ordinary interests, practical constraints, and interpersonal style independent. A persuasive manager may still have insufficient evidence. An employee can appear agreeable to avoid conflict while disagreeing with the plan. What they acknowledge, understand, accept and intend to do are four distinct things. Disagreeing with the manager is not, by itself, insubordination. Do not have the employee offer a complete corrective plan unprompted. Do not invent a legal rule to conclude the discussion. Make respectful language, specificity, fair process, safety and competence matter. Allow warmth and realism without therapeutic over-accommodation.

ASSIGNMENT RUBRIC ALIGNMENT: Purpose; perspective of both parties; concrete evidence; impacts on employee, organization/team, and clients; core agency values and NASW standards when genuinely relevant; problem-solving; jointly understood next steps and follow-up; student-authored reflection. Rubric categories inform evaluation outside the roleplay, not employee dialogue. Do not claim students met a criterion unless transcript supports it. For the graded assignment, the sign-off is symbolic and does not represent a legally binding document. No scoring engine is part of this simulator.

ADVANCED PRACTICE: A termination is a communication and administrative process, not a negotiation to secure emotional acceptance. A refusal to sign an acknowledgment does not necessarily invalidate notice. If the scenario says HR approved final termination, maintain that status and do not simulate reversing it. If facts are unverified, allow fact-finding or pausing disciplinary decisions instead of preemptively convicting an employee. Respond to escalation based on observed words, not theatrical threats. Serious safety concerns should trigger discussion of appropriate workplace safety procedures, not drama.

ENDING INTERPRETATION: The standardized completion text is only an educational transcript marker. Do not provide a letter grade or assume an ethically sound, procedurally sound encounter merely because the user typed END MEETING. Model the employee as an independent participant, not a completion service.\n`
};
function generateSimulation(opts){
 const c=randomCase(opts.mode,opts.advancedType||'any');
 const e=employeeProfile(opts.presentation);
 const context=opts.context==='Ordinary mix'?pick([LIFE_CONTEXT[0],LIFE_CONTEXT[0],LIFE_CONTEXT[0],LIFE_CONTEXT[0],...LIFE_CONTEXT.slice(1)]):chosenContext(opts.context);
 const contextObj={case:c,employee:e,context,caseText:formatCase(c,e),mode:opts.mode,level:opts.level,support:opts.support,debrief:opts.debrief};
 let prompt=FORMAT[opts.format](contextObj);
 const target=opts.format==='mini'?2400:(opts.format==='portable'?4900:Infinity);
 if(prompt.length>target&&opts.format==='portable'){
  // Shorten optional personhood detail, never the documented evidence or mode requirements.
  contextObj.employee.ordinary='Has interests and commitments outside work.';
  prompt=FORMAT.portable(contextObj);
 }
 if(prompt.length>target&&opts.format==='mini'){
  // A complete supervisor file and completion instructions take precedence over persona detail.
  contextObj.employee.style='Communicates naturally.';
  contextObj.context={label:context.label,rule:'Realistic constraints; no stereotypes.'};
  prompt=FORMAT.mini(contextObj);
 }
 return {prompt,case:c,employee:e,context:contextObj.context,length:prompt.length,limit:target};
}
