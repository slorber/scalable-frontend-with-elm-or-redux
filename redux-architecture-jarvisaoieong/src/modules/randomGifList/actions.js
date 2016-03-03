export const CREATE = 'CREATE_RANDOMGIFLIST';
export const MODIFY = 'MODIFY_RANDOMGIFLIST';

export const create = (topic) => ({
  type: CREATE,
  topic
});

export const modify = (id, action) => ({
  type: MODIFY,
  id,
  action,
});
