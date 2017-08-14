App.PricingModal = React.createClass({

    render()
    {
        return(
            <div id="pricingModal" className="modal">
                <div className="modal-content">
                   <div className="row slim-row center-align">
                        <h3>Get the most attention at the top of the list</h3>
                        <p>To get into the top 4 places on this site for a week (in the default sorting order)
                            currently costs: {App.projectsList.getProjectCount() / 5000} bitcoin</p>
                        <p>The second row costs half this amount at: {(App.projectsList.getProjectCount() / 5000) / 2} bitcoin
                        </p>
                        <p>Email us at <a href='mailto:bitcoinsetupnz@gmail.com' target='_blank'>bitcoinsetupnz@gmail.com </a>
                            if you are interested</p>
                        <p>
                            <i>
                                Note: the price for the top row is calculated by the amount of projects /
                                5000 in whole bitcoin. E.g. with
                                500 projects the price will be 0.1 bitcoin per week.
                            </i>
                        </p>
                        <p> <strong> We offer a no questions asked refund guarantee for 30 days </strong>
                        </p>
                   </div>
                </div>
            </div>
        )
    }

});