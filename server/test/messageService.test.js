import { expect } from 'chai';
import sinon from 'sinon';
import db from '../models/db.js';
import messageService from '../services/messageService.js';
import { v4 as uuidv4 } from 'uuid';

describe('Message Service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should get messages from chat with pagination', async () => {
    const mockMessages = [{ id: '1', content: 'Hello', name: 'User', time: '2023-01-01T00:00:00Z' }];
    const dbStub = sinon.stub(db, 'query').resolves([mockMessages]);

    const result = await messageService.getMessagesFromChat('chat123', 10, 0);
    expect(dbStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockMessages);
  });

  it('should get messages from chat after a specific message ID', async () => {
    const mockMessages = [{ id: '2', content: 'Next message', name: 'User', time: '2023-01-02T00:00:00Z' }];
    const dbStub = sinon.stub(db, 'query').resolves([mockMessages]);

    const result = await messageService.getMessagesFromChatAfter('chat123', '1');
    expect(dbStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockMessages);
  });

  it('should return error if user does not exist', async () => {
    const dbStub = sinon.stub(db, 'query');

    dbStub.onCall(0).resolves([[]]);

    dbStub.onCall(1).resolves([[]]);

    const result = await messageService.sendMessage('chat123', 'nonexistentUser', 'Hi');
    expect(result.success).to.be.false;
    expect(result.message).to.equal("User doesn't exist");
  });

  it('should return error if chat does not exist', async () => {
    const dbStub = sinon.stub(db, 'query');

    dbStub.onCall(0).resolves([[]]);

    dbStub.onCall(1).resolves([[{ id: 'user123' }]]);

    dbStub.onCall(2).resolves([[]]);

    const result = await messageService.sendMessage('nonexistentChat', 'user123', 'Hi');
    expect(result.success).to.be.false;
    expect(result.message).to.equal("Chat doesn't exist");
  });

  it('should get all messages', async () => {
    const mockMessages = [{ id: '1', content: 'Hey', time: '2023-01-01T00:00:00Z' }];
    const dbStub = sinon.stub(db, 'query').resolves([mockMessages]);

    const result = await messageService.getAllMessages();
    expect(dbStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockMessages);
  });
});
