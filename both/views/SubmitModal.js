App.SubmitModal = React.createClass({

  componentDidMount ()
  {
    $('input', this.refs.submissionForm.getDOMNode()).each(function () {
      let $this = $(this);
      $this.attr('length', $this.attr('maxlength')).characterCounter()
    })
  },

  render ()
  {
    return (
      <div id='submitModal' className='modal'>
        <div className='modal-content'>
          <div className='row slim-row center-align'>
            <h4>Submit your Bitcoin project</h4>
            <p>
              Email <a href='mailto:bitcoinsetupnz@gmail.com?
              subject=Bitcoin Project Submission&body=Please include your Project Name,
               Project Description, Organisation name, Website URL, Github URL,
                Software License (e.g. MIT) and Status: On Hold, Concept, Stealth mode,
                 Work in progress, Working Prototype or Live'
              target='_blank'>bitcoinsetupnz@gmail.com</a>
            </p>
              <p>with the following information: </p>
              <p><strong>Your Project Name, Project Description, Organisation name, Website URL, Github URL,
              Software License (e.g. MIT) and Status </strong>:
              </p>
              <p>1. On Hold </p>
              <p>2. Concept</p>
              <p>3. Stealth Mode </p>
              <p>4. Work In Progress </p>
              <p>5. Working Prototype </p>
              <p>6. Live </p>
        </div>
      </div>
    </div>
    )
  }

});
