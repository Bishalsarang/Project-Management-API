const tableName = {
  users: 'users',
  projects: 'projects',
  comments: 'comments',
  tags: 'tags',
  members: 'members',
  tasks: 'tasks'
};

const orderedTableNames = [
  tableName.tags,
  tableName.comments,
  tableName.tasks,
  tableName.members,
  tableName.projects,
  tableName.users
];

const ROLE = {
  admin: 'admin',
  projectManager: 'project_manager',
  engineer: 'engineer',
  teamLeader: 'team_leader'
};

module.exports = { tableName, orderedTableNames, ROLE };
