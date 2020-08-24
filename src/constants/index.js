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

module.exports = { tableName, orderedTableNames };
