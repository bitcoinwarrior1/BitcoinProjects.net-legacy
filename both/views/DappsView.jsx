/* globals Session, ReactMeteorData */

App.initialBatchSize = 48
App.defaultSortDirection = -1 // descending sort by default
App.defaultSortType = 'last_update'

var chunkSize = 24 // must be % 12 == 0, how many blocks are added
var blocksInAdvance = 6 // if the browser is this close to the bottom we will load more

if (typeof Session !== 'undefined') {
  Session.set('searchQuery', '')
  Session.set('searchSortDirection', App.defaultSortDirection)
  Session.set('searchSortType', App.defaultSortType)
  Session.set('lastResult', App.initialBatchSize)
}

if (Meteor.isClient) {
  var $window = $(window)
}

App.DappsView = React.createClass({
  render () {
    return (
      <div id="content" className="company">
        <div id="content-inner" className="company-single sidebar-right">
          <div className="box-container">
            <div id="sidebar">
              <div id="company-page-contact-details">
                <div className="title">
                  <h2>Details</h2>
                </div>
                <table>
                  <tbody>
                  <tr className="detail">
                    <td className="detail-label">Name</td>
                    <td className="detail">Naminum</td>
                  </tr>


                  <tr className="detail">
                    <td className="detail-label">Website</td>
                    <td className="detail">
                      <a href="http://www.naminum.com/?startupstash" target="_blank">naminum.com</a></td>
                  </tr>
                  </tbody>
                </table>

              </div>
              <div id="one-image-banner">
                <a className="opacity" href=""></a>
              </div>
            </div>
            <div id="content-center">
              <div id="company-page-photo">
                <a target="_blank" href="http://www.naminum.com/?startupstash " title="Naminum">
                  <div className="opacity"></div>
                </a>
              </div>
              <div id="company-page-info">
                <div className="company-page-thumabnail-social">
                  <div className="company-page-thumabnail">
                    <a href="http://www.naminum.com/?startupstash " target="_blank"><img width="120" height="120"
                                                                                         src="http://ss.bladecdn.net/wp-content/uploads/2014/11/2.1.1naminum-150x150.png"
                                                                                         className="attachment-120x120 wp-post-image"
                                                                                         alt="2.1.1naminum"/></a>
                  </div>
                  <div className="company-page-social">
                    <ul className="social-links">
                      <li className="facebook"><a href="https://www.facebook.com/usenaminum" title="Facebook"
                                                  target="_blank"><i className="fa fa-facebook"></i></a></li>
                      <li className="twitter"><a href="https://twitter.com/naminum" title="Twitter" target="_blank"><i
                        className="fa fa-twitter fa-lg"></i></a></li>
                    </ul>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="company-page-info-description">
                  <div className="company-page-title">
                    <h1>Naminum</h1>
                  </div>
                  <div className="company-page-categories">
                    <a href="http://startupstash.com/naming/">Naming</a></div>
                  <div className="company-page-representation">
                    Discover a perfect company name
                  </div>
                  <div className="company-page-description">
                    Naminum is the leading startup, company and website name generator on the web.
                  </div>
                </div>
              </div>
              <div className="company-page-content">
                <div className="title">
                  <h2>About Naminum</h2>
                </div>
                <div className="company-page-body body">
                  <p className="p1">Naminum is a company, startup and website name generator designed to make your
                    namestorming&nbsp;sessions smoother. They want&nbsp;to be successful in providing you&nbsp;with THE
                    single name idea that leads you on the right path toward naming your product or company.</p>
                  <p className="p1">Enter a word and Naminum uses prefixes, suffixes and replaces letters within your
                    keyword to generate a (huge) list of name suggestions. Didn’t find a satisfactory name? Try with a
                    new word, transform the current one or&nbsp;generate random names for additional inspiration.</p>
                  <a href="http://www.naminum.com/?startupstash"
                     onclick="__gaTracker('send', 'event', 'outbound-article', 'http://www.naminum.com/?startupstash', 'NAMINUM.COM');"
                     className="button-default" target="_blank"><i className="fa fa-arrow-circle-right"></i>NAMINUM.COM</a>
                </div>
                <div className="company-page-categories">
                  <a href="http://startupstash.com/naming/">« View all in Naming</a></div>
              </div>

            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>

    )
  }
})

