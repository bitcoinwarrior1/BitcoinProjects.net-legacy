App.PricingModal = React.createClass({

    render()
    {
        return(
            <div id="pricingModal" className="modal">
                <div className="modal-content">
                   <div className="row slim-row center-align">
                        <h3>Get the most attention by placing yourself at the top of the list</h3>
                        <p>To get into the top 4 places on this site for a month (in the default sorting order)
                            costs $500 USD worth of Bitcoin</p>
                        <p>Email us at <a href='mailto:bitcoinsetupnz@gmail.com' target='_blank'>bitcoinsetupnz@gmail.com </a>
                            if you are interested</p>
                        <p>
                            <strong> We offer a no questions asked refund guarantee for 30 days </strong>
                        </p>
                        <p>
                            <b>As seen on <a href="https://bitcoin.org/en/resources"> Bitcoin.org </a></b>
                        </p>
                   </div>
                </div>
            </div>
        )
    }

});
