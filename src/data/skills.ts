export type SkillStatus = 'used' | 'learning';
export type SkillGroup = 'frontend' | 'backend' | 'mobile' | 'tools';
export type Skill = {name: string; status: SkillStatus; group: SkillGroup};
export const skills: Skill[] = [
  {name:'HTML',group:'frontend',status:'used'}, {name:'CSS',group:'frontend',status:'used'},
  {name:'JavaScript',group:'frontend',status:'used'}, {name:'Next.js',group:'frontend',status:'used'},
  {name:'React',group:'frontend',status:'learning'}, {name:'TypeScript',group:'frontend',status:'learning'},
  {name:'Tailwind CSS',group:'frontend',status:'learning'},
  {name:'PHP',group:'backend',status:'used'}, {name:'Laravel',group:'backend',status:'used'},
  {name:'MySQL',group:'backend',status:'used'},
  {name:'Android Java',group:'mobile',status:'used'}, {name:'Flutter',group:'mobile',status:'learning'},
  {name:'Figma',group:'tools',status:'used'}, {name:'Canva',group:'tools',status:'used'},
  {name:'Git',group:'tools',status:'used'}, {name:'GitHub',group:'tools',status:'used'},
  {name:'VS Code',group:'tools',status:'used'}, {name:'Affinity',group:'tools',status:'learning'}
];
