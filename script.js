'use strict';
const el=id=>document.getElementById(id);
let current=null;
function invalidate(){current=null;el('copy').disabled=true;el('download').disabled=true;el('caseCard').hidden=true;el('prompt').value='';text('charCount','');text('status','Settings changed. Generate a case to apply your selections.');}
function updateMode(){const advanced=el('mode').value==='advanced';el('notsign').disabled=!advanced;if(!advanced&&el('presentation').value.startsWith('Determined not to sign'))el('presentation').value='Natural variety';el('meetingTypeWrap').hidden=!advanced;el('finishAssignment').hidden=advanced;el('finishAdvanced').hidden=!advanced;el('mode-explainer').textContent=advanced?'Explore contested discipline, staff conflict, investigations, or termination without a required signature.':'For the course assignment: clear plan, specific follow-up and an unmistakable signed completion marker.';}
function text(id,s){el(id).textContent=s;}
function preferredFormat(platform){return platform==='copilot'?'mini':platform==='gemini'?'portable':'expanded';}
function updateFormatHelp(){
 const names={copilot:'Copilot',gemini:'Gemini',chatgpt:'ChatGPT',claude:'Claude'};
 const actual=el('format').value==='auto'?preferredFormat(el('platform').value):el('format').value;
 const descriptions={mini:'short (~2,400 characters)',portable:'standard (~4,900 characters)',expanded:'expanded (longer instructions)'};
 text('format-explainer',`${names[el('platform').value]}: ${descriptions[actual]}. Automatic uses a model-conscious default; choose Short if the chat rejects a prompt.`);
}
function generate(){try{
 const platform=el('platform').value;const format=el('format').value==='auto'?preferredFormat(platform):el('format').value;const opts={mode:el('mode').value,advancedType:el('advancedType').value,level:el('level').value,presentation:el('presentation').value,context:el('context').value,format,support:el('support').value,debrief:el('debrief').value};
 current=generateSimulation(opts);
 el('caseCard').hidden=false;text('caseType',opts.mode==='assignment'?'Corrective action assignment':'Advanced leadership practice');text('caseId',current.case.id);text('caseTitle',current.case.title);text('caseOrg',current.case.setting);text('caseEmployee',current.employee.name+' · '+(opts.mode==='assignment'?current.case.role:EMPLOYEE_ROLES[current.case.id]));text('caseIssue',current.case.issue);text('caseUnknown',current.case.complication);
 const u=el('caseEvidence');u.replaceChildren();for(const fact of current.case.facts){const li=document.createElement('li');li.textContent=fact;u.appendChild(li);}
 el('prompt').value=current.prompt;text('charCount',`${current.length.toLocaleString()} characters · ${platform==='copilot'?'Copilot':platform==='gemini'?'Gemini':platform==='chatgpt'?'ChatGPT':'Claude'} format: ${format}`+(Number.isFinite(current.limit)?` · target maximum ${current.limit.toLocaleString()}`:''));
 el('copy').disabled=false;el('download').disabled=false;
 text('status',`New ${opts.mode==='assignment'?'assignment':'advanced'} case generated for ${platform==='copilot'?'Copilot':platform==='gemini'?'Gemini':platform==='chatgpt'?'ChatGPT':'Claude'} (${format}). Copy the entire prompt.`);
 }catch(e){text('status','Could not generate this case. Try again.');console.error(e);}}
async function copyPrompt(){if(!current)return;try{await navigator.clipboard.writeText(current.prompt);}catch(err){el('promptDetails').open=true;el('prompt').select();const ok=document.execCommand('copy');if(!ok){text('status','Select the text in the preview and copy manually.');return;}}text('status','Complete prompt copied. Paste into a NEW conversation with your AI platform.');}
function downloadPrompt(){if(!current)return;const blob=new Blob([current.prompt],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`Leadership_Conversation_${current.case.id}_${current.case.kind}.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);text('status','Prompt saved as a text file.');}
for(const sel of document.querySelectorAll('select'))sel.addEventListener('change',()=>{invalidate();updateFormatHelp();});el('mode').addEventListener('change',updateMode);el('generate').addEventListener('click',generate);el('copy').addEventListener('click',copyPrompt);el('download').addEventListener('click',downloadPrompt);updateMode();updateFormatHelp();
