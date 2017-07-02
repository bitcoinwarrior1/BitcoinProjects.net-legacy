/* globals check, Match, Email, EJSON */

Meteor.methods({
  newSubmission: function (data) {
    // validate the data before emailing it out
    // TODO rate limit?
    let ShortString = Match.Where(function (x) {
      check(x, String)
      return x.length <= 128
    })

    check(data, {
      project_name: ShortString,
      description: ShortString,
      contact: ShortString,
      contact_email: ShortString,
      site: ShortString,
      reddit: ShortString,
      github: ShortString,
      license: ShortString,
      tags: ShortString,
      status: ShortString
    })

    data.timestamp = new Date().toLocaleString()

    if (Meteor.isServer) {
      App.cols.Queue.insert(data)

      Email.send({
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        replyTo: data.contact_email,
        subject: `New Bitcoin Project Submitted - ${data.project_name}`,
        text: `The project needs to be approved and added manually:\n\n ${JSON.stringify(data, null, 2)}`
      })
    }
  }
})
