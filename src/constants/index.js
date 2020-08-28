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

const SUCCESS_MESSAGE = {
  read: 'Successfully read',
  write: 'Successfully written',
  delete: 'Successfully deleted',
  update: 'Successfully updated'
};

module.exports = { tableName, orderedTableNames, ROLE, SUCCESS_MESSAGE };
