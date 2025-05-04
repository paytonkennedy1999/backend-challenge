let should
let agent

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('save-and-list-notes', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()

        await agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({
            userId: globalAuth.user,
            title: 'Test Note',
            message: 'This is a test note.'
          })
          .expect(201)
          .promise()
      })

      it('should allow the user to list their own notes', async () => {
        const res = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()

        should.exist(res)
        res.should.be.an.Array()
        res.length.should.be.above(0)
        res[0].should.have.property('title', 'Test Note')
        res[0].should.have.property('message', 'This is a test note.')
      })

      it('should fail if a user tries to list someone else\'s notes', async () => {
        const otherUserId = 'some-other-user-id'

        await agent
          .client()
          .get(`/user/${otherUserId}/notes`)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should fail to save a note without a title', async () => {
        await agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({ message: 'Missing title' })
          .expect(422)
          .promise()
      })
    })
  })
})
