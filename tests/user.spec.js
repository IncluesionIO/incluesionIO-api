const chai = require('chai')
const expect = chai.expect
const mongoose = require('mongoose')
const ValidationError = mongoose.Error.ValidationError

const User = require('../models/user.model')

describe('Testing User model', () => {
  let sampleUser, sampleUserAdmin

  beforeEach(() =>
  {
    sampleUser = {
      username: 'testUser1',
      password: 'testPassword1',
      name: 'Test User1',
      email: 'testEmail@incluesion.io',
      companyID: mongoose.Types.ObjectId()
    }

    sampleUserAdmin = {
      username: 'testUserAdmin1',
      password: 'testPassword12',
      name: 'Test UserAdmin1',
      email: 'adminTestEmail@incluesion.io',
      role: 'ADMIN',
      companyID: mongoose.Types.ObjectId()
    }
  })

  it('it should throw an error due to missing fields', (done) =>
  {
    let user = new User()
    
    user.validate((err) =>
    {
      expect(err.errors.username).to.exist
      expect(err.errors.password).to.exist
      expect(err.errors.name).to.exist
      expect(err.errors.email).to.exist
      //Role should be default
      expect(err.errors.role).to.not.exist
  
      done()
    })
  })


  it('it should successfully create the user', done =>
  {
    let user = new User(sampleUser)

    user.validate((err) =>
    {
      if(err)
      {
        const unexpectedFailureError = new Error('🔥🔥🔥Unexpected Failure🔥🔥🔥')
        done(unexpectedFailureError)
      }
      else {
        expect(user.username).to.equal(sampleUser.username)
        expect(user.password).to.equal(sampleUser.password)
        expect(user.name).to.equal(sampleUser.name)
        expect(user.email).to.equal(sampleUser.email)
        expect(user.role).to.equal('USER')
        done()
      }
    })
  })

  it('it should successfully create an admin user', done =>
  {
    let user = new User(sampleUserAdmin)

    user.validate((err) =>
    {
      if(err)
      {
        const unexpectedFailureError = new Error('🔥🔥🔥Unexpected Failure🔥🔥🔥')
        done(unexpectedFailureError)
      }
      else {
        expect(user.username).to.equal(sampleUserAdmin.username)
        expect(user.password).to.equal(sampleUserAdmin.password)
        expect(user.name).to.equal(sampleUserAdmin.name)
        expect(user.email).to.equal(sampleUserAdmin.email)
        expect(user.role).to.equal(sampleUserAdmin.role)
        done()
      }
    })
  })
})