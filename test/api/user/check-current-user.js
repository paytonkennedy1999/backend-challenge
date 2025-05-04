let should
let agent

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('check-current-user', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should allow the user to update only their own record', async () => {
        const updatePayload = {
          firstName: 'Jack'
        }

        const res = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .send(updatePayload)
          .expect(200)
          .promise()

        should.exist(res)
        res.should.have.property('id', globalAuth.user)
        res.should.have.property('firstName', updatePayload.firstName)
      })

      it('should fail if a user tries to update someone else\'s record', async () => {
        const otherUserId = 'some-other-user-id'
        const updatePayload = {
          firstName: 'Hacker Attempt'
        }

        await agent
          .client()
          .put(`/user/${otherUserId}`)
          .set('authorization', globalAuth.token)
          .send(updatePayload)
          .expect(403)
          .promise()
      })
    })
  })
})
