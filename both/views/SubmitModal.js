App.SubmitModal = React.createClass({

  handleSubmit (e) {
    e.preventDefault()
    if (this.refs.antiSpam.getDOMNode().value !== '42') {
      window.alert('You failed the spam filter test.')
    } else {
      let dataObj = {}
      let $thisForm = $(this.refs.submissionForm.getDOMNode())
      $thisForm.serializeArray().forEach(function(item, i) {
        dataObj[item.name] = item.value
      })
      Meteor.call('newSubmission', dataObj, function(err) {
        if (err) {
          window.alert(err)
        } else {
          window.alert('Thank you. Your submission will be reviewed.')
          $thisForm[0].reset()
          $(this.getDOMNode()).closeModal()
        }
      })
    }
  },

  componentDidMount () {
    $('input', this.refs.submissionForm.getDOMNode()).each(function () {
      let $this = $(this)
      $this.attr('length', $this.attr('maxlength')).characterCounter()
    })
  },

  render () {
    return (
      <div id='submitModal' className='modal'>
        <div className='modal-content'>
          <div className='row slim-row center-align'>
            <h4>Submit your Bitcoin project</h4>
            <p>
              Email <a href='mailto:bitcoinsetupnz@gmail.com?subject=Bitcoin Project Submission&body=Please include your Project Name, Project Description, Organisation name, Website URL, Github URL, Software License (e.g. MIT) and Status: Abandoned, on hold, Stealth mode, Concept, Work in progress, Demo, Working Prototype or Live'
              target='_blank'>bitcoinsetupnz@gmail.com</a>
            </p>
              <p>with the following information: </p>
              <p><strong>Your Project Name, Project Description, Organisation name, Website URL, Github URL,
              Software License (e.g. MIT) and Status </strong>:
              </p>
              <p>1. Abandoned </p>
              <p>2. On Hold </p>
              <p>3. Stealth Mode </p>
              <p>4. Concept </p>
              <p>5. Work In Progress </p>
              <p>6. Demo </p>
              <p>7. Working Prototype </p>
              <p>8. Live </p>
        </div>
      </div>
    </div>
    )
  }

})
