import { expect } from 'chai';
import sinon from 'sinon';
import db from '../models/db.js';
import textChatService from '../services/textChatService.js';
import { v4 as uuidv4 } from 'uuid';

describe('Text Chat Service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should get all text chats', async () => {
    const mockChats = [{ id: '1', name: 'Chat 1' }];
    const dbStub = sinon.stub(db, 'query').resolves([mockChats]);

    const result = await textChatService.getAllTextChats();
    expect(dbStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockChats);
  });

  it('should return chats with user when user exists', async () => {
    const dbStub = sinon.stub(db, 'query');

    dbStub.onCall(0).resolves([[{ id: 'user-uuid' }]]);

    const rows = [{ id: 'chat1', name: 'Group Chat', user_count: 3 }];
    dbStub.onCall(1).resolves([rows]);

    const result = await textChatService.getAllChatsWithUser('user-uuid');
    expect(result.success).to.be.true;
    expect(result.rows).to.deep.equal(rows);
  });

  it('should return DMs with user when user exists', async () => {
    const dbStub = sinon.stub(db, 'query');

    dbStub.onCall(0).resolves([[{ id: 'user-uuid' }]]);

    const rows = [{ id: 'chat2', name: 'Private DM', user_count: 2 }];
    dbStub.onCall(1).resolves([rows]);

    const result = await textChatService.getAllDMWithUser('user-uuid');
    expect(result.success).to.be.true;
    expect(result.rows).to.deep.equal(rows);
  });

});
