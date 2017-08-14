App.InfoModal = React.createClass({

  clickSubmitProject (e) {
    e.preventDefault();
    $('#infoModal').closeModal({
      complete: function () {
        $('#submitModal').openModal()
      }
    });
  },

  clickPricingModel(e){
      e.preventDefault();
      $("#infoModal").closeModal({
        complete: function() {
          $("#pricingModal").openModal()
        }
      });
  },


  render ()
  {
    return (
      <div id='infoModal' className='modal'>
        <div className='modal-content'>
           <div className='section'>
            <div className='row center-align'>
              <h3>The directory of Bitcoin projects</h3>
              <p>
                List maintained by <a href='https://github.com/James-Sangalli' target='_blank'>James Sangalli</a>,
                Follow us on <a href='https://twitter.com/bitc0inprojects' target='_blank'>Twitter</a>
                , Interface by <a href='http://hitchcott.com' target='_blank'>Chris Hitchcott</a>
              </p>
            </div>
          </div>

          <div className='divider'></div>
            <div className='row'>
              <div className='col s12 m6'>
              <div className='section'>
                <h4>Status Color Key</h4>
                <p>The background of each Project shows a particular color depending on it&#39;s state:</p>
                <ul className='color-list'>
                  <li className='truncate light-green accent-3'>Live</li>
                  <li className='truncate green accent-2'>Working Prototype</li>
                  <li className='truncate amber'>Work In Progress</li>
                  <li className='truncate grey darken-2 white-text'>Stealth Mode</li>
                  <li className='truncate amber accent-1'>Concept</li>
                  <li className='truncate red darken-2 white-text'>On Hold</li>
                </ul>
                </div>
              </div>
              <div className='col s12 m6'>
                <div className='section'>
                  <h4>Submit / Update your Project</h4>
                  <p>
                    If you have authored a Bitcoin Project and would like to have it
                    added to <i>Bitcoin Projects</i>, please <a onClick={this.clickSubmitProject}
                    ref='submitModal' href='#'>click here to submit it for approval</a>.
                  </p>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="section">
                  <h4>Jump to the top of the list</h4>
                    <p>To get to the top of the list take a look here <a onClick={this.clickPricingModel}
                         ref="pricingModal" href="#"> at our pricing model</a>
                    </p>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="section">
                  <h4>Looking for Blockchain Developers?</h4>
                  <p>Email us at <a href="mailto:bitcoinsetupnz@gmail.com">bitcoinsetupnz@gmail.com</a></p>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }

});
